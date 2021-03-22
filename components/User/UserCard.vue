<template>
  <article>
    <img :src="userData.avatar" alt="avatar" />
    <h1>{{ userData.name }}</h1>
    <UserContactInfo
      :info="userData.email"
      icon="fa-envelope-o"
      tooltip="Email"
    />
    <UserContactInfo
      :info="userData.phone"
      icon="fa-phone"
      tooltip="Telefone"
    />
    <UserCompanyInfo
      class="company-info"
      :company-name="userData.company.name"
      :categories="userData.company.bs"
    />
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

  .company-info {
    margin-top: 25px;

    &::v-deep h2 {
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
