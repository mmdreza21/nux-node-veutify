<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-hover v-slot="{ hover }">
        <v-btn
          :color="hover ? 'red darken-1' : 'success'"
          v-bind="attrs"
          v-on="on"
          absolute
          dark
          class="btnsss"
          left
          button
        >
          <v-icon>mdi-pencil</v-icon> edite
        </v-btn>
      </v-hover>
    </template>

    <v-form
      v-model="valid"
      align="center"
      class="product-form"
      @submit.prevent="sub()"
    >
      <v-card :loading="loading" width="600px" class="pa-10">
        <v-row>
          <VCol cols="12" md="12" mx="12">
            <v-text-field
              :rules="titelRules"
              dense
              v-model="title"
              label="title"
            ></v-text-field>
          </VCol>
          <VCol cols="12" md="12" mx="12">
            <v-text-field
              dense
              :rules="imgurlRules"
              v-model="imgurl"
              label="image"
            ></v-text-field>
          </VCol>

          <VCol cols="12" md="12" mx="12">
            <v-text-field
              dense
              :rules="priceRules"
              v-model="price"
              type="number"
              label="price$"
            ></v-text-field>
          </VCol>

          <VCol cols="12" md="12" mx="12">
            <v-text-field
              dense
              :rules="numRules"
              v-model="numInStock"
              type="number"
              label=" how many"
            ></v-text-field>
          </VCol>
          <VCol cless="block" cols="12" md="6" sm="12">
            <v-select
              :rules="catRules"
              item-value="_id"
              item-text="name"
              :items="cats"
              label="category"
              v-model="category"
              chips
              dense
            ></v-select>
          </VCol>
          <VCol cols="12" md="6" sm="12">
            <v-select
              :rules="tagRules"
              v-model="tag"
              :items="tags"
              chips
              label="tag"
              multiple
              dense
            ></v-select>
          </VCol>
          <VCol md="12" mx="12">
            <v-textarea
              dense
              :rules="aboutRules"
              v-model="about"
              label="discribtion"
            ></v-textarea>
          </VCol>
        </v-row>
        <v-hover v-slot="{ hover }">
          <v-btn
            :loading="loading"
            :color="hover ? `success` : `primary`"
            type="submit"
            :disabled="!valid"
          >
            <VIcon>mdi-clipboard-edit-outline </VIcon> edite Product</v-btn
          >
        </v-hover>
      </v-card>
    </v-form>
  </v-dialog>
</template>


<script>
export default {
  props: {
    id: {
      type: String,
    },
    imgurle: {
      type: String,
    },
    titlee: {
      type: String,
    },
    pricee: {
      type: Number,
    },
    aboute: {
      type: String,
    },
    numInStocke: {
      type: Number,
    },
    tage: Array,
    categorye: String,
  },
  data() {
    return {
      valid: false,
      titelRules: [
        (v) => !!v || "titel fild  is required",
        (v) => (v && v.length >= 3) || "Name can't be less than 3 characters",
      ],
      imgurlRules: [(v) => !!v || "this fild  is required"],
      priceRules: [(v) => !!v || "this fild  is required"],
      tagRules: [(v) => !!v || "this fild  is required"],
      catRules: [(v) => !!v || "this fild  is required"],
      aboutRules: [
        (v) => !!v || "this fild  is required",
        (v) =>
          (v && v.length >= 3) ||
          "discribtions can't be less than 3 characters",
      ],

      numRules: [(v) => !!v || "this fild  is required"],
      dialog: false,
      loading: false,

      ID: this.id,
      title: this.titlee,
      imgurl: this.imgurle,
      price: this.pricee,
      about: this.aboute,
      tag: this.tage,
      category: this.categorye,
      numInStock: this.numInStocke,
      tags: ["slider", "sugesstion", "NUN"],
    }
  },

  methods: {
    async sub() {
      this.loading = true
      try {
        const product = {
          _id: this.ID,
          title: this.title,
          imgurl: this.imgurl,
          price: this.price,
          about: this.about,
          category: this.category,
          numInStock: this.numInStock,
          tag: this.tag,
          userId: "5ff1bc5bfc452814805d6f76",
        }
        await this.$store.dispatch("admin/editeprods", product)
        // this.$router.push("/product")
        this.dialog = false
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
  },
  computed: {
    cats() {
      return this.$store.state.product.category
    },
  },
}
</script> 

<style scoped>
</style>