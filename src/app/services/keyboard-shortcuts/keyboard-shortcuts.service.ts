import { Injectable } from "@angular/core";
import { combineLatest, fromEvent, merge } from "rxjs";
import { distinctUntilChanged, filter, share } from "rxjs/operators";
import { DomEventsService } from "../dom-events/dom-events.service";

@Injectable()
export class KeyboardShortcutsService {
    constructor(private domEventsService: DomEventsService) { }

    public listenFor(keyboardKeys: string[]) {
        // const keyDown$ = this.domEventsService.getDocumentKeyDownListener();
        const keyDown$ = fromEvent<KeyboardEvent>(document, 'keydown');
        // const keyUp$ = this.domEventsService.getDocumentKeyUpListener();
        const keyUp$ = fromEvent<KeyboardEvent>(document, 'keyup');

        // Emit only when EITHER event type ('keyup'/'keydown') OR key ('ArrowUp', 'ArrowDown', etc.) changes
        const keyEvents$ = merge(keyDown$, keyUp$).pipe(
            distinctUntilChanged((prev, curr) => prev.code === curr.code && prev.type === curr.type),
            share()
        );

        const createKeyPressStream = (charCode: string) => keyEvents$.pipe(
            filter((event) => event.code === charCode)
        );

        const keyCodeEvents$ = keyboardKeys.map(key => createKeyPressStream(key));

        return combineLatest(keyCodeEvents$).pipe(
            filter<KeyboardEvent[]>((events) => events.every(e => e.type === 'keydown'))
        );
    }
}