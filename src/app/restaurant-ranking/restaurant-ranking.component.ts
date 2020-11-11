import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-restaurant-ranking',
  templateUrl: './restaurant-ranking.component.html',
  styleUrls: ['./restaurant-ranking.component.css']
})
export class RestaurantRankingComponent implements OnChanges, OnDestroy {
  @Input() restaurants$: Observable<Restaurant[]>;
  sortedRestaurants: Restaurant[];
  sub: Subscription;

  constructor() { }
  
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.sub.unsubscribe();
  }
  
  ngOnChanges(changes): void {
    if (!changes.restaurants$.currentValue) {
      return;
    }
    this.sub = changes.restaurants$.currentValue.pipe(
      map((restaurants: Restaurant[]) => {
        const sortResult = restaurants.sort(this.sortByScore);
        this.sortedRestaurants = sortResult;
        return this.sortedRestaurants;
      })
    ).subscribe();
  }

  sortByScore(r1, r2) {
    if (r1.votes > r2.votes) {
      return -1;
    } else if (r1.votes < r2.votes) {
      return 1;
    } else {
      return 0;
    }
  }

  
}
