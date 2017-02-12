/**
 * Created by Administrator on 2016/12/6.
 */
//头部开始
var box = document.getElementById("box");
var uls = box.children[0];
var liss = uls.children;
//循环遍历 给每一个li 绑定背景图片
for (var i = 0; i < liss.length; i++) {
    liss[i].style.backgroundImage = "url(images/" + (i + 1) + ".jpg)";
    liss[i].style.left = i * 240 + "px";
    liss[i].index = i;
    //给每一个里绑定 按钮排他事件
    liss[i].onmouseover = function () {
        //干掉所有人
        for (var j = 0; j < liss.length; j++) {
            //让所有的li的宽度渐渐地变为100
//                animate(lis[j], {"width": 100});
            if (j <= this.index) {
                animate(liss[j], {"left": 100 * j});
            } else {
                animate(liss[j], {"left": 100 * j + 700});
            }
        }
        //留下我自己
        //让当前的li的宽度渐渐地变为800
//            animate(this, {"width": 800, "backgroundPosition": -240});
    };
    //鼠标离开后 让所有的li的宽度渐渐地变为240
    liss[i].onmouseout = function () {
        for (var k = 0; k < liss.length; k++) {
//                animate(liss[k], {"width": 240, "backgroundPosition": 0});
            animate(liss[k], {"left": k * 240});

        }
    };
}

var config = [
    {
        width: 400,
        top: 20,
        left: 50,
        opacity: 0.2,
        zIndex: 2
    },//0
    {
        width: 600,
        top: 70,
        left: 0,
        opacity: 0.8,
        zIndex: 3
    },//1
    {
        width: 800,
        top: 100,
        left: 200,
        opacity: 1,
        zIndex: 4
    },//2
    {
        width: 600,
        top: 70,
        left: 600,
        opacity: 0.8,
        zIndex: 3
    },//3
    {
        width: 400,
        top: 20,
        left: 750,
        opacity: 0.2,
        zIndex: 2
    }//4
];//其实就是一个配置单 规定了每张图片的大小位置层级透明度

var slide = document.getElementById("slide");
var ul = slide.children[0];
var lis = ul.children;
var arrow = document.getElementById("arrow");
var arrRight = arrow.children[1];
var arrLeft = arrow.children[0];
var wrap = document.getElementById("wrap");

//移入移出盒子显示arrow
wrap.onmouseover = function () {
    animates(arrow, {"opacity": 1});
};

wrap.onmouseout = function () {
    animates(arrow, {"opacity": 0});
};

change();

//通过变量去控制当前点击是否可以执行
var flag = true;

//点击右按钮
arrRight.onclick = function () {
    if (flag) {
        //点击以后首先设置不能再点了
        flag = false;
        //从config前面删除一个元素
        var temp = config.shift();
        //将删除的第一项放到最后
        config.push(temp);
        //配置单改变，我们需要让所有的li走到新的位置上
        change();
    }
};

//点击左侧
arrLeft.onclick = function () {
    if (flag) {
        flag = false;
        var temp = config.pop();
        config.unshift(temp);
        //根据新的配置单让图片归位
        change();
    }
};

$(function () {
    $("#btnSearch").focus(function () {
        $("#moren").slideDown();
        if ($("#btnSearch").val() == "请输入搜索内容") {
            $(this).val("");
        }
    });
    $("#btnSearch").blur(function () {
        $("#moren").hide();
        if ($("#btnSearch").val() == "") {
            $(this).val("请输入搜索内容");
        }
    });
});

$(function () {
    $("#music-one").focus(function () {
        $("#xinwen-one").slideDown();
    });
    $("#music-one").blur(function () {
        $("#xinwen-one").hide();
    });
});

$(function () {
    $("#music-two").focus(function () {
        $("#xinwen-two").slideDown();
    });
    $("#music-two").blur(function () {
        $("#xinwen-two").hide();
    });
});

$(function () {
    $("#music-three").focus(function () {
        $("#xinwen-three").slideDown();
    });
    $("#music-three").blur(function () {
        $("#xinwen-three").hide();
    });
});

$(function () {
    $("#music-four").focus(function () {
        $("#xinwen-four").slideDown();
    });
    $("#music-four").blur(function () {
        $("#xinwen-four").hide();
    });
});

