'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class ZW112 extends ZwaveDevice {

	onMeshInit() {
		this.registerCapability('alarm_contact', 'BASIC');
		this.registerCapability('measure_batttery', 'BATTERY');
	}
	// TODO: add battery type (INTERNAL) to driver.compose
}

module.exports = ZW112;
