import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn(),
}))

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

    });
    
    test('test with iteractions calendar', () => {
        
        const calendar = wrapper.find('Calendar');

        const calendarMessages = calendar.prop('messages');

        expect( calendarMessages ).toEqual( messages );

        calendar.prop('onDoubleClickEvent')();

        expect( store.dispatch ).toHaveBeenCalledWith( { type: types.uiOpenModal });

        calendar.prop('onSelectEvent')({ start: 'Hello'});

        expect( eventSetActive ).toHaveBeenCalledWith({ start: 'Hello'} );

    });
    

})
