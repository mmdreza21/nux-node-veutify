<template>
  <div>
    <v-card elevation="12">
      <v-data-table
        :headers="headers"
        :items="getcart.product"
        sort-by="price"
        class="elevation-2"
        hide-default-footer
        :single-expand="singleExpand"
        show-expand
        :expanded.sync="expanded"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>My CART</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon color="red" small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">{{ item.productId.about }}</td>
        </template>
      </v-data-table>
      <v-card pa-10 style="text-align: center">
        <h3>Total Price : {{ getcart.price }}$</h3>
        <v-btn style="margin: 5px" @click="sendorder" color="success"
          >orderr and buy</v-btn
        >
        <v-btn style="margin: 5px" exact to="/product" color="red"
          >buy more</v-btn
        >
      </v-card>
    </v-card>
  </div>
</template>



<script>
import { mapState } from "vuex"
export default {
  middleware: [
    "auth",
    async function (ctx) {
      try {
        await ctx.store.dispatch("cart/grtprods")
      } catch (error) {
        console.log("error :", error)
      }
    },
  ],
  computed: {
    getcart() {
      return this.$store.state.cart.carts
    },
  },
  data: () => ({
    expanded: [],
    singleExpand: false,
    dialog: false,
    dialogDelete: false,

    headers: [
      {
        text: "title",
        align: "center",
        sortable: false,
        value: "productId.title",
      },
      { text: "Total price($)", align: "center", value: "TPrice" },
      { text: "price($)", align: "center", value: "productId.price" },
      { text: "quantity", align: "center", value: "Qty" },
      { text: "Delete", value: "actions", sortable: false },
      { text: "", align: "center", value: "data-table-expand" },
    ],
    editedIndex: -1,
    editedItem: { id: null },
    defaultItem: {},
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {
    async sendorder() {
      await this.$store.dispatch("cart/postorder")
      this.$router.push("/order")
    },
    confirmsss() {
      if (this.getcart.length > 0) {
        this.cart = true
      } else {
        this.cart = false
      }
    },
    deleteItem(item) {
      this.editedIndex = this.getcart.product.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await this.$store.dispatch("cart/deletecart", this.editedItem)

      this.closeDelete()
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
}
</script>