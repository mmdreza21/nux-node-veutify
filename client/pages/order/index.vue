
<template>
  <div>
    <v-card
      class="jus-center"
      style="margin: 15px"
      pa-10
      v-for="item in order"
      :key="item._id"
      elevation="15"
    >
      <h5>name:{{ item.user.name }}</h5>
      <hr />
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">titel</th>
              <th class="text-left">price($)</th>
              <th class="text-left">Qty</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in item.products" :key="product._id">
              <td>{{ product.produc.title }}</td>
              <td>{{ product.TPrice }}</td>
              <td>{{ product.Qty }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <br />
      <hr />
      <h3>total Price:{{ item.totalPrice }}</h3>
      <div style="margin: 4px" class="btnnn">
        <v-btn @click="check(item._id)" text color="primary">
          <v-icon>mdi-cash-check</v-icon> check</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: [
    "auth",
    async function (ctx) {
      try {
        await ctx.store.dispatch("cart/getorder")
      } catch (error) {
        console.log("error :", error)
      }
    },
  ],
  methods: {
    async check(id) {
      try {
        await this.$axios.get(`/order/invice/${id}`)
      } catch (e) {
        console.log(e)
      }
    },
  },
  computed: {
    order() {
      return this.$store.state.cart.orders
    },
  },
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          mmd: "mmdmmd",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          mmd: "mmdmmd",
        },
      ],
    }
  },
}
</script>


<style scoped>
.btnnn {
  text-align: center;
}
</style>