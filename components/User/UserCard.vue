<template>
  <article>
    <img :src="userData.avatar" alt="avatar" />

    <h1>{{ userData.name }}</h1>

    <div class="contact-container">
      <i class="fa fa-envelope-o fa-lg" aria-hidden="true"></i>
      <p>{{ userData.email }}</p>
    </div>

    <div class="contact-container">
      <i class="fa fa-phone fa-lg" aria-hidden="true"></i>
      <p>{{ userData.phone }}</p>
    </div>

    <div class="extra-info-container">
      <i class="fa fa-building-o fa-3x" aria-hidden="true"></i>

      <section class="extra-info">
        <h2>{{ userData.company.name }}</h2>

        <div class="categories-container">
          <p
            v-for="(category, index) in categoriesCompany"
            :key="`${category}-${index}`"
            class="category"
          >
            {{ category }}
          </p>
        </div>
      </section>
    </div>

    <button class="primary" @click="openModal = true">Ver mais</button>

    <UserCardModal v-model="openModal" :user-data="userData" />
  </article>
</template>

<script>
export default {
  name: 'UserCard',

  props: {
    userData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      openModal: false,
    }
  },

  computed: {
    categoriesCompany() {
      return this.userData.company.bs.split(' ')
    },
  },
}
</script>

<style lang="scss" scoped>
article {
  background: $gradient;
  border: 3px solid $default;
  border-radius: 10px;
  height: 375px;
  margin-top: 50px;
  padding: 60px 15px 15px;
  position: relative;
  width: 250px;

  h1 {
    font-size: rem(18);
    font-weight: bold;
    margin-bottom: 25px;
    text-align: center;
  }

  img {
    left: 50%;
    height: 100px;
    position: absolute;
    top: -50px;
    transform: translateX(-50%);
    width: 100px;
  }

  .extra-info-container {
    margin-top: 25px;

    h2 {
      font-size: rem(14);
    }
  }

  button {
    border-radius: 5px;
    bottom: 15px;
    font-size: rem(14);
    left: 50%;
    padding: 5px 25px;
    position: absolute;
    transform: translateX(-50%);
  }
}
</style>
