<template>
  <div>
    <div class="categories-row-component">
        <div class="categories-list">
            <a class="category" :href="category.link" v-for="category in categories" :key="category.name">
                <img :src="category.img" alt="">
                <p>{{category.name}}</p>
            </a>
        </div>
    </div>
  </div>
</template>
<script type="text/javascript">

export default {
  name: "CategoriesRow",
  data() {
    return {
        categories: [
            {
                name: 'Necklaces',
                img: require('./../assets/necklace.png'),
                link: '/category/necklaces'
            },
            {
                name: 'Earrings',
                img: require('./../assets/earrings.png'),
                link: '/category/earrings'
            },
            {
                name: 'Bangles',
                img: require('./../assets/bangles.png'),
                link: '/category/bangles'
            }
        ]
    };
  }
};
</script>
<style lang="scss">
@import 'node_modules/include-media/dist/include-media';

.categories-row-component {
    margin: 40px 0;

    .categories-list {
    display: flex;
  }

  .category {
      background-color: #eb2188;
      flex: 1 1 auto;
      border-right: 1px solid #eee;
      color: white;
      cursor: pointer;
      font-weight: bold;
      padding-top: 20px;
      transition: background-color 300ms linear;

      &:hover {
      text-decoration: none;
      color: white;
      background-color: #080A52;
    }

    img {
      margin-bottom: 10px;
    }

    p {
      // text-transform: uppercase;
      @include media("<=480px") {
        font-size: 14px;
      }
    }
  }
}
</style>
