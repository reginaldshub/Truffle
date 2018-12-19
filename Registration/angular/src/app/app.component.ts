import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ServiceService } from './service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( public ethcontractService: ServiceService ){
    // this.initAndDisplayAccount();
  }

  name;
   balance;
   dailyLimit;
   public_address;

   onSubmit(  form: NgForm){
    // console.log(form.value);
    this.ethcontractService.Registration(form.value).then(function(acctInfo : any){
      console.log(acctInfo);
    }).catch(function(error){
      console.log(error);
    });
  }

  get(data){
    this.ethcontractService.GetDetails(data.value.address).then(function(acctInfo : any){
      console.log(acctInfo);
    }).catch(function(error){
      console.log(error);
    });
  }

  initAndDisplayAccount = () => {
    this.ethcontractService.BasicInfo().then(function(acctInfo : any){
      // console.log(acctInfo);
      console.log(JSON.parse(acctInfo));
    }).catch(function(error){
      console.log(error);
    });
  };
}