import { EventEmitter, ChangeDetectionStrategy, Component, HostListener, Input, OnInit, Output, OnDestroy } from "@angular/core";
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
        this.filteredChoices = value;
        this.originalChoices = value;
    }

    /** Fired when via arrow keys, the choices are being navigated through. */
    @Output() choiceSelected = new EventEmitter<CommandPaletteItem>();
    /** Fired when the user presses 'Enter' or LMB on a choice. */
    @Output() choiceConfirmed = new EventEmitter<CommandPaletteItem>();
    @Output() noSearchResults = new EventEmitter<void>();
    /** Fired when the user closes the palette (via confirmation, "Escape" or LMB somewhere) */
    @Output() closed = new EventEmitter<void>();

    private MENU_WIDTH_PX = 600;
    private _subscriptions: Subscription[] = [];
    private _currentChoice: CommandPaletteItem | null = null;
    private _clickedOnSelf = false;
    private _clickedOnOpener = false;
    private _initialLoad = false;
    originalChoices: CommandPaletteItem[] = [];
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
            console.log('PREVENT - _clickedOnSelf');
            /*
            * Fixes bug!
            * Clicking on the search bar (the component itself) is registered as clicking on the document.
            */
            this._clickedOnSelf = false;
            return;
        }

        if (this._clickedOnOpener) {
            console.log('PREVENT - _clickedOnOpener');
            /*
            * Fixes bug!
            * TODO: Explain
            */
            this._clickedOnOpener = false;
            return;
        }

        if (this._initialLoad) {
            console.log('PREVENT - _initialLoad');
            /*
            * Fixes bug!
            * TODO: Explain
            */
            this._initialLoad = false;
            return;
        }

        this.closed.emit();
    }

    private onDocumentKeyDown(e: KeyboardEvent) {
        const { key } = e;
        if (key !== 'ArrowDown'
            && key !== 'ArrowUp'
            && key !== 'Enter'
            && key !== 'Escape') {
            return;
        }

        if (key === 'Enter') {
            const activeChoice = this.filteredChoices.find(x => x.isActive)
            this.choiceConfirmed.emit(activeChoice);
            this.closed.emit();
            return;
        }

        if (key === 'Escape') {
            this.closed.emit();
            return;
        }

        const activeIndex = this.filteredChoices.findIndex(choice => choice.isActive);
        let nextIndex = NaN;
        if (key === 'ArrowDown') {
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

    public onCommandPaletteChoiceClick(choice: CommandPaletteItem) {
        this.choiceConfirmed.emit(choice);
        this.closed.emit();
    }

    // TODO: Document - cleanup - separate
    public onKeyUp(e: KeyboardEvent) {
        const searchInput = e.target as HTMLInputElement;
        const searchValue = searchInput.value.toLowerCase();

        this.filteredChoices = this.originalChoices.filter(
            choice => choice.label.toLowerCase().includes(searchValue)
        );

        if (this.filteredChoices.length < 1) {
            // TODO: Show message that no such themes found :3
            this._currentChoice = null;
            this.noSearchResults.emit();
            return;
        }

        const currentChoice = this.filteredChoices[0];
        if (currentChoice.label !== this._currentChoice?.label) {
            this._currentChoice = currentChoice;
            this.choiceSelected.emit(currentChoice);
        }
    }
}