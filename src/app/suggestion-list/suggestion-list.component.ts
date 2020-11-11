import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { RestaurantService } from '../services/restaurant.service';
import {Restaurant} from './../../app/models/restaurant'
import {Observable} from 'rxjs';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent implements OnInit {
  restaurantCollection: AngularFirestoreCollection<Restaurant>;
  restaurants$: Observable<Restaurant[]>;

  constructor(private rs: RestaurantService) { }

  async ngOnInit() {
    this.restaurantCollection = await this.rs.readRestaurants();
    this.restaurants$ = this.restaurantCollection.valueChanges({idField: 'id'});
  }

  async vote(restaurant) {
    console.log(restaurant.id);
    await this.rs.voteForRestaurant(restaurant)
  }

  setRankLabel(restaurant: Restaurant) {
    const label = restaurant.votes <= 1 ?
     `${restaurant.votes} vote pour ${restaurant.name}` :
      `${restaurant.votes} votes pour ${restaurant.name}`;
    return label;
  }
}
