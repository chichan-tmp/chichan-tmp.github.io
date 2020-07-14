
$(function () {

    var $lazyImgs = $('figure>img'),
        lazyImgs = $lazyImgs.get().map(x=>$(x)),
        $window = $(window),
        $toolbar = $('#toolbar'),
        $toolbarStatus = $toolbar.find('.status'),
        $toolbarRangeInput = $toolbar.find('input'),
        toolbarY = $(window).height() - $toolbar.outerHeight(),
        $statusBtn = $('#status>.button'),
        rate = ['1', lazyImgs.length.toString()];
    
    $toolbarRangeInput.attr('max', rate[1]);

    $lazyImgs.after('<div class="loading"><span class="iconfont icon-loading"></span></div><div class="loading-error"><span class="iconfont icon-restore"></span></div>');
    
    function fetchImg(el) {
        if (!el.attr('src')) {
            var $loading = el.parent().find('.loading'),
                $loadingError = el.parent().find('.loading-error');
            
            el.on('load', function(){
                $loading.css('visibility', 'hidden');
                el.css('border-bottom', '5px solid #5a5a5a').parent().removeClass('is-square');
            });
            el.on('error', function(){
                $loadingError.css('visibility', 'visible');
            });
            $loadingError.click(function(){
                el.attr('src', el.data('src') + "?t=" + Math.random());
                $loadingError.css('visibility', 'hidden');
                $loading.css('visibility', 'visible');
            });
            el.attr('src', el.data('src'));
        };
    };

    function editRate(pos) {
        $toolbarStatus.text(pos + ' / ' + rate[1]);
        $statusBtn.text(pos + ' / ' + rate[1]);
        $toolbarRangeInput.val(pos);
    };

    $toolbarRangeInput.change(function() {
        $(window).scrollTop(lazyImgs[parseInt($toolbarRangeInput.val())-1].offset().top);
        
    });

    $window.scroll(function(){
        var wtop = $window.scrollTop(),
            wheight = $window.height(),
            currView = 0;
        
        for (let i in lazyImgs) {
            // debug半天，原来js里 for x in array 语法，array的下标x不是int类型是string，气死老子(　^ω^)
            i = parseInt(i);
            if (lazyImgs[i].offset().top - wtop < wheight) {
                if (i+1 > currView) {
                    currView = i+1;
                };
                // 加载视窗内及之后2个图片
                fetchImg(lazyImgs[i]);
                ((i+1) in lazyImgs) && fetchImg(lazyImgs[i+1]);
                ((i+2) in lazyImgs) && fetchImg(lazyImgs[i+2]);
            };
        };
        if (currView) {
            rate[0] = currView.toString();
            editRate(rate[0]);
        };

    });
    $window.scroll();
    if (rate[0] == '2') {
        editRate('1');
    };

    $toolbar.hide();

    $(document).mousedown(function(e){
        var mouseY = e.clientY;
        if (mouseY < toolbarY) {
            $toolbar.hide();
            $statusBtn.show();
        }
    });

    $statusBtn.click(function(){
        $toolbar.show();
        $statusBtn.hide();
    });

});