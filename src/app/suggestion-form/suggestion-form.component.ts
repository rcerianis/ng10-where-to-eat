import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {RestaurantService} from './../services/restaurant.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm: FormGroup;

  constructor(private fb: FormBuilder, private rs: RestaurantService) { }

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addRestaurant() {
    console.log(this.suggestionForm.value);
    this.rs.createRestaurant(this.suggestionForm.value.name);
    this.suggestionForm.reset();
  }
}
