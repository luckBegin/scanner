import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import {IconDefinition} from '@ant-design/icons-angular';
import {MenuFoldOutline, MenuUnfoldOutline, TeamOutline, UserOutline} from '@ant-design/icons-angular/icons';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {MsgService} from "../../service/common/msg.service";
import {TableComponent} from "../../components/table/table.component";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";

const icons: IconDefinition[] = [MenuFoldOutline, MenuUnfoldOutline, TeamOutline, UserOutline];

const components = [
	TableComponent,
]

const modules = [
	NzMenuModule,
	NzTableModule,
	NzDividerModule
]

@NgModule({
	declarations: [
		...components
	],
	providers: [
		MsgService
	],
	imports: [
		CommonModule,
		NzIconModule.forRoot(icons),
	],
	exports: [
		NzLayoutModule,
		NzBreadCrumbModule,
		NzIconModule,
		CommonModule,
		...components,
		...modules
	]
})
export class ShareModule {
}
