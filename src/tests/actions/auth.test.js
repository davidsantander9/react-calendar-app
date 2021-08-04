
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import Swal from 'sweetalert2';

import { startCheckin, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch'

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};

let store = mockStore( initState );

Storage.prototype.setItem = jest.fn()

let token = '';

jest.mock('sweetalert2', ()=> ({
    fire: jest.fn()
}))


describe('Test on Auth', () => {

    beforeEach( ()=> {
        store = mockStore( initState );
        jest.clearAllMocks();
    });

    test('startLogin should work', async() => {
        
        await store.dispatch( startLogin('david@gmail.com', 'abc123') );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalled()
        token = localStorage.setItem.mock.calls[0][1];

    });

    test('startLogin should work incorrectly', async() => {
        await store.dispatch( startLogin('david@gmail.com', 'abc1123') );

        const actions = store.getActions();

        expect( actions ).toEqual([])

        expect( Swal.fire ).toHaveBeenCalled()
    });


    test('startRegister should work', async() => {

        fetchModule.fetchWithoutToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'david',
                    token: 'ABC'
                }
            }

        }));

        await store.dispatch( startRegister('test@test.com', '123456', 'test') );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'david'
            }
        });

    });

    test('startCheckin should work', async() => {

        fetchModule.fetchWithToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'david',
                    token: 'ABC'
                }
            }

        }));
        
        await store.dispatch( startCheckin() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'david'
            }
        })

    });
    
    
     
    
    
});
