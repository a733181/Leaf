<template>
  <section class="container flex items-center mx-auto justify-content" v-if="allPage">
    <ul class="flex items-center mx-auto">
      <li
        class="border-2 border-[#E5E5E5] rounded mr-3 py-1"
        v-if="currentPage !== 1"
        @click="previousPage()"
      >
        <img
          src="@/assets/arrow.svg"
          alt="previousPage"
          class="w-[30px] h-[30px] hover:opacity-60"
        />
      </li>
      <li
        v-for="number in allPage"
        :key="number"
        class="text-[#646464] border-2 border-[#E5E5E5] rounded py-2 px-3 text-sm mr-2"
        :class="{ 'border-[#65895F]': activePage(number) }"
        @click="changePage(number)"
      >
        {{ number }}
      </li>
      <li
        class="border-2 border-[#E5E5E5] rounded mr-3 py-1"
        v-if="currentPage !== allPage"
        @click="nextPage()"
      >
        <img
          src="@/assets/arrow.svg"
          alt="previousPage"
          class="w-[30px] h-[30px] hover:opacity-60 rotate-180"
        />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    allPage() {
      return this.$store.getters['pagination/allPage'] ?? '';
    },
    currentPage() {
      return this.$store.getters['pagination/currentPage'] ?? '';
    },
  },
  methods: {
    activePage(number) {
      if (number === this.currentPage) {
        return true;
      }
      return false;
    },
    changePage(number) {
      this.$store.dispatch('pagination/setCurrentPage', number);
      this.toTop();
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      this.$store.dispatch('pagination/setCurrentPage', previousPage);
      this.toTop();
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      this.$store.dispatch('pagination/setCurrentPage', nextPage);
      this.toTop();
    },
    toTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>
