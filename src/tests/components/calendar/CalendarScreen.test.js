import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';

// jest.mock('../../../actions/events', () => ({
//     eventStartDeleted: jest.fn()
// }))

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
    auth:{
        uid: '123',
        name: 'david',
    },
    ui: {
        openModal: false
    },
    calendar: {
        events: [],
    },
};

let store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarScreen/>
    </Provider>
)

describe('test on CalendarScreen', () => {
    
    test('should ', () => {
        
        expect( wrapper ).toMatchSnapshot();

    })
    

})
