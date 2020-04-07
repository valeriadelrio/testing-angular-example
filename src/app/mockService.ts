import { ExampleService, Example } from './example.service';
import { of, Observable } from 'rxjs';

export const methodResponse: Example = {
    name: 'vale',
    age: 2223
};
export class MockExampleService extends ExampleService {
    getMethod(): Observable<Example> {
        return of(methodResponse);
    }
}