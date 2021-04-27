<template>
  <div>
    <shortcut-page></shortcut-page>
    <div style="margin: 15px 0;"></div>
    <flask-page></flask-page>
    <div style="margin: 15px 0;"></div>
    <package-page></package-page>
  </div>
</template>

<script>
import ShortcutPage from "@/components/ShortcutPage";
import FlaskPage from "@/components/FlaskPage";
import PackagePage from "@/components/PackagePage";

export default {
  name: "HomePage",
  components: {PackagePage, FlaskPage, ShortcutPage}
}
</script>

<style scoped>

</style>