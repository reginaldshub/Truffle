import { Injectable } from '@angular/core';

import * as TruffleContract from 'truffle-contract';
import * as Web3 from 'web3';

declare let require: any;
declare let window: any;


let tokenAbi = require('../../../build/contracts/ComplexConfig.json');

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

private web3Provider:null;
  constructor() {
    this.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
    
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
      // this.BasicInfo();
    }


  BasicInfo()  {
    window.web3.eth.defaultAccount = window.web3.eth.accounts[3];
    let that = this;
    

    return new Promise((resolve, reject) => {
      let ComplexConfigContract = TruffleContract(tokenAbi);
      ComplexConfigContract.setProvider(that.web3Provider);
      ComplexConfigContract.defaults({from:window.web3.eth.accounts[5]})
      ComplexConfigContract.deployed().then(function(instance) {
        return resolve(instance.getIT())
        }).catch(function(error){
          console.log(error);
          return reject("Error in transferEther service call");
        });
    });
  }

  Registration(form){
    // console.log(form);
    let that = this;
    return new Promise((resolve, reject) => {
      let ComplexConfigContract = TruffleContract(tokenAbi);
      ComplexConfigContract.setProvider(that.web3Provider);
      ComplexConfigContract.defaults({from: form.address, gas: 4712388, gasPrice: 100000000000})
      ComplexConfigContract.deployed().then(function(instance) {
        return resolve(instance.registerAccountDetails(form.name,form.balance,form.limit));
        // return resolve (instance.getIT());
        }).catch(function(error){
          console.log(error);
          return reject("Error in transferEther service call");
        });
    });
  }

  GetDetails(address){
    let that = this;
    return new Promise((resolve, reject) => {
      let ComplexConfigContract = TruffleContract(tokenAbi);
      ComplexConfigContract.setProvider(that.web3Provider);
      ComplexConfigContract.defaults({from: address, gas: 4712388, gasPrice: 100000000000})
      ComplexConfigContract.deployed().then(function(instance) {
       return resolve (instance.getAccountDetails());
        // return resolve({})
        // return resolve (instance.getIT());
        }).catch(function(error){
          console.log(error);
          return reject("Error in transferEther service call");
        });
    });
  }

}
