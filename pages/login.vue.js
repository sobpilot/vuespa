var spaLogin = Vue.component("Login", {
  template: `<v-jumbotron color="grey lighten-2">
    <v-container fill-height>
        <v-layout align-center>
            <v-flex>
                <h3 class="display-3">Airports Login</h3>
                <span class="subheading">In order to save your Airport Selections you must login.</span>
                <v-divider class="my-3"></v-divider>
                <form v-on:submit.prevent='Login'>
                    <div class="title mb-3">
                        <v-text-field :rules="emailRules" v-model="email" :counter="50" label="Email" required></v-text-field>
                        <v-text-field :rules=passwordRules type="password" v-model="password" :counter="20" label="Password" required></v-text-field>
                    </div>
                    <v-btn type='submit' large color="primary" class="mx-0">Login</v-btn>
                    <span class="red--text">{{errorMsg}}</span>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</v-jumbotron>`,
  props: ["title"],
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      email: "steve@olis.com",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
        v => v.length <= 50 || "Email must be less than 50 characters"
      ],
      password: "bonanza",
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length <= 20 || "Password must be less than 10 characters"
      ],
      errorMsg: ''
    };
  },
  methods: {
    Login() {
      this.errorMsg = ''
      console.log("login");
      fbAuth.signInWithEmailAndPassword(this.email, this.password).catch(error => {
        //console.log(error)
        this.errorMsg = error.message
        fbAuth.signOut().then(function () {
          // Sign-out successful.
        }).catch(function (error) {
          this.errorMsg += error.message
          // An error happened.
        });
      }).then(
        user => {
          //console.log(user)
          this.$router.push('/')
        }
      )



    }
  }
});