import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { AccountService } from 'app/core';
import { ProfileService } from '../profiles/profile.service';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class JhiMainComponent implements OnInit {
    abierto: boolean;
    // nav
    swaggerEnabled: boolean;
    inProduction: boolean;
    public isCollapsed = true;
    public isCollapsed2 = true;
    public width: number;
    constructor(private titleService: Title,
        private router: Router,
        private _account: AccountService,
        private _profile: ProfileService) {

        this.abierto = false;
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'siteApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this._profile.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
            if (event instanceof NavigationError && event.error.status === 404) {
                this.router.navigate(['/404']);
            }
        });
    }

    isAuthenticated() {
        return this._account.isAuthenticated();
    }
    slideMenu() {
        this.width = window.innerWidth;
        console.log(this.width);
        
        if (this.abierto) {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
            this.abierto = false;
        } else {
            document.getElementById("mySidenav").style.width = "250px";
            if (+this.width <= 770) {
                document.getElementById("main").style.marginLeft = "0";
                
            } else {
                document.getElementById("main").style.marginLeft = "250px";
            }

            this.abierto = true;
        }
    }


}
