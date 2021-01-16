<template>
  <div class="dive" v-if="allow">
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
              type="password"
              v-model="password"
              :rules="passwordRules"
              label="password"
              required
            ></v-text-field>
          </VCol>

          <VCol cols="12" md="12">
            <v-text-field
              type="password"
              v-model="repassword"
              :rules="rules"
              label="config password"
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
              resetpasswprd
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
  <div v-else>
    <h1>sorry this link is not valit any more</h1>
  </div>
</template>
<script>
import Mesege from "@/components/Mesege.vue"

export default {
  components: { Mesege },

  data() {
    return {
      valid: false,

      password: "",

      timeout: 3000,
      snake: false,
      color: "",
      mess: "",

      passwordRules: [
        (v) => !!v || "password is required",
        (v) => (v && v.length >= 6) || "password isnot strong ",
        (v) => /(?=.*\d)(?=.*[A-z])/.test(v) || "password isnot strong ",
      ],
      repassword: "",
    }
  },
  computed: {
    rules() {
      const rules = []
      if (this.repassword) {
        const rule = (v) =>
          (!!v && v) === this.password || "Values do not match"
        rules.push(rule)
      }
      return rules
    },
  },
  async asyncData(ctx) {
    try {
      const data = await ctx.$axios.$get(`/auth/newPass/${ctx.params.token}`)
      return { allow: data }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async resetpass() {
      try {
        const login = {
          password: this.password,
        }
        await this.$axios.put(
          `/auth/newPass/${this.$route.params.token}`,
          login
        )
        this.color = "success"
        this.mess = `your password successfully updated`
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