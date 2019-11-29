var img_count = $(".slide_show_imgs_list").children("img").length;

//レスポンシブ
$(window).on("load resize", function () {
    var w_width = $(this).width();
    var img = w_width * 0.4;
    var slide_show_imgs_width = img * 2;
    var slide_width = slide_show_imgs_width * 1.4;
    var slide_show_btns_height = img + 20;
    var slide_show_btns_width = (slide_width - slide_show_imgs_width - 20) / 4;
    var slide_show_imgs_list_width = img * 8;
    var slide_show_imgs_list_margin = img * 3 - ((slide_show_imgs_width - img) / 2);
    var slide_show_ddt_list_width = img_count * 30;


    $(".slide_show_imgs_btns > button").css({
        "width": slide_show_btns_width + "px",
        "height": slide_show_btns_height + "px"
    });

    $(".slide_show_imgs_list > img").css({
        "width": img + "px",
        "height": img + "px"
    });

    $(".slide_show_imgs").css({
        "width": slide_show_imgs_width + "px",
        "height": img + "px"
    });

    $(".slide_show_imgs_list").css({
        "margin-left": "-" + slide_show_imgs_list_margin + "px",
        "width": slide_show_imgs_list_width + "px"
    });

    $(".slide_show_dot_list").css({
        "width": slide_show_ddt_list_width + "px"
    });

});

$(function () {

    var first_img = ".slide_show_imgs_list img:first";
    var last_img = ".slide_show_imgs_list img:last";
    var first_dot = ".slide_show_dot > .slide_show_dot_list > li:first-child";
    var last_dot = ".slide_show_dot > .slide_show_dot_list > li:last-child";

    var img_count = $(".slide_show_imgs_list").children("img").length;
    const unchanged_img_count = img_count;
    var slide_timer;
    var bool = true; //連続で操作できないようにする
    var data_item = "";
    var slide_count;

    //自動でスライド切り替え
    function startSlide(time = 1000) {
        slide_timer = setTimeout(function () {
            startSlide();
            slide("auto");
        }, time);
    }

    //タイマーストップ時の処理
    function stopTimer() {
        clearTimeout(slide_timer);
        startSlide(3000); //ボタン操作後、指定した時間（引数）停止
    }

    //画像の複製
    function addCloneImg(img_count) {
        if (img_count <= 0) { //画像がない場合
            $(".slide_show_imgs_list").before("<p>画像がありません</p>");
        } else if (img_count < 8) { //画像が8枚以下の時
            img_count *= 2;
            $(".slide_show_imgs_list").find("img").clone().appendTo(".slide_show_imgs_list");
            addCloneImg(img_count);
        } else {

            for (var i = 0; i < 3; i++) { //最後の画像3枚を、順番に先頭へ移動
                $(last_img).insertBefore(first_img);
            }

            if (unchanged_img_count !== 1) {

                var add_data_num = 0;
                var create_dot_btn = "";
                var minus_dot_btn = Math.floor(unchanged_img_count / 2);

                for (var x = 0; x < unchanged_img_count; x++) {
                    if (x === 0) {
                        create_dot_btn += "<li class='point' data-num='0'></li>";
                    } else {
                        create_dot_btn += "<li data-num=" + add_data_num + "></li>";
                    }

                    console.log(add_data_num);

                    if (add_data_num >= minus_dot_btn) {
                        add_data_num *= -1;

                        if (unchanged_img_count % 2 === 0) {
                            add_data_num++;
                        }
                    } else {
                        add_data_num++;
                    }
                }
                $(".slide_show_dot > .slide_show_dot_list").append(create_dot_btn);
            }
        }
    }

    //スライドの挙動
    function slide(data_item, speed = 2000, count = 1) {
        if (bool === true) {
            stopTimer();
            bool = false;
            if (data_item === "left") {
                left(count, speed);
            } else if (data_item === "auto" || data_item === "right") {
                right(count, speed);
            } else {
                bool = true;
            }
        }
    }

    //右に動かす
    function right(count, speed) {
        if (count > 0) {

            count--;
            $.when(
                $(first_img).animate({
                    width: 'hide'
                }, {
                    duration: speed,
                    easing: 'swing',
                })
            ).done(function () {
                $(first_img).insertAfter(last_img).css('display', 'inline-block');
                $(last_dot).insertBefore(first_dot);
                right(count, speed);
            });
        } else {
            bool = true;
        }
        return;
    }

    //左に動かす

    function left(count, speed) {
        if (count > 0) {

            count--;
            $.when(
                $(last_img).insertBefore(first_img).css('display', 'none')
            ).done(function () {
                $(first_img).animate({
                    width: 'show'
                }, {
                    duration: speed,
                    easing: 'swing',
                });
                $(first_dot).insertAfter(last_dot);
                left(count, speed);
            });
        }
        bool = true;
        return;
    }

    addCloneImg(img_count);
    startSlide();

    //左右ボタン操作時
    $(".slide_show_imgs_btns > button").on('click', function () {
        data_item = $(this).data("item");
        // stopTimer();
        slide(data_item, 100);
    });

    // ドットボタン操作時
    $(".slide_show_dot > .slide_show_dot_list").children("li").on("click", function () {

        var count = $(this).data("num");

        if (count < 0) {
            count *= -1;
            slide("left", 50, count);
        } else {
            slide("right", 50, count);
        }
    });

});
