import { Injectable } from '@angular/core';
import { BankDetails } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class BankTransferManagementService {

  bankList:any = [
    {id: '1', name: 'HDFC Bank'},
    {id: '2', name: 'ICICI Bank'},
    {id: '3' , name: 'SBI Bank'},
  ]
  bankDetails = [
    {
      bankId: '1',
      bankName: 'HDFC Bank',
      bankTransfersList: Array()
    },
    {
      bankId: '2',
      bankName: 'ICICI Bank',
      bankTransfersList: Array()
    },
    {
      bankId: '3',
      bankName: 'SBI Bank',
      bankTransfersList: Array()
    }
  ]
  constructor() { }

  updateValue2(value:any,id:string){
   this.bankDetails.find(bank => {
    return bank.bankId == id;
   })?.bankTransfersList.unshift(value);
 }

  updateExisitingValue(value:any,id:string){
     this.bankDetails = this.bankDetails.map(bank =>{
      if(bank.bankId === id){
       let dt = bank.bankTransfersList.map(bt => {
          let obj =  bt;
          if(obj.id === value.id){
            obj = {
              ...obj,
              ...value
            }
          }
          return obj;
        })
        return {
          ...bank,
          bankTransfersList: dt
        };
      }
        return bank;
     });
  }

  getBankTransferList(id: string){
    return this.bankDetails.filter(bank => bank.bankId === id);
  }

   getBankList(){
    return this.bankList
   }
}
