import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DomainModule} from "./domain/domain.module";

const routes: Routes = [
	{
		path: 'domain',
		loadChildren: () => import('./domain/domain.module').then(m => m.DomainModule)
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
