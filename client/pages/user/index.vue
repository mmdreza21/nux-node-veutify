<template>
  <div class="maind">
    <v-card flat>
      <v-form ref="form" @submit.prevent="sub" v-model="valid" lazy-validation>
        <VRow>
          <VCol cols="12" md="6">
            <v-text-field
              v-model="name"
              :counter="20"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>
          </VCol>

          <VCol cols="12" md="6">
            <v-text-field
              v-model="lname"
              :counter="20"
              :rules="lnameRules"
              label="LastName"
              required
            ></v-text-field>
          </VCol>
          <VCol cols="12" md="6">
            <v-text-field
              :class="ali"
              placeholder="example@example.com"
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </VCol>
          <VCol cols="12" md="6">
            <v-text-field
              placeholder="09........"
              v-model="phone"
              :rules="phoneRules"
              label="phone number"
              required
            ></v-text-field>
          </VCol>
          <VCol cols="12" md="12">
            <v-text-field
              v-model="address"
              :rules="addressrules"
              label="address"
              required
            ></v-text-field>
          </VCol>
          <VCol cols="12" md="12">
            <v-text-field
              placeholder="باید دارای عدد و حداقل یک حروف باشد"
              type="password"
              v-model="password"
              :rules="passwordRules"
              label="password"
              required
            ></v-text-field>
          </VCol>

          <VCol cols="12" md="12">
            <v-text-field
              placeholder="******"
              type="password"
              v-model="repassword"
              :rules="rules"
              label="password"
              required
            ></v-text-field>
          </VCol>
        </VRow>
        <VRow a justify="center">
          <v-btn
            :disabled="!valid"
            type="submit"
            color="success"
            class="mr-4 btn"
            @click="validate"
            style="margin: 12px"
          >
            signUp
          </v-btn>

          <v-btn
            color="error"
            style="margin: 12px"
            class="mr-4 btn"
            @click="reset"
          >
            Reset Form
          </v-btn>
        </VRow>
      </v-form>
    </v-card>
    <v-snackbar top color="red" v-model="snake">
      {{ mess }}
    </v-snackbar>
  </div>
</template>


 <script>
export default {
  data() {
    return {
      ali: "",
      timeout: 3000,
      snake: false,
      mess: "",
      valid: true,
      name: "",
      lname: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length >= 3) || "Name can't be less than 3 characters",
      ],
      lnameRules: [
        (v) => !!v || " lastName is required",
        (v) => (v && v.length >= 3) || "Name can't be less than 3 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
      password: "",
      passwordRules: [
        (v) => !!v || "password is required",
        (v) => (v && v.length >= 6) || "password isnot strong ",
        (v) => /(?=.*\d)(?=.*[A-z])/.test(v) || "password isnot strong ",
      ],
      repassword: "",
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
      phone: "",
      phoneRules: [
        (v) => !!v || "phone number is required",
        (v) =>
          (v && v.length >= 11) ||
          "phone number is not valit strong start whit 09 ",
        (v) => /^09/.test(v) || "E-mail must be valid",
      ],
      address: "",
      addressrules: [(v) => !!v || " address is required"],
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

  methods: {
    async sub() {
      try {
        const user = {
          name: this.name,
          lname: this.lname,
          email: this.email,
          password: this.password,
          phone: this.phone,
          address: this.address,
        }
        await this.$store.dispatch("user/submit", user)
        this.snake = true
        this.mess = `you successfuly joind us`
        this.$router.push("/login")
      } catch (e) {
        this.snake = true
        this.ali = "mmd"
        this.mess = e.response.data
        console.log(e.response.data)
      }
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
      this.ali = ""
    },
  },
}
</script>

<style scoped>
.maind {
  margin: 25px;
  padding: 15px;
}
.mmd {
  border: 0.5px solid red;
}
</style>