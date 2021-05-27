import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: 'app-editor-line-numbers',
  templateUrl: './editor-line-numbers.component.html',
  styleUrls: ['./editor-line-numbers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorLineNumbersComponent {
  @Input() fileLineCount!: number;
  @Input() activeLine!: number;
}