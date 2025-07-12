import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const NG_COMPONENTS = [
    FormsModule,
    ReactiveFormsModule,
]

@NgModule({
    exports: [...NG_COMPONENTS]
})

export class ArmaFormsModule {}