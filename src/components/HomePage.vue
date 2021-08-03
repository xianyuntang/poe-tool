<template>
  <div>
    <shortcut-page></shortcut-page>
    <div style="margin: 15px 0;"></div>
    <flask-page></flask-page>
    <div style="margin: 15px 0;"></div>
    <middle-button-click-page></middle-button-click-page>
    <div style="margin: 15px 0;"></div>
    <arrange-inventory-page></arrange-inventory-page>
    <div style="margin: 15px 0;"></div>
    <left-button-click-page></left-button-click-page>
  </div>
</template>

<script>
import ShortcutPage from "@/components/ShortcutPage";
import FlaskPage from "@/components/FlaskPage";
import ArrangeInventoryPage from "@/components/ArrangeInventoryPage";
import LeftButtonClickPage from "./LeftButtonClickPage";
import MiddleButtonClickPage from "./MiddleButtonClickPage";

export default {
  name: "HomePage",
  components: {MiddleButtonClickPage, LeftButtonClickPage, ArrangeInventoryPage, FlaskPage, ShortcutPage}
}
</script>

<style scoped>

</style>