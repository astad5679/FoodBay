import { Meteor } from 'meteor/meteor';

Repas = new Mongo.Collection('repas');

Meteor.startup(() => {
  // code to run on server at startup
});
