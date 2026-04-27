import { Component, inject } from '@angular/core';
import { Gift } from '../../models/gift.model';
import { GiftServiceService } from '../../services/gift-service.service';
import { OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/Category';
import { DonorService } from '../../services/donor.service';
import { Donor } from '../../models/Donor';
@Component({
    selector: 'app-gift',
    templateUrl: './gift.component.html',
    styleUrl: './gift.component.css',
    providers: [MessageService, ConfirmationService],
    styles: [
        `:host ::ng-deep .p-dialog .product-image {
          width: 150px;
          margin: 0 auto 2rem auto;
          display: block;
      }`
    ]
})

export class GiftComponent {

  giftsrv: GiftServiceService = inject(GiftServiceService);
  categorySrv: CategoryService = inject(CategoryService);
  donorSrv: DonorService = inject(DonorService);
  productDialog: boolean = false;
  selectedDonorName: string = ""
  selectedDonor: Donor | undefined
  products: Gift[]=[];
  nameDonors: string[] = []
  product: Gift = new Gift();
  donors: Donor[] = []
  selectedProducts: Gift[]=[];
  categories: Category[] =[]
  selectedCategoryName: string = ""
  selectedCategory: Category | undefined
  names :string[] = [];
  submitted: boolean = false;
  gifts$: Gift[] = [];
  str: string = ""
  constructor(private productService: GiftServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.giftsrv.getProducts().subscribe((gift) => {
        this.products = gift;
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת מתנות נכשלה', life: 1000 });
      })
      this.categorySrv.getCategories().subscribe((category) => {
        this.categories = category;
        this.names = this.categories.map(c=>c.categoryName);
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת קטגוריות נכשלה', life: 1000 });
      })
      this.donorSrv.getDonors().subscribe((donor) => {
        this.donors = donor;
        this.nameDonors = this.donors.map(d => d.fullName)
      },
      (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת תורמים נכשלה', life: 1000 });
      })      
  }

  openNew() {
      this.product = new Gift();
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({ 
          message: 'Are you sure you want to delete the selected gifts?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              for(let i=0; i< this.selectedProducts.length; i++){
                this.giftsrv.deleteGift(this.selectedProducts[i].id).subscribe((data) => {
                    this.str = data
                    this.giftsrv.getProducts().subscribe((gift) => {
                        this.products = gift
                    },
                    (error) => {
                      console.error(error);
                      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת מתנות נכשלה', life: 1000 });
                    })
                },
                (error) => {
                  console.error(error);
                  this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'מחיקת מתנות נכשלה', life: 1000 });
                })  
              }
              this.selectedProducts = [];
              this.messageService.add({severity:'success', summary: 'בהצלחה', detail: 'מתנות נמחקו', life: 1000});
          }
      });
  }

  editProduct(product: Gift) {
      this.product = {...product};
      this.productDialog = true;
  }

  deleteProduct(product: Gift) {
    if(product.quantityOfPurchases && product.quantityOfPurchases>0)
      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail:'קיימות רכישות למתנה זו', life: 1000 });
    else{
      this.confirmationService.confirm({
          message: '? ' + ' אתה בטוח שברצונך למחוק את '  + product.giftName ,
          header: 'אזהרה',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              console.log(product.id);
              this.giftsrv.deleteGift(product.id).subscribe((data) => {
                this.str = data
                this.messageService.add({severity:'success', summary: 'בהצלחה', detail: 'מתנה נמחקה', life: 1000});
                this.giftsrv.getProducts().subscribe((gift) => {
                    this.products = gift
                },
                (error) => {
                  console.error(error);
                  this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הצגת מתנות נכשלה', life: 1000 });
                })
          },
          (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'מחיקת מתנה נכשלה', life: 1000 });
          })                                                                                                                                                                                                             
        }
      });
    }
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  
  saveProduct() {
      this.submitted = true;
      if (this.product.giftName.trim()) {
          if (this.product.id) {
              this.giftsrv.updateGift(this.product).subscribe((data) =>{
                    this.product = data
                    this.messageService.add({severity:'success', summary: 'בהצלחה', detail: 'מתנה עודכנה', life: 1000});
                    this.giftsrv.getProducts().subscribe((gift) => {
                        this.products = gift;
                    })
              },
              (error) => {
                console.error(error);
                this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'עדכון מתנה נכשלה', life: 1000 });
              })           
              
          }
          else {
            debugger
              this.giftsrv.creategift(this.product).subscribe(data => {
                this.product = data
                this.messageService.add({severity:'success', summary: 'בהצלחה', detail: 'מתנה נוצרה', life: 1000});
                this.giftsrv.getProducts().subscribe((gift) => {
                    this.products = gift
                })
              },
              (error) => {
                console.error(error);
                this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'הוספת מתנה נכשלה', life: 1000 });
              })
              
          }
          this.productDialog = false;
          this.products = [...this.products];
          this.product = new Gift();
      }
  }
}

