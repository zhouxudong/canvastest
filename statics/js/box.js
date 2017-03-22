function Box(width, height, color) {
    this.width = width || 50;
    this.height = width || 50;
    this.color = color || "#ff0000";
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.lineWidth = 1;
}
Box.prototype.draw = function (cxt) {
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.rotate(this.rotation);
    cxt.scale(this.scaleX, this.scaleY);
    cxt.lineWidth = this.lineWidth;
    cxt.fillStyle = this.color;
    cxt.beginPath();
    cxt.rect(0, 0, this.width, this.height);
    cxt.closePath();
    cxt.fill();
    if(this.lineWidth > 0){
        cxt.stroke();
    }
    cxt.restore();
}