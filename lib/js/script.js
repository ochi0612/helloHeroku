var imgs = {
    'img_path': [
        './lib/imgs/cat/1ddff29af64ba9fcc430ae98b4fc0658_t.jpeg',
        './lib/imgs/cat/2c749c51ee48958776c8ea5ae42416a1_t.jpeg',
        './lib/imgs/cat/3b173f58f92a45ba49efcadb8f347190_t.jpeg',
        './lib/imgs/cat/3fb54db460b3ffec5115be3c92ced1f0_t.jpeg',
        './lib/imgs/cat/4b4be269de8c35723e603e847a850f71_t.jpeg',
        './lib/imgs/cat/4f41df9f8aec02a9820e60b599c54f84_t.jpeg',
        './lib/imgs/cat/5bc1cf156e2ce2ece8a04f8e52bfde2a_t.jpeg',
        './lib/imgs/cat/6d0a5ca3957f9bd6c8c2f7644d60ae18_t.jpeg',
        './lib/imgs/cat/7a3312347af2843ba398140b0f716ca6_t.jpeg',
        './lib/imgs/cat/7b80bfd77574fc1126835086384a922f_t.jpeg',
        './lib/imgs/cat/7d9734ae35aedf94064d061e34f77134_t.jpeg',
        './lib/imgs/cat/9b4dfa9e09664abc0b673cf017420c97_t.jpeg',
        './lib/imgs/cat/9b07b00e511f05533e76d760a10b61c5_t.jpeg',
        './lib/imgs/cat/9c776406a92bb1c4f5c41c78a8e493e6_t.jpeg',
        './lib/imgs/cat/29ffe5105caf1358a20c1ab850033efa_t.jpeg',
        './lib/imgs/cat/33f8c93aba57ec4523aa9f81bc40f839_t.jpeg',
        './lib/imgs/cat/63ae9be6cdf32101ecd3ed90e77fe5a1_t.jpeg',
        './lib/imgs/cat/79e452da8d3a9ccaf899814db5de9b76_t.jpeg',
        './lib/imgs/cat/84da61677f22e3a7f87394cb6e6a0fd5_t.jpeg',
        './lib/imgs/cat/90fae4fd3bfd93aad8654725a555776b_t.jpeg',
        './lib/imgs/cat/383a8bd6e98a93af4d67e8fe8f4e43d4_t.jpeg',
        './lib/imgs/cat/528a0ed876c630f92f2c10b51aec1cea_t.jpeg',
        './lib/imgs/cat/797efafe79ee69416bb39f8669f63883_t.jpeg',
        './lib/imgs/cat/4998aced8c6fbb5d3aa10e040029d8d5_t.jpeg',
        './lib/imgs/cat/42737b72f44412aff717e154d7eb583a_t.jpeg',
        './lib/imgs/cat/60224cd78cc6c308b73e8b423ac8e87a_t.jpeg',
        './lib/imgs/cat/327255eecc575aca44b6c57447cc31c9_t.jpeg',
        './lib/imgs/cat/0556232ef90e92f60ea20870562d8fcc_t.jpeg',
        './lib/imgs/cat/5097216a6a5e320a18070f46eeb70ae3_t.jpeg',
        './lib/imgs/cat/6825577e2840550c9e6fe82b01ad2773_t.jpeg',
        './lib/imgs/cat/1374009448bf7095a974461064fa6478_t.jpeg',
        './lib/imgs/cat/6434818455b86054f2dc96a8c184384f_t.jpeg',
        './lib/imgs/cat/a1f58753b2d281b1e384f1ed287789cf_t.jpeg',
        './lib/imgs/cat/a8f5dde5ab70917635a8316360293c1c_t.jpeg',
        './lib/imgs/cat/abba80cf7ce2b8a72cf42e7856852cfd_t.jpeg',
        './lib/imgs/cat/ae1868af114296c18c9c3c831dd7bc11_t.jpeg',
        './lib/imgs/cat/b8b9fa2f06546f5aa80dad1fe5da763b_t.jpeg',
        './lib/imgs/cat/ba1683b5b413c92d95850daa667e862b_t.jpeg',
        './lib/imgs/cat/bbe0c5d557cb33400ee0adf12b6e053b_t.jpeg',
        './lib/imgs/cat/c5b75334e5f16c69c761ec0539e08ec6_t.jpeg',
        './lib/imgs/cat/c98399035a53d1fa5fbd7a78619bd56c_t.jpeg',
        './lib/imgs/cat/d8ff9b9f94a66fb4ca316b2bd7c9d429_t.jpeg',
        './lib/imgs/cat/d88c9e6b728d8d84c41aa57269baf85d_t.jpeg',
        './lib/imgs/cat/d864ca4199e1ebfaa62829466f95ec82_t.jpeg',
        './lib/imgs/cat/dce9a0cd35c069cfb1ba6ea5c94c7eaf_t.jpeg',
        './lib/imgs/cat/ddc45c99f2cd847fcf6e3172d7568e45_t.jpeg',
        './lib/imgs/cat/e3e5f85521d9feb04e5366d14c8a1f80_t.jpeg',
        './lib/imgs/cat/e6d931df44b66623aca1e50f55b0e541_t.jpeg',
        './lib/imgs/cat/e39ed1daa0c7ffe779a7339a6e13b754_t.jpeg',
        './lib/imgs/cat/e66cc346c1ef4058c91e7ac2f4f2e28f_t.jpeg',
        './lib/imgs/cat/e761e1bd0c871a913c6597c1f77b366a_t.jpeg',
        './lib/imgs/cat/e2014aefca416aeb061fb8e98836af1d_t.jpeg',
        './lib/imgs/cat/f20c985a8c95657882ad268281bb83c0_t.jpeg',
        './lib/imgs/cat/f36c375c339f1212cceb122fdb9d0808_t.jpeg',
        './lib/imgs/cat/fa6ba5a1a2f238f55abe2b42b575c036_t.jpeg',
    ]
};

