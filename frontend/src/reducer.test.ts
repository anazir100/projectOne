import reducer, {AppState} from './reducer';
import { Claim } from './claim/claim';
import { User } from './user/user';
import {ClaimActions} from './actions';
test('reducer clears claim after changeClaim action', ()=> {
    const initialClaims: Claim[] = [];
    const initialClaim = new Claim();
    initialClaim.name = 'test';
    const initialUser = new User();
    const initialState: AppState = {
        claims: initialClaims,
        claim: initialClaim,
        user: initialUser,
        loginUser: initialUser
    };
    const newClaim = new Claim();
    const action = {
        type: ClaimActions.ChangeClaim,
        payload: newClaim
    }
    // if the action is invalid, the new state is the old state
    let newState = reducer(initialState, {type: '', payload: null});
    expect(newState).toBe(initialState);
    // new restaurant needs to be in the state returned.
    newState = reducer(initialState, action);
    expect(newState.claim).toBe(newClaim);
    // make sure the rest of the state is unchanged
    expect(newState.claims).toBe(initialClaims);
    expect(newState.user).toBe(initialUser);
})

