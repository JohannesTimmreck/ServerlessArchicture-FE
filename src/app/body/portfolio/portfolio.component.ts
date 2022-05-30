import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/core/_services/image.service';
import { Info } from 'src/app/core/_services/info.service';

interface row {
  images: any[];
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @Input() pseudo: string = "";
  ngOnInit(): void {
    this.init();
  }
  source: string[] = []

  rows: row[] = [];

  constructor(public imageService: ImageService, public info: Info) {
    imageService.listMyFiles().subscribe((e: any) => {
      e.forEach((a: any) => {
        console.log(a.filepath);
        imageService.getImageFromService(a.filepath);
      })
      this.init();
    })
  }

  init() {
    this.imageService.images = [];
    this.imageService.index = 0;
  }
}
