<template>
  <div class="product-detail-component container">
    <div class="product-details-container">
      <div class="product-img" @click="toggleImagePreview">
        <img :src="product.img" />
      </div>
      <div class="image-preview" v-if="showImagePreview">
        <span class="close-button" @click="toggleImagePreview">X</span>
        <img :src="product.img" />
      </div>
      <div class="product-info">
        <h3 class="product-title">{{product.name}}</h3>
        <p class="product-price">₹ {{product.price}}</p>
        <hr />
        <p class="product-description">{{product.description}}</p>
        <div class="form-group">
          <button
            type="button"
            class="btn btn-primary"
            @click="showMessageBox = !showMessageBox"
          >Message Seller</button>
        </div>
        <div class="seller-message" v-if="showMessageBox">
          <div class="form-group">
            <label>Name</label>
            <input
              type="text"
              v-model="sellerMessage.name"
              class="form-control"
              placeholder="Enter your name..."
            />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              v-model="sellerMessage.email"
              class="form-control"
              placeholder="Enter your email..."
            />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              v-model="sellerMessage.phoneNumber"
              class="form-control"
              placeholder="Enter your number..."
            />
          </div>
          <div class="form-group">
            <label>Message</label>
            <textarea
              type="text"
              v-model="sellerMessage.message"
              rows="5"
              class="form-control"
              placeholder="Ask something about the product..."
            ></textarea>
          </div>
          <div class="form-group">
            <button
              type="button"
              @click="sendMessage"
              :disabled="sendMsgDisabled"
              class="btn btn-primary"
            >Send</button>
          </div>
        </div>
      </div>
    </div>

    <recently-viewed :currentProduct="product"></recently-viewed>
  </div>
</template>
<script type="text/javascript">
import * as firebase from "../firebase/config";
import uuidv4 from "uuid/v4";
import RecentlyViewed from "./RecentlyViewedProducts";

var productsCollection = firebase.productsCollection;
var productMessagesCollection = firebase.productMessagesCollection;

export default {
  name: "ProductDetail",
  components: {
    RecentlyViewed
  },
  data() {
    return {
      product: {},
      showMessageBox: false,
      sellerMessage: {
        message: "",
        productId: this.$route.params.product_id,
        email: ""
      },
      showImagePreview: false
    };
  },
  computed: {
    sendMsgDisabled() {
      return !this.sellerMessage.name || !this.sellerMessage.phoneNumber || !this.sellerMessage.email || !this.sellerMessage.message
    }
  },
  created() {
    const productId = this.$route.params.product_id;
    var self = this;
    productsCollection
      .where("id", "==", productId)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
          self.$router.push({ name: "GenericError" });
          return;
        }
        querySnapshot.forEach(function(doc) {
          self.product = doc.data();
        });
        console.log(self.product);
        let recentlyViewed =
          JSON.parse(sessionStorage.getItem("recentlyViewedProducts")) || [];
        const filteredProducts = recentlyViewed.filter(product => {
          return product.id !== self.product.id;
        });
        filteredProducts.push(self.product);
        sessionStorage.setItem(
          "recentlyViewedProducts",
          JSON.stringify(filteredProducts)
        );
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  },
  methods: {
    toggleImagePreview() {
      this.showImagePreview = !this.showImagePreview;
    },
    sendMessage() {
      console.log(this.sellerMessage);
      var self = this;
      this.sellerMessage.id = uuidv4();
      this.sellerMessage.productName = this.product.name;
      this.sellerMessage.productImg = this.product.img;
      productMessagesCollection
        .add(Object.assign({}, this.sellerMessage))
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          self.showMessageBox = false;
          self.resetSellerMessage();
          alert("Your message has been sent! We will get back to you soon!");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    resetSellerMessage() {
      this.sellerMessage = {
        message: "",
        productId: this.$route.params.product_id,
        email: ""
      };
    }
  }
};
</script>
<style lang="scss">
@import "node_modules/include-media/dist/include-media";

.product-detail-component {
  margin-top: 80px;
  text-align: left;

  @include media("<=480px") {
    margin-top: 20px;
  }

  .image-preview {
    width: 100%;
    height: 100%;
    z-index: 100;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    overflow: scroll;
    img {
      align-self: center;
      margin: 0 auto;
      width: 100%;
      max-width: 1000px;
    }

    .close-button {
      color: white;
      font-size: 30px;
      padding: 20px;
      cursor: pointer;
      text-align: right;
    }
  }

  .product-details-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 100px;

    @include media("<=480px") {
      flex-direction: column;
    }
  }
  .product-img {
    cursor: pointer;
    img {
      width: 400px;
      border: 1px solid #ddd;
      height: auto;
      border-radius: 5px;

      @include media("<=480px") {
        width: 100%;
      }
    }
  }

  .product-info {
    margin-left: 30px;
    width: 100%;
    @include media("<=480px") {
      margin: 20px 0;
    }
  }

  .product-title {
    font-weight: bold;
    font-family: "Handlee", cursive;
  }

  .product-price {
    color: #eb2188;
    font-weight: bold;
    font-size: 25px;
    font-family: Handlee, cursive;
  }

  .product-description {
    font-family: Georgia, "Times New Roman", Times, serif;
  }
}
</style>
