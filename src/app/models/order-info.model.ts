export class OrderInfo {

    constructor(
      public clientName: string,
      public clientEmail: string,
      public pickupDate: Date,
      public pickupTimeslot: string,
      public stamps: boolean,
      public clientPhone?: string
    ) { }
  }