Vue.component('spa-toolbar', {
    template: `
        <div>
            <v-toolbar dark color="primary" class="mb-2">
                <v-layout align-center>
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <router-link to="/"><v-btn flat>Home</v-btn></router-link>
                        <router-link to="/airports"><v-btn flat>Airports</v-btn></router-link>
                    </v-toolbar-items>
                </v-layout>
            </v-toolbar>
        </div>
`,
    props: ['title'],
    $_veeValidate: {
        validator: 'new'
    },
})