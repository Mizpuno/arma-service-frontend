import { Injectable } from "@angular/core";
import { CommonResponse } from "../../interfaces/common-response.interface";
import { MenuInterface } from "../../interfaces/menu.interface";
import { WebProtocolService } from "../../services/web-protocol.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class NavigationService {
    private domain: string = 'http://localhost:3000';
    private apiVersion: number = 1;
    private apiUrl: string = `${this.domain}/arma-libs/v${this.apiVersion}`;

    constructor(
        private readonly _webProtocolService: WebProtocolService
    ) {}

    getMenus(): Observable<CommonResponse<MenuInterface[]>> {
        // return this._webProtocolService.get(`${this.apiUrl}/get_menus`);
        return this._webProtocolService.get("http://localhost:3000/menu");
    }
}