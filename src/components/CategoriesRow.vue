<template>
  <div>
    <div class="categories-row-component">
        <div class="categories-list">
            <a class="category" :href="category.link" v-for="category in categories" :key="category.name">
                <img :src="category.img" alt="">
                <p>{{category.name}}</p>
            </a>
        </div>
    </div>
  </div>
</template>
<script type="text/javascript">

export default {
  name: "CategoriesRow",
  data() {
    return {
        categories: [
            {
                name: 'Earrings',
                img: require('./../assets/earrings.png'),
                link: '/category/earrings'
            },
            {
                name: 'Necklaces',
                img: require('./../assets/necklace.png'),
                link: '/category/necklaces'
            },
            {
                name: 'Bangles',
                img: require('./../assets/bangles.png'),
                link: '/category/bangles'
            }
        ]
    };
  }
};
</script>
<style>
.categories-row-component {
    margin: 30px 0;
}

.categories-list {
    display: flex;
}

.category {
    background-color: #ea0000;
    flex: 1 1 auto;
    border-right: 1px solid #eee;
    color: white;
    cursor: pointer;
    font-weight: bold;
    padding-top: 20px;
}

.category:hover {
    text-decoration: none;
    color: white;
}

.category:hover {
    opacity: 0.8;
}

.category img {
    margin-bottom: 10px;
}

.category p {
    text-transform: uppercase;
}
</style>
