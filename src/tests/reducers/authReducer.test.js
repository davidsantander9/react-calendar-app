import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


const initialState = {
    checking: true
}

describe('test on authReducer', () => {
    
    test('should return default state', () => {
        const state = authReducer( initialState, {} );
        expect( state ).toEqual(initialState);
    });

    test('should authenticate the user', () => {

        const action = {
            type: types.authLogin,
            payload: { 
                uid: '123',
                name: 'david'
            }
        }
        const state = authReducer( initialState, action );
        expect( state ).toEqual({
               "checking": false,
               "name": "david",
               "uid": "123",
             });
    });
    

})
