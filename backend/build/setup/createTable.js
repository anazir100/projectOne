"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = __importStar(require("aws-sdk"));
var user_service_1 = __importDefault(require("../user/user.service"));
var claim_service_1 = __importDefault(require("../claim/claim.service"));
// Set the region
AWS.config.update({ region: 'us-west-2' });
// Create a DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
var removeUsers = {
    TableName: 'users'
};
var removeClaims = {
    TableName: 'claims'
};
var userSchema = {
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
var claimSchema = {
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
    }
    else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(function () {
        ddb.createTable(userSchema, function (err, data) {
            if (err) {
                console.log('Error', err);
            }
            else {
                console.log('Table Created', data);
                setTimeout(function () {
                    populateUserTable();
                }, 10000);
            }
        });
    }, 5000);
});
function populateUserTable() {
    user_service_1.default.addUser({ name: 'Bob', password: 'pass', role: 'Employee' }).then(function () { });
    user_service_1.default.addUser({ name: 'Asad', password: 'pass', role: 'Employee' }).then(function () { });
    user_service_1.default.addUser({ name: 'Richard', password: 'pass', role: 'BenCo' }).then(function () { });
    user_service_1.default.addUser({ name: 'Cynthia', password: 'pass', role: 'Supervisor' }).then(function () { });
    user_service_1.default.addUser({ name: 'Tylor', password: 'pass', role: 'Department Head' }).then(function () { });
}
ddb.deleteTable(removeClaims, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    }
    else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(function () {
        ddb.createTable(claimSchema, function (err, data) {
            if (err) {
                console.log('Error', err);
            }
            else {
                console.log('Table Created', data);
                setTimeout(function () {
                    populateClaimTable();
                }, 10000);
            }
        });
    }, 5000);
});
function populateClaimTable() {
    claim_service_1.default.addClaim({
        id: 1,
        name: 'Asad',
        event_type: 'Certification',
        claim_date: new Date('January 10, 2021').toLocaleDateString(),
        event_start_date: new Date('January 30, 2021').toLocaleDateString(),
        location: 'New Jersey',
        description: 'AWS Certified Developer Associate',
        cost: 500,
        coverage: 100,
        wrJustification: 'required for the job',
        grade: 'pending',
        presentation: 'Not Applicable',
        approval: '',
        message: '',
        totalReimbursement: 10000,
        awardedReimbursement: 0,
        availableReimbursement: 0,
    });
    claim_service_1.default.addClaim({
        id: 2,
        name: 'Bob',
        event_type: 'Certification',
        claim_date: new Date('January 5, 2021').toLocaleDateString(),
        event_start_date: new Date('January 30, 2021').toLocaleDateString(),
        location: 'New Jersey',
        description: 'AWS Certified Engineering System Associate',
        cost: 500,
        coverage: 100,
        wrJustification: 'required for the job',
        grade: 'pending',
        presentation: 'Not Applicable',
        approval: '',
        message: '',
        totalReimbursement: 10000,
        awardedReimbursement: 0,
        availableReimbursement: 0,
    });
}
