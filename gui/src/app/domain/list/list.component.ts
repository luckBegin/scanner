import {Component, OnInit} from "@angular/core";
import {DomainService} from "../../../service/domain/index.service";

@Component({
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	constructor(
		private readonly service: DomainService
	) {
	}

	ngOnInit() {
		this.service.list()
			.subscribe((r: any) => {
				console.log(r);
			})
	}
}
