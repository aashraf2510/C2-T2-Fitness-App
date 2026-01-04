import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CLIENT_ROUTES } from "../../../core/constants/client-routes";
import { HorizontalCarousel } from "../../../shared/components/ui/horizontalCarousel/horizontalCarousel";
import { Footer } from "./components/footer/footer";
import { Navbar } from "./components/navbar/navbar";

@Component({
    selector: "app-main",
    imports: [Navbar, Footer, RouterModule, HorizontalCarousel, CommonModule],
    templateUrl: "./main.html",
    styleUrl: "./main.scss",
})
export class Main {
    // eslint-disable-next-line @angular-eslint/prefer-inject
    constructor(private router: Router) {}

    // Check if current route is the accounts page
    isAccountsPage(): boolean {
        return this.router.url.includes(CLIENT_ROUTES.main.account);
    }
}
