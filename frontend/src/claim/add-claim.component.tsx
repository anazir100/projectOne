import { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { ClaimState } from '../reducer';
import './claim.css';
import claimService from './claim.service';
import { changeClaim } from '../actions';
import { Claim } from './claim';
import userService from '../user/user.service';


// This is the prop I want to connect from redux
const claimProp = (state: ClaimState) => ({claim: state.claim});
// This is the dispatcher I want to use from redux
const mapDispatch = {
    updateClaim: (claim: Claim) => changeClaim(claim),
};
// Put them in the connector
const connector = connect(claimProp, mapDispatch);

// Function Component
// get the types of the props we created above so we can tell our component about them.
type PropsFromRedux = ConnectedProps<typeof connector>;

function AddClaimComponent(props: PropsFromRedux) {
    const FIELDS = ['id', 'name', 'event_type', 'claim_date', 'event_start_date', 'location', 'description', 'cost', 'coverage', 'wrJustification', 'grade', 'presentation'];
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.
    function handleFormInput(e: SyntheticEvent) {
        let c: any = { ...props.claim };
            c[
                (e.target as HTMLInputElement).id
             
            ] = Number((e.target as HTMLInputElement).value) || (e.target as HTMLInputElement).value;
        props.updateClaim(c);
        // this.setState({username: event.target.value});
    }
    function submitForm() {
        claimService.addClaim(props.claim).then(() => {      //props.claim
            props.updateClaim(new Claim());
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
                                type = 'text'
                                className='form-control'
                                name={fieldName}
                                id={fieldName}
                                value={(props.claim as any)[fieldName]}
                                onChange={handleFormInput}
                                ></input>
                        </div>
                    );
                })}
                <button className='btn btn-primary' onClick={submitForm}>
                    Add Claim
                </button>
            </div>
    );
}

//connect my prop and dispatcher to my component
export default connector(AddClaimComponent);
