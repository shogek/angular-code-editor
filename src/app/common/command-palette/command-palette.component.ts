import {
    EventEmitter,
    ChangeDetectionStrategy,
    Component,
    HostListener,
    Input,
    OnInit,
    Output,
    OnDestroy,
    ViewChild,
    ElementRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import { DomEventsService } from "src/app/services/dom-events/dom-events.service";
import { CommandPaletteItem } from "./command-palette-item";

@Component({
    selector: 'app-command-palette',
    templateUrl: './command-palette.component.html',
    styleUrls: ['./command-palette.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandPaletteComponent implements OnInit, OnDestroy {
    /** The HTML element which, when clicked, opens this component. */
    @Input() sourceOpener!: HTMLElement;
    @Input() set choices(value: CommandPaletteItem[]) {
        this._originalChoices = value;
        this.filteredChoices = value;
        this._currentChoice = value.find(x => x.isActive)!;
    }
    @Input() noSearchResultsText = '';

    /** Fired when via arrow keys, the choices are being navigated through. */
    @Output() choiceSelected = new EventEmitter<CommandPaletteItem>();
    /** Fired when the user presses 'Enter' or LMB on a choice. */
    @Output() choiceConfirmed = new EventEmitter<CommandPaletteItem>();
    @Output() noSearchResults = new EventEmitter<void>();
    /** Fired when the user closes the palette (via confirmation, "Escape" or LMB somewhere) */
    @Output() closed = new EventEmitter<void>();

    @ViewChild('searchInput') searchInput!: ElementRef;

    private UNICODE_CHAR_REGEX = /\p{Letter}/gu;
    private MENU_WIDTH_PX = 600;
    private _subscriptions: Subscription[] = [];
    private _clickedOnSelf = false;
    private _clickedOnOpener = false;
    private _initialLoad = false;
    private _currentChoice: CommandPaletteItem | null = null;
    private _originalChoices: CommandPaletteItem[] = [];
    filteredChoices: CommandPaletteItem[] = [];
    leftX = 0;

    constructor(private domEventsService: DomEventsService) { }

    public ngOnInit() {
        this._initialLoad = true;

        this._subscriptions.push(
            this.domEventsService.getDocumentClickedListener().subscribe(_ => this.onDocumentClick())
        );
        this._subscriptions.push(
            this.domEventsService.getDocumentKeyDownListener().subscribe(e => this.onDocumentKeyDown(e))
        );

        this.sourceOpener.addEventListener('click', this.onOpenerClicked);

        const documentMiddle = document.body.clientWidth / 2;
        const menuStart = documentMiddle - (this.MENU_WIDTH_PX / 2);
        this.leftX = menuStart;
    }

    public ngOnDestroy() {
        this._subscriptions.forEach(x => x.unsubscribe());
        this._subscriptions = [];

        this.sourceOpener.removeEventListener('click', this.onOpenerClicked);
    }

    @HostListener('click')
    public onComponentClick() {
        this._clickedOnSelf = true;
    }

    private onOpenerClicked = () => {
        this._clickedOnOpener = true;
    }

    private onDocumentClick() {
        if (this._clickedOnSelf) {
            /* Fixes bug!
            * Clicking on the search bar (the component itself) is still registered as a click on the document. */
            this._clickedOnSelf = false;
            return;
        }

        if (this._clickedOnOpener) {
            /* Fixes bug!
            * Clicking on the button which opens the command palette is still registered as a click on the document. */
            this._clickedOnOpener = false;
            return;
        }

        if (this._initialLoad) {
            /* Fixes bug!
            *  Not sure what causes this damn bug. */
            this._initialLoad = false;
            return;
        }

        this.closed.emit();
    }

    private onDocumentKeyDown(e: KeyboardEvent) {
        // If the user pressed a letter - focus back on the search
        if (e.key.length < 2 && this.UNICODE_CHAR_REGEX.test(e.key)) {
            this.searchInput.nativeElement.focus();
            return;
        }

        switch(e.key) {
            case 'Enter': this.handlePressedEnter(); return;
            case 'Escape': this.handlePressedEscape(); return;
            case 'ArrowUp': this.handlePressedArrowKey(false); return;
            case 'ArrowDown': this.handlePressedArrowKey(true); return;
            default: return;
        }
    }

    public onCommandPaletteChoiceClick(choice: CommandPaletteItem) {
        this.choiceConfirmed.emit(choice);
        this.closed.emit();
    }

    public onSearchInputKeyUp(e: KeyboardEvent) {
        // Walking through the menu choices
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        const searchInput = e.target as HTMLInputElement;
        const searchValue = searchInput.value.toLowerCase();

        const searchResults = this._originalChoices.filter(
            choice => choice.label.toLowerCase().includes(searchValue)
        );

        if (searchResults.length < 1) {
            this.filteredChoices = [];
            this._currentChoice = null;
            this.noSearchResults.emit();
            return;
        }

        const currentChoice = searchResults.find(x => x.isActive) ?? searchResults[0];
        this.filteredChoices = searchResults.map(
            choice => choice.value === currentChoice.value
                ? ({...choice, isActive: true})
                : ({...choice})
        );

        if (currentChoice.label !== this._currentChoice?.label) {
            this._currentChoice = currentChoice;
            this.choiceSelected.emit(currentChoice);
        }
    }

    private handlePressedEnter() {
        const activeChoice = this.filteredChoices.find(x => x.isActive)
        this.choiceConfirmed.emit(activeChoice);
        this.closed.emit();
    }

    private handlePressedEscape() {
        this.closed.emit();
    }

    private handlePressedArrowKey(isArrowDown: boolean) {
        const activeIndex = this.filteredChoices.findIndex(choice => choice.isActive);
        let nextIndex = NaN;
        if (isArrowDown) {
            nextIndex = activeIndex < this.filteredChoices.length - 1 ? activeIndex + 1 : 0;
        } else {
            nextIndex = activeIndex > 0 ? activeIndex - 1 : this.filteredChoices.length - 1;
        }

        const updatedChoices = this.filteredChoices.map((choice, index) => 
            index === nextIndex
                ? ({...choice, isActive: true})
                : ({...choice, isActive: false})
        );

        this.filteredChoices = updatedChoices;

        const selectedChoice = updatedChoices.find(choice => choice.isActive);
        this.choiceSelected.emit(selectedChoice);
    }
}