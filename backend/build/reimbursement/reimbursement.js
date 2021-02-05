"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reimbursement = void 0;
var Reimbursement = /** @class */ (function () {
    function Reimbursement() {
        this.id = 0;
        this.name = '';
        this.date = new Date();
        this.location = '';
        this.description = '';
        this.cost = 0;
        this.gradeFormat = [];
        this.event = [];
        this.wrJustification = '';
        this.erAttachments = '';
        this.msg = '';
    }
    return Reimbursement;
}());
exports.Reimbursement = Reimbursement;
