import { Item } from "./item.model";



export class OrderedItem {

  constructor(
    public type: string,
    public nameAndPrice: string,
    public weightUnit: number,
    public cost: number,
    public capacity?: string,
    public brewMethodOrMill?: string,
    public brewMethod?: string,
    public mill?: string,
    public grindSize?: string
  ) { }

}