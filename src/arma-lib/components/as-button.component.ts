import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'as-button',
    template: `
        <button class='btn-{{color}} btn-{{variant}}-{{sizeStage}}'>
            <div class="flex flex-col {{buildInnerClasses}}">
                <h3 class="">{{title}}</h3>  
                <p class="font-thin">{{description}}</p>
            </div>
        </button>
    `,
    styles: ``,
    standalone: false,
})

export class AsButtonComponent implements OnChanges {
    // Adjustments: Button text.
    @Input() public title: string = 'Button';
    @Input() public description: string | null = null;

    // Adjustments: Inner button structure.
    @Input() public alignment: 'left' | 'center' | 'right' = 'left';

    // Adjustments: Button properties.
    @Input() public variant: 'solid' | 'outline' | 'light' | 'dark' = 'solid';
    @Input() public color: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'base' = 'secondary'
    @Input() public size: 'small' | 'medium' | 'large' = 'medium'
    @Input() public innerClass: string | null = null;

    // Adjustments: Button icons.
    // **Unsupport for now ** current design doesn't have button with icon.
    @Input() public icon: string | null = null;
    @Input() public iconPos: string | null = null;

    public sizeStage: string | null = null;
    public alignmentStage: string | null = null;

    ngOnChanges(changes: SimpleChanges): void {
        const chgSize = changes['size']?.currentValue;
        const chgAlignment = changes['alignment']?.currentValue;

        // Action when "Size" was changed or initials.
        switch(chgSize) {
            case 'small': this.sizeStage = 'sm'; break;
            case 'large': this.sizeStage = 'lg'; break;
            default: this.sizeStage = 'md'
        }

        // Action when "Alignment" was changed or initials.
        this.alignmentStage = `text-${chgAlignment ?? (this.description ? 'left' : 'center')}`;
    }

    public get buildInnerClasses() {
        return this.alignmentStage?.concat(" ").concat(this.innerClass ?? '');
    }

}