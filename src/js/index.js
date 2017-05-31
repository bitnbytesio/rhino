import {application, platform, request} from 'rhino';

import {usersCtrl} from 'controllers/user';

import {modules} from 'modules';

//import {xhr} from 'request';

let app = new application({
    selector: 'root',
    templateRoot: 'templates/',
    template: 'app.html',
    controller: 'AppCtrl',
    rootModule: 'dashboard',
    viewSelector: 'content'
});

app.providers([
	{provides:'xhr', using:request, deps:[]}
	]);

app.controllers([usersCtrl]);

app.modules(modules);

document.addEventListener('DOMContentLoaded', function () {
    platform.boot(app);
});

