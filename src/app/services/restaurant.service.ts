import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  collectionName = 'restaurants';

  constructor(private afs: AngularFirestore) { }

  createRestaurant(name) {
    //TODO persist in Firestore.
    console.log('name', name);
    this.afs
    .collection(this.collectionName)
    .add({name: name, createdAt: Date.now(), votes: 0});
  }

  readRestaurants() {
    return this.afs.collection<Restaurant>(this.collectionName, ref => ref.orderBy('name', 'asc'));
  }

  voteForRestaurant(restaurant: Restaurant) {
    // return this.afs.doc(`${this.collectionName}/${restaurant.id}`).update({
    //   ...restaurant,
    //   votes: restaurant.votes + 1
    // });
    return this.afs.doc(`${this.collectionName}/${restaurant.id}`)
    .update({
      votes: restaurant.votes + 1
    });
  }
}
