<template>
  <div class="dive">
    <VRow class="justify-center">
      <VCard class="align-center" flat width="400">
        <VRow a justify="center">
          <v-btn
            @click="getout"
            color="success"
            class="mr-4 btn"
            style="margin: 12px"
          >
            logout
          </v-btn>

          <v-btn
            :to="{ name: 'index' }"
            color="error"
            style="margin: 12px"
            class="mr-4 btn"
          >
            cancel
          </v-btn>
        </VRow>
      </VCard>
    </VRow>
  </div>
</template>
<script>
export default {
  methods: {
    async getout() {
      try {
        await this.$auth.logout("local")
        alert("loged out")
      } catch (e) {
        console.log(e)
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