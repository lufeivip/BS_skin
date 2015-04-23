/**
 * Created by lufei01 on 15-3-23.
 */
$(function(){
    /*左侧子菜单展开收缩*/
    $("#navigator").on("click",".nav-title",function(){
        var $li=$(this).closest("li"),
            $sub=$li.find(".sub-nav"),
            _flag=$li.hasClass("unfold");
        //debugger;
        if(!($sub.length)){return;}
        if(_flag){
            $li.removeClass("unfold");
            $sub.slideUp(300);
        }else{
            $li.addClass("unfold");
            $sub.slideDown(300);
        }
    })
    $("#nav-placeholder").on("touchstart click",function(){
        $(".pin_menu").trigger("click");
    })
    /*fullscreen(screen width >768)*/
    $(".switch_menu").on("click",function(){
        var $body=$("body");
        $body.toggleClass("fullscreen")
    })
    /*fullscreen(screen width <768)*/
    $(".pin_menu").on("click",function(){
        var $navigator=$("#navigator"),
            $navPlacehoder=$("#nav-placeholder");
        $navigator.toggleClass("pin");
        $navPlacehoder.toggle();
    })
})