<template>
  <div class="add-product-component container">
    <div class="add-product">
      <form class="form-add-product">
        <div class="form-fields">
          <div class="input-fields">
            <div class="form-group">
              <label>Product Name</label>
              <input type="text" v-model="product.name" class="form-control" placeholder="Product Name">
            </div>
            <div class="form-group">
              <label>Product Description</label>
              <textarea type="text" v-model="product.description" rows="5" class="form-control" placeholder="Product Description"></textarea>
            </div>
            <div class="form-group">
              <label>Product Price</label>
              <input type="number" class="form-control" v-model="product.price">
            </div>

            <div class="form-group">
              <label>Category</label>
              <select v-model="product.category" class="form-control">
                <option value="" selected>Select Category</option>
                <option v-for="category in categories" :key="category.code" :value="category.name">{{ category.name }}</option>
                <!-- <option value="Trendy Jewellery">Trendy Jewellery</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Earrings">Earrings</option>
                <option value="Bangles">Bangles</option>
                <option value="Candle Holders">Candle Holders</option>
                <option value="Latkans">Latkans</option>
                <option value="Quilled Envelopes">Quilled Envelopes</option>
                <option value="Buttons">Buttons</option>
                <option value="Wooden Necklace Set">Wooden Necklace Set</option>
                <option value="Trendy Earrings">Trendy Earrings</option> -->
              </select>
            </div>

            <div class="form-group">
              <label>Subcategory</label>
              <select v-model="product.subcategory" class="form-control">
                <option value="" selected>Select Subcategory</option>
                <option v-for="subcategory in subcategories" :key="subcategory" :value="subcategory">{{ subcategory }}</option>
              </select>
            </div>
          </div>

          <div class="image-container">
            <img class="uploaded-product-img" v-for="(img, index) in product.imgs" :key="index" v-show="showProductImg" :src="img" alt="Product image appears here">
            <input id="images-input" class="image-upload-input" multiple type="file" v-on:change='uploadImage($event.target.name, $event.target.files)' accept="image/*">
          </div>
        </div>
        <div class="form-group">
          <button type="button" @click="clearImages" class="btn btn-info" :disabled="!product.imgs.length">Clear Images</button>
        </div>
        <div class="form-group">
          <button type="button" v-if="!editMode" @click="addProduct" class="btn btn-info">Add Product</button>
        </div>
        <div v-if="editMode">
          <div class="form-group">
            <button type="button" @click="updateProduct" class="btn btn-info">Update Product</button>
          </div>
          <div class="form-group">
            <button type="button" @click="deleteProduct" class="btn btn-danger" >Delete</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import * as firebase from '../firebase/config'
import uuidv4 from 'uuid/v4'

var productsCollection = firebase.productsCollection
var categoriesCollection = firebase.categoriesCollection
var firebaseStorage = firebase.firebaseStorage

export default {
  data() {
    return {
      product: {
        category: '',
        imgs: []
      },
      categories: [],
      showProductImg: false,
      editMode: false
    }
  },
  computed: {
    subcategories() {
      if(!this.categories.length) {
        return [];
      }
      const activeCategory = this.categories.find(category => {
        return category.name === this.product.category;
      })
      console.log(activeCategory)
      if(!activeCategory || (!activeCategory.subcategories)){
        delete this.product.subcategory;
        return [];
      }
      return activeCategory.subcategories;
    }
  },
  created: function () {
    var self = this
    categoriesCollection.get().then(querySnapshot => {
      const categories = [];
      querySnapshot.forEach(doc => {
        const category = {
          ...doc.data(),
          firebaseId: doc.id
        };
        self.categories.push(category);
      });
    });


    // Edit mode
    if(this.$route.params.product_id) {
      this.editMode = true
      productsCollection.where("id", "==", this.$route.params.product_id)
      .get()
      .then(function(querySnapshot) {
        console.log(querySnapshot);
        if(querySnapshot.empty) {
          self.$router.push({name: 'GenericError'})
          return
        }
        querySnapshot.forEach(function(doc) {
            self.product = doc.data();
            self.product.firebaseId = doc.id;
            self.showProductImg = true;
        });
        console.log(self.product);
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }
  },
  methods: {
    uploadImage(target, files) {
      console.log(files);
      var self = this
      self.showProductImg = false
      const promises = [];
      for(let i=0; i<files.length; i++) {
        var selectedFile = files.item(i);
        console.log(selectedFile);
        var storageRef = firebaseStorage.ref('/productImages/' + selectedFile.name)
        var uploadTask = storageRef.put(selectedFile)
        promises.push(uploadTask);
        uploadTask.on('state_changed', snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
        }, error => {
          // Handle unsuccessful uploads
        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        });
      }

      Promise.all(promises).then((uploadtaskSnapshots) => {
        console.log(uploadtaskSnapshots);
        uploadtaskSnapshots.forEach(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            self.showProductImg = true;
            self.product.imgs.push(downloadURL);
          });
        });
      });
    },
    clearImages() {
      this.product.imgs = [];
      document.getElementById('images-input').value= null;
    },
    addProduct() {
      console.log(this.product);
      var self = this;
      if(!this.product.name || !this.product.description || !this.product.price || !this.product.category || !this.product.imgs.length) {
        alert('Please complete all fields!')
        return false;
      }
      this.product.id = uuidv4();
      this.product.price = parseInt(this.product.price);
      this.product.createdAt = new Date();
      productsCollection.add(Object.assign({}, this.product))
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
        alert(self.product.name + ' was added successfully')
        self.$router.push({name: 'ProductsList'})
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
    },
    updateProduct() {
      var self = this;
      if(!this.product.name || !this.product.description || !this.product.price || !this.product.category || !this.product.imgs.length) {
        alert('Please complete all fields!')
        return false;
      }

      productsCollection.doc(this.product.firebaseId)
      .update(this.product)
      .then(function() {
          console.log("Document successfully updated!");
          self.$router.push({name: 'ProductsList'})
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    },
    deleteProduct: function () {
      var response = confirm('Are you sure you want to delete?');
      if(response) {
        var self = this
        productsCollection.doc(this.product.firebaseId)
        .delete().then(function () {
          console.log('Document successfully deleted!')
          self.$router.push({name: 'ProductsList'})
        }).catch(function (error) {
          console.error('Error removing document: ', error)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.add-product-component {
  margin-top: 50px;
  .form-add-product {
    max-width: 500px;
  }

  .uploaded-product-img {
    max-width: 500px;
    margin-bottom: 20px;
  }

  .image-upload-input {
    padding: 20px;
  }
}
</style>
