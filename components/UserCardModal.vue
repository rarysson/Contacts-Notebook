<template>
  <transition name="modal">
    <div v-if="value" class="overlay" @click.self="closeModal">
      <div class="modal">
        <button @click="closeModal">
          <i class="fa fa-times fa-lg" aria-hidden="true"></i>
        </button>

        <div class="info-user-container">
          <img :src="userData.avatar" alt="avatar" />

          <div class="info-user">
            <p class="name">{{ userData.name }}</p>

            <div class="contacts-container">
              <div class="contact-container">
                <i class="fa fa-user-o" aria-hidden="true"></i>
                <p class="username">{{ userData.username }}</p>
              </div>

              <div class="contact-container">
                <i class="fa fa-envelope-o fa-lg" aria-hidden="true"></i>
                <p>{{ userData.email }}</p>
              </div>

              <div class="contact-container">
                <i class="fa fa-phone fa-lg" aria-hidden="true"></i>
                <p>{{ userData.phone }}</p>
              </div>

              <div class="contact-container">
                <i class="fa fa-globe-e" aria-hidden="true"></i>
                <p>{{ userData.website }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="address-container">
          <i
            class="fa fa-address-card-o fa-3x"
            title="Endereço residencial"
            aria-hidden="true"
          ></i>

          <div class="address">
            <p class="address-info">
              <span class="address-label">Cidade:</span>
              {{ userData.address.city }}
            </p>
            <p class="address-info">
              <span class="address-label">Rua:</span>
              {{ userData.address.street }}
            </p>
            <p class="address-info">
              <span class="address-label">Apartamento:</span>
              {{ userData.address.suite }}
            </p>
            <p class="address-info">
              <span class="address-label">CEP:</span>
              {{ userData.address.zipcode }}
            </p>
          </div>
        </div>

        <div class="company-info-container">
          <i
            class="fa fa-building-o fa-3x"
            title="Informações da empresa"
            aria-hidden="true"
          ></i>

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
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'UserCardModal',

  props: {
    value: {
      type: Boolean,
      required: true,
    },

    userData: {
      type: Object,
      required: true,
    },
  },

  computed: {
    categoriesCompany() {
      return this.userData.company.bs.split(' ')
    },
  },

  methods: {
    closeModal() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  background-color: rgba(75, 75, 75, 0.75);
  z-index: 1;
  transition: all 0.3s;
}

.modal {
  width: 720px;
  height: 400px;
  position: relative;
  background: radial-gradient(circle, white 0%, $grey 100%);
  border-radius: 10px;
  padding: 25px;
  transition: all 0.3s;
  display: grid;
  grid-template:
    'header header' 125px
    'address company' 1fr / 1fr 1fr;
  row-gap: 75px;
}

.modal-enter .modal,
.modal-leave-active .modal {
  transform: scale(0);
}

button {
  width: 40px;
  height: 40px;
  position: absolute;
  top: -15px;
  right: -15px;
  color: $default;
  background-color: white;
  border: none;
  border-radius: 100%;
  transition: transform 250ms;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    box-shadow: 0 0 3px $default;
  }
}

.info-user-container {
  display: flex;
  grid-area: header;

  img {
    background-color: white;
    border: 3px solid $default;
    border-radius: 100%;
    height: 125px;
    width: 125px;
    margin-right: 25px;
  }

  .info-user {
    flex: 1;

    .name {
      font-size: rem(30);
      font-weight: bold;
      margin-bottom: 15px;
    }

    .contacts-container {
      display: flex;
      flex-wrap: wrap;
    }

    .contact-container {
      align-items: center;
      display: flex;
      flex-basis: 50%;
      padding: 5px 0;

      i {
        height: 20px;
        margin-right: 10px;
        width: 20px;
      }

      p {
        font-size: rem(14);
      }
    }
  }
}

.address-container {
  display: flex;
  grid-area: address;

  i {
    margin-right: 25px;
  }

  .address {
    flex: 1;

    .address-info {
      &:not(:last-of-type) {
        margin-bottom: 5px;
      }

      .address-label {
        font-weight: bold;
      }
    }
  }
}

.company-info-container {
  display: flex;
  grid-area: company;

  i {
    margin-right: 25px;
  }

  .company-info {
    flex: 1;

    h2 {
      font-size: rem(18);
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
        max-width: 200px;

        &:not(:last-of-type) {
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
