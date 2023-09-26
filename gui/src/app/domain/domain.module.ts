import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ListComponent} from "./list/list.component";
import {DomainService} from "../../service/domain/index.service";
import {ShareModule} from "../share/share.module";
import {MsgService} from "../../service/common/msg.service";

const routes: Routes = [
	{path: "", component: ListComponent}
]

const components = [ ListComponent ]
@NgModule({
	imports: [
		RouterModule.forChild(routes),
		ShareModule,
	],
	declarations: components,
	providers: [
		DomainService,
	],
	exports: [
		RouterModule
	]
})
export class DomainModule {

}
