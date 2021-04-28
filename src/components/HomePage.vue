<template>
  <div>
    <shortcut-page></shortcut-page>
    <div style="margin: 15px 0;"></div>
    <flask-page></flask-page>
    <div style="margin: 15px 0;"></div>
    <arrange-inventory-page></arrange-inventory-page>
  </div>
</template>

<script>
import ShortcutPage from "@/components/ShortcutPage";
import FlaskPage from "@/components/FlaskPage";
import ArrangeInventoryPage from "@/components/ArrangeInventoryPage";

export default {
  name: "HomePage",
  components: {ArrangeInventoryPage, FlaskPage, ShortcutPage}
}
</script>

<style scoped>

</style>