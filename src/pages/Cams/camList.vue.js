var spaCamList = Vue.component('CamList', {
  template: `<div>
  <v-container fluid grid-list-md>
    <v-data-iterator :items="items" :loading="loading" hide-actions content-tag="v-layout" row wrap>
      <div slot="header">
        <h3>Camera List
          <v-btn color="pink" dark small flat v-on:click="dialog=!dialog">
            New Camera
          </v-btn>
        </h3>
      </div>
      <v-flex slot="item" slot-scope="props" xs12 sm6>
        <v-card color="pink">
          <v-card-title>
            <h4>{{ props.item.description }}</h4>
            <v-spacer></v-spacer>
            <v-icon small class="mr-2" v-on:click="editItem(props.item)">edit</v-icon>
            <v-icon small v-on:click="deleteItem(props.item)">delete</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-img :src="props.item.url"></v-img>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>

  <div>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar fixed dense>
          <v-toolbar-title>
            {{ editMode }} Camera
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="error" small v-on:click.native="close">Cancel</v-btn>
          <v-btn color="success" small v-on:click.native="save">Save</v-btn>
        </v-toolbar>
        <br /><br />
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-text-field v-model="editedItem.description" label="Camera Description"></v-text-field>
            </v-flex>
            <v-flex></v-flex>
            <v-flex xs12 sm6>
              <v-text-field v-model="editedItem.url" label="Stream URL"></v-text-field>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>

</div>`,
  props: ['title'],
  $_veeValidate: {
    validator: 'new'
  },
  data() {
    return {
      id: 0,
      dialog: false,
      loading: false,
      editedItem: {
        description: '',
        url: ''
      },
      defaultItem: {
        description: '',
        url: ''
      },
      items: [],
      editedIndex: -1
    }
  },
  created() {
    console.log('created')
    this.init()
  },
  computed: {
    editMode() {
      return this.editedIndex === -1 ? 'New' : 'Edit'
    }
  },
  methods: {
    init() {
      this.loading = true
      let user = fbAuth.currentUser
      //console.log('user', user)
      if (user) {
        fbUserCams.doc(user.uid).get().then(doc => {
          let itms = _.toArray(doc.data())
          //console.log('data', doc.data(), itms)
          this.items = itms
          this.loading = false
        })
      }
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.id++
        this.editedItem.id = this.id
        this.items.push(this.editedItem)
      }
      let user = fbAuth.currentUser
      if (user) {
        let obj = _.toPlainObject(this.items)
        fbUserCams.doc(user.uid).set(obj)
        this.close()
      }
    }
  }
})
