export class User {

  private _userId: number;
  private _name: string;
  private _debtSum: number;
  private _purchaseSum: number;
  private _payment_string: string;
  private _payment: number;
  private _active: boolean;

  public constructor(userId: number, name: string, debtSum: number, purchaseSum: number, active: boolean) {
    this._userId = userId;
    this._name = name;
    this._debtSum = debtSum;
    this._purchaseSum = purchaseSum;
    this._payment_string = null;
    this._payment = 0;
    this._active = active;
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

  get purchaseSum(): number {
    return this._purchaseSum;
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

  get active(): boolean {
    return this._active;
  }
}
