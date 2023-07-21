import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as FormComponentActions from "../../store/form-component.actions";
import { SubscriptionModel } from "src/app/models/subscription.model";
import { addonModel } from "src/app/models/addon.model";
import { DataServiceService } from "src/app/services/data-service.service";

@Component({
    selector: "app-step3",
    templateUrl: "./step3.component.html",
    styleUrls: ["./step3.component.scss"],
})
export class Step3Component implements OnInit {
    public addons: addonModel[] = [];
    public planInfo: FormGroup | any;
    public subscriptionData: SubscriptionModel;
    private subscriptionDataFromStore: any;
    private addOnlineServiceCost: number;
    private addLargerStorageCost: number;
    private addCustomizableProfileCost: number;

    constructor(
        private store: Store<fromApp.AppState>,
        private dataService: DataServiceService
    ) {}

    ngOnInit() {
        // import the data of the addons from the service
        this.addons = this.dataService.addons;

        // take the data of the form from the store
        this.subscriptionDataFromStore = this.store
            .select("form")
            .subscribe((data) => {
                this.subscriptionData = data.subscriptionData;
                return this.subscriptionData;
            });

        // initialize the form
        this.planInfo = new FormGroup({
            onlineService: new FormControl(this.subscriptionData.onlineService),
            largerStorage: new FormControl(this.subscriptionData.largerStorage),
            customizableProfile: new FormControl(
                this.subscriptionData.customizableProfile
            ),
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

        this.addOnlineServiceCost =
            Number(this.planInfo.value.onlineService) *
            (Number(this.subscriptionData.yearlyPlan) *
                this.addons[0].yearlyCost +
                Number(!this.subscriptionData.yearlyPlan) *
                    this.addons[0].monthlyCost);

        this.addLargerStorageCost =
            Number(this.planInfo.value.largerStorage) *
            (Number(this.subscriptionData.yearlyPlan) *
                this.addons[1].yearlyCost +
                Number(!this.subscriptionData.yearlyPlan) *
                    this.addons[1].monthlyCost);

        this.addCustomizableProfileCost =
            Number(this.planInfo.value.customizableProfile) *
            (Number(this.subscriptionData.yearlyPlan) *
                this.addons[2].yearlyCost +
                Number(!this.subscriptionData.yearlyPlan) *
                    this.addons[2].monthlyCost);

        this.store.dispatch(new FormComponentActions.stepForward());
        this.store.dispatch(
            new FormComponentActions.editForm({
                name: this.subscriptionData.name,
                email: this.subscriptionData.email,
                phone: this.subscriptionData.phone,
                planType: this.subscriptionData.planType,
                planCost: this.subscriptionData.planCost,
                yearlyPlan: this.subscriptionData.yearlyPlan,
                onlineService: this.planInfo.value.onlineService,
                onlineServiceCost: Number(this.addOnlineServiceCost),
                largerStorage: this.planInfo.value.largerStorage,
                largerStorageCost: Number(this.addLargerStorageCost),
                customizableProfile: this.planInfo.value.customizableProfile,
                customizableProfileCost: Number(
                    this.addCustomizableProfileCost
                ),
            })
        );
    }

    onGoBack() {
        this.store.dispatch(new FormComponentActions.stepBack());
    }
}
