import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { ContextMenuItem } from "src/app/common";
import { EditorTabListItemMenu } from "./editor-tab-list-item.menu";

// TODO: Scroll to clicked tab if it is not fully visible

@Component({
  selector: 'app-editor-tab-list-item',
  templateUrl: './editor-tab-list-item.component.html',
  styleUrls: ['./editor-tab-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabListItemComponent implements OnInit {
  @Input() tabId!: string;
  @Input() tabName!: string;
  @Input() isTabActive!: boolean;
  @Input() iconPath!: string;
  @Input() set canCloseOtherTabs(value: boolean) {
    this._canCloseOtherTabs = value;
    this.initContextMenuChoices();
  } get canCloseOtherTabs(): boolean { return this._canCloseOtherTabs; };

  @Output() clickOpen = new EventEmitter<void>();
  @Output() clickClose = new EventEmitter<string>();
  @Output() clickCloseAll = new EventEmitter<void>();
  @Output() clickCloseOthers = new EventEmitter<string>();

  private _canCloseOtherTabs = false;
  contextMenuChoices: ContextMenuItem[] = [];

  public ngOnInit() {
    this.initContextMenuChoices();
  }

  public onClickOpen() {
    if (!this.isTabActive) {
      this.clickOpen.emit();
    }
  }

  public onClickClose(e: MouseEvent): void {
    e.stopPropagation();
    this.clickClose.emit(this.tabId);
  }

  public onContextMenuItemClicked(choice: ContextMenuItem) {
    switch (choice.label) {
      case EditorTabListItemMenu.Close:
        this.clickClose.emit(this.tabId);
        break;
      case EditorTabListItemMenu.CloseAll:
        this.clickCloseAll.emit();
        break;
      case EditorTabListItemMenu.CloseOthers:
        this.clickCloseOthers.emit(this.tabId);
        break;
      default: throw new Error(`Unknown context menu item: ${choice}`);
    }
  }

  private initContextMenuChoices() {
    this.contextMenuChoices = [
      { label: EditorTabListItemMenu.Close, isDisabled: false },
      { label: EditorTabListItemMenu.CloseOthers, isDisabled: !this.canCloseOtherTabs },
      { label: EditorTabListItemMenu.CloseAll, isDisabled: false },
    ];
  }
}