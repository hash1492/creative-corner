<template>
  <div class="product-messages-list-component container">
    <div class="product-messages-list">
      <h3>Product Messages List</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Product Name
            </th>
            <th>
              Email
            </th>
            <th>
              Message
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(message, index) in productMessages" :key="message.id">
            <td>{{index + 1}}</td>
            <td>{{message.productName}}</td>
            <td>{{message.email}}</td>
            <td>{{message.message}}</td>
            <td>
              <button type="button" class="btn btn-info action-btn" @click="viewMessage(message)">view</button>
              <button type="button" class="btn btn-danger action-btn" @click="deleteMessage(message)">delete</button>
            </td>
          </tr>
          <tr v-if="!productMessages.length">
            <td colspan="4" class="no-products">No Messages</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import * as firebase from '../firebase/config'
var productMessagesCollection = firebase.productMessagesCollection

export default {
  data() {
    return {
      productMessages: []
    }
  },
  created() {
    var self = this
    productMessagesCollection
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const product = {
          ...doc.data(),
          firebaseId: doc.id
        }
        self.productMessages.push(product)
      })
      console.log(self.productMessages)
    })
  },
  methods: {
    viewMessage(message) {
      console.log(message);
      this.$router.push({name: 'ProductMessageDetail', params: {message_id: message.id}})
    },
    deleteMessage(message) {
      console.log(message);
      
      var response = confirm('Are you sure you want to delete?')
      if(response) {
        var self = this
        productMessagesCollection.doc(message.firebaseId)
        .delete().then(function () {
          console.log('Document successfully deleted!')
          alert('Message has been deleted!');
          self.$router.go()
        }).catch(function (error) {
          console.error('Error removing document: ', error)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.product-messages-list-component {
  margin-top: 100px;

  table {
    text-align: left;
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
