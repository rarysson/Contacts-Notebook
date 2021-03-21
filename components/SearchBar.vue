<template>
  <form @submit.prevent="sendSearch">
    <input
      v-model.trim="searchTerm"
      type="text"
      placeholder="Procurar por..."
    />

    <select v-model="searchOption">
      <optgroup label="Pessoa">
        <option value="name">Nome</option>
      </optgroup>
      <optgroup label="Empresa">
        <option value="category">Categoria</option>
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
      searchOption: 'name',
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

form {
  border: 2px solid $default;
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

    border-left: 2px solid $default;
    padding: 0 10px;
  }

  button {
    @include spacing-and-border(right);
    @include action-effects;

    background-color: $light-blue;

    &:hover {
      background-color: adjust-color($color: $light-blue, $lightness: -10%);
    }

    i {
      color: $grey;
    }
  }

  &:focus-within {
    border-color: $light-blue;
    box-shadow: 0 0 2px $light-blue;

    select {
      border-color: $light-blue;
    }
  }
}
</style>
