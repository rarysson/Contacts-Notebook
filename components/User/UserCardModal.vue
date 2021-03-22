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

        <div class="extra-info-container address">
          <i
            class="fa fa-address-card-o fa-3x"
            title="Endereço residencial"
            aria-hidden="true"
          ></i>

          <div class="extra-info">
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

        <div class="extra-info-container company">
          <i
            class="fa fa-building-o fa-3x"
            title="Informações da empresa"
            aria-hidden="true"
          ></i>

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
  background-color: rgba(75, 75, 75, 0.75);
  display: grid;
  height: 100%;
  left: 0;
  place-items: center;
  position: fixed;
  transition: all 0.3s;
  top: 0;
  width: 100%;
  z-index: 1;
}

.modal {
  background: $gradient;
  border-radius: 10px;
  display: grid;
  grid-template:
    'header header' 125px
    'address company' 1fr / 1fr 1fr;
  height: 400px;
  margin: 0 10px;
  padding: 25px;
  position: relative;
  row-gap: 75px;
  transition: all 0.3s;
  width: 720px;
}

.modal-enter .modal,
.modal-leave-active .modal {
  transform: scale(0);
}

button {
  background-color: white;
  border-radius: 100%;
  height: 40px;
  position: absolute;
  right: -15px;
  transition: transform 250ms;
  top: -15px;
  width: 40px;

  i {
    color: $default;
  }

  &:hover {
    transform: scale(1.1);
  }
}

.info-user-container {
  display: flex;
  grid-area: header;

  img {
    height: 125px;
    margin-right: 25px;
    width: 125px;
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
      flex-basis: 50%;
      margin: 0;
      padding: 5px 0;
    }
  }
}

.extra-info-container {
  &.address {
    grid-area: address;

    .address-info {
      &:not(:last-of-type) {
        margin-bottom: 5px;
      }

      .address-label {
        font-weight: bold;
      }
    }
  }

  &.company {
    grid-area: company;

    h2 {
      font-size: rem(18);
    }

    .category {
      max-width: 200px;
    }
  }
}
</style>
