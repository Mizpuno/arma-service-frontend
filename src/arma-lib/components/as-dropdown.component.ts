import { Component, computed, Input, OnChanges, OnInit, Output, signal, Signal, SimpleChanges, WritableSignal } from "@angular/core";
import { DEFAULT_DDL_OPTION, DropdownGroupInterface, DropdownOptionInterface } from "../interfaces/dropdown.interface";
import { ValidatorService } from "../services/validator.service";
import { UserService } from "../services/user.service";
import { UConfigurationInterface, UserInterface } from "../interfaces/user.interface";

@Component({
    selector: 'as-dropdown',
    template: `
        <div [ngClass]="dropdownClasses">
            <as-button type="button"
                       [title]="displayLabel()"
                       [variant]="'light'"
                       [maxWidth]="true"
                       [maxBorder]="true"
                       (click)="isOpen.set(!isOpen())">
            </as-button>

            <ng-container *ngIf="isOpen()">
                <div [ngClass]="buildInnerClasses">
                    <div class="flex gap-2 m-2">
                        <input class="custom-search-input"
                               [value]="searchContent()"
                               (input)="onSearchContent($event)"
                               placeholder="โปรดระบุคำค้นหา">

                        <div class="relative content-center">
                            <i class="fa-solid fa-heading z-1 p-2"
                                (click)="onHeaderAffect()"></i>
                            <i [ngClass]="headerAffectClass"></i>
                        </div>
                        
                        <i class="fa-solid fa-broom 
                                  relative p-2 content-center"></i> 
                    </div>
                    <div *ngFor="let group of filteredOptions()">
                        <div [id]="group.groupId">
                            <div *ngIf="group.name">
                                {{group.name}}
                            </div>

                            <div *ngFor="let option of group?.children"
                                 (click)="selectOption(option.value)">
                                <div class="flex gap-1 py-1 px-2"
                                     *ngIf="option.value; else notFound">
                                    <div class="value-box" 
                                         *ngIf="additionSearchOn === 'value' || additionSearchOn === 'all'">
                                        {{option.value}}
                                    </div>
                                    <div class="">
                                        {{option.label}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ng-template #notFound>
                        <div class="py-1 px-2 text-center 
                                    bg-[rgba(215,215,215,0.2)] text-[rgba(95,95,95,0.5)]">
                            ไม่พบรายการ
                        </div>
                    </ng-template>
                </div>
            </ng-container>
        </div>
    `,
    styles: `
        .value-box {
            font-size: 12px;
            color: white;
            padding: 0 10px;
            align-content: center;
            background-color: var(--secondary-color);
            border-radius: 0.375rem;
        }

        .custom-search-input {
            font-weight: 300;   
            padding: 5px;
            width: 100%;
            border-radius: 0.375rem;
            border: 1px solid rgba(0,0,0,0.2)
            // box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .custom-search-input::placeholder {
            color: rgba(0,0,0,0.4);
        }


        .ddl-wrapper {
            font-weight: 300;
            position: relative;
            z-index: 0;
        }

        .ddl-panel {
            position: absolute;
            background-color: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            border-radius: 0.375rem;
            // padding: 5px;
            z-index: 10;
            transition: all 0.3s;

            width: 100%;

            div {
                // padding: 5px;
            }

            div:hover {
                border-radius: 0.375rem;
                cursor: pointer;
            }
        }

        .ddl-panel.panel-fit {
            width: fit-content;
        }
    `,
    standalone: false
})

export class AsDropdownComponent implements OnInit {
    @Input({required: true}) set options (value: DropdownOptionInterface<any>[] | DropdownGroupInterface[] | null | undefined) {
        if (this.validatorService.isEmpty(value)) {
            this.rawOptions.set([]); 
            return;
        }
        
        if (value && 'groupId' in value[0]) {
            this.rawOptions.set(value as DropdownGroupInterface[]);
        } else {
            const buildGroup: DropdownGroupInterface[] = [{
                groupId: 'default',
                seq: 0,
                position: 'end',
                children: value as DropdownOptionInterface<any>[],
            }];
            this.rawOptions.set(buildGroup);
        }
    }

