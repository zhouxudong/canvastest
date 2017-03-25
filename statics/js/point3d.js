function Point3D(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.f1 = 250;  //  焦点
    this.vpX = 0;   // 消失点
    this.vpY = 0;
    this.cX = 0;    //中点
    this.cY = 0;
    this.cZ = 0;
}

Point3D.prototype.setVanishingPoint = function (vpX, vpY) {
    this.vpX = vpX;
    this.vpY = vpY;
}
Point3D.prototype.setCenter = function (cX, cY, cZ) {
    this.cX = cX;
    this.cY = cY;
    this.cZ = cZ;
}
Point3D.prototype.rotateX = function (angleX) {
    var cosX = Math.cos(angleX),
        sinX = Math.sin(angleX),
        y1 = this.y * cosX - this.z * sinX,
        z1 = this.z * cosX + this.y * sinX;
    this.y = y1;
    this.z = z1;
}
Point3D.prototype.rotateY = function (angleY) {
    var cosY = Math.cos(angleY),
        sinY = Math.sin(angleY),
        x1 = this.x * cosY - this.z * sinY,
        z1 = this.z * cosY + this.x * sinY;
    this.x = x1;
    this.z = z1;
}
Point3D.prototype.rotateZ = function (angleZ) {
    var cosZ = Math.cos(angleZ),
        sinZ = Math.sin(angleZ),
        x1 = this.x * cosZ - this.y * sinZ,
        y1 = this.y * cosZ + this.x * sinZ;
    this.x = x1;
    this.y = y1;
}
Point3D.prototype.getScreenX = function () {
    var scale = this.f1 / (this.f1 + this.z + this.cZ);
    return this.vpX + (this.cX + this.x) * scale;
}
Point3D.prototype.getScreenY = function () {
    var scale = this.f1 / (this.f1 + this.z + this.cZ);
    return this.vpY + (this.cY + this.y) * scale;
}