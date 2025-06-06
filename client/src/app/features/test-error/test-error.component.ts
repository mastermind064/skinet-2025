import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-test-error',
  imports: [
    MatButton
  ],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
  baseUrl = 'https://localhost:5001/api/'
  private http = inject(HttpClient)
  validationError?: string[]

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/notfound'). subscribe({
      next:  reponse => console.log(reponse),
      error: error => console.log(error)
      
    })
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest'). subscribe({
      next:  reponse => console.log(reponse),
      error: error => console.log(error)
      
    })
  }

  get401Error() {
    this.http.get(this.baseUrl + 'buggy/unauthorized'). subscribe({
      next:  reponse => console.log(reponse),
      error: error => console.log(error)
      
    })
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/internalerror'). subscribe({
      next:  reponse => console.log(reponse),
      error: error => console.log(error)
      
    })
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + 'buggy/validationerror', {}). subscribe({
      next:  reponse => console.log(reponse),
      error: error => {
        console.log(error)
        this.validationError = error
      }
    })
  }
}
