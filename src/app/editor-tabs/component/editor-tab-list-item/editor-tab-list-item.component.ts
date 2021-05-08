import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";

// TODO: Scroll to clicked tab if it is not fully visible

@Component({
  selector: 'app-editor-tab-list-item',
  templateUrl: './editor-tab-list-item.component.html',
  styleUrls: ['./editor-tab-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabListItemComponent {
  @Input() name!: string;
  @Input() isActive!: boolean;
  @Input() iconPath!: string;
  @Output() clickOpen = new EventEmitter<void>();
  @Output() clickClose = new EventEmitter<void>();

  public onClickOpen() {
    if (!this.isActive) {
      this.clickOpen.emit();
    }
  }

  public onClickClose(e: MouseEvent): void {
    e.stopPropagation();
    this.clickClose.emit();
  }
}