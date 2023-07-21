import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as FormComponentActions from "../../store/form-component.actions";
import * as fromApp from "../../store/app.reducer";
import { SubscriptionModel } from "src/app/models/subscription.model";

@Component({
    selector: "app-step1",
    templateUrl: "./step1.component.html",
    styleUrls: ["./step1.component.scss"],
})
export class Step1Component implements OnInit, OnDestroy {
    public personalInfo: FormGroup | any;
    private subscriptionDataFromStore: any;
    public formSubscriptionData: SubscriptionModel;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.subscriptionDataFromStore = this.store
            .select("form")
            .subscribe((data) => {
                this.formSubscriptionData = data.subscriptionData;
                return this.formSubscriptionData;
            });

        this.personalInfo = new FormGroup({
            name: new FormControl(
                this.formSubscriptionData.name,
                Validators.required
            ),
            email: new FormControl(this.formSubscriptionData.email, [
                Validators.required,
                Validators.email,
            ]),
            phone: new FormControl(
                this.formSubscriptionData.phone,
                Validators.required
            ),
        });
    }

    ngOnDestroy(): void {
        this.subscriptionDataFromStore.unsubscribe();
    }

    onSubmit() {
        this.formSubscriptionData = {
            ...this.formSubscriptionData,
            ...this.personalInfo.value,
        };
        this.store.dispatch(new FormComponentActions.stepForward());
        this.store.dispatch(
            new FormComponentActions.editForm({
                name: this.personalInfo.value.name,
                email: this.personalInfo.value.email,
                phone: this.personalInfo.value.phone,
                planType: this.formSubscriptionData.planType,
                planCost: this.formSubscriptionData.planCost,
                yearlyPlan: this.formSubscriptionData.yearlyPlan,
                onlineService: this.formSubscriptionData.onlineService,
                onlineServiceCost: this.formSubscriptionData.onlineServiceCost,
                largerStorage: this.formSubscriptionData.largerStorage,
                largerStorageCost: this.formSubscriptionData.largerStorageCost,
                customizableProfile:
                    this.formSubscriptionData.customizableProfile,
                customizableProfileCost:
                    this.formSubscriptionData.customizableProfileCost,
            })
        );
    }
}
