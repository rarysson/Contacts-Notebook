<template>
  <form @submit.prevent="sendSearch">
    <input v-model.trim="searchTerm" type="text" placeholder="Filtrar por..." />

    <select v-model="searchOption">
      <optgroup label="Pessoa">
        <option value="person">Nome</option>
      </optgroup>
      <optgroup label="Empresa">
        <option value="company">Categoria</option>
      </optgroup>
    </select>

    <button class="primary" type="submit">
      <i
        class="fa fa-search fa-lg fa-flip-horizontal"
        aria-label="pesquisar"
      ></i>
    </button>
  </form>
</template>

<script>
export default {
  name: 'FilterBar',

  data() {
    return {
      searchTerm: '',
      searchOption: 'person',
    }
  },

  methods: {
    sendSearch() {
      if (this.searchTerm) {
        this.$emit('filter', {
          type: this.searchOption,
          value: this.searchTerm,
        })

        this.searchTerm = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@mixin spacing-and-border($left-or-right) {
  border-top-#{$left-or-right}-radius: 7px;
  border-bottom-#{$left-or-right}-radius: 7px;
  padding: 10px 15px;
}

$border: 2px solid $default;

form {
  border: $border;
  border-radius: 10px;
  display: flex;
  transition: all 250ms ease-out;
  width: fit-content;

  input {
    @include spacing-and-border(left);

    border: none;
  }

  select {
    border: none;
    border-left: $border;
    padding: 0 10px;
    transition: all 250ms;

    &:focus {
      box-shadow: $box-shadow;
    }
  }

  button {
    @include spacing-and-border(right);

    i {
      color: $grey;
    }
  }

  &:focus-within {
    border-color: $primary;
    box-shadow: 0 0 2px $primary;

    select {
      border-color: $primary;
    }
  }
}
</style>
