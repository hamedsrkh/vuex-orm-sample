<template>
  <v-parallax
    dark
    :src="image"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <h1 class="text-h4 font-weight-thin mb-4">
          This is a test app
        </h1>
        <h4 class="subheading">
          ham.sarkhosh@gmail.com
        </h4>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
import image from "@/assets/images/vbanner.jpg"
export default {
  name: "Home",
  data(){
    return {
      image: image
    }
  }
};
</script>
