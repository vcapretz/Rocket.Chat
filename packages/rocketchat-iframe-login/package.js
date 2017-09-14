Package.describe({
	name: 'rocketchat:iframe-login',
	summary: '',
	version: '1.0.0'
});

Package.onUse(function(api) {

	// Server libs
	api.use('rocketchat:logger', 'server');

	api.use('kadira:flow-router', 'client');

	api.use('rocketchat:lib');
	api.use('accounts-base');
	api.use('underscore');
	api.use('ecmascript');
	api.use('reactive-var');
	api.use('http');
	api.use('tracker');
	api.use('check');

	api.imply('facebook-oauth');
	api.imply('twitter-oauth');
	api.imply('google-oauth');
	api.imply('oauth');

	// Server files
	api.addFiles('server/rocketchat.js', 'server');
	api.addFiles('server/server.js', 'server');

	// Client files
	api.addFiles('client/client.js', 'client');
});
