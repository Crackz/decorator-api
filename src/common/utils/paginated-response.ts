type PaginatedResponseArgs<T> = {
	data: Array<T>;
	totalCount: number;
	page: number;
	limit: number;
};

export class PaginatedResponse<T> {
	// private links: any = {};
	private data: Array<T>;
	private page: number;
	private limit: number;
	private pageCount: number;
	private totalCount: number;

	constructor({ data, totalCount, page, limit }: PaginatedResponseArgs<T>) {
		this.data = data;
		this.page = page;
		this.limit = limit;
		this.pageCount = Math.ceil(totalCount / limit);
		this.totalCount = totalCount;

		// this.addSelfLink();

		// if (page >= 1 && page < this.pageCount) this.addNextLink();

		// if (page > 1 && page <= this.pageCount) this.addPrevLink();
	}

	// addSelfLink() {
	// 	this.links.self = this.currentDomain + '?page=' + this.page + '&limit=' + this.limit; // self page
	// }

	// addNextLink() {
	// 	const afterPage = this.page + 1;
	// 	this.links.next = this.currentDomain + '?page=' + afterPage + '&limit=' + this.limit; // next page
	// 	this.links.last = this.currentDomain + '?page=' + this.pageCount + '&limit=' + this.limit; // last page
	// }

	// addPrevLink() {
	// 	const prevPage = this.page - 1;
	// 	this.links.prev = this.currentDomain + '?page=' + prevPage + '&limit=' + this.limit; // prev page
	// 	this.links.first = this.currentDomain + '?page=1' + '&limit=' + this.limit; // first page
	// }
}
