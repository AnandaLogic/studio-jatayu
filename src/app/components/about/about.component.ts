import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  // Team member data
  teamMembers = [
    {
      name: 'Vishnu Vardhan Reddy K',
      role: 'CEO & Co-Founder',
      image: '/team1.png',
      description: [
        'Vishnu Vardhan Reddy K is a seasoned Animator, Creative Director, and Storyteller with over a decade of experience in the animation industry. A graduate of Vancouver Film School (VFS), he has honed his skills in 3D animation, storytelling, and creative direction, working with some of the renowned names in the industry.',
        'Throughout his career, Vishnu has contributed to studios, including Technicolor, Rockstar Games, Green Gold Animation, and channels like Netflix, Nickelodeon, Cartoon Network and Pogo, taking on key roles in animation, creative supervision, and production leadership. His expertise spans narrative development, pipeline optimization, and end-to-end content creation, making him an integral part impactful animated project.',
        'As the Founder of Studio Jatayu, he is committed to redefining Indian animation by crafting original, high-quality content that blends rich storytelling with global production standards. With a passion for pushing creative boundaries, Vishnu continues to lead innovative projects that leave a lasting impression.'
      ],
      socialLinks: {
        linkedin: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      name: 'Debalina Dasgupta',
      role: 'Creative Head',
      image: '/team2.png',
      description: [
        'Debalina Dasgupta is a highly accomplished Concept Artist & Color Concept Designer with 15+ years of experience in the animation. She has played a pivotal role in shaping the visual aesthetics of numerous projects across Animated feature films & animated series.',
        'Her journey includes working with renowned studios such as Utv Motion Pictures, Prime Focus, Green Gold Animation, and Rocket Science VFX, contributing to content for platforms like Netflix, Amazon Prime, Pogo, and Nickelodeon.',
        'At Studio Jatayu, she continues to bring her artistic expertise to life, crafting captivating worlds, compelling character designs, and immersive color palettes that define the studio\'s unique storytelling approach.'
      ],
      socialLinks: {
        linkedin: '#',
        instagram: '#',
        twitter: '#'
      }
    }
  ];
}
