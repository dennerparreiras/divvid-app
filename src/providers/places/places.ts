import { Injectable } from '@angular/core';

import { Place } from '../../models/place';
import { Api } from '../api/api';

@Injectable()
export class Places {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/items', params);
  }

  add(item: Place) {
  }

  delete(item: Place) {
  }

}
