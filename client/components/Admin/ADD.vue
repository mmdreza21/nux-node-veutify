<template>
  <v-dialog
    v-model="dialog"
    max-width="700px"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-hover v-slot="{ hover }">
        <v-btn
          :color="hover ? 'red darken-1' : 'success'"
          v-bind="attrs"
          v-on="on"
          fixed
          fab
          x-large
          dark
          bottom
          right
        >
          <v-icon x-large>mdi-plus</v-icon>
        </v-btn>
      </v-hover>
    </template>
    <v-form
      ref="form"
      v-model="valid"
      align="center"
      class="product-form"
      @submit.prevent="sub()"
    >
      <!-- enctype="multipart/form-data" -->
      <v-card :loading="loading" width="700px" class="pa-10">
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
            <v-file-input
              id="input"
              accept="image/*"
              v-model="img"
              name="imgurl"
              color="deep-purple accent-4"
              counter
              label="image File"
              placeholder="Select your files"
              prepend-icon="mdi-image-multiple"
              :show-size="1000"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="deep-purple accent-4"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="overline grey--text text--darken-3 mx-2"
                >
                  +{{ files.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>
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
          <VCol md="12" sm="12">
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
            :color="hover ? `success` : `red`"
            class="btn"
            type="submit"
            :disabled="!valid"
          >
            <VIcon>mdi-beaker-plus-outline</VIcon> Add Product</v-btn
          >
        </v-hover>
      </v-card>
    </v-form>
  </v-dialog>
</template>


<script>
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      valid: false,
      title: "",
      titelRules: [
        (v) => !!v || "titel fild  is required",
        (v) => (v && v.length >= 3) || "Name can't be less than 3 characters",
      ],

      img: undefined,
      imgurlRules: [(v) => !!v || "this fild  is required"],

      price: undefined,
      priceRules: [(v) => !!v || "this fild  is required"],
      tagRules: [(v) => !!v || "this fild  is required"],
      catRules: [(v) => !!v || "this fild  is required"],
      about: "",
      aboutRules: [
        (v) => !!v || "this fild  is required",
        (v) =>
          (v && v.length >= 3) ||
          "discribtions can't be less than 3 characters",
      ],

      numInStock: undefined,
      numRules: [(v) => !!v || "this fild  is required"],
      tags: ["slider", "sugesstion", "NUN"],
      tag: [],
      dialog: false,
      loading: false,
      //
      category: "",
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },

    async sub() {
      this.loading = true
      try {
        console.log(this.img)
        const formdata = new FormData()

        const product = {
          title: this.title,
          imgurl: this.img,
          price: this.price,
          about: this.about,
          category: this.category,
          numInStock: this.numInStock,
          tag: this.tag,
          userId: "5ff1bc5bfc452814805d6f76",
        }
        for (const [key, value] of Object.entries(product)) {
          formdata.append(key, value)
        }

        await this.$store.dispatch("admin/sendprods", formdata)
        // this.$router.push("/product")
        this.dialog = false
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
  },
  reset() {
    this.$refs.form.reset()
  },
  computed: {
    cats() {
      return this.$store.state.product.category
    },
  },
}
</script>