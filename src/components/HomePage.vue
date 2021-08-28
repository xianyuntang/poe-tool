<template>
  <div>
    <el-row :gutter="10" type="flex">
      <el-col :span="24">
        <shortcut-page :width="width" :height="height" @updateResolution="handleUpdateResolution"></shortcut-page>
        <div style="margin: 15px 0;"></div>
        <flask-page :width="width" :height="height"></flask-page>
        <div style="margin: 15px 0;"></div>
        <arrange-inventory-page :width="width" :height="height"></arrange-inventory-page>
        <div style="margin: 15px 0;"></div>
        <left-button-click-page :width="width" :height="height"></left-button-click-page>
        <div style="margin: 15px 0;"></div>
        <item-rolling-page :width="width" :height="height"></item-rolling-page>
        <div style="margin: 15px 0;"></div>
        <headhunter-page :width="width" :height="height"></headhunter-page>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import ShortcutPage from "@/components/ShortcutPage";
import FlaskPage from "@/components/FlaskPage";
import ArrangeInventoryPage from "@/components/ArrangeInventoryPage";
import LeftButtonClickPage from "./LeftButtonClickPage";
import ItemRollingPage from "@/components/ItemRollingPage";
import HeadhunterPage from "@/components/HeadhunterPage";

export default {
  name: "HomePage",
  components: {
    HeadhunterPage,
    ItemRollingPage,
    LeftButtonClickPage, ArrangeInventoryPage, FlaskPage, ShortcutPage
  },
  data() {
    return {
      'width': 2560,
      'height': 1440,
    }
  },
  methods: {
    handleUpdateResolution(form) {
      this.width = form.width
      this.height = form.height
    }
  }
}
</script>

<style scoped>

</style>