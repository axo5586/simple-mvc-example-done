// pull in our models. This will automatically load the index.js from that folder
const models = require('../models');

const Cat = models.Cat.CatModel;
const Dog = models.Dog.DogModel;

// default fake data so that we have something to work with until we make a real Cat
const defaultData = {
  name: 'unknown',
  bedsOwned: 0,
};

let lastAdded = new Cat(defaultData);

const hostIndex = (req, res) => {
  res.render('index', {
    title: 'Home',
    pageName: 'Home Page',
    currentName: lastAdded.name,
  })
};

const readAllCats = (req, res, callback) => {
  Cat.find(callback);
};

const readCat = (req, res) => {
  const name1 = req.query.name;

  const callback = (err, doc) => {
    if(err){
      return res.json({err});
    }
    
    res.json(doc);
  }

  Cat.findByName(name1, callback);
};

const readAllDogs = (req, res, callback) => {
  Dog.find(callback);
};

const readDog = (req, res) => {
  const name1 = req.query.name;

  const callback = (err, doc) => {
    if (err) {
      return res.json({ err });
    }

    res.json(doc);
  }

  Dog.findByName(name1, callback);
};

//reading in DB -- GET
const hostPage1 = (req, res) => {
  const callback = (err, doc) => {
    if(err){
      return res.json({err});
    }

    return res.render('page1',
                      {title: 'Cats',
                       cats: doc,
                      })
  };

  readAllCats(req, res, callback);

};

//writing in DB -- POST
const hostPage2 = (req, res) => {
  res.render('page2');
};

const hostPage3 = (req, res) => {
  res.render('page3');
};

const hostPage4 = (req, res) => {
  const callback = (err, doc) => {
    if(err){
      return res.json({err});
    }

    return res.render('page4',
                      {title: 'Dogs',
                       dogs: doc,
                      })
  };

  readAllDogs(req, res, callback);
};

const getName = (req, res) => {

};

const setName = (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.beds) {
    return res.status(400).json({ error: 'firstname, lastname and beds are all required' });
  }

  const name = `${req.body.firstname} ${req.body.lastname}`;

  const catData = {
    name, 
    bedsOwned: req.body.beds,
  };

  const newCat = new Cat(catData);

  //save to database
  const savePromise = newCat.save();
  //after,
  savePromise.then(() => {
    lastAdded = newCat;

    res.json({
      name: lastAdded.name,
      beds: lastAdded.bedsOwned,
    })
  })

  savePromise.catch((err) => res.json({err}));
  
};

const setDogName = (req, res) => {
  if (!req.body.name || !req.body.breed || !req.body.age) {
    return res.status(400).json({ error: 'name, breed and age are all required' });
  }

  const dogData = {
    name: req.body.name, 
    breed: req.body.breed,
    age: req.body.age
  };

  const newDog = new Dog(dogData);

  //save to database
  const savePromise = newDog.save();

  //after,
  savePromise.then(() => {
    lastAdded = newDog;

    res.json({
      name: lastAdded.name,
      breed: lastAdded.breed,
      age: lastAdded.age
    })
  })

  savePromise.catch((err) => res.json({err}));
};

const searchName = (req, res) => {
  if (!req.query.name) {
    return res.json({ error: 'Name is required to perform a search' });
  }

  return Cat.findByName(req.query.name, (err, doc) => {
     if(err)
     {
       return res.json({err});
     }

     if(!doc)
     {
       return res.json({error: 'No cats found!'});
     }

     return res.json({
       name: doc.name,
       bed: doc.bedsOwned,
     });
  });
};

const searchDogName = (req, res) => {
  if (!req.query.name) {
    return res.json({ error: 'Name is required to perform a search' });
  }

  return Dog.findByName(req.query.name, (err, doc) => {
     if(err)
     {
       return res.json({err});
     }

     if(!doc)
     {
       return res.json({error: 'No dogs found!'});
     }

     Dog.addAge;

     return res.json({
       name: doc.name,
       breed: doc.breed,
       age: doc.age
     });
  });
};

const updateLast = (req, res) => {
  lastAdded.bedsOwned;

  const savePromise = lastAdded.save();
  savePromise.then(() => {
    res.json({
      name: lastAdded.name,
      beds: lastAdded.bedsOwned,
      })
  });

  savePromise.catch((err) => res.json({err}));
};

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  page3: hostPage3,
  page4: hostPage4,
  readCat,
  readDog,
  getName,
  setName,
  setDogName,
  updateLast,
  searchDogName,
  searchName,
  notFound,
};
