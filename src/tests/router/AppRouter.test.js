import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { AppRouter } from '../../router/AppRouter';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );



// store.dispatch = jest.fn();



describe('Test on <AppRouter/>', () => {

    
    
    test('should show wait...', () => {
        
        const initState = {
            auth: {
                checking: true
            }
        };


        const store = mockStore( initState );

        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter/>
            </Provider>
        );
        

        expect( wrapper ).toMatchSnapshot();
    });
    
    test('should show public route', () => {
        
        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };

        const store = mockStore( initState );

        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter/>
            </Provider>
        );
        

        expect( wrapper.find('.login-container').exists() ).toBe(true);
    });

    test('should show private route', () => {
        
        const initState = {
            calendar: {
                events: [],
            },
            ui:{
                modalOpen: false
            },
            auth: {
                checking: false,
                uid: '123',
                name: 'david'
            }
        };

        const store = mockStore( initState );
        
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter/>
            </Provider>
        );
        

        expect( wrapper.find('.calendar-screen').exists() ).toBe(true);
    });

})
