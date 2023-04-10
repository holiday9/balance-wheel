<template>
  <div class="root">
    <canvas id="myCanvas" class="my-canvas" width="500" height="500"></canvas>
  </div>
</template>

<script>
export default {
  name: "BalanceWheel",
  data() {
    return {
      n: 6,
      centerX: 0.5,
      centerY: 0.5,
      radius: 150,
    };
  },
  methods: {
    getCenter() {
      return { x: 500 * this.centerX, y: 500 * this.centerY };
    },
    drawCircle() {
      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 1;
      const { x, y } = this.getCenter();
      ctx.beginPath();
      ctx.arc(x, y, this.radius, 0, (360 * Math.PI) / 180, false);
      ctx.stroke();
    },
    drawRadius() {
      const rotateAngle = [0, 60, 60, 60, 60, 60];

      function drawRadiu(ctx, angle, radius) {
        ctx.rotate((angle * Math.PI) / 180);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius, 0);
        ctx.stroke();
      }

      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 1;
      const { x, y } = this.getCenter();
      ctx.save();
      ctx.translate(x, y);
      for (let angle of rotateAngle) {
        drawRadiu(ctx, angle, this.radius);
      }
      ctx.restore();
    },
    drawShadows() {
      const rotateAngles = [0, 60, 60, 60, 60, 60];
      const shandowAngles = [60, 60, 60, 60, 60, 60];
      const shandowRadius = [0.3, 0.5, 0.6, 0.8, 0.5, 0.7];

      function drawShandow(ctx, rotateAngle, angle, r) {
        ctx.rotate((rotateAngle * Math.PI) / 180);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(r, 0);
        ctx.arc(0, 0, r, 0, (angle * Math.PI) / 180, false);
        ctx.closePath();
        ctx.fill();
      }

      const _this = this;
      function shandowConfig(index) {
        return { 
          r : shandowRadius[index] * _this.radius,
          angle : shandowAngles[index],
          rotateAngle : rotateAngles[index]
        }
      }

      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 1;
      const { x, y } = this.getCenter();
      ctx.save();
      ctx.translate(x, y);
      for (let i = 0; i < this.n; i++) {
        const {r, angle, rotateAngle} = shandowConfig(i)
        
        drawShandow(ctx, rotateAngle, angle, r);
      }
      ctx.restore();
    },
    drawLables() {
      const texts = ["健康", "美丽", "新生", "自由", "开心", "勇往直前"];
      const rotateAngles = [0, 60, 60, 60, 60, 60];
      const shandowAngles = [60, 60, 60, 60, 60, 60];

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
          roateAnagle : rotateAngles[index],
          shandowAngle : shandowAngles[index],
          text : texts[index] 
        }
      }

      const canvas = document.getElementById("myCanvas");
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 1;
      const { x, y } = this.getCenter();
      ctx.save();
      ctx.translate(x, y);

      for (let i = 0; i < this.n; i++) {
        const {roateAnagle, shandowAngle, text} = lableConfig(i)

        drawLable(roateAnagle, shandowAngle, text);
      }
      ctx.restore();
    },
    draw() {
      this.drawCircle();
      this.drawRadius();
      this.drawShadows();
      this.drawLables();
    },
  },
  mounted() {
    this.draw();
  },
};
</script>

<style scoped>
.my-canvas {
  border: 1px #ff0000 solid;
}
</style>
