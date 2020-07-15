$(function () {
    $('#title').on('keyup', function (e) {
        if (e.keyCode == 13) {
            var _val = $(this).val();
            if ($(this).val().trim() == '') {
                alert('请输入内容');
                $(this).val('')
            } else {
                var local = getData();
                local.push({ title: _val, done: false })
                saveData(local);
                load()
            }
        }
    })
    //取数据
    function getData() {
        var data = localStorage.getItem('todolist');
        if (data == null) {
            return []
        } else {
            return JSON.parse(data);
        }
    }
    //存数据
    function saveData(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }
    //渲染页面
    load();
    function load() {
        $('ol,ul').empty();
        var _val = $('#title').val();
        var data = getData();
        saveData(data);
        var todeCount = 0;//正在进行时个数
        var doneCount = 0;//已完成个数
        $(data).each(function (i, el) {
            if (el.done) {
                $('ul').prepend(`<li><input type="checkbox" checked><p>${el.title}</p><a href="javascript:;" id='${i}'></a></li>`);
                doneCount++;
            } else {
                $('ol').prepend(`<li><input type="checkbox"><p>${el.title}</p><a href="javascript:;" id='${i}'></a></li>`)
                todeCount++;
            }
        })
        // $('#todocount').text(todeCount);
        // $('#donecount').text(doneCount);
        $('#donecount').text($('ul li').length);//第二种方法这样就不用声明变量了
        $('#todocount').text($('ol li').length);
        $('#title').val('')
    }
    //打钩
    $('ol,ul').on('click','input',function() {
        var index = $(this).siblings('a').prop('id');
        var data = getData();
        data[index].done = $(this).prop('checked');
        //正常思维是让已完成的事情返回到进行事件的最后面
        var el = data[index]; //先保存当前点击的已完成事件元素
        data.splice(index,1);//再删除
        data.push(el);//再把它加到最后面了
        saveData(data);//再重新保存渲染
        load();
    })



    //打钩
    // $('ol,ul').on('click', 'input', function () {
    //     var index = $(this).siblings('a').prop('id');
    //     var data = getData();
    //     data[index].done = $(this).prop('checked');
    //     saveData(data);
    //     load()
    // })

    $('ol,ul').on('click','a',function() {
        var index = $(this).prop('id');
        var data = getData();
        data.splice(index,1);
        saveData(data);
        load();
    })




    // //删除
    // $('ol,ul').on('click', 'a', function () {
    //     var index = $(this).prop('id');
    //     var data = getData();
    //     data.splice(index, 1);
    //     saveData(data);
    //     load();
    // })

})