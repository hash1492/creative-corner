<template>
  <div>
    <div class="products-row-component">
      <a class="product-category" :href="config.category.link">{{config.category.name}}</a>
      <hr>
      <carousel
        :per-page="3"
        :pagination-enabled="false"
        :navigation-enabled="true">
        <slide v-for="product in config.products" :key="product.img">
          <product-thumbnail :product="product" ></product-thumbnail>
        </slide>
      </carousel>
    </div>
  </div>
</template>
<script type="text/javascript">
import ProductThumbnail from './ProductThumbnail'

export default {
  name: "ProductsRow",
  props: ['config'],
  components: {
    ProductThumbnail
  },
  data() {
    return {

    };
  }
};
</script>
<style>
.products-row-component {
    margin: 30px 0;
}
.product-category {
    display: block;
    text-align: left;
    font-weight: bold;
    margin-bottom: 10px;
    color: #ea0000;
    font-family: 'Merienda', cursive;
    text-transform: uppercase;
}

.product-category:hover {
  text-decoration: none;
  
}

.products-row-component .VueCarousel-navigation-button {
  color: brown !important;
  font-size: 25px;
  top: 45%;
  /* width: 50px;
  height: 50px; */
  /* border-radius: 50%; */
  /* background-color: #eee !important; */
  line-height: 1;
}
</style>
