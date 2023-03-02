import { Component } from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  appVersion: string = environment.version;

  goto(url: string) {
    // @ts-ignore
    window.open(url, '_blank').focus();
  }
}
