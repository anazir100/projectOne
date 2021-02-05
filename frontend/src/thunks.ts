import {AppState} from './reducer';
import {AppAction, getClaims} from './actions';
import {ThunkAction} from 'redux-thunk';
import claimService from './claim/claim.service';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AppAction>;

export const thunkGetClaims = (): AppThunk => async dispatch => {
    const asyncResp = await claimService.getClaims();
    console.log('before thunk dispatch');
    dispatch(getClaims(asyncResp));
}