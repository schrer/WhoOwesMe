import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../model";
import {CalcBackendService} from "../service/calc-backend.service";
import {MatTableDataSource} from "@angular/material";
import {Observable} from "rxjs/Observable";
import 'hammerjs/hammer';

@Component({
	selector: 'app-details',
	templateUrl: 'views/details.component.html',
	styleUrls: ['../app.component.css']
})

export class DetailsComponent implements OnInit {
  users: Observable<User[]>;
  dataSource;

  constructor(private calcBackendService: CalcBackendService){
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(){
    this.calcBackendService.getAllUsers().subscribe(data=>{this.dataSource.data = this.calcBackendService.convertBackendToFrontendUsers(data)});
  }

}
