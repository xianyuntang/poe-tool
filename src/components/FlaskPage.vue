<template>
  <el-card>
    <template v-slot:header>
      <el-row>
        <el-col :span="12">
          <div>自動喝水 F3</div>
          <span v-if="flags.running" class="running">執行中!</span>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="reset" size="mini">重設</el-button>
        </el-col>
      </el-row>


    </template>
    <el-form>
      <el-row
          v-for="(key,index) in form.checkedKeys"
          :key="index"
      >
        <el-row>
          <el-col :span="12">
          <el-form-item :label="`按鍵${key.name}`">

          </el-form-item>

        </el-col>


        </el-row>

        <el-row>
           <el-col :span="4">
          <el-form-item label="啟用">
            <el-checkbox
                v-model="key.checked"

            ></el-checkbox>
          </el-form-item>
        </el-col>
          <el-col :span="20">
          <el-form-item label="間隔(秒)">
            <el-input-number
                v-model="key.interval"
                :step="0.1"
                :max="8"
                :min="0.5"
            ></el-input-number>
          </el-form-item>
        </el-col>
        </el-row>



      </el-row>


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
        checkedKeys: [
          {name: 1, checked: true, interval: 3},
          {name: 2, checked: true, interval: 3},
          {name: 3, checked: true, interval: 3},
          {name: 4, checked: true, interval: 3},
          {name: 5, checked: true, interval: 3},
        ]
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
  },
  methods: {
    reset() {
      this.form = {
        checkedKeys: [
          {name: 1, checked: true, interval: 3},
          {name: 2, checked: true, interval: 3},
          {name: 3, checked: true, interval: 3},
          {name: 4, checked: true, interval: 3},
          {name: 5, checked: true, interval: 3},
        ]
      }
    }
  }

}
</script>

<style scoped>
</style>