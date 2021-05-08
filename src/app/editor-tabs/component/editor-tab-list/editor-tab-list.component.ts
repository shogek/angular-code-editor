import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
import { EditorTab } from "src/app/models/editor-tab.model";

@Component({
  selector: 'app-editor-tab-list',
  templateUrl: './editor-tab-list.component.html',
  styleUrls: ['./editor-tab-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabListComponent {
  @Input() openedTabs: EditorTab[] = [];
  @Output() tabOpen = new EventEmitter<string>();
  @Output() tabClose = new EventEmitter<string>();
}