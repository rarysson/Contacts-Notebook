<template>
  <div class="extra-info-container">
    <i
      class="fa fa-building-o fa-3x"
      title="Informações da empresa"
      aria-label="informações da empresa"
    ></i>

    <section class="extra-info">
      <h2 title="Nome da empresa">{{ companyName }}</h2>

      <div class="categories-container">
        <p
          v-for="(category, index) in companyCategories"
          :key="`${category}-${index}`"
          class="category"
          title="Categoria da empresa"
        >
          {{ category }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'UserCompanyInfo',

  props: {
    companyName: {
      type: String,
      required: true,
    },

    categories: {
      type: String,
      required: true,
    },
  },

  computed: {
    companyCategories() {
      return this.categories.split(' ')
    },
  },
}
</script>

<style></style>
