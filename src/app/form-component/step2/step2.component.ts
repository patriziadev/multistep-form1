import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DataServiceService } from "src/app/services/data-service.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as FormComponentActions from "../../store/form-component.actions";
import { SubscriptionModel } from "src/app/models/subscription.model";
import { planTypeModel } from "src/app/models/planType.model";

@Component({
    selector: "app-step2",
    templateUrl: "./step2.component.html",
    styleUrls: ["./step2.component.scss"],
})
export class Step2Component implements OnInit, OnDestroy {
    public planTypes: planTypeModel[] = [];
    public planInfo: FormGroup | any;
    public subscriptionData: SubscriptionModel;
    private subscriptionDataFromStore: any;
    public isChecked: boolean[] = [];
    private choosenPlanCost: any;

    constructor(
        private store: Store<fromApp.AppState>,
        private dataService: DataServiceService
    ) {}

    ngOnInit() {
        this.subscriptionDataFromStore = this.store
            .select("form")
            .subscribe((data) => {
                this.subscriptionData = data.subscriptionData;
                return this.subscriptionData;
            });

        this.planTypes = this.dataService.planTypes;
        this.planInfo = new FormGroup({
            planType: new FormControl(
                this.subscriptionData.planType,
                Validators.required
            ),
            yearlyPlan: new FormControl(this.subscriptionData.yearlyPlan),
        });
    }

    ngOnDestroy() {
        this.subscriptionDataFromStore.unsubscribe();
    }

    onSubmit() {
        this.subscriptionData = {
            ...this.subscriptionData,
            ...this.planInfo.value,
        };

        this.choosenPlanCost = this.dataService.planTypes
            .filter((el) => {
                return el.name == this.planInfo.value.planType;
            })
            .map((el) => {
                if (this.planInfo.value.yearlyPlan) {
                    return el.yearlyCost;
                } else {
                    return el.monthlyCost;
                }
            });

        this.store.dispatch(new FormComponentActions.stepForward());
        this.store.dispatch(
            new FormComponentActions.editForm({
                name: this.subscriptionData.name,
                email: this.subscriptionData.email,
                phone: this.subscriptionData.phone,
                planType: this.planInfo.value.planType,
                planCost: Number(this.choosenPlanCost),
                yearlyPlan: this.planInfo.value.yearlyPlan,
                onlineService: this.subscriptionData.onlineService,
                onlineServiceCost: this.subscriptionData.onlineServiceCost,
                largerStorage: this.subscriptionData.largerStorage,
                largerStorageCost: this.subscriptionData.largerStorageCost,
                customizableProfile: this.subscriptionData.customizableProfile,
                customizableProfileCost:
                    this.subscriptionData.customizableProfileCost,
            })
        );
    }

    onGoBack() {
        this.store.dispatch(new FormComponentActions.stepBack());
    }
}
