import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import { planTypeModel } from "../models/planType.model";

@Component({
    selector: "app-form-component",
    templateUrl: "./form-component.component.html",
    styleUrls: ["./form-component.component.scss"],
})
export class FormComponentComponent implements OnInit, OnDestroy {
    public step: number;
    public subscriptionDataFromStore: any;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.subscriptionDataFromStore = this.store
            .select("form")
            .subscribe((data) => {
                this.step = data.step;
                return this.step;
            });
    }

    ngOnDestroy() {
        this.subscriptionDataFromStore.unsubscribe();
    }
}
