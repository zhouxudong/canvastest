# canvas study
## 三角公式
   * sin = 对边/斜边
   * cos = 邻边/斜边
   * tan = 对边/邻边
## 角度与弧度
   * 弧度 = 角度 * Math.PI / 180
   * 角度 = 弧度 * 180 ／ Math.PI
## 朝鼠标旋转 -- [示例代码](https://github.com/zhouxudong/canvastest/blob/master/testOne/test1.html)
    dx = mouse.x - object.x;
    dy = mouse.y - object.y;
    object.rotation = Math.atan2(dy,dx) * 180 / Math.PI
## 创建波  -- [示例代码](https://github.com/zhouxudong/canvastest/blob/master/testOne/test6.html)
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
### 移除越界物体，从数组中移除  [示例代码](https://github.com/zhouxudong/canvastest/blob/master/testThree/removeBou.html)
    if(object.x - object.width / 2 > right ||
    object.x + object.width / 2 < left ||
    object.y - object.height > bottom ||
    object.y + object.height / 2 < top){
        //remove object
    }
### 重置越界物体；ex:[喷泉](https://github.com/zhouxudong/canvastest/blob/master/testThree/addBou.html)、瀑布
    if(object.x - object.width / 2 > right ||
    object.x + object.width / 2 < left ||
    object.y - object.height > bottom ||
    object.y + object.height / 2 < top){
        //reset object position and velocity
    }
### 越界物体屏幕环绕； [小飞船游戏](https://github.com/zhouxudong/canvastest/blob/master/testThree/ship.html)
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
### 摩擦力-精确用法  [示例代码](https://github.com/zhouxudong/canvastest/blob/master/testThree/friction.html)
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
### 简单缓动 [示例代码](https://github.com/zhouxudong/canvastest/blob/master/ui-move/04-easing-1.html)
    var dx = targetX - object.x,
        dy = targetY - object.y;
    vx = dx * easing;
    vy = dy * easing;
    object.x += vx;
    object.y += vy;

    *精简
    object.x += (targetX - object.x) * easing;
    object.y += (targetY - object.y) * easing;
### 简单弹动  [示例代码](https://github.com/zhouxudong/canvastest/blob/master/ui-move/05-spring.html)
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
### 有偏移量（有自己长度）的弹动  [示例代码](https://github.com/zhouxudong/canvastest/blob/master/ui-move/05-spring-length.html)
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
### [高级坐标旋转](https://github.com/zhouxudong/canvastest/blob/master/ui_collision/04-rotate.html)

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
### 动量守恒 -- [示例代码](https://github.com/zhouxudong/canvastest/blob/master/ui-cons-momentum/01-billiard.html)
    F = m * a
    p = m * v   //动量 = 质量 * 速度

    //总动量在碰撞前后相同，对于两个物体object0 和object1
    momentum0 + momentum1 = momentum0Final + momentum1Final

    //或者

    （m0 * v0) + (m1 * v1) = (m0 * v0Final) + (m1 * v1Final)

    //现在要计算两个物体的最终速度，v0Final 和 v1Final;
    //解一个有两个未知数的方程，就得找出另一个含有相同两个未知数的方程，

    //动能方程:
    KE = 0.5 m * v * v;

    //动能在碰撞前后也是相同的
    KE0 + KE1 = KE0Final + KE1Final;

    //或者

    (0.5 * m0 * v0 * v0) + (0.5 * m1 * v1 * v1) = (0.5 * m0 * v0Final * v0Final) + (0.5 * m1 * v1Final * v1Final);

    //消去0.5得到
    m0 * v0 * v0 + m1 * v1 * v1 = m0 * v0Final * v0Final + m1 * v1Final * v1Final;

    //使用带入消元法，可得
    v0Final = ((m0 - m1) * v0 + 2 * m1 * v1) / (m0 + m1);
    v1Final = ((m1 - m0) * v1 + 2 * m0 * v0) / (m0 + m1);

    //两个物体的速度相减，就能得到相对速度
    //在碰撞之前，相减获取他们的总速度
    var vxTotal = vx0 - vx1

    //碰撞之后
    vx1Final = vxTotal + vx0Final;
## 粒子与万有引力
### 引力方程
    force = G * m1 * m2 / (distance * distance);
    //万有引力常量,G = 6.674 * 10^-11，不用，可以去掉常量
    F = m1 * m2 / distance^2
    //引力公式 javascript 实现
    function gravitate(partA, partB){
        var dx = partB.x - partA.x,
            dy = partB.y - partB.y,
            distSQ = dx * dx + dy * dy,
            dist = Math.sqrt(distSQ),

            //引用万有引力公式，去掉常量G
            force = partA.mass * partB.mass / distSQ,

            //angle = Math.atan2(dy, dx);
            //ax = force * cos(angle);
            //ay = force * sin(angle);
            //同下面获取 ax,ay一样，免去计算angle
            ax = force * dx / dist,
            ay = force * dy / dist;

        //force 是A,B共同的力， 质量跟所获得的加速度成反比
        partA.vx += ax / partA.mass;
        partA.vy += ay / partA.mass;
        partB.vx -= ax / partB.mass;
        partB.vy -= ay / partB.mass;
    }
