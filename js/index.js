/**
 * Created by lenovo on 2018/9/1.
 */
window.onload = function(){
    //��ȡdomԪ��
    var main_l = document.querySelector(".main_l");
    //��ȡ������߶�
    var main_l_height = main_l.offsetHeight;
    var ulBox = main_l.querySelector("ul:first-of-type");
    var ulBox_height = ulBox.offsetHeight;
    var lis = ulBox.querySelectorAll("li");
    //��ʼ������
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    //�������λ��
    var endY = 0;

    //���þ�ֹʱ��Ļ������䣬��ul�ܻ����ľ��룬���㻬�������Ĳ���
    //���ֹ��Χ
    var maxTop = 0;
    //��С��ֹ��Χ, ���»���ʱ,topֵΪ��
    var minTop = main_l_height - ulBox_height;

    //�����ܻ����ľ���
    //������󻬶����룬�²��ֳ����ܻ����Ĳ���
    var maxMoveTop = maxTop + 100;
    //������С�������룬�ϲ��ֳ����ܻ����Ĳ���
    var minMoveTop = minTop - 100;

    //touch�¼�
    ulBox.addEventListener("touchstart", function(e){
        startY = e.targetTouches[0].clientY;

    });
    ulBox.addEventListener("touchmove", function(e){
        moveY = e.targetTouches[0].clientY;
        distanceY = moveY - startY;

        //�ƶ�������ֹ��Χ���������ƶ�
        if(distanceY + endY > maxMoveTop || distanceY + endY < minMoveTop){
            console.log("error");
            return;
        }

        //�������
        ulBox.style.transition = 'none';
        //���λ��
        ulBox.style.top = (distanceY + endY) + 'px';

    });
    ulBox.addEventListener("touchend", function(e){
        //��������
        if(distanceY + endY > maxTop){
            //ÿ�λ���֮��ǰ����λ�ûᱻ����,����Ҫ���¸�ֵ
            endY = maxTop;
            ulBox.style.transition = "top 1s";
            ulBox.style.top = maxTop + 'px';
        } else if(distanceY + endY < minTop){
            endY = minTop;
            ulBox.style.transition = "top 1s";
            ulBox.style.top = minTop + 'px';
        } else {
            //��¼��һ��λ��
            endY += distanceY;
        }
    });

    //��li����index����
    for(var i = 0; i < lis.length; i++){
        lis[i].index = i;
    }

    //�����¼�, ����һ
    //��ʱ�����e���β�
    //tap(ulBox, function(e){
    //    //�ı�li����ʽ
    //    for(var i = 0; i < lis.length; i++){
    //       lis[i].classList.remove("now");
    //    }
    //    //Ϊ��ǰ��������liԪ�������ʽ,���������li�е�a��ǩ
    //    //Ϊ�˻�ȡe��������Ҫ�ڻص������д���ʵ��e
    //    var li = e.target.parentNode;
    //    li.classList.add("now");
    //
    //    //�ƶ���ǰ��liԪ�ص�����������������ǲ��ܳ���֮ǰ�趨�˾�ֹ״̬�µ���Сtopֵ
    //    var liHeight = li.offsetHeight;
    //    var index = li.index;
    //    //��������
    //    ulBox.style.transition = "top 1s";
    //    //����ƫ��
    //    var targetTop = -index * liHeight;
    //    if(targetTop < minTop){
    //       targetTop = minTop;
    //    }
    //    ulBox.style.top = targetTop + 'px';
    //    //��¼����λ��
    //    endY = targetTop;
    //});
    //
    //function tap(element, callback){
    //    <!--var element = document.querySelector("div");-->
    //    //�ж�Ԫ���Ƿ����
    //    if(!element || typeof element != "object"){
    //        return;
    //    }
    //    var startTime, startX, startY;
    //
    //    element.addEventListener("touchstart",function(e){
    //        /*�ж��Ƿ�ֻ��һ����ָ���в���*/
    //        if(e.targetTouches.length > 1){ //˵����ֹһ����ָ
    //            return;
    //        }
    //        /*��¼��ָ��ʼ������ʱ��*/
    //        startTime=Date.now();
    //        /*��¼��ǰ��ָ������*/
    //        startX= e.targetTouches[0].clientX;
    //        startY= e.targetTouches[0].clientY;
    //        /*����һЩ���¼���صĳ�ʼ������*/
    //    })
    //
    //    /*touchend������ָ�ɿ�ʱ�򴥷�����ζ�ŵ�ǰԪ�����Ѿ�û����ָ������,�����޷�ͨ��targetTouches����ȡ��ָ����*/
    //    element.addEventListener("touchend", function(e){
    //        //�ж��Ƿ���һ����ָ����
    //        if(e.targetTouches.length > 1){
    //            return;
    //        }
    //        //�ж�ʱ�����
    //        if(Date.now()-startTime > 150){
    //            return;
    //        }
    //        //�ж��ɿ���ָʱ�������࣬��ָ�뿪�޷���targetTouches
    //        var endX = e.changedTouches[0].clientX;
    //        var endY = e.changedTouches[0].clientY;
    //        //�ݶ������ඥΪ6
    //        if(Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6){
    //            //console.log("tap�¼�");
    //
    //            //�жϻص������Ƿ���ڣ�������ִ��
    //            //��ʱ�����e��ʵ��
    //            callback && callback(e);
    //        }
    //    })
    //
    //}

    //zepto��װtap�¼�, ������
    $(ulBox).on("tap", function(e){
        //�ı�li����ʽ
        for(var i = 0; i < lis.length; i++){
            lis[i].classList.remove("now");
        }
        //Ϊ��ǰ��������liԪ�������ʽ,���������li�е�a��ǩ
        //Ϊ�˻�ȡe��������Ҫ�ڻص������д���ʵ��e
        var li = e.target.parentNode;
        li.classList.add("now");

        //�ƶ���ǰ��liԪ�ص�����������������ǲ��ܳ���֮ǰ�趨�˾�ֹ״̬�µ���Сtopֵ
        var liHeight = li.offsetHeight;
        var index = li.index;
        //��������
        ulBox.style.transition = "top 1s";
        //����ƫ��
        var targetTop = -index * liHeight;
        if(targetTop < minTop){
            targetTop = minTop;
        }
        ulBox.style.top = targetTop + 'px';
        //��¼����λ��
        endY = targetTop;
    });
};