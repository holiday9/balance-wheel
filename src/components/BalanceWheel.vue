<template>
  <div class="root">
    <el-row>
      <el-col :span="16"><div class="canvas-container">
          <canvas id="myCanvas" class="my-canvas" width="500" height="500"></canvas>
        </div></el-col>
      <el-col :span="8"><div class="form-container">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="数量">
              <el-input v-model="form.n"></el-input>
            </el-form-item>
            <el-form-item label="圆环颜色">
              <el-input v-model="form.circleColor"></el-input>
            </el-form-item>
            <el-form-item label="半径颜色">
              <el-input v-model="form.radiusColor"></el-input>
            </el-form-item>
            <el-form-item label="shandow颜色">
              <el-input v-model="form.shandowColor"></el-input>
            </el-form-item>
            <el-form-item label="shandow半径">
              <el-input v-model="form.shandowRadius"></el-input>
            </el-form-item>
            <el-form-item label="shandow命名">
              <el-input v-model="form.texts"></el-input>
            </el-form-item>

            <el-button @click="handleUpdate">更新</el-button>
          </el-form>
        </div></el-col>
    </el-row>
  </div>
</template>

<script>
import utils from "@/utils";
import { getLables, defaultShandowRaduis } from "@/utils";
const N = 6;
export default {
  name: "BalanceWheel",
  data() {
    return {
      centerX: 0.5,
      centerY: 0.5,
      radius: 150,
      balanceWheel: {
        n: N,
        circleColor: 'red',
        radiusColor: 'red',
        shandowColor: 'red',
        shandowRadius: defaultShandowRaduis(N),
        texts: getLables(N)
      },

      form: {
        n: N,
        circleColor: '#0000ff',
        radiusColor: 'red',
        shandowColor: 'red',
        shandowRadius: "0.3,0.5,0.6,0.4,0.7,0.8",
        texts: ''
      }
    };
  },
  computed: {
    n() {
      return this.balanceWheel.n;
    }
  },
  watch: {
    balanceWheel: {
      handler: function(newVal) {
        console.log(`监听到balance参数:`, newVal);
        this.draw();
      },
      deep: true
    } 
    
  },
  methods: {
    checkParam() {
      // param check
      return {ok: true, msg: ""};
    },
    convert(form) {
        const shandowRadiusStr = form.shandowRadius.split(/,\s*/);
        const shandowRadius = shandowRadiusStr.filter(Boolean).map(Number);

        const texts = form.texts.split(/[,，、]\s*/).filter(Boolean);
        console.log("------------",form.texts.split(/[,，、]\s*/), texts);

        return {shandowRadius, texts}
    },
    handleUpdate() {
      this.checkParam();

      const specialKeys = ["shandowRadius", "texts"];
      

      for (let key in this.form) {
        if (specialKeys.indexOf(key) == -1)
          this.balanceWheel[key] = this.form[key]
      }

      const convertForm = this.convert(this.form);
      console.log("convertForm:", convertForm);
      for (let key of specialKeys) {
          this.balanceWheel[key] = convertForm[key]
      }
    

      // this.draw();
    },
    getCenter() {
      return { x: 500 * this.centerX, y: 500 * this.centerY };
    },
    drawCircle() {
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.save();
      ctx.lineWidth = 1;
      const { x, y } = this.getCenter();
      ctx.beginPath();
      ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
      ctx.strokeStyle = this.balanceWheel.circleColor;
      ctx.stroke();
      ctx.restore();
    },
    drawRadius() {
      const rotateAngles = utils.getRotateAngles(this.n); //[0, 60, 60, 60, 60, 60];
      const _this = this;

      function drawRadiu(ctx, rotateAngle, radius) {
        ctx.rotate((rotateAngle * Math.PI) / 180);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius, 0);
        ctx.strokeStyle = _this.balanceWheel.radiusColor;
        ctx.stroke();
      }

      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 1;
      const { x, y } = this.getCenter();
      ctx.save();
      ctx.translate(x, y);
      for (let rotateAngle of rotateAngles) {
        drawRadiu(ctx, rotateAngle, this.radius);
      }
      ctx.restore();
    },
    drawShadows() {
      const _this = this;

      const rotateAngles = utils.getRotateAngles(this.n);
      const shandowAngles = utils.getShandowAngles(this.n);
      const { shandowRadius } = _this.balanceWheel;

      console.log("shandowRaduis:", shandowRadius);

      function drawShandow(ctx, rotateAngle, angle, r) {
        ctx.rotate((rotateAngle * Math.PI) / 180);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(r, 0);
        ctx.arc(0, 0, r, 0, (angle * Math.PI) / 180, false);
        ctx.closePath();
        ctx.fillStyle = _this.balanceWheel.shandowColor;
        ctx.fill();
      }

      function shandowConfig(index) {
        return {
          r: shandowRadius[index] * _this.radius,
          angle: shandowAngles[index],
          rotateAngle: rotateAngles[index],
        };
      }

      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 1;
      const { x, y } = this.getCenter();
      ctx.save();
      ctx.translate(x, y);
      for (let i = 0; i < this.n; i++) {
        const { r, angle, rotateAngle } = shandowConfig(i);

        drawShandow(ctx, rotateAngle, angle, r);
      }

      ctx.restore();
    },
    drawLables() {
      const { texts } = this.balanceWheel;
      console.log("=====", texts, typeof texts);
      const rotateAngles = utils.getRotateAngles(this.n);
      const shandowAngles = utils.getShandowAngles(this.n);

      const _this = this;
      function drawLable(roateAnagle, shandowAngle, text) {
        ctx.rotate((roateAnagle * Math.PI) / 180);
        ctx.save();
        ctx.rotate(((shandowAngle / 2) * Math.PI) / 180);
        const textX = _this.radius + 30;
        const textY = 0;
        ctx.strokeText(text, textX, textY);
        ctx.restore();
      }
      function lableConfig(index) {
        return {
          roateAnagle: rotateAngles[index],
          shandowAngle: shandowAngles[index],
          text: texts[index],
        };
      }

      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 1;
      const { x, y } = this.getCenter();
      ctx.save();
      ctx.translate(x, y);

      for (let i = 0; i < this.n; i++) {
        const { roateAnagle, shandowAngle, text } = lableConfig(i);
        console.log(`${i}, ${text}`);

        drawLable(roateAnagle, shandowAngle, text);
      }
      ctx.restore();
    },
    clearCanvas() {
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    },
    draw() {
      this.clearCanvas();
      this.drawCircle();
      this.drawShadows();
      this.drawRadius();
      this.drawLables();
    },
  },
  mounted() {
    this.draw();
  },
};
</script>

<style scoped>
.canvas-container {
}
.form-container {
}
.my-canvas {
  /* border: 1px #ff0000 solid; */
}
</style>
