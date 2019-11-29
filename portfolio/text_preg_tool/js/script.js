$(function () {
    var text = document.getElementById('text');
    var drop = document.getElementById('drop');
    var btn = document.getElementById('btn');
    var fileReader;
    var file;

    // 配列の分割
    function array_slice(match_data, int) {
        var array_length = match_data.length;
        var newArr = []; // 新しく作る配列

        for (var i = 0; i < Math.ceil(array_length / int); i++) {
            var arrEl = []; // newArr に追加していく配列

            for (var j = 0; j < int; j++) {
                var p = match_data.shift(); // 元配列の先頭を取得して元配列から削除
                if (!p) {
                    break;
                } // この場合は 'ZZZ' の次に来たらループを抜ける
                arrEl.push(p); // arrEl に取得した要素を追加
            }

            newArr.push(arrEl); // 作った arrEl を newArr に追加
        }
        return newArr;
    }

    // zipファイル作成
    function Save_zip(text_data_array) {
        var zip = new JSZip();
        text_data_array.forEach(function (el, key) {
            zip.file('data-' + ++key + '.txt', el);
        });
        zip.generateAsync({
                type: 'blob'
            })
            .then(function (content) {
                saveAs(content, 'datas.zip');
                alert('ダウンロード・フォルダーに保存しました');
            });
    }

    // pタグのテキスト変更
    text.onchange = function () {
        fileReader = new FileReader();
        file = text.files[0];
        drop.innerHTML = file.name + 'が選択されました';
    }

    // 文字の取得
    btn.onclick = function () {
        var int = document.getElementById('int').value;
        var test_data = '';
        var text_data_array = [];

        // ファイルの読み込み
        fileReader.readAsText(file);
        fileReader.onload = function () {
            test_data = fileReader.result;
            var regexp = /.*?\-{8}/gs;
            var match_data = test_data.match(regexp);

            // divideの引数で何個ずつにするか配列区分するか判定
            var match_data_array = array_slice(match_data, int);

            match_data_array.forEach(function (el, key) {
                text_data_array.push(el.join(''));
            });
            Save_zip(text_data_array);
        }
    }
});