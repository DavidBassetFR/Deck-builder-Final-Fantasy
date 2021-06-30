const database = require('./database');

const dataMapper = {

  getAllCards: function (callback) {
    const query = {
      text : `SELECT * FROM "card"`
    };
    database.query(query, callback);
  },
  getOneCard:function (name, callback) {
    const query = {
      text : `SELECT * FROM "card" where name = $1 `,
      values : [name]
    };
    database.query(query, callback);
},
  searchElement: function (element, callback) {
  const query = {
    text : `SELECT * FROM "card" where element = $1 or level =$2 or name = $3 `,
    values : [element.element, element.level,element.name ]
  };
  /* Ici il y'a une possibilité de faire une recherche PAR élément PAR nom ou PAR level mais aucun cumulé */

  database.query(query, callback);
  },
  searchAllElement:function (element, callback) {
    /* Ici, on va chercher les éléments qui correspondent SPECIFIQUEMENT à la demande d'élément de level ET de nom */
    const query = {
      text : `SELECT * FROM "card" where element = $1 AND level = $2 AND name = $3 `,
      values : [element.element, element.level, element.name]
    };
    database.query(query, callback);
},
searchElementAndLevel:function (element, callback) {
  /* Ici, on spécifie une recherche pour aller récupérer les infos qui ont un élément et un level correspondant */
  const query = {
    text : `SELECT * FROM "card" where element = $1 AND level = $2`,
    values : [element.element, element.level]
  };
  database.query(query, callback);
},
  getCardByIdname:function (id, callback) {
    /* on va récupérer ici notre info en fonction de l'id donné */
    const query = {
      text : `SELECT * FROM "card" where id = $1 `,
      values : [id]
    };
    database.query(query, callback);
},
searchByValue:function (element, callback) {
  /* Ici, j'utilise le element.direction comme intitulé de colonne. Cela me permet d'aller chercher la valeur "au moins" de la catégorie */
  /* Remarque: le fait que j'ai besoin d'utiliser mon élément.direction comme variable dans ma requête peut-il poser problème ?*/
  
  const query = {
    text : `SELECT * FROM "card" where ${element.direction} >= $1 `,
    values : [element.value]
  };
  database.query(query, callback);},

};
module.exports = dataMapper;