    @Input() public styleClass: string | null = null;
    @Input() public innerClass: string | null = null;

    @Input() public maxWidth: boolean = true;

    @Input() public showSearchBox: boolean = false;
    @Input() public additionSearchOn: 'all' | 'value' | 'topic' | 'none' = 'none'

    public rawOptions: WritableSignal<DropdownGroupInterface[]> = signal([]);
    public value: WritableSignal<any> = signal(null);
    public disabled: WritableSignal<boolean> = signal(false);
    public isOpen: WritableSignal<boolean> = signal(false);
    public searchContent: WritableSignal<any> = signal('');

    public headerAffectClass: any = null;
    public userConfig: UConfigurationInterface | null = null;

    constructor(
        private validatorService: ValidatorService,
        private userService: UserService,
    ) {}

    ngOnInit(): void {
        this.userConfig = this.userService.getUser;
    }

    readonly displayLabel = computed(() => {
        for(const group of this.rawOptions()) {
            const label = group.children.find(option => option.value === this.value())?.label
            if (label) return label as string;
        } return 'โปรดระบุตัวเลือก...';
    })

    filteredOptions = computed(() => {
        const target = this.searchContent()?.toLocaleLowerCase().trim();
        if (!target) return this.rawOptions();

        let groupList: DropdownGroupInterface[] = [];
        for(const group of this.rawOptions()) {
            const optionsPerGroup = group.children.filter(option => {
                const tempLabels = option.label?.toLocaleLowerCase().trim().includes(target);
                const tempValues = option.value.toLocaleLowerCase().trim().includes(target);
            
                if(!this.additionSearchOn) return tempLabels;
                switch(this.additionSearchOn) {
                    case 'all': case 'value': return tempLabels || tempValues;
                    case 'none': default: return tempLabels;
                }
            }) ?? [];

            if (optionsPerGroup.length !== 0) {
                group.children = optionsPerGroup;
                groupList.push(group);
            } else {
                const headerAffectKey = this.userConfig?.others?.dropdown?.headerSearchAffect;

                if(['all','topic'].includes(this.additionSearchOn) && headerAffectKey !== 'not-show') {
                    const tempGroup = group.name?.toLocaleLowerCase().trim().includes(target);
                    if (headerAffectKey === 'show-only') group.children = [DEFAULT_DDL_OPTION];
                    if (tempGroup) groupList.push(group);
                }
            }
        }
        return groupList;
    })

    public get dropdownClasses() {
        return {
            [this.styleClass ?? '']: true,
            ['ddl-wrapper']: true,
            ['w-fit']: !this.maxWidth,
        }
    }

    public get buildInnerClasses() {
        return {
            ['my-2']: true,
            [this.innerClass ?? '']: true,
            ['ddl-panel']: true,
            ['panel-fit']: !this.maxWidth,
        }
    }

    onChange: (v: any) => void = () => {};
    onTouched: () => void = () => {};

    public writeValue(v: any) {
        this.value.set(v);
    }
    
    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled.set(isDisabled);
    }

    selectOption(option: any) {
        console.log(option)

        if (this.disabled()) return;
        this.value.set(option);
        this.onChange(this.value());
        this.onTouched();
        this.isOpen.set(false);
    }

    onOpenDDL() {
        this.isOpen.set(!!this.isOpen());
    }

    onSearchContent(event: Event) {
        this.searchContent.set((event.target as HTMLInputElement).value);
    }

    onHeaderAffect() {
        const headerAffectKey =  this.userConfig?.others?.dropdown?.headerSearchAffect;

        this.headerAffectClass = {
            ['absolute z-10 p-2']: true,
            ['fa-solid fa-not-equal translate-x-[-100%] translate-y-[-2%]']: headerAffectKey === 'not-show',
            ['fa-solid fa-ellipsis-vertical translate-x-[-125%]']: headerAffectKey === 'show-only',
        }
    }
}