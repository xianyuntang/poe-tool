<template>
  <el-card>
    <template v-slot:header>
      <el-row>
        <el-col :span="4">
          <div>自動收包 F5</div>
          <span v-if="flags.running" class="running">執行中!</span>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="reset" size="mini">重設</el-button>
        </el-col>
      </el-row>
    </template>
    <el-form inline>
      <el-form-item label="寬">
        <el-input-number
            v-model="form.width"
            :step="10"
        >

        </el-input-number>
      </el-form-item>
      <el-form-item label="高">
        <el-input-number
            v-model="form.height"
            :step="10"
        >

        </el-input-number>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "ArrangeInventoryPage",
  data() {
    return {
      form: {
        width: 1920,
        height: 1080
      },
      flags: {
        running: false
      }
    }
  },
  created() {
    if (localStorage.getItem('arrange-inventory') != null) {
      this.form = JSON.parse(localStorage.getItem('arrange-inventory'))
    }
    window.ipcRenderer.on('arrange-inventory', () => {
      window.ipcRenderer.send('arrange-inventory', this.form)
    })

  },
  watch: {
    form: {
      deep: true,
      handler: function (val) {
        localStorage.setItem('arrange-inventory', JSON.stringify(val))
      }
    }
  },
  methods: {
    reset() {
      this.form = {
        width: 1920,
        height: 1080
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