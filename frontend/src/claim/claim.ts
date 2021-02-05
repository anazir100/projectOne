export class Claim {
    id: number = 0;
    name: string = '';
    event_type: string = '';
    claim_date: any;
    event_start_date: any;
    location: string = '';
    description: string = '';
    cost: number = 0;
    coverage: number = 0;
    wrJustification: string = '';
    grade: string = '';
    presentation: string = '';
    approval: string = '';
    message: string = '';
    totalReimbursement: number = 10000;
    awardedReimbursement: number = 0;
    availableReimbursement: number = 0;
    constructor(){}
}
