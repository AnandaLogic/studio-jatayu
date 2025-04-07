import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Project {
  id: string;
  title: string;
  poster: string;
  year: string;
  genre: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      id: 'academy-of-gods',
      title: 'Academy of Gods',
      poster: '/aog-poster.png',
      year: '2023',
      genre: 'Animation'
    },
    {
      id: 'balakanda',
      title: 'Balakanda',
      poster: '/aog-poster.png',
      year: '2023',
      genre: 'Animation'
    },
    {
      id: 'dino-and-dyno',
      title: 'Dino and Dyno',
      poster: '/aog-poster.png',
      year: '2023',
      genre: 'Animation'
    },
    {
      id: 'girl-and-the-monster',
      title: 'Girl and the Monster',
      poster: '/aog-poster.png',
      year: '2023',
      genre: 'Animation'
    },
    {
      id: 'niko',
      title: 'Niko',
      poster: '/aog-poster.png',
      year: '2023',
      genre: 'Animation'
    },
    {
      id: 'bhag-zombie-bhag',
      title: 'Bhag Zombie Bhag',
      poster: '/aog-poster.png',
      year: '2023',
      genre: 'Animation'
    }
  ];
}
