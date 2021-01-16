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
              :rules="nameRules"
              dense
              v-model="name"
              label="name"
            ></v-text-field>
          </VCol>
          <VCol cols="12" md="12" mx="12">
            <v-text-field
              dense
              :rules="lnameRules"
              v-model="lname"
              label="last name"
            ></v-text-field>
          </VCol>

          <VCol cols="12" md="12" mx="12">
            <v-text-field
              dense
              :rules="phoneRules"
              v-model="phone"
              type="number"
              label="phone number"
            ></v-text-field>
          </VCol>

          <VCol md="12" mx="12">
            <v-textarea
              dense
              :rules="addressRules"
              v-model="address"
              label="adress"
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
    namee: {
      type: String,
    },
    lnamee: {
      type: String,
    },
    phonee: {
      type: String,
    },
    addresse: {
      type: String,
    },
  },
  data() {
    return {
      valid: false,
      nameRules: [
        (v) => !!v || "titel fild  is required",
        (v) => (v && v.length >= 3) || "Name can't be less than 3 characters",
      ],
      lnameRules: [(v) => !!v || "this fild  is required"],
      phoneRules: [(v) => !!v || "this fild  is required"],
      addressRules: [
        (v) => !!v || "this fild  is required",
        (v) =>
          (v && v.length >= 3) ||
          "discribtions can't be less than 3 characters",
      ],

      numRules: [(v) => !!v || "this fild  is required"],
      dialog: false,
      loading: false,

      ID: this.id,
      name: this.namee,
      lname: this.lnamee,
      phone: this.phonee,
      address: this.addresse,
    }
  },

  methods: {
    async sub() {
      this.loading = true
      try {
        const user = {
          _id: this.ID,
          name: this.name,
          lname: this.lname,
          phone: this.phone,
          address: this.address,
        }
        await this.$store.dispatch("user/edite", user)
        // this.$router.push("/product")
        this.dialog = false
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script> 

<style scoped>
</style>