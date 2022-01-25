$(function(){
  //登录注册切换
  $('#to-reg').on('click',function(){
    $('.login').hide()
    $('.reg').show()
  })
  $('#to-login').on('click',function(){
    $('.reg').hide()
    $('.login').show()
  })
  let form = layui.form 
  let layer = layui.layer
  //表单验证
  form.verify({
    pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    repwd:function(value) {
        let pwd = $('.reg [name=password]').val()
        if(pwd !== value){
          return'两次密码不一致'
        }
      }    
  })  

 //注册
 $('#form-reg').submit(function(e){
   e.preventDefault()
  //  console.log('ok')
   $.ajax({
     method:'POST',
     url:'/api/reguser',
     data:$(this).serialize(),
     success:function(res){
       if(res.status !==0){
       return layer.msg(res.message)
       }
       layer.msg('注册用户成功！')
       $('#to-login').click()
     }
   })
 })
 $('#form-login').submit(function(e){
   e.preventDefault()
   $.ajax({
     method:'POST',
     url:'/api/login',
     data:$(this).serialize(),
     success:function(res){
      if(res.status !==0){
        return layer.msg('用户登陆失败！')
      }
        layer.msg('用户登陆成功！')
        localStorage.setItem('token',res.token)
        // location.href='/index.html'
        location.href='/index.html'
     }

   })
 })
})
