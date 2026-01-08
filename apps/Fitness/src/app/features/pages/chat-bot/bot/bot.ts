import {Component, signal} from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import {FormsModule} from '@angular/forms'
import {MainButton} from "./../../../../shared/components/ui/main-button/main-button";
@Component({
    selector: "app-bot",
    imports: [MainButton, TranslatePipe, FormsModule],
    templateUrl: "./bot.html",
    styleUrl: "./bot.scss",
})
export class Bot {
  chatMessage = ''
  isActiveChat = signal<boolean>(false)

  openChat(){
    this.isActiveChat.update(v=>!v)
  }
}
