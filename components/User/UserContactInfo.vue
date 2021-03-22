<template>
  <div class="contact-container">
    <i
      class="fa fa-lg"
      :class="icon"
      :title="tooltip"
      :aria-label="tooltip"
    ></i>
    <p>{{ info }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserContactInfo',

  props: {
    tooltip: {
      type: String,
      required: true,
    },

    info: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>
