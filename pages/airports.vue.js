var spaAirports = Vue.component("Airports", {
	template: `<div>
  <v-layout row wrap>
    <v-flex xs12 sm4>
      <h3>Airport Delays</h3>
    </v-flex>
    <v-flex xs6 sm4>
      <v-switch label="Map" v-model="showMap"></v-switch>
    </v-flex>
    <v-flex xs6 sm4>
      <v-switch label="Airports" v-model="showSelect"></v-switch>
    </v-flex>
  </v-layout>

  <div v-if="showMap">
    <div class="text-xs-center">
      <img height="70%" width="70%" src="https://dsx.weather.com/util/image/map/airport_delays_1280x720.jpg"></img>
    </div>
  </div>

  <div v-if="showSelect">
    <div class="px-4">
      <p class="red--text" v-if="!GetUser()">
        Login to Save Selections!
      </p>
      <v-layout row>
        <v-flex xs12>
          <v-select :items="airportsUS" v-on:input="Change" v-model="airports" item-text="iata" item-value="iata" multiple chips autocomplete
            label="Airports">
            <template slot="selection" slot-scope="data">
              <v-chip :selected="data.iata" :key="JSON.stringify(data.item)" close class="chip--select-multi" @input="data.parent.selectItem(data.item)">
                {{ data.item.iata }}
              </v-chip>
            </template>
            <template slot="item" slot-scope="data">
              {{ data.item.iata }} {{ data.item.name }}
            </template>
          </v-select>
        </v-flex>
      </v-layout>
    </div>
  </div>
  <!-- <v-progress-circular v-if="wait" :width="3" indeterminate color="red"></v-progress-circular> -->
  <div v-for="airport in airportsSorted" :key="airport">
    <card-airport :airportCode="airport"></card-airport>
    <v-divider></v-divider>
  </div>
</div>`,
	props: ["title"],
	$_veeValidate: {
		validator: "new"
	},
	created() {
		this.wait = true
		let user = fbAuth.currentUser
		if (user) {
			fbUserAirports.doc(user.uid).get().then(doc => {
				//console.log(doc.data())
				let apts = _.toArray(doc.data())
				this.airports = apts
				this.wait = false
			})

			//console.log('mounted', user, apts)
		}

	},
	watch: {
		showMap() {
			localStorage.setItem("showMap", this.showMap.toString());
		},
		showSelect() {
			localStorage.setItem("showSelect", this.showSelect.toString());
		}
	},
	computed: {
		airportsUS: function () {
			var items = []
			this.airportList.forEach(item => {
				if (item.iso == "US" && item.size == "large") {
					items.push({
						iata: item.iata,
						name: item.name
					})
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
			airportList: iata,
			wait: false,
			showMap: localStorage.getItem("showMap") == "false" ? false : true,
			showSelect: localStorage.getItem("showSelect") == "false" ? false : true,
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
			//console.log(this.airportCode, this.airportData);
			this.$refs.apts.value = "";
		},
		Change() {
			//console.log('change', this.airports)
			let user = fbAuth.currentUser
			if (user) {
				let obj = _.toPlainObject(this.airports);
				fbUserAirports.doc(user.uid).set(obj)
				//console.log(obj)
			}
		},
		GetUser() {
			let user = fbAuth.currentUser
			return user
		}
	}
});