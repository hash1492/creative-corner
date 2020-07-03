<template>
  <div class="products-list-component container">
    <div class="products-list">
      <h3>Products List</h3>
      <div class="form-group search-input">
        <input type="text" v-model="searchText" class="form-control" placeholder="Search by Name...">
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-info" @click="addProduct">Add Product</button>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-info" @click="productMessages">Product Messages</button>
        <!-- <button type="button" class="btn btn-info" @click="updateallproducts">Update all products</button> -->
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Image
            </th>
            <th>
              Name
            </th>
            <th>
              Price
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in searchedProducts" :key="product.id">
            <td>{{index + 1}}</td>
            <td>
              <img class="product-img" :src="product.img" @click="viewProduct(product)">
            </td>
            <td>{{product.name}}</td>
            <!-- <td>{{product.category}}</td> -->
            <td>{{product.price}}</td>
            <td>
              <!-- <button type="button" class="btn btn-info action-btn" @click="viewProduct(product)">view</button> -->
              <button type="button" class="btn btn-warning action-btn" @click="editProduct(product)">edit</button>
              <button type="button" class="btn btn-danger action-btn" @click="deleteProduct(product)">delete</button>
            </td>
          </tr>
          <tr v-if="!searchedProducts.length">
            <td colspan="4" class="no-products">No Products</td>
          </tr>
        </tbody>
      </table>
      <!-- <button type="button" class="btn btn-info" @click="loadMoreProducts">Show More</button> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import * as firebase from '../firebase/config'
var productsCollection = firebase.productsCollection
const firebaseDb = firebase.firebaseDb

export default {
  data() {
    return {
      products: [],
      searchText: '',
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    searchedProducts() {
      if(!this.searchText) {
        return this.products;
      }

      const filteredProducts = this.products.filter(product => {
        const productName = product.name.toLowerCase();
        return productName.includes(this.searchText.toLowerCase());
      })

      return filteredProducts;
    }
  },
  created() {
    // Firebase Implementation
    var self = this
    productsCollection
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const product = {
          ...doc.data(),
          firebaseId: doc.id
        }
        self.products.push(product)
      })
    })

    // // Node Implementation
    // axios
    // .get(`http://localhost:3000/products?page=${this.page}&pageSize=${this.pageSize}`)
    // .then(response => {
    //   console.log(response);
    //   this.products = response.data.products;
    // })
  },
  methods: {
    // loadMoreProducts() {
    //   this.page = this.page + 1;
    //   axios
    //   .get(`http://localhost:3000/products?page=${this.page}&pageSize=${this.pageSize}`)
    //   .then(response => {
    //     console.log(response);
    //     this.products = this.products.concat(response.data.products);
    //   })
    // },
    viewProduct(product) {
      console.log(product);
      this.$router.push({name: 'ProductDetail', params: {product_id: product.id}})
    },
    editProduct(product) {
      console.log(product);
      this.$router.push({name: 'EditProduct', params: {product_id: product.id}})
    },
    deleteProduct(product) {
      console.log(product);
      
      var response = confirm('Are you sure you want to delete?')
      if(response) {
        var self = this
        productsCollection.doc(product.firebaseId)
        .delete().then(function () {
          console.log('Document successfully deleted!')
          alert('Product has been deleted!');
          self.$router.go()
        }).catch(function (error) {
          console.error('Error removing document: ', error)
        })
      }
    },
    addProduct() {
      this.$router.push({name: 'AddProduct'});
    },
    productMessages() {
      this.$router.push({name: 'ProductMessagesList'});
    },
    // updateAllProducts() {
    //   productsCollection.get().then(function(querySnapshot) {
    //       querySnapshot.forEach(function(doc) {
    //           doc.ref.update({
    //               createdAt: new Date()
    //           });
    //       });
    //   });
    // }
  }
}
</script>
<style lang="scss" scoped>
.products-list-component {
  margin-top: 100px;

  .product-img {
    cursor: pointer;
    width: 100px;
  }

  table {
    text-align: left;
  }

  .search-input {
    width: 300px;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .action-btn {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .no-products {
    text-align: center;
  }
}
</style>
