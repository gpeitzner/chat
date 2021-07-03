import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    nickname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    bot: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    let { name, nickname, password, bot } = this.signupForm.value;
    this.authService.signup(name, nickname, password, bot).subscribe(
      (response: User) => {
        this.authService.user = response;
        this.router.navigateByUrl('/chat');
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
