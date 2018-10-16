var flag = true;
var color = ['blue', 'red', 'green', 'orange']
var main = $('.main');
var num = 0;
var timer = undefined;
var speed = 5;
function cDiv() {
    var oDiv = $('<div class="row"></div>');
    var index = Math.floor(Math.random() * 4);
    for (var i = 0; i < 4; i++) {
        var iDiv = $('<div></div>')
        oDiv.append(iDiv);
    }
    if (main.children().length == 0) {
        main.append(oDiv);
    } else {
        oDiv.insertBefore(main.children()[0]);
    }
    var clickDiv = oDiv.children()[index];
    $(clickDiv).css({
        'backgroundColor': color[index]
    })
    $(clickDiv).attr('class', 'i');
}
function move(dom) {
    clearInterval(timer);
    timer = setInterval(function () {
        var step = parseInt(dom.css('top')) + speed;
        dom.css('top', step + 'px');
        if (parseInt(dom.css('top')) >= 0) {
            cDiv();
            dom.css({
                'top': -150 + 'px',
            });
        }
        var len = dom.children().length;
        if (len == 6) {
            for (var i = 0; i < 4; i++) {
                if (dom.children()[len - 1].children[i].className == 'i') {
                    dom.css('top', '-150px');
                    stop();
                }
            }
            $(dom.children()[len - 1]).remove();
        }
    }, 20);
    console.log('move');
}
function stop() {
    alert('游戏结束，得分：' + num);
    clearInterval(timer);
    flag = false;
    $('.anniu').css({
        display: 'block'
    })
}
function bindEvent() {
    main.on('click', function (event) {
        console.log('click')
        if (flag) {
            var tar = event.target;
            if (tar.className == 'i') {
                console.log('点到了')
                $(tar).css({
                    'backgroundColor': '#ccc',
                })
                tar.className = ''
                num++;
            } else {
                console.log('没点到')
                main.css('top', '0px');
                stop();
            }
            if (num % 10 == 0) {
                speed++;
            }
        }
    })
}
bindEvent();

$('.begin').on('click', function () {
    flag = true;
    num = 0;
    speed = 5;
    main.html('')
    $('.anniu').css({
        display: 'none'
    })
    $('.main').css({
        top: '-150px',
        display: 'block'
    })
    move(main);
})
$('.goon').on('click', function () {
    flag = true;
    $('.anniu').css({
        display: 'none'
    })
    $('.main').css({
        top: '-600px'
    })
    move(main);
})
$('.restart').on('click', function () {
    flag = true;
    num = 0;
    speed = 5;
    main.html('')
    $('.anniu').css({
        display: 'none'
    })
    $('.main').css({
        top: '-150px'
    })
    move(main);
})