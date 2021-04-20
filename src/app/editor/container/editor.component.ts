import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserFile } from "src/models/user-file.model";
import { SAMPLE_USER_FILES } from '../../sample-user-files';

@Component({
   selector: 'app-editor',
   templateUrl: './editor.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent {
   userFiles: UserFile[] = SAMPLE_USER_FILES;
}