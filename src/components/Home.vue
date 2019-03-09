<template>
  <div>
    <div class="home-component">
      <!-- <featured-products></featured-products> -->
      <categories-row></categories-row>
      <products-row v-for="config in productRowConfigs" :key="config.category.name" :config="config"></products-row>
    </div>
  </div>
</template>
<script type="text/javascript">
import FeaturedProducts from "./FeaturedProducts";
import CategoriesRow from "./CategoriesRow";
import ProductsRow from "./ProductsRow";
export default {
  name: "Home",
  components: {
    FeaturedProducts,
    CategoriesRow,
    ProductsRow
  },
  data() {
    return {
      productRowConfigs: [
        {
          category: {
            name: "Earrings",
            link: "/category/earrings"
          },
          products: [
            {
              img: require('./../assets/product_images/p1.jpg'),
              title: "p1",
              description: 250,
              link: '/product/p1'
            },
            {
              img: "https://via.placeholder.com/280",
              title: "p2",
              description: 350,
              link: '/product/p2'
            },
            {
              img: "https://via.placeholder.com/280",
              title: "p3",
              description: 100,
              link: '/product/p3'
            }
          ]
        },
        {
          category: {
            name: "Bangles",
            link: "/category/bangles"
          },
          products: [
            {
              img: "https://via.placeholder.com/280",
              title: "p1",
              description: 650,
              link: '/product/p1'
            },
            {
              img: "https://via.placeholder.com/280",
              title: "p2",
              description: 750,
              link: '/product/p2'
            },
            {
              img: "https://via.placeholder.com/280",
              title: "p3",
              description: 800,
              link: '/product/p3'
            },
            {
              img: "https://via.placeholder.com/280",
              title: "p4",
              description: 900,
              link: '/product/p4'
            }
          ]
        }
      ]
    };
  }
};
</script>
<style>
.home-component {
  /* margin-top: 50px; */
}
</style>
