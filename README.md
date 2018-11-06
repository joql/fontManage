# fontManage
字体颜色大小编辑 js封装

## 使用
```
<link rel="stylesheet" type="text/css" href="main.css">
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="main.js"></script>



<script type="text/javascript">
    var settings = {
    	//绑定弹出字体菜单元素id
        'btn': 'btFontColor',
        //绑定发送框元素id
        'msg': 'msg',
    };
    $().ready(function(){
        $().fontManage();
    });
</script>


