<template>
  <div class="app">
    <header>
      <Logo class="logo" />
      <SearchBar class="search-bar" @search="filterUser" />
    </header>

    <section v-if="hasFilters" class="filters-container">
      <h1>Filtrando por</h1>

      <div v-if="filters.person" class="filter-container">
        <p>
          <span class="filter-label">Nome de pessoa:</span> {{ filters.person }}
        </p>
        <button @click="filters.person = ''">
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
      <div v-if="filters.company" class="filter-container">
        <p>
          <span class="filter-label">Categoria da empresa:</span>
          {{ filters.company }}
        </p>
        <button @click="filters.company = ''">
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </section>

    <main>
      <div class="users-container">
        <template v-if="!isLoading">
          <UserCard
            v-for="(user, index) in users"
            :key="`user-${index}`"
            :user-data="user"
          />
        </template>
        <template v-else>
          <UserCardLoading v-for="index in 5" :key="`user-loading-${index}`" />
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import { getUsers } from '@/utils/api'

export default {
  name: 'App',

  data() {
    return {
      users: [],
      isLoading: false,
      filters: {
        person: '',
        company: '',
      },
    }
  },

  computed: {
    hasFilters() {
      return this.filters.person || this.filters.company
    },
  },

  async beforeMount() {
    this.isLoading = true
    this.users = await getUsers()
    this.isLoading = false
  },

  methods: {
    filterUser({ type, value }) {
      this.filters[type] = value
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  border-bottom: 1px solid $border-color;
  justify-content: center;
  padding: 15px 0;
  position: relative;

  .logo {
    left: 0;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
  }
}

.filters-container {
  margin-top: 50px;

  h1 {
    font-size: rem(20);
    margin-bottom: 10px;
  }

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
      border: none;
      padding: 0 10px;
      background-color: $primary;
      color: $grey;
      border-top-right-radius: 7px;
      border-bottom-right-radius: 7px;

      &:hover {
        background-color: adjust-color($color: $primary, $lightness: -10%);
      }

      &:focus {
        box-shadow: $box-shadow;
      }
    }

    &:not(:last-of-type) {
      margin-right: 15px;
    }
  }
}

main {
  margin-top: 50px;

  .users-container {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    justify-items: center;
  }
}
</style>
