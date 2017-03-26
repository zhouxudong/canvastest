function Triangle(a, b, c, color) {
    this.pointA = a;
    this.pointB = b;
    this.pointC = c;
    this.color = utils.parseColor(color || "#ff0000");
    this.lineWidth = 1;
    this.alpha = 1;
    this.light = null;
}
Triangle.prototype.draw = function (cxt) {
    cxt.save();
    cxt.lineWidth = this.lineWidth;
    cxt.fillStyle = cxt.strokeStyle = this.getAdjustedColor();
    cxt.beginPath();
    cxt.moveTo(this.pointA.getScreenX(), this.pointA.getScreenY());
    cxt.lineTo(this.pointB.getScreenX(), this.pointB.getScreenY());
    cxt.lineTo(this.pointC.getScreenX(), this.pointC.getScreenY());
    cxt.closePath();
    cxt.fill();
    if(this.lineWidth > 0){
        cxt.stroke();
    }
    cxt.restore();
}

//计算三角形两条边的长度，然后用乘法和比较，用到 三角形相对于canvas的法线向量
Triangle.prototype.isBackface = function () {
    var cax = this.pointC.getScreenX() - this.pointA.getScreenX(),
        cay = this.pointC.getScreenY() - this.pointA.getScreenY(),
        bcx = this.pointB.getScreenX() - this.pointC.getScreenX(),
        bcy = this.pointB.getScreenY() - this.pointC.getScreenY();
    return (cax * bcy > cay * bcx);
}

//根据三角形 三点在Z轴上最小的点获取其深度
Triangle.prototype.getDepth = function () {
    return Math.min(this.pointA.z, this.pointB.z, this.pointC.z);
}

Triangle.prototype.getAdjustedColor = function () {
    var color = utils.parseColor(this.color, true),
        red = color >> 16 ,
        green = color >> 8 & 0xff,
        blue = color & 0xff,
        lightFactor = this.getLightFactor();

    red *= lightFactor;
    green *= lightFactor;
    blue *= lightFactor;
    return utils.parseColor(red << 16 | green << 8 | blue);
}

Triangle.prototype.getLightFactor = function () {

    // 可以通过计算组成平面的两个向量的叉积来得到法线
    // 两个向量的叉积是一个与它们垂直的新向量
    var ab = {
        x: this.pointA.x - this.pointB.x,
        y: this.pointA.y - this.pointB.y,
        z: this.pointA.z - this.pointB.z
    }
    var bc = {
        x: this.pointB.x - this.pointC.x,
        y: this.pointB.y - this.pointC.y,
        z: this.pointB.z - this.pointC.z
    }
    //获取三角行的法线，
    var norm = {
        x: (ab.y * bc.z) - (ab.z * bc.y),
        y: -((ab.x * bc.z) - (ab.z * bc.x)),
        z: (ab.x * bc.y) - (ab.y * bc.x)
    }
    //法线与灯光的角度；向量数学知识--向量点积，它表示两个向量的差值
    var dotProd = norm.x * this.light.x +
                norm.y * this.light.y +
                norm.z * this.light.z;

    //计算法线的幅值 与 灯光的幅值
    var normMag = Math.sqrt(norm.x * norm.x + norm.y * norm.y + norm.z * norm.z);
    var lightMag = Math.sqrt(this.light.x * this.light.x + this.light.y * this.light.y + this.light.z * this.light.z);

    return (Math.acos(dotProd / (normMag * lightMag)) / Math.PI) * this.light.brightness;
}