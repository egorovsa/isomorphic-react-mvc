export namespace AppStore {
    export const name: string = 'app';

    export interface State {
        server: boolean;
        appLoading: boolean;
    }

    export const initialState: State = {
        server: false,
        appLoading: false
    };
}