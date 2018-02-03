import {Component, OnInit} from '@angular/core';
import {User} from '../model';

@Component({
  selector: 'app-calculator',
  templateUrl: './views/calculator.component.html',
  styleUrls: ['../app.component.css']
})
export class CalculatorComponent implements OnInit {
  title = 'Calculator';
  users = [];

  ngOnInit(): void {
    this.users.push(new User(1, 'martin', 15, 15));
    this.users.push(new User(2, 'fabian', 1, 8));
  }

  calculate(): void {
    console.log('calculate called');
    /*
    //Auslesen der eingetragenen Werte
    let paid = [];
    this.users.forEach();
    var paida = [
      {name: "Michi", amount: +$("#asoziale").val()*100},
      {name: "Martin F.", amount: +$("#freshy").val()*100},
      {name: "Fabian H.", amount: +$("#fubi").val()*100},
      {name: "Martin S.", amount: +$("#torsten").val()*100},
      {name: "Fabian W.", amount: +$("#torben").val()*100}
    ]

    //Berechung des Mittelwertes
    var mean = Math.round(paid.reduce((sum,value) => sum+value.amount, 0) / paid.length);

    //Berechnung wieviel jeder vom Durchscnitt weg ist
    var diff = [];
    paid.forEach(elem => diff.push({name: elem.name, amount: (elem.amount - mean)}));

    //Aufteilung in "Schuldner" und "Gläubiger"
    var inDebt = diff.filter(elem => elem.amount<0).sort(function (a,b) {return Math.abs(b.amount)-Math.abs(a.amount);});
    var creditor = diff.filter(elem => elem.amount>0).sort(function (a,b) {return Math.abs(b.amount)-Math.abs(a.amount);});

    //Negative Werte der "Schuldner ins positive kehren"
    inDebt.forEach(elem => elem.amount= elem.amount*(-1));

    //Aufteilung der "Schuldner" auf "Gläubiger"
    var debitorIndex=0;
    for(var i=0; i<creditor.length; i++){
      var remainingValue=creditor[i].amount;
      creditor[i].debitors = [];
      while(remainingValue>0 && inDebt.length>debitorIndex){
        var debitorValue=inDebt[debitorIndex].amount;
        if(remainingValue<debitorValue){
          creditor[i].debitors.push({"name":inDebt[debitorIndex].name,"amount":remainingValue});
          inDebt[debitorIndex].amount = inDebt[debitorIndex].amount-remainingValue;
          remainingValue = 0;
        } else {
          creditor[i].debitors.push({"name":inDebt[debitorIndex].name,"amount":inDebt[debitorIndex].amount});
          remainingValue = remainingValue - inDebt[debitorIndex].amount;
          debitorIndex++;
        }
      }
    }

    //creditor.forEach(cred => cred.debitors.forEach(deb=>alert(deb.name+" an "+cred.name+" "+deb.amount)));

    var resulttable = $("#resulttable");
    var resultrow = $("[name=resultdummy]");
    var debitorrow = $("[name=debtorrowdummy]");

    resulttable.empty()

    for (var i = 0; i < creditor.length; i++) {

      var newCredRow = resultrow.clone();
      newCredRow.attr("name","resultrow");
      $(newCredRow).find(".creditorcell").text(creditor[i].name + " bekommt");
      resulttable.append(newCredRow);

      for (var j = 0; j <creditor[i].debitors.length; j++) {
        var debitor = creditor[i].debitors[j];
        var newDebRow = debitorrow.clone();
        newDebRow.attr("name","debitorrow");
        $(newDebRow).find(".creditorcell").text(debitor.name + " " + debitor.amount/100 + "€");

        newCredRow.append(newDebRow);
      }
    }*/
  }
}
