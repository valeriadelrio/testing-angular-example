import { TestBed, inject } from '@angular/core/testing';
import { ExampleService, Example } from './example.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ExampleService', () => {
  // let service: ExampleService;
  beforeEach(() => TestBed.configureTestingModule({ // configuramos el entorno, usamos httpClientTestingModule
    imports: [
      HttpClientTestingModule
    ],
    providers: [ ExampleService]
  }));
  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', () => {
    const service: ExampleService = TestBed.get(ExampleService);
    expect(service).toBeTruthy();
  });

  it('should expect a GET url', inject([HttpTestingController, ExampleService],
    (httpMock: HttpTestingController, service: ExampleService) => {
      const response: Example = {name: 'vale', age: 23};
      service.getMethod().subscribe(data => {
        expect(data.age).toBe(23);
        expect(data.name).toBe('vale');
      });
      httpMock.expectOne({
        url: 'url',
        method: 'GET'
      }).flush(response);
      /**
       * flush => cuando termine, la respuesta va a ser la del objeto. Existe tick(10) que se llama tantas veces como el param indique
       * y termina cuando todos los temporizadores hayan terminado.
       */
  }));
});
