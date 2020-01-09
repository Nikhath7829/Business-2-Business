import { Component, OnInit,ViewChild } from '@angular/core';
import { PopoverController,NavController,IonSlides, ToastController } from '@ionic/angular';
import { TestoComponent } from '../testo/testo.component';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../app/Models/classModels'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userid;
  arr;
  ar;
  role;
  listData;
  public modifyFormGroup : FormGroup;

  products: Product[] = [];
  errmsg: boolean;
  admin:boolean;
  student:boolean;

  @ViewChild(IonSlides,{static:false}) slides:IonSlides
  constructor(private route:Router,private rest:RestService, private toast:ToastController,public navCtrl:NavController,public popoverController: PopoverController) {}
  
  SlideChanged(){

  }
 ionViewDidLoad(){
   setTimeout(() =>
   this.slides.slideTo(5,10000),1000);
 
 }
 slidesDidLoad(slides: IonSlides) {
  slides.startAutoplay();
}
slideOptions = {
  initialSlide: 1,
  speed: 400,
};

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TestoComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }


  ngOnInit() {
    this.getuserprofile();
    this.retrieval();
  }


    
  getuserprofile(){
    this.rest.getuserprofile().subscribe((result) => {
    
    if(result === undefined)
    {
    console.log(result);
    this.errmsg=true;
    }
    else
    {
     /* to get userdetails */
      this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
      this.userid = this.arr[1].value;
      this.rest.sendId(this.userid.id);
    

      /* to get role of user */

      this.ar = Object.entries(this.userid.roles).map(([type, value]) => ({ type, value }));
    this.role= this.ar[0].value;
    console.log(this.role.name);
    this.rest.sendRole(this.role.name);
 
    
    /* Role Differntiation */
    if(this.rest.getRole()== "ADMIN"){
 this.route.navigate(['/admindashboard']);
    //console.log('Success');
    }
    
    else {
      this.route.navigate(['/dashboard']);
    //console.log('Fail');
    
    }
    }
    
    }, (err) => {
    console.log(err);
    
    });
    }


    
  retrieval() {
    this.rest.getproduct().subscribe((Product) => {

      if (Product === undefined) {
        console.log(Product);


      }
      else {

     this.products=Product=[];
     
      //  this.listData = new MatTableDataSource(this.arr[1].value);


      }

    }, (err) => {
      console.log(err);

    });

  }


}
