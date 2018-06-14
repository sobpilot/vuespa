var spahome = Vue.component("Home", {
    template: `<div>
    <v-container fill-height>
        <v-layout align-center>
            <v-flex>
                <h3 class="display-3">Welcome to Airports</h3>
                <span class="subheading">Monitor the latest Airport Delays at the largest US airports.</span>
                <v-divider class="my-3"></v-divider>
            </v-flex>
        </v-layout>
    </v-container>

    <img height="100%" width="100%" src="https://dsx.weather.com/util/image/map/airport_delays_1280x720.jpg"></img>

    <h3>Arrival/Departure Delays</h3>
    <template v-for="delay in arriveDepart">
        <div>
            <v-icon small>alarm</v-icon> {{delay.airport}}
            <b>{{delay.minTime}}</b> to
            <b>{{delay.maxTime}}</b> {{delay.reason}}
        </div>
    </template>

    <h3>Ground Delays</h3>
    <template v-for="delay in groundDelay">
        <div>
            <v-icon small>alarm</v-icon> {{delay.airport}}
            <b>{{delay.avgTime}}</b>
            {{delay.reason}}
        </div>
    </template>

    <h3 v-if="groundStop">Ground Stops</h3>
    <template v-for="delay in groundStop">
        <div>
            <v-icon small>alarm</v-icon> {{delay.airport}}
            <b>{{delay.endTime}}</b>
            {{delay.reason}}
        </div>
    </template>

</div>`,
    props: ["title"],
    $_veeValidate: {
        validator: "new"
    },
    data() {
        return {
            arriveDepart: null,
            groundDelay: null,
            groundStop: null,
            result: null
        };
    },
    created() {
        this.GetDelays();
    },
    methods: {
        GetDelays() {
            let url = "https://cors-proxy.htmldriven.com/?url=https://soa.smext.faa.gov/asws/api/airport/delays";
            axios
                .get(url)
                .then(result => {
                    data = JSON.parse(result.data.body)
                    this.result = data
                    this.arriveDepart = data.ArriveDepartDelays.arriveDepart
                    this.groundDelay = data.GroundDelays.groundDelay
                    this.groundStop = data.GroundStops.groundStop
                    //console.log(result);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }
});