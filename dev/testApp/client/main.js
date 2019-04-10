import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


//Iron:Router
Router.route('/post', function(){
    this.render('navBar', {
        to: "navBar"
    });
    this.render('post', {
        to: "main"
    });
});
Router.route('/details', function(){
    this.render('navBar', {
        to: "navBar"
    });
    this.render('details', {
        to: "main"
    });
});
Router.route('/user', function(){
    this.render('navBar', {
        to: "navBar"
    });
    this.render('user', {
        to: "main"
    });
});
Router.route('/', function(){
    this.render('navBar', {
        to: "navBar"
    });
    this.render('home', {
        to: "main"
    });
})
Router.route('/merci', function(){
    this.render('navBar', {
        to: "navBar"
    });
    this.render('merci', {
        to: "main"
    });
})
Router.route('/details/:_id', function(){
    this.render('navBar', {
        to: "navBar"
    });
    this.render('detail', {
        to: 'main',
        data: function(){
            return Repas.findOne({_id:this.params._id});
        }
    })
});


//layoutTemplate doit être nommé 'main' mais pas 'navBar'
Router.configure({
	layoutTemplate: 'main'

});


Repas = new Mongo.Collection('repas');

//Méthodes côté client
if(Meteor.isClient) {
	console.log("Essai de la console");
	Meteor.subscribe('theRepas');

//récupération des éléments de la BD pour l'accueil
	Template.home.helpers({
		'repas': function(){
            return Repas.find()
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
    });

    // Template.post.events({
    //     'submit .ajouter-repas': function(event){
    //         //creer les variable qu'on va utiliser du formulaire
    //         var nom, portions, prix, ingredients, lieu, type, image_url, image_alt, description, adresse, estVeg;

    //         nom = event.target.nom.value;
    //         portions = event.target.portions.value;
    //         prix = event.target.prix.value;
    //         ingredients = event.target.ingredients.value;
    //         lieu = event.target.lieu.value;
    //         type = event.target.type.value;
    //         image_url = event.target.image_url.value;
    //         image_alt = event.target.image_alt.value;
    //         description = event.target.description.value;
    //         adresse = event.target.adresse.value;
    //         estVeg = event.target.estVeg.value;

    //         Repas.insert({
    //             nom: nom,
    //             portions: portions,
    //             prix: prix,
    //             ingredients: ingredients,
    //             lieu: lieu,
    //             type: type,
    //             image_url: image_url,
    //             image_alt: image_alt,
    //             description: description,
    //             adresse: adresse,
    //             estVeg: estVeg,
    //             temps: new Date(),
    //         })
    //         window.location.href ='/merci'
    //         return false;
    //     }

    // });
}

//Méthodes côté serveur
if (Meteor.isServer) {

	Meteor.publish('theRepas', function(){
		var currentUserId = this.userId;
		return Repas.find({createdBy: currentUserId})
	  });

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
