<template>
  <div class="container px-4 mx-auto pt-[130px] lg:pt-[112px]">
    <BaseBreadcrumb name="關於Leaf" />
    <h2 class="mt-3 mb-4 text-2xl font-bold text-center">關於Leaf</h2>
    <ul>
      <li class="flex flex-col items-center justify-center gap-8 mt-9 lg:flex-row">
        <div class="lg:w-[500px]">
          <h3 class="text-xl">提供新鮮蔬菜</h3>
          <p>與在地農夫簽約，不定期採用第三方驗證農產品檢測，保障蔬菜品質。</p>
        </div>
        <img src="@/assets/images/vegetables-g66e81f9e9_640.jpg" alt="新鮮蔬菜" class="w-[500px]" />
      </li>
      <li class="flex flex-col items-center justify-center gap-8 mt-2 lg:flex-row-reverse">
        <div class="lg:w-[500px]">
          <h3 class="text-xl">線上購物免出門</h3>
          <p>24小時線上下單，不用去菜市場及各大賣場人擠人，宅在家即可享受新鮮蔬菜。</p>
        </div>
        <img src="@/assets/images/vegetables-g09edf8c25_640.jpg" alt="新鮮蔬菜" class="w-[500px]" />
      </li>
    </ul>
    <div class="flex flex-col items-center justify-center gap-8 mt-8 lg:flex-row">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.1877067226483!2d120.14985901522495!3d23.381425808687425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346c282c3ffa852d%3A0x874776d98b972ceb!2zNjI15ZiJ576p57ij5biD6KKL6Y6u5paw5YyX5LiJ6KGX!5e0!3m2!1szh-TW!2stw!4v1648554555614!5m2!1szh-TW!2stw"
        loading="lazy"
        class="w-full px-6 lg:px-0 h-[300px] lg:w-[500px]"
      />
      <div>
        <h3 class="text-xl" data-aos="fade-up">聯絡資訊</h3>
        <ul>
          <li class="mb-2">店名：Leaf</li>
          <li class="mb-2">
            <a href="tel:05-3144688">電話：05-3144688</a>
          </li>
          <li class="mb-2">地址：625 嘉義縣布袋鎮新北三街1號</li>
        </ul>
      </div>
    </div>
    <div class="mt-3">
      <h3>圖片 / Icons來源：</h3>
      <ul>
        <li>
          圖片來源：<a href="https://unsplash.com/" class="underline">Unsplash</a>、
          <a href="https://pixabay.com/" class="underline">pixabay</a>
        </li>
        <li>
          Icons來源：<a href="https://www.flaticon.com/" class="underline">flaticon</a>、<a
            href="https://fontawesome.com/"
            class="underline"
            >Font Awesome</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
