import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { Items } from './../interface/items.interface';

const Items: Items = {
  "totalItems": 10,
  "items": [{
    "name": "Orange",
    "count": 5
  },
  {
    "name": "Banan",
    "count": 2
  },
  {
    "name": "Grape",
    "count": 3
  }]
};

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor() { }

  getItems() {
    let items: Items = Items;
    if(localStorage.getItem('allItems')){
      items = JSON.parse(localStorage.getItem('allItems'));
    }
    return of(items);
  }

  updateItems(data: Items){
    localStorage.setItem('allItems', JSON.stringify(data));
    return of({success: true});
  }
}
