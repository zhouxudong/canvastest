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
## 创建圆形
    (function drawFram(){
        window.requestAnimationFrame(drawFram, canvas);

        xposition = centerX + Math.cos(angle) * radius;
        yposition = centerY + Math.sin(angle) * radius;
        angle += speed;
    }())
## 获取两点间距离
    //points are x1,y1 and x2,y2
    dx = x2 - x1;
    dy = y2 - y1;
    dist = Math.sqrt(dx * dx + dy * dy);
## 绘制一条穿越某个点的曲线
    //xt,yt 是要穿过的点
    x1 = xt * 2 - (x0 + x2) / 2;
    y1 = yt * 2 - (y0 + y2) / 2;
    context.moveTo(x0,y0);
    context.quadraticCurveTo(x1,y1,x2,y2);
## 十进制转换十六进制
    decimaValue.toString(16);
## 颜色转换
### 组合三原色
    color = red << 16 | green << 8 | blue;
### 提取三原色
    red = color24 >> 16 & 0xff;
    green = color24 >> 8 & 0xff;
    blue = color24 & 0xff;
## 速度、加速度、向量分解
### 角速度分解为x、y轴上的速度向量
    vx = speed * Math.cos(angle);
    vy = speed * Math.sin(angle);
### 将角加速度（作用域物体上的力） 分解为x、y轴上的加速度
    ax = force * Math.cos(angle);
    ay = force * Math.sin(angle);
### 将加速度加入速度向量
    vx += ax;
    vy += ay;
## 越界处理和摩擦力
### 移除越界物体，从数组中移除
    if(object.x - object.width / 2 > right ||
    object.x + object.width / 2 < left ||
    object.y - object.height > bottom ||
    object.y + object.height / 2 < top){
        //remove object
    }
### 重置越界物体；ex:喷泉、瀑布
    if(object.x - object.width / 2 > right ||
    object.x + object.width / 2 < left ||
    object.y - object.height > bottom ||
    object.y + object.height / 2 < top){
        //reset object position and velocity
    }
### 越界物体屏幕环绕；
    if(object.x - object.width / 2 > right){
        object.x = left - object.width / 2;
    }else if(object.x + object.width / 2 < left){
        object.x = right + object.width / 2;
    }
    if(object.y - object.height / 2 > bottom){
        object.y = top - object.width / 2;
    }else if(object.y + object.height / 2 < top){
        object.y = bottom + object.height / 2;
    }
### 摩擦力-精确用法
    speed = Math.sqrt(vx * vx, vy * vy);
    angle = Math.atan2(vy, vx);
    if(speed > friction){
        speed -= friction;
    }else{
        speed = 0;
    }
    vx = Math.cos(angle) * speed;
    vy = Math.sin(angle) * speed;
### 摩擦力-简单、不精确
    vx *= friction;
    vy *= friction;
## 缓动与弹动  easing && spring
### 简单缓动
    var dx = targetX - object.x,
        dy = targetY - object.y;
    vx = dx * easing;
    vy = dy * easing;
    object.x += vx;
    object.y += vy;

    *精简
    object.x += (targetX - object.x) * easing;
    object.y += (targetY - object.y) * easing;
### 简单弹动
    var ax = (targetX - object.x) * spring,
        ay = (targetY - object.y) * spring;
    vx += ax;
    vy += ay;
    vx *= friction;
    vy *= friction;
    object.x += vx;
    object.y += vy;

    *精简
    vx += (targetX - object.x) * spring;
    vy += (targetY - object.y) * spring;
    object.x += (vx *= friction);
    object.y += (vy *= friction);
### 有偏移量（有自己长度）的弹动
    var dx = object.x - fixedX, //fixed  like mouse
        dy = object.y - fixedY,
        angle = Math.atan2(dy, dx),
        targetX = fixedX + Math.cos(angle) * springLength,
        targetY = fixedY + Math.sin(angle) * springLength;
        //弹动到 targetX, targetY 跟上面一样


