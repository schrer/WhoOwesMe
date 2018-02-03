export class User {

  private _userId: number;
  private _name: string;
  private _debtSum: number;
  private _paymentSum: number;
  private _payment_string: string;
  private _payment: number;

  public constructor(userId: number, name: string, debtSum: number, paymentSum: number) {
    this._userId = userId;
    this._name = name;
    this._debtSum = debtSum;
    this._paymentSum = paymentSum;
    this._payment_string = null;
    this._payment = 0;
  }


  get userId(): number {
    return this._userId;
  }

  get name(): string {
    return this._name;
  }

  get debtSum(): number {
    return this._debtSum;
  }

  get paymentSum(): number {
    return this._paymentSum;
  }


  get payment_string(): string {
    return this._payment_string;
  }

  set payment_string(value: string) {
    this._payment_string = value;
  }

  get payment(): number {
    return this._payment;
  }

  set payment(value: number) {
    this._payment = value;
  }
}
