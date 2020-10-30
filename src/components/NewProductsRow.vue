<template>
  <div class="new-products-row">
    <a class="product-category">
      <span>Newly Added</span>
    </a>
    <hr />
    <div class="products-row">
      <product-thumbnail
        v-for="product in products"
        :key="product.id"
        :product="product"
      ></product-thumbnail>
    </div>
  </div>
</template>

<script>
import ProductsRow from "./ProductsRow";
import ProductThumbnail from "./ProductThumbnail";

import * as firebase from "../firebase/config";
const productsCollection = firebase.productsCollection;

export default {
  components: {
    ProductsRow,
    ProductThumbnail
  },
  props: {
    category: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      products: []
    };
  },
  created() {
    var self = this;
    
    productsCollection
      .orderBy("createdAt", "desc")
      .limit(3)
      .get()
      .then(function(querySnapshot) {
        console.log(querySnapshot);
        
        querySnapshot.forEach(function(doc) {
          self.products.push(doc.data());
        });
        console.log(self.products);
      });
  }
};
</script>

<style lang="scss" scoped>
@import "node_modules/include-media/dist/include-media";
.new-products-row {
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
