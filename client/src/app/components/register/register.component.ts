import { Component, inject } from '@angular/core';
import { User } from '../../models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = new User();
  frmUser!: FormGroup 
  flag: boolean = false
  userSrv: UserService = inject(UserService)

  constructor(private messageService: MessageService,private activatedRoute: ActivatedRoute, private router: Router){
    this.frmUser = new FormGroup({
      userName: new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
      password: new FormControl('',[Validators.required,Validators.minLength(7),Validators.maxLength(50)]),
      fullName: new FormControl('',[Validators.required,Validators.maxLength(250)]),
      phone: new FormControl('',[Validators.required,Validators.minLength(7),Validators.maxLength(10)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      age: new FormControl('',[Validators.maxLength(3)]),
      adress: new FormControl('',[Validators.required,Validators.maxLength(250)]),
    }) 
  }

  register(){
      this.user.userName = this.frmUser.controls['userName'].value
      this.user.password = this.frmUser.controls['password'].value
      this.user.fullName = this.frmUser.controls['fullName'].value
      this.user.phone = this.frmUser.controls['phone'].value
      this.user.email = this.frmUser.controls['email'].value
      this.user.age = this.frmUser.controls['age'].value
      this.user.adress = this.frmUser.controls['adress'].value
      console.log(this.user);
      console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
      debugger
      this.userSrv.register(this.user).subscribe((data) => {
        this.user = data
        this.router.navigate(['login'], { relativeTo: this.activatedRoute.parent })
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הרשמה נכשלה', life: 3000 });
      })
  }

  cancelRegister(){
    this.frmUser.reset()
  }
}
