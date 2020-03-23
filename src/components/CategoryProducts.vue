<template>
  <div class="category-products-component container">
    <h4 class="category-name">{{categoryName}}</h4>
    <hr>
    <div v-if="loaded">
      <div v-if="orderedProducts.length > 0">
        <div class="sort-component">
          Sort By:
          <select v-model="sortBy">
            <option value="price_desc">Price: High - Low</option>
            <option value="price_asc">Price: Low - High </option>
          </select>
        </div>
        <div class="category-products">
          <product-thumbnail :product="product" v-for="product in orderedProducts" :key="product.id"></product-thumbnail>
        </div>
      </div>
      <div v-else>
        No products in this category
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import ProductThumbnail from "./ProductThumbnail";
import * as firebase from "../firebase/config";

const productsCollection = firebase.productsCollection;

export default {
  name: "CategoryProducts",
  components: {
    ProductThumbnail
  },
  computed: {
    orderedProducts() {
      if(!this.products || this.products.length === 0) {
        return [];
      }
      function compare(a, b) {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
      }
      const products = this.products.sort(compare);
      const orderedProducts = this.sortBy === "price_asc" ? products : products.reverse();

      return orderedProducts;
    }
  },
  data() {
    return {
      products: [],
      categoryName: '',
      sortBy: 'price_desc',
      loaded: false
    };
  },
  created() {
    console.log(this.$route.params.category_id);
    
    switch (this.$route.params.category_id) {
      case "necklaces":
        this.categoryName = "Necklaces";
        break;
      case "earrings":
        this.categoryName = "Earrings";
        break;
      case "bangles":
        this.categoryName = "Bangles";
        break;
      case "candle-holders":
        this.categoryName = "Candle Holders";
        break;
      case "latkans":
        this.categoryName = "Latkans";
        break;
      case "quilled-envelopes":
        this.categoryName = "Quilled Envelopes";
        break;
    }

    var self = this;
    productsCollection.where('category','==', this.categoryName)
    .get()
    .then(function (querySnapshot) {
      console.log(querySnapshot);
      
      querySnapshot.forEach(function (doc) {
        console.log(doc);
        
        self.products.push(doc.data())
      })
      self.loaded = true;
    })
  }
};
</script>
<style lang="scss">
@import "node_modules/include-media/dist/include-media";

.category-products-component {
  margin-top: 50px;

  .category-products {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 30px;
    column-gap: 30px;

    @include media("<=tablet") {
      grid-template-columns: 1fr 1fr;
    }

    @include media("<=480px") {
      grid-template-columns: 1fr;
      font-size: 12px;
    }
  }

  .category-name {
    font-family: "Merienda", cursive;
    text-transform: uppercase;
  }

  .sort-component {
    padding: 20px 0;
    text-align: right;

    select {
      border: 1px solid #aaa;
    }
  }
}
</style>
