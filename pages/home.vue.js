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
<v-parallax src="https://dsx.weather.com/util/image/map/airport_delays_1280x720.jpg?v=ap&w=1280&h=720&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0">
<v-layout column align-center justify-center>
    <h1 class="pink--text">Airports</h1>
    <h4 class="pink--text">A Vue.js SPA Demo Application</h4>
</v-layout>
</v-parallax>
</div>`,
    props: ["title"],
    $_veeValidate: {
        validator: "new"
    },
    data() {
        return {
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
    }
});