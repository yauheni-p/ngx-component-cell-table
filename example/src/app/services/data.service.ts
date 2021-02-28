import { Injectable } from '@angular/core';
import { Car } from '../app.component';
import { Observable, of } from 'rxjs';
import { PaginatedList } from '../interfaces/paginated-list';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: Car[] = [
    {
      model: 'Ford Focus',
      color: 'Black',
    },
    {
      model: 'Mercedes C Class',
      color: 'Green',
    },
    {
      model: 'Mercedes B-Class',
      color: 'White',
    },
    {
      model: 'Volvo XC60',
      color: 'Cyan',
    },
    {
      model: 'Nissan X-Trail',
      color: 'Red',
    },
    {
      model: 'Seat Leon',
      color: 'Blue',
    },

    {
      model: 'Kia Stonic',
      color: 'Brown',
    },
    {
      model: 'Toyota Tundra',
      color: 'Yellow',
    },
    {
      model: 'Cadillac ATS',
      color: 'Purple',
    },
    {
      model: 'Hyundai Elantra',
      color: 'Silver',
    },
    {
      model: 'Volkswagen Passat',
      color: 'Grey',
    },
    {
      model: 'Chrysler 300',
      color: 'Gold',
    },
  ];

  get(page: number, pageSize: number): Observable<PaginatedList<Car>> {
    return of({
      items: [...this.data.slice((page - 1) * pageSize, page * pageSize)],
      totalCount: this.data.length,
    });
  }

  reverse(): void {
    this.data = [...this.data.reverse()];
  }
}
