<template>
  <div style="padding: 15; margin: 150px">
    <v-card
      elevation="20"
      height="200"
      class="justify-center"
      max-width="800"
      align="center"
    >
      <v-card-text>
        <v-row>
          <v-col md="6" sm="12">
            <h3 display-1 class="text--primary">
              full name : {{ user.name + " " + user.lname }}
            </h3>
          </v-col>
          <br />
          <v-col md="6" sm="12">
            <h3 display-1 class="text--primary">
              phone number :{{ user.phone }}
            </h3>
          </v-col>
        </v-row>

        <v-divider inset></v-divider>
        <v-row>
          <br />
          <v-col md="6" sm="12">
            <h3 display-1 class="text--primary">email :{{ user.email }}</h3>
          </v-col>
          <v-col md="6" sm="12">
            <h3 display-1 class="text--primary">address :{{ user.address }}</h3>
          </v-col>
        </v-row>
      </v-card-text>
      <v-cardActions button class="justify-center">
        <Editeuser
          :id="user._id"
          :addresse="user.address"
          :lnamee="user.lname"
          :namee="user.name"
          :phonee="user.phone"
        />
      </v-cardActions>
    </v-card>
  </div>
</template>
 
  <script>
import Editeuser from "../../components/Editeuser.vue"
export default {
  components: { Editeuser },
  data() {
    return {
      users: [],
    }
  },
  computed: {
    user() {
      return this.$store.state.user.users
    },
  },
  created() {
    this.$store.dispatch("user/getbyID")
    this.users = this.user
  },
}
</script>


