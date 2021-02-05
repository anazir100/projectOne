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
function ApproveClaimComponent(props: RouteComponentProps<Params>) {
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
    const FIELDS = ['id', 'name', 'event_type', 'cost','coverage', 'approval','message','totalReimbursement','awardedReimbursement','availableReimbursement'];
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.
    function handleFormInput(e: SyntheticEvent) {
        let c: any = { ...claim };
        if ((e.target as HTMLInputElement).id === 'cost') {
            c.cost = (e.target as HTMLInputElement).value;
        }else if ((e.target as HTMLInputElement).id === 'coverage') {
            c.coverage = (e.target as HTMLInputElement).value;
        }else if ((e.target as HTMLInputElement).id === 'totalReimbursement') {
            c.totalReimbursement = (e.target as HTMLInputElement).value;
        }            
        c[
            (e.target as HTMLInputElement).id     
        ] = (e.target as HTMLInputElement).value ;

        if ((e.target as HTMLInputElement).value === '1') {
            c.awardedReimbursement = (c.cost * (c.coverage/100)) ;
            c.availableReimbursement =  (c.totalReimbursement - c.awardedReimbursement) ;
        }
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
                                //placeholder='blabla'//{rest.fieldName}
                        ></input>
                    </div>
                );
            })}
            <button className='btn btn-primary' onClick={submitForm}>
                Approve Claim
            </button>
        </div>
    );
}

export default withRouter(ApproveClaimComponent);
