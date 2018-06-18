var spaLogin = Vue.component("Login", {
  template: `<div>
    <v-card color="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Airports Login</h3>
                    <span class="subheading">In order to save your Airport Selections you must login. 
                      <a href="" v-if="mode=='login'" v-on:click.prevent="NewAccount">Create a new account - It's Free!</a></span>
                      <a href="" v-if="mode!='login'" v-on:click.prevent="mode='login'">Login</a></span>
                    <v-divider class="my-3"></v-divider>
                    <form v-on:submit.prevent='Login'>
                        <div class="title mb-3">
                            <v-text-field v-validate.initial="'required|email|max:50'" data-vv-name="email" :error-messages="errors.collect('email')"
                              v-model="email" type="email" :counter="50" label="Email" required></v-text-field>
                            <v-text-field v-validate.initial="'required|max:20|min:6'" data-vv-name="password" type="password" :error-messages="errors.collect('password')"
                              v-model="password" :counter="20" label="Password" required></v-text-field>
                        </div>
                        <v-btn type='submit' :disabled="errors.any()" large color="primary" class="mx-0">{{mode}}</v-btn>
                        <span class="red--text">{{errorMsg}}</span>
                    </form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</div>`,
  props: ["title"],
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      email: null,
      password: null,
      errorMsg: '',
      mode: 'login'
    }
  },
  created() {
    console.log('v', this.fields.all)
  },
  methods: {
    Login() {
      if (this.mode == 'login') {
        this.errorMsg = ''
        console.log("login");
        fbAuth.signInWithEmailAndPassword(this.email, this.password).catch(error => {
          //console.log(error)
          this.errorMsg = error.message
          fbAuth.signOut().then(function () {}).catch(function (error) {
            this.errorMsg += error.message
            // An error happened.
          });
        }).then(
          user => {
            //console.log('then', user)
            if (user) this.$router.push('/')
          }
        )
      } else {
        fbAuth.createUserWithEmailAndPassword(this.email, this.password).catch(error => {
          this.errorMsg = error.message + ' ' + error.code;
        }).then(user => {
          if (user) this.$router.push('/')
        });
      }
    },
    NewAccount() {
      this.mode = 'new account'
    }
  }
});