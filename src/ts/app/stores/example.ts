export namespace ExampleStore {
    export const name: string = 'example';

    export interface State {
        counter: number;
    }

    export const initialState: State = {
        counter: 0
    };
}