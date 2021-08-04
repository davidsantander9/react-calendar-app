import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { AppRouter } from '../../router/AppRouter';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );



let store = mockStore( initState );
// store.dispatch = jest.fn();



describe('Test on <AppRouter/>', () => {

    const initState = {
        auth: {
            checking: true
        }
    };

    
    test('should show wait', () => {
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter/>
            </Provider>
        );
        

        expect( wrapper ).toMatchSnapshot();
    });
    

})
