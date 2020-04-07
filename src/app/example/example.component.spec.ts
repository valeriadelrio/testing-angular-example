import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ExampleComponent } from './example.component';
import { ExampleService, Example } from '../example.service';
import { MockExampleService, methodResponse } from '../mockService';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {TestScheduler} from 'rxjs/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ExampleComponent', () => { // permite crear el cojunto de test sobre el componente
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>; // permite acceder al componente y testearlo
  let de;
  // let el: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleComponent ],
      providers: [{provide: ExampleService, useClass: MockExampleService}],
      // existe tmb el useValue que recibe una variable en lugar de una clase
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ExampleComponent); // TestBed inyecta dependencias definidas en el configureTestingModule
      component = fixture.componentInstance; // componentInstance se toma el componente
      fixture.detectChanges();
      de = fixture.debugElement.componentInstance;
      // el = de.nativeElement;
    });
  }));

  // beforeEach(() => { // se colocan las dependencias del componente, si hubiera servicios se incluyen
  //   fixture = TestBed.createComponent(ExampleComponent); // TestBed inyecta dependencias definidas en el configureTestingModule
  //   component = fixture.componentInstance; // componentInstance se toma el componente
  //   fixture.detectChanges();
  //   de = fixture.debugElement.componentInstance;
  //   el = de.nativeElement;
  // });

  it('should create', () => {
    expect(component).toBeTruthy(); // testea que el componente se crea correctamente
  });

  it('should call onInit and should test switch', () => {
    const example = fixture.debugElement.componentInstance; // componentInstance se toma el componente
    const privateSpy = spyOn(example, 'testSwitch').and.callThrough(); // si pongo el espia luego del llamado al metodo, falla. 
    /** Un espía te permite ver el funcionamiento de los métodos de los objetos Javascript.
     * no olvides usar callThrough () cuando no quieras alterar cómo se comporta la función espiada.
     * Esto se debe a que un espía reemplaza automáticamente la función espiada con un stub. 
     * Si desea que la función espiada se llame normalmente, agregue .and.callThrough () a su declaración de espionaje.
     * A spy can stub any function and tracks calls to it and all arguments.
     * A spy only exists in the describe or it block in which it is defined, and will be removed after each spec
     * callThrough() => el espia rastrea las llamadas y ademas delega a la implementacion real (llama al metodo)
     * callFake(fn) => las llamadas al espia utilizan data falsa, lo que llamemos en fn,
     * solo prueba si se llama correctamente al verificar los argumentos. El método real no se llama.
     */
    example.ngOnInit();
    expect(privateSpy).toHaveBeenCalled();
    expect(privateSpy('dos')).toBe(2);
    expect(privateSpy('default')).toBe(0);
  });

  it('should be call getData()', () => {
    const example = fixture.debugElement.componentInstance; // componentInstance se toma el componente
    const privateSpy = spyOn(example, 'getData').and.callThrough();
    example.ngOnInit();
    expect(privateSpy).toHaveBeenCalled();
  });

  describe('should be test getDAta', () => {
    it('should be count equal age and status="Meyor de Edad", when age is greater than 20', () => {
      const comp = fixture.debugElement.componentInstance; // componentInstance se toma el componente
      comp.getData();
      expect(comp.count).toEqual(methodResponse.age);
      expect(component.status).toEqual('Mayor de edad');
    });

    it('should be count equal age and status="Menor de edad", when age is less than 20',
     inject([ExampleService], (service: ExampleService) => {
      const comp = fixture.debugElement.componentInstance; // componentInstance se toma el componente
      const response: Example = {name: 'name', age: 12};
      spyOn(service, 'getMethod').and.returnValue(of(response));
      comp.getData();
      expect(comp.count).toEqual(response.age);
      expect(component.status).toEqual('Menor de edad');
    }));
  });


  it('should set submitted to true', () => {
    de.onSubmit();
    expect(component.submitted).toBe(true);
  });

  it('form should be invalid', async(() => {
    const comp = fixture.debugElement.componentInstance; // componentInstance se toma el componente
    comp.contactForm.controls['email'].setValue('');
    comp.contactForm.controls['name'].setValue('');
    comp.contactForm.controls['text'].setValue('');
    expect(comp.contactForm.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    const comp1 = fixture.debugElement.componentInstance; // componentInstance se toma el componente
    comp1.contactForm.controls['email'].setValue('asd@asd.com');
    comp1.contactForm.controls['name'].setValue('asde');
    comp1.contactForm.controls['text'].setValue('text');
    console.log('form?', comp1.contactForm.value);
    expect(comp1.contactForm.valid).toBeTruthy();
  }));

  it('should be call map()', () => {
    const comp = fixture.debugElement.componentInstance;
    const spyMap = spyOn(comp, 'map').and.callThrough();
    comp.map();
    expect(spyMap).toHaveBeenCalled();
    expect(comp.map()).toEqual(['email1', 'email2']);
  });

});
