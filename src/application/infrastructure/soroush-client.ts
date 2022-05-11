/* eslint-disable max-len */
import {EventEmitter} from 'stream';
import EventSource from 'eventsource';
import {Observable, Subject} from 'rxjs';

import {Client, SoroushDataTypes, ClientMethodCallback, SoroushClientOptions, SSEHeaders} from '../../interfaces';

// App imports.
import {Connection, Constants} from '../../';
import {SoroushEventType, SoroushFilter} from '../../';

export class SoroushClient extends EventEmitter implements Client {
  constructor(private readonly token: string) {
    super();
    this._connection = new Connection({
      token,
    });
  }

  /**
   * Connection Object of Soroush Client.
   */ private _connection: Connection;

  /**
   * Event source object that connects to Soroush SSE
   */ private eventSource?: EventSource;

  /**
   * This works to pass data to subscribers
   */ public reactSubject$?: Subject<any>;

  /**
   * This works to pass data to subscribers
   */ public incomeEvent$?: Observable<Event>;

  /**
   * The filters
   */ private filters: SoroushFilter[];

  /**
   * Generate EventSource to listen to income soroush messages.
   * @return {void}
   */
  private prepareEventSource(): void {
    const SSEUri: string = this.generateSSEUri();
    const headers = this.loadHeaders();

    // Set eventSource
    this.eventSource = new EventSource(SSEUri, {headers});

    // Create new observable to pass data into other listeners
    this.reactSubject$ = new Subject();
  }

  /**
   * Gathers prepared uri constant and merges token into it
   * then we are free to use it to connect into sse server.
   * @param {string} _uri This is optional to use.
   * @return {string}
   */
  private generateSSEUri(): string {
    return Constants.SSE.uri.replace(/#token/i, this.token);
  }

  /**
   * Load headers from constants and maps theme into object
   * that we can use.
   * @return {SSEHeaders} mapped headers object
   */
  private loadHeaders(): {headers: SSEHeaders} {
    return {
      headers: {
        accept: Constants.SSE_HEADERS.accept,
        contentType: Constants.SSE_HEADERS.contentType,
      },
    };
  }

  /**
   * Just listen on incoming types like 'text', 'image' or ...
   * @param {SoroushDataTypes} _type acceptable dataTypes
   * @param {Function} _callback callback to invoke after specified data
   * @return {Observable}
   * incomes.
   */
  onType<T extends SoroushEventType>(_type: SoroushDataTypes, _callback: ClientMethodCallback): Observable<T> {
    return new Observable((subscriber) => {
      this.incomeEvent$.subscribe((soroushEv) => {
        // TODO: generate type.
        // Generate result object.
        // Next the object.
      });
    });
  }

  /**
   * Listen to a message!
   * @param {string} _message Your message to listen
   * @param {ClientMethodCallback} _callback callback fn to invoke when
   * specified message overcomes to our listener.
   */
  message(_message: string, _callback: ClientMethodCallback) {}

  /**
   * Options for lunching Soroush Client
   * @param {SoroushClientOptions} _options options
   */
  launch(_options: SoroushClientOptions) {
    this._connection.connect().subscribe((sourceEvent) => {
      console.log('Bot started successfully');
    });
  }

  /**
   * Here we will find the typeof our income data.
   */
  private findMessageType() {}
}
