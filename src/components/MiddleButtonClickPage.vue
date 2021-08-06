<template>
  <el-card>
    <template v-slot:header>
      <el-row>
        <el-col :span="24">
          <div>中鍵連點 F4</div>
          <span v-if="flags.running" class="running">執行中!</span>
        </el-col>
      </el-row>
    </template>
    <el-form>
      <el-form-item label="間隔(秒)">
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
  name: "MiddleButtonClickPage",
  data() {
    return {
      form: {
        interval: 5,
      },
      flags: {
        running: false
      }
    }
  },
  created() {
    if (localStorage.getItem('click-middle-button') != null) {
      this.form = JSON.parse(localStorage.getItem('click-middle-button'))
    }
    window.ipcRenderer.on('click-middle-button', () => {
      this.flags.running = !this.flags.running
      window.ipcRenderer.send('click-middle-button', this.form)
    })
  },
  watch: {
    form: {
      deep: true,
      handler: function (val) {
        localStorage.setItem('click-middle-button', JSON.stringify(val))
      }
    }
  },
  methods: {
    reset() {
      this.form = {
        interval: 5.
      }
    }
  }
}
</script>

<style scoped>

</style>