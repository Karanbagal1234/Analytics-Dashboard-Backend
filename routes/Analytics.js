import express from 'express';
import Wrapper from '../_helpers/asyncWrapper.js';
import cardController from '../controller/Cards.controller.js';
import traficOverview from '../controller/TraficOverview.chart.js';

const router = express.Router();

router.get('/CardsData', Wrapper(cardController));
router.get("/traficOverview",Wrapper(traficOverview))

export default router;
