import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class WebSocketService {

  ws: WebSocket;

  constructor() {
  }

  createObservableSocket(url: string, id?: number): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable<string>(
      observer => {
        this.ws.onmessage = event => observer.next(event.data);
        this.ws.onerror = error => observer.error(error);
        this.ws.onclose = () => observer.complete();
        this.ws.onopen = () => this.sendMessage({productId: id});

        return () => this.ws.close();
      }
    ).map( message => JSON.parse(message));
  }

  sendMessage(message: any): void {
    this.ws.send(JSON.stringify(message));
  }
}
