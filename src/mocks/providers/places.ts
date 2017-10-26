import { Injectable } from '@angular/core';

import { Place } from '../../models/place';

@Injectable()
export class Places {
  places: Place[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let places = [
      {
        "name": "Burt Bear",
        "about": "Burt is a Bear."
      },
      {
        "name": "Charlie Cheetah",
        "about": "Charlie is a Cheetah."
      }
    ];

    for (let place of places) {
      this.places.push(new Place(place));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.places;
    }

    return this.places.filter((place) => {
      for (let key in params) {
        let field = place[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return place;
        } else if (field == params[key]) {
          return place;
        }
      }
      return null;
    });
  }

  add(place: Place) {
    this.places.push(place);
  }

  delete(place: Place) {
    this.places.splice(this.places.indexOf(place), 1);
  }
}
