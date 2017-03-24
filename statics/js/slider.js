function Slider(min, max, value) {
    this.min = min || 0;
    this.max = max || 100;
    this.value = value || 100;
    this.onchange = null;
    this.x = 0;
    this.y = 0;
    this.width = 16;
    this.height = 100;
    this.backColor = "#cccccc";
    this.backBorderColor = "#999999";
    this.backWidth = 4;
    this.backX = this.width / 2 - this.backWidth / 2;
    this.handleColor = "#eeeeee";
    this.handleBorderColor = "#cccccc";
    this.handleHeight = 6;
    this.handleY = 0;
    this.updatePosition();
}
Slider.prototype.draw = function (cxt) {
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.fillStyle = this.backColor;
    cxt.beginPath();
    cxt.fillRect(this.backX, 0, this.backWidth, this.height);
    cxt.closePath();
    cxt.strokeStyle = this.handleBorderColor;
    cxt.fillStyle = this.handleColor;
    cxt.beginPath();
    cxt.rect(0, this.handleY, this.width, this.handleHeight);
    cxt.closePath();
    cxt.fill();
    cxt.stroke();
    cxt.restore();
}
Slider.prototype.updateValue = function () {
    var old_value = this.value,
        handleRange = this.height - this.handleHeight,
        valueRange = this.max - this.min;
    this.value = (handleRange - this.handleY) / handleRange * valueRange + this.min;
    if(typeof this.onchange === 'function' && this.value !== old_value){
        this.onchange();
    }
}
Slider.prototype.updatePosition = function () {
    var handleRange = this.height - this.handleHeight,
        valueRange = this.max - this.min;

    this.handleY = handleRange - ((this.value - this.min) / valueRange) * handleRange;
}
Slider.prototype.captureMouse = function (element) {
    var self = this,
        mouse = utils.captureMouse(element),
        bounds = {};

    setHandleBounds();

    element.addEventListener("mousedown", function () {
        if(utils.containsPoint(bounds, mouse.x, mouse.y)){
            console.log(1);
            element.addEventListener("mouseup", onMouseUp, false);
            element.addEventListener("mousemove", onMouseMove, false);
        }
    },false)

    function onMouseUp() {
        element.removeEventListener("mouseup", onMouseUp, false);
        element.removeEventListener("mousemove", onMouseMove, false);
        setHandleBounds();
    }

    function onMouseMove() {
        var pos_y = mouse.y - self.y;
        self.handleY = Math.min(self.height - self.handleHeight, Math.max(pos_y, 0));
        self.updateValue();
    }
    function setHandleBounds() {
        bounds.x = self.x;
        bounds.y = self.y + self.handleY;
        bounds.width = self.width;
        bounds.height = self.handleHeight;
    }
}