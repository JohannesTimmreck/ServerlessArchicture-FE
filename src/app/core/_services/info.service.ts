import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Info {

  connected = false;
  pseudo: string = "";
  bearer: string = "";
  uid: string = ""

  constructor() {
  }
}
