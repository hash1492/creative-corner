<template>
  <div class="products-row-component" v-if="config">
    <a class="product-category" :href="config.category.link">
      <span>{{config.category.name}}</span>
      <span class="see-more">See More ></span>
    </a>
    <hr />
    <div class="products-row">
      <product-thumbnail
        v-for="product in someProducts"
        :key="product.img"
        :product="product"
      ></product-thumbnail>
    </div>
    <div
      class="no-products"
      v-if="!config.products || config.products.length === 0"
    >No products in this category</div>
  </div>
</template>
<script type="text/javascript">
import ProductThumbnail from "./ProductThumbnail";

export default {
  name: "ProductsRow",
  props: ["config"],
  components: {
    ProductThumbnail
  },
  computed: {
    someProducts() {
      return this.config.products.slice(0, 3)
    }
  }
};
</script>
<style lang="scss">
@import "node_modules/include-media/dist/include-media";

.products-row-component {
  margin: 30px 0;

  .product-category {
    display: block;
    text-align: left;
    font-weight: bold;
    margin-bottom: 10px;
    color: #eb2188;
    font-family: "Merienda", cursive;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      text-decoration: none;
      color: #eb2188;
      opacity: 0.6;
    }

    .see-more {
      font-size: 12px;
      color: black;
    }
  }

  .products-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 30px;
    column-gap: 30px;

    @include media("<=tablet") {
      grid-template-columns: 1fr 1fr;
    }

    @include media("<=480px") {
      grid-template-columns: 1fr;
    }

    .no-products {
      text-align: center;
    }
  }
}
</style>
