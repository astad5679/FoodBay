import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


//Iron:Router
Router.route('/user');
Router.route('/', {
    template: 'home'
});

Router.configure({
	layoutTemplate: 'navBar'
	
});


Repas = new Mongo.Collection('repas');



//Méthodes côté client
if (Meteor.isClient)
{
console.log("Essai de la console");

	Template.home.helpers({
		test()
		{
			return "Test";
		}
		
		
	});
	
	Template.home.events({
		
		
	});
	
}

//Méthodes côté serveur
if (Meteor.isServer)
{

}
