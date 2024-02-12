import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  let initialBalance: number;
  let account: BankAccount;

  beforeEach(() => {
    initialBalance = 400;
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(initialBalance + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account2 = getBankAccount(0);
    expect(() => account.transfer(initialBalance + 1, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositAmount = 100;
    const expectedBalance = initialBalance + depositAmount;
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(expectedBalance);
  });

  test('should withdraw money', () => {
    const withdrawalAmount = 100;
    const expectedBalance = initialBalance - withdrawalAmount;
    account.withdraw(withdrawalAmount);
    expect(account.getBalance()).toBe(expectedBalance);
  });

  test('should transfer money', () => {
    const initialBalance2 = 0;
    const transferAmount = 100;
    const account2 = getBankAccount(initialBalance2);
    const expectedBalance1 = initialBalance - transferAmount;
    const expectedBalance2 = initialBalance2 + transferAmount;
    account.transfer(transferAmount, account2);
    expect(account.getBalance()).toBe(expectedBalance1);
    expect(account2.getBalance()).toBe(expectedBalance2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const number = 55;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(number);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 100;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(balance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
