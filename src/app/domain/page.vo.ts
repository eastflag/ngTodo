export class PageVO {

  constructor(public pageIndex: number,
              public pageSize: number,
              public totalCount: number,
              public pageSizeOptions?: number[]) {

  }
}
