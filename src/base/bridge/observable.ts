import * as vscode from "vscode";
import { Observable } from "rxjs";

export const NO_INITIAL_VALUE = Symbol("NO_INITIAL_VALUE");

export const fromVSCodeEvent = <T>(event: vscode.Event<T>, getInitialValue?: () => T | typeof NO_INITIAL_VALUE | Promise<T | typeof NO_INITIAL_VALUE>): Observable<T> => {
    return new Observable(observer => {
        if (getInitialValue) {
            const initialValue = getInitialValue();
            if (initialValue instanceof Promise) {
                initialValue.then(value => {
                    if (value === NO_INITIAL_VALUE) {
                        return;
                    }
                    observer.next(value);
                });
            } else {
                if (initialValue !== NO_INITIAL_VALUE) {
                    observer.next(initialValue);
                }
            }
        }
        let disposed = false;
        const disposable = event(value => {
            if (disposed) {
                return;
            }
            observer.next(value);
        });
        return () => {
            disposed = true;
            disposable.dispose();
            observer.complete();
        };
    });
};
