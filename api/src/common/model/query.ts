export interface IQuery{
	pageSize: number
	pageNumber: number
}
export class Query implements IQuery{
	pageSize: number = 10
	pageNumber: number = 1

	constructor(q: IQuery) {
		if(q) {
			this.pageSize = q.pageSize || this.pageSize
			this.pageNumber = q.pageNumber || this.pageNumber
		}
	}
}
