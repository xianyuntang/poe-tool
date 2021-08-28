<template>
  <el-card>
    <template v-slot:header>
      <el-row>
        <el-col :span="24">
          <div>自動收包 F8</div>
        </el-col>
      </el-row>
    </template>
    <el-form>
      <el-form-item>
        <el-checkbox-group v-model="checkList">
          <el-row v-for="row in 6" :key="row">
            <el-checkbox v-for="col in 12" :key="col" :label="`${row}-${col}`"></el-checkbox>
          </el-row>
        </el-checkbox-group>

      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "ArrangeInventoryPage",
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  data() {
    return {
      checkList: []
    }
  },
  created() {

    window.ipcRenderer.on('arrange-inventory', () => {
      const form = {
        height: this.height,
        width: this.width
      }
      window.ipcRenderer.send('arrange-inventory', form)
    })

  },
}
</script>

<style scoped>
.running {
  color: #F56C6C;
}
</style>