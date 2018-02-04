import {Component, Inject} from "@angular/core";
import {User} from "../model";
import {CalcBackendService} from "../service/calc-backend.service";

@Component({
	selector: 'app-details',
	templateUrl: 'views/details.component.html',
	styleUrls: ['../app.component.css']
})

export class DetailsComponent {

  constructor(private calcBackendService: CalcBackendService){}

  users: User[] = [];

  ngOnInit(){

    this.users = this.calcBackendService.getAllUsers();


  }




}
