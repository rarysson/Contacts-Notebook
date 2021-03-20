<template>
  <div class="app">
    <header>
      <Logo class="logo" />
      <SearchBar class="search-bar" />
    </header>
  </div>
</template>

<script>
import { getUsers } from '@/utils/api'

export default {
  name: 'App',

  data() {
    return {
      users: [],
    }
  },

  async beforeMount() {
    this.users = await getUsers()
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
</style>
