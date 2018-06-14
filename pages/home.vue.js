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
           
    <h3>Airport Delays</h3>
</div>`,
    props: ["title"],
    $_veeValidate: {
        validator: "new"
    },
    data() {
        return {
            delays: [],
            items: [{
                    src: 'https://dsx.weather.com/util/image/map/airport_delays_1280x720.jpg?v=ap&w=1280&h=720&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0"'
                },
                {
                    src: 'http://images.intellicast.com/WxImages/SurfaceAnalysis/usa_ICast.gif'
                },
                {
                    src: 'http://images.intellicast.com/WxImages/Satellite/namer.jpg'
                }
            ]
        }
    },
    created() {
        //this.GetDelays()
    },
    methods: {
        GetDelays() {
            let url = 'https://soa.smext.faa.gov/asws/api/airport/delays'
            axios.get(url).then(result => {
                this.delays = result.data
                console.log(result)
            })
        }
    }
});