import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor() { }

  createRestaurant(name) {
    //TODO persist in Firestore.
    console.log('name', name);
    
  }
}
