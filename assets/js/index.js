$(function(){
  getuserinfo()
  let layer = layui.layer
  $('#close').on('click',function(){
    layer.confirm('确认退出登陆?', {icon: 3, title:'提示'}, function(index){
      localStorage.removeItem('token')
      location.href="/login.html"
      layer.close(index);
    });
  })
})
  function getuserinfo(){
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success:function(res){
        if(res.status !==0){
          return layer.msg('加载失败！')
        }
        rendeAvatar(res.data)
      }
    })
  }
  function rendeAvatar(user){
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp'+name)
    if(user.user_pic !== null){
     $('.layui-nav-img').attr('src',user.user_pic).show() 
     $('.text-avatar').hide()
    }else{
      $('.layui-nav-img').hide()
      let first = name[0].toUpperCase()
       $('.text-avatar').html(first).show()
    }
  }
