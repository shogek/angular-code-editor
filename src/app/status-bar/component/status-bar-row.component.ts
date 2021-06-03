import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: 'app-status-bar-row',
  templateUrl: './status-bar-row.component.html',
  styleUrls: ['./status-bar-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarRowComponent {
  @Input() latestMessage!: string;
  @Input() editorLineNumber: number | undefined;
  @Input() editorCaretOffset: number | undefined;
}