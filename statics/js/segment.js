function Segment(width, height, color) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = (color === undefined) ? "#ffffff" : utils.parseColor(color);
    this.lineWidth = 1;
}

Segment.prototype.draw = function (cxt) {
    var h = this.height,
        d = this.width + h, //右上角
        cr = h / 2;         //壁角半径
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.rotate(this.rotation);
    cxt.scale(this.scaleX, this.scaleY);
    cxt.lineWidth = this.lineWidth;
    cxt.fillStyle = this.color;
    cxt.beginPath();
    cxt.moveTo(0, -cr);
    cxt.lineTo(d - 2 * cr, -cr);
    cxt.quadraticCurveTo(-cr + d, -cr, -cr + d, 0);
    cxt.lineTo(-cr + d, h - 2 * cr);
    cxt.quadraticCurveTo(-cr + d, -cr + h, d - 2 * cr, -cr + h);
    cxt.lineTo(0, -cr + h);
    cxt.quadraticCurveTo(-cr, -cr + h, -cr, h - 2* cr);
    cxt.lineTo(-cr, 0);
    cxt.quadraticCurveTo(-cr, -cr, 0, -cr);
    cxt.closePath();
    cxt.fill();
    if(this.lineWidth > 0){
        cxt.stroke();
    }
    //画连个孔
    cxt.beginPath();
    cxt.arc(0, 0, 2, 0, Math.PI * 2, true);
    cxt.closePath();
    cxt.stroke();
    cxt.beginPath();
    cxt.arc(this.width, 0, 2, 0, Math.PI * 2, true);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();

}

Segment.prototype.getPin = function () {
    return {
        x: this.x + Math.cos(this.rotation) * this.width,
        y: this.y + Math.sin(this.rotation) * this.width
    }
}