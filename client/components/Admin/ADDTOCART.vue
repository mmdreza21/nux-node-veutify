<template>
  <div>
    <v-form @submit.prevent="addToCart">
      <v-hover v-slot="{ hover }">
        <v-btn
          v-if="$auth.loggedIn"
          :loading="loading"
          :color="hover ? 'primary' : 'success'"
          :elevation="hover ? 15 : 2"
          :outlined="hover"
          rounded
          :text="hover"
          type="submit"
          :block="blockee"
        >
          <v-icon>mdi-cart-arrow-down</v-icon> Add to cart
        </v-btn>
      </v-hover>
    </v-form>
    <div class="text-center">
      <v-snackbar
        shaped
        top
        color="success"
        v-model="snackbar"
        :timeout="timeout"
      >
        {{ text }}
      </v-snackbar>
    </div>
  </div>
</template>
 



 <script>
export default {
  props: {
    blockee: {
      type: Boolean,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
      ID: this.id,
      snackbar: false,
      text: "success fully added to cart",
      timeout: 3000,
    }
  },

  methods: {
    async addToCart() {
      try {
        this.loading = true
        const id = this.ID
        await this.$store.dispatch("cart/addtocart", id)
        this.snackbar = true
        await this.$store.dispatch("cart/grtprods")
        // this.$router.push("/product/cart")
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script> 