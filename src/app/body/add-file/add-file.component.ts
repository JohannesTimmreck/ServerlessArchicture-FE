import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, isDevMode, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ApiService } from 'src/app/core/_services/api.service';
import { ErrorService } from 'src/app/core/_services/error.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit, OnDestroy {

  isLoading: boolean = false

  publicType: boolean = false

  progress: number = -1

  constructor(private error: ErrorService, private api: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._snackBar.dismiss()
  }

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;

    if (files.length !== 1) {
      this.error.showError("Only one file")
      return
    }

    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          if (!(file.type === 'image/png'
            || file.type === 'image/gif'
            || file.type === 'image/jpeg')) {
            this.error.showError("Only accept .gif, .jpeg, .png")
            return
          }

          const formData = new FormData()
          formData.append('files', file, file.name)

          this.isLoading = true
          this.progress = 0;
          this.api.uploadFile(formData, this.publicType).subscribe({
            next: (event: HttpEvent<any>) => {

              switch (event.type) {
                case HttpEventType.Sent:
                  if (isDevMode()) {
                    console.log('Request has been made!');
                  }
                  break;
                case HttpEventType.ResponseHeader:
                  if (isDevMode())
                    console.log('Response header has been received!');
                  break;
                case HttpEventType.UploadProgress:
                  if (isDevMode())
                    console.log(event);
                  if (event.total)
                    this.progress = Math.round(event.loaded / event.total * 100);
                  break;
                case HttpEventType.Response:
                  this.isLoading = false;
                  this.api.createChat(file.name).subscribe((e: any) => console.log(e))
                  if (isDevMode()) {
                    console.log('File sent', event.body);
                  }
                  this.fileSend("The file is upload")
                  this.progress = -1;
              }
            },
            error: (error: any) => {
              console.error(error);
              this.isLoading = false;
              this.progress = -1;
            }
          })

        });
      } else {
        this.error.showError("Only accept file")
        return
      }
    }
  }

  public fileOver(event: any) {
    //console.log(event);
  }

  public fileLeave(event: any) {
    //console.log(event);
  }

  fileSend(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 1000,
      panelClass: "configGood"
    });
  }
}
