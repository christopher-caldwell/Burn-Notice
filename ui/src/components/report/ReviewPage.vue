<template lang='pug'>
	v-container
		UnderlinedHeader(header='Type Of Incident')
		v-row.information-row
			v-col {{ capitalizedIncident }}
		UnderlinedHeader(header='Date Dispatched')
		v-row.information-row
			v-col {{ reportInformation.dateDispatched }}
		UnderlinedHeader(header='Time Dispatched')
		v-row.information-row
			v-col {{ reportInformation.timeDispatched }}
		UnderlinedHeader(header='Date Arrived')
		v-row.information-row
			v-col {{ reportInformation.dateArrived }}
		UnderlinedHeader(header='Time Arrived')
		v-row.information-row
			v-col {{ reportInformation.timeArrived }}
		UnderlinedHeader(header='Exposed to Chemicals')
		v-row.information-row
			v-col {{ mapBoolToText(reportInformation.wasExposedToChemicals) }}
		UnderlinedHeader(header='Exposed to Fire Retardant')
		v-row.information-row
			v-col {{ mapBoolToText(reportInformation.wasExposedToFireRetardant) }}
		UnderlinedHeader(header='Chemical Exposure Notes')
		v-row.information-row
			v-col {{ reportInformation.chemicalExposureNotes }}
		UnderlinedHeader(header='Primary Team Members')
		v-row.information-row
			v-col 
		UnderlinedHeader(header='Primary Team Actions')
		v-row.information-row
			v-col {{ reportInformation.actionsOfPrimaryTeam }}
		UnderlinedHeader(header='Secondary Team Actions')
		v-row.information-row
			v-col {{ reportInformation.actionsOfSecondaryTeam }}
		UnderlinedHeader(header='Secondary Team Members')
		v-row.information-row
			v-col 
		UnderlinedHeader(header='Event Description')
		v-row.information-row.last-row
			v-col {{ reportInformation.descriptionOfEvent }}

</template>

<script>
import { mapBoolToText, capitalize } from '@/utils/'
import UnderlinedHeader from '@/components/util/UnderlinedHeader.vue'
export default {
	name: 'ReviewPage',
	components: {
		UnderlinedHeader
	},
	props: {
		reportInformation: {
			type: Object,
			required: true
		}
	},
	data(){
		return {
			actionsOfPrimaryTeam: null,
			actionsOfSecondaryTeam: null,
			descriptitonOfEvent: null,
		}
	},
	computed: {
		capitalizedIncident(){
			try {
				return capitalize(this.reportInformation.typeOfIncident)
			} catch(err){
				return null
			}
		} 
			
	},
	methods: {
		mapBoolToText,
		capitalize
	}
}
</script>

<style lang='sass' scoped>
	.category-spacer
		margin-top: 10%
	.switch-spacer
		margin-bottom: 4% !important
	.information-row
		margin-bottom: 5%
	.last-row
		padding-bottom: 20vh
</style>