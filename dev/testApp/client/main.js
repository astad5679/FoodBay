import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Router.route('/user');
Router.route('/', {
    template: 'home'
});
console.log("Essai de la console");

	Template.base.helpers({
		test()
		{
			return "Test";
		}
		
		
	});
	
	Template.base.events({
		
		
	});
	
