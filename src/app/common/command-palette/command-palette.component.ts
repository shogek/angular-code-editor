import { EventEmitter, ChangeDetectionStrategy, Component, HostListener, Input, OnInit, Output, AfterViewInit, AfterContentInit, AfterContentChecked, AfterViewChecked } from "@angular/core";
import { CommandPaletteItem } from "./command-palette-item";

@Component({
    selector: 'app-command-palette',
    templateUrl: './command-palette.component.html',
    styleUrls: ['./command-palette.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandPaletteComponent implements OnInit {
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
    private _currentChoice: CommandPaletteItem | null = null;
    private _initialClick = false;
    originalChoices: CommandPaletteItem[] = [];
    filteredChoices: CommandPaletteItem[] = [];
    leftX = 0;

    public ngOnInit() {
        const documentMiddle = document.body.clientWidth / 2;
        const menuStart = documentMiddle - (this.MENU_WIDTH_PX / 2);
        this.leftX = menuStart;
    }

    @HostListener('document:click')
    public onDocumentClick() {
        if (!this._initialClick) {
            /*
            * Fixes bug!
            * The click, which triggers this component to show, is also registered by this host listener.
            * The '_initialClick' prevents scenario, where this component opens and immediatelly closes again.
            */
            this._initialClick = true;
            return;
        }

        this.closed.emit();
    }

    @HostListener('document:keydown', ['$event'])
    public onKeyDown(e: KeyboardEvent) {
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