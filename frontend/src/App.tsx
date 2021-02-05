import React, { useState, useEffect } from 'react';
import './App.css';
import ClaimClassComponent from './claim/claimclass.component';
import RouterComponent from './routing.component';
import userService from './user/user.service';
import { useDispatch } from 'react-redux';
import { getUser } from './actions';
import { BrowserRouter } from 'react-router-dom';

function App() {
    /* useState: A hook that can create a variable and a 
      setter to add to the state of the application and modify
      that state to trigger a render.*/
    const [cond, setCond] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        userService.getLogin().then((user) => {
            console.log(user);
            dispatch(getUser(user));
        });
    }, [dispatch]);

    return (
            <div className='container'>
                {/* {'user'+user?.name} */}
                
                <BrowserRouter>
                    <RouterComponent></RouterComponent>
                </BrowserRouter>
                {cond ? (
                    <ClaimClassComponent
                        which={1}
                    ></ClaimClassComponent>
                ) : (
                    ''
                )}
            </div>
    );
}

export default App;



