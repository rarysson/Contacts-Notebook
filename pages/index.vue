<template>
  <div class="leads">
    <Logo />
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
