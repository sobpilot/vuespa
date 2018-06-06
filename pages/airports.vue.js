var spaAirports = Vue.component("Airports", {
	template: `<div>
  <h3>Airport Delays</h3>
  <v-card class="mb-2">
	<v-card-media height="400" 
		src="https://dsx.weather.com/util/image/map/airport_delays_1280x720.jpg?v=ap&w=1280&h=720&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0">
    </v-card-media>
    <v-card-text>
      <v-layout row>
        <v-flex xs10>
		  <v-select :items="airportsUS"  v-model="airports"
		   multiple
           label="Airports">
          </v-select>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
<div v-for="airport in airportsSorted" :key="airport">
	  <card-airport :airportCode="airport"></card-airport>
	  <v-divider></v-divider>
  </div>
</div>`,
	props: ["title"],
	$_veeValidate: {
		validator: "new"
	},
	computed: {
		airportsUS: function () {
			var items = []
			this.airportList.forEach(item => {
				if (item.iso == "US" && item.size == "large") {
					items.push(item.iata)
				}
			});
			return items;
		},
		airportsSorted() {
			var as = _.sortBy(this.airports, [function (o) {
				return o;
			}]);
			return as
		}
	},
	data: function () {
		return {
			airportCode: "",
			airports: [],
			airportList: iata
		};
	},
	methods: {
		Lookup() {
			if (this.airportCode) {
				this.airports.push({
					id: this.airportCode
				})
			}
		},
		ClearList() {
			console.log(this.airportCode, this.airportData);
			this.$refs.apts.value = "";
		}
	}
});