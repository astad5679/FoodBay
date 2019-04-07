import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


//Iron:Router
Router.route('/post');
Router.route('/user');
Router.route('/', {
	template: 'home'
});

Router.configure({
	layoutTemplate: 'navBar'

});

Repas = new Mongo.Collection('repas');

//Méthodes côté client
if (Meteor.isClient) {
	console.log("Essai de la console");

	Template.home.helpers({
		test() {
			return "Test";
		}


	});

	Template.home.events({


	});

	Template.post.events({
		'submit form': function (event) {
			event.preventDefault();
			var platNom = event.target.plat.value;
			var platPortions = event.target.portions.value;
			var platIngredients =  event.target.ingredients.value;
			var platCout = event.target.cost.value;
			var platImage = event.target.image.value;

			Meteor.call('insertRepas', (platNom, platPortions, platIngredients, platCout, platImage));
			console.log("Nouveau repas");
		},
	})
}

//Méthodes côté serveur
if (Meteor.isServer) {

	console.log("hey");

	Meteor.methods({
		// Methode qui crée une entrée repas a chaque fois que le bouton "Submit" est cliqué sur la page "Post"
		'insertRepas': function(platNom, platPortions, platIngredients, platCout, platImage) {
			var currentUserId = Meteor.userId();
			Repas.insert({
				nom: platNom,
				portions: platPortions,
				ingredients: platIngredients,
				cout: platCout,
				image: platImage,
				createdBy: currentUserId
			});
		}
	});
}
