import { forwardRef, NgModule } from "@angular/core";
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { AsSlideWrapperComponent } from "../components/as-slide-wrapper/as-slide-wrapper.component";
import { provideAnimations } from '@angular/platform-browser/animations';
import { AsButtonComponent } from "../components/as-button.component";
import { AsInputComponent } from "../components/as-input.component";
import { ArmaCommonsModule } from "./arma-commons.module";
import { ArmaFormsModule } from "./arma-forms.module";
import { AsCardAComponent } from "../components/as-card-a.component";

const SHARE_COMPONENTS = [
    AsSlideWrapperComponent,
    AsButtonComponent,
    AsInputComponent,
    AsCardAComponent,
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
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AsInputComponent),
        multi: true
    }]
})

export class ArmaComponentsModule {}