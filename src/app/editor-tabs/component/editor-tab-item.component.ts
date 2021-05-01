import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";

// TODO: Scroll to clicked tab if it is not fully visible
// TODO: Enable tab scrolling without holding the "Shift" button

@Component({
  selector: 'app-editor-tab-item',
  templateUrl: './editor-tab-item.component.html',
  styleUrls: ['./editor-tab-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabItemComponent {
  @Input() tabId = '';
  @Input() tabName = '';
  @Input() isActive = false;
  @Input() set fileExtension(value: string) {
    this.pathToFileIcon = this.getPathToFileIcon(value);
  }
  @Output() clickOpen = new EventEmitter<string>();
  @Output() clickClose = new EventEmitter<string>();

  pathToFileIcon = '';

  public onClickClose(e: MouseEvent): void {
    e.stopPropagation();
    this.clickClose.emit(this.tabId);
  }

  private getPathToFileIcon(fileExtension: string): string {
    const path = '/assets/icons/';
    
    switch (fileExtension) {
      case 'ts': return path + 'typescript.svg';
      case 'scss': return path + 'scss.svg';
      case 'html': return path + 'html.svg';
      case 'cs': return path + 'csharp.svg';
      default: return path + 'file.svg';
    };
  }
}