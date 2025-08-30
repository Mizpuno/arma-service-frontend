import { Injectable, OnInit, signal, WritableSignal } from "@angular/core";
import { WebProtocolService } from "./web-protocol.service";
import { UserInterface } from "../interfaces/user.interface";
import { JsonPipe } from "@angular/common";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    updateSessionUser(user: UserInterface) {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    get getUser() {
        const jsonObj = sessionStorage.getItem('user');
        return jsonObj ? JSON.parse(jsonObj) : null as UserInterface | null;
    }
}