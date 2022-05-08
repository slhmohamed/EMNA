import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm:FormGroup;
  submittedl = false;
  submittedr = false;

  constructor(private formBuilder: FormBuilder,
    private router:Router,private _loginService:LoginService,
    private userService:UserService,
    private toastr: ToastrService) {
    }

  ngOnInit() {
   
  
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
       });
       this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],


       });
  }

  // convenience getter for easy access to form fields
  get fl() { return this.loginForm.controls; }
  get fr() { return this.registerForm.controls; }
  onSubmitl() {
    console.log(this.loginForm.value);
    
     
      this.submittedl = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this._loginService.generateToken(this.loginForm.value).subscribe((res:any)=>{
        this._loginService.loginUser(res.token);
        this._loginService.getCurrentUser().subscribe((user:any)=>{
          this._loginService.setUser(user);
      let role=    this._loginService.getUserRole();

      localStorage.setItem('role',role);
      this.router.navigate(['compte/dashboard']);

        })
         
       

        },(err)=>{

          this.toastr.error('Eroor 404', 'Notification');

        })
      }
  onResetl() {
      this.submittedl = false;
      this.loginForm.reset();
  }
  
  onSubmitr() {
     
     
    this.submittedr = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    } 
    this.userService.newUser(this.registerForm.value).subscribe(res=>{
      this.toastr.success('Compte a été créé avec succès', 'Notification');
      
    this.onResetr()
    },(err)=>{
       this.toastr.error('Eroor 404', 'Notification');
    })
}
onResetr() {
    this.submittedr= false;
    this.registerForm.reset();
}
}