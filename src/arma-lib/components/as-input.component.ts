import { Component, EventEmitter, Input, OnChanges, OnInit, Optional, Output, Self, SimpleChanges } from "@angular/core";
import { NgControl } from "@angular/forms";

@Component({
    selector: 'as-input',
    template: `
        <div class="{{width()}}">
            <div class="input-group p-2 flex flex-col border-1 border-(--base-color) {{border()}}"
                [ngClass]='{"invalid-control": this.showError}'>
                
                <div id="label" class="flex gap-2 pr-2 items-center">
                    <label *ngIf="title" class="pt-2 pl-2">{{title}}</label>

                    <ng-container *ngIf="!!required && !!reqShowBadge && !!this.ngControl">
                        <div *ngIf="!!this.value && !this.showError; else requiredBadge"
                            class="relative text-(--success-color) text-xs w-fit h-fit m-0 mt-2 flex flex-column items-center gap-1">
                            <i class="fa-solid fa-circle-check"></i>
                            <p>correct</p>
                        </div>  
                        
                        <ng-template #requiredBadge>
                            <div class="relative text-(--secondary-color) text-xs w-fit h-fit m-0 mt-2 flex flex-column items-center gap-1">
                                <i class="fa-solid fa-circle-exclamation"
                                (mouseenter)="alertFocus = true"
                                (mouseleave)="alertFocus = false"></i>
                                <p>in-correct</p>

                                <div id="required-popup" 
                                    class="absolute -top-8 bg-(--base-color) rounded-md text-white p-2 whitespace-nowrap" *ngIf="!!alertFocus && !!reqToolTip">
                                    <p>{{reqToolTip}}</p>
                                </div> 
                            </div>
                        </ng-template>
                    </ng-container>
                </div>
                
                <input [id]="inputId"
                    [type]="type"
                    [value]="value"
                    [placeholder]="placeholder"
                    (input)="onValueEmit($event)"
                    (blur)="handleBlur()"
                    (focus)="handleFocus()"
                    [ngClass]="{
                        'p-2': !label,
                        'px-2 pb-2': !!label
                    }"
                    class="w-full {{border()}}"/>
            </div>

            
            <div *ngIf="!!reqMsg || !!required && !!showError"
                 class="bg-gray-200 w-full text-gray-500 px-5 flex flx-column gap-1 py-1 mt-2 flex flex-col">
                 <p *ngIf="!!this.showError"
                    class="whitespace-pre-line text-(--danger-color) text-xs">* {{errorMessage}}</p>
                <p class="whitespace-pre-line text-xs">{{reqMsg}}</p>
            </div>
        </div>
        
    `,
    styles: ``,
    standalone: false,
    
})

export class AsInputComponent implements OnInit, OnChanges {
    @Output() blur: EventEmitter<any> = new EventEmitter<any>;
    @Output() focus: EventEmitter<any> = new EventEmitter<any>;
    
    @Input() inputId: string | undefined;
    @Input() label: string | null = null;
    @Input() type: string = 'text'; 
    @Input() placeholder: string | null = "Please input value.";
    @Input() required: boolean = false;
    @Input() reqShowBadge: boolean | undefined;
    @Input() reqShowBadgeText: boolean | undefined;
    @Input() reqToolTip: string | null = null;  
    @Input() reqMsg: string | null = null;
    @Input() reqErrMsg: string | null = null;

    @Input() size: 'small' | 'medium' | 'large' = 'medium';

    @Input() maxBorder: boolean = false; 
    @Input() maxWidth: boolean = false;
    
    public value: string | null = null;
    public onChange = (value: any) => {};
    public onTouched = () => {};
    public onFocus = () => {};
    public alertFocus: boolean = false;

    public border = () => this.maxBorder ? 'rounded-full' : 'rounded-md';
    public width = () => this.maxWidth ? 'w-full' : 'w-fit';

    public sizeStage: string | null = null;
    public title: string | null = null;
    
    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {
        this.title = this.label || this.ngControl?.name as string || this.ngControl?.path?.[0] || null;
        console.log(this.title)
        if (this.reqShowBadge == undefined) {
            this.reqShowBadge = false;
            this.reqShowBadgeText = false;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const chgSize = changes['size']?.currentValue;

        switch(chgSize) {
            case 'small': this.sizeStage = 'sm'; break;
            case 'large': this.sizeStage = 'lg'; break;
            default: this.sizeStage = 'md'
        }
    }

    abbrMapper(value: string, mapper: Object, output: string) {
        for(const [k, v] of Object.entries(mapper)) {
            try {

            } catch (eror) {
            }
        }
        return output;
    }

    writeValue(value: any) {
        this.value = value;
    }

    handleBlur() {
        this.onTouched();
        this.blur.emit();
    }

    handleFocus() {
        this.onFocus();
        this.focus.emit();
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn
    }

    onValueEmit(event: Event) {
        const value = (event.target as HTMLInputElement).value ?? null
        this.value = value;
        this.onChange(value);
    }

    get showError() {
        return !!(this.ngControl && this.ngControl.invalid && (this.ngControl.dirty || this.ngControl.touched));
    }

    get errorMessage() {
        if (!this.ngControl?.errors) return;
        let errorString: string[] = [];
        for (const [errKey, errVal] of Object.entries(this.ngControl.errors)) {
            switch (errKey) {
                case 'required': errorString.push('โปรดระบุข้อมูลในช่องนี้'); break;
                case 'email': errorString.push('รูปแบบอีเมลไม่ถูกต้อง'); break;
                case 'minlength':  errorString.push(`อักขระอย่างต่ำต้องมีอย่างน้อย ${errVal.requiredLength} ตัวอักษร`); break;
                case 'maxlength': errorString.push(`อักขระมีได้ไม่เกิน ${errVal.requiredLength} ตัวอักษร`); break;
            }
        }

        return errorString
    }

    // get validateStatus() {
    //     if (this.ngControl) {

    //     }
    // }
    
}

