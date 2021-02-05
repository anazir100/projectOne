import { SyntheticEvent, useEffect } from 'react';
import './claim.css';
import claimService from './claim.service';
import {withRouter, useHistory} from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { ClaimState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeClaim } from '../actions';
import { Claim } from './claim';


interface Params {
    id: any;      //string
}
// Function Component
function UpdateClaimComponent(props: RouteComponentProps<Params>) {
    const claimSelector = (state: ClaimState) => state.claim;
    const claim = useSelector(claimSelector);
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(props);
        console.log(props.match.params.id);
        claimService.getClaim(Number(props.match.params.id)).then((rest)=> {
            console.log(rest);
            dispatch(changeClaim(rest));
        })
    }, [dispatch, props, (Number(props.match.params.id))]);
    const FIELDS = ['id', 'name', 'event_type', 'claim_date', 'event_start_date', 'cost','grade','presentation','message'];
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.
    function handleFormInput(e: SyntheticEvent) {
        let c: any = { ...claim };
        c[
            (e.target as HTMLInputElement).id     //.name
        ] = (e.target as HTMLInputElement).value ;
        dispatch(changeClaim(c));
    }
    function submitForm() {
        claimService.updateClaim(claim).then(() => {
            dispatch(changeClaim(new Claim()));
            console.log('Updating claim!')
            // call the callback function from the parent component so that it will re-render
            history.push('/claims');
        });
    }
    return (
        <div className='col claim card'>
            {FIELDS.map((fieldName) => {
                return (
                    <div key={'input-field-' + fieldName}>
                        <label>{fieldName}</label>
                            <input
                                type='text'
                                className='form-control'
                                name={fieldName}
                                id={fieldName}
                                value={(claim as any)[fieldName]}
                                onChange={handleFormInput}
                        ></input>
                    </div>
                );
            })}
            <button className='btn btn-primary' onClick={submitForm}>
                Update Claim
            </button>
        </div>
    );
}

export default withRouter(UpdateClaimComponent);
