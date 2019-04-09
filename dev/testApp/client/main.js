import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


//Iron:Router
Router.route('/post');
Router.route('/user');

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
    });
}

//Méthodes côté serveur
if (Meteor.isServer) {

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
