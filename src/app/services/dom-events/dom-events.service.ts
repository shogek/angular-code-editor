import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

/** Instead of using '@HostListener' and impacting the performance - listen to 'document' events through here. */
@Injectable()
export class DomEventsService {
    private _documentClicked$ = new Subject<MouseEvent>();
    private _documentKeyDown$ = new Subject<KeyboardEvent>();
    private _documentContextMenu$ = new Subject<void>();
    private _documentMouseMoved$ = new Subject<MouseEvent>();
    private _documentMouseUp$ = new Subject<MouseEvent>();

    /** Emits events when a 'click' event rises from the 'document'. */
    public getDocumentClickedListener(): Observable<MouseEvent> {
        return this._documentClicked$.asObservable();
    }

    public notifyDocumentClicked(e: MouseEvent) {
        this._documentClicked$.next(e);
    }

    /** Emits events when a 'contextmenu' event rises from the 'document'. */
    public getDocumentContextMenuListener(): Observable<void> {
        return this._documentContextMenu$.asObservable();
    }

    public notifyDocumentContextMenu() {
        this._documentContextMenu$.next();
    }

    /** Emits events when a 'keydown' event rises from the 'document'. */
    public getDocumentKeyDownListener(): Observable<KeyboardEvent> {
        return this._documentKeyDown$.asObservable();
    }

    public notifyDocumentKeyDown(e: KeyboardEvent) {
        this._documentKeyDown$.next(e);
    }

    /** Emits events when a 'mousemove' event rises from the 'document'. */
    public getDocumentMouseMoveListener(): Observable<MouseEvent> {
        return this._documentMouseMoved$.asObservable();
    }

    public notifyDocumentMouseMoved(e: MouseEvent) {
        this._documentMouseMoved$.next(e);
    }

    /** Emits events when a 'mouseup' event rises from the 'document'. */
    public getDocumentMouseUpListener(): Observable<MouseEvent> {
        return this._documentMouseUp$.asObservable();
    }

    public notifyDocumentMouseUp(e: MouseEvent) {
        this._documentMouseUp$.next(e);
    }
}