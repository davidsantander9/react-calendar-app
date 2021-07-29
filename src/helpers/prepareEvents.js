import moment from 'moment';

export const  preapareEvents = ( events = [] ) => {
    return events.map( 
        ( ev ) => ({
            ...ev,
            end: moment( ev.end ).toDate(),
            start: moment( ev.start ).toDate(),
        })
    )
}