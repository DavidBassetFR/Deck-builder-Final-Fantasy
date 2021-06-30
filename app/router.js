const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');


router.get('/', mainController.homePage);
router.get('/search', searchController.searchPage);
router.get('/search/valeur', searchController.searchByValue);
router.get('/search/:search', searchController.searchPageSpecificbyElement);

router.get('/deck', mainController.deckPage);
router.get('/:name', mainController.detailsCard);

router.get('/deck/add/:id', mainController.addToDeck);
router.get('/deck/remove/:id', mainController.removeFromDeck);
module.exports = router;