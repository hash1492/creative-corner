<template>
  <div class="featured-products-list-component">
    <h3>Featured Products List</h3>
    <div class="container">
      <featured-products class="featured-products-carousel"></featured-products>
      <div class="form-group">
        <button type="button" class="btn btn-info" @click="addProduct">Add Product</button>
      </div>
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Order</th>
            <th>Image</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.order }}</td>
            <td>
              <img class="product-img" :src="product.img">
            </td>
            <td>{{product.description}}</td>
            <td>
              <button
                type="button"
                class="btn btn-warning action-btn"
                @click="editProduct(product)"
              >Edit</button>
              <button
                type="button"
                class="btn btn-danger action-btn"
                @click="removeProduct(product)"
              >Delete</button>
            </td>
          </tr>
          <tr v-if="!products.length">
            <td colspan="4" class="no-products">No Featured Products</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import FeaturedProducts from "./FeaturedProducts";

import * as firebase from "../firebase/config";
const featuredCarouselCollection = firebase.featuredCarouselCollection;

export default {
  data() {
    return {
      products: []
    };
  },
  components: {
    FeaturedProducts
  },
  created() {
    var self = this;
    featuredCarouselCollection.get().then(function(querySnapshot) {
      const products = [];
      querySnapshot.forEach(doc => {
        const product = {
          ...doc.data(),
          firebaseId: doc.id
        };
        products.push(product);

        const orderProducts = (a, b) => {
          if (a.order > b.order) {
            return 1;
          } else {
            return -1;
          }
        };

        self.products = products.sort(orderProducts);
      });
    });
  },
  methods: {
    removeProduct(product) {
      const response = confirm('Are you sure you want to delete?')
      if(response) {
        var self = this
        featuredCarouselCollection.doc(product.firebaseId)
        .delete().then(function () {
          console.log('Document successfully deleted!')
          alert('Product has been removed from featured products!');
          self.$router.go()
        }).catch(function (error) {
          console.error('Error removing document: ', error)
        })
      }
    },
    editProduct(product) {
      console.log(product);
      this.$router.push({name: 'EditFeaturedProduct', params: {product_id: product.id}})
    },
    addProduct() {
      this.$router.push({name: 'AddFeaturedProduct'});
    },
  }
};
</script>

<style lang="scss" scoped>
.featured-products-list-component {
  margin-top: 100px;
  .product-img {
    width: 100px;
  }

  table {
    margin-top: 50px;
  }

  .action-btn {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .featured-products-carousel {
    margin-bottom: 50px;
  }
}
</style>
