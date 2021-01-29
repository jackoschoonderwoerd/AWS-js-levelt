import { Injectable } from '@angular/core';

import { Item } from '../../../../models/item.model';


@Injectable({
  providedIn: 'root'
})
export class TeaService {

  constructor() { }

  selectableWeightUnits = [
    50,
    100,
    150,
    200
  ]
  teaItems = [
    new Item('Irish breakfast', 4.60),
    new Item('ceylon -sri lanka', 4.49),
    new Item('afternoon melange', 4.80),
    new Item('engelse melange', 4.60),
    new Item('milde ontbijt melange', 4.80),
    new Item('Margreths hope lentepluk', 2.45),
    new Item('yunnan flowery orange peco', 5.20),
  ]

  getTeaItems() {
    return this.teaItems
  }
  getSelectableWeightUnits() {
    return this.selectableWeightUnits;
  }
}
