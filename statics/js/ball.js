function Ball(radius, color) {
    this.x = 0;
    this.y = 0;
    this.radius = radius || 40;
    this.color = color || "#ff0000";
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