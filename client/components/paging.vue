<template>
  <div class="text-center">
    <v-pagination
      v-model="pag"
      :length="length"
      :total-visible="5"
    ></v-pagination>
  </div>
</template> 

<script>
export default {
  props: {
    page: String,
    length: String,
  },
  data() {
    return {
      pag: this.page,
    }
  },
}
</script>