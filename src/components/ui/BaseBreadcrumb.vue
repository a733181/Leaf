<template>
  <nav>
    <ul class="flex gap-6">
      <li>
        <RouterLink to="/">首頁</RouterLink>
      </li>
      <li class="breadcrumb-item">
        <RouterLink to="/products">商店</RouterLink>
      </li>
      <li class="breadcrumb-item">
        {{ name }}
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['name'],
};
</script>

<style scoped>
.breadcrumb-item {
  position: relative;
}
.breadcrumb-item:before {
  content: '';
  background-image: url('../../assets/svg/arrow.svg');
  background-repeat: no-repeat;
  background-position: center center;
  width: 20px;
  height: 20px;
  position: absolute;
  left: -22px;
  top: 3px;
  transform: rotate(180deg);
}
</style>
