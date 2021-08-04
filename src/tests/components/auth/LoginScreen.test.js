import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn(),
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}))

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};

let store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <LoginScreen/>
    </Provider>
)

describe('test on <LoginScreen/>', () => {

    beforeEach( () => {
        jest.clearAllMocks() 
    })
    
    test('should show correctly', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });

    test('should call login dispatch', () => {
       
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target:{
                name: 'lEmail',
                value: 'david@gmail.com'
            }
        });
        
        wrapper.find('input[name="lPassword"]').simulate('change', {
            target:{
                name: 'lPassword',
                value: 'abc123'
            }
        });


        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startLogin ).toHaveBeenCalledWith('david@gmail.com', 'abc123');

    });


    test('should no register if passwords are diferent', () => {
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target:{
                name: 'rPassword1',
                value: '123456'
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target:{
                name: 'rPassword2',
                value: '123457'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startRegister ).not.toHaveBeenCalled();
        expect( Swal.fire ).toHaveBeenCalled();

    })
    
    
    
})
