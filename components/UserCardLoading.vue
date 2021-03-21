<template>
  <article>
    <div class="avatar loading"></div>

    <div class="bar loading"></div>
    <div class="bar loading"></div>
    <div class="bar loading"></div>
    <div class="bar loading"></div>
    <div class="bar loading"></div>
  </article>
</template>

<script>
export default {
  name: 'UserCardLoading',
}
</script>

<style lang="scss" scoped>
article {
  background-color: lightgray;
  border: 3px solid $default;
  border-radius: 10px;
  height: 375px;
  margin-top: 50px;
  padding: 60px 15px 15px;
  position: relative;
  width: 250px;

  .loading::after {
    animation: loading 1s infinite;
    background-image: linear-gradient(
      to right,
      transparent,
      white,
      transparent
    );
    background-position-x: -200%;
    background-repeat: no-repeat;
    background-size: 50%;
    content: '';
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
  }

  @keyframes loading {
    100% {
      background-position-x: 200%;
    }
  }

  .avatar {
    left: 50%;
    height: 100px;
    position: absolute;
    top: -50px;
    transform: translateX(-50%);
    width: 100px;
    background-color: lightgray;
    border: 3px solid $default;
    border-radius: 100%;

    &::after {
      border-radius: 100%;
    }
  }

  .bar {
    height: 25px;
    position: relative;
    width: 100%;
    margin: 25px 0;
  }
}
</style>
