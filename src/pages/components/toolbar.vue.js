Vue.component('spa-toolbar', {
    template: `
        <div>
            <v-toolbar dark color="primary" class="mb-2" fixed>
                <v-layout align-center>
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">{{title}} {{email}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn v-if="email != '??'" flat v-on:click="Logout">Logout</v-btn>
                        <router-link to="/login"><v-btn v-if="email == '??'" flat>Login</v-btn></router-link>
                        <router-link to="/"><v-btn flat>Home</v-btn></router-link>
                        <router-link to="/airports"><v-btn flat>Airports</v-btn></router-link>
                    </v-toolbar-items>
                </v-layout>
            </v-toolbar>
            <br><br><br>
        </div>
`,
    props: ['title', 'email'],
    $_veeValidate: {
        validator: 'new',

    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {
        Logout() {
            fbAuth.signOut().then(() => {
                // Sign-out successful.
                this.$router.push('/')
            }).catch(function (error) {
                // An error happened.
            });
            //console.log('logout', fbAuth.currentUser)
        }

    }

})