const { request } = require('express');
const dataMapper = require('../dataMapper.js');

const mainController = {
  homePage: (req, res) => {
    dataMapper.getAllCards( (err, results) => {
      if(err) {
        console.error(err);
        return;
      } 
      res.render('cardList', {
        cards: results.rows,
        title: 'Liste des cartes'
      })
    });
  },
/* Notre function détail card va permettre de récupérer l'info en fonction du :name puis renvoyer une view */
  detailsCard: (req, res) => {
    /* Ici on renvoit la carte sélectionné avec toutes les infos nécessaires */
    /* ps: je prendrais pas le temps de faire du css*/ 
    const name = req.params.name
    dataMapper.getOneCard(name, (err, results) => {
      if(err) {
        console.error(err);
        return;
      } else {
       
      res.render('onecard', {
        
        card: results.rows[0]
      })
    }});
},
deckPage: (req, res) => {
  /* propriété de base, il faudra bien penser à faire en sorte de vérifier l'existance de ListFav lors de la view */
  let listFav = req.session.decklist
    res.render('deck', {
      listFav, 
      title: 'Liste des cartes de votre deck'
    })
  },



  addToDeck: (req, res) => {
    const idVoulu = Number(req.params.id);

    if (req?.session?.decklist !== undefined) {
      /* Ici je vais regarder s'il existe déjà la clé decklist, si elle est différente de undefined, en bref, si elle existe déjà 
      alors, ici je pourrais envisager de push dans mon tableau un nouvel élément*/

      const search = req?.session?.decklist.find(o => o.id === idVoulu)
      /* ici, cas très intéressant, on veux regarder si le personnage qu'on souhaite ajouter est déjà dans notre deck, s'il est déjà présent, on ne le rajoute pas
      sinon, on l'ajoute sans pb 
      EN bref, pour l'ajouter, il faudra que search nous renvoit undefined, ça voudra dire qu'il ne l'a pas trouvé, donc qu'on peut l'ajouter
      */

      if (search !== undefined || req.session.decklist.length === 5)
      /* on va également dire que s'il y'a déjà 5 cartes dans notre deck, on n'en ajoutera pas plus */
       {
        res.redirect('/deck')
      } 
      
      else {
        /* ici c'est le cas où on ajoute */
        dataMapper.getCardByIdname(idVoulu, (err, results) => {
          if (err) {
            console.error(err);
          } else {
            let aPush = results.rows[0];
            req.session.decklist.push(aPush)
            res.redirect('/deck')
          }
        })
      }
    } else {
      /* ici c'est le cas ou la clé decklist n'existe pas encore, donc, on va la créer et ajouter notre personnage à notre deck.
      En effet, ici ne rentre pas en compte les doublons etc, puisque la decklist ne serait pas déjà défini */
      req.session.decklist = [];
      dataMapper.getCardByIdname(idVoulu, (err, results) => {
        if (err) {
          console.error(err);
        } else {
          let aPush = results.rows[0];
          req.session.decklist.push(aPush)
          res.redirect('/deck')
        }
      })
    }
    },
    removeFromDeck: (req, res) => {
      /* on va utiliser la propriété filter, afin de récupérer TOUS les éléments qui ne sont pas celui sélectionner.
      Cela nous permettra de récupérer un nouveau tableau sans le personnage que l'on souhaite supprimer, on mettra donc à jour
      notre decklist */
      req.session.decklist = req.session.decklist.filter(o => o.id !== Number(req.params.id))
        res.redirect('/deck')
        }
      
    };
module.exports = mainController;