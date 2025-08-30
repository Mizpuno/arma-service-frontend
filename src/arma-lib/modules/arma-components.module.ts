import { forwardRef, NgModule } from "@angular/core";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AsSlideWrapperComponent } from "../components/as-slide-wrapper/as-slide-wrapper.component";
import { AsButtonComponent } from "../components/as-button.component";
import { AsInputComponent } from "../components/as-input.component";
import { ArmaCommonsModule } from "./arma-commons.module";
import { ArmaFormsModule } from "./arma-forms.module";
import { AsCardAComponent } from "../components/as-card-a.component";
import { AsPageTitleComponent } from "../components/as-page-title.component";
import { AsPaginationComponent } from "../components/as-pagination.component";
import { AsDropdownComponent } from "../components/as-dropdown.component";

const SHARE_COMPONENTS = [
    AsSlideWrapperComponent,
    AsButtonComponent,
    AsInputComponent,
    AsCardAComponent,
    AsPageTitleComponent,
    AsPaginationComponent,
    AsDropdownComponent,
]

const IMPORT_COMPONENTS = [
    ArmaCommonsModule,
    ArmaFormsModule,
]

@NgModule({
    declarations: [
        ...SHARE_COMPONENTS
    ],
    imports: [
        ...IMPORT_COMPONENTS
    ],
    exports: [
        ...SHARE_COMPONENTS,
        ...IMPORT_COMPONENTS,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AsInputComponent),
            multi: true
        },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AsDropdownComponent),
            multi: true
        }
    ]
})

export class ArmaComponentsModule {}