var spaAirports = Vue.component("Airports", {
  template: `<div>
  <h3>Airport Delays</h3>
  <v-card class="mb-2">
    <v-card-media height="400" src="https://dsx.weather.com/util/image/map/airport_delays_1280x720.jpg?v=ap&w=1280&h=720&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0">
    </v-card-media>
    <v-card-text>
      <v-layout row>
        <v-flex xs12>
          <v-select ref="apts" :items="airportsUS" v-on:input="Lookup" v-model="airportCode" autocomplete item-text="longname" item-value="iata"
           clearable label="Airports">
          </v-select>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
  <card-airport :airport="airportData"></card-airport>
</div>`,
  props: ["title"],
  $_veeValidate: {
    validator: "new"
  },
  computed: {
    airportsUS: function() {
      var items = this.airportList.filter(function(item) {
        item.longname = item.iata + " - " + item.name;
        return item.iso == "US" && item.size == "large";
      });
      return items;
    }
  },
  data: function() {
    return {
      airportCode: "",
      airportData: {
        name: null,
        status: {
          reason: ""
        }
      },
      airportList: iata
    };
  },
  methods: {
    Lookup: function() {
      let self = this;
      let url =
        "https://services.faa.gov/airport/status/" +
        this.airportCode +
        "?format=application/json";
      axios
        .get(url)
        .then(function(response) {
          self.airportData = response.data;
          //console.log(response);
          self.loading = false;
        })
        .catch(function(error) {
          self.airportData = {
            name: null,
            status: {
              reason: ""
            }
          };
          console.log("error", error);
        });
    },
    ClearList() {
      console.log(this.airportCode, this.airportData);
      this.$refs.apts.value = "";
    }
  }
});
