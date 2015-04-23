var YYY_UTILS = {
    //query的分隔符
    querySeparator : "&&",

    //在 in-framework 中的页面的跳转
    parentGo : function(url,title,isHistory){
        var hash = parent.location.hash.substring(1);
        var queryObject = $.parseQuery({query:hash,seperate:YYY_UTILS.querySeparator});
        var originalUrl = queryObject.url;
        var originalTitle = queryObject.title;
        if(!title) title = originalTitle;
        if(!url) url = originalUrl;
        if(!isHistory) {
            window.parent.history.pushState('', '', "#title=" + title + YYY_UTILS.querySeparator + "url=" + url);
        }else{
            window.parent.history.replaceState('', '', "#title=" + title + YYY_UTILS.querySeparator + "url=" + url);
        }
        window.location.replace(url);
        // parent.location.href = parent.location.pathname + "#title=" + title + YYY_UTILS.querySeparator + "url=" + url;
    },

    //在 in-framework ，只替换url最后的参数
    //最少应该有一个参数 op
    //设计初衷，3y中有大量的url带了参数信息，而每次跳转必须带这些参数，手动拼比较痛苦。
    //例如   /materialGroup/{groupType}/{type}/list, 添砖到编辑页面， YYY_UTILS.parentGoWithOp("edit"); 跳转后的url为 /materialGroup/{groupType}/{type}/edit
    //如果原来没有结尾参数，直接添加
    parentGoWithOp : function(op,title,isHistory){
        var hash = parent.location.hash.substring(1);
        var queryObject = $.parseQuery({query:hash,seperate:YYY_UTILS.querySeparator});
        var originalUrl = queryObject.url;
        var originalTitle = queryObject.title;
        if(!title) title = originalTitle;
        var lastSlashIndex = originalUrl.lastIndexOf("/");
        var url = originalUrl.substr(0, lastSlashIndex + 1) + op;
        if(!isHistory) {
            window.parent.history.pushState('', '', "#title=" + title + YYY_UTILS.querySeparator + "url=" + url);
        }else{
            window.parent.history.replaceState('', '', "#title=" + title + YYY_UTILS.querySeparator + "url=" + url);
        }
        window.location.replace(url);
        // parent.location.href = parent.location.pathname + "#title=" + title + YYY_UTILS.querySeparator +  "url=" + url;
    },

    getOpUrl : function(op){
        var hash = parent.location.hash.substring(1);
        var queryObject = $.parseQuery({query:hash,seperate:YYY_UTILS.querySeparator});
        var originalUrl = queryObject.url;
        var lastSlashIndex = originalUrl.lastIndexOf("/");
        var url = originalUrl.substr(0, lastSlashIndex + 1)
        var backFlag = "..";
        var urlParts = url.split("/");
        if(op.indexOf(backFlag) == 0){
            urlParts.pop();
            urlParts.pop();
            op = op.substr(backFlag.length);
        }
        var url = urlParts.join("/") + op;
        return url;
    },

    //hash中url的第一项表示地区
    getAreaType : function(){
        var hash = parent.location.hash.substring(1);
        var queryObject = $.parseQuery({query:hash,seperate:YYY_UTILS.querySeparator});
        var url = queryObject.url;
        return url.split("/")[1];
    }
};