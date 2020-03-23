<template>
  <div class="home-component">

    <div class="search-component container">
      <div class="form-group">
        <input type="text" class="form-control search-input" v-model="searchText" name="search-input" placeholder="Search product...">
      </div>
      <div class="search-results" v-if="searchText">
        <div class="search-result" v-for="product in searchedProducts" :key="product.id">
          <img :src="product.img" alt="">
          <span   @click="viewProduct(product)">{{ product.name }}</span>
        </div>
        <span class="search-result" v-if="searchedProducts.length === 0">No product found</span>
      </div>
    </div>
    <featured-products></featured-products>
    <div class="container">
      <!-- <categories-row></categories-row> -->
      <products-row v-for="config in productRowConfigs" :key="config.category.name" :config="config"></products-row>
    </div>
    
  </div>
</template>
<script type="text/javascript">
import CategoriesRow from "./CategoriesRow";
import ProductsRow from "./ProductsRow";
import FeaturedProducts from "./FeaturedProducts";

import * as firebase from "../firebase/config";
const productsCollection = firebase.productsCollection;

export default {
  name: "Home",
  components: {
    CategoriesRow,
    ProductsRow,
    FeaturedProducts
  },
  data() {
    return {
      searchText: "",
      productRowConfigs: [
        {
          category: {
            name: "Necklaces",
            link: "/category/necklaces"
          },
          products: []
        },
        {
          category: {
            name: "Earrings",
            link: "/category/earrings"
          },
          products: []
        },
        {
          category: {
            name: "Bangles",
            link: "/category/bangles"
          },
          products: []
        },
        {
          category: {
            name: "Candle Holders",
            link: "/category/candle-holders"
          },
          products: []
        },
        {
          category: {
            name: "Latkans",
            link: "/category/latkans"
          },
          products: []
        },
        {
          category: {
            name: "Quilled Envelopes",
            link: "/category/quilled-envelopes"
          },
          products: []
        }
      ],
      allProducts: []
    };
  },
  computed: {
    searchedProducts() {
      if (!this.searchText) {
        return [];
      }

      const searchedProducts = this.allProducts.filter(product => {
        return product.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
      });
      return searchedProducts;
    }
  },
  created() {
    var self = this;
    this.productRowConfigs.forEach((productRow) => {
      productsCollection
        .where("category", "==", productRow.category.name)
        .get()
        .then(function(querySnapshot) {
          console.log(querySnapshot);
          
          querySnapshot.forEach(function(doc) {
            self.allProducts.push(doc.data());
            productRow.products.push(doc.data());
          });
        });
    });
  },
  methods: {
    viewProduct(product) {
      this.$router.push({
        name: "ProductDetail",
        params: { product_id: product.id }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.home-component {
  margin-top: 20px;

  .search-input {
    margin: 0 auto;
    max-width: 500px;
  }
  .search-component {
    margin-bottom: 20px;
    .search-results {
      max-width: 500px;
      margin: 0 auto;
      border: 1px solid lightgray;
      max-height: 310px;
      overflow: scroll;
      background-color: white;
      position: absolute;
      z-index: 1;
      left: 0;
      right: 0;

      .search-result {
        padding: 10px;
        margin: 0;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        text-align: left;


        img {
          width: 50px;
          margin-right: 10px;
        }

        &:hover {
          background-color: #eee;
        }
      }
    }
  }
}
</style>
