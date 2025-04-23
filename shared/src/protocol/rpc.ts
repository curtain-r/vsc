
import { Observable } from "rxjs";

export type P =
    | {
        /**
               * If defined, this request is expecting an AsyncIterator (multiple emitted values) in response.
               * The streamId is a unique and opaque identifier that all responses will be associated with so
               * that the caller can associate them with this request.
               *
               * If `undefined`, the request is expecting a Promise (single emitted value), and no stream is
               * needed.
               */
        streamId?: string;

        /**
               * The name of the method to invoke.
               */
        method: string;

        /**
               * The method arguments.
               */
        args: unknown[];
    }
    | {
        /** The streamId to abort.* */
        streamIdToAbort: string;
    };

export interface R {
    /**
          * If defined, this response is an emitted value (or error/completion event) from a request that
          * expects an AsyncIterator (multiple emitted values). All responses to that request use the same
          * `streamId` as the request so they can be associated with it.
          *
          * If `undefined`, this response is a single value (like a Promise).
          */
    streamId?: string;

    streamEvent?: "next" | "error" | "complete";

    /**
          * For non-stream responses or for `next`/`error` stream events, the data.
          */
    data?: unknown;
}

export interface Q {
    visibility: () => Observable<boolean>;
}
