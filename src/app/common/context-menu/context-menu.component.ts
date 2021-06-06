import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from "@angular/core";

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent implements OnDestroy {
  static openedMenuId = '';

  @Input() choices: string[] = [];
  @Input() set clickableElement(value: HTMLElement | undefined) {
    this._clickableElement = value;
    this.initContextMenu(this._clickableElement!);
  }
  @Output() itemClicked = new EventEmitter<string>();

  constructor(private cd: ChangeDetectorRef) { }

  private uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private _clickableElement: HTMLElement | undefined;
  id = this.uuidv4();
  isMenuVisible = false;
  menuXCoord = NaN;
  menuYCoord = NaN;
  clickedOnMe = false;

  public ngOnDestroy() {
    if (this._clickableElement) {
      this._clickableElement.removeEventListener('contextmenu', this.onContextMenu);
    }
  }

  public onContextMenuItemClick(choice: string) {
    this.isMenuVisible = false;
    this.cd.markForCheck();
    this.itemClicked.emit(choice);
  }

  public onContextMenu(e: MouseEvent) {
    this.clickedOnMe = true;

    // I'm the first!
    if (!ContextMenuComponent.openedMenuId) {
      console.log('Im the first', this.id);
      ContextMenuComponent.openedMenuId = this.id;
      e.preventDefault();
      // e.stopPropagation();

      this.isMenuVisible = true;
      this.menuXCoord = e.clientX;
      this.menuYCoord = e.clientY;
      // Make sure Angular renders the damn menu
      this.cd.markForCheck();
      return;
    }

    // I'm already opened!
    if (ContextMenuComponent.openedMenuId === this.id) {
      console.log('Im already opened', this.id);
      ContextMenuComponent.openedMenuId = this.id;
      e.preventDefault();
      // e.stopPropagation();

      this.isMenuVisible = true;
      this.menuXCoord = e.clientX;
      this.menuYCoord = e.clientY;

      // Make sure Angular renders the damn menu
      this.cd.markForCheck();
      return;
    }

    // He's trying to open a new tab - me!
    if (ContextMenuComponent.openedMenuId !== this.id) {
      console.log('Openin me!', this.id);
      ContextMenuComponent.openedMenuId = this.id;
      e.preventDefault();
      // e.stopPropagation();

      this.isMenuVisible = true;
      this.menuXCoord = e.clientX;
      this.menuYCoord = e.clientY;

      // Make sure Angular renders the damn menu
      this.cd.markForCheck();
      console.log('done!');
      return;
    }
  }

  private initContextMenu(element: HTMLElement) {
    element.addEventListener('contextmenu', (e) => this.onContextMenu(e));
  }

  /** Close the tab if it's opened and the user clicked anywhere in the DOM. */
  // TODO: Read about "HostListener"
  @HostListener('document:click')
  public onDocumentClick() {
    if (!this.isMenuVisible) {
      return;
    }

    this.isMenuVisible = false;
    this.cd.markForCheck();
  }

  /** Close the tab if it's opened and */
  @HostListener('document:contextmenu', ['$event.target'])
  public onDocumentContextMenu(element: HTMLElement) {
    if (this.clickedOnMe) {
      this.clickedOnMe = false;
      return;
    } else {
      this.isMenuVisible = false;
      this.cd.markForCheck();console.log('didnt click on me')
    }

    if (!this.isMenuVisible || ContextMenuComponent.openedMenuId === this.id) {
      console.log(element, element.id, this.id);
      return;
    }

    this.isMenuVisible = false;
    this.cd.markForCheck();
  }
}