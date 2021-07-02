import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;

  socket: any = io(environment.socketUrl);
  messages: Message[] = [];
  message: string = '';
  friendRoom: string = '';
  onlineUsers: any[] = [];

  constructor(public authService: AuthService, private router: Router) {
    if (!this.authService.user) {
      this.router.navigateByUrl('login');
    } else {
      this.socket.on('connect', () => {
        console.log(this.socket.id);
      });
      this.socket.emit('login', this.authService.user);
      this.socket.on('new-message', (newMessage: Message) => {
        this.messages.push(newMessage);
      });
      this.socket.on('online-users', (onlineUsers: any[]) => {
        this.onlineUsers = onlineUsers.filter(
          (onlineUser) => onlineUser.room !== this.socket.id
        );
        console.log('[ONLINE USERS]', this.onlineUsers);
      });
    }
  }

  ngOnInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage(): void {
    if (this.friendRoom !== '' && this.message !== '') {
      const newMessage = {
        nickname: this.authService.user.nickname,
        content: this.message,
      };
      this.socket.emit('message', newMessage, this.friendRoom);
      this.messages.push(newMessage);
      this.message = '';
    }
  }

  setFriendRoom(onlineUser: any): void {
    this.friendRoom = onlineUser.room;
  }
}
