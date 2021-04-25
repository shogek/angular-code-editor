import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: 'app-editor-number-column',
  templateUrl: './editor-number-column.html',
  styleUrls: ['./editor-number-column.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorNumberColumnComponent {
  @Input() fileLineCount!: number;
  @Input() activeLine!: number;
}