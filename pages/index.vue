<template>
  <div class="app">
    <header>
      <Logo class="logo" />
      <SearchBar class="search-bar" />
    </header>

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
    }
  },

  async beforeMount() {
    this.isLoading = true
    this.users = await getUsers()
    this.isLoading = false
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
