import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  items!: Array<{ label: string, icon: string, routerLink: Array<any> | undefined }>;
  message: string | null = ""
  constructor(private activateRoute: ActivatedRoute, private router: Router) {
    console.log(this.message, "this.message");
  }

  ngOnInit(){
    this.router.navigate(['login'], {relativeTo: this.activateRoute})

    this.activateRoute.params.subscribe(params => {
      if(params['id'] == 2 && sessionStorage.getItem != null){
        this.items.push({ label: 'המוצרים שלנו', icon: 'pi pi-shop', routerLink: ['homePage'] })
        this.items.push({ label: 'ניהול מתנות', icon: 'pi pi-gift', routerLink: ['gift'] })
        this.items.push({ label: 'ניהול תורמים', icon: 'pi pi-users', routerLink: ['donor'] })
        this.items.push({ label: 'מידע רכישות ', icon: 'pi pi-receipt', routerLink: ['purchase'] })
        
        this.router.navigate(['gift'], { relativeTo: this.activateRoute })
      }
      if (params['id'] == 1 && sessionStorage.getItem != null) {
        this.items.push({ label: 'המוצרים שלנו', icon: 'pi pi-shop', routerLink: ['homePage'] })
        this.router.navigate(['homePage'], { relativeTo: this.activateRoute })
      }
      console.log(params)
    })
    this.items = [
      { label: '', icon: 'pi pi-sign-out', routerLink: ['login'] },
      { label: 'כניסה', icon: 'pi pi-user', routerLink: ['login'] },
      { label: 'הרשמה', icon: 'pi pi-user-plus', routerLink: ['register'] },
    ];
  }
  isUser(event: Event) {
    console.log("hgfrjhg");

    alert(event)
  }
}
