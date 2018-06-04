Vue.component("card-airport", {
  template: `
<div v-if="airport.name!=null">
    <v-card dark v-bind:color="this.airport.delay==='true' ? 'error' : 'success' ">
        <v-card-text>
            <h4>{{airport.IATA}} {{airport.name}} {{airport.city}} {{airport.state}} {{airport.weather.meta.updated}}</h4>
            <v-spacer></v-spacer>
            <h5>
                {{airport.status.reason}} {{airport.status.minDelay}} {{airport.delay!='true' ? '' : ' to '}} {{airport.status.maxDelay}}
                {{airport.status.type}} {{airport.status.trend}}
            </h5>
            <h5>
                temp: {{airport.weather.temp}}, visibility: {{airport.weather.visibility}}, weather: {{airport.weather.weather}}, wind: {{airport.weather.wind}}
            </h5>
        </v-card-text>
    </v-card>
</div>
  `,
  props: ["airport"],
  $_veeValidate: {
    validator: "new"
  },
  methods: {}
});
