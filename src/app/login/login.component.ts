import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });

    if(this.authService.isUserValid()){
      this.route.navigate(['']);
    }
  }

  get name(){
    return this.loginForm.get('name');
  }

  get password(){
    return this.loginForm.get('password');
  }

  submit(): void {
    this.authService.loginUser(this.name.value, this.password.value).subscribe(data => {
      if(data){
        this.route.navigate(['']);
      }
    });
  }

}
