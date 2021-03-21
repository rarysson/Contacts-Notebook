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

    <div class="company-info-container">
      <i class="fa fa-building-o fa-3x" aria-hidden="true"></i>

      <section class="company-info">
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

    <button @click="openModal = true">Ver mais</button>

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
  background: radial-gradient(circle, white 0%, $grey 100%);
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

  .contact-container {
    align-items: center;
    display: flex;
    margin: 15px 0;

    i {
      height: 20px;
      margin-right: 10px;
      width: 20px;
    }

    p {
      font-size: rem(14);
    }
  }

  img {
    background-color: white;
    border: 3px solid $default;
    border-radius: 100%;
    left: 50%;
    height: 100px;
    position: absolute;
    top: -50px;
    transform: translateX(-50%);
    width: 100px;
  }

  .company-info-container {
    display: flex;
    margin-top: 25px;

    i {
      margin-right: 25px;
    }

    .company-info {
      flex: 1;

      h2 {
        font-size: rem(14);
      }

      .categories-container {
        display: flex;
        flex-direction: column;
        margin-top: 10px;

        .category {
          background-color: $default;
          border: 1px solid $default;
          border-radius: 5px;
          color: $grey;
          font-size: rem(12);
          font-weight: bold;
          padding: 2px 5px;
          text-align: center;

          &:not(:last-of-type) {
            margin-bottom: 5px;
          }
        }
      }
    }
  }

  button {
    background-color: $light-blue;
    border: none;
    border-radius: 5px;
    bottom: 15px;
    color: $grey;
    font-size: rem(14);
    left: 50%;
    padding: 5px 25px;
    position: absolute;
    transform: translateX(-50%);

    &:hover {
      background-color: adjust-color($color: $light-blue, $lightness: -10%);
    }

    &:focus {
      box-shadow: 0 0 3px $default;
    }
  }
}
</style>
