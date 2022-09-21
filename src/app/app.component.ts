import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BankTransferManagementService } from './bank-transfer-management.service';
import { BankDetails, BankListEnum } from './data.model';
import { v4 as uuid } from 'uuid'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'toDo';
  selectedBank:any;
  amount = 60000;
  transferForm!: FormGroup;
  bankEnum = BankListEnum;
  bankList:any = [ ]
  isEdit = false;
  bankTransferDetails: BankDetails[] = [];
  editedTransferDetails:any

 ngOnInit(){
  this.bankList = this.transferService.getBankList();
  this.selectedBank = this.bankList[0];
  this.buildForm();
 }

 editTransaction(bankDetails:BankDetails){
  this.isEdit = true;
  this.editedTransferDetails = bankDetails;
  this.transferForm.controls['amount'].setValue(bankDetails.isCredit ? bankDetails.creditedAmount : bankDetails.debitedAmout);
  this.transferForm.controls['reason'].setValue(bankDetails.reason);
  this.transferForm.controls['amount'].disable();
 }


 getBankTransferDetails(){
  // this.transferService.getBankTransferList(this.selectedBank.id)[0].bankTransfersList;
  this.bankTransferDetails = this.transferService.getBankTransferList(this.selectedBank.id).flatMap((ba:any) => ba.bankTransfersList);
 }

 constructor(private fb: FormBuilder,
            private transferService: BankTransferManagementService){

 }

 buildForm(){
  this.transferForm = this.fb.group({
    amount: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required)
  })
 }



 selected(){
  console.log(this.selectedBank.name)
  this.getBankTransferDetails()
 }

creditTransfer(){
  if(this.transferForm.invalid) return
  console.log(this.transferForm.value);
  let payload = this.constructPayload(true);
  this.transferService.updateValue2(payload, this.selectedBank.id)
  this.transferForm.reset();
  this.getBankTransferDetails()
}

save(){
  let payload = {
    ...this.editedTransferDetails,
    ...this.transferForm.value
  }
  this.transferService.updateExisitingValue(payload,this.selectedBank.id);
  this.isEdit = false;
  this.getBankTransferDetails();
  this.transferForm.reset();
  this.transferForm.controls['amount'].enable();
}
constructPayload(isCredit:boolean){
  this.amount = isCredit ? +(this.amount) + +(this.transferForm.value.amount) : this.amount - this.transferForm.value.amount;
  let value:BankDetails = {
    debitedAmout: !isCredit ? this.transferForm.value.amount : '',
    creditedAmount: isCredit ? this.transferForm.value.amount : '',
    reason: this.transferForm.value.reason,
    bankName: this.selectedBank.name,
    balance: this.amount,
    date: new Date(),
    isCredit: isCredit,
    id: uuid()
  }
  isCredit ? delete value.debitedAmout : delete value.creditedAmount;
  return value
}

 debitTransfer(){
  if(this.transferForm.invalid) return;
  console.log(this.transferForm.value);
  let payload = this.constructPayload(false);
  this.transferService.updateValue2(payload, this.selectedBank.id)
  this.transferForm.reset();
  this.getBankTransferDetails()
 }

}
