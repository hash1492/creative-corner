<template>
  <div class="recently-viewed-products" v-if="products.length">
    <hr />
    <p class="heading">Recently Viewed</p>
    <div class="products-row">
      <product-thumbnail v-for="product in products.slice(0, limit)" :key="product.imgs[0]" :product="product" ></product-thumbnail>
    </div>
  </div>
</template>
<script>
import ProductThumbnail from './ProductThumbnail'

export default {
  components: {
    ProductThumbnail
  },
  computed: {
    products() {
      let recentlyViewedProducts = JSON.parse(sessionStorage.getItem('recentlyViewedProducts'));
      if(!recentlyViewedProducts) {
        return []
      }

      console.log(recentlyViewedProducts);
      recentlyViewedProducts = recentlyViewedProducts.reverse();
      const filteredProducts = recentlyViewedProducts.filter(product => {
        return product.id !== this.currentProduct.id
      })
      return filteredProducts;
    }
  },
  props: {
    currentProduct: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      limit: 5
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'node_modules/include-media/dist/include-media';
.recently-viewed-products {
  .products-row {
    display: flex;
    flex-direction: row;

    @include media("<=480px") {
      flex-direction: column;
      product-thumbnail {
        img {
          width: 200px;
        }
      }
    }
  }
  
  .heading {
    display: block;
    text-align: left;
    font-weight: bold;
    margin-bottom: 10px;
    color: #eb2188;
    font-family: 'Merienda', cursive;
    text-transform: uppercase;
    &:hover {
      text-decoration: none;
      color: #eb2188;
      opacity: 0.6;
    }
  }

  .product-thumbnail-component {
    margin-right: 20px;
    width: 250px;

    @include media("<=480px") {
      margin-right: 0;
      margin-bottom: 20px;
      width: auto;
    }
  }
}
</style>
