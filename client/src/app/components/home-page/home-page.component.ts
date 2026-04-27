import { Component, inject, signal, ViewChild } from '@angular/core';
import { Gift } from '../../models/gift.model';
import { Donor } from '../../models/Donor';
import { Category } from '../../models/Category';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { OrderListModule } from 'primeng/orderlist';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { GiftServiceService } from '../../services/gift-service.service';
import { DonorService } from '../../services/donor.service';
import { CartService } from '../../services/cart.service';
import { Purchase } from '../../models/Purchase';
import { ContextMenu } from 'primeng/contextmenu';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
//   layout: string = 'grid';

//   products = signal<any>([]);

//   options = ['list', 'grid'];
  flag:boolean=false;
  layot: any = "grid";
  gift!: Gift;
  gifts: Gift[] = []
  products!: Gift[];
  donors$: Donor[] = [];
  donors2: string[] = [];
  category!: Category;
  category2: string[] = [];
  category$: Category[] = [];
  SelectedGifts: Gift[] = [];
  visible: boolean = false;
  purchase: Purchase = new Purchase()
  purchases: Purchase[] = []
  sidebarVisible: boolean = false
  total: number = 0
  selectedId!: string;
  cartSrv: CartService = inject(CartService)
  categorySrv: CategoryService = inject(CategoryService)
  giftSrv: GiftServiceService = inject(GiftServiceService)
  donorSrv: DonorService = inject(DonorService)
  userId: number = 0
  purchase1: Purchase = new Purchase()
  isCart: boolean = false
  loading: boolean = false;
  
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService ,private router:Router) {}
  
  ngOnInit() {
      this.giftSrv.getProducts().subscribe((gift) => {
        this.gifts = gift
        },
        (error) => {
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'התרחשה שגיאה בהצגת המתנות', life: 3000 });
        }
      )
        debugger
        this.extracUserIdFromToken()
  }

  extracUserIdFromToken(){
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
        const decodedToken: any = jwtDecode(token);
        const a = JSON.stringify(decodedToken);
        const customerId = decodedToken;
        this.userId = decodedToken["Id"];
           console.log("tokennnnnnnnnnnnnnn:",token);
           console.log(this.userId);
    }
  }

  addToCart(giftId: number){
    console.log(this.userId, giftId);  
    debugger
    this.cartSrv.addToCart(this.userId,giftId).subscribe((data) => {
      this.purchase = data
      this.messageService.add({severity:'success', summary: 'בהצלחה', detail: 'מתנה נוספה', life: 1000});
      this.cartSrv.getCart(this.userId).subscribe(data => {
        this.purchases = data
        this.getTotal()
      })
    },
    (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הוספה לסל נכשלה', life: 1000 });
    })    
  }

  getCart(){
    debugger
    this.cartSrv.getCart(this.userId).subscribe(data => {
      this.purchases = data
      this.getTotal()
      // if(this.purchases = []){
      //   this.isCart = true
      // }
    },
    (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת הסל נכשלה', life: 1000 });
    })
    this.sidebarVisible = true
  }

  deleteFromCart(giftId: number){
    debugger
    console.log("deeeeeeeeeeeeeeeeeedddddddddddddddd");   
    console.log(this.userId, giftId);
    
    this.cartSrv.deleteFromCart(this.userId, giftId).subscribe(z=>{
      console.log(z);
      this.cartSrv.getCart(this.userId).subscribe(data => {
        this.purchases = data
        this.messageService.add({severity:'success', summary: 'בהצלחה', detail: 'מתנה נמחקה', life: 3000});
        this.getTotal()
      })
    },
    (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'מחיקה מהסל נכשלה', life: 3000 });
    })
    
  }

  buyCart(){
    debugger
    this.purchases.forEach(i => {
      this.cartSrv.buyCart(this.userId,i.giftId).subscribe(data => {
        console.log(data);     
      })
    })
    this.loading = true;

    setTimeout(() => {
        this.loading = false
    }, 2000);
  }

  getTotal(){
    this.total = 0
    this.purchases.forEach(i => {
      this.total += i.price
    });
  }
}
