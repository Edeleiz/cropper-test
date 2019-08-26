import {IAction} from "../interfaces/actionInterfaces";

export enum ActionTypes {
    deleteCrop = 'delete_crop',
    saveCrop = 'save_crop',
    changeCrop = 'change_crop',
    changeCropRegion = 'change_crop'
}

export function action<T>(type: string, data: T): IAction<T> {
    return { type, data };
}