$(function () {
    $('#title').on('keyup', function (e) {
        if (e.keyCode == 13) {
            var _val = $(this).val();
            if (_val.trim() == '') {
                alert('请输入内容');
                // load();
                $('#title').val('');
            } else {
                var local = getData();
                local.push({
                    title: _val,
                    done: false
                })
                saveData(local)
                load();                
            }
        }

    })
    //获取本地数据
    function getData() {
        var data = localStorage.getItem('title');
        if (data == null) {
            return [];
        } else {
            return JSON.parse(data);
        }
    }
    //存储数据
    function saveData(local) {
        localStorage.setItem('title', JSON.stringify(local))
    }
    load();
    //生成li 加载页面
    function load() {
        $('ol, ul').empty();
        var data = getData();
        var todoCount = 0;//进行个数
        var doneCount = 0;//完成个数
        $(data).each(function (i, el) {
            if (el.done) {
                $('ul').prepend(`<li><input type="checkbox" checked><p>${el.title}</p><a href="javascript:;" id = '${i}'></a></li>`);
                doneCount++
            } else {
                $('ol').prepend(`<li><input type="checkbox"><p>${el.title}</p><a href="javascript:;" id = '${i}'></a></li>`);
                todoCount++;
            }
        })
        $('#todocount').text(todoCount);
        $('#donecount').text(doneCount);
        $('#title').val('')
    }
    //给input注册点击事件
    $('ol,ul').on('click', 'input', function () {
        // alert(11)
        var data = getData();
        var index = $(this).siblings('a').attr('id');
        // console.log(index);
        data[index].done = $(this).prop('checked')
        // console.log(data);
        saveData(data);
        load()
    })
    $('ol,ul').on('click', 'a', function () {
        var data = getData();
        var index = $(this).attr('id');
        data.splice(index, 1);
        console.log(data);
        saveData(data);
        load()
    })
})