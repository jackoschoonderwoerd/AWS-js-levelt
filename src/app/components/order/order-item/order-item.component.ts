import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FinalOrder } from 'src/app/models/final-order.model';
import { OrderedItem } from 'src/app/models/ordered-item.model';
import { OrderService } from '../order-services/order.service';
import { CoffeeService } from './order-item-services/coffee.service';
import { TeaService } from './order-item-services/tea.service';
import { OrderedItemInfoDialogComponent } from './ordered-item-info-dialog/ordered-item-info-dialog.component';


@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  divClicked = false;

  orderItemForm: FormGroup;
  coffeeItems: string[] = [];
  isEditMode: boolean = false;
  type: string;
  namesAndPrices: string[];
  weightUnits: number[];
  itemPrice: number;
  itemPricePerGram: number
  itemCost: number;
  orderedItem: OrderedItem;
  selectedNameAndPrice: string;
  orderedItemIndex: number;
  capacity: string;
  brewMethods: string[];
  grindSizes: string[];

  isFormIsValid: boolean = false;
  isWeightSelected: boolean = false;
  isItemSelected: boolean = false;
  


  constructor(
    private fb: FormBuilder,
    private coffeeService: CoffeeService,
    private teaService: TeaService,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private dialog: MatDialog

  ) {
  }

  ngOnInit(): void {
    this.orderService.getFinalOrder();
    this.orderService.informTopNavOrederedItemsAmount();
    this.initForm();
    if (this.route.snapshot.paramMap.get('editMode') === 'true') {
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }
    this.type = this.route.snapshot.paramMap.get('type')
    if (this.type === 'coffee') {
      this.namesAndPrices = this.coffeeService.getNamesAndPrices();
      this.weightUnits = this.coffeeService.getSelectableWeightUnits()
      this.brewMethods = this.coffeeService.getBrewMethods();
      this.grindSizes = this.coffeeService.getGrindSizes();
    } else if (this.type === 'tea') {
      this.namesAndPrices = this.teaService.getNamesAndPrices();
      this.weightUnits = this.teaService.getSelectableWeightUnits()
    }
    const index = this.route.snapshot.paramMap.get('index');
    if (index) {
      this.orderedItemIndex = +this.route.snapshot.paramMap.get('index');
      this.isEditMode = true
      this.orderedItem = this.orderService.getOrderedItem(index);
      this.type = this.orderedItem.type;
      if (this.type === 'coffee') {
        this.namesAndPrices = this.coffeeService.getNamesAndPrices();
        this.weightUnits = this.coffeeService.getSelectableWeightUnits();
        this.brewMethods = this.coffeeService.getBrewMethods();
        this.grindSizes = this.coffeeService.getGrindSizes();
      } else if (this.type === 'tea') {
        this.namesAndPrices = this.teaService.getNamesAndPrices();
        this.weightUnits = this.teaService.getSelectableWeightUnits();
      }
      this.orderItemForm.setValue({
        nameAndPrice: this.orderedItem.nameAndPrice,
        weightUnit: this.orderedItem.weightUnit,
        capacity: this.orderedItem.capacity,
        brewMethodOrMill: this.orderedItem.brewMethodOrMill,
        brewMethod: this.orderedItem.brewMethod,
        mill: this.orderedItem.mill,
        grindSize: this.orderedItem.grindSize
      })
      this.calculateItemCost();

      this.validateForm();
    }
  }

  initForm() {
    this.orderItemForm = this.fb.group({
      // type: new FormControl(null, [Validators.required]),
      nameAndPrice: new FormControl(null, [Validators.required]),
      weightUnit: new FormControl(null, [Validators.required]),
      // cost: new FormControl(null, []),
      capacity: new FormControl(null, []),
      brewMethodOrMill: new FormControl(null, []),
      brewMethod: new FormControl(null, []),
      mill: new FormControl(null, []),
      grindSize: new FormControl(null, [])
      // mill: new FormControl(null, []),
      // grindSize: new FormControl(null, []),
    })
  }

  nameAndPriceChanged(e): void {
    this.calculateItemCost();
    this.isItemSelected = true;
    // this.dialog.open(OrderedItemInfoDialogComponent , {data: {name: e.value}})
  }
  selectedWeightUnitChanged(e): void {
    this.calculateItemCost();
    this.isWeightSelected = true;
    this.validateForm()
  }

  capacitySelectedChanged(e) {
    if (e.value === 'beans') {
      this.orderItemForm.patchValue({
        brewMethodOrMill: null,
        brewMethod: null,
        mill: null,
        grindSize: null
      })
    } else if (e.value = 'ground') {
      this.orderItemForm.patchValue({
        brewMethodOrMill: null,
        brewMethod: null,
        mill: null,
        grindSize: null
      })
    }
    this.validateForm();
  }
  brewMethodOrMillChanged(e) {
    if (e.value === 'brewMethod') {
      this.orderItemForm.patchValue({
        mill: null,
        grindSize: null
      });
    } else if (e.value === 'mill') {
      this.orderItemForm.patchValue({
        brewMethod: null
      });
    }
    this.validateForm();
  }

  brewMethodSelected() {
    this.validateForm();
  }
  millSelected() {
    this.validateForm();
  }
  grindSizeSelected() {
    this.validateForm();
  }

  validateForm() {

    if (this.type === 'coffee') {
      if (
        this.orderItemForm.value.nameAndPrice &&
        this.orderItemForm.value.weightUnit &&
        this.orderItemForm.value.capacity === 'beans') {
          this.isFormIsValid = true;
      } else if (
        this.orderItemForm.value.nameAndPrice &&
        this.orderItemForm.value.weightUnit &&
        this.orderItemForm.value.capacity === 'ground' &&
        this.orderItemForm.value.brewMethodOrMill === 'brewMethod' &&
        this.orderItemForm.value.brewMethod) {
          this.isFormIsValid = true;
      } else if (
        this.orderItemForm.value.nameAndPrice &&
        this.orderItemForm.value.weightUnit &&
        this.orderItemForm.value.capacity === 'ground' &&
        this.orderItemForm.value.brewMethodOrMill === 'mill' &&
        this.orderItemForm.value.mill &&
        this.orderItemForm.value.grindSize) {
          this.isFormIsValid = true;
      } else {
          this.isFormIsValid = false;
      }
    } else if (this.type === 'tea') {
      if (
        this.orderItemForm.value.nameAndPrice &&
        this.orderItemForm.value.weightUnit) {
          this.isFormIsValid = true;
      } else {
        this.isFormIsValid = false;
      }
    }
  }


  onSubmitOrderForm(): void {
    if (this.isEditMode) {
      this.orderService.editOrderedItem(
        new OrderedItem(
          this.type,
          this.orderItemForm.value.nameAndPrice,
          this.orderItemForm.value.weightUnit,
          this.itemCost,
          this.orderItemForm.value.capacity,
          this.orderItemForm.value.brewMethodOrMill,
          this.orderItemForm.value.brewMethod,
          this.orderItemForm.value.mill,
          this.orderItemForm.value.grindSize
        ),
        this.orderedItemIndex
      );
      this.router.navigate(['/order']);
    } else {
      this.orderService.addToOrderedItems(
        new OrderedItem(
          this.type,
          this.orderItemForm.value.nameAndPrice,
          this.orderItemForm.value.weightUnit,
          this.itemCost,
          this.orderItemForm.value.capacity,
          this.orderItemForm.value.brewMethodOrMill,
          this.orderItemForm.value.brewMethod,
          this.orderItemForm.value.mill,
          this.orderItemForm.value.grindSize
        )
      );
      this.router.navigate(['/order']);
    }
  }

  onCancel() {
    this.orderItemForm.reset();
    this.itemCost = 0
    this.orderItemForm.invalid;
    this.router.navigate(['/order'])
  }

  private extractItemPrice(nameAndPrice: string): number {
    const nameAndPriceArray = nameAndPrice.split('€')
    this.itemPrice = +nameAndPriceArray[nameAndPriceArray.length - 1].trim();
    return +nameAndPriceArray[nameAndPriceArray.length - 1].trim();

  }
  private calculateItemCost(): void {

    if (this.type === 'coffee') {
      const nameAndPrice = this.orderItemForm.value.nameAndPrice;
      const itemPricePerGram = this.extractItemPrice(nameAndPrice) / 250;
      const selectedWeight = this.orderItemForm.value.weightUnit;
      this.itemCost = (itemPricePerGram * selectedWeight)
    } else if (this.type === 'tea') {
      const nameAndPrice = this.orderItemForm.value.nameAndPrice;
      const itemPricePerGram = this.extractItemPrice(nameAndPrice) / 100;
      const selectedWeight = this.orderItemForm.value.weightUnit;
      this.itemCost = (itemPricePerGram * selectedWeight)
    }
  }
  onInfo() {
  }

}
