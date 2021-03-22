<template>
  <div class="app">
    <header>
      <Logo class="logo" />
      <FilterBar class="search-bar" @filter="setFilterDataAndFilterUsers" />
    </header>

    <transition name="filters-container">
      <section v-if="hasFilters" class="filters-container">
        <h1>Filtrando por</h1>

        <transition name="filter">
          <FilterOption
            v-if="filters.person"
            class="filter"
            :option-data="{
              label: 'Nome de pessoa:',
              value: filters.person,
              type: 'person',
            }"
            @remove-filter="setFilterDataAndFilterUsers"
          />
        </transition>
        <transition name="filter">
          <FilterOption
            v-if="filters.company"
            class="filter"
            :option-data="{
              label: 'Categoria da empresa:',
              value: filters.company,
              type: 'company',
            }"
            @remove-filter="setFilterDataAndFilterUsers"
          />
        </transition>
      </section>
    </transition>

    <main>
      <transition-group class="users-container" name="cards" tag="div" appear>
        <template v-if="!isLoading && filteredUsers.length > 0">
          <UserCard
            v-for="user in filteredUsers"
            :key="`user-${user.name}`"
            :user-data="user"
          />
        </template>
        <template v-else-if="isLoading">
          <UserCardLoading v-for="index in 5" :key="`user-loading-${index}`" />
        </template>
        <p v-else key="no-result" class="no-result">
          Não existem usuários com os dados requisitados!
        </p>
      </transition-group>
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
      filteredUsers: [],
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
    this.filteredUsers = this.users
    this.isLoading = false
  },

  methods: {
    setFilterDataAndFilterUsers({ type, value }) {
      this.filters[type] = value

      if (type === 'person') {
        this.filterUsersByName()
      } else {
        this.filterUsersByCompanyCategory()
      }
    },

    filterUsersByName() {
      const filterFunc = (user) =>
        user.name.toLowerCase().includes(this.filters.person.toLowerCase())

      if (this.filters.person) {
        this.filteredUsers = this.filters.company
          ? this.filteredUsers.filter(filterFunc) // Filtra os usuários da filtragem por categoria
          : this.users.filter(filterFunc) // Filtra de todos usuários
      } else if (this.filters.company) {
        this.filterUsersByCompanyCategory() // Removeu a filtragem por usuário e restou a por categoria
      } else {
        this.filteredUsers = this.users // Sem filtro
      }
    },

    filterUsersByCompanyCategory() {
      const filterFunc = (user) =>
        user.company.bs.includes(this.filters.company.toLowerCase())

      if (this.filters.company) {
        this.filteredUsers = this.filters.person
          ? this.filteredUsers.filter(filterFunc) // Filtra as categorias da empresa da filtragem dos usuários
          : this.users.filter(filterFunc) // Filtra de todos usuários
      } else if (this.filters.person) {
        this.filterUsersByName() // Removeu a filtragem por categoria e restou a por usuário
      } else {
        this.filteredUsers = this.users // Sem filtro
      }
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

  @media screen and (max-width: 768px) {
    justify-content: flex-end;
  }

  @media screen and (max-width: 550px) {
    justify-content: center;

    .logo {
      display: none;
    }
  }
}

.filters-container {
  margin-top: 50px;

  h1 {
    font-size: rem(20);
    margin-bottom: 10px;
  }

  .filter {
    &:first-of-type {
      margin-right: 15px;
    }

    &:last-of-type {
      margin-top: 15px;
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

  .no-result {
    font-size: rem(24);
    grid-column: 1 / -1;
    margin: 50px 0;
  }
}

.filters-container,
.filter,
.cards {
  &-enter-active,
  &-leave-active {
    transition: all $animation-time;
  }
}

.filters-container,
.cards {
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(-50px);
  }
}

.filter-enter,
.filter-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.cards-move {
  transition: transform $animation-time ease-in-out;
}
</style>
