/**
 * Created by lenovo on 2018/9/1.
 */
window.onload = function(){
    //获取dom元素
    var main_l = document.querySelector(".main_l");
    //获取左侧栏高度
    var main_l_height = main_l.offsetHeight;
    var ulBox = main_l.querySelector("ul:first-of-type");
    var ulBox_height = ulBox.offsetHeight;
    var lis = ulBox.querySelectorAll("li");
    //初始化参数
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    //设置最后位置
    var endY = 0;

    //设置静止时候的滑动区间，即ul能滑动的距离，不算滑出回拉的部分
    //最大静止范围
    var maxTop = 0;
    //最小静止范围, 向下滑动时,top值为负
    var minTop = main_l_height - ulBox_height;

    //设置能滑动的距离
    //设置最大滑动距离，下部分超出能回拉的部分
    var maxMoveTop = maxTop + 100;
    //设置最小滑动距离，上部分超出能回拉的部分
    var minMoveTop = minTop - 100;

    //touch事件
    ulBox.addEventListener("touchstart", function(e){
        startY = e.targetTouches[0].clientY;

    });
    ulBox.addEventListener("touchmove", function(e){
        moveY = e.targetTouches[0].clientY;
        distanceY = moveY - startY;

        //移动超出静止范围，则不能再移动
        if(distanceY + endY > maxMoveTop || distanceY + endY < minMoveTop){
            console.log("error");
            return;
        }

        //清除过渡
        ulBox.style.transition = 'none';
        //添加位移
        ulBox.style.top = (distanceY + endY) + 'px';

    });
    ulBox.addEventListener("touchend", function(e){
        //超出回拉
        if(distanceY + endY > maxTop){
            //每次回拉之后当前结束位置会被回拉,所以要重新赋值
            endY = maxTop;
            ulBox.style.transition = "top 1s";
            ulBox.style.top = maxTop + 'px';
        } else if(distanceY + endY < minTop){
            endY = minTop;
            ulBox.style.transition = "top 1s";
            ulBox.style.top = minTop + 'px';
        } else {
            //记录上一次位置
            endY += distanceY;
        }
    });

    //给li设置index属性
    for(var i = 0; i < lis.length; i++){
        lis[i].index = i;
    }

    //单击事件, 方法一
    //此时传入的e是形参
    //tap(ulBox, function(e){
    //    //改变li的样式
    //    for(var i = 0; i < lis.length; i++){
    //       lis[i].classList.remove("now");
    //    }
    //    //为当前被单击的li元素添加样式,被点击的是li中的a标签
    //    //为了获取e参数，需要在回调函数中传入实参e
    //    var li = e.target.parentNode;
    //    li.classList.add("now");
    //
    //    //移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值
    //    var liHeight = li.offsetHeight;
    //    var index = li.index;
    //    //开启过渡
    //    ulBox.style.transition = "top 1s";
    //    //设置偏移
    //    var targetTop = -index * liHeight;
    //    if(targetTop < minTop){
    //       targetTop = minTop;
    //    }
    //    ulBox.style.top = targetTop + 'px';
    //    //记录结束位置
    //    endY = targetTop;
    //});
    //
    //function tap(element, callback){
    //    <!--var element = document.querySelector("div");-->
    //    //判断元素是否存在
    //    if(!element || typeof element != "object"){
    //        return;
    //    }
    //    var startTime, startX, startY;
    //
    //    element.addEventListener("touchstart",function(e){
    //        /*判断是否只有一根手指进行操作*/
    //        if(e.targetTouches.length > 1){ //说明不止一个手指
    //            return;
    //        }
    //        /*记录手指开始触摸的时间*/
    //        startTime=Date.now();
    //        /*记录当前手指的坐标*/
    //        startX= e.targetTouches[0].clientX;
    //        startY= e.targetTouches[0].clientY;
    //        /*来做一些与事件相关的初始化操作*/
    //    })
    //
    //    /*touchend：当手指松开时候触发，意味着当前元素上已经没有手指对象了,所以无法通过targetTouches来获取手指对象*/
    //    element.addEventListener("touchend", function(e){
    //        //判断是否是一个手指操作
    //        if(e.targetTouches.length > 1){
    //            return;
    //        }
    //        //判断时间差异
    //        if(Date.now()-startTime > 150){
    //            return;
    //        }
    //        //判断松开手指时的坐标差距，手指离开无法用targetTouches
    //        var endX = e.changedTouches[0].clientX;
    //        var endY = e.changedTouches[0].clientY;
    //        //暂定距离差距顶为6
    //        if(Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6){
    //            //console.log("tap事件");
    //
    //            //判断回调函数是否存在，存在则执行
    //            //此时传入的e是实参
    //            callback && callback(e);
    //        }
    //    })
    //
    //}

    //zepto封装tap事件, 方法二
    $(ulBox).on("tap", function(e){
        //改变li的样式
        for(var i = 0; i < lis.length; i++){
            lis[i].classList.remove("now");
        }
        //为当前被单击的li元素添加样式,被点击的是li中的a标签
        //为了获取e参数，需要在回调函数中传入实参e
        var li = e.target.parentNode;
        li.classList.add("now");

        //移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值
        var liHeight = li.offsetHeight;
        var index = li.index;
        //开启过渡
        ulBox.style.transition = "top 1s";
        //设置偏移
        var targetTop = -index * liHeight;
        if(targetTop < minTop){
            targetTop = minTop;
        }
        ulBox.style.top = targetTop + 'px';
        //记录结束位置
        endY = targetTop;
    });
};