import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

const NG_COMPONENTS = [
    CommonModule,
]

@NgModule({
    exports: [...NG_COMPONENTS]
})

export class ArmaCommonsModule {}