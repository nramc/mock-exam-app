import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent {
  searchKeyword: string | undefined;
  @Output()
  onSearchEvent = new EventEmitter();

  search() {
    this.onSearchEvent.emit(this.searchKeyword);
  }

}
