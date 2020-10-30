<template>
  <div class="admin-home">
    <h3>Admin Home</h3>

    <div class="admin-pages-list">
      <a href="/admin/products-list" class="admin-page">Products List</a>

      <a href="/admin/featured-products-list" class="admin-page">Featured Products List</a>

      <a href="/admin/product-messages-list" class="admin-page">Products Messages List</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "node_modules/include-media/dist/include-media";

.admin-home {
  margin-top: 100px;
  .admin-pages-list {
    display: flex;
    flex-direction: row;

    @include media("<=480px") {
      flex-direction: column;
    }

    .admin-page {
      flex: 1;
      background: #17a2b8;
      padding: 50px;
      color: white;
      margin: 20px;
      text-decoration: unset;
      font-family: Arial;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
