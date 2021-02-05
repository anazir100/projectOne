import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Claim } from './claim';

class ClaimService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dyamo.ts
    }

    async getClaims(): Promise<Claim[]> {
        const params = {
            TableName: 'claims'
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as Claim[];
        }).catch((err) => {
            logger.error(err);
            return [];
        });
    }

    async getClaim(id: number): Promise<Claim | null> {
        const params = {
            TableName: 'claims',
            Key: {
                'id': id
            }
        }
        return await this.doc.get(params).promise().then((data) => {
            return data.Item as Claim;
        }).catch((err) => {
            logger.error(err);
            return null;
        });
    }

    async addClaim(claim: Claim): Promise<boolean> {
        const datayorb = { ...claim };
        const params = {
            // TableName - the name of the table we are sending it to
            TableName: 'claims',
            // Item - the object we are sending
            Item: datayorb,
            ConditionExpression: '#id <> :id',
            ExpressionAttributeNames: {
                '#id': 'id',
            },
            ExpressionAttributeValues: {
                ':id': datayorb.id,
            }
        };

        return await this.doc.put(params).promise().then((result) => {
            logger.info('Successfully created item');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    async updateClaim(claim: Claim): Promise<boolean> {
        console.log(claim);
        const params = {
            TableName: 'claims',
            Key: {
                'id': claim.id
            },
            UpdateExpression: 'set #name=:name, #event_type=:et, #claim_date=:cd, #event_start_date=:esd, #location=:l, #description=:des, #cost=:c, #coverage=:cov, #wrJustification=:justification, #grade=:g, #presentation=:p, #approval=:app, #message=:msg, #totalReimbursement=:tr, #awardedReimbursement=:ar, #availableReimbursement=:avr',
            ExpressionAttributeValues: {
                ':name': claim.name,
                ':et':claim.event_type,
                ':cd': claim.claim_date,
                ':esd':claim.event_start_date,
                ':l': claim.location,
                ':des': claim.description,
                ':c': claim.cost,
                ':cov':claim.coverage,
                ':justification':claim.wrJustification,
                ':g':claim.grade,
                ':p':claim.presentation,
                ':app':claim.approval,
                ':msg':claim.message,
                ':tr':claim.totalReimbursement,
                ':ar':claim.awardedReimbursement,
                ':avr':claim.availableReimbursement,
            },
            ExpressionAttributeNames: {
                '#name': 'name',
                '#event_type':'event_type',
                '#claim_date': 'claim_date',
                '#event_start_date':'event_start_date',
                '#location': 'location',
                '#description': 'description',
                '#cost': 'cost',
                '#coverage': 'coverage',
                '#wrJustification': 'wrJustification',
                '#grade': 'grade',
                '#presentation': 'presentation',
                '#approval':'approval',
                '#message': 'message',
                '#totalReimbursement': 'totalReimbursement',
                '#awardedReimbursement': 'awardedReimbursement',
                '#availableReimbursement': 'availableReimbursement',
            },
            ReturnValues: 'UPDATED_NEW'
        };

        return await this.doc.update(params).promise().then(() => {
            logger.info('Successfully updated claim');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        })
    }
    async deleteClaim(id: number): Promise<Boolean> {
        const params = {
            TableName: 'claims',
            Key: {
                'id': id
            }
        }
        return await this.doc.delete(params).promise().then((data) => {
            logger.info('Successfully deleted claim');
            return true;
        }).catch((err) => {
            logger.error(err);
            return false;
        });
    }
}

const claimService = new ClaimService();
export default claimService;
