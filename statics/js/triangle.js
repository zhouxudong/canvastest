function Triangle(a, b, c, color) {
    this.pointA = a;
    this.pointB = b;
    this.pointC = c;
    this.color = utils.parseColor(color || "#ff0000");
    this.lineWidth = 1;
    this.alpha = 0.5;
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