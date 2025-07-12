import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArmaSharesModule } from '../arma-lib/modules/arma-shares.module';
import { HttpClientModule } from '@angular/common/http';
import { ArmaComponentsModule } from '../arma-lib/modules/arma-components.module';
import { ArmaCommonsModule } from '../arma-lib/modules/arma-commons.module';
import { ArmaFormsModule } from '../arma-lib/modules/arma-forms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,

    // Importing the arma-lib modules.
    ArmaSharesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
