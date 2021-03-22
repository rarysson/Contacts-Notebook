<template>
  <div class="filter-container">
    <p>
      <span class="filter-label">{{ optionData.label }}</span>
      {{ optionData.value }}
    </p>
    <button title="Remover filtro" @click="removeFilter">
      <i class="fa fa-times" aria-label="remover filtro"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterOption',

  props: {
    optionData: {
      type: Object,
      required: true,
      validator(value) {
        return value.label && value.value && value.type
      },
    },
  },

  methods: {
    removeFilter() {
      this.$emit('remove-filter', { type: this.optionData.type, value: '' })
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-container {
  border: 1px solid $primary;
  display: inline-flex;
  width: fit-content;
  border-radius: 10px;

  p {
    padding: 5px 10px;

    .filter-label {
      font-weight: bold;
    }
  }

  button {
    padding: 0 10px;
    background-color: $primary;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;

    i {
      color: $grey;
    }

    &:hover {
      background-color: adjust-color($color: $primary, $lightness: -10%);
    }
  }
}
</style>
