<template>
  <div>
    <div class="featured-products-component">
      <!-- <h1>FeaturedProducts</h1> -->
        <carousel 
          :per-page="1"
          :autoplay="true"
          :loop="true"
          :pagination-size="15"
          :pagination-active-color="'brown'"
          :pagination-color="'grey'"
          :pagination-position="'bottom-overlay'">
          <slide v-for="product in products" :key="product.title">
            <img :src="product.img" alt="">
            <!-- <div class="featured-product-info"> -->
              <!-- <h3 class="featured-product-title">{{product.title}}</h3> -->
            <!-- </div>             -->
          </slide>
        </carousel>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "FeaturedProducts",
  data() {
    return {
      slide: 0,
      sliding: null,
      products: [
        {
          img: require("./../assets/product_images/p1.jpg"),
          title: "p1",
          description: ""
        },
        {
          img: require("./../assets/product_images/p2.jpg"),
          title: "p2",
          description: ""
        },
        {
          img: require("./../assets/product_images/p3.jpg"),
          title: "p3",
          description: ""
        }
      ]
    };
  },
  methods: {

  }
};
</script>
<style>
.featured-products-component {
}
.featured-products-component img {
  height: 400px;
  /* width: 800px; */
}

.featured-products-component .carousel-item {
  transition: transform 0.5s;
}

.carousel-item {
  background-color: blueviolet;
}

.featured-product-info {
    position: absolute;
    background-color: blueviolet;
    top: 0;
    width: 30%;
    height: 400px;
    right: 0;
    opacity: 0.8;
}

.featured-product-title {
  background-color: blueviolet;
  opacity: 0.8;
  position: relative;
  bottom: 30px;
  padding: 10px;
}
</style>
