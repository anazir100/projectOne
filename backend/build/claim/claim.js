"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Claim = void 0;
var Claim = /** @class */ (function () {
    function Claim() {
        this.id = 0;
        this.name = '';
        this.event_type = '';
        this.location = '';
        this.description = '';
        this.cost = 0;
        this.coverage = 0;
        this.wrJustification = '';
        this.grade = '';
        this.presentation = '';
        this.approval = '';
        this.message = '';
        this.totalReimbursement = 10000;
        this.awardedReimbursement = 0;
        this.availableReimbursement = 0;
    }
    return Claim;
}());
exports.Claim = Claim;
