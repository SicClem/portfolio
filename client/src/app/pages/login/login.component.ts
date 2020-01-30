import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { emailValidator } from './../../component/email';
import { User } from 'src/app/shared/user';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm = this.fb.group({
  
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required]],
    });

    user: User = new User();
    invalid= false;

  constructor(private fb: FormBuilder, private authService : AuthService, private userService: UserService, private router : Router,) { }

  ngOnInit() {
  }

  test(ngForm){
    this.user.email = this.authForm.value.email;
    this.user.password = this.authForm.value.password;

    this.authService.addUser(this.user).subscribe(
      result => console.log (result)
    )
  }


  loggin(ngForm){
    this.user.email = this.authForm.value.email;
    this.user.password = this.authForm.value.password;

    this.authService.login(this.user.email, this.user.password).subscribe(
      result=>{
        this.userService.loadUser().subscribe(result => {
          if(result.role === "admin"){
            this.router.navigateByUrl('/admin')
          }
          else {
            this.router.navigateByUrl('/')
          }
        })
      },
      error => {
        console.log("error", error.error.err)
        this.invalid = true
      }
    );
  }



}
