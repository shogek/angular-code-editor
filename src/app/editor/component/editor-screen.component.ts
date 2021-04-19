import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
   selector: 'app-editor-screen',
   templateUrl: './editor-screen.component.html',
   styleUrls: ['./editor-screen.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorScreenComponent {
   @Input() set fileContents(value: string) {
      this.lines = value.split('\n');
   }

   lines: string[] = [];
}