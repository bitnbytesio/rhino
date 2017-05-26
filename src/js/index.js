import {application} from 'rhino';

import {usersCtrl} from 'controllers/user';

import {modules} from 'modules';

import request from './xhr/index';

let app = new application({
		selector: 'root',
		templateRoot: 'templates/',
		template: 'app.html',
		controller: 'AppCtrl',
		rootModule: 'dashboard',
		viewSelector: 'content'
	});


app.controllers([usersCtrl]);

app.modules(modules);

 document.addEventListener('DOMContentLoaded', function() {
  	app.boot();   
  });

