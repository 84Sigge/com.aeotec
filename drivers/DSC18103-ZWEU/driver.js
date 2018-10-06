'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// Documentation: https://aeotec.freshdesk.com/support/solutions/articles/6000088076-gen1-2

module.exports = new ZwaveDriver(path.basename(__dirname), {
		capabilities: {
		onoff: {
			command_class : 'COMMAND_CLASS_SWITCH_MULTILEVEL',
			command_get : 'SWITCH_MULTILEVEL_GET',
			command_set : 'SWITCH_MULTILEVEL_SET',
			command_set_parser : value => ({
					'Value' : (value >0) ? 'on/enable' : 'off/disable',
					'Dimming Duration' : 'Factory default',
			}),
			command_report : 'SWITCH_MULTILEVEL_REPORT',
			command_report_parser: report => {
				if (report.Value === 'on/enable') return true;
				else if (report.Value === 'off/disable') return false;
				else if (typeof report.Value === 'number') return report.Value > 0;
				else if (typeof report['Value (Raw)'] !== 'undefined') return report['Value (Raw)'][0] > 0;
				return null;
			},
		},
	},
	measure_power: {
		command_class: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
		command_get: 'SENSOR_MULTILEVEL_GET',
		command_report: 'SENSOR_MULTILEVEL_REPORT',
		command_report_parser: report => {
			if (report['Sensor Type'] !== 'Power (version 2)') return null;
			return report['Sensor Value (Parsed)'];
		},
	},
	meter_power: {
		command_class: 'COMMAND_CLASS_METER',
		command_get: 'METER_GET',
		command_get_parser: () => ({
			Properties1: {
				Scale: 0,
			},
		}),
		command_report: 'METER_REPORT',
		command_report_parser: report => {
			if (report.hasOwnProperty('Properties2') &&
				report.Properties2.hasOwnProperty('Scale bits 10') &&
				report.Properties2['Scale bits 10'] === 0) {
				return report['Meter Value (Parsed)'];
			}
			return null;
		},
	},
	settings: {
		Notification: {
			index: 80,
			size: 1,
			Value: 1,
		}
	}
}
);
