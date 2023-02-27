import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GooglePayButtonModule } from '@google-pay/button-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneMaskDirective } from './phone-mask.directive';
import { SquarepayComponent } from './squarepay/squarepay.component';

@NgModule({
  declarations: [
    AppComponent,
    PhoneMaskDirective,
    SquarepayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GooglePayButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[PhoneMaskDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
