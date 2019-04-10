import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


//Iron:Router
Router.route('/post', function () {
	this.render('navBar', {
		to: "navBar"
	});
	this.render('post', {
		to: "main"
	});
});
Router.route('/login', function () {
	this.render('navBar', {
		to: "navBar"
	});
	this.render('login', {
		to: "main"
	});
});
Router.route('/details', function () {
	this.render('navBar', {
		to: "navBar"
	});
	this.render('details', {
		to: "main"
	});
});
Router.route('/user', function () {
	this.render('navBar', {
		to: "navBar"
	});
	this.render('user', {
		to: "main"
	});
});
Router.route('/', function () {
	this.render('navBar', {
		to: "navBar"
	});
	this.render('home', {
		to: "main"
	});
})
Router.route('/merci', function () {
	this.render('navBar', {
		to: "navBar"
	});
	this.render('merci', {
		to: "main"
	});
})
Router.route('/details/:_id', function () {
	this.render('navBar', {
		to: "navBar"
	});
	this.render('detail', {
		to: 'main',
		data: function () {
			return Repas.findOne({ _id: this.params._id });
		}
	})
});


//layoutTemplate doit être nommé 'main' mais pas 'navBar'
Router.configure({
	layoutTemplate: 'main'

});


Repas = new Mongo.Collection('repas');

//Méthodes côté client
if (Meteor.isClient) {
	Meteor.subscribe('theRepas');

	//récupération des éléments de la BDD pour l'accueil
	Template.home.helpers({
		'repas': function () {
			return Repas.find()
		}
	});

	Template.home.events({
		'click .test': function () {
			console.log("Repas test working");
			// var selectedRepas = Session.get('selectedRepas');
			// Meteor.call('showRepas', selectedRepas);
			window.location.href = '/details';
		}
	});


	Template.login.helpers({



	});


	//Fonctions pour la création d'un compte.
	Template.login.events({
		'submit form': function () {
			event.preventDefault();
			var email = $('[name=email]').val();
			var password = $('[name=password]').val();
			Accounts.createUser({
				email: email,
				password: password
			});
		}
	});

	//Evènements de la page Post
	// Template.post.events({
	// 	'submit form': function (event) {
	// 		event.preventDefault();
	// 		var platNom = event.target.plat.value;
	// 		var platPortions = event.target.portions.value;
	// 		var platIngredients = event.target.ingredients.value;
	// 		var platCout = event.target.cost.value;
	// 		var platImage = event.target.image.value;

	// 		Meteor.call('insertRepas', (platNom, platPortions, platIngredients, platCout, platImage));
	// 		console.log("Nouveau repas");
	// 	},
	// });

	//Events lorsqu'on clique sur Submit.
	Template.post.events({
		'submit form': function (event) {
			event.preventDefault();
			/** 
			 * Le cours utilisait une fonction lancée par le serveur qui changait la base de données générale est pas seulement locale, mais je n'arrive pas à la faire marcher.
			 * J'ai encore laissé le code en bas au cas où on devra l'implémenter, mais pour le moment le code qui n'est pas commenté crée les entrées dans la base de données comme il faut.
			 * 
			 * Meteor.call('newRepas', (nom, portions, ingredients, prix, image_url, image_alt, lieu, type, description, estVeg, adresse));
			*/
			Repas.insert({
				nom: event.target.nom.value,
				portions: event.target.portions.value,
				prix: event.target.prix.value,
				ingredients: event.target.ingredients.value,
				lieu: event.target.lieu.value,
				type: event.target.type.value,
				image: event.target.image_url.value,
				image_alt: event.target.image_alt.value,
				description: event.target.description.value,
				adresse: event.target.adresse.value,
				estVeg: event.target.estVeg.value,
				temps: new Date(),
				currentUserId: Meteor.userId()
			});
			window.location.href = '/merci';
			return false;

		}
	});

	//login account UI

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});
}


//Méthodes côté serveur
if (Meteor.isServer) {

	Meteor.publish('theRepas', function () {
		var currentUserId = this.userId;
		return Repas.find({ createdBy: currentUserId })
	});

	Meteor.methods({
		// (A voir si on va garder) Methode qui crée une entrée repas a chaque fois que le bouton "Submit" est cliqué sur la page "Post" 
		'newRepas': function (platNom, platPortions, platIngredients, platPrix, platImage, platAlt, platLieu, platType, platDescription, platVeg, platAdresse) {
			var currentUserId = Meteor.userId();
			Repas.insert({
				nom: platNom,
				portions: platPortions,
				ingredients: platIngredients,
				prix: platPrix,
				image: platImage,
				image_alt: platAlt,
				lieu: platLieu,
				type: platType,
				description: platDescription,
				estVeg: platVeg,
				adresse: platAdresse,
				temps: new Date(),
				createdBy: currentUserId
			});
		}
	});
}
