function Triangle(a, b, c, color) {
    this.pointA = a;
    this.pointB = b;
    this.pointC = c;
    this.color = utils.parseColor(color || "#ff0000");
    this.lineWidth = 1;
    this.alpha = 1;
}
Triangle.prototype.draw = function (cxt) {
    cxt.save();
    cxt.lineWidth = this.lineWidth;
    cxt.fillStyle = cxt.strokeStyle = utils.colorToRGB(this.color, this.alpha);
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