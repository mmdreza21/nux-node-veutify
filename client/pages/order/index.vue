
<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">price</th>
          <th class="text-left">Qty</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order" :key="item._id">
          <td>{{ item.products[0]._id }}</td>
          <td>{{ item.totalPrice }}</td>
          <td>{{ item.products[0].Qty }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("cart/getorder")
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