import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";

import { DomEventsService } from "src/app/services/dom-events/dom-events.service";
import { ContextMenuItem } from "./context-menu-item";

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent implements OnInit, OnDestroy {
  @Input() choices: ContextMenuItem[] = [];
  @Input() set clickableElement(value: HTMLElement) {
    this._clickableElement = value;
    value.addEventListener('contextmenu', this.onContextMenu);
  }
  @Output() itemClicked = new EventEmitter<ContextMenuItem>();

  constructor(
    private cd: ChangeDetectorRef,
    private domEventsService: DomEventsService,
  ) { }

  private _subscriptions: Subscription[] = [];
  private _clickableElement!: HTMLElement;
  isMenuVisible = false;
  menuXCoord = NaN;
  menuYCoord = NaN;
  /**
   * We listen for both 'click' and 'contextmenu' events on the DOM and on the 'clickableElement'.
   * Since the handlers for those events are fired in succession, 
   * this flag indicates if we came to HostListener's handlers right after processing 'clickableElement' handlers.
  */
  clickedOnMe = false;

  public ngOnInit() {
    this._subscriptions.push(
      this.domEventsService.getDocumentClickedListener().subscribe(_ => this.onDocumentClick())
    );
    this._subscriptions.push(
      this.domEventsService.getDocumentContextMenuListener().subscribe(_ => this.onDocumentContextMenu())
    );
  }

  public ngOnDestroy() {
    this._clickableElement.removeEventListener('contextmenu', this.onContextMenu);
    this._subscriptions.forEach(x => x.unsubscribe());
    this._subscriptions = [];
  }

  public onContextMenuItemClick(choice: ContextMenuItem) {
    this.isMenuVisible = false;
    this.cd.markForCheck();
    this.itemClicked.emit(choice);
  }

  private onContextMenu = (e: MouseEvent) => {
    e.preventDefault();

    this.clickedOnMe = true;

    this.isMenuVisible = true;
    this.menuXCoord = e.clientX;
    this.menuYCoord = e.clientY;
    // Make sure Angular renders the damn menu
    this.cd.markForCheck();
  }

  /** Close the tab if the user right clicked anywhere in the DOM. */
  private onDocumentClick() {
    if (!this.isMenuVisible) {
      return;
    }

    this.isMenuVisible = false;
    this.cd.markForCheck();
  }

  /** Close the tab if the user left clicked anywhere in the DOM. */
  private onDocumentContextMenu() {
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