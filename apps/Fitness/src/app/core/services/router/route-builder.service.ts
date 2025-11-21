import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Route Builder Service
 * Provides convenient methods to build language-aware route paths
 * 
 * Usage in components:
 *   routeBuilder = inject(RouteBuilderService);
 *   [routerLink]="routeBuilder.build(ROUTES.auth.base, ROUTES.auth.login)"
 */
@Injectable({ providedIn: 'root' })
export class RouteBuilderService {
    private readonly translate = inject(TranslateService);

    /**
     * Get current language code (uppercase: EN, AR)
     */
    get currentLang(): string {
        return this.translate.getCurrentLang();
    }

    /**
     * Build route array with automatic language prefix
     * @param segments - Route segments to combine
     * @returns Array ready for [routerLink]
     * 
     * Example:
     *   build(ROUTES.auth.base, ROUTES.auth.login)
     *   Returns: ['/', 'EN', 'auth', 'login']
     */
    build(...segments: string[]): string[] {
        return ['/', this.currentLang, ...segments];
    }

    /**
     * Build route array for routerLink binding (alias for build())
     * @param segments - Route segments to combine
     * @returns Array ready for [routerLink]
     * 
     * Example:
     *   buildPath(ROUTES.auth.base, ROUTES.auth.login)
     *   Returns: ['/', 'EN', 'auth', 'login']
     */
    buildPath(...segments: string[]): string[] {
        return this.build(...segments);
    }

    /**
     * Navigate to a route using router
     * @param segments - Route segments
     * @returns Array for router navigation
     * 
     * Example usage:
     *   this.router.navigate(this.routeBuilder.build(ROUTES.auth.login))
     */
    navigate(...segments: string[]): string[] {
        return this.build(...segments);
    }

    /**
     * Get language-specific route segments
     * @returns Object with language-aware route constants
     * 
     * Example:
     *   const routes = routeBuilder.getLanguageRoutes();
     *   routes.auth.login  // 'auth'
     */
    getLanguageRoutes() {
        const lang = this.currentLang;
        return {
            lang,
            root: lang,
        };
    }
}
