<template>
  <v-container>
    <VCard class="pa-10">
      <v-row flexbox align="center">
        <VCol sm="12" md="6">
          <v-img width="500" max-height="400" :src="prods.imgurl[0]"> </v-img>
        </VCol>
        <VCol class="text" sm="12" md="6" align>
          <v-list-item-content>
            <v-card-title>
              <h3>title:</h3>
              {{ prods.title }}
            </v-card-title>

            <v-list-item class="text">
              {{ prods.about }}
            </v-list-item>

            <v-divider inset></v-divider>
            <v-card-title
              ><h3>price:</h3>
              <span class="spa"> {{ prods.price }} $</span>
            </v-card-title>
            <v-card-title>
              <h3>Number</h3>
              : {{ prods.numInStock }}
            </v-card-title>
          </v-list-item-content>
        </VCol>
        <VCol sm="12" md="12">
          <v-card-actions>
            <ADDTOCART :id="prods.id" :blockee="true" />
          </v-card-actions>
        </VCol>
      </v-row>
    </VCard>
  </v-container>
</template>


<script>
import ADDTOCART from "@/components/Admin/ADDTOCART.vue"
export default {
  components: { ADDTOCART },
  async asyncData(ctx) {
    try {
      const res = await ctx.$axios.$get(`/prods/${ctx.params.id}`)
      return {
        prods: res,
      }
    } catch (e) {
      console.log(e)
      console.log(e.response.data)
      ctx.error({ status: 404 })
    }
  },
}
</script>

<style  scoped>
.text {
  margin: 40px 0;
}
.spa {
  color: red;
}
</style>