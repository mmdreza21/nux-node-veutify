<template>
  <div class="dive">
    <VRow class="justify-center">
      <VCard class="align-center" flat width="400">
        <v-form
          ref="form"
          @submit.prevent="resetpass"
          v-model="valid"
          lazy-validation
        >
          <VCol cols="12" md="12">
            <v-text-field
              v-model="forget.email"
              label="E-mail"
              required
              :rules="emailRules"
            ></v-text-field>
          </VCol>

          <VRow a justify="center">
            <v-btn
              :disabled="!valid"
              type="submit"
              color="success"
              class="mr-4 btn"
              style="margin: 12px"
            >
              resetpassword
            </v-btn>

            <v-btn
              :to="{ name: 'user' }"
              color="error"
              style="margin: 12px"
              class="mr-4 btn"
            >
              go to Submit
            </v-btn>
          </VRow>
        </v-form>
      </VCard>
      <Mesege :message="mess" :timeout="timeout" :open="false" />
      <v-snackbar top :color="color" v-model="snake">
        {{ mess }}
      </v-snackbar>
    </VRow>
  </div>
</template>
<script>
import Mesege from "@/components/Mesege.vue"

export default {
  components: { Mesege },

  data() {
    return {
      valid: false,
      forget: {
        email: "",
      },
      color: "",
      timeout: 3000,
      snake: false,
      mess: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    }
  },

  methods: {
    async resetpass() {
      try {
        const { data } = await this.$axios.post("/auth/resetpass", this.forget)
        this.color = "success"
        this.mess = `the email successfully send  to ${this.forget.email}`
        this.snake = true
      } catch (e) {
        this.snake = true
        this.color = "red"
        this.mess = e.response.data
        console.log(e.response.data)
      }
    },
  },
}
</script>


<style  scoped>
.dive {
  text-align: center;
  margin-top: 150px;
}
</style>