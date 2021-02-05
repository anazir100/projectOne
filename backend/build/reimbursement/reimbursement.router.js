"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var log_1 = __importDefault(require("../log"));
var reimbursement_service_1 = __importDefault(require("./reimbursement.service"));
var router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    reimbursement_service_1.default.getReimbursements().then(function (reimbursements) {
        res.send(JSON.stringify(reimbursements));
    });
});
router.get('/:id', function (req, res, next) {
    reimbursement_service_1.default.getReimbursement(Number(req.params.id)).then(function (rest) {
        res.send(JSON.stringify(rest));
    });
});
router.delete('/:id', function (req, res, next) {
    log_1.default.debug(req.body);
    reimbursement_service_1.default.deleteReimbursement(Number(req.params.id)).then(function (data) {
        log_1.default.debug(data);
        res.sendStatus(200); // Created
    }).catch(function (err) {
        log_1.default.error(err);
        res.sendStatus(500); // Server error, sorry
    });
});
router.post('/', function (req, res, next) {
    log_1.default.debug(req.body);
    reimbursement_service_1.default.addReimbursement(req.body).then(function (data) {
        log_1.default.debug(data);
        res.sendStatus(201); // Created
    }).catch(function (err) {
        log_1.default.error(err);
        res.sendStatus(500); // Server error, sorry
    });
});
router.put('/', function (req, res, next) {
    log_1.default.debug(req.body);
    reimbursement_service_1.default.updateReimbursement(req.body).then(function (data) {
        res.send(data);
    });
});
exports.default = router;
