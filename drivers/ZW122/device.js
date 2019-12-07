'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

const TAMPER_TIMEOUT = 30*1000;

class ZW122 extends ZwaveDevice {
	
	onMeshInit() {
		this.registerCapability('measure_battery', 'BATTERY');

		this.setCapabilityValue('alarm_tamper', false);
		this.registerCapability('alarm_tamper', 'NOTIFICATION');
		 // This sensor does not send a timeout when the tamper period is over. Use a timeout to reset the capability
		 this.registerReportListener('NOTIFICATION', 'NOTIFICATION_REPORT', report => {
            if (!report || !report.hasOwnProperty('Notification Status') || !report.hasOwnProperty('Notification Type')) return null;

            if (report['Notification Type'] === 'Home Security' && report['Notification Status'] === 'On') {
                this.setCapabilityValue('alarm_tamper', true);
                this.tamperTimeOut = setTimeout(() => {
                    this.setCapabilityValue('alarm_tamper', false);
                }, TAMPER_TIMEOUT);
            }
        });

		this.registerCapability('alarm_water', 'NOTIFICATION');

		this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
	}
	
}

module.exports = ZW122;