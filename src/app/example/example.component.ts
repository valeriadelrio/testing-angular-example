import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../example.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  private key = 'uno';
  private count: number;
  status: string;

  public contactForm: FormGroup;
  private contact = {
    name: '',
    email: '',
    text: ''
  };
  submitted = false; // la dejo publica para ver que pueda accederla sin el debugger
  person = [{email: 'email1', id: 1}, {email: 'email2', id: 2}];

  constructor(private service: ExampleService) {
    this.createForm();
   }

  ngOnInit() {
    this.testSwitch(this.key);
    this.getData();
  }

  private testSwitch(key: string): number {
    switch (key) {
      case 'uno':
        return 1;
        case 'dos':
          return 2;
      default:
        return 0;
    }
  }

  private getData(): void {
    this.service.getMethod().subscribe(data => {
      this.count = data.age;
      if (data.age > 20) {
        this.status = 'Mayor de edad';
      } else {
        this.status = 'Menor de edad';
      }
    });
  }

  private createForm(): void {
    this.contactForm = new FormGroup({
      name: new FormControl(this.contact.name, [Validators.required, Validators.minLength(4)]),
      email: new FormControl(this.contact.email, [Validators.required, Validators.email]),
      text: new FormControl(this.contact.text, [Validators.required])
    });
  }

  private onSubmit(): void {
    this.submitted = true;
  }

  private map(): string[] {
    return this.person.map(p => p.email);
  }

}
