Vue.component("spa-toolbar", {
  template: `<div>
    <v-navigation-drawer dark app clipped temporary v-model="menu" class="blue white--text">
        <v-list >
            <v-list-tile
               v-for="item in items" :key="item.title" @click="$router.push(item.path)">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="primary" class="mb-2" fixed app> 
        <v-layout align-center>
            <v-toolbar-side-icon v-on:click="menu=!menu"></v-toolbar-side-icon>
            <v-toolbar-title class="white--text">{{title}} {{email}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn v-if="email != '??'" flat v-on:click="Logout">Logout</v-btn>
                <router-link to="/login">
                    <v-btn v-if="email == '??'" flat>Login</v-btn>
                </router-link>
               <!--  <router-link to="/">
                    <v-btn flat>Home</v-btn>
                </router-link>
                <router-link to="/airports">
                    <v-btn flat>Airports</v-btn>
                </router-link> -->
            </v-toolbar-items>
        </v-layout>
    </v-toolbar>
    <div style="margin-bottom: 40px;"></div>
</div>`,
  props: ["title", "email"],
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      menu: false,
      items: [
        { title: "Home", icon: "home", path: "/" },
        { title: "Airports", icon: "local_airport", path: "/airports" },
        { title: "Cameras", icon: "videocam", path: "/cams" }
      ]
    }
  },
  mounted() { },
  methods: {
    Logout() {
      fbAuth
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$router.push("/")
        })
        .catch(function (error) {
          // An error happened.
        })
      //console.log('logout', fbAuth.currentUser)
    }
  }
})
