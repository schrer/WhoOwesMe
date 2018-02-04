import {User} from '../model';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CalcBackendService {

  constructor(private http: HttpClient){}

  calcApiDomain = 'localhost:8086';

  getAllUsers(): User[] {

    let users;
    this.http.get("localhost:8086/users").subscribe((result:Response) => users = result.json())
    return users;
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
