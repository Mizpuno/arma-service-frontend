import { CommonModule } from "@angular/common";
import { HttpClientModule, provideHttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const NG_COMPONENTS = [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
]

@NgModule({
    exports: [...NG_COMPONENTS]
})

export class ArmaCommonsModule {}