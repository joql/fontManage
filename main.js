

(function ($) {
    function getXY(obj) { 
        var position = new Array(); 
        var t = obj.offsetTop; 
        var l = obj.offsetLeft;
        position[0] = t; 
        position[1] = l; 
        return position; 
    }

    /*Get element by id*/
    function getId(id) {
        return document.getElementById(id);
    }

    /*聊天框中的字体和颜色设置*/
    function setFont(val, act, id) {
        switch(act) {
            case 'FontBold':
                if (val == true) {
                    getId(id).style.fontWeight = 'bold';
                } else {
                    getId(id).style.fontWeight = '';
                }
                break;
            case "FontItalic":
                 if (val == true) {
                    getId(id).style.fontStyle = 'italic';
                } else {
                    getId(id).style.fontStyle = '';
                }
                break;
            case 'Fontunderline':
                if (val == true) {
                    getId(id).style.textDecoration = 'underline';
                } else {
                    getId(id).style.textDecoration = '';
                }
                break;
            case 'FontColor':
                getId(id).style.color = getId('colorShow').style.backgroundColor;
                break;
            case 'ShowColorPicker':
                setColor();
                break;
        }
    }
    function closeColorPicker() {
        getId('colorTable').style.display = 'none';
    }
    function colorPicker() {       
        var baseColor = new Array(6);   
        baseColor[0] = "00";     
        baseColor[1] = "33";   
        baseColor[2] = "66";   
        baseColor[3] = "99";   
        baseColor[4] = "CC";   
        baseColor[5] = "FF";
        var myColor = "";  
        var myHTML = "";      
        myHTML = myHTML + "<div style='width:180px;height:120px;' id='colorSection'>";       
        for (i = 0; i < 6; i++) {
            for (j = 0; j < 3; j++) {     
                for(k = 0; k < 6; k++) {                     
                    myColor = baseColor[j] + baseColor[k] + baseColor[i];   
                    myHTML = myHTML + "<li onmousemove=\"document.getElementById('colorShow').style.backgroundColor=this.style.backgroundColor\" style='background-color:#" + myColor + "'></li>";   
                }   
            }   
        }
        for (i = 0; i < 6; i++) { 
            for (j = 3; j < 6; j++) {   
                for (k = 0; k < 6; k++){                     
                    myColor = baseColor[j] + baseColor[k] + baseColor[i]; //get color   
                    myHTML = myHTML + "<li onmousemove=\"document.getElementById('colorShow').style.backgroundColor=this.style.backgroundColor\" style='background-color:#" + myColor + "'></li>";   
                }   
            }           
        }    
        myHTML = myHTML + "</div><div style='border:0px; width:180px; height:10px; background:#333333' id='colorShow'></div>";
        document.getElementById("colorTable").innerHTML = myHTML;  
    }

    var COLORINIT = false;
    function setColor() {
        var position = getXY(getId('fontBar'));
        getId('colorTable').style.top = position[0] - 132 + 'px';
        getId('colorTable').style.left = position[1] + 77 + 'px';
        if (!COLORINIT) {
            colorPicker();
            COLORINIT = true;
        }
        $('#colorTable').show();
        return true;
    }


    $.fn.fontManage = function (options) {
        //你自己的插件代码
        var _html = '<div id="fontBar">\
        <select name="fontName" id="fontName">\
            <option selected="selected">字体</option>\
            <option value="SimSun" style="font-family: SimSun">宋体</option>\
            <option value="SimHei" style="font-family: SimHei">黑体</option>\
            <option value="KaiTi_GB2312" style="font-family: KaiTi_GB2312">楷体</option>\
            <option value="FangSong_GB23122" style="font-family:FangSong_GB2312">仿宋</option>\
            <option value="Microsoft YaHei" style="font-family: Microsoft YaHei">微软雅黑</option>\
            <option value="Arial">Arial</option>\
            <option value="MS Sans Serif">MS Sans Serif</option>\
            <option value="Wingdings">Wingdings</option>\
        </select>\
        <select name="fontSize" id="fontSize">\
            <option value="8">8</option>\
            <option value="9">9</option>\
            <option value="10">10</option>\
            <option value="11">11</option>\
            <option value="12" selected="selected">12</option>\
            <option value="13">13</option>\
            <option value="14">14</option>\
        </select>\
        <input type="button" title="粗体" class="font-input font-blod" data-value="true" data-key="FontBold">\
        <input type="button" title="斜体" class="font-input font-italic" data-value="true" data-key="FontItalic">\
        <input type="button" title="下划线" class="font-input font-under-line" data-value="true" data-key="Fontunderline">\
        <input type="button" title="文字颜色" class="font-input font-color"  data-key="ShowColorPicker">\
        </div> \
        <div id="colorTable"></div>';
        $('#fontManage').html(_html);

        //默认值
        var defaults = {
            'btn': 'btFontColor',
            'msg': 'msg',
        }
        //用options拓展默认选项，defaults中同名对象的值，会被options的值覆盖
        var settings = $.extend({}, defaults, options);        
        //console.log(settings);

        /*弹出设置框*/
        $('#'+settings.btn).click(function() {
            var position = getXY(getId(settings.btn));
            getId('fontBar').style.top = position[0] - 35 + 'px';
            getId('fontBar').style.left = position[1] + 3 + 'px';
            $('#fontManage #fontBar').show();
        });

            /*点击颜色块设置输入框字体颜色*/
        $(document).delegate('#colorSection', 'click', function() {
            setFont(null, "FontColor", settings.msg);
            closeColorPicker();
        });

        $('#fontManage #fontName').change(function() {
            //console.log($(this)[0].value);
            getId(settings.msg).style.fontFamily = $(this)[0].value;
        });
        $(document).on('change', '#fontManage #fontSize', function(){
            getId(settings.msg).style.fontSize = $(this)[0].value + 'pt';
        });


        $(document).bind("click",function(e) {
            /*字体设置*/
            if($(e.target).closest("#colorTable").length == 0 && $(e.target).closest("#btFontColor").length == 0 && $(e.target).closest("#fontBar").length == 0) {
                $('#fontBar').hide();
            }
        });

        /*字体颜色设置*/
        $(document).on('click', '#fontManage .font-input', function() {
            var val = $(this).data('value');
            var act = $(this).data('key');
            if (act != 'ShowColorPicker') {
                if (val == true) {
                    $(this).addClass('selected');
                    $(this).data('value', false);
                } else {
                    $(this).removeClass('selected');
                    $(this).data('value', true);
                }
            }
            setFont(val, act, settings.msg);
        });
};

    
})(jQuery);