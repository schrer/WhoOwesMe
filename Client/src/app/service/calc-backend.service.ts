import {User} from '../model';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CalcBackendService {

  constructor(private http: HttpClient){}

  calcApiDomain = 'http://localhost:8086';

  getAllUsers(): User[] {

    let users: User[] = []
    this.http.get<User[]>(this.calcApiDomain + "/users").subscribe(data=>{data.forEach(backendUser => {users.push(this.convertBackendToFrontendUser(backendUser))})});
    return users;
  }



  getActiveUsers(): User[] {
    let users: User[] = []
    this.http.get<User[]>(this.calcApiDomain + "/users/active").subscribe(data=>{data.forEach(backendUser => {users.push(this.convertBackendToFrontendUser(backendUser))})});
    return users;
  }

  getUser(userId: number): User {
    let user: User;
    this.http.get<User>(this.calcApiDomain + "/users/" + userId).subscribe(backendUser => user = this.convertBackendToFrontendUser(backendUser));
    return user;
  }

  addUser(name: string): void {
    this.http.post(this.calcApiDomain + "/users",{name:name}).subscribe();
  }

  deleteUser(userId: number): void {
    this.http.delete(this.calcApiDomain + "/users/" + userId).subscribe();
  }

  addPayment(userId: number, amount: number): void {
    this.http.put(this.calcApiDomain + "/payments", {userId:userId,amount:amount}).subscribe();
  }

  deletePayment(paymentId: number): void {
    this.http.delete(this.calcApiDomain + "/payments/" + paymentId).subscribe();
  }

  addDebt(debtor:number,lender:number,amount:number): void {
    this.http.put(this.calcApiDomain + "/payments", {debtor:debtor, lender:lender, amount:amount}).subscribe();
  }

  setUserActive(userId:number, active:boolean): void {
    let request;
    if(active){
      request = "users/activate";
    } else {
      request = "users/deactivate";
    }
    this.http.post(this.calcApiDomain + request,{id:userId}).subscribe();
  }

  convertBackendToFrontendUser(backendUser: User): User {
    return new User(backendUser.userId, backendUser.name, backendUser.debtSum, backendUser.purchaseSum, backendUser.active);
  }

}
