import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/core/_services/image.service';
import { Info } from 'src/app/core/_services/Info.service';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.scss']
})
export class PortfolioDetailComponent implements OnInit, OnDestroy {
  private routeSub: any;
  src: any;
  message: string = '';
  messageList: any[] = [];
  chatName: string = "";

  constructor(public imageService: ImageService, public info: Info, private route: ActivatedRoute) { }
  ngOnInit() {
    this.messageList = [];
    this.routeSub = this.route.params.subscribe(params => {
      this.chatName = params['id'];
      this.imageService.listChats().subscribe((chats: any) => {
        if (chats.filter((e: any) => e.name == params['id']) == null) {
          this.imageService.joinChat(params['id']).subscribe(_ => console.log('chat joined'))
        }
        this.imageService.getChatMessage(params['id']).subscribe((e: any) => { this.messageList = e });
      })
      this.imageService.images.forEach((list: any) => {
        console.log(list);
        list.imageList.forEach((e: any) => {
          console.log(e);
          if (e.title == params['id']) { this.src = e; }
        })
      })
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  sendMessage() {
    this.messageList.push({ message: this.message });
    this.imageService.sendChatMessage(this.chatName, this.message).subscribe((e: any) => console.log(e));
    this.message = "";
  }

}
