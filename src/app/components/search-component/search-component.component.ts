import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent {
  searchKeyword: string | undefined;
  @Input()
  placeholder: string = 'Enter keyword to search..!';
  @Output()
  onSearchEvent = new EventEmitter();

  search() {
    this.onSearchEvent.emit(this.searchKeyword);
  }

}
