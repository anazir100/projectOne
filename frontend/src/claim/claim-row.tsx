import React from 'react';
import ClaimComponent from './claim.component';
import { Claim } from './claim';

type PropType = { claims: Claim[]};

function RestRow(props: PropType) {
    //console.log(props);
    return (
        <section className="row border">
            {props.claims.map((claim: Claim, index: number) => 
                <ClaimComponent key = {'claim-'+index} data = {claim}></ClaimComponent>)}
        </section>
    );
}
  
  export default RestRow;