import { Component, ContentChild, ElementRef, Input } from "@angular/core";

@Component({
    selector: 'as-card-a',
    template: `
        <div class="relative w-fit">
            <div class="relative bg-(--primary-color) rounded-md p-4 text-white w-full">
                <ng-content select="[header]"></ng-content>

                <div *ngIf="!headerElementRef && !!title">
                    <p class="font-light">{{subTitle}}</p>
                    <h3 class="text-lg">{{title}}</h3>
                </div>
            </div> 
            <div class="relative -top-2 bg-white rounded-md p-4 w-full">
                <ng-content></ng-content>
            </div> 
        </div> 
    `,
    styles: ``,
    standalone: false,
})

export class AsCardAComponent {
    @ContentChild('header', {static: false, read: ElementRef}) headerElementRef!: ElementRef;

    @Input() subTitle: string | null = null;
    @Input() title: string | null = null;
}