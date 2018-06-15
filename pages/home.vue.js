var spahome = Vue.component("Home", {
    template: `<div>
    <h3 class="display-3">Welcome to Airports</h3>
    <span class="subheading">Monitor the latest Airport Delays at the largest US airports.</span>
    <hr>

    <v-progress-linear v-if="showProgress" :indeterminate="true"></v-progress-linear>
    <div v-if="arriveDepart.length>0">
        <h3>Arrival/Departure Delays</h3>
        <template v-for="delay in arriveDepart">
            <div class="red--text">
                <v-icon small>alarm</v-icon> {{delay.airport}}
                <b>{{delay.minTime}}</b> to
                <b>{{delay.maxTime}}</b> {{delay.reason}}
            </div>
        </template>
    </div>

    <div v-if="groundDelay.length>0">
        <h3>Ground Delays</h3>
        <template v-for="delay in groundDelay">
            <div class="red--text">
                <v-icon small>alarm</v-icon> {{delay.airport}}
                <b>{{delay.avgTime}}</b>
                {{delay.reason}}
            </div>
        </template>
    </div>

    <div v-if="groundStop.length>0">
        <h3>Ground Stops</h3>
        <template v-for="delay in groundStop">
            <div class="red--text">
                <v-icon small>alarm</v-icon> {{delay.airport}}
                <b>{{delay.endTime}}</b>
                {{delay.reason}}
            </div>
        </template>
    </div>

    <img height="100%" width="100%" src="https://dsx.weather.com/util/image/map/airport_delays_1280x720.jpg"></img>
</div>`,
    props: ["title"],
    $_veeValidate: {
        validator: "new"
    },
    data() {
        return {
            arriveDepart: [],
            groundDelay: [],
            groundStop: [],
            result: null,
            showProgress: false
        };
    },
    created() {
        this.GetDelays();
    },
    methods: {
        GetDelays() {
            let url = "https://cors-proxy.htmldriven.com/?url=https://soa.smext.faa.gov/asws/api/airport/delays";
            this.showProgress = true
            axios
                .get(url)
                .then(result => {
                    data = JSON.parse(result.data.body)
                    this.result = data
                    this.arriveDepart = data.ArriveDepartDelays.arriveDepart
                    this.groundDelay = data.GroundDelays.groundDelay
                    this.groundStop = data.GroundStops.groundStop
                    this.showProgress = false
                    //console.log(result);
                })
                .catch(error => {
                    console.log("error", error);
                    this.showProgress = false
                });
        }
    }
});