import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-editor-line',
  templateUrl: './editor-line.component.html',
  styleUrls: ['./editor-line.component.scss']
})
export class EditorLineComponent {
  @Input() text = '';
  @Input() isHighLighted = false;
}