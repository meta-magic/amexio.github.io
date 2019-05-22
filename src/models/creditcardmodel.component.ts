export class AmexioCreditCardModel {
    owner: string;
    cvv: number;
    cardnumber: number;
    expMonth: number;
    expYear: number;
    constructor() {
      this.owner = '';
      this.cvv = null;
      this.cardnumber = null;
      this.expMonth = 1;
      this.expYear  = new Date().getFullYear();    }
  }
