import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-editor-tab-item',
  templateUrl: './editor-tab-item.component.html',
  styleUrls: ['./editor-tab-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabItemComponent {
  @Input() fileId = '';
  @Input() fileName = '';
  @Input() isActive = false;
  @Output() clickOpen = new EventEmitter<string>();
  @Output() clickClose = new EventEmitter<string>();
}