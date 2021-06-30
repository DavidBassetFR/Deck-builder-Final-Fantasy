const dataMapper = require('../dataMapper.js');
const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },

  searchPageSpecificbyElement: (req, res) => {
    /* Ici, j'ai estimé pertinent d'aller retoucher le formulaire, afin qu'on puisse récupérer nos 3 éléments query element/niveau/nom au sein d'une même requête
    cela permet d'aller chercher un des éléments avec la même méthode. */
    /* Ne comprennant pas le système des valeurs et de leur direction, j'ai preferé passer cette étape */
   
  const element = req.query;
  element.level = Number(req.query.level);
  if(element.level !== 0 && element.name !== '' && element.element !== 'null') 
  /* Ici, on va regarder si l'utilisateur a spécifié un niveau, un nom & un élément (qui sera un cas très rare, mais qui pourrait techniquement arriver
    Par exemple, on pourrait chercher spécifiquement Phénix de niveau 9 qui est de l'élément feu) */
    {
      dataMapper.searchAllElement(element, (err, results) => {
        if(err) {
          console.error(err);
          return;
        } else {
          res.render('cardList', {
          cards: results.rows,
          title: 'Liste des cartes ayant la propriété'
        })
      }});
  } else if (element.level !== 0 && element.element !== 'null')
  /* Ici, on va rechercher si l'utilisateur a spécifié un niveau & un élément, cela sera très pratique s'il veut une créature, par exemple de niveau 5 d'élément feu */
    {
      dataMapper.searchElementAndLevel(element, (err, results) => {
        if(err) {
          console.error(err);
          return;
        } else {
          res.render('cardList', {
          cards: results.rows,
          title: 'Liste des cartes ayant la propriété'
        })
      }});
    }
    else {
    dataMapper.searchElement(element, (err, results) => {
      /* Ici, c'est le cas où a spécifié qu'un seul élément dans sa requête, dans ce cas là, on va chercher TOUS les éléments qui ont cette demande 
      exemple: je veux tous les personnages de niveau feu */
      if(err) {
        console.error(err);
        return;
      } else {
        res.render('cardList', {
        cards: results.rows,
        title: 'Liste des cartes ayant la propriété'
      })
    }})};
  },
 searchByValue : (req, res) => {
  const element = req.query;
  console.log(element)
  /* Ici, comme je vais utiliser ma variable element.direction pour aller chercher ma colonne dans ma BDD, afin d'effectuer
  la vérification, je choisi au préallable de vérifier que j'executerai ma requête SQL uniquement si element.direction correspond
  à une de mes 4 valeurs */
  if (element.direction === 'value_north' || element.direction === 'value_south'
  || element.direction === 'value_east' || element.direction === 'value_west'){

    dataMapper.searchByValue(element, (err, results) => {
      if(err) {
        console.error(err);
        return; 
      } else {
        res.render('cardList', {
        cards: results.rows,
        title: 'Liste des cartes ayant la propriété'
      })
 }
})} else {
  res.redirect('/', {
    title: 'Mauvaise requête'
})}
 }
  
};

module.exports = searchController;