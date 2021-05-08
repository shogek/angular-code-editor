import { Observable, OperatorFunction, pipe, UnaryFunction } from "rxjs";
import { filter } from "rxjs/operators";

/**
 * Explicitly tell TypeScript that `undefined` is no longer a possible value.
 * Ex.: `Observable<string | undefined>` becomes `Observable<string>`.
 */
export function filterNullish<T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
  return pipe(
    filter(x => x != null) as OperatorFunction<T | null |  undefined, T>
  );
}