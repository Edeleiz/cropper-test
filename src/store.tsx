import React, {Context, useReducer} from 'react';
import reducer, {initialState, IReducersState} from "./reducers/mainReducer";
import {IAction} from "./interfaces/actionInterfaces";

const Store: Context<IStore> = React.createContext<unknown>({}) as Context<IStore>;

const Provider = ({children}: {children: any}) => {
    const store = useStore(reducer, initialState);
    return <Store.Provider value={store}>{children}</Store.Provider>
};

const useStore = (reducer: React.Reducer<IReducersState, IAction<any>>, initialState: IReducersState): IStore => {
    const [state, dispatch] = useReducer<React.Reducer<IReducersState, IAction<any>>>(reducer, initialState);
    return {state, dispatch};
};

export {Store, Provider};

export interface IStore {
    state: IReducersState;
    dispatch: React.Dispatch<IAction<any>>;
}