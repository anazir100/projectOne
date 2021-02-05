import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './claim.css';
import { Claim } from './claim';

interface ClaimProps {
    data: Claim;
}

function ClaimComponent(props: ClaimProps) {
    const history = useHistory();

    function goToClaim() {
        history.push('/claims/'+props.data.id);
    }

    return (
        <div className='col claim card'>
            <div className='card-body'>
                <p className='id'>Claim Id:  {props.data.id}</p>
                <p className='name'>Name:  {props.data.name}</p>
                <p className='eventType'>Event Type:  {props.data.event_type}</p>
                <p className='claim_date'>Claim Date:  {props.data.claim_date}</p>
                <p className='event_start_date'>Event Date:  {props.data.event_start_date}</p>
                <p className='cost'>Cost:  ${props.data.cost}</p>
                <p className='coverage'>Coverage:  {props.data.coverage}%</p>
                <p className='grade'>Grade:  {props.data.grade}</p>
                <p className='presentation'>Presentation:  {props.data.presentation}</p>
                <p className='approval'>Approval:  {props.data.approval}</p>
                <p className='message'>Msg:  {props.data.message}</p>
                <p className='totalReimbursement'>Total Reimbursement:  ${props.data.totalReimbursement}</p>
                <p className='awardedReimbursement'>Awarded Reimbursement:  ${props.data.awardedReimbursement}</p>
                <p className='availableReimbursement'>Available Reimbursement:  ${props.data.availableReimbursement}</p>
                onClick={goToClaim}
                <Link to={`/claims/${props.data.id}`}>

                    {' '}
                    Approve/Delete  (claim) {' '}
                </Link>
                <br/>
                <Link to={`/claims/${props.data.id}`}>

                    {' '}
                    Update  (claim) {' '}
                </Link>
            </div>
        </div>
    );
}

export default ClaimComponent;

