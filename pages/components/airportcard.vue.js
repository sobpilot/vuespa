Vue.component("card-airport", {
    template: `
<div>
    <v-card dark v-bind:color="this.airport.delay==='true' ? 'error' : 'success' ">
        <v-card-text>
            <h4>{{airport.IATA}} {{airport.name}} {{airport.city}} {{airport.state}} 
                {{airport.weather.meta.updated}}</h4>
            <v-spacer></v-spacer>
            <h5>
                {{airport.status.reason}} {{airport.status.minDelay}} 
                {{airport.delay!='true' ? '' : ' to '}} {{airport.status.maxDelay}}
                {{airport.status.type}} {{airport.status.trend}}
            </h5>
            <h5>
                temp: {{airport.weather.temp}}, visibility: {{airport.weather.visibility}}, 
                weather: {{airport.weather.weather}}, wind: {{airport.weather.wind}}
            </h5>
        </v-card-text>
    </v-card>
</div>
  `,
    props: ["airportCode"],
    $_veeValidate: {
        validator: "new"
    },
    data: function () {
        return {
            airport: {
                status: {},
                weather: {
                    meta: {}
                }
            }
        }
    },
    mounted() {
        this.Lookup()
        //console.log('created', this.airportCode)
    },
    methods: {
        Lookup: function () {
            //console.log('lookup', this.airportCode)
            let url =
                "https://services.faa.gov/airport/status/" +
                this.airportCode +
                "?format=application/json";
            axios
                .get(url)
                .then(response => {
                    this.airport = response.data;
                    this.airport.xdate = moment().format();
                    //console.log(this.airport);
                    //db.collection('sch').add(response.data).then(ss => {
                    //console.log('fbResult', ss.id)
                    //})
                    this.loading = false;
                })
                .catch(error => {
                    this.airport = {
                        name: null,
                        status: {
                            reason: ""
                        }
                    };
                    console.log("error", error);
                });
        },
    }
});