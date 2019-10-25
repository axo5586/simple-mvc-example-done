const mongoose = require('mongoose');

let DogModel = {};

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
    min: 0,
  },
  createdDate: {
    type: Number,
    default: Date.now,
  },

  // createdDate: {
  //     type: Date,
  //     default: Date.now,
  // },
});

DogSchema.statics.sayName = (dog) => {
  console.log(dog.name);
};

DogSchema.statics.addAge = (dog) => {
  const dog1 = dog;
  dog1.age++;
};

DogSchema.statics.findByName = (name, callback) => {
  const search = {
    name,
  };

  return DogModel.findOne(search, callback);
};

DogModel = mongoose.model('Dog', DogSchema);

module.exports.DogModel = DogModel;
module.exports.DogSchema = DogSchema;
