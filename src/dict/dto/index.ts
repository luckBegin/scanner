import { IQuery, Query } from "../../common/model/query";
import { Dict, DictType } from "../entity/index.entity";

export interface IDictListQuery extends IQuery {
	type: DictType;
}

export class DictListQuery extends Query implements IDictListQuery {
	type: DictType;

	constructor(q: IDictListQuery) {
		super(q);
		if(q) q.type && (this.type = q.type)
	}
}


export class DictFileVo {
	name: string;
	type: DictType;
	fileName: string;
	result: Array<string>;

	constructor(d: Dict) {
		this.name = d.name ;
		this.fileName = d.fileName
		this.type = d.type
	}

	static build(d: Dict) {
		return new DictFileVo(d)
	}

	setResult(r: Array< string > ): this {
		this.result = r ;
		return this
	}
}
