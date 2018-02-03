import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {CalculatorComponent} from './components/calculator.component';
const routes: Routes = [
  {path: '', component: CalculatorComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: '**', redirectTo: '/calculator', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
