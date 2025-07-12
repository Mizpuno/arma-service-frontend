import { AfterContentInit, Component, ContentChildren, Input, OnDestroy, OnInit, QueryList, TemplateRef } from "@angular/core";
import { trigger, transition, style, animate } from '@angular/animations'
import { interval, Subscription } from "rxjs";

@Component({
    selector: 'as-slide-wrapper',
    template: `
        <div *ngIf="contentTemplates.length">
            <ng-container *ngFor="let template of contentTemplates; let i = index">
                <div *ngIf="currentIndex === i" [@fadeInOut]>
                    <ng-container *ngTemplateOutlet="contentTemplates[currentIndex]"/>
                </div>
            </ng-container>
        </div>
    `,
    styles: `
        .slide {width: 100%}
    `,
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({
                    opacity: 0,
                    position: 'absolute',
                }),
                animate('400ms ease-in', style({
                    opacity: 1,
                    position: 'relative',
                })),
            ]),
            transition(':leave', [
                style({position: 'absolute'}),
            ])
        ]) 
    ],
    standalone: false,
})

export class AsSlideWrapperComponent implements AfterContentInit, OnInit {
    @Input() intervalSeconds: number = 3;
    @ContentChildren(TemplateRef) templates!: QueryList<TemplateRef<any>>;

    public contentTemplates: TemplateRef<any>[] = [];
    public currentIndex: number = 0 

    private timerSub?: Subscription;
    private contentInitFlag: boolean = false;

    constructor() {}
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    ngAfterContentInit(): void {
        console.log (this.templates);
        this.contentTemplates = this.templates.toArray();
        this.currentIndex = 1;
        this.timerSub = interval(this.intervalSeconds * 1000).subscribe(() => {
            console.log(this.currentIndex)
            this.currentIndex = (this.currentIndex + 1) % this.contentTemplates.length;
        });
    }

    ngOnDestroy(): void {
        this.timerSub?.unsubscribe();
    }
}