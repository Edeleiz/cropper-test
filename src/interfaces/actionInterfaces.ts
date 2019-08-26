export interface IAction<T> {
    type: string;
    data: T;
}

export interface ICropActionPayload {
    cropUrl: string;
}