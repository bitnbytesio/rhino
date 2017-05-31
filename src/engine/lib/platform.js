export default class platform {

	static boot(app) {

		if (typeof app._providers['xhr'] == 'undefined') {
			throw new Error('XHR Module is required to boot application.');
		}
		

		app._providers['xhr'].get(app._config.templateRoot + app._config.template).then(function (o) {
			
			console.log(o);
		});

	}

}