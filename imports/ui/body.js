import { Template } from 'meteor/templating';
import { Calcs } from '../api/calcs.js';

const Parser = require('expr-eval').Parser;

import './body.html';

Template.body.helpers({

	// MongoDB query, most recent first, a maximum of 10 results
	calcs(){
		return Calcs.find({}, { sort: { createdAt: -1}, limit : 10});
	},
});

Template.body.events({
	'click #btn_equals'(event){
		submit(event);	
	},

	'click #btn_one'(event){
		updateDisplay("1");
	},

	'click #btn_two'(event){
		updateDisplay("2");
	},

	'click #btn_three'(event){
		updateDisplay("3");
	},

	'click #btn_four'(event){
		updateDisplay("4");
	},

	'click #btn_five'(event){
		updateDisplay("5");
	},

	'click #btn_six'(event){
		updateDisplay("6");
	},

	'click #btn_seven'(event){
		updateDisplay("7");
	},

	'click #btn_eight'(event){
		updateDisplay("8");
	},

	'click #btn_nine'(event){
		updateDisplay("9");
	},

	'click #btn_zero'(event){
		updateDisplay("0");
	},

	'click #btn_plus'(event){
		updateDisplay(" + ");
	},

	'click #btn_minus'(event){
		updateDisplay(" - ");
	},

	'click #btn_multiply'(event){
		updateDisplay(" * ");
	},

	'click #btn_divide'(event){
		updateDisplay(" / ");
	},

	'click #btn_exp'(event){
		updateDisplay("^");
	},

	'click #btn_period'(event){
		updateDisplay(".");
	},

	'click #btn_clear'(event){
		clear();
	}

});

var clear = function(){
	const display = document.getElementById("display");
	display.innerHTML = "";
};

var updateDisplay = function(item){
	const display = document.getElementById("display");
	display.innerHTML += item;
};

var submit = function(event){
	const display = document.getElementById("display");
	event.preventDefault();
	try {
		
		const ans = Parser.evaluate(display.innerHTML);

		if(ans !== undefined){
			const calc = display.innerHTML + " = " + ans;
	
			Calcs.insert({
					calc,
					createdAt: new Date(),
				});	
				
				display.innerHTML = ans;
			} else {
				display.innerHTML = "undefined";
			}			
		} 
		catch (e)
		{
			console.log(e);
			display.innerHTML = "undefined";
		}
};