export class OrderInfo {

    constructor(
      public clientName: string,
      public clientEmail: string,
      public pickupDate: number,
      public selectedPickupDate: any,
      public pickupTimeslot: string,
      public stamps: boolean,
      public clientPhone?: string
    ) { }
  }