import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnDestroy, Output } from "@angular/core";

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent implements OnDestroy {
  @Input() choices: string[] = [];
  @Input() set clickableElement(value: HTMLElement) {
    this._clickableElement = value;
    value.addEventListener('contextmenu', (e) => this.onContextMenu(e));
  }
  @Output() itemClicked = new EventEmitter<string>();

  constructor(private cd: ChangeDetectorRef) { }

  private _clickableElement!: HTMLElement;
  isMenuVisible = false;
  menuXCoord = NaN;
  menuYCoord = NaN;
  /**
   * We listen for both 'click' and 'contextmenu' (HostListener) events on the DOM and on the 'clickableElement'.
   * Since the handlers for those events are fired in succession, 
   * this flag indicates if we came to HostListener's handlers right after processing 'clickableElement' handlers.
  */
  clickedOnMe = false;

  public ngOnDestroy() {
    this._clickableElement.removeEventListener('contextmenu', this.onContextMenu);
  }

  public onContextMenuItemClick(choice: string) {
    this.isMenuVisible = false;
    this.cd.markForCheck();
    this.itemClicked.emit(choice);
  }

  public onContextMenu(e: MouseEvent) {
    e.preventDefault();

    this.clickedOnMe = true;

    this.isMenuVisible = true;
    this.menuXCoord = e.clientX;
    this.menuYCoord = e.clientY;
    // Make sure Angular renders the damn menu
    this.cd.markForCheck();
  }

  /** Close the tab if the user right clicked anywhere in the DOM. */
  // TODO: Read about "HostListener"
  @HostListener('document:click')
  public onDocumentClick() {
    if (!this.isMenuVisible) {
      return;
    }

    this.isMenuVisible = false;
    this.cd.markForCheck();
  }

  /** Close the tab if the user left clicked anywhere in the DOM. */
  @HostListener('document:contextmenu')
  public onDocumentContextMenu() {
    if (this.clickedOnMe) {
      this.clickedOnMe = false;
      return;
    }

    if (this.isMenuVisible) {
      this.isMenuVisible = false;
      this.cd.markForCheck();
    }
  }
}