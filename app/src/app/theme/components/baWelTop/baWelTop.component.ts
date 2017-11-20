import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {BaWelTopService} from "./baWelTop.service";
import {Router, NavigationEnd, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ba-wel-top',
  templateUrl: 'baWelTop.html',
  styleUrls: ['baWelTop.scss'],
  providers: [BaWelTopService]
})
export class BaWelTop {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  public showLevel2Menu: boolean = false;

  constructor(private _state: GlobalState, private _service: BaWelTopService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.showNav();
  }

  ngOnInit() {
    this.showNav();
  }

  showNav() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .mergeMap(route => route.data)
      .subscribe((event) => {
        // example: NavigationStart, RoutesRecognized, NavigationEnd
        if (event && event.isShowNav === true) {
          this.showLevel2Menu = true;
        } else {
          this.showLevel2Menu = false;
        }
      });
  }

  showPersonInfo() {
    this.showLevel2Menu = false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
