import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Login } from '../../models/Login';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  userSrv: UserService = inject(UserService);
  token: any | undefined
  frmUser!: FormGroup
  userName!: string
  password!: string
  user: Login = new Login()
  @Output() isUser: EventEmitter<number> = new EventEmitter();

  constructor(private messageService: MessageService,private activatedRoute: ActivatedRoute, private router: Router){
    this.frmUser = new FormGroup({
      userName: new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
      password: new FormControl('',[Validators.required,Validators.minLength(7),Validators.maxLength(50)])
    })
  }
  ngOnInit(): void {
    sessionStorage.clear();
    // this.location.replaceState("/home/0/login");
    this.router.navigate(["/home/0/login"], { relativeTo: this.activatedRoute })
    // this.location.go("/home/0/login")
    // setInterval(() => {
    //   this.currentImage = (this.currentImage + 1) % this.images.length;
    // }, 1500)
  }
  login() {
    sessionStorage.clear()
  debugger
    this.userSrv.login(this.user).subscribe(
      (data) => {
       this.userSrv.login1 = this.user
        console.log(data);
        this.token = data.token
        if (this.token) {
          sessionStorage.setItem("token", this.token);
          if(data.role){
            this.userSrv.isUser = 2
            this.router.navigate(['../' + 2], { relativeTo: this.activatedRoute.parent })
          }
          else{
            this.userSrv.isUser = 1
            this.router.navigate(['../' + 1], { relativeTo: this.activatedRoute.parent })
          }
          this.messageService.add({severity: 'success', summary: 'בהצלחה', detail: 'התחברת בהצלחה', life: 1000});
        } else {
          this.messageService.add({severity: 'error', summary: 'שגיאה', detail: 'שם משתמש או סיסמה שגויים', life: 3000 });
        }
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'התרחשה שגיאה בהתחברות', life: 1000 });
      }
    );
  }

  newUser(){
    //ניתוב
    this.router.navigate(['register'], { relativeTo: this.activatedRoute.parent })
  }
}
