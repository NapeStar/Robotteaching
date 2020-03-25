import * as io from 'socket.io-client';
import {Observable, Observer} from 'rxjs';
/**
 * This service provides a websocket needed for viewing progress of backend
 */
export class SocketDataService {
  private url = 'http://localhost:3030';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  /*
    public getMessages = () => {
      return Observable.create((observer) => {
        this.socket.on('new-message', (message) => {
          console.log("NEW MSG FROM SERVER");
          console.log(message);
          observer.next(message);
        });
      });
    }
    */

  onNewMessage() {
    return new Observable((observer) => {
      this.socket.on('message', msg => {
        observer.next(msg);
      });
    });
  }
}
