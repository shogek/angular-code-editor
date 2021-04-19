import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
   selector: 'app-editor-screen',
   templateUrl: './editor-screen.component.html',
   styleUrls: ['./editor-screen.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorScreenComponent {
   /** What to display in the editor screen. */
   @Input() set fileContents(value: string) {
      this.lines = value.split('\n');
   }

   highlightedLine = NaN;
   lines: string[] = [];

   lineClicked(lineNumber: number): void {
      this.highlightedLine = lineNumber;
   }
}