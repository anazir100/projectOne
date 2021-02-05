import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import RestRow from './claim-row';
import { Claim } from './claim';
import ClaimComponent from './claim.component';

test('three claims are rendered', () => {
    const arr: Claim[] = [];
    arr.push(new Claim());
    arr.push(new Claim());
    arr.push(new Claim());

    const wrapper = shallow(<RestRow claims={arr}></RestRow>);
    expect(wrapper.find(ClaimComponent).length).toBe(3);
});

test('two claims are rendered', () => {
    const arr: Claim[] = [];
    arr.push(new Claim());
    arr.push(new Claim());

    const wrapper = shallow(<RestRow claims={arr}></RestRow>);
    expect(wrapper.find(ClaimComponent).length).toBe(2);
});

// mount is more of an integration test. We can check on children
test('one claim is rendered with props', () => {
    const arr: Claim[] = [];
    const claim = new Claim();
    claim.id = 1;
    arr.push(claim);

    const wrapper = mount(<BrowserRouter><RestRow claims={arr}></RestRow></BrowserRouter>);
    expect(wrapper.find('p.id').html()).toBe('<p class="id">Claim Id:  1</p>');
})

