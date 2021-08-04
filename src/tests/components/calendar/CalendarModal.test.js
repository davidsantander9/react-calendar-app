import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import moment from 'moment';
import { CalendarModal } from '../../../components/calendar/CalendarModal';

// jest.mock('../../../actions/events', () => ({
//     eventSetActive: jest.fn(),
//     eventStartLoading: jest.fn(),
// }))

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const now = moment().minutes(0).seconds(0).add(1,'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
    auth:{
        uid: '123',
        name: 'david',
    },
    ui: {
        modalOpen: true
    },
    calendar: {
        events: [],
        activeEvent:{
            title: 'Hello world',
            notes: 'Some notes',
            start: now.toDate(),
            end: nowPlus1.toDate()

        }
    },
};

let store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarModal/>
    </Provider>
)

describe('test on <CalendarModal/>', () => {
    
    test('should show modal', () => {
        expect( wrapper.find('Modal').prop('isOpen') ).toBe(true);
    })
    

});