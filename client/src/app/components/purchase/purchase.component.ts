import { Component, inject } from '@angular/core';
import { GiftServiceService } from '../../services/gift-service.service';
import { Gift } from '../../models/gift.model';
import { PurchaseService } from '../../services/purchase.service';
import { User } from '../../models/User';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';
import { Lottery } from '../../models/Lottery';
import { LotteryService } from '../../services/lottery.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {
  constructor(private messageService: MessageService){}

  giftsrv: GiftServiceService = inject(GiftServiceService)
  gifts: Gift[] = []
  selectedGifts: Gift[] = [];
  gift: Gift = new Gift()
  users: User[] = []
  purchaseDialog: boolean = false
  allUsers: User[] = []
  allPurchaseDialog: boolean = false
  cartSrv: CartService = inject(CartService)
    lotterySrv: LotteryService = inject(LotteryService)
    giftSrv: GiftServiceService = inject(GiftServiceService)
    user: User = new User()
    winners: Lottery[] = []
    // gifts: Gift[] = []
    // gift: Gift = new Gift()
    sortOrder!: number
    sortField!: string
    num: number = 0
    isRaffled: boolean = false
    winnersDialog:boolean = false
    benefitesDialog: boolean = false

  ngOnInit() {
    this.giftsrv.getProducts().subscribe((gift) => {
      this.gifts = gift;
    },
    (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת מתנות נכשלה', life: 1000 });
    })
    this.cartSrv.getAllDetails().subscribe(data => {
      this.allUsers = data
      console.log(data);
    },
    (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת פרטי רוכשים נכשלה', life: 1000 });
    })
  }

  totalBenfit(){
    this.num = 0
    this.lotterySrv.totalBenefit().subscribe(data => {
      this.num = data
      this.benefitesDialog = true
    },
    (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת רווח סופי נכשלה', life: 1000 });
    })
  }
  PurchasersDetails(id: number){
    debugger
    this.cartSrv.PurchasersDetails(id).subscribe((data) => {
      console.log(data);
      this.users = data
    },
    (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת פרטי רוכשים נכשלה', life: 1000 });
    })
    this.purchaseDialog = true
  }
  getAllDetails(){
    this.cartSrv.getAllDetails().subscribe(data => {
      this.allUsers = data
      console.log(data);
      
    },
    (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת פרטי רוכשים נכשלה', life: 1000 });
    })
    this.allPurchaseDialog = true
  }
  getWinners(){
    debugger
    this.lotterySrv.getWinners().subscribe(data => {
      this.winners = data   
    }, (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת זוכים נכשלה', life: 1000 });
    })  
    this.winnersDialog = true  
  }

  raffle(giftId: number){
    this.lotterySrv.raffle(giftId).subscribe((data) => {
      this.user = data
      this.isRaffled = true
      this.messageService.add({ severity: 'success', summary: 'בהצלחה', detail: 'הגרלה נערכה', life: 1000 });
      this.giftsrv.getProducts().subscribe((gift) => {
        this.gifts = gift;
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת מתנות נכשלה', life: 1000 });
      })
      this.lotterySrv.getWinners().subscribe(data => {
        this.winners = data
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת זוכים נכשלה', life: 1000 });
      })        
    },
    (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'עריכת ההגרלה נכשלה', life: 1000 });
    })
  }
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }
}
