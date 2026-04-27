import { Component, inject } from '@angular/core';
import { DonorService } from '../../services/donor.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Donor } from '../../models/Donor';
import { Gift } from '../../models/gift.model';
import { GiftServiceService } from '../../services/gift-service.service';
import { Purchase } from '../../models/Purchase';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-donor',
    templateUrl: './donor.component.html',
    styleUrl: './donor.component.css'
})
export class DonorComponent {
    donorSrv: DonorService = inject(DonorService)
    giftSrv: GiftServiceService = inject(GiftServiceService)
    donors: Donor[] = []
    donor: Donor = new Donor() 
    str: string = ''
    gifts: Gift[] = [];
    selectedDonors: Donor[] = [];
    submitted: boolean = false;
    donorDialog: boolean = false;
    donor1Dialog!: string;
    dialogList: boolean = false
    constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        debugger
        this.donorSrv.getDonors().subscribe((donor) => {
            this.donors = donor;
        },
        (error) => {
          console.error(error);
          this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת תורמים נכשלה', life: 1000 });
        })
        console.log(this.donors);
        console.log("kkkkkkkkkkkkkkkkk");
        
    }
    openNew() {
        this.donor = new Donor();
        this.submitted = false;
        this.donorDialog = true;
    }

    list(donor: Donor){
        debugger
        this.donorSrv.GetGiftsPerDonor(donor.id).subscribe(data => {
            this.gifts = data;
            this.dialogList = true
        },
        (error) => console.error("Error fetching gifts:", error))    
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            
            message: 'Are you sure you want to delete the selected Donors?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            
            accept: () => {
                for (let i = 0; i < this.selectedDonors.length; i++) {
                    this.donorSrv.deleteDonor(this.selectedDonors[i].id).subscribe((data) => {
                        this.str = data
                        this.donorSrv.getDonors().subscribe((donor) => {
                            this.donors = donor;
                        })
                    },
                    (error) => {
                      console.error(error);
                      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'מחיקת מתנות נכשלה', life: 1000 });
                    })
                }
                this.selectedDonors = [];
                this.messageService.add({ severity: 'success', summary: 'בהצלחה', detail: 'תורמים נמחקו', life: 1000 });
            }
        });
    }
 
    editProduct(donor: Donor) {
        this.donor = { ...donor };
        this.donorDialog = true;
    }

    deleteProduct(donor: Donor) {
        this.donorSrv.GetGiftsPerDonor(donor.id).subscribe(data => {
            this.gifts = data;})
        if(this.gifts)
            this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'נתרמו מתנות על שם תורם זה', life: 1000 });
        else{
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + donor.fullName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                console.log(donor.id);
                this.donorSrv.deleteDonor(donor.id).subscribe((data) => {
                    this.str = data
                    this.donorSrv.getDonors().subscribe((donor) => {
                        this.donors = donor;
                    })
                this.messageService.add({ severity: 'success', summary: 'בהצלחה', detail: 'תורם נמחק', life: 1000 });
                },
                (error) => {
                  console.error(error);
                  this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'מחיקת תורם נכשלה', life: 1000 });
                })
            }
        });
    }
    }

    hideDialog() {
        this.donorDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        if (this.donor.fullName.trim()) {
            if (this.donor.id) {
                this.donor.age = this.donor.age.toString();
                this.donorSrv.updateDonor(this.donor).subscribe((data) => {
                    this.donor = data
                    this.donorSrv.getDonors().subscribe((donor) => {
                        this.donors = donor;
                    })
                    this.messageService.add({ severity: 'success', summary: 'בהצלחה', detail: 'תורם עודכן', life: 1000 });
                },
                (error) => {
                  console.error(error);
                  this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'עדבון תורם נכשל', life: 1000 });
                })
            }
            else {
                debugger
                console.log(this.donor)
                this.donor.age = this.donor.age.toString();
                this.donorSrv.createDonor(this.donor).subscribe((data) => {
                this.donor = data
                this.donorSrv.getDonors().subscribe((donor) => {
                    this.donors = donor;
                })
                this.messageService.add({ severity: 'success', summary: 'בהצלחה', detail: 'תורם נוסף', life: 1000 });
                },
                (error) => {
                  console.error(error);
                  this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הוספת תורם נכשלה', life: 1000 });
                })
            }
            debugger
            this.donorDialog = false;
            this.donors = [...this.donors];
            this.donor = new Donor();
            
        }
    }
}
