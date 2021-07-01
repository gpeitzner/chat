import { Component, OnInit } from '@angular/core';
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
  socket: any = io(environment.socketUrl);
  messages: Message[] = [
    { nickname: 'user1', content: 'Hello' },
    { nickname: 'user1', content: 'World!' },
  ];
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {
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
    }
  }

  ngOnInit(): void {}

  sendMessage(): void {
    this.socket.emit('message', {
      nickname: this.authService.user.nickname,
      content: this.message,
    });
    this.message = '';
  }
}
