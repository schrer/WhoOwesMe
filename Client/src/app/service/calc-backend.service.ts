import {User} from '../model';

export class CalcBackendService {
  getAllUsers(): User[] {
    return null;
  }

  getActiveUsers(): User[] {
    return null;
  }

  getUser(userId: number): User {
    return null;
  }

  addUser(name: string): boolean {
    return false;
  }

  deleteUser(userId: number): boolean {
    return false;
  }

  addPayment(amount: number): boolean {
    return false;
  }

  deletePayment(paymentId: number): boolean {
    return false;
  }
}
