import { ActionReducerMap } from "@ngrx/store";
import * as fromFormReducer from "./form-component.reducer";

export interface AppState {
    form: fromFormReducer.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
    form: fromFormReducer.FormReducer,
};
