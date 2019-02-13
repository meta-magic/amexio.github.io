/**
 * Created by dattaram on 13/2/19.
 */

export class PageInfo {
  pageNumber:  number;
  startIndex: number;
  endIndex: number;
  constructor(pN: number, eI: number, rows: number) {
    this.pageNumber = pN;
    this.endIndex = eI;
    this.startIndex = (this.endIndex - rows + 1);
  }
}
