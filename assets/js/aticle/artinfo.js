$(function() {
  let form =layui.form
  let layer = layui.layer
  let laypage =layui.laypage
  template.defaults.imports.dataFormat = function(date) {
    const dt = new Date(date)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }
  let q ={
    pagenum:1,
    pagesize:5,
    cate_id:"",
    state:"",
  }
  getartList()
  getItem()
  //获取表单数据
  function getartList() {
    $.ajax({
      method:'GET',
      url:'/my/article/list',
      data:q,
      success:function(res) {
        if(res.status!==0){
          return layer.msg('获取文章列表失败')
        }
        let Str = template('tpl-List',res)
        $('tbody').html(Str)
        parPage(res.total)
      }
    })
  }
  //删除数据
 
  $('body').on('click','.btn-dele',function() {
    let len = $('.btn-dele').length
    let id = $(this).attr('data-id')
    // console.log(len);
    layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
      //do something
      $.ajax({
        method:'GET',
        url:'/my/article/delete/'+id,
        success:function(res) {
          if(res.status !==0){
            return layer.msg('删除文章失败！')
          }
          if(len === 1){
            q.pagenum = q.pagenum===1?1:q.pagenum-1
          }
          layer.msg('删除文章成功')
          getartList()
        }
      })
      layer.close(index);
    });
  
  })
  //筛选数据
   //1、渲染文章类别
   function getItem() {
     $.ajax({
       method:'GET',
       url:'/my/article/cates',
       success:function(res) {
         let Str = template('tpl-item',res)
         $('[name=cate_id]').html(Str)
         form.render()
       }
     })
   }
   //2、点击按钮筛选
   $('#form-sele').on('submit',function(e){
     e.preventDefault()
    let cate_id = $('[name=cate_id]').val()
    let state = $('[name=state]').val()
    q.cate_id = cate_id
    // console.log(q.cate_id);
    q.state = state
    getartList()
   })
   //分页
   function parPage(total) {
    laypage.render({
      elem: 'topage',
      count: total, //数据总数，从服务端得到
      limit: q.pagesize,
      curr:q.pagenum,
      limits:[3,5,8,10],
      layout:['count','limit','prev', 'page', 'next','skip'],
      jump: function(obj, first){
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
         q.pagenum = obj.curr
         q.pagesize =obj.limit
        //首次不执行
        if(!first){
          //do something
          getartList() 
        }
      }
    })
   }
   $('body').on('click','.btn-edit',function() {
    // location.href="/article/artpub.html"
    let id = $(this).attr('data-id')
    // console.log(id);
    window.location.href="/article/artpub.html?id="+id;
  })
})
