<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      :mini-variant="miniVariant"
      fixed
      app
    >
      <List />
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
    </v-navigation-drawer>
    <v-app-bar color="grey darken-3" :clipped-left="clipped" fixed app dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="primary" />

      <Toolbtn />
    </v-app-bar>
  </div>
</template>

    <script>
import List from "./List.vue"
import Toolbtn from "./Toolbtn.vue"
export default {
  components: { List, Toolbtn },

  data() {
    return {
      clipped: true,

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
}
</script>