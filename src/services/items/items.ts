import { Injectable } from '@angular/core';
import { Api } from 'src/services';
import { Item } from 'src/models/item';

@Injectable()
export class Items {

    constructor(public api: Api) { }

    query(params?: any) {
        return this.api.get('/items', params);
    }

    add(item: Item) {
    }

    delete(item: Item) {
    }

}
