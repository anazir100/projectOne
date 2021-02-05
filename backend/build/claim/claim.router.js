"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var log_1 = __importDefault(require("../log"));
var claim_service_1 = __importDefault(require("./claim.service"));
var router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    claim_service_1.default.getClaims().then(function (claims) {
        res.send(JSON.stringify(claims));
    });
});
router.get('/:id', function (req, res, next) {
    claim_service_1.default.getClaim(Number(req.params.id)).then(function (claim) {
        res.send(JSON.stringify(claim));
    });
});
router.delete('/:id', function (req, res, next) {
    log_1.default.debug(req.body);
    claim_service_1.default.deleteClaim(Number(req.params.id)).then(function (data) {
        log_1.default.debug(data);
        res.sendStatus(200); // Created
    }).catch(function (err) {
        log_1.default.error(err);
        res.sendStatus(500); // Server error, sorry
    });
});
router.post('/', function (req, res, next) {
    log_1.default.debug(req.body);
    claim_service_1.default.addClaim(req.body).then(function (data) {
        log_1.default.debug(data);
        res.sendStatus(201); // Created
    }).catch(function (err) {
        log_1.default.error(err);
        res.sendStatus(500); // Server error, sorry
    });
});
router.put('/', function (req, res, next) {
    log_1.default.debug(req.body);
    claim_service_1.default.updateClaim(req.body).then(function (data) {
        res.send(data);
    });
});
exports.default = router;
