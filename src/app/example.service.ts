import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Example {
  name: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})

export class ExampleService {

  constructor(private httpClient: HttpClient) { }

  public getMethod(): Observable<Example> {
    return this.httpClient.get<Example>('url');
  }
}
