<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-hover v-slot="{ hover }">
          <v-btn
            :color="hover ? `success` : `red`"
            type="submit"
            left
            v-bind="attrs"
            v-on="on"
            button
          >
            <VIcon>mdi-delete</VIcon> delete</v-btn
          >
        </v-hover>
      </template>

      <v-card>
        <v-card-title class="headline"> Are you sure? </v-card-title>
        <v-card-text
          >this action will delete product from every where.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="deletprods"> Agree </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    async deletprods() {
      try {
        await this.$store.dispatch("admin/deleteprod", this.id)
        this.dialog = false
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>