import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  public isAuthenticated$ = this.user$.pipe(map(user => !!user));

  constructor(private router: Router) {
    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
      this.userSubject.next(user);
    });
  }

  // Register with email and password
  async register(email: string, password: string, name: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update user profile with display name
      await updateDoc(doc(db, 'users', userCredential.user.uid), {
        displayName: name,
        email: email,
        role: 'user', // Default role
        createdAt: new Date()
      });

      this.router.navigate(['/user-dashboard']);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login with email and password
  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      this.router.navigate(['/user-dashboard']);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Login with Google
  async loginWithGoogle(): Promise<void> {
    try {
      console.log('Starting Google login process...');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign-in successful:', result.user.email);

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      console.log('Firestore user document exists:', userDoc.exists());

      if (!userDoc.exists()) {
        console.log('Creating new user document in Firestore...');
        // Create new user document if it doesn't exist
        await setDoc(doc(db, 'users', result.user.uid), {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          role: 'user', // Default role
          createdAt: new Date()
        });
        console.log('New user document created successfully');
      }

      // Force a small delay to ensure Firebase auth state is updated
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Navigating to user dashboard...');
      // Use window.location for a hard redirect instead of Angular router
      window.location.href = '/user-dashboard';
      console.log('Navigation completed');
    } catch (error: any) {
      console.error('Google login error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Login was cancelled by user');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Login popup was blocked by the browser');
      } else if (error.code === 'auth/cancelled-popup-request') {
        throw new Error('Login was cancelled');
      } else {
        throw new Error('Failed to login with Google. Please try again.');
      }
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  // Get current user
  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }

  // Check if user is admin
  isAdmin(): Observable<boolean> {
    return this.user$.pipe(
      switchMap(user => {
        if (!user) return of(false);

        return from(getDoc(doc(db, 'users', user.uid))).pipe(
          map(doc => {
            if (!doc.exists()) return false;
            return doc.data()['role'] === 'admin';
          })
        );
      })
    );
  }

  // Get user data from Firestore
  getUserData(): Observable<any> {
    return this.user$.pipe(
      switchMap(user => {
        if (!user) return of(null);

        return from(getDoc(doc(db, 'users', user.uid))).pipe(
          map(doc => {
            if (!doc.exists()) return null;
            return doc.data();
          })
        );
      })
    );
  }

  // Add admin role to a user by email
  async addAdminRole(email: string): Promise<void> {
    try {
      // Find user by email in Firestore
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error(`No user found with email: ${email}`);
      }

      // Update the first matching user's role to admin
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, 'users', userDoc.id), {
        role: 'admin',
        updatedAt: new Date()
      });

      console.log(`Successfully added admin role to user with email: ${email}`);
    } catch (error) {
      console.error('Error adding admin role:', error);
      throw error;
    }
  }
}
