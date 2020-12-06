import { Component, Output, EventEmitter } from '@angular/core';
import { Observable  } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']

})
export class SearchComponent {

  @Output() onSearchChanged = new EventEmitter<string>();

  constructor() {
    
  }

  public change(e: any) {
    this.onSearchChanged.emit(e.target.value);
  }
}
