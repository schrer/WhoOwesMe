export class User {

  private _userId: number;
  private _name: string;
  private _debtSum: number;
  private _paymentSum: number;

  public constructor(userId: number, name: string, debtSum: number, paymentSum: number) {
    this._userId = userId;
    this._name = name;
    this._debtSum = debtSum;
    this._paymentSum = paymentSum;
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
}
