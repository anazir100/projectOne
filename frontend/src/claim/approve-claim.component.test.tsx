import { shallow } from 'enzyme';
import ApproveClaimComponent from './approve-claim.component';

test('expect that div and button are created', () => {
    const wrapper = shallow(<ApproveClaimComponent />);
    expect(wrapper.find('div')).toBeTruthy();
    expect(wrapper.find('button')).toBeTruthy();
});




