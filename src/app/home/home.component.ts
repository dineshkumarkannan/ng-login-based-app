import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item, Items } from '../interface/items.interface';
import { AuthService } from '../service/auth.service';
import { ItemsService } from '../service/items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalItems =  new FormControl(10, [Validators.required, Validators.min(1)]);
  items: Item[];
  user = null;

  constructor(private itemsService: ItemsService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.user.subscribe(data => this.user = data);
    this.itemsService.getItems().subscribe(({totalItems, items})=>{
      this.totalItems.setValue(totalItems);
      this.items = items;
    });
  }

  get canAddItem(){
    return this.sumOfItems < this.totalItems.value;
  }

  get sumOfItems(){
    return this.items.reduce((sum , {count}) => sum + count, 0);
  }

  updateCount(item, updateBy): void {
    item.count += updateBy;
    this.saveItems();
  }

  updateItemsCount(){
    if(this.sumOfItems > this.totalItems.value){
      this.items.forEach(item => item.count = 0);
    }
    this.saveItems();
  }

  saveItems(){
    if(this.totalItems.valid){
    this.itemsService.updateItems({totalItems: this.totalItems.value, items: this.items});
  }
  }

  logout(){
    this.authService.logOut().subscribe(data=>{
      this.router.navigate(['login']);
    });
  }
}
