import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DUMMY_CODE } from '../../dummy-code';

@Component({
   selector: 'app-editor',
   templateUrl: './editor.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent {
   codeExample: string = DUMMY_CODE;
}