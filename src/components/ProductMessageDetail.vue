<template>
  <div class="product-message-detail-component container">
    <img class="product-message-detail__img" :src="message.productImg">
    <p>Product ID: {{message.productId}}</p>
    <p>Product Name: {{message.productName}}</p>
    <p>Customer Name: {{message.name}}</p>
    <p>Customer Email: {{message.email}}</p>
    <p>Customer Phone Number: {{message.phoneNumber}}</p>
    <p>Message: {{message.message}}</p>
    <div class="form-group">
      <button type="button" @click="viewProduct" class="btn btn-info">View Product</button>
    </div>
    <div class="form-group">
      <button type="button" @click="deleteMessage" class="btn btn-danger">Delete Message</button>
    </div>
  </div>
</template>
<script>
import * as firebase from '../firebase/config'
var productMessagesCollection = firebase.productMessagesCollection;

export default {
  data() {
    return {
      message: {}
    }
  },
  created() {
    const messageId = this.$route.params.message_id;
    var self = this
    productMessagesCollection.where("id", "==", messageId)
    .get()
    .then(function(querySnapshot) {
      if(querySnapshot.empty) {
        self.$router.push({name: 'GenericError'})
        return
      }
      querySnapshot.forEach(function(doc) {
          self.message = doc.data()
          self.message.firebaseId = doc.id;
      });
      console.log(self.message);
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  },
  methods: {
    viewProduct() {
      this.$router.push({name: 'ProductDetail', params: {product_id: this.message.productId }});
    },
    deleteMessage: function () {
      var response = confirm('Are you sure you want to delete?');
      if(response) {
        var self = this
        productMessagesCollection.doc(this.message.firebaseId)
        .delete().then(function () {
          console.log('Document successfully deleted!')
          self.$router.push({name: 'ProductMessagesList'})
        }).catch(function (error) {
          console.error('Error removing document: ', error)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .product-message-detail-component {
    margin-top: 50px;

    .product-message-detail__img {
      width: 200px;
    }
  }
</style>
