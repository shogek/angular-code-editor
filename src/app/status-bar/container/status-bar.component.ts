import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarComponent { }