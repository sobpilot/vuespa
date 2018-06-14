Vue.component("card-airport", {
    template: `<div>
    <v-card class="mb-1" dark v-bind:color="(airport.delay==='true') ? 'error' : 'success' ">
        <v-card-text>
            <v-layout align-center wrap>
                <v-flex xs1 v-if="wait">
                    <v-progress-circular indeterminate color="red"></v-progress-circular>
                </v-flex>
                <v-flex v-if="airport.name">
                    <h3>{{airport.IATA}} {{airport.name}} {{airport.city}} {{airport.state}} 
                    </h3>
                    <div v-if="airport.wxdelay" v-html="airport.wxdelay"></div>
                    <span v-html="airport.weather.meta.updated"></span>
                    <v-spacer></v-spacer>
                    <h5 v-if="airport.status.reason">
                        {{airport.status.reason}} {{airport.status.minDelay}} {{airport.delay!='true' ? '' : ' to '}} {{airport.status.maxDelay}}
                        {{airport.status.type}} {{airport.status.trend}}
                    </h5>
                    <h5 v-if="airport.weather.temp">
                        temp: {{airport.weather.temp}}, visibility: {{airport.weather.visibility}}, weather: {{airport.weather.weather}}, wind: {{airport.weather.wind}}
                    </h5>
                </v-flex>
                <v-flex v-if="!airport.name">
                    <h4>Loading Airport Delay Information...</h4>
                    <h4>{{airport.status.reason}}</h4>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</div>`,
    props: ["airportCode"],
    $_veeValidate: {
        validator: "new"
    },
    data: function () {
        return {
            wait: false,
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
            this.wait = true
            let xurl = 'https://www.fly.faa.gov/flyfaa/AirportLookup.jsp?q=' + this.airportCode + '&go=1&html'
            let xproxy = 'https://cors-proxy.htmldriven.com/?url=' + xurl
            axios.get(xproxy).then(response => {
                //console.log('axios', response)
                let body = response.data.body
                let apt = parseIt('<th bgcolor="Silver">', body, '</TH></tr>')
                let delayApt = parseIt('COLOR="#0000CD">', body, ' To see')
                let delayDep = parseIt('<b>General Departure', body, '.', true, true)
                let delayArr = parseIt('<b>General Arrival', body, '</td>', true)
                this.airport = {
                    name: apt,
                    delay: 'false',
                    wxdelay: delayApt,
                    status: {},
                    weather: {
                        meta: {
                            updated: delayDep + '<br>' + delayArr
                        }
                    }
                }
                if (delayApt.includes('Due to')) this.airport.delay = 'true'
                if (delayDep.includes('Due to')) this.airport.delay = 'true'
                if (delayArr.includes('Due to')) this.airport.delay = 'true'
                this.wait = false
                //console.log('body', apt, delay)
            })


            /* let url =
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
                    this.wait = false;
                })
                .catch(error => {
                    this.airport = {
                        name: null,
                        status: {
                            reason: url + ' ' + error.message
                        }
                    };

                }); */
        },
    }
});

var parseIt = function (prefix, str, suffix, keepPrefix = false, keepSuffix = false) {
    let spos = str.indexOf(prefix)
    let epos = str.indexOf(suffix, spos)
    if (spos < 0 || epos < 0) return ''
    if (!keepPrefix) spos = spos + prefix.length
    if (keepSuffix) epos = epos + suffix.length
    let subText = str.substring(spos, epos)
    return subText.trim()
}