import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as FormComponentActions from "../../store/form-component.actions";
import { SubscriptionModel } from "src/app/models/subscription.model";

@Component({
    selector: "app-step4",
    templateUrl: "./step4.component.html",
    styleUrls: ["./step4.component.scss"],
})
export class Step4Component implements OnInit, OnDestroy {
    private subscriptionDataFromStore: any;
    public subscriptionData: SubscriptionModel;
    public planType: any;
    public total: number;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.subscriptionDataFromStore = this.store
            .select("form")
            .subscribe((data) => {
                return (this.subscriptionData = data.subscriptionData);
            });
        this.total =
            this.subscriptionData.planCost +
            this.subscriptionData.onlineServiceCost +
            this.subscriptionData.largerStorageCost +
            this.subscriptionData.customizableProfileCost;
    }

    ngOnDestroy() {
        this.subscriptionDataFromStore.unsubscribe();
    }

    onGoBack() {
        this.store.dispatch(new FormComponentActions.stepBack());
    }

    onChangePlan() {
        this.store.dispatch(new FormComponentActions.changePlan());
    }

    onSubmit() {
        this.store.dispatch(new FormComponentActions.stepForward());
    }
}
