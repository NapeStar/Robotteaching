import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {EnvironmentUrlService} from '../environment-url.service';
/**
 * This service provides a websocket needed for viewing progress of backend
 */
export class SocketDataService {
  /**
   * web socket
   */
  private socket;
  /**
   * default constructor - instantiate socket
   */
  constructor(private envUrl: EnvironmentUrlService) {
    this.socket = io(this.envUrl.urlSpinner);
  }
  /**
   * not used, but you can send a message to the socket
   * @param {any} message The message
   */
  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }
  /**
   * if status change of obeservable
   * @returns The Execution Status Msg
   */
  onNewMessage() {
    return new Observable((observer) => {
      this.socket.on('message', msg => {
        observer.next(msg);
      });
    });
  }
}
