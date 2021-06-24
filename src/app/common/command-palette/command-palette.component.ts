import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
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
}