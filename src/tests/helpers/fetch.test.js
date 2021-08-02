import { fetchWithoutToken } from "../../helpers/fetch";

describe('Test on fetch helper', () => {
    
    test('fetchWithoutToken should work', async() => {
        const resp = await fetchWithoutToken('auth', { email: 'david@gmail.com', password: 'abc123' }, 'POST' )

        const body = await resp.json();
        expect( body.ok ).toBe(true);
        // expect( resp instanceof Response ).toBe(true);
    })
    

});