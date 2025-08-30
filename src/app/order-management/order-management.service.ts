import { Injectable } from "@angular/core";
import { WebProtocolService } from "../../arma-lib/services/web-protocol.service";
import { Observable } from "rxjs";
import { SearchOrderInterface } from "./order-management.interface";
import { CommonResponse } from "../../arma-lib/interfaces/common-response.interface";

@Injectable({
    providedIn: 'root'
})

export class OrderManagementService {
    constructor (
        private webProtocolService: WebProtocolService
    ) {}

    getOrderList(): Observable<CommonResponse<SearchOrderInterface[]>> {
        return this.webProtocolService.get("http://localhost:3000/search-order-list");
    }
}