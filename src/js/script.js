(function () {
    var oBox = document.getElementsByClassName('box');
    var key = true;
    var num = 1;
    function init () {
        if (key) {
            key = false;
            ajax('GET', 'http://localhost/waterfall/src/js/getPics.php', 'cpage=' + num, true, addDom);
            num ++;
        }
    }
    init();
    function addDom (data) {
        var dataList = JSON.parse(data);
        dataList.forEach(function (ele, index) {
            var index = getShort();
            var oDiv = document.createElement('div'),
                oImg = new Image(),
                oP = document.createElement('p'),
                oCont = document.createElement('div');
            oDiv.className = 'item';
            oCont.className = 'img-wrapper';
            oImg.src = ele.preview;
            oImg.height = 200 / ele.width * ele.height;
            oImg.onerror = function () {
                this.style.width = '202px';
                this.style.margin = '-1px';
                this.height = 200 / ele.width * ele.height;
            }
            oP.innerText = ele.title;
            oCont.appendChild(oImg);
            oDiv.appendChild(oCont);
            oDiv.appendChild(oP);
            oBox[index].appendChild(oDiv);
        });
        key = true;
    }
    function getShort () {
        var shortIndex = 0,
            i = 1;
        for (; i < oBox.length; i ++) {
            if (oBox[shortIndex].offsetHeight > oBox[i].offsetHeight) {
                shortIndex = i;
            }
        }
        return shortIndex;   
    }
    window.onscroll = function () {
        var scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var index = getShort();
        if (scrollHeight + clientHeight > oBox[index].offsetHeight) {
            init();
        }
    }
}());