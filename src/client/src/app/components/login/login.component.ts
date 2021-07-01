import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  socket: any = io('http://localhost:3001');

  constructor() {
    this.socket.on('connect', () => {
      console.log(this.socket.id);
    });
    this.socket.emit('custom-event', 'hello');
  }

  ngOnInit(): void {}
}
