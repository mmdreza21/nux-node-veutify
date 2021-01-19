<template>
  <v-app dark>
    <Draver />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Draver from "@/components/shared/Draver.vue"
export default {
  components: { Draver },

  data() {
    return {}
  },
}
</script>
