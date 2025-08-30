import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ValidatorService {
    public isEmpty(value: any): boolean {
        if (Array.isArray(value)) {
            return value?.length === 0;
        }
        
        if (value instanceof Date) {
            return true;
        }

        if (value instanceof Object) {
            return Object.values(value).every(val => this.isEmpty(value));
        } 

        return this.expressionEmpt(value, false);
    }

    public isNotEmpty(value: any) {
        return !this.isEmpty(value);
    }

    private expressionEmpt(value: any, isEqual: boolean) {
        return isEqual && (value === undefined || value === null || value === '');
    }
}