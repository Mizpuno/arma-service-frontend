import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { CommonResponse } from "../interfaces/common-response.interface";

@Injectable({
    providedIn: 'root'
})

export class WebProtocolService {
    constructor(private http: HttpClient) {}

    get(url: string, params?: any): Observable<CommonResponse<any>> {
        console.log('GET Request URL:', url);
        return this.http.get<CommonResponse<any>>(url, {params}).pipe(
            catchError((error) => {
                console.error('GET Request error:', error);
                throw error;
            })
    )}

    post(url: string, body: any): Observable<CommonResponse<any>> {
        return this.http.post<CommonResponse<any>>(url, body).pipe(
            catchError((error) => {
                console.error('POST Request error:', error);
                throw error;
            })
        );
    }
}