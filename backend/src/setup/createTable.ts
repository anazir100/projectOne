import * as AWS from 'aws-sdk';
import userService from '../user/user.service';
import claimService from '../claim/claim.service';

// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeUsers = {
    TableName: 'users'
}

const removeClaims = {
    TableName: 'claims'
}

const userSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'name',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'users',
    StreamSpecification: {
        StreamEnabled: false
    }
};

const claimSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'id',
            AttributeType: 'N'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'id',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'claims',
    StreamSpecification: {
        StreamEnabled: false
    }
};

ddb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(userSchema, (err, data) => {
            if (err) {
                console.log('Error', err);
            } else {
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateUserTable();
                }, 10000);
            }
        });
    }, 5000);
});

function populateUserTable() {
    userService.addUser({name: 'Bob', password: 'pass',role: 'Employee'}).then(()=>{});
    userService.addUser({name: 'Asad', password: 'pass',role: 'Employee'}).then(()=>{});
    userService.addUser({name: 'Richard', password: 'pass',role: 'BenCo'}).then(()=>{});
    userService.addUser({name: 'Cynthia', password: 'pass',role: 'Supervisor'}).then(()=>{});
    userService.addUser({name: 'Tylor', password: 'pass',role: 'Department Head'}).then(()=>{});
}

ddb.deleteTable(removeClaims, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(claimSchema, (err, data) => {
            if (err) {
                console.log('Error', err);
            } else {
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateClaimTable();
                }, 10000);
            }
        });
    }, 5000);
});

function populateClaimTable() {
    claimService.addClaim({
        id: 1,
        name: 'Asad',
        event_type: 'Certification',
        claim_date:  new Date('January 10, 2021').toLocaleDateString(),
        event_start_date: new Date('January 30, 2021').toLocaleDateString(),
        location: 'New Jersey',
        description:'AWS Certified Developer Associate' ,
        cost : 500,
        coverage: 100,
        wrJustification: 'required for the job',
        grade: 'pending',
        presentation: 'Not Applicable',
        approval: '',
        message:'',
        totalReimbursement: 10000,
        awardedReimbursement: 0,
        availableReimbursement: 0,

    });
    claimService.addClaim({
        id: 2,
        name: 'Bob',
        event_type:'Certification',
        claim_date:  new Date('January 5, 2021').toLocaleDateString() ,
        event_start_date: new Date('January 30, 2021').toLocaleDateString(),
        location: 'New Jersey',
        description:'AWS Certified Engineering System Associate' ,
        cost : 500,
        coverage: 100,
        wrJustification: 'required for the job',
        grade: 'pending',
        presentation: 'Not Applicable',
        approval: '',
        message: '',
        totalReimbursement:10000,
        awardedReimbursement: 0,
        availableReimbursement: 0,
    });
}
