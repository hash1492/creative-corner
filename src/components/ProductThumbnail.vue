<template>
  <div>
    <div class="product-thumbnail-component">
      <div class="product-thumbnail" @click="goToProduct">
        <img class="product-image" :src="product.img" alt>
        <div class="product-details">
          <p class="product-name">{{product.title}}</p>
          <p class="product-price">Rs. {{product.description}}</p>
        </div>
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
      this.$router.push({name: 'ProductDetail', params: {product_id: this.product.title}})
    }
  }
};
</script>
<style>
.product-thumbnail-component {
}

.product-thumbnail {
  margin-right: 20px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  width: max-content;
}

.product-image {
  width: 280px;
  height: 280px;
  object-fit: cover;
}
.product-thumbnail:hover {
  opacity: .8;
  /* box-shadow: 0 0 4px 3px rgba(0,0,0,0.15); */
}
.product-details {
    padding: 10px;
}
.product-price {
    color: #ea0000;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 16px;
    font-family: 'Handlee', cursive;
}

.product-name {
    /* font-weight: bold; */
    margin-bottom: 0;
    font-family: 'Handlee', cursive;
    font-size: 20px;
}
</style>
