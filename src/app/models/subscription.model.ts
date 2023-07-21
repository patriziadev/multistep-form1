export class SubscriptionModel {
    constructor(
        public name: string,
        public email: string,
        public phone: string,
        public planType: string,
        public planCost: number,
        public yearlyPlan: boolean,
        public onlineService: boolean,
        public onlineServiceCost: number,
        public largerStorage: boolean,
        public largerStorageCost: number,
        public customizableProfile: boolean,
        public customizableProfileCost: number
    ) {}
}
