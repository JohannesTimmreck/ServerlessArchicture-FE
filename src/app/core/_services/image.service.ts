import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

interface row {
  imageList: image[];
}

interface image {
  title: string,
  blob: any
}

@Injectable({
  providedIn: 'root'
})
export class ImageService extends ApiService {
  images: row[] = [];

  index = 0;

  createImageFromBlob(image: Blob, name: string) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      if (this.images.length < 3) {
        this.images.push({ imageList: [{ 'blob': reader.result, 'title': name }] });
      }
      else {
        this.images[this.index++].imageList.push({ 'blob': reader.result, 'title': name });
        if (this.index > 2) { this.index = 0; }
      }
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService(fileName: string) {
    this.getSingleFile(fileName).subscribe((data: Blob) => {
      this.createImageFromBlob(data, fileName);
    }, (error: any) => {
      console.log(error);
    });
  }
}
