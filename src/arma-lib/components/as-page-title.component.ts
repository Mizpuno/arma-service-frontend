import { Component, Input } from "@angular/core";

@Component({
    selector: 'as-page-title',
    template: `
        <div class="flex flex-col">
            <h1 class="text-3xl">{{title}}</h1>
            <p *ngIf="subTitle!!" class="text-md font-light">{{subTitle}}</p>
        </div>
    `,
    styles: ``,
    standalone: false,
})

export class AsPageTitleComponent {
    @Input() title: string = 'Sample Page Title';
    @Input() subTitle: string | null = 'Sample page sub-title or descriptions an information.';
}