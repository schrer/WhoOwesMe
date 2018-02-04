import {User} from '../model';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class CalcBackendService {

  constructor(private http: HttpClient){}

  calcApiDomain = 'localhost:8086';

  getAllUsers(): User[] {

    let users: User[] = []
    this.http.get<User[]>("http://127.0.0.1:8086/users").subscribe(data=>{data.forEach(element => {users.push(new User(element.userId, element.name, element.debtSum, element.purchaseSum, element.active))})});
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
