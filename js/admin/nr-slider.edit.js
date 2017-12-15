(function($) {
    window.nrSlider = {
        version : 1.0,
        name	: 'Md nr Slider',
        author	: 'noderevision.com'
    }
    nrSlider.Main = function(){
       this.panel = new nrSlider.Panel();
    }
    nrSlider.Main.prototype = {
        constructor : nrSlider.Main,
        init : function(){
            this.panel.init();
        }
    }
    $(document).ready(function () {
        var main = new nrSlider.Main();
        main.init();
    });
})(jQuery);
