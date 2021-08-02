import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

import { renderHook } from '@testing-library/react-hooks';


Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer( createSerializer({mode: 'deep'}) );