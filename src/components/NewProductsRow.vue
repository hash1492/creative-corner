<template>
  <div class="new-products-row">
    <a class="product-category" :href="categoryLink">
      <span>{{category}}</span>
      <span class="see-more">See More ></span>
    </a>
    <hr />
    <div class="products-row">
      <product-thumbnail
        v-for="product in products"
        :key="product.img"
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
  computed: {
    categoryLink() {
      return `/category/${this.category}`
    }
  },
  created() {
    var self = this;
    console.log(this.category);
    
    productsCollection
      .where("category", "==", this.category)
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
</style>
