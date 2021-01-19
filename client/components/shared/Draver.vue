<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      :mini-variant="miniVariant"
      fixed
      app
    >
      <template v-slot:append>
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            v-for="(item, i) in about"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      <v-list v-if="!$auth.loggedIn">
        <v-list-item
          v-for="(item, i) in aconts"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon> {{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      <v-list v-else>
        <v-list-item
          v-for="(item, i) in logaconts"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        class="hidden-md-and-down"
        color="green"
        text
        exact
        :to="{ name: 'index' }"
      >
        <v-icon> mdi-home-variant-outline </v-icon>home
      </v-btn>
      <v-btn text color="green" exact :to="{ name: 'product' }">
        products
        <v-icon> mdi-store-outline</v-icon>
      </v-btn>

      <v-btn
        v-if="$auth.loggedIn"
        color="green"
        :to="{ name: 'product-cart' }"
        text
      >
        <v-icon> mdi-cart </v-icon> cart
      </v-btn>

      <v-btn v-if="$auth.loggedIn" color="green" :to="{ name: 'order' }" text>
        <v-icon> mdi-basket </v-icon> orders
      </v-btn>
      <v-btn
        class="hidden-md-and-down"
        color="blue"
        text
        exact
        :to="{ name: 'about' }"
      >
        <v-icon>mdi-information-variant </v-icon> about
      </v-btn>

      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        color="blue"
        text
        v-if="$auth.loggedIn && $auth.user.isAdmin"
        :to="{ name: 'admin' }"
      >
        <v-icon> mdi-account-cowboy-hat </v-icon> Admin Area
      </v-btn>
      <v-btn text color="primary" v-if="!$auth.loggedIn" :to="{ name: 'user' }">
        <v-icon> mdi-account-plus </v-icon> Sign Up
      </v-btn>
      <v-btn
        class="hidden-md-and-down"
        text
        color="success"
        v-else
        :to="{ name: 'accont' }"
        exec
      >
        <v-icon> mdi-account </v-icon> profile
      </v-btn>
      <v-btn
        text
        color="success"
        v-if="!$auth.loggedIn"
        :to="{ name: 'login' }"
        exact
      >
        <v-icon> mdi-account-arrow-left </v-icon> Log In
      </v-btn>
      <v-btn v-else color="red lighten-1" @click="getout" text>
        <v-icon> mdi-account-arrow-right-outline </v-icon>Log Out
      </v-btn>
    </v-app-bar>
  </div>
</template>

    <script>
export default {
  computed: {
    item() {
      return this.$store.state["cart/carts"]
    },
  },
  data() {
    return {
      clipped: true,

      items: [
        {
          icon: "mdi-home-outline",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-store-outline",
          title: "store",
          to: "/product",
        },
        {
          icon: "mdi-cart-outline",
          title: "cart",
          to: "/product/cart",
        },
      ],
      aconts: [
        {
          icon: "mdi-account-plus-outline",
          title: "sign up",
          to: "/user",
        },
        {
          icon: "mdi-login",
          title: "login",
          to: "/login",
        },
      ],
      logaconts: [
        {
          icon: "mdi-account",
          title: "profile",
          to: "/accont",
        },
        {
          icon: "mdi-cart-check",
          title: "cart",
          to: "/cart",
        },
      ],
      about: [
        {
          icon: "mdi-chart-bubble",
          title: "About Us",
          to: "/about",
        },
      ],
      miniVariant: false,
      clipped: true,
      drawer: undefined,
      fixed: false,

      title: "Eshop",
    }
  },
  watch: {
    drawer(value) {
      return value
    },
  },
  methods: {
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