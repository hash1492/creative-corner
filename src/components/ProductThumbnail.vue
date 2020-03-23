<template>
  <div class="product-thumbnail-component">
    <div class="product-thumbnail" @click="goToProduct">
      <img class="product-image" :src="product.img" alt>
      <div class="product-details">
        <p class="product-name">{{product.name}}</p>
        <p class="product-price">₹ {{product.price}}</p>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "ProductThumbnail",
  props: ['product'],
  methods: {
    goToProduct: function () {
      this.$router.push({name: 'ProductDetail', params: {product_id: this.product.id}})
    }
  }
};
</script>
<style lang="scss">
.product-thumbnail-component {
  .product-thumbnail {
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;

    &:hover {
      opacity: .8;
    }
  }

  .product-image {
    width: 100%;
    object-fit: cover;
  }
  .product-details {
    padding: 10px;
  }
  .product-price {
    color: #eb2188;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 16px;
    font-family: 'Handlee', cursive;
  }

  .product-name {
    margin-bottom: 0;
    font-family: 'Handlee', cursive;
    font-size: 20px;
  }
}
</style>
