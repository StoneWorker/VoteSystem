import { Injectable } from '@angular/core';
import { InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    const users =[
      {id: 1, name: 'Mr. Nice', password: '670b14728ad9902aecba32e22fa4f6bd',   selectedDate:'', selectedPlace: '', voted: false},
      {id: 2, name: 'Naco',     password: '670b14728ad9902aecba32e22fa4f6bd',  selectedDate:'', selectedPlace: '', voted: false},
      {id: 3, name: 'Bobo',     password: '670b14728ad9902aecba32e22fa4f6bd',   selectedDate:'', selectedPlace: '', voted: false},
      {id: 4, name: 'Peter',    password: '670b14728ad9902aecba32e22fa4f6bd',  selectedDate:'', selectedPlace: '', voted: false},
      {id: 5, name: 'Magneta',  password: '670b14728ad9902aecba32e22fa4f6bd', selectedDate:'', selectedPlace: '', voted: false},
      {id: 6, name: 'Lily',     password: '670b14728ad9902aecba32e22fa4f6bd', selectedDate:'', selectedPlace: '', voted: false},
      {id: 7, name: 'Jim',      password: '4875b3210ffa9463be42c307d7e97c07',    selectedDate:'', selectedPlace: '', voted: false},
      {id: 8, name: 'Jim123',   password: '670b14728ad9902aecba32e22fa4f6bd', selectedDate:'', selectedPlace: '', voted: false},
      {id: 9, name: 'JimJim',   password: '670b14728ad9902aecba32e22fa4f6bd', selectedDate:'', selectedPlace: '', voted: false},    
    ];
    const dates =[
      {id: 1, name: '2018-6-6',   votedNumber: 0 },
      {id: 2, name: '2018-6-7',   votedNumber: 0 },
      {id: 3, name: '2018-6-8',   votedNumber: 0 },
      {id: 4, name: '2018-6-9',   votedNumber: 0 },   
    ];
    const places =[
      {id: 1, name: 'School',   votedNumber: 0 },
      {id: 2, name: 'Home',     votedNumber: 0 },
      {id: 3, name: 'Company',  votedNumber: 0 },
      {id: 4, name: 'KTV',      votedNumber: 0 },   
    ];
    
    return {users, dates, places};
  }

  constructor() { }

}
