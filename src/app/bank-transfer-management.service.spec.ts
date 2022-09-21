import { TestBed } from '@angular/core/testing';

import { BankTransferManagementService } from './bank-transfer-management.service';

describe('BankTransferManagementService', () => {
  let service: BankTransferManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankTransferManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
