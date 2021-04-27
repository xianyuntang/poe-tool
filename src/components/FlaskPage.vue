<template>
  <el-card
  >
    <template v-slot:header>
      <div>喝水快捷 F3 <span v-if="flags.running" class="running">Running!</span></div>
    </template>
    <el-form inline>
      <el-form-item label="按鍵">
        <el-checkbox-group v-model="form.checkedKeys">
          <el-checkbox v-for="key in data.keys"
                       :key="key"
                       :label="key"
                       :value="key"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="間隔">
        <el-input-number
            v-model="form.interval"
            :step="0.1"
            :max="8"
            :min="0.5"
        ></el-input-number>
      </el-form-item>

    </el-form>


  </el-card>
</template>

<script>
export default {
  name: "FlaskPage",
  data() {
    return {
      data: {
        keys: [1, 2, 3, 4, 5]
      },
      form: {
        checkedKeys: [1, 2, 3, 4, 5],
        interval: 3.0
      },
      flags: {
        running: false
      }

    }
  },
  created() {
    if (localStorage.getItem('flask') != null) {
      this.form = JSON.parse(localStorage.getItem('flask'))
    }
    window.ipcRenderer.on('flask', () => {
      this.flags.running = !this.flags.running
      window.ipcRenderer.send('flask', this.form)
    })
  },
  watch: {
    form: {
      deep: true,
      handler: function (val) {
        localStorage.setItem('flask', JSON.stringify(val))
      }
    }
  }

}
</script>

<style scoped>
.running {
  color: #F56C6C;
}
</style>