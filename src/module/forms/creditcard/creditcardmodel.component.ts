export class AmexioCreditCardModel {
    owner: string;
    cvv: number;
    cardnumber: string;
    expMonth: string;
    expYear: number;
    constructor() {
      this.owner = '';
      this.cvv = null;
      this.cardnumber = '';
      this.expMonth = 'January';
      this.expYear = 2018;
    }
  }
