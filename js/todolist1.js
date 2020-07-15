$(function () {
    var a = 1;
    $('#title').keyup(function (e) {
        if (e.keyCode == 13) {
            if ($(this).val().trim() == '') {
                alert('请输入内容');
            } else {
                var local = getDate(); //getDate() 要么是空数组 要么是一个有内容的数组 然后赋值给local变量
                // console.log(local);

                local.push({ title: $(this).val(), done: false });//把输入的内容以对象形式保存到local数组里
                saveDate(local);
                load();
                $(this).val('')
            }
        }
    })
    //读取本地存储数据
    function getDate() {
        //首先获取本地存储原来的数据
        var _val = localStorage.getItem('title');
        if (_val == null) { //如果本地存储没有数据
            return [];
        } else {
            return JSON.parse(_val); //有的话就转json格式获取
        }
    }
    //储存到本地数据
    function saveDate(local) {
        localStorage.setItem('title', JSON.stringify(local));
    }
    //渲染加载数据
    load()//页面一加载就渲染
    function load() {

        //先清空ol里面的小li 再重新遍历数据生成小li 避免上面回车的时候重复生成小li
        $('ol, ul').empty();
        //把本地存储的数据获取过来
        var data = getDate();//date是数组
        // console.log(data);
        var todoCount = 0;//计算正在进行的个数
        var doneCount = 0;//计算已完成的个数
        //遍历data来生成小li
        $(data).each(function (i, el) {
            if (el.done) {
                $('ul').prepend(`<li><input type="checkbox" checked><p>${el.title}</p><a href="javascript:;" id="${i}"></a></li>`);
                doneCount++;
            } else {
                $('ol').prepend(`<li><input type="checkbox"><p>${el.title}</p><a href="javascript:;" id="${i}"></a></li>`);
                todoCount++;
            }
        })

        $('#todocount').text(todoCount);
        $('#donecount').text(doneCount);
    }
    //删除操作
    $('ol,ul').on('click', 'a', function () {
        var index = $(this).attr('id');//不是有自带id属性嘛?为什么不能用prop
        // console.log(index);
        //获取本地数据
        var data = getDate();//date是数组
        console.log(data);

        //删除对应的数据
        data.splice(index, 1);//因为splice是原生方法 所以元素要是dom对象不能是jq对象
        console.log(data);

        //因为不能直接在本地数据里删除对应的数据 所以要把删除后的数据重新存储
        saveDate(data);
        //再重新渲染页面
        load();
    })
    //正在进行和已完成操作
    $('ol ,ul').on('click', 'input', function () {
        var data = getDate();
        //获取当前点击的li的索引号
        var index = $(this).siblings('a').attr('id');
        //更改对应数据的done的值
        data[index].done = $(this).prop('checked');
        // console.log(data);
        //重新保存数据
        saveDate(data);
        //渲染页面
        load()
    })

})