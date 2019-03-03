'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class DSC26103 extends ZwaveDevice {
	
	onMeshInit() {

		// this.enableDebug();
        // this.printNode();
        
        this.registerCapability('onoff', 'BASIC');

    }
}

module.exports = DSC26103;