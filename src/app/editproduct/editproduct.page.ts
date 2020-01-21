import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product} from '../Models/classModels';
import { NavController, AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { RestService } from '../rest.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.page.html',
  styleUrls: ['./editproduct.page.scss'],
})
export class EditproductPage implements OnInit {
  public forms: FormGroup;
  public data: Product = new Product();
  success:boolean=false;
  valid: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  image: any;
  progress: { percentage: number } = { percentage: 0 };
  signup = {
    state: 0
  }
  statelist = [
  {
    state_id: 'Electronics',
    state_name: 'Electronics'
  },
  {
    state_id: 'Mobile&Tablets',
    state_name: 'Mobile&Tablets'
  },
  {
    state_id: 'Home_Appliances',
    state_name: 'Home_Appliances'
  },
  {
    state_id: ' Mobile_Accessory',
    state_name: 'Mobile_Accessory'
  },
  {
    state_id: 'Property',
    state_name: 'Property'
  }]
arr;
userid;
id:any;
//fetching//
name;
price;
sub;
category;
discount;
desc;
userId;
status;
images;
images1;
images2;
images3;
images4;
  constructor(private fb: FormBuilder,private route: ActivatedRoute,  public navCtrl: NavController, public alertController: AlertController, public imagepicker: ImagePicker, private rest: RestService) {
    this.forms = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', Validators.required],
      sub: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      image: ['', [Validators.required]],
      image1: [''],
      image2: [''],
      image3: [''],
      image4: [''],
      userId: ['', [Validators.required]],
      status:[0]
        });
    this.route.params.subscribe(params => this.doSearch(params));
  }


  doSearch(param) {
    this.id = param.id;
    // console.log(this.id);
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      subHeader: 'Alert:',
      message: 'Please Confirm Before Posting.',
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
   
   
    this.retrieval();
  
  }
  selectFiles(event) {

    this.selectedFiles = event.target.files;

  }

  upload() {
    this.progress.percentage = 0;


    this.currentFileUpload = this.selectedFiles.item(0);
    this.image = this.currentFileUpload.name;
    console.log(this.currentFileUpload.name);
    this.rest.pushFileToStorages(this.currentFileUpload).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploadedss!');
      }
    });

    this.selectedFiles = undefined;

  }

 
  retrieval() {
    this.rest.geteditprod(this.id).subscribe((result) => {

      if (result === undefined) {
        console.log(result);


      }
      else {

        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
      this.userid = this.arr[0].value;
    // console.log(this.name=this.userid.name);
    this.name=this.userid.name,
      this.price=this.userid.price;
      this.sub=this.userid.sub;
      this.desc=this.userid.desc;
      this.category=this.userid.category;
      this.userId=this.userid.userId;
      this.discount=this.userid.discount;
      this.images=this.userid.image;
      this.images1=this.userid.image1;
      this.images2=this.userid.image2;
      this.images3=this.userid.image3;
      this.images4=this.userid.image4;
      this.status=this.userid.status;
      
      //console.log(this.userid);

      }

    }, (err) => {
      console.log(err);

    });

  }


  alert(signup) {
    console.log('success');
  }

  add() {

    this.forms.get("name").setValidators(Validators.required);
    this.forms.get("name").updateValueAndValidity();
    this.forms.get("price").setValidators(Validators.required);
    this.forms.get("price").updateValueAndValidity();

    this.forms.get("image").setValidators(Validators.required);
    this.forms.get("image").updateValueAndValidity();
    this.forms.get("sub").setValidators(Validators.required);
    this.forms.get("sub").updateValueAndValidity();
    this.forms.get("discount").setValidators(Validators.required);
    this.forms.get("discount").updateValueAndValidity();
    this.forms.get("desc").setValidators(Validators.required);
    this.forms.get("desc").updateValueAndValidity();
    if (this.forms.valid) {
      console.log('no error');
    }
    else {
      console.log('error');
      this.valid = true;
    }
    Object.assign(this.data, this.forms.value);
    console.log(this.data);

    if (this.forms.valid) {
      this.rest.update(this.id, this.data).subscribe((result) => {
        this.upload();
        console.log(result);
        if (result === undefined) {
          // this.showMsg=true;
        //  console.log(result);

          //this.errmsg=true;

        }
        else {
        
          this.presentAlert();
      this.forms.reset();
      this.retrieval();
     
      
          this.forms = this.fb.group({
        
            name: ['', [Validators.required]],
            category: ['', Validators.required],
            sub: ['', Validators.required],
            desc: ['', Validators.required],
            price: ['', Validators.required],
            discount: ['', Validators.required],
            image: [''],
            image1: [''],
            image2: [''],
            image3: [''],
            image4: [''],
            userId: ['', [Validators.required]],
      status:[0]
          });
        }


      }, (err) => {

      
        console.log(err);

      });
    }
    else {
      alert("something Went Wrong");
    }
  }

}
