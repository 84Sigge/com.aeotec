'use strict';

const Homey = require('homey');

class AeotecApp extends Homey.App {
	onInit() {
		this.log(`${Homey.manifest.id} running...`);
		let rainbowAction = new Homey.FlowCardAction('zw098_rainbow')
            .register()
            .registerRunListener((args, state) => {
            	return args.device.rainbowModeHandler(args);
			});
	}
}

module.exports = AeotecApp;
