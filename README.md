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
## 斜面碰撞
### 坐标旋转（围绕中心点centerX, centerY 旋转）
    //已知角度和半径
    object.x = centerX + Math.cos(angle) * radius;
    object.y = centerY + Math.sin(angle) * radius;
    angle += vr;
    //已知物体的位置 和 中心点   计算角度和半径
    //这种旋转对于单个物体来说可以，特别是角度和半径只需计算一次的情况
    //但是在更动态的例子里，可能需要旋转多个物体，而他们相对于中心点的
    //位置各不相同。所以，在每一帧里，需要为每一个物体计算距离、角度和
    //半径，然后把vr累加到角度上，最后计算新的x,y坐标，不优雅，不高效
    var dx = object.x - centerX,
        dy = object.y - centerY,
        angle = Math.atan2(dy, dx),
        radius = Math.sqrt(dx * dx + dy * dy);
    //重复上面的code
    object.x = centerX + Math.cos(angle) * radius;
    object.y = centerY + Math.sin(angle) * radius;
    angle += vr;
### 高级坐标旋转
    ```html
    //只需要知道相对于中心点物体的x,y坐标和旋转角度（rotation),就能计算出旋转后的x1,y1位置
    x1 = x * cos(rotation) - y * sin(rotation);
    y1 = y * cos(rotation) + x * sin(rotation);
    //具体说，是旋转物体相对于中心点的坐标,(上面的是0，0)，也可以把公式写成这样
    x1 = (x - centerX) * cos(rotation) - (y - centerY) * sin(rotation);
    y1 = (y - centerY) * cos(rotation) + (x - centerX) * sin(rotation);

    //上面的公式推导
    //物体当前位于x,y处，相对于中心点的角度是angle, 旋转的角度是rotation,旋转后位于x1,y1
    x = radius * cos(angle);
    y = radius * sin(angle);
    //旋转后坐标
    x1 = radius * cos(angle + rotation);
    y1 = radius * sin(angle + rotation);
    //两角之和的余弦值
    cos(a + b) = cosa * cosb - sina * sinb
    //两角之和的正弦值
    sin(a + b) = sina * cosb + cosa * sinb
    //把公式展开
    x1 = radius * cos(angle) * cos(rotation) - radius * sin(angle) * sin(rotation)
    y1 = radius * sin(angle) * cos(rotation) + radius * cos(angle) * sin(rotation)
    //把x,y变量带入公式
    radius = x / cos(angle)
    radisu = y / sin(angle)

    x1 = x / cos(angle) * cos(angle) * cos(rotation) - y / sin(angle) * sin(angle) * sin(rotation)
    y1 = y / sin(angle) * sin(angle) * cos(rotation) + x / cos(angle) * cos(angle) * sin(rotation)
    //然后推导后得到 只用旋转角度就能计算处x1,y1的位置
    x1 = x * cos(rotation) - y * sin(rotation);
    y1 = y * cos(rotation) + x * sin(rotation);
    ```

[高级坐标旋转](https://github.com/zhouxudong/canvastest/blob/master/ui_collision/04-rotate.html)




