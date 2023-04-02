import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-tag-name',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="badge text-bg-primary me-1">&nbsp;{{tagName}}</span>`,
})
export class TagNameComponent {
  @Input()
  tagName!: string;

}

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule, TagNameComponent],
  template: `
    <ng-container *ngFor="let tag of tags">
      <app-tag-name [tagName]="tag"></app-tag-name>
    </ng-container>`,
})
export class TagListComponent {
  @Input()
  tags!: string[];

}
