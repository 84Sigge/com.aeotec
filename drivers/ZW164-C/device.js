'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

const SIREN_TIMEOUT = 10*1000;

class AeotecSirenDeviceSix extends ZwaveDevice {

	onMeshInit() {
		this.currentSiren = 1;
		this.defaultSiren = Number(this.getSetting('default_sound'));

		this.registerCapabilityListener('onoff.siren', (args, opts) => {
			if (this.sirenTimeout) clearTimeout(this.sirenTimeout);
			this.sirenTimeout = setTimeout(() => { this.setCapabilityValue('onoff.siren', false) }, SIREN_TIMEOUT);

			return this.setSiren({
				sirenNumber: this.defaultSiren,
				sirenState: !!args
			});
		});

		this.registerReportListener('NOTIFICATION', 'NOTIFICATION_REPORT', report => {
			if (report.hasOwnProperty('Notification Status')) {
				this.log('Notification report', report['Notification Status']);
				// TODO: try and set the onoff to the status reported
			}
		});

		this.registerSetting('default_sound', (setting) => {
			if (Number(setting) < 9 && Number(setting) > 0) {
				this.defaultSiren = setting;
			}
		});
	}

	async setSiren({sirenNumber =1, sirenState}) {
		this.currentSiren = sirenNumber;
		return await this.node.MultiChannelNodes[`${sirenNumber}`].CommandClass.COMMAND_CLASS_BASIC.BASIC_SET({
			"Value": sirenState
		});
	}

	async resetSiren() {
		this.setCapabilityValue("onoff.siren", false);
		return await this.node.MultiChannelNodes[`${this.currentSiren}`].CommandClass.COMMAND_CLASS_BASIC.BASIC_SET({
			"Value": false
		});
	}
}

module.exports = AeotecSirenDeviceSix;
