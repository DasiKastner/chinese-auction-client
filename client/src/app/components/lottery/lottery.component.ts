import { Component, inject } from '@angular/core';
import { LotteryService } from '../../services/lottery.service';
import { User } from '../../models/User';
import { Lottery } from '../../models/Lottery';
import { GiftServiceService } from '../../services/gift-service.service';
import { Gift } from '../../models/gift.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.css'
})
export class LotteryComponent {

  lotterySrv: LotteryService = inject(LotteryService)
  giftSrv: GiftServiceService = inject(GiftServiceService)
  user: User = new User()
  winners: Lottery[] = []
  gifts: Gift[] = []
  gift: Gift = new Gift()
  sortOrder!: number
  sortField!: string
  num: number = 0
  isRaffled: boolean = false

  constructor(private messageService: MessageService) { }

  ngOnInit(){
    // this.giftSrv.getProducts().subscribe((data) => {
    //   this.gifts = data
    //   this.getWinners()
    // },
    // (error) => {
    //   console.error(error);
    //   this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת מתנות נכשלה', life: 1000 });
    // })
    // this.lotterySrv.totalBenefit().subscribe(data => {
    //   this.num = data
    // },
    // (error) => {
    //   console.error(error);
    //   this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת רווח סופי נכשלה', life: 1000 });
    // })
    sessionStorage.clear()
    
  }

  getWinners(){
    debugger
    this.lotterySrv.getWinners().subscribe(data => {
      this.winners = data
    }, (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת זוכים נכשלה', life: 1000 });
    })    
  }

  raffle(giftId: number){
    this.lotterySrv.raffle(giftId).subscribe((data) => {
      this.user = data
      this.isRaffled = true
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
