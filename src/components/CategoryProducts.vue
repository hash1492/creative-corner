<template>
  <div>
    <div class="category-products-component">
        <h4 class="category-name">{{categoryName}}</h4>
        <hr>
        <div class="category-products">
          <product-thumbnail :product="product" v-for="product in products" :key="product.img"></product-thumbnail>
        </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import ProductThumbnail from './ProductThumbnail'

  export default {
    name: 'CategoryProducts',
    components: {
      ProductThumbnail
    },
    data() {
      return {
        products: [
          {
            title: 'Pearl earrings',
            description: '250',
            img: 'https://via.placeholder.com/280'
          },
          {
            title: 'Pearl earrings',
            description: '250',
            img: 'https://via.placeholder.com/280'
          },
          {
            title: 'Pearl earrings',
            description: '250',
            img: 'https://via.placeholder.com/280'
          },
          {
            title: 'Pearl earrings',
            description: '250',
            img: 'https://via.placeholder.com/280'
          },
          {
            title: 'Pearl earrings',
            description: '250',
            img: 'https://via.placeholder.com/280'
          },
          {
            title: 'Pearl earrings',
            description: '250',
            img: 'https://via.placeholder.com/280'
          },
          {
            title: 'Pearl earrings',
            description: '250',
            img: 'https://via.placeholder.com/280'
          },
        ],
        categoryName: 'Earrings'
      }
    }
  }
</script>
<style>
.category-products-component {
  margin-top: 50px;
}

.category-products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 30px;
}

  @media only screen and (max-width: 400px) {
    .category-products {
      grid-template-columns: 1fr;
    }

    .product-thumbnail {
      margin-right: 0;
    }

    .category {
      font-size: 12px;
    }
  }

.category-name {
  font-family: 'Merienda', cursive;
  text-transform: uppercase;
}
</style>
