/**
	Global mixins
*/

const moment = require('moment')
moment.locale('ru');

export default {
	methods: {},
	filters: {
		df: function (val) {
			if (!val) {
				return ''
			}
			var date = new Date(val);
			if (date.toLocaleString) {
				return date.toLocaleString()
			}
			return moment(val).format('MM.DD.YYYY hh:mm');
		}
	},
	components: {},
	computed: {}
}