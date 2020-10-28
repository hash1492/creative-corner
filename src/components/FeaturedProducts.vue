<template>
  <div>
    <div class="featured-products-component">
      <flickity ref="flickity" :options="flickityOptions" class="carousel" v-if="products.length > 0">
        <div class="carousel-cell" v-for="(product,index) in products" :key="index">
          <a :href="product.link">
            <img :src="product.img" class="product-img">
            <div class="product-name-container">
              <div class="product-name">{{product.description}}</div>
            </div>
          </a>
        </div>
      </flickity>
    </div>
  </div>
</template>
<script type="text/javascript">
import Flickity from "vue-flickity";
import 'flickity-imagesloaded';
// import 'flickity-fade';

import * as firebase from '../firebase/config';
const featuredCarouselCollection = firebase.featuredCarouselCollection;

export default {
  name: "FeaturedProducts",
  components: {
    Flickity
  },
  data() {
    return {
      flickityOptions: {
        prevNextButtons: true,
        pageDots: true,
        wrapAround: true,
        autoPlay: 2800,
        imagesLoaded: true,
        // fade: true
      },
      products: []
    };
  },
  created() {
    var self = this
    featuredCarouselCollection
    .get()
    .then(function (querySnapshot) {
      const products = [];
      querySnapshot.forEach(doc => {
        const product = {
          ...doc.data(),
        }
        products.push(product);

        const orderProducts = (a, b) => {
          if(a.order > b.order) {
            return 1
          } else {
            return -1
          }
        };

        self.products = products.sort(orderProducts);
      })
    })
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.featured-products-component {
  .carousel {
    .carousel-cell {
      width: 100%;
      margin-right: 10px;
      color: white;

      .product-img {
        width: 100%;

        &:hover {
          opacity: 0.95;
        }
      }

      .product-name {
        color: white;
        font-family: Merienda,cursive;
        font-size: 18px;

        &-container {
          position: relative;
          bottom: 2px;
          padding: 5px;
          background-color: rgba(#080a52, 0.8);
        }
      }

      a:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
