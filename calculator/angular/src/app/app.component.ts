import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ServiceService } from './service.service';

export interface Operator {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
 Result:any = 0;

  constructor( public ethcontractService: ServiceService ){
   
  }
  
  
  operator: Operator[] = [
    {value: 'addition', viewValue: 'Addition'},
    {value: 'substraction', viewValue: 'Substraction'},
    {value: 'multiplication', viewValue: 'Multiplication'},
    {value: 'division', viewValue: 'Division'}
  ];

  onSubmit(form: NgForm){
    let that = this;
    let operation = form.value.operator;
    let op1 = form.value.op1;
    let op2 = form.value.op2;
    if(operation == 'addition'){
      this.ethcontractService.addition(op1,op2).then(function(acctInfo : any){
            console.log(acctInfo.toNumber());
            that.Result = acctInfo;
          }).catch(function(error){
            console.log(error);
          });
    }else if(operation == 'substraction'){
      this.ethcontractService.substraction(op1,op2).then(function(acctInfo : any){
        console.log(acctInfo.toNumber());
        that.Result = acctInfo;
      }).catch(function(error){
        console.log(error);
      });
    }else if(operation == 'multiplication'){
      this.ethcontractService.multiplication(op1,op2).then(function(acctInfo : any){
        console.log(acctInfo.toNumber());
        that.Result = acctInfo;
      }).catch(function(error){
        console.log(error);
      });
    }else if(operation == 'division'){
      this.ethcontractService.division(op1,op2).then(function(acctInfo : any){
        console.log(acctInfo.toNumber());
        that.Result = acctInfo;
      }).catch(function(error){
        console.log(error);
      });
    }else{
      console.log("error");
    }

  }

  // initAndDisplayAccount = (val) => {
  //   console.log(val.target);
  //   let a = 0;let b = 0;
  //   this.ethcontractService.addition(a,b).then(function(acctInfo : any){
  //     console.log(acctInfo.toNumber());
  //   }).catch(function(error){
  //     console.log(error);
  //   });
  // };

}