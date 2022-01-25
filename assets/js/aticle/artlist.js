$(function () {
  let layer =layui.layer
  let form = layui.form
  getArtList()
  //获取表格数据
  function getArtList() {
    $.ajax({
      method:'GET',
      url:'/my/article/cates',
      success:function(res) {
        if(res.status !== 0 ){
          return layer.msg('获取文章分类失败！')
        }
        let Str = template('tpl-list',res)
        $('tbody').html(Str)
      }
    })    
  }
  //添加分类
  let AddIndex =null
  $('#btn-add').on('click',function() {
    AddIndex = layer.open({
      type:1,
      title: '添加文章类别',
      area: ['500px', '250px'],
      content: $('#tpl-add').html()
    });     
  }) 
  //提交添加数据
  $('body').on('submit','#tableAdd',function(e) {
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/my/article/addcates',
      data:$(this).serialize(),
      success:function(res){
        if(res.status !==0){
          return layer.msg('添加文章类别失败')
        }
        layer.close(AddIndex)
        layer.msg('添加文章类别成功')
        getArtList()
      }
    })
  })
  //编辑文章类别
  $('body').on('click','#btn-edit',function() {
    layer.open({
      type:1,
      area:['500px','250px'],
      title: '编辑类别',
      content: $('#tpl-edit').html()
    });
    let id =$(this).attr('data-id') 
    $.ajax({
      method:'GET',
      url:'/my/article/cates/'+id,
      success:function(res) {
        if(res.status !==0){
          return layer.msg('获取分类信息失败')
        }
         layer.msg('获取分类信息成功！')
         form.val('formEdit',res.data)
      }
    })    
      
  })
  $('body').on('submit','#tableEdit',function() {
    $.ajax({
      method:'POST',
      url:'/my/article/updatecate',
      data:$(this).serialize(),
      success:function(res) {
        if(res.status !==0){
          return layer.msg('获取分类信息失败！')
        }
           layer.msg('获取分类信息成功！')
           getArtList()
      }
    })
  })
  //删除文章类别
  $('body').on('click','.btn-dele',function() {
    let id =$(this).attr('data-id') 
    layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
      $.ajax({
        method:'GET',
        url:'/my/article/deletecate/'+id,
        success:function(res) {
          if(res.status !==0){
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          getArtList()
        }
      })     
      layer.close(index);
    });
  })
})
