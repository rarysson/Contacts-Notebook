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

    <button type="submit">
      <i
        class="fa fa-search fa-lg fa-flip-horizontal"
        aria-label="pesquisar"
      ></i>
    </button>
  </form>
</template>

<script>
export default {
  name: 'SearchBar',

  data() {
    return {
      searchTerm: '',
      searchOption: 'person',
    }
  },

  methods: {
    sendSearch() {
      if (this.searchTerm) {
        this.$emit('search', {
          type: this.searchOption,
          value: this.searchTerm,
        })
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

@mixin action-effects {
  border: none;
  transition: all 250ms;

  &:focus {
    box-shadow: $box-shadow;
  }
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
    @include action-effects;

    border-left: $border;
    padding: 0 10px;
  }

  button {
    @include spacing-and-border(right);
    @include action-effects;

    background-color: $primary;

    &:hover {
      background-color: adjust-color($color: $primary, $lightness: -10%);
    }

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
