# canvas study
## 三角公式
   * sin = 对边/斜边
   * cos = 邻边/斜边
   * tan = 对边/邻边
## 角度与弧度
   * 弧度 = 角度 * Math.PI / 180
   * 角度 = 弧度 * 180 ／ Math.PI
## 朝鼠标旋转
    dx = mouse.x - object.x;
    dy = mouse.y - object.y;
    object.rotation = Math.atan2(dy,dx) * 180 / Math.PI
## 创建波
    (function drawFram(){
        window.requestAnimationFrame(drawFram, canvas);

        xposition = centerX + Math.cos(angle) * radius;
        yposition = centerY + Math.sin(angle) * radius;
        angle += speed;
    }())