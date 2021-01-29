
import { OrderInfo } from './order-info.model';

import { OrderedItem } from './ordered-item.model';

export class FinalOrder {

    constructor(
      public orderInfo: OrderInfo,
      public orderedItems: OrderedItem[],
      public finalPrice: number,
      public extractedTimeslot?: string
    ) {  }
  }