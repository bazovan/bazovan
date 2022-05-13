import EventSource, {EventSourceInitDict} from 'eventsource';
import {fromEvent, Observable} from 'rxjs';

import {Token} from '@entity';
import {Entity} from './Entity';


export class Connection extends Entity {
  constructor(token: string) {
    super(); this.token = new Token(token);
  }

  private eventSource: EventSource;
  private token: Token;

  public get rawToken(): string {
    return this.token.raw();
  }

  public get messageListener(): Observable<Event> {
    return fromEvent(this.eventSource, 'message');
  }

  public connect(): Observable<EventSource> {
    return new Observable((subscribe): void => {
      try {
        const url = this.token.toSSE();
        const eventSourceObject = this.generateEvent(url);

        this.eventSource = eventSourceObject;
        subscribe.next(eventSourceObject);
      } catch (error) {
        subscribe.error(error);
      }
    });
  }

  private generateEvent(url: string, initDict?: EventSourceInitDict) {
    return new EventSource(url, initDict);
  }
}
