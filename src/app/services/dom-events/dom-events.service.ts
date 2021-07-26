import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";

/** Instead of using '@HostListener' and impacting the performance - listen to 'document' events through here. */
@Injectable({
    providedIn: 'root'
})
export class DomEventsService implements OnDestroy {
    private _documentClicked$ = new Subject<MouseEvent>();
    private _documentKeyDown$ = new Subject<KeyboardEvent>();
    private _documentContextMenu$ = new Subject<void>();
    private _documentMouseMoved$ = new Subject<MouseEvent>();
    private _documentMouseUp$ = new Subject<MouseEvent>();

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.document.addEventListener('click', this.notifyDocumentClicked);
        this.document.addEventListener('contextmenu', this.notifyDocumentContextMenu);
        this.document.addEventListener('keydown', this.notifyDocumentKeyDown);
        this.document.addEventListener('mousemove', this.notifyDocumentMouseMoved);
        this.document.addEventListener('mouseup', this.notifyDocumentMouseUp);
    }

    ngOnDestroy() {
        this.document.removeEventListener('click', this.notifyDocumentClicked);
        this.document.removeEventListener('contextmenu', this.notifyDocumentContextMenu);
        this.document.removeEventListener('keydown', this.notifyDocumentKeyDown);
        this.document.removeEventListener('mousemove', this.notifyDocumentMouseMoved);
        this.document.removeEventListener('mouseup', this.notifyDocumentMouseUp);
    }

    /** Emits events when a 'click' event rises from the 'document'. */
    public getDocumentClickedListener = (): Observable<MouseEvent> => this._documentClicked$.asObservable();

    /** Emits events when a 'contextmenu' event rises from the 'document'. */
    public getDocumentContextMenuListener = (): Observable<void> => this._documentContextMenu$.asObservable();

    /** Emits events when a 'keydown' event rises from the 'document'. */
    public getDocumentKeyDownListener = (): Observable<KeyboardEvent> => this._documentKeyDown$.asObservable();

    /** Emits events when a 'mousemove' event rises from the 'document'. */
    public getDocumentMouseMoveListener = (): Observable<MouseEvent> => this._documentMouseMoved$.asObservable();

    /** Emits events when a 'mouseup' event rises from the 'document'. */
    public getDocumentMouseUpListener = (): Observable<MouseEvent> => this._documentMouseUp$.asObservable();

    private notifyDocumentClicked = (e: MouseEvent) => this._documentClicked$.next(e);
    private notifyDocumentContextMenu = () => this._documentContextMenu$.next();
    private notifyDocumentKeyDown = (e: KeyboardEvent) => this._documentKeyDown$.next(e);
    private notifyDocumentMouseMoved = (e: MouseEvent) => this._documentMouseMoved$.next(e);
    private notifyDocumentMouseUp = (e: MouseEvent) => this._documentMouseUp$.next(e);
}