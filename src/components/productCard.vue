<template>
  <v-card>
    <v-img
      class="cursor-pointer"
      cover
      height="300"
      :src="image"
      @click="$router.push('/product/' + item.product._id)"
    />
    <v-card-title>
      <router-link class="text-decoration-none text-white" :to="'/product/' + _id">{{
        name
      }}</router-link>
    </v-card-title>
    <v-card-subtitle>{{ category }} / {{ price }}</v-card-subtitle>
    <v-card-text>{{ description }}</v-card-text>
  </v-card>
</template>

<script setup>
defineProps(['_id', 'image', 'name', 'category', 'price', 'description'])
</script>
