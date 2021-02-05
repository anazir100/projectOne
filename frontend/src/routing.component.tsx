import React from 'react';
import { Route, Link, Redirect, useLocation } from 'react-router-dom';
import AddClaimComponent from './claim/add-claim.component';
import ApproveClaimComponent from './claim/approve-claim.component';
import TableComponent from './claim/table.component';
import LoginComponent from './user/login.component';
import userService from './user/user.service';
import ClaimDetailComponent from './claim/claimdetail.component';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './actions';
import { UserState } from './reducer';
import { User } from './user/user';
import ErrorBoundaryComponent from './error.component';
import AboutComponent from './claim/about.component';
import UpdateClaimComponent from './claim/update-claim.component';

export default function RouterComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const location = useLocation();
    function logout() {
        userService.logout().then(() => {
            dispatch(getUser(new User()));
        });
    }
    return (
        <div>
            <header>
                <h1>TRMS</h1>
                <p className='hero'>Quality Knowledge Growth.</p>
                <nav id='nav'>
                    <ul>
                        {user.role === 'Employee' && (
                            <li>
                                <Link to='/addClaim'>Add Claim</Link>
                            </li>
                        )}    
                        <li>
                            <Link to='/claims'>View Claims</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        <li>
                            {user.name ? (
                                <button className='link' onClick={logout}>
                                    Logout
                                </button>
                            ) : (
                                <Link to='/login'>Login</Link>
                            )}
                        </li>
                    </ul>
                </nav>
                <div id='restForm'></div>
            </header>
            <ErrorBoundaryComponent key={location.pathname}>
            <Route
                exact
                path='/'
                render={() => <Redirect to='/claims'></Redirect>}
            />
            <Route
                path='/addClaim'
                render={() =>
                    user.role !== 'Employee' ? (
                        <Redirect to='/claims' />
                    ) : (
                        <AddClaimComponent />
                    )
                }
            />

            <Route
                exact
                path='/claims/:id'
                component={ClaimDetailComponent}
            />
            <Route exact path='/claims' component={TableComponent} />
            <Route path='/login' component={LoginComponent} />
            <Route
                exact
                path='/claims/:id/approve'
                component={ApproveClaimComponent}
            />
            <Route exact path='/about' component={AboutComponent} />
            <Route 
                exact
                path='/claims/:id/update' 
                component={UpdateClaimComponent} />
            </ErrorBoundaryComponent>
        </div>
    )
}