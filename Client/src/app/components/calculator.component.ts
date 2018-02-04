import {Component, OnInit} from '@angular/core';
import {User} from '../model';
import {CalcBackendService} from '../service/calc-backend.service';

declare var $: any;

@Component({
  selector: 'app-calculator',
  templateUrl: './views/calculator.component.html',
  styleUrls: ['../app.component.css']
})
export class CalculatorComponent implements OnInit {
  title = 'Calculator';
  backendService: CalcBackendService;
  users: User[] = [];
  showCalculations = false;
  creditors: any[] = [];


  ngOnInit(): void {
    this.backendService = new CalcBackendService();
    this.users = this.backendService.getActiveUsers();

    /*
    this.users.push(new User(1, 'martin', 15, 15));
    this.users.push(new User(2, 'fabian', 1, 8));
    this.users.push(new User(3, 'michi', 1, 8));
    this.users.push(new User(4, 'fubi', 1, 8));
    */
  }

  calculate(): void {

    // Auslesen der eingetragenen Werte
    const paid: Map<number, number> = new Map<number, number>();
    this.users.forEach(user => {
      const value = $('#user-' + user.userId).val();
      paid.set(user.userId, (value && value >= 0) ? value * 100 : 0);
    });
    paid.forEach(u => console.log(u));

    // Berechung des Mittelwertes
    let sum = 0;
    paid.forEach((value, key) => {
      sum = sum + value;
    });
    const mean = Math.round(sum / paid.size);

    // Berechnung wieviel jeder vom Durchscnitt weg ist
    const diff = [];
    paid.forEach((value, key) => diff.push({name: key, amount: (value - mean)}));

    // Aufteilung in "Schuldner" und "Gläubiger"
    const inDebt = diff.filter(elem => elem.amount < 0).sort(function (a, b) {return Math.abs(b.amount) - Math.abs(a.amount); });
    const creditor = diff.filter(elem => elem.amount > 0).sort(function (a, b) {return Math.abs(b.amount) - Math.abs(a.amount); });

    // Negative Werte der "Schuldner ins positive kehren"
    inDebt.forEach(elem => elem.amount = elem.amount * (-1));




    // Aufteilung der "Schuldner" auf "Gläubiger"
    let debitorIndex = 0;
    for (let i = 0; i < creditor.length; i++) {
      let remainingValue = creditor[i].amount;
      creditor[i].debitors = [];
      while (remainingValue > 0 && inDebt.length > debitorIndex) {
        const debitorValue = inDebt[debitorIndex].amount;
        if (remainingValue < debitorValue) {
          creditor[i].debitors.push({'name' : inDebt[debitorIndex].name, 'amount' : remainingValue / 100});
          inDebt[debitorIndex].amount = inDebt[debitorIndex].amount - remainingValue;
          remainingValue = 0;
        } else {
          creditor[i].debitors.push({'name': inDebt[debitorIndex].name, 'amount': inDebt[debitorIndex].amount / 100});
          remainingValue = remainingValue - inDebt[debitorIndex].amount;
          debitorIndex++;
        }
      }
    }

    // creditor.forEach(cred => cred.debitors.forEach(deb=>alert(deb.name+" an "+cred.name+" "+deb.amount)));
    // creditor:{debitors:[{name,amount}],name,amount}

    creditor.forEach((value) => console.log('name: ' + value.name + 'value: ' + value.debitors.length));
    this.creditors = creditor;

    this.showCalculations = true;
  }

  getUserById(userId: number): User {
    return this.users.find(u => u.userId === userId);
  }
}
