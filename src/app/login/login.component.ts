import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl(false)
  });
  login : boolean = true;
  table : boolean = false;
  invalidLogin:boolean = false;
  rememberMe: boolean=true;
  constructor(private fb:FormBuilder,private router: Router) { this.createForm(); }

  ngOnInit(): void {
  }
  createForm() {
    this.logInForm = this.fb.group({
      username: ['', [Validators.required,Validators.email]],
      password: ['',Validators.required],
      rememberMe:['']
    });
  }
  onSubmit(credentials:any){
    if(this.logInForm.valid && this.rememberMe === true){
    this.login = false;
    this.table = true;
    localStorage.setItem('username',this.logInForm.value.username)
    console.log(credentials)}
    else if(this.logInForm.valid && !this.rememberMe === false){
    this.login = false;
    this.table = true;
    }
}
}
