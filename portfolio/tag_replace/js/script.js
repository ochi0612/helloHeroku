    var content = document.getElementById('content');
    var before = document.getElementById('before');
    var after = document.getElementById('after');
    var result = document.getElementById('result');

    function match_text(content, pregTag, changeText) {
        pregTag = pregTag.replace(/\W$/, ''); // 余分な文言削除
        var result = pregTag.split(',').join('|'); // 正規表現用に加工
        var regexp = new RegExp('(<|<\/)\\\s?(' + result + ')', 'g'); // 正規表現に作成
        var pregMatchArray = content.match(regexp); // タグの抜き出し

        if (pregMatchArray) {
            pregMatchArray.forEach(function (element) {
                var tagName = '';
                if (element !== '') {
                    tagName = element.match(/[a-z0-9]+/); // タグの文字を取得
                }
                var elementAfter = element.replace(tagName, changeText); // タグの文字を変換
                content = content.replace(element, elementAfter); // コンテンツのタグ文字を変換
            });
        }

        return content;
    }

    var allTarget = [content, before, after];
    allTarget.forEach(function (target) {
        target.addEventListener('keyup', function () {
            var contentValue = content.value;
            var beforeValue = before.value;
            var afterValue = after.value;

            var result_text = match_text(contentValue, beforeValue, afterValue);
            result.value = result_text;
        });
    });

    // var content = '<div>&euro;aaa</div>'
    // var box = document.createElement('div');
    // box.innerHTML = content;
    // content = box.innerHTML;

    // console.log(content);
    // '<div>€aaa</div>'