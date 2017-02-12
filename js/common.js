/**
 * Created by Administrator on 2016/12/6.
 */
function animate(tag, target) {
    clearInterval(tag.timer);
    tag.timer = setInterval(function () {
        var leader = tag.offsetLeft;
        var step = ( target - leader ) / 10;
        step = target > leader ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        tag.style.left = leader + "px";
        if (leader == target) {
            clearInterval(tag.timer);
        }
    }, 17);
}
