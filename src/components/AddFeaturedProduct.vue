<template>
  <div class="add-featured-product-component container">
    <div class="add-featured-product">
      <form class="form-add-featured-product">
        <div class="form-fields">
          <div class="input-fields">
            <div class="form-group">
              <label>Product Description</label>
              <input
                type="text"
                class="form-control"
                v-model="product.description"
              />
            </div>

            <div class="form-group">
              <label>Product Link</label>
              <input type="text" class="form-control" v-model="product.link" />
            </div>

            <div class="form-group">
              <label>Product Order</label>
              <input
                type="number"
                class="form-control"
                v-model="product.order"
              />
            </div>
          </div>

          <div class="image-container">
            <img
              class="uploaded-product-img"
              v-show="showProductImg"
              v-bind:src="product.img"
              alt="Product image appears here"
            />
            <input
              class="image-upload-input"
              type="file"
              v-on:change="uploadImage($event.target.name, $event.target.files)"
              accept="image/*"
            />
          </div>
        </div>
        <div class="form-group">
          <button
            type="button"
            v-if="!editMode"
            @click="addProduct"
            class="btn btn-info"
          >
            Add Product
          </button>
        </div>
        <div v-if="editMode">
          <div class="form-group">
            <button type="button" @click="updateProduct" class="btn btn-info">
              Update Product
            </button>
          </div>
          <div class="form-group">
            <button type="button" @click="deleteProduct" class="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import * as firebase from "../firebase/config";
import uuidv4 from "uuid/v4";

const featuredCarouselCollection = firebase.featuredCarouselCollection;
var firebaseStorage = firebase.firebaseStorage;

export default {
  data() {
    return {
      product: {},
      showProductImg: false,
      editMode: false
    };
  },
  created: function() {
    var self = this;
    // Edit mode
    if (this.$route.params.product_id) {
      this.editMode = true;
      featuredCarouselCollection
        .where("id", "==", this.$route.params.product_id)
        .get()
        .then(function(querySnapshot) {
          console.log(querySnapshot);
          if (querySnapshot.empty) {
            self.$router.push({ name: "GenericError" });
            return;
          }
          querySnapshot.forEach(function(doc) {
            self.product = doc.data();
            self.product.firebaseId = doc.id;
            self.showProductImg = true;
          });
          console.log(self.product);
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
  },
  methods: {
    uploadImage: function(target, files) {
      var self = this;
      self.showProductImg = false;
      var selectedFile = files[0];
      console.log(selectedFile);
      var storageRef = firebaseStorage.ref(
        "/featuredProductImages/" + selectedFile.name
      );
      var uploadTask = storageRef.put(selectedFile);
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        function(error) {
          // Handle unsuccessful uploads
        },
        function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
            self.showProductImg = true;
            self.product.img = downloadURL;
          });
        }
      );
    },
    addProduct() {
      console.log(this.product);
      var self = this;
      if (
        !this.product.description ||
        !this.product.img ||
        !this.product.link ||
        !this.product.order
      ) {
        alert("Please complete all fields!");
        return false;
      }
      this.product.id = uuidv4();
      this.product.price = parseInt(this.product.price);
      this.product.createdAt = new Date();
      featuredCarouselCollection
        .add(Object.assign({}, this.product))
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          alert("Product was added successfully");
          self.$router.push({ name: "FeaturedProductsList" });
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    updateProduct() {
      var self = this;
      if (
        !this.product.description ||
        !this.product.img ||
        !this.product.link ||
        !this.product.order
      ) {
        alert("Please complete all fields!");
        return false;
      }

      featuredCarouselCollection
        .doc(this.product.firebaseId)
        .update(this.product)
        .then(function() {
          console.log("Document successfully updated!");
          self.$router.push({ name: "FeaturedProductsList" });
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    deleteProduct: function() {
      var response = confirm("Are you sure you want to delete?");
      if (response) {
        var self = this;
        featuredCarouselCollection
          .doc(this.product.firebaseId)
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
            self.$router.push({ name: "ProductsList" });
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.add-featured-product-component {
  margin-top: 50px;
  .form-add-featured-product {
    max-width: 500px;
  }

  .uploaded-product-img {
    max-width: 500px;
  }

  .image-upload-input {
    padding: 20px;
  }
}
</style>
