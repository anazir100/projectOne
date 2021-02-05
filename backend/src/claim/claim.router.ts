import Express from 'express';
import logger from '../log';
import claimService from './claim.service'

const router = Express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    claimService.getClaims().then((claims) => {
        res.send(JSON.stringify(claims));
    });
});

router.get('/:id', function(req, res, next) {
    claimService.getClaim(Number(req.params.id)).then((claim)=>{
        res.send(JSON.stringify(claim));
    });
})

router.delete('/:id', function (req, res, next) {
    logger.debug(req.body);
    claimService.deleteClaim(Number(req.params.id)).then((data)=> {
        logger.debug(data);
        res.sendStatus(200); // Created
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});

router.post('/', (req, res, next) => {
    logger.debug(req.body);
    claimService.addClaim(req.body).then((data)=> {
        logger.debug(data);
        res.sendStatus(201); // Created
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});

router.put('/', (req, res, next) => {
    logger.debug(req.body);
    claimService.updateClaim(req.body).then((data)=> {
        res.send(data);
    })
})

export default router;