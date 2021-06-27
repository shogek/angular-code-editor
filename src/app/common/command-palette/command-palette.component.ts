import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from "@angular/core";
import { CommandPaletteItem } from "./command-palette-item";

@Component({
    selector: 'app-command-palette',
    templateUrl: './command-palette.component.html',
    styleUrls: ['./command-palette.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandPaletteComponent implements OnInit {

    @Input() choices: CommandPaletteItem[] = [];

    private MENU_WIDTH_PX = 600; 
    leftX = 0;

    public ngOnInit() {
        const documentMiddle = document.body.clientWidth / 2;
        const menuStart = documentMiddle - (this.MENU_WIDTH_PX / 2);
        this.leftX = menuStart;
    }

    @HostListener('document:keydown', ['$event'])
    private onKeyDown(e: KeyboardEvent) {
        const { key } = e;
        if (key !== 'KeyDown' && key !== 'KeyUp') {
            return;
        }

        // TODO: Are these needed?
        e.preventDefault();
        e.stopPropagation();

        let nextIndex = 0;
        const activeIndex = this.choices.findIndex(choice => choice.isActive);
        if (activeIndex < this.choices.length - 1) {
            nextIndex = activeIndex + 1;
        }

        const activeChoice = this.choices[activeIndex];
        activeChoice.isActive = false;

        const nextChoice = this.choices[nextIndex];
        nextChoice.isActive = true;
    }
}