function Arrow(x, y, color, rotation) {
    this.x = x || 0;
    this.y = y || 0;
    this.color = color || "#ff0000";
    this.rotation = rotation || 0;
}
Arrow.prototype.draw = function (cxt) {
    cxt.save();
    cxt.translate(this.x,this.y);
    cxt.rotate(this.rotation);
    cxt.lineWidth = 2;
    cxt.fillStyle = this.color;
    cxt.beginPath();
    cxt.moveTo(-50,-25);
    cxt.lineTo(0,-25);
    cxt.lineTo(0,-50);
    cxt.lineTo(50,0)
    cxt.lineTo(0,50);
    cxt.lineTo(0,25);
    cxt.lineTo(-50,25);
    cxt.lineTo(-50,-25);
    cxt.closePath();
    cxt.fill();
    cxt.stroke();
    cxt.restore();
}