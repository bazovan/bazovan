import EventSource, {EventSourceInitDict} from 'eventsource';
import {fromEvent, Observable} from 'rxjs';
import {ConnectionOptions, Token} from '../../';

/**
 * Main connection object to connect to
 * Soroush api and send or listening to it.
 */
export class Connection {
  constructor(private _options: ConnectionOptions) {
    this._token = new Token(_options.token);
  }

  // Private EventSource object, saved when trying to connect.
  private _eventSource: EventSource;

  // Private token object.
  private _token: Token;

  /**
   * Token getter for public access.
   */
  public get token(): string {
    return this._token.raw();
  }

  /**
   * Private message listener ...
   * // TODO: convert listeners to different classes.
   */
  public get messageListener(): Observable<Event> {
    return fromEvent(this._eventSource, 'message');
  }

  /**
   * Generates the event source and emits an observer.
   * @return {Observable<EventSource>}
   */
  connect(): Observable<EventSource> {
    return new Observable((_subscriber): void => {
      try {
        const url = this._token.toSSE();
        const eventSourceObject = this._generateEventSource(url);

        this._eventSource = eventSourceObject;
        _subscriber.next(eventSourceObject);
      } catch (error) {
        _subscriber.error(error);
      }
    });
  }

  // Generates and returns event source object.
  private _generateEventSource(url: string, initDict?: EventSourceInitDict) {
    return new EventSource(url, initDict);
  }
}
