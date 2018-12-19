import { Injectable } from '@angular/core';

import * as TruffleContract from 'truffle-contract';
import * as Web3 from 'web3';

declare let require: any;
declare let window: any;


let tokenAbi = require('../../../build/contracts/Calculator.json');

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

private web3Provider:null;
  constructor() {
    this.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
      // this.BasicInfo();
      // this.addition();
   }

  addition(a,b){
      let that = this;

    return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that.web3Provider);

      paymentContract.deployed().then(function(instance) {
        // console.log(instance.addition(2,2));
        return resolve(instance.addition(a,b))
        }).catch(function(error){
          console.log(error);

          return reject("Error in transferEther service call");
        });
    });
  }

  substraction(a,b){
    let that = this;

  return new Promise((resolve, reject) => {
    let paymentContract = TruffleContract(tokenAbi);
    paymentContract.setProvider(that.web3Provider);

    paymentContract.deployed().then(function(instance) {
      return resolve(instance.sub(a,b))
      }).catch(function(error){
        console.log(error);

        return reject("Error in transferEther service call");
      });
  });
}

multiplication(a,b){
  let that = this;

return new Promise((resolve, reject) => {
  let paymentContract = TruffleContract(tokenAbi);
  paymentContract.setProvider(that.web3Provider);

  paymentContract.deployed().then(function(instance) {
    return resolve(instance.mult(a,b))
    }).catch(function(error){
      console.log(error);

      return reject("Error in transferEther service call");
    });
});
}

division(a,b){
  let that = this;

return new Promise((resolve, reject) => {
  let paymentContract = TruffleContract(tokenAbi);
  paymentContract.setProvider(that.web3Provider);
  // paymentContract.defaultAccount(Web3.eth.accounts[0]);
  paymentContract.deployed().then(function(instance) {
  //   Web3.eth.defaultAccount = Web3.eth.accounts[0];
  console.log( instance );
    // return resolve(instance.div(a,b))
    }).catch(function(error){
      console.log(error);

      return reject("Error in transferEther service call");
    });
});
}
}