$(function () {
    $("#music-five").focus(function () {
        $("#xinwen-five").slideDown();
    });
    $("#music-five").blur(function () {
        $("#xinwen-five").hide();
    });
});
$(function () {
    $("#music-six").focus(function () {
        $("#xinwen-six").slideDown();
    });
    $("#music-six").blur(function () {
        $("#xinwen-six").hide();
    });
});

//听歌部分

$(function () {
    $("#bofang").click(function () {
        $(this).fadeOut();
        $("#one").slideDown();
        $("#one").animate({
            "top": "0px"
        }, 500, "swing")
        $("#two").slideDown();
        $("#two").animate({
            "top": "0px"
        }, 500, "swing")
        $("#three").slideDown();
        $("#three").animate({
            "top": "0px"
        }, 500, "swing")
        $("#four").slideDown();
        $("#four").animate({
            "top": "0px"
        }, 500, "swing")
    });
});

//这个函数是让每一个li运动到config中对应的位置
function change() {
    //让每一个li运动到指定位置
    for (var i = 0; i < lis.length; i++) {
        //运动到哪
        animates(lis[i], config[i], function () {
            //是在运动完毕后触发
            flag = true;
        });
    }
}

function animates(tag, obj, fn) {
    //第一步是在函数内分析参数传递过程
    //tag = box'
    //obj = {"width": 400,"height": 450,"opacity": 0.3,"zIndex": 6,"top": 220,"left": 220}
    //fn = function () {alert("今天天气不错");}  函数表达式

    clearInterval(tag.timer);
    tag.timer = setInterval(function () {
        //假设成立法:假设当前这次定时器可以清除
        var flag = true;

        //需要同时修改多个属性
        //对对象中的每一个属性进行操作
        for (var k in obj) {
            if (k == "opacity") {
                //k - 属性名 - 字符串形式 - attr
                //obj[k] - 属性值 - target
                var target = obj[k] * 100;
                //获取结果可能是一个小数
                var leader = getStyles(tag, k) * 100 || 0;
                //缓动运动公式
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                //设置的时候
                tag.style[k] = leader / 100;
            } else if (k == "zIndex") {
                //直接设置层级，不需要渐变
                tag.style.zIndex = obj[k];
            } else {
                //普通的，带单位的样式
                //k - 属性名 - 字符串形式 - attr
                //obj[k] - 属性值 - target
                var target = obj[k];
                var leader = parseInt(getStyles(tag, k)) || 0;
                //缓动运动公式
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                //设置的时候
                tag.style[k] = leader + "px";
            }

            //检测，当前这个属性是否到达了指定位置
            if (leader != target) {
                //阻止清除定时器
                flag = false;
            }
        }
        //我们需要保证obj中每一个obj都运动到位置
        if (flag) {
            clearInterval(tag.timer);
            //我们需要保证新的运动在当前的运动执行完毕后再开始
            //在清除定时器以后，保证当前运动已经完毕了
            //animate(box, {"width": 700});
            //alert("今天天气不错");
            //当函数中的某段功能不确定的情况下，传入函数参数
            //只有函数才能保存一段代码

            //需要对fn进行有效性检测
            //最严谨的检测方式
            //if(typeof fn == "function"){
            //    //调用
            //    fn();
            //}
            //自己用，亲朋好友使用
            //使用一个短路操作
            //只要传入了fn，这时对fn进行调用
            fn && fn();
            //如果没传undefined
        }
    }, 20);
}

//getStyle(box, "width")
//获取计算后的样式的值
function getStyles(tag, attr) {
//        if (tag.currentStyle) {
//            //当你确定你要使用的是及格字母的时候,使用字符串
//            //当你使用的不是字母，而是内部保存的值，这时使用变量
//            return tag.currentStyle[attr];
//        } else {
//            return getComputedStyle(tag, null)[attr];
//        }


    return tag.currentStyle ? tag.currentStyle[attr] : getComputedStyle(tag, null)[attr];
}

function animate(obj, json) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        //true表示所有属性的数值都到达目标了
        //先假设所有属性都到达目标了
        for (var k in json) {
            //json {属性名：属性值} {k:json[k]}
            var leader = parseInt(getStyle(obj, k)) || 0;
            var target = json[k];
            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            console.log("target: " + target + "leader: " + leader + "step: " + step);
            obj.style[k] = leader + "px";
            if (leader != target) {
                flag = false;//告诉人家 我还有没到的呢
            }
        }
        //最后再判断 如果标记仍然是true说明 没有没到达的了
        //也就是都到达了
        if (flag) {
            clearInterval(obj.timer);
        }
    }, 15)
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}

function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}