## [正向运动学：让物体行走](https://github.com/zhouxudong/canvastest/blob/master/ui-movement-segment/06-walking-real.html)
    通常，一个运动学系统有两个端点：基础端和自由端。由关节组成的手臂通常一端固定，另一端可以随意伸出去拿一个东西。
    正向运动学的动作起源于固定端，移动向自由端。例如：行走时，四肢的运动，大腿带动小腿，小腿带动脚
    反向运动学刚好相反，动作开始于，或者决定于自由端，移动向固定端

## 反向运动学
### [拖拽](https://github.com/zhouxudong/canvastest/blob/master/ui-movement-reverse/04-multi-drag-segment.html)
    //拖拽单个节段
    var w = segment0.getPin().x - segment0.x,
        h = segment0.getPin().y - segment0.y;

    segment0.x = mouse.x - w;
    segment0.y = mouse.y - h;

    //拖拽多个节段
    function drag(segment, xpos, ypos){
        var dx = xpos - segment.x,
            dy = ypos - segment.y;
        segment.rotation = Math.atan2(dy, dx);

        var w = segment.getPin().x - segment.x,
            h = segment.getPin().y - segment.y;

        segment.x = xpos - w;
        segment.y = ypos - h;
    }
### 伸出 -- [伸向鼠标](https://github.com/zhouxudong/canvastest/blob/master/ui-movement-reverse/06-multi-reach.html) ,  [伸向球](https://github.com/zhouxudong/canvastest/blob/master/ui-movement-reverse/07-moveToBall.html)

    //伸出多个节段
    function reach(segment, xpos, ypos){
        var dx = xpos - segment.x,
            dy = ypos - segment.y;

        segment.rotation = Math.atan2(dy, dx);

        var w = segment.getPin().x - segment.x,
            h = segment.getPin().y - segment.y;

        return {
            x: xpos - w,
            y: ypos - h
        }
    }
    //segment0伸向鼠标，segment1伸向segment0
    var target = reach(segment0, mouse.x, mouse.y);
    reach(segment1, target.x, target.y);


    function position(segmentA, segmentB){
        segmentA.x = segmentB.getPin().x;
        segmentA.y = segmentB.getPin().y;
    }
    //把segment0 放置在segment1的末端
    position(segment0, segment1);
### 余弦定理
    a^2 = b^2 + c^2 - 2 * b * c * cosA
    b^2 = a^2 + c^2 - 2 * a * c * cosB
    c^2 = a^2 + b^2 - 2 * a * b * cosC

    javascript中的余弦定理
    var A = Math.acos((b * b + c * c - a * a) / (2 * b * c)),
        B = Math.acos((a * a + c * c - b * b) / (2 * a * c)),
        C = Math.acos((a * a + b * b - c * c) / (2 * a * b));

## 三维基础
### [基本透视图](https://github.com/zhouxudong/canvastest/blob/master/UI-3D/01-perspective.html)
    scale = f1 / (f1 + zpos);
    object.scaleX = object.scaleY = scale;
    object.alpha = scale;//可选项；
    object.x = vanishingPointX + xpos * scale;
    object.y = vanishingPointY + ypos * scale;

### [z排序](https://github.com/zhouxudong/canvastest/blob/master/UI-3D/04-bounce-mulit-3d.html)
    //3d 根据物体的zpos 大小 排序
    function zSort(a, b){
        reutrn a.zpos - b.zpos;
    }
    objects.sort(zSort);

### [坐标旋转](https://github.com/zhouxudong/canvastest/blob/master/UI-3D/11-rotate-xy-3d.html)
    x1 = xpos * cos(angleZ) - ypos * sin(angleZ);
    y1 = ypos * cos(angleZ) + xpos * sin(angleZ);

    x1 = xpos * cos(angleY) - zpos * sin(angleY);
    y1 = zpos * cos(angleY) + xpos * sin(angleY);

    x1 = ypos * cos(angleX) - zpos * sin(angleX);
    y1 = zpos * cos(angleX) + ypos * sin(angleX);

### [三维计算距离](https://github.com/zhouxudong/canvastest/blob/master/UI-3D/12-collision-3d.html)
    dist = Math.sqrt(dx * dx + dy * dy + dz * dz);





