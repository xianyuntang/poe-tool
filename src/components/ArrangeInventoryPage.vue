<template>
  <el-card>
    <template v-slot:header>
      <el-row>
        <el-col :span="4">
          <div>自動收包 F8</div>

        </el-col>
        <el-col :span="8">
          <el-button type="primary" size="mini" @click="reset">重設</el-button>
        </el-col>
      </el-row>
    </template>
    <el-form>
      <el-form-item>
        <el-checkbox-group v-model="form.checkList">
          <el-row v-for="row in 5" :key="row">
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
      form: {
        checkList: []
      }

    }
  },
  created() {
    if (localStorage.getItem('arrange-inventory') != null) {
      this.form = JSON.parse(localStorage.getItem('arrange-inventory'))
    } else {
      this.reset()
    }
    window.ipcRenderer.on('arrange-inventory', () => {
      const form = {
        height: this.height,
        width: this.width,
        ...this.form
      }
      window.ipcRenderer.send('arrange-inventory', form)
    })

  },
  watch: {
    form: {
      deep: true,
      handler: function (value) {
        localStorage.setItem('arrange-inventory', JSON.stringify(value))
      }
    }
  },
  methods: {
    reset() {
      this.form.checkList = []
      for (let row = 1; row < 6; ++row) {
        for (let col = 1; col < 13; ++col) {
          this.form.checkList.push(`${row}-${col}`)
        }
      }
    }
  }
}
</script>

<style scoped>
>>> .el-checkbox__label {
  display: none;
}

</style>