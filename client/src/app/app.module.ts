
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import { AppComponent }   from './app.component';
import { GiftServiceService } from './services/gift-service.service';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GiftComponent } from './components/gift/gift.component';
import { DonorComponent } from './components/donor/donor.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DonorService } from './services/donor.service';
import { StyleClassModule } from 'primeng/styleclass';
import { PasswordModule } from 'primeng/password';
import { OrderListModule } from 'primeng/orderlist';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CartService } from './services/cart.service';
import { SidebarModule } from 'primeng/sidebar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { LotteryComponent } from './components/lottery/lottery.component';
import { InputMaskModule } from 'primeng/inputmask';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
// import { CommonModule } from '@angular/common'; 

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    FloatLabelModule,
    StyleClassModule,
    PasswordModule,
    OrderListModule,
    DataViewModule,
    TagModule,
    SidebarModule,
    SelectButtonModule,
    ReactiveFormsModule,
    ImageModule,
    BadgeModule,
    DividerModule,
    InputMaskModule,
    AnimateOnScrollModule,
    AppRoutingModule,
    TabMenuModule,
    OverlayPanelModule,
    // Validators,
    // FormGroup,
    // FormControl,
    // CommonModule,
    RouterModule.forRoot([
      {path:'',component: AppComponent}

		])
  ],
  declarations: [ AppComponent,GiftComponent, DonorComponent, HomePageComponent, RegisterComponent, LoginComponent, PurchaseComponent, LotteryComponent, NavigationComponent],
  bootstrap:    [ AppComponent ],
  providers: [DonorService, GiftServiceService, MessageService, ConfirmationService, CartService]
})

export class AppModule { }


