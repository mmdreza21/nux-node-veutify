<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col v-for="pro in getProd" :key="pro._id" md="auto" mx="12">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 18 : 2"
              width="320"
              height="400"
              align="center"
              class="mx-auto"
            >
              <v-list-item-title class="headline mb-1">
                title: {{ pro.title }}</v-list-item-title
              >

              <v-img
                max-width="300"
                height="200"
                :src="`http://localhost:8585/${pro.imgurl}`"
              >
              </v-img>
              <v-list-item-content>
                <v-card-title>
                  price : <span class="spa"> {{ pro.price }}$ </span>
                </v-card-title>

                <v-list-item-subtitle class="pro">
                  {{ pro.about }}
                </v-list-item-subtitle>
                <!-- <p>http://localhost:8585/{{ pro.imgurl }}`</p> -->
              </v-list-item-content>
              <v-card-actions>
                <v-hover v-slot="{ hover }">
                  <v-btn
                    :color="hover ? 'success' : 'primary'"
                    :elevation="hover ? 15 : 2"
                    :outlined="hover"
                    rounded
                    :text="hover"
                    :to="`/product/${pro._id}`"
                  >
                    <v-icon>mdi-magnify</v-icon> Detail
                  </v-btn>
                </v-hover>
                <ADDTOCART v-if="$auth.loggedIn" :id="pro._id" />
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
 
 <script>
import ADDTOCART from "@/components/Admin/ADDTOCART.vue"

export default {
  watchQuery: true,
  auth: false,
  components: { ADDTOCART },
  computed: {
    getProd() {
      return this.$store.getters["product/getProducts"]
    },
  },

  //   async asyncData(ctx) {
  //     try {
  //       const page = (+ctx.query.page || 1).toString()
  //       const { data } = await ctx.$axios.get(`/prods/?page=${page}&limit=2`)
  //       return { getProd: data }
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   },
}
</script> 


 <style scoped>
.pro {
  margin: 0 10px;
}
.spa {
  color: red;
}
</style>