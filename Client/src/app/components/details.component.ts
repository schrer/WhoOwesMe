import {Component, Inject} from "@angular/core";
import {User} from "../model";
import {CalcBackendService} from "../service/calc-backend.service";
import {MatTableDataSource} from "@angular/material";
import {Observable} from "rxjs/Observable";

@Component({
	selector: 'app-details',
	templateUrl: 'views/details.component.html',
	styleUrls: ['../app.component.css']
})

export class DetailsComponent {

  constructor(private calcBackendService: CalcBackendService){
    this.dataSource = new MatTableDataSource();
  }

  users: Observable<User[]>;
  dataSource;

  ngOnInit(){

    this.calcBackendService.getAllUsers().subscribe(data=>{this.dataSource.data = this.calcBackendService.convertBackendToFrontendUsers(data)});

  }

}
