import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";

describe('Test on fetch helper', () => {
    
    let token = ''

    test('fetchWithoutToken should work', async() => {
        const resp = await fetchWithoutToken('auth', { email: 'david@gmail.com', password: 'abc123' }, 'POST' )

        expect( resp instanceof Response ).toBe(true);
        
        const body = await resp.json();
        expect( body.ok ).toBe(true);

        token = body.token;

    });

    test('fetchWithToken should work', async() => {


        localStorage.setItem('token', token);
        
        const resp = await fetchWithToken('events/', {}, 'GET' )
        const body = await resp.json();
        expect( body.msg ).toBe('get events');

    });
    

});