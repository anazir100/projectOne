import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Claim } from './claim';
import RestRow from './claim-row';
import {ClaimState} from '../reducer'
import { thunkGetClaims } from '../thunks';

function groupIntoThrees(claims: Claim[]): Claim[][] {
    let arr: Claim[][] = [];
    for (let i = 0; i < claims.length / 3; i++) {
        arr.push(claims.slice(i * 3, (i + 1) * 3));
    }

    return arr;
}
export default function TableComponent() {
    // Create a constant that is of the type of state.restaurants
    const selectClaim = (state: ClaimState) => state.claims;
    // Retrieve the restaurants array from redux.
    const claims = useSelector(selectClaim);
    // Get access to the dispatcher. Feed the dispatcher Actions for your Reducer.
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetClaims())
    }, [dispatch]);

    return (
        <section className='claims container' id='claims'>
            {groupIntoThrees(claims).map((value, index: number) => {
                return (
                    <RestRow
                        key={'rest-row-' + index}
                        claims={value}
                    ></RestRow>
                );
            })}
        </section>
    );
}
