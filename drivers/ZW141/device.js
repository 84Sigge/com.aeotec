'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class ZW141 extends ZwaveDevice {

	onMeshInit() {
		this.registerCapability('windowcoverings_state', 'SWITCH_BINARY');
	}

}

module.exports = ZW141;
