import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { IconService } from "src/app/services";
import { DomEventsService } from "src/app/services/dom-events/dom-events.service";

@Component({
    selector: 'app-activity-bar',
    templateUrl: './activity-bar.component.html',
    styleUrls: ['./activity-bar.component.scss'],
    // Use 'Default' otherwise resizing doesn't work
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ActivityBarComponent implements OnInit, OnDestroy {
    private subscriptionUp: Subscription | null = null;
    private subscriptionMove: Subscription | null = null;
    private subscriptionIcon!: Subscription;
    INITIAL_WIDTH_PX = 400;
    contentWidth = this.INITIAL_WIDTH_PX;
    isOpen = false;
    isClicked = false;
    filesIcon!: string;
    oldX = 0;

    constructor(
        private domEventsService: DomEventsService,
        private iconService: IconService,
    ) { }

    public ngOnInit() {
        this.subscriptionIcon = this.iconService.getFilesIcon().subscribe(icon => this.filesIcon = icon);
    }

    public ngOnDestroy() {
        this.subscriptionIcon.unsubscribe();
        this.subscriptionMove?.unsubscribe();
        this.subscriptionUp?.unsubscribe();
    }

    public onClick() {
        this.isOpen = !this.isOpen;
    }

    public onMouseDown(e: MouseEvent) {
        // Prevent random text selection
        e.preventDefault();

        if (!this.isOpen) {
            return;
        }

        this.oldX = e.x;
        this.subscriptionUp = this.domEventsService.getDocumentMouseUpListener().subscribe(this.onMouseUp)
        this.subscriptionMove = this.domEventsService.getDocumentMouseMoveListener().subscribe(this.onMouseMoved)
        this.isClicked = true;
    }

    public onMouseUp = () => {
        this.subscriptionUp!.unsubscribe();
        this.subscriptionMove!.unsubscribe();
        this.isClicked = false;
    }

    private onMouseMoved = (e: MouseEvent) => {
        this.contentWidth -= e.x - this.oldX;
        this.oldX = e.x;
    }
}