<template>
  <div class="text-center">
    <v-snackbar top color="red" v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>


<script>
export default {
  props: {
    message: String,
    open: Boolean,
  },
  data() {
    return {
      snackbar: this.open,
      text: this.message,
      timeout: 3000,
    }
  },
}
</script>