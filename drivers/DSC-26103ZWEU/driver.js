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
	settings: {
		Notification: {
			index: 80,
			size: 1,
			Value: 1,
		}
	}
}
);