/**
 * hobbyページのjs
*/
var sortBtn = document.querySelector('.sort_btn');
var imgLength = imgs['img_path'].length;

// モーダル作成
function createHobbyModal(animateImg, i) {
    animateImg.addEventListener('click', function () {
        // イメージ要素の作成
        var imgPath = imgs['img_path'][i];
        var modal = document.createElement('div');
        modal.className = 'modal_img';
        modal.innerHTML = '<img src="' + imgPath + '">';
        document.body.appendChild(modal);

        // モーダル削除
        removeHobbyModal(modal);
    }, false);
}

// モーダル削除
function removeHobbyModal(modal) {
    modal.addEventListener('click', function () {
        this.parentNode.removeChild(this);
    }, false);
}

// ポインターの活性化
function pointerOn(animateImg) {
    animateImg.addEventListener('animationstart', function () {
        this.style.pointerEvents = 'auto';
    }, false);
}

// IMG削除＆作成
function restertImgSet(animateImg, i) {
    animateImg.addEventListener('animationend', function () {
        this.parentNode.removeChild(this);
        createImg(i);
    }, false);
}

//imgのセッティングをする関数。
function imgSet(animateImg, i) {
    var imgStyle = animateImg.style;

    //imgの位置（left）
    imgStyle.left = 70 * Math.random() + '%'; // 画像の幅を引いている
    // アニメーションの遅延時間（animation-delay）
    imgStyle.animationDelay = Math.random() * 200 + 's';
    // hobby_area内にクローンの作成
    var hobbyArea = document.getElementsByClassName('hobby_area');
    hobbyArea[0].appendChild(animateImg);

    // モーダル作成
    createHobbyModal(animateImg, i);
    // ポインターの活性化
    pointerOn(animateImg);
    // IMG削除＆作成
    restertImgSet(animateImg, i);
}

// imgの作成
function createImg(i) {
    // イメージ要素の作成
    var imgPath = imgs['img_path'][i];
    var animateImg = document.createElement('div');
    animateImg.className = 'animate_img';
    animateImg.innerHTML = '<img src="' + imgPath + '">';
    imgSet(animateImg, i);
}

//imgの個数分ループ
function imgMaker(n) {
    for (var i = 0; i < n; i++) {
        createImg(i);
    }
}

// 表示切替処理
function changeDisplay(imgAll, hobby) {
    // 高さ調節（animate_imgの有無）
    if (imgAll.length === 0) {
        hobby.style.height = 'calc(100vh - 50px)';
        imgAll = document.querySelectorAll('.fixed_animate_img');
    } else {
        hobby.style.height = 'unset';
    }

    // アニメーションの付け替え
    imgAll.forEach(function (val, index) {
        val.classList.toggle('animate_img');
        // クラスを add=true remove=false
        var fixedAnimateImg = val.classList.toggle('fixed_animate_img');

        if (fixedAnimateImg) {
            val.style.transition = 'opacity ' + 2 + 's';
            val.style.opacity = 1;
        } else {
            val.style.transition = 'unset';
            val.style.animationDelay = Math.random() * 200 + 's';
            val.style.opacity = 0;
        }

    }, imgAll);
}

// ソートボタン押下時の処理
sortBtn.addEventListener('click', function () {
    var imgAll = document.querySelectorAll('.animate_img');
    var hobby = document.getElementById('hobby');

    // 表示切替処理
    changeDisplay(imgAll, hobby);
}, false);

//個数指定により画像の数が決まる
imgMaker(imgLength);




var hostName = document.location.hostname;
if (hostName == "localhost" || hostName == "127.0.0.1") {
    alert("Local server!");
}