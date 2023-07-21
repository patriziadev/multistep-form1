import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormComponentComponent } from "./form-component/form-component.component";
import { Step1Component } from "./form-component/step1/step1.component";
import { Step2Component } from "./form-component/step2/step2.component";
import * as fromApp from "./store/app.reducer";
import { Step3Component } from './form-component/step3/step3.component';
import { Step4Component } from './form-component/step4/step4.component';
import { ThankyoupageComponent } from './thankyoupage/thankyoupage.component';
import { StepGuideComponent } from './step-guide/step-guide.component';

@NgModule({
    declarations: [
        AppComponent,
        FormComponentComponent,
        Step1Component,
        Step2Component,
        Step3Component,
        Step4Component,
        ThankyoupageComponent,
        StepGuideComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot(fromApp.appReducer),
        StoreDevtoolsModule.instrument(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
