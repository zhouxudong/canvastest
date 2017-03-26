function Light(x, y, z, brightness) {
    this.x = x || -100;
    this.y = y || -100;
    this.z = z || -100;
    this.brightness = brightness || 1;
}

Light.prototype.setBrightness = function (b) {
    this.brightness = Math.min(Math.max(b, 0), 1);
}