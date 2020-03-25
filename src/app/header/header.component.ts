import { Component, OnInit } from '@angular/core';

/**
 * Header component
 * displays "home" icon button
 */

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  /**
   * The default "constructor"
   */
  constructor() { }

  /**
   * ngOnInit is a lifecycle hook
   * executed after constructor
   */
  ngOnInit() { }

}
