import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dino-and-dyno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dino-and-dyno.component.html',
  styleUrls: ['./dino-and-dyno.component.css']
})
export class DinoAndDynoComponent {
  youtubeId = '2y_DH5gIrCU';
  description = 'In the divine realm of Devaparna, young gods, mentored by Guru Brihaspati, embark on magical adventures, exploring friendship, honing their mystical abilities, and facing thrilling challenges. Along their journey, they encounter and compete with the young Asuras from a rival school led by the formidable Guru Shukraji.';

  constructor(private sanitizer: DomSanitizer) {}

  getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?si=M410RbpnSctpYKwh`);
  }
}
