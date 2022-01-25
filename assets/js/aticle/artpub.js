$(function () {
  let form =layui.form
  let layer = layui.layer 
  getList()
  initEditor()
  let url = location.search //获取url中"?"符后的字串 ('?modFlag=business&role=1')
  // console.log(url);
  if (url.indexOf('?') != -1) {
    // console.log(url);
  var str = url.substr(1) //substr()方法返回从参数值开始到结束的字符串；
  var strs = str.split('=')
  let id  = strs[1]
  // console.log(strs[1])
  $.ajax({
    method:'GET',
    url:"/my/article/"+id,
    success:function (res) {
      // console.log(res);
      form.val('TOget',res.data)
      form.render()
    }
  })
  }
 
     function getList() {
    $.ajax({
      method:'GET',
      url:'/my/article/cates',
      success:function(res) {
        let Str = template('tpl-list',res)
        $('[name=cate_id]').html(Str)
        form.render()
      }
    })
  }


    // 1. 初始化图片裁剪器
    var $image = $('#image')   
    // 2. 裁剪选项
    var options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#choseImg').on('click',function() {
      $('#files').click()
    })
    $('#files').on('change',function (e) {
      var file = e.target.files
      if(file.length === 0){
        return layer.msg('请选择图片')
      }
      var file = e.target.files[0]
      var newImgURL = URL.createObjectURL(file)
      $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
    })
    let art_state ="已提交"
    $('#save').on('click',function() {
      art_state ="存草稿"
    })
    //提交文章
    $('#formAdd').submit(function(e) {
      e.preventDefault()
      let fd = new FormData($(this)[0])
      fd.append('state',art_state)
      $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    fd.append('cover_img', blob)

   if(url === ""){
      // console.log("ok");
   $.ajax({
      method:'POST',
      url:'/my/article/add',
      data:fd,
      contentType: false,
      processData: false,
      success:function(res) {
        if(res.status !== 0 ){
          return layer.msg('发布文章失败！')
        }
        layer.msg('发布文章成功！')
        location.href="/article/artinfo.html"
        }
      })
   }else{
    $.ajax({
      method:'POST',
      url:"/my/article/edit",
      data:fd,
      contentType: false,
      processData: false,
      success:function () {
        layer.msg('更新文章成功！')
        location.href="/article/artinfo.html"
        }
      }) 
     }
    })     
  })
})
