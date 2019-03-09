<template>
  <div>
    <div class="product-detail-component">
      <div class="product-details-container">
        <div class="product-img">
          <img src="https://via.placeholder.com/280" alt="">
        </div>
        <div class="product-info">
          <h3 class="product-title">{{product.name}}</h3>
          <p class="product-price">Rs. {{product.price}}</p>
          <hr>
          <p class="product-description">{{product.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">

  export default {
    name: 'ProductDetail',
    data() {
      return {
        product: {
          name: 'Pearl Necklace',
          description: 'This is a beautiful pearl necklace',
          price: 650
        }
      }
    }
  }
</script>
<style>
.product-detail-component {
  margin-top: 80px;
  text-align: left;
}
.product-details-container {
  display: flex;
  flex-direction: row;
}
.product-img img {
  width: 400px;
  height: 400px;
  border: 1px solid #ddd;
}

.product-info {
  margin-left: 30px;
  width: 100%;
}

.product-title {
  font-weight: bold;
  font-family: 'Handlee', cursive;
}

.product-detail-component .product-price {
  color: red;
  font-weight: bold;
  font-size: 25px;
}

.product-description {
  font-family:Georgia, 'Times New Roman', Times, serif
}

@media only screen and (max-width: 400px) {
  .product-details-container {
    flex-direction: column;
  }

  .product-info {
    margin: 20px 0;
  }

  .product-img img {
    width: 100%;
    height: auto;
  }
}
</style>
