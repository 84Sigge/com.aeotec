'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class ZW095 extends ZwaveDevice {

	onMeshInit() {
		//this.enableDebug();
		//this.printNode();

		this.registerCapability('measure_power', 'METER');

        this.registerCapability('meter_power', 'METER');

        this.registerCapability('measure_voltage', 'METER');

        this.registerCapability('measure_current', 'METER');
    }

}

module.exports = ZW095;