export class BankDetails{
  balance: any;
  reason!: string;
  debitedAmout?: string;
  creditedAmount?: string;
  bankName?: string;
  date: any;
  isCredit?:any;
  id?: string;
}

export class BankTranferDetails{
  bankId!: string;
  bankTransferDetails!: BankDetails[];
}

export enum BankListEnum{
  'HDFC' = 'HDFC Bank',
  'ICICI' = 'ICICI Bank',
  'SBI' = 'SBI Bank'
}
