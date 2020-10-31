<template>
  <div class="category-products-component container">
    <h3 class="category-name" v-if="category">
      <span>{{activeSubcategory}}</span>
      {{category.name}}
    </h3>
    <hr />
    <div v-if="loaded">
      <div v-if="orderedProducts.length > 0">
        <div class="filter-sort-component">
          <div class="subcategories">
            <div
              class="subcategory"
              v-for="(subcategory, index) in category.subcategories"
              :key="index"
              @click="setActiveSubcategory(subcategory)"
              :class="{'active-subcategory': activeSubcategory === subcategory}"
            >{{subcategory}}</div>
            <button
              v-if="category.subcategories && category.subcategories.length"
              type="button"
              class="btn clear-button"
              @click="setActiveSubcategory()"
              :disabled="!activeSubcategory"
            >Clear</button>
          </div>
          <div class="sort-component">
            Sort By
            <select v-model="sortBy">
              <option value="price_desc">Price: High - Low</option>
              <option value="price_asc">Price: Low - High</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
        <div class="category-products">
          <product-thumbnail
            :product="product"
            v-for="product in orderedProducts"
            :key="product.id"
          ></product-thumbnail>
        </div>
      </div>
      <div v-else>No products in this category</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import ProductThumbnail from "./ProductThumbnail";
import * as firebase from "../firebase/config";

const productsCollection = firebase.productsCollection;
const categoriesCollection = firebase.categoriesCollection;

export default {
  name: "CategoryProducts",
  components: {
    ProductThumbnail
  },
  computed: {
    orderedProducts() {
      if (!this.products || this.products.length === 0) {
        return [];
      }
      function sortByPrice(a, b) {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
      }

      function sortByNewest(a, b) {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      }

      let orderedProducts = this.products.slice();
      if (this.sortBy === "price_asc" || this.sortBy === "price_desc") {
        orderedProducts.sort(sortByPrice);
        orderedProducts =
          this.sortBy === "price_asc"
            ? orderedProducts
            : orderedProducts.reverse();
      } else {
        orderedProducts.sort(sortByNewest);
      }

      if (this.activeSubcategory) {
        orderedProducts = orderedProducts.filter(product => {
          return product.subcategory === this.activeSubcategory;
        });
      }

      return orderedProducts;
    }
  },
  data() {
    return {
      products: [],
      category: null,
      activeSubcategory: null,
      sortBy: "newest",
      loaded: false
    };
  },
  created() {
    console.log(this.$route.params);
    var self = this;

    if (this.$route.params.subcategory) {
      this.activeSubcategory = this.$route.params.subcategory;
    }
    categoriesCollection.get().then(querySnapshot => {
      const categories = [];
      querySnapshot.forEach(doc => {
        const category = {
          ...doc.data(),
          firebaseId: doc.id
        };
        categories.push(category);
      });

      self.category = categories.find(category => {
        return category.code == this.$route.params.category_id;
      });

      if (!self.category) {
        self.$router.push({ name: "GenericError" });
        return;
      }

      productsCollection
        .where("category", "==", self.category.name)
        .get()
        .then(function(querySnapshot) {
          console.log(querySnapshot);
          querySnapshot.forEach(function(doc) {
            self.products.push(doc.data());
          });
          self.loaded = true;
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
  methods: {
    setActiveSubcategory(subcategory) {
      if (!subcategory) {
        this.$router.push({
          name: "CategoryProducts",
          params: { category_id: this.category.code }
        });
      }
      console.log(subcategory);
      this.activeSubcategory = subcategory;

      this.$router.push({
        name: "CategoryProducts",
        params: { category_id: this.category.code, subcategory: subcategory }
      });
    }
  }
};
</script>
<style lang="scss">
@import "node_modules/include-media/dist/include-media";

.category-products-component {
  margin-top: 50px;

  .clear-button {
    border-radius: 50px;
    background-color: #aaa;
    color: white;
    font-weight: bold;
    height: 44px;

    &:hover {
      color: white;
    }
  }

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

  .subcategories {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 10px;

    .subcategory {
      padding: 10px;
      background: #17a2b8;
      color: white;
      cursor: pointer;
      margin-right: 10px;
      border-radius: 50px;
      margin-bottom: 10px;

      &.active-subcategory {
        background-color: maroon;
      }

      &:hover {
        opacity: 0.9;
      }
    }
  }

  .filter-sort-component {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
    @include media("<=480px") {
      flex-direction: column;
    }
    .sort-component {
      display: inline-block;
      font-weight: bold;

      select {
        border: 1px solid #aaa;
        border-radius: 5px;
        padding: 5px;
      }
    }
  }
}
</style>
