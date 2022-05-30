import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/_services/api.service';
import { ImageService } from 'src/app/core/_services/image.service';
import { Info } from 'src/app/core/_services/info.service';

interface row {
  images: any[];
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  ngOnInit(): void {
    this.init();
  }

  groups: any[] = [];

  constructor(public api: ApiService, public info: Info, public dialog: MatDialog) {
  }

  animal: string = "";
  name: string = "";

  openDialog(groupName: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.addToGroup(groupName, result);
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(DialogCreateGroup, {
      width: '250px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.createGroup(result);
    });
  }

  createGroup(name: string) {
    this.api.createGroup(name).subscribe((e) => {
      console.log(e);
    })
  }

  addToGroup(groupName: string, email: string) {
    this.api.addToGroup(email, groupName).subscribe((e) => {
      console.log(e);
    })
  }

  getGroup() {
    this.api.listGroups().subscribe((e) => this.groups = e);
  }

  init() {
    this.groups = [];
    this.getGroup();
  }
}

export interface DialogData {
  email: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'addSomeone.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'addSomeone.html',
})
export class DialogCreateGroup {
  constructor(
    public dialogRef: MatDialogRef<DialogCreateGroup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
