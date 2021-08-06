<template>
  <div>
    <el-row :gutter="10" type="flex">
      <el-col :span="12">
        <shortcut-page></shortcut-page>
        <div style="margin: 15px 0;"></div>
        <flask-page></flask-page>
        <div style="margin: 15px 0;"></div>
        <middle-button-click-page></middle-button-click-page>
        <div style="margin: 15px 0;"></div>
        <arrange-inventory-page></arrange-inventory-page>
        <div style="margin: 15px 0;"></div>
        <left-button-click-page></left-button-click-page>
      </el-col>
      <el-col :span="12">
        <search-price-page></search-price-page>
        <div style="margin: 15px 0;"></div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import ShortcutPage from "@/components/ShortcutPage";
import FlaskPage from "@/components/FlaskPage";
import ArrangeInventoryPage from "@/components/ArrangeInventoryPage";
import LeftButtonClickPage from "./LeftButtonClickPage";
import MiddleButtonClickPage from "./MiddleButtonClickPage";
import SearchPricePage from "./SearchPricePage";

export default {
  name: "HomePage",
  components: {
    SearchPricePage,
    MiddleButtonClickPage, LeftButtonClickPage, ArrangeInventoryPage, FlaskPage, ShortcutPage
  }
}
</script>

<style scoped>

</style>