function Ball(radius, color) {
    this.x = 0;
    this.y = 0;
    this.radius = radius || 40;
    this.color = color || "#ff0000";
    this.vx = 0;
    this.vy = 0;
    this.mass = 1;  //质量
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.lineWidth = 1;
}
Ball.prototype.draw = function (cxt) {
    cxt.save();
    cxt.translate(this.x,this.y);
    cxt.rotate(this.rotation);
    cxt.scale(this.scaleX,this.scaleY);
    cxt.lineWidth = this.lineWidth;
    cxt.fillStyle = this.color;
    cxt.beginPath();
    cxt.arc(0,0,this.radius,0,Math.PI*2,true);
    cxt.closePath();
    cxt.fill();
    if(this.lineWidth > 0){
        cxt.stroke();
    }
    cxt.restore();
}
//返回容纳球的矩形
Ball.prototype.getBounds = function () {
    return {
        x: this.x - this.radius,
        y: this.y - this.radius,
        height: this.radius * 2,
        width: this.radius * 2
    }
}