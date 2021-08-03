<template>
  <el-card>
    <template v-slot:header>
      <el-row>
        <el-col :span="4">
          <div>左鍵連點 F6</div>
          <span v-if="flags.running" class="running">執行中!</span>
        </el-col>
      </el-row>
    </template>
  </el-card>
</template>

<script>
export default {
  name: "LeftButtonClickPage",
  data() {
    return {
      flags: {
        running: false
      }
    }
  },
  created() {
    if (localStorage.getItem('click-left-button') != null) {
      this.form = JSON.parse(localStorage.getItem('click-left-button'))
    }
    window.ipcRenderer.on('click-left-button', () => {
      this.flags.running = !this.flags.running
      window.ipcRenderer.send('click-left-button')
    })
  },
  methods: {
    reset() {
      this.form = {
        withShift: true,
      }
    }
  }
}
</script>

<style scoped>

</style>