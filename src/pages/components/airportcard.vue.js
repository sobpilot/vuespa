Vue.component("card-airport", {
  template: `<div>
    <v-card class="mb-1" dark v-bind:color="(airport.delay==='true') ? 'error' : 'success' ">
        <v-card-text>
            <v-layout align-center wrap>
                <v-flex xs1 v-if="wait">
                    <v-progress-circular indeterminate color="red"></v-progress-circular>
                </v-flex>
                <v-flex v-if="airport.name">
                    <h3>{{airport.IATA}} {{airport.name}} {{airport.city}} {{airport.state}} {{wxdata.Meta.Timestamp}}
                    </h3>
                    <div>
                        <b>{{flightRules}}</b>
                        <b>{{wxdata.Translations.Clouds}}</b>
                    </div>
                    <div>
                        Visibility:
                        <b>{{wxdata.Translations.Visibility}}</b>
                        Wind:
                        <b>{{wxdata.Translations.Wind}}</b>
                        Temperature:
                        <b>{{wxdata.Translations.Temperature}}</b>
                        Dewpoint:
                        <b>{{wxdata.Translations.Dewpoint}}</b>
                        Altimeter:
                        <b>{{wxdata.Translations.Altimeter}}</b>
                    </div>
                    <div v-if="airport.wxdelay" v-html="airport.wxdelay"></div>
                    <span v-html="airport.weather.meta.updated"></span>

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
  data: function() {
    return {
      wait: false,
      wxdata: { Translations: {}, Meta: {} },
      flightRules: {},
      airport: {
        status: {},
        weather: {
          meta: {}
        }
      }
    };
  },
  mounted() {
    this.Lookup();
    //console.log('created', this.airportCode)
  },
  methods: {
    Lookup: function() {
      //console.log('lookup', this.airportCode)
      this.wait = true;
      let xurl =
        "https://www.fly.faa.gov/flyfaa/AirportLookup.jsp?q=" +
        this.airportCode +
        "&go=1&html";
      let xproxy = "https://cors-proxy.htmldriven.com/?url=" + xurl;
      axios.get(xproxy).then(response => {
        //console.log('axios', response)
        let body = response.data.body;
        let apt = parseIt('<th bgcolor="Silver">', body, "</TH></tr>");
        let delayApt = parseIt('COLOR="#0000CD">', body, " To see");
        let delayDep = parseIt("<b>General Departure", body, ".", true, true);
        let delayArr = parseIt("<b>General Arrival", body, "</td>", true);
        this.airport = {
          name: apt,
          delay: "false",
          wxdelay: delayApt,
          status: {},
          weather: {
            meta: {
              updated: delayDep + "<br>" + delayArr
            }
          }
        };
        if (delayApt.includes("Due to")) this.airport.delay = "true";
        if (delayDep.includes("Due to")) this.airport.delay = "true";
        if (delayArr.includes("Due to")) this.airport.delay = "true";

        //console.log('body', apt, delay)
        let wxurl =
          "https://avwx.rest/api/metar/K" +
          this.airportCode.toUpperCase() +
          "?options=info,translate";
        //console.log("wxurl", wxurl);
        axios.get(wxurl).then(response => {
          this.wxdata = response.data;
          this.flightRules = this.wxdata["Flight-Rules"];
          //console.log("wxresponse", response);
          this.wait = false;
        });
      });
    }
  }
});

var parseIt = function(
  prefix,
  str,
  suffix,
  keepPrefix = false,
  keepSuffix = false
) {
  let spos = str.indexOf(prefix);
  let epos = str.indexOf(suffix, spos);
  if (spos < 0 || epos < 0) return "";
  if (!keepPrefix) spos = spos + prefix.length;
  if (keepSuffix) epos = epos + suffix.length;
  let subText = str.substring(spos, epos);
  return subText.trim();
};
