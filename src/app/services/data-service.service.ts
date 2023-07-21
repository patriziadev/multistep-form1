import { Injectable } from "@angular/core";
import { planTypeModel } from "../models/planType.model";
import { addonModel } from "../models/addon.model";

@Injectable({
    providedIn: "root",
})
export class DataServiceService {
    public planTypes: planTypeModel[] = [
        { name: "arcade", monthlyCost: 9, yearlyCost: 90 },
        { name: "advanced", monthlyCost: 12, yearlyCost: 120 },
        { name: "pro", monthlyCost: 15, yearlyCost: 150 },
    ];

    public addons: addonModel[] = [
        {
            id: "onlineService",
            name: "Online service",
            description: "Access to multiplayer games",
            monthlyCost: 1,
            yearlyCost: 10,
        },
        {
            id: "largerStorage",
            name: "Larger storage",
            description: "Extra 1TB of cloud save",
            monthlyCost: 2,
            yearlyCost: 20,
        },
        {
            id: "customizableProfile",
            name: "Customizable profile",
            description: "Custom theme on your profile",
            monthlyCost: 2,
            yearlyCost: 20,
        },
    ];

    public steps = ["Your info", "Select plan", "Add-ons", "Summary"];

    constructor() {}
}
