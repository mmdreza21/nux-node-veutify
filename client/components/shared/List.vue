<template>
  <div>
    <v-list>
      <v-list>
        <v-list-item
          v-for="(item, i) in home"
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
      </v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in getcat"
          :key="child.title"
          :to="`/product/category?cat=${child._id}`"
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-divider></v-divider>
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
    <div v-if="$auth.loggedIn">
      <v-list-group
        v-for="item in acont"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.childs"
          :key="child.title"
          :to="child.to"
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </div>
    <v-list v-if="$auth.loggedIn && $auth.user.isAdmin">
      <v-list-item
        v-for="(item, i) in admin"
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
  </div>
</template>



        <script>
export default {
  computed: {
    getcat() {
      return this.$store.getters["product/getCat"]
    },
  },
  data() {
    return {
      home: [
        {
          icon: "mdi-home-outline",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-home-outline",
          title: "All Products",
          to: "/product",
        },
      ],
      items: [
        {
          action: "mdi-cat",
          active: true,
          title: "categorys",
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
      acont: [
        {
          action: "mdi-badge-account",
          title: "accont",
          childs: [
            { title: "profile", to: "/accont" },
            { title: "logout", to: "/accont/logout" },
          ],
        },
      ],
      logaconts: [
        {
          icon: "mdi-cart-check",
          title: "cart",
          to: "/product/cart",
        },
        {
          icon: "mdi-basket-outline",
          title: "orders",
          to: "/order",
        },
      ],
      admin: [
        {
          icon: "mdi-account-cowboy-hat",
          title: "admin area",
          to: "/admin",
        },
      ],
    }
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