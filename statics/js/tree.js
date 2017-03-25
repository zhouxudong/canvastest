function Tree() {
    this.x = 0;
    this.y = 0;
    this.xpos = 0;
    this.ypos = 0;
    this.zpos = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = "#ffffff";
    this.alpha = 1;
    this.lineWidth = 1;
    this.branch = [];

    this.branch[0] = -140 - Math.random() * 20;
    this.branch[1] = -30 - Math.random() * 30;
    this.branch[2] = Math.random() * 80 - 40;
    this.branch[3] = -100 - Math.random() * 40;
    this.branch[4] = -60 - Math.random() * 40;
    this.branch[5] = Math.random() * 60 - 30;
    this.branch[6] = -110 - Math.random() * 20;
}

Tree.prototype.draw = function (cxt) {
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.scale(this.scaleX, this.scaleY);
    cxt.lineWidth = this.lineWidth;
    cxt.strokeStyle = utils.colorToRGB(this.color, this.alpha);
    cxt.beginPath();
    cxt.moveTo(0, 0);;
    cxt.lineTo(0, this.branch[0]);
    cxt.moveTo(0, this.branch[1]);
    cxt.lineTo(this.branch[2], this.branch[3]);
    cxt.moveTo(0, this.branch[4]);
    cxt.lineTo(this.branch[5], this.branch[6]);
    cxt.stroke();
    cxt.restore();
}