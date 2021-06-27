import { EventEmitter, ChangeDetectionStrategy, Component, HostListener, Input, OnInit, Output } from "@angular/core";
import { CommandPaletteItem } from "./command-palette-item";

@Component({
    selector: 'app-command-palette',
    templateUrl: './command-palette.component.html',
    styleUrls: ['./command-palette.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandPaletteComponent implements OnInit {

    @Input() choices: CommandPaletteItem[] = [];
    @Output() choiceSelected = new EventEmitter<CommandPaletteItem>();

    private MENU_WIDTH_PX = 600; 
    leftX = 0;
    isVisible = true;

    public ngOnInit() {
        const documentMiddle = document.body.clientWidth / 2;
        const menuStart = documentMiddle - (this.MENU_WIDTH_PX / 2);
        this.leftX = menuStart;
    }

    // TODO: Stop listening when 'Enter' pressed
    @HostListener('document:keydown', ['$event'])
    private onKeyDown(e: KeyboardEvent) {
        const { key } = e;
        if (key !== 'ArrowDown'
            && key !== 'ArrowUp'
            && key !== 'Enter') {
            return;
        }

        if (key === 'Enter') {
            this.isVisible = false;
            return;
        }

        const activeIndex = this.choices.findIndex(choice => choice.isActive);
        let nextIndex = NaN;
        if (key === 'ArrowDown') {
            nextIndex = activeIndex < this.choices.length - 1 ? activeIndex + 1 : 0;
        } else {
            nextIndex = activeIndex > 0 ? activeIndex - 1 : this.choices.length - 1;
        }

        const updatedChoices = this.choices.map((choice, index) => 
            index === nextIndex
                ? ({...choice, isActive: true})
                : ({...choice, isActive: false})
        );

        this.choices = updatedChoices;

        const selectedChoice = updatedChoices.find(choice => choice.isActive);
        this.choiceSelected.emit(selectedChoice);
    }

    public onCommandPaletteChoiceClick(choice: CommandPaletteItem) {
        this.choiceSelected.emit(choice);
        this.isVisible = false;
        // TODO: (Can I + is it good practice) to destroy the current component?
    }
}