import {Claim} from './claim/claim';
import {User} from './user/user';

export enum ClaimActions {
    GetClaims = 'GET_CLAIMS',
    ChangeClaim = 'CHANGE_CLAIM'
}

export enum UserActions {
    GetUser = 'GET_USER',
    LoginChange = 'CHANGE_LOGIN'
}

export interface AppAction {
    type: string;
    payload: any;
}

export interface UserAction extends AppAction {
    type: UserActions;
    payload: User;
}

// All of our restaurant actions need to follow this interface.
export interface ClaimAction extends AppAction {
    type: ClaimActions;
    payload: Claim | Claim[];
}

export function getClaims(claims: Claim[]): ClaimAction {
    const action: ClaimAction = {
        type: ClaimActions.GetClaims,
        payload: claims
    }
    return action;
}

export function changeClaim(claim: Claim): ClaimAction {
    const action: ClaimAction = {
        type: ClaimActions.ChangeClaim,
        payload: claim
    }
    return action;
}

export function getUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.GetUser,
        payload: user
    }
    return action;
}

export function loginAction(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.LoginChange,
        payload: user
    }
    return action;
}