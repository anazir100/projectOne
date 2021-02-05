import { useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Claim } from './claim';
import claimService from './claim.service';
import { ClaimState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeClaim } from '../actions';

interface ClaimDetailProps {
    match: any;
}

export default function ClaimDetailComponent(
    props: ClaimDetailProps
) {
    const claimSelector = (state: ClaimState) => state.claim;
    const claim = useSelector(claimSelector);
    const userContext = useSelector((state: UserState) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        console.log(props.match.params.id);
        claimService.getClaim(props.match.params.id).then((claim)=> {
            console.log(claim);
            dispatch(changeClaim(claim));
        })
    }, [dispatch, props.match.params.id]);

    function handleDelete() {
        claimService.deleteClaim(claim.id).then(() => {
            dispatch(changeClaim(new Claim()))
            history.push('/claims');
        });
    }

    return (
        <div className='col claim card'>
            <div className='card-body'>
                <p className='id'>{props.match.id}</p>
                <p className='name'>{props.match.name}</p>
                <p className='eventType'>{props.match.event_type}</p>
                <p className='claim_date'>{props.match.claim_date}</p>
                <p className='event_start_date'>{props.match.event_start_date}</p>
                <p className='location'>{props.match.location}</p>
                <p className='description'>{props.match.description}</p>
                <p className='cost'>{props.match.cost}</p>
                <p className='coverage'>{props.match.coverage}</p>
                <p className='wrJustification'>{props.match.wrJustification}</p>
                <p className='grade'>{props.match.grade}</p>
                <p className='presentation'>{props.match.presentation}</p>
                {((userContext.role === 'BenCo') || (userContext.role === 'Department Head')|| (userContext.role === 'Supervisor')) && (
                    <>
                        <Link
                            className='btn btn-secondary'
                            to={'/claims/' + claim.id + '/approve'}
                        >
                            Approve Claim
                        </Link>
                        {(userContext.role === 'BenCo') && (
                        <button className='btn btn-danger' onClick={handleDelete}>
                            Delete Claim
                        </button>
                        )}
                    </>
                )}
                {((userContext.role === 'Employee')&&(userContext.name === claim.name)) && (
                    <>
                        <Link
                            className='btn btn-secondary'
                            to={'/claims/' + claim.id + '/update'}
                        >
                            Update Claim
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
