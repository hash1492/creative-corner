<template>
  <div>
    <div class="featured-products-component">
      <flickity ref="flickity" :options="flickityOptions" class="carousel">
        <div class="carousel-cell" v-for="category in categories" :key="category.name">
          <a :href="category.link">
            <img :src="category.img" class="category-img">
            <div class="category-name-container">
              <div class="category-name">{{category.name}}</div>
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
        autoPlay: true,
        autoPlay: 2800,
        imagesLoaded: true
      },
      categories: [
        {
          name: "Necklaces",
          img: require("./../assets/necklaces.jpg"),
          link: "/category/necklaces"
        },
        {
          name: "Earrings",
          img: require("./../assets/earrings.jpg"),
          link: "/category/earrings"
        },
        {
          name: "Bangles",
          img: require("./../assets/bangles.jpg"),
          link: "/category/bangles"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.featured-products-component {
  .carousel {
    .carousel-cell {
      width: 85%;
      margin-right: 10px;
      color: white;

      .category-img {
        width: 100%;
      }

      .category-name {
        color: white;
        font-family: Merienda,cursive;
        font-size: 18px;

        &-container {
          position: relative;
          bottom: 2px;
          padding: 5px;
          background-color: #080a52;
          opacity: 0.7;

          &:hover {
            opacity: 1;
          }
        }
      }

      a:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
