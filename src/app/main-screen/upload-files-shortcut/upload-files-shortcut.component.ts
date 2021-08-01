import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { KeyboardShortcutsService } from "src/app/services/keyboard-shortcuts/keyboard-shortcuts.service";

@Component({
    selector: 'app-upload-files-shortcut',
    templateUrl: './upload-files-shortcut.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFilesShortcutComponent implements OnInit {
    constructor(private keyboardShortcutsService: KeyboardShortcutsService) { }

    public ngOnInit() {
        this.keyboardShortcutsService.listenFor(['ControlLeft', 'KeyO']).subscribe(val => console.log('OPEN'));
    }

    public test() {
        alert('VEIKIA');
    }
}