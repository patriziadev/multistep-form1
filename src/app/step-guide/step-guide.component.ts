import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { DataServiceService } from "../services/data-service.service";
import * as fromApp from "../store/app.reducer";

@Component({
    selector: "app-step-guide",
    templateUrl: "./step-guide.component.html",
    styleUrls: ["./step-guide.component.scss"],
})
export class StepGuideComponent implements OnInit, OnDestroy {
    public steps: string[] = [];
    public stepNow: number;
    private subscriptionDataFromStore: any;

    constructor(
        private dataService: DataServiceService,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit() {
        this.steps = this.dataService.steps;
        this.subscriptionDataFromStore = this.store
            .select("form")
            .subscribe((data) => {
                console.log("inner " + data.step);
                this.stepNow = data.step;
                return this.stepNow;
            });
    }

    ngOnDestroy() {
        this.subscriptionDataFromStore.unsubscribe();
    }
}
