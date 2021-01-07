<template>
  <div class="dive">
    <VRow class="justify-center">
      <VCard class="align-center" flat width="400">
        <v-form
          ref="form"
          @submit.prevent="userlogin"
          v-model="valid"
          lazy-validation
        >
          <VCol cols="12" md="12">
            <v-text-field
              v-model="login.email"
              label="E-mail"
              required
              :rules="emailRules"
            ></v-text-field>
          </VCol>
          <VCol cols="12" md="12">
            <v-text-field
              type="password"
              :rules="passRules"
              v-model="login.password"
              label="password"
              required
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
              logIn
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
      <v-snackbar top color="red" v-model="snake">
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
      login: {
        email: "",
        password: "",
      },
      timeout: 3000,
      snake: false,
      mess: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passRules: [(v) => !!v || "E-mail is required"],
    }
  },
  methods: {
    async userlogin() {
      try {
        const respons = await this.$auth.loginWith("local", {
          data: this.login,
        })
        this.snake = true
        this.mess = "welcome" + respons.data.name
      } catch (e) {
        this.snake = true
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