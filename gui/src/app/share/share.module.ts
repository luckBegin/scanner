import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import {HttpClientModule} from "@angular/common/http"
import { IconDefinition } from '@ant-design/icons-angular';
import { MenuFoldOutline, MenuUnfoldOutline, TeamOutline, UserOutline} from '@ant-design/icons-angular/icons';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
const icons: IconDefinition[] = [ MenuFoldOutline, MenuUnfoldOutline, TeamOutline, UserOutline ];
@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		NzIconModule.forRoot(icons),
		HttpClientModule,
		NzMenuModule,
		BrowserAnimationsModule
	],
	exports: [
		NzLayoutModule,
		NzBreadCrumbModule,
		NzIconModule,
		HttpClientModule,
		NzMenuModule,
		BrowserAnimationsModule
	]
})
export class ShareModule {
}
