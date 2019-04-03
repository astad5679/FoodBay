import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

console.log("Essai de la console");

	Template.base.helpers({
		test()
		{
			return "Test";
		}
		
		
	});
	
	Template.base.events({
		
		
	});