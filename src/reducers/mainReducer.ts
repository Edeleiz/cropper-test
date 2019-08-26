import {ActionTypes} from "../constants/actions";
import {IAction, ICropActionPayload} from "../interfaces/actionInterfaces";
import * as React from "react";

export const initialState: IReducersState = {
    pictureUrl: require('../resources/image.png'),
    currentCropUrl: '',
    savedCrops: []
};

const reducer: React.Reducer<IReducersState, IAction<any>> = (state: IReducersState, action: IAction<any>) => {
    const reduced = { ...state };
    switch (action.type) {
        case ActionTypes.saveCrop:
            return saveCrop(reduced, action);
        case ActionTypes.changeCrop:
            return changeCrop(reduced, action);
        case ActionTypes.deleteCrop:
            return deleteCrop(reduced, action);
        default:
            return state;
    }
};

function saveCrop(state: IReducersState, action: IAction<ICropActionPayload>): IReducersState {
    const {cropUrl} = action.data;
    if (state.savedCrops.indexOf(cropUrl) >= 0) {
        return state;
    }

    const savedCrops = state.savedCrops.slice();
    savedCrops.push(cropUrl);
    state.savedCrops = savedCrops;
    return state;
}

function changeCrop(state: IReducersState, action: IAction<ICropActionPayload>): IReducersState {
    state.currentCropUrl = action.data.cropUrl;
    return state;
}

function deleteCrop(state: IReducersState, action: IAction<ICropActionPayload>): IReducersState {
    const {cropUrl} = action.data;
    state.savedCrops = state.savedCrops.filter(element => element !== cropUrl);
    return state;
}

export interface IReducersState {
    pictureUrl: string;
    currentCropUrl: string;
    savedCrops: string[];
}

export default reducer;