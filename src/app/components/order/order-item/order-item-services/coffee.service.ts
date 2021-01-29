import { Injectable } from '@angular/core';

import { Item } from '../../../../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {


  namesAndPrices = [
    'Guji Hambela Natural, 250 gr. € 4.89',
    'Maliba Kasese Natural, 250 gr. € 8.95',
    'Caracolito Parelkoffie - Brazilië, 250 gr. € 6.95',
    'La Victoria Huila, 250 gr. € 6.95',
    'Roma, 250 gr. € 6.95',
    'Palermo, 250 gr. € 5.95',
    'Estrella decaf, 250 gr. € 5.94',
    'Amsterdamse brand, 250 gr. € 5.60',
  ]

  // oldCoffeeItems = [
  //   new Item('Guji Hambela Natural', 4.89),
  //   new Item('Maliba Kasese Natural', 8.95),
  //   new Item('Caracolito Parelkoffie - Brazilië', 6.95),
  //   new Item('La Victoria Huila', 6.95),
  //   new Item('Roma', 6.95),
  //   new Item('Palermo', 5.95),
  //   new Item('Estrella decaf', 5.94),
  //   new Item('Amsterdamse brand', 5.60),
  // ]
  selectableWeightUnits = [
    100,
    250,
    1000
  ];

  brewMethods = [
    "filter",
    "espresso",
    "cafetière",
    "moka",
    "perc.",
    "cezve",
    "fresco"
  ];

  grindSizes = ['0,5', '1', '1,5', '2', '2,5', '3', '3,5', '4', '4,5', '5']

  constructor() { }

  getNamesAndPrices() {
    return this.namesAndPrices;
  }
  getSelectableWeightUnits() {
    return this.selectableWeightUnits;
  }
  getBrewMethods() {
    return this.brewMethods;
  }
  getGrindSizes () {
    return this.grindSizes;
  }
}
