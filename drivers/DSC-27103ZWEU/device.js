'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class DSC27103 extends ZwaveDevice {

	onMeshInit() {

	   //  this.enableDebug();
        //  this.printNode();

         this.registerCapability('dim', 'BASIC');
         this.registerCapability('onoff', 'BASIC');

    }

}

module.exports = DSC27103;