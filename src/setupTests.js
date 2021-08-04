import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';

// import { renderHook } from '@testing-library/react-hooks';


Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer( 
createSerializer({mode: 'deep'}) );

HTMLCanvasElement.prototype.getContext = () => {};