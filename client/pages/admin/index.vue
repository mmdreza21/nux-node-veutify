<template>
  <v-container>
    <v-row justify="center">
      <v-col v-for="pro in getProd" :key="pro.id" md="auto" mx="12">
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
              <v-card-title> price : {{ pro.price }}$ </v-card-title>
              <v-list-item-subtitle class="pro">
                {{ pro.about }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-card-actions button>
              <EDITE
                :id="pro._id"
                :imgurle="pro.imgurl"
                :titlee="pro.title"
                :pricee="pro.price"
                :aboute="pro.about"
                :tage="pro.tag"
                :numInStocke="pro.numInStock"
                :categorye="pro.category"
              />
              <DELET :id="pro._id" />
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <div class="add">
      <ADD />
    </div>
  </v-container>
</template>
 
 <script>
import { mapGetters } from "vuex"
import ADD from "@/components/Admin/ADD.vue"
import EDITE from "@/components/Admin/EDITE.vue"
import DELET from "../../components/Admin/DELET.vue"
export default {
  middleware: "auth",
  data() {
    return {
      dialog: false,
    }
  },
  components: { ADD, EDITE, DELET },
  computed: {
    ...mapGetters({
      getProd: "admin/getProducts",
    }),
  },
  created() {
    this.$store.dispatch("product/getcat")
  },
}
</script> 


 <style scoped>
.pro {
  margin: 0 10px;
}
.add {
  margin: 100px;
}
.btn {
  text-align: center;
}
</style>