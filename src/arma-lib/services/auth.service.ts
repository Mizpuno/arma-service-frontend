import { Injectable } from "@angular/core";
import { WebProtocolService } from "./web-protocol.service";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(
        private webProtocolService: WebProtocolService,
    ) {}

    // Bypass real logic login for create a web structures.
    login() {
        return this.webProtocolService.get('http://localhost:3000/login')
    }

    updateSessionToken(token: string) {
        sessionStorage.setItem('auth_token', token);
    }

    clearSession() {
        sessionStorage.clear();
    }
}