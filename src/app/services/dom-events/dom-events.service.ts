import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { fromEvent, Observable } from "rxjs";

/** Instead of using '@HostListener' and impacting the performance - listen to 'document' events through here. */
@Injectable({
    providedIn: 'root'
})
export class DomEventsService {
    constructor(@Inject(DOCUMENT) private document: Document) { }

    /** Emits events when a 'click' event rises from the 'document'. */
    public getDocumentClickedListener = (): Observable<MouseEvent> => fromEvent<MouseEvent>(this.document, 'click');

    /** Emits events when a 'contextmenu' event rises from the 'document'. */
    public getDocumentContextMenuListener = (): Observable<MouseEvent> => fromEvent<MouseEvent>(this.document, 'contextmenu');

    /** Emits events when a 'mousemove' event rises from the 'document'. */
    public getDocumentMouseMoveListener = (): Observable<MouseEvent> => fromEvent<MouseEvent>(this.document, 'mousemove');

    /** Emits events when a 'mouseup' event rises from the 'document'. */
    public getDocumentMouseUpListener = (): Observable<MouseEvent> => fromEvent<MouseEvent>(this.document, 'mouseup');

    /** Emits events when a 'keydown' event rises from the 'document'. */
    public getDocumentKeyDownListener = (): Observable<KeyboardEvent> => fromEvent<KeyboardEvent>(this.document, 'keydown');

    /** Emits events when a 'keyup' event rises from the 'document'. */
    public getDocumentKeyUpListener = (): Observable<KeyboardEvent> => fromEvent<KeyboardEvent>(this.document, 'keyup');
}