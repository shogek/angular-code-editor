import { ChangeDetectionStrategy, Component } from "@angular/core";
import { getFilesIcon } from "src/app/helpers/icon.helper";

@Component({
    selector: 'app-activity-bar',
    templateUrl: './activity-bar.component.html',
    styleUrls: ['./activity-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityBarComponent {
    isOpen = false;
    filesIcon: string = getFilesIcon();

    public onClick() {
        this.isOpen = !this.isOpen;
    }
}