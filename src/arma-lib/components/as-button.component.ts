import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'as-button',
    template: `
        <button [ngClass]="buttonClasses">
            <div class="flex gap-3 items-center">
                <ng-container *ngIf="lIcon">
                    <i class="{{lIcon}}"></i>
                </ng-container>
                <div class="flex flex-col {{buildInnerClasses}}">
                    <ng-container>
                        <h3 class="">{{title}}</h3>  
                        <p class="font-thin">{{description}}</p>
                    </ng-container>
                </div>
                <ng-container *ngIf="rIcon">
                    <i class="{{rIcon}}"></i>
                </ng-container>
            </div>
            
        </button>
    `,
    styles: ``,
    standalone: false,
})

export class AsButtonComponent implements OnChanges {
    // Adjustments: Button text.
    @Input() public title: string = 'Sample Button';
    @Input() public description: string | null = null;

    // Adjustments: Inner button structure.
    @Input() public alignment: 'left' | 'center' | 'right' = 'left';

    // Adjustments: Button properties.
    @Input() public variant: 'solid' | 'outline' | 'light' | 'dark' = 'solid';
    @Input() public color: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'base' = 'secondary'
    @Input() public size: 'small' | 'medium' | 'large' | 'extra' | 'full' = 'medium'
    
    @Input() public styleClass: string | null = null;
    @Input() public innerClass: string | null = null;

    @Input() public maxBorder: boolean = false;
    @Input() public maxWidth: boolean = false;

    // Adjustments: Button icons.
    @Input() public lIcon: string | null = null;
    @Input() public rIcon: string | null = null;

    public sizeStage: string | null = null;
    public alignmentStage: string | null = null;

    ngOnChanges(changes: SimpleChanges): void {
        const chgSize = changes['size']?.currentValue;
        const chgAlignment = changes['alignment']?.currentValue;

        // Action when "Size" was changed or initials.
        switch(chgSize) {
            case 'small': this.sizeStage = 'sm'; break;
            case 'large': this.sizeStage = 'lg'; break;
            case 'extra': this.sizeStage = 'xl'; break;
            case 'full': this.sizeStage = 'full'; break;
            default: this.sizeStage = 'md'
        }

        // Action when "Alignment" was changed or initials.
        this.alignmentStage = `text-${chgAlignment ?? (this.description ? 'left' : 'center')}`;
    }

    public get buildInnerClasses() {
        return this.alignmentStage?.concat(" ").concat(this.innerClass ?? '');
    }

    public get buttonClasses() {
        return {
            [this.styleClass ?? '']: true,
            ['btn-' + this.color]: true,
            ['btn-' + this.variant + '-' + this.sizeStage]: this.sizeStage!!,
            ['w-full']: this.maxWidth,
            ['rounded-full']: this.maxBorder,
        };
    }

}