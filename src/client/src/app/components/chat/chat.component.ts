import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  socket: any = io(environment.socketUrl);

  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.user) {
      this.router.navigateByUrl('login');
    } else {
      this.socket.on('connect', () => {
        console.log(this.socket.id);
      });
      this.socket.emit('login', this.authService.user);
    }
  }

  ngOnInit(): void {}
}
