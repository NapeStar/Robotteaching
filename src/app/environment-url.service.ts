import { Injectable } from '@angular/core';
import { environment} from '../environments/environment';
/**
 * This service provides urlAddress from backend and from Spinner
 */
@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  /**
   * save urlAddress from "src/environments/envirionments.ts"
   */
  public urlAddress = environment.urlAddress;
  /**
   * save urlSpinner from "src/environments/envirionments.ts"
   */
  public urlSpinner = environment.urlSpinner;
  /**
   * default constructor
   */
  constructor() { }
}
