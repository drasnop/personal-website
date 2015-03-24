// makes sure the tags stick at the top of the page for large displays
(function moveScroller() {
    var move = function() {
        var st = $(window).scrollTop();
        var ot = $("#filters-anchor").offset().top;
        var s = $("#filters");
        if(st > ot && window.innerWidth>=768) {
            s.css({
                "position": "fixed",
                "top": "0px",
                "box-shadow": "0px -1px 6px 0px #556e7b",
                "background-color": "#D3DDE2",
                "margin": "0",
            });
        } else {
            if(st <= ot) {
                s.css({
                    "position": "relative",
                    "top": "",
                    "box-shadow": "",
                    "background-color": "#E6EBEE",
                    "margin": ""
                });
            }
        }
    };

    // callback
    $(window).scroll(move);

    // init
    move();
})();