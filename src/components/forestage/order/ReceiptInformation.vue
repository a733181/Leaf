<template>
  <ul class="p-4 mt-3 mb-5 bg-gray-100 rounded-lg">
    <li class="flex items-center gap-2 mb-2" v-if="order.id">
      <h3 class="text-lg">訂單編號：</h3>
      <p>{{ order.id }}</p>
    </li>
    <li class="flex items-center gap-2 mb-2" v-if="order?.id !== undefined">
      <h3 class="text-lg">付款狀態：</h3>
      <p :class="{ 'text-red-600': !order.is_paid }">
        {{ order.is_paid ? '已付款' : '未付款' }}
      </p>
    </li>
    <li class="flex items-center mb-2">
      <p class="mr-2 text-lg ml-9">姓名：</p>
      <p>{{ order?.user?.name }}</p>
    </li>
    <li class="flex items-center mb-2">
      <p class="mr-2 text-lg ml-9">電話：</p>
      <a :href="'tel:+' + order.phone ?? order.user.tel">
        <p>{{ order?.user?.tel }}</p>
      </a>
    </li>
    <li class="flex items-center mb-2">
      <p class="mr-2 text-lg">電子信箱：</p>
      <a :href="'mailto:' + order.email ?? order.user.email">
        <p>{{ order?.user?.email }}</p></a
      >
    </li>
    <li class="flex items-center mb-2">
      <p class="mr-2 text-lg ml-9">地址：</p>
      <p>{{ order?.user?.address }}</p>
    </li>
    <li class="flex items-center mb-2">
      <p class="mr-2 text-lg ml-9">留言：</p>
      <p>{{ order.message }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
};
</script>
