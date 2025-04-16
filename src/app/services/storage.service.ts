import { Injectable } from '@angular/core';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  StorageReference
} from 'firebase/storage';
import { storage } from '../config/firebase.config';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  // Upload a file to Firebase Storage
  async uploadFile(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Upload multiple files
  async uploadMultipleFiles(files: File[], path: string): Promise<string[]> {
    try {
      const uploadPromises = files.map(file => {
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `${path}/${fileName}`;
        return this.uploadFile(file, filePath);
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading multiple files:', error);
      throw error;
    }
  }

  // Get download URL for a file
  async getDownloadURL(path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error getting download URL:', error);
      throw error;
    }
  }

  // Delete a file from Firebase Storage
  async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // List all files in a directory
  async listFiles(path: string): Promise<string[]> {
    try {
      const storageRef = ref(storage, path);
      const result = await listAll(storageRef);

      const urlPromises = result.items.map(item => getDownloadURL(item));
      return await Promise.all(urlPromises);
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  // Upload project image
  async uploadProjectImage(file: File, projectId: string): Promise<string> {
    const path = `projects/${projectId}/images/${Date.now()}_${file.name}`;
    return this.uploadFile(file, path);
  }

  // Upload user avatar
  async uploadUserAvatar(file: File, userId: string): Promise<string> {
    const path = `users/${userId}/avatar/${Date.now()}_${file.name}`;
    return this.uploadFile(file, path);
  }
}
