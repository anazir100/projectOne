import React from 'react';
import { render, screen } from '@testing-library/react';
import * as router from 'react-router-dom';
import ClaimComponent from './claim.component';
import { Claim } from './claim';
import { shallow } from 'enzyme';

test('the name displays correctly', () => {
    const claim = new Claim();
    claim.name = 'test';
    render(<router.BrowserRouter><ClaimComponent data={claim}></ClaimComponent></router.BrowserRouter>);
    const nameElement = screen.getByText(/test/);
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.className).toBe('name');
});


