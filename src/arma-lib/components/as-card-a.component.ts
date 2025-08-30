import { Component, ContentChild, ElementRef, Input, TemplateRef } from "@angular/core";

@Component({
    selector: 'as-card-a',
    template: `
        <div class="relative"
             [ngClass]="{
                'w-fit': this.widthType === 'fit',
                'w-full': this.widthType === 'full',
             }">
            <div class="relative bg-(--primary-color) rounded-md p-4 text-white w-full"
                 *ngIf="headerTemplateRef!! || title!!">
                <ng-container *ngIf="headerTemplateRef!!; else defaultHeader"
                              [ngTemplateOutlet]="headerTemplateRef">
                </ng-container>

                <ng-template #defaultHeader>
                    <p class="text-md font-light">{{title}}</p>
                    <h3 class="text-lg">{{subTitle}}</h3>
                    
                </ng-template>
            </div> 
            <div class="relative -top-2 bg-white rounded-md p-4 w-full">
                <ng-container *ngIf="contentTemplateRef!!; else defaultContent"
                              [ngTemplateOutlet]="contentTemplateRef">
                </ng-container>

                <ng-template #defaultContent>
                    <ng-content></ng-content>
                </ng-template>
            </div> 
        </div> 
    `,
    styles: ``,
    standalone: false,
})

export class AsCardAComponent {
    @ContentChild('header') headerTemplateRef!: TemplateRef<any>;
    @ContentChild('content') contentTemplateRef!: TemplateRef<any>;

    @Input() subTitle: string | null = null;
    @Input() title: string | null = null;
    @Input() widthType: 'fit' | 'full' | 'custom' = 'fit';

}