$(function(){
  let form = layui.form
  let layer = layui.layer
  form.verify({
    username:function (value){
      if(value.length>6){
        return'用户名最长1-6字符'
      }
    }
  })
  infoUser()
  function infoUser(){
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success:function(res){
        // console.log(res);
        if(res.status !== 0){
          return layer.msg("获取用户信息失败")
        }
        form.val('USERinfo',res.data)
      }
    })   
   }
   $('#btnReset').on('click',function(e) {
    e.preventDefault()
    infoUser() 
  })
   $('.layui-form').on('submit',function(e){
     e.preventDefault()
     $.ajax({
       method:'POST',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res) {
          if(res.status !==0){
            return layer.msg('更新用户信息失败')
          }
          layer.msg('更新成功')
          window.parent.getuserinfo()
        
        }
     })
   })

})
