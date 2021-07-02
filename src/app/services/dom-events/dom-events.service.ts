import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

import { filterNullish } from "src/app/helpers/observable.helper";

// TODO: Somewhere is a component with bad 'removeListener' logic (addEventListener uses anonymous function)

/** Instead of using '@HostListener' and impacting the performance - listen to 'document' events through here. */
@Injectable()
export class DomEventsService {
    private _documentClicked$ = new Subject<MouseEvent>();
    private _documentKeyDown$ = new BehaviorSubject<KeyboardEvent | null>(null);
    private _documentContextMenu$ = new BehaviorSubject<void>(undefined);

    /** Emits events when a 'click' event rises from the 'document'. */
    public getDocumentClickedListener(): Observable<MouseEvent> {
        return this._documentClicked$.asObservable().pipe(filterNullish());
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
        return this._documentKeyDown$.asObservable().pipe(filterNullish());
    }

    public notifyDocumentKeyDown(e: KeyboardEvent) {
        this._documentKeyDown$.next(e);
    }
}