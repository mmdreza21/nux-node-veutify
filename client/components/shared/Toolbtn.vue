<template>
  <v-toolbar dense color="grey darken-3" flat>
    <v-btn
      class="hidden-md-and-down"
      color="green"
      text
      exact
      :to="{ name: 'index' }"
    >
      <v-icon> mdi-home-variant-outline </v-icon>home
    </v-btn>
    <div class="text-center">
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            dense
            text
            color="green"
            exact
            :to="{ name: 'product' }"
          >
            products
            <v-icon> mdi-store-outline</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            exact
            v-for="item in items"
            :key="item._id"
            :to="{ name: 'product-category', query: { cat: item._id } }"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-btn
      dense
      v-if="$auth.loggedIn"
      color="green"
      :to="{ name: 'product-cart' }"
      text
      class="hidden-md-and-down"
    >
      <v-icon> mdi-cart </v-icon> cart
    </v-btn>

    <v-btn
      v-if="$auth.loggedIn"
      color="green"
      class="hidden-md-and-down"
      :to="{ name: 'order' }"
      text
    >
      <v-icon> mdi-basket </v-icon> orders
    </v-btn>
    <v-btn
      dense
      class="hidden-md-and-down"
      color="blue"
      text
      exact
      :to="{ name: 'about' }"
    >
      <v-icon>mdi-information-variant </v-icon> about
    </v-btn>

    <v-text-field
      dark
      v-model="searche"
      color="primary"
      hide-details
      :rules="searcheRules"
      placeholder="search"
      prepend-icon="mdi-magnify"
      single-line
      dense
      @change="search"
    >
    </v-text-field>

    <v-spacer />
    <v-toolbar-title />
    <v-spacer />

    <v-btn
      color="blue"
      text
      class="hidden-md-and-down"
      v-if="$auth.loggedIn && $auth.user.isAdmin"
      :to="{ name: 'admin' }"
    >
      <v-icon> mdi-account-cowboy-hat </v-icon> Admin Area
    </v-btn>
    <v-btn
      v-if="$auth.loggedIn"
      class="hidden-md-and-down"
      text
      color="success"
      :to="{ name: 'accont' }"
      exec
    >
      <v-icon> mdi-account </v-icon> profile
    </v-btn>
    <v-btn-toggle
      class="hidden-md-and-down"
      dense
      v-if="!$auth.loggedIn"
      rounded
    >
      <v-btn dense color="primary" :to="{ name: 'user' }">
        <v-icon> mdi-account-plus </v-icon> Sign Up
      </v-btn>
      <v-btn dense color="success" :to="{ name: 'login' }" exact>
        <v-icon> mdi-account-arrow-left </v-icon> Log In
      </v-btn>
    </v-btn-toggle>
    <v-btn
      v-else
      class="hidden-md-and-down"
      dark
      color="red lighten-1"
      @click="getout"
      text
    >
      <v-icon> mdi-account-arrow-right-outline </v-icon>Log Out
    </v-btn>
  </v-toolbar>
</template>


    <script>
export default {
  watchQuery: true,
  data() {
    return {
      searche: "",
      searcheRules: [
        (v) => !!v || "this fild  is required",
        (v) =>
          (v && v.length >= 3) ||
          "discribtions can't be less than 3 characters",
      ],
    }
  },
  computed: {
    items() {
      return this.$store.getters["product/getCat"]
    },
  },
  methods: {
    async search() {
      try {
        await this.$store.dispatch("product/search", this.searche).then(() => {
          this.$router.push("/searche")
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getout() {
      try {
        await this.$auth.logout("local")
        alert("loged out")
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>