import { SubscriptionModel } from "src/app/models/subscription.model";
import * as formComponentActions from "./form-component.actions";

export interface State {
    subscriptionData: SubscriptionModel;
    step: number;
}

const initialState = {
    subscriptionData: {
        name: "",
        email: "",
        phone: "",
        planType: "",
        planCost: 0,
        yearlyPlan: false,
        onlineService: false,
        onlineServiceCost: 0,
        largerStorage: false,
        largerStorageCost: 0,
        customizableProfile: false,
        customizableProfileCost: 0,
    },
    step: 1,
};

export function FormReducer(
    state = initialState,
    action: formComponentActions.formActions
): State {
    switch (action.type) {
        case formComponentActions.EDIT_FORM:
            return {
                ...state,
                subscriptionData: {
                    ...state.subscriptionData,
                    ...action.payload,
                },
            };
        case formComponentActions.STEP_FORWARD:
            return {
                ...state,
                step: state.step + 1,
            };
        case formComponentActions.STEP_BACK:
            return {
                ...state,
                step: state.step - 1,
            };
        case formComponentActions.CHANGE_PLAN:
            return {
                ...state,
                step: 2,
            };
        default:
            return state;
    }
}
