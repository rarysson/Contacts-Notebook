<template>
  <transition name="modal">
    <div v-if="value" class="overlay" @click.self="closeModal">
      <div class="modal">
        <button @click="closeModal">
          <i class="fa fa-times fa-lg" aria-label="fechar modal"></i>
        </button>

        <div class="info-user-container">
          <img :src="userData.avatar" alt="avatar" />

          <div class="info-user">
            <p class="name">{{ userData.name }}</p>

            <div class="contacts-container">
              <UserContactInfo
                class="contact-info"
                :info="userData.username"
                icon="fa-user-o"
                tooltip="Username"
              />
              <UserContactInfo
                class="contact-info"
                :info="userData.email"
                icon="fa-envelope-o"
                tooltip="Email"
              />
              <UserContactInfo
                class="contact-info"
                :info="userData.phone"
                icon="fa-phone"
                tooltip="Telefone"
              />
              <UserContactInfo
                class="contact-info"
                :info="userData.website"
                icon="fa-globe"
                tooltip="Website"
              />
            </div>
          </div>
        </div>

        <div class="extra-info-container address">
          <i
            class="fa fa-address-card-o fa-3x"
            title="Endereço residencial"
            aria-label="endereço residencial"
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

        <UserCompanyInfo
          class="company-info"
          :company-name="userData.company.name"
          :categories="userData.company.bs"
        />
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
  min-height: 100vh;
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
  margin: 10px;
  padding: 25px;
  position: relative;
  row-gap: 75px;
  transition: all 0.3s;
  max-width: 720px;

  @media screen and (max-width: 600px) {
    grid-template:
      'header' 125px
      'address' 1fr
      'company' 1fr;
    height: auto;
  }

  @media screen and (max-width: 450px) {
    grid-template:
      'header' 1fr
      'address' 125px
      'company' 125px;
    row-gap: 10px;
  }
}

.modal-enter .modal,
.modal-leave-active .modal {
  transform: scale(0);
}

button {
  background-color: white;
  border-top-right-radius: 10px;
  height: 40px;
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;

  i {
    color: $default;
  }

  &:hover {
    background-color: $default;

    i {
      color: white;
    }
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

      .contact-info {
        flex-basis: 50%;
        margin: 0;
        padding: 5px 0;

        @media screen and (max-width: 600px) {
          flex-basis: 100%;
        }
      }
    }
  }

  @media screen and (max-width: 450px) {
    flex-direction: column;
    margin-bottom: 10px;

    img {
      height: 100px;
      margin: 0 auto 10px;
      width: 100px;
    }

    .info-user .name {
      font-size: rem(22);
      margin-bottom: 10px;
      text-align: center;
    }
  }
}

.address {
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

.company-info {
  grid-area: company;

  &::v-deep {
    h2 {
      font-size: rem(18);
    }

    .category {
      max-width: 200px;
    }
  }
}
</style>
