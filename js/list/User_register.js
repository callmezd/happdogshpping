	var a=0;
$(function(){
	var phone=$("#regiForm>.phone");//手机号
	var pass1=$(".pass1");//密码1
	var pass2=$(".pass2");//密码2 确认；
	$(".sub").attr("disabled","");
	//var sub=true;//提交按钮disabled状态
	//手机号输入时
	phone.focus(function(){
		$(".tips1").text("请输入11位手机号");
	})
	phone.blur(function(){
		if(/^\d{11}$/.test(phone.val())==false){
			$(".tips1").text("手机号有误");
		}else{
			$(".tips1").text(" ");
		}
	})
	//密码1输入时
	//请输入您的密码,您的密码可能为字母、数字或符号组合
	pass1.focus(function(){
		$(".tips3").text("请输入您的密码,您的密码可能为字母、数字或符号组合");
	})
	pass1.blur(function(){
		if(/^\w{6,15}$/.test(pass1.val())==false){//15
			$(".tips3").text("密码格式不对");
		}else{
			if(/\d+$|[a_zA_Z]+$/.test(pass1.val())==false){
				$(".tips3").text(" ");
			}else{
				$(".tips3").text("密码太简单，建议修改");
			}
		}
	})
	//密码2 确认密码
	pass2.focus(function(){
		$(".tips4").text("请再次输入密码");
	})
	pass2.blur(function(){
		if(pass1.val()!=pass2.val()){
			$(".tips4").text("两次密码输入不一样，请重新输入");
		}else{
			$(".tips4").text(" ");
		}
	})
	
	
	//图片验证码
	var url = "http://route.showapi.com/932-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&length=4&specials=false";
		function loadimg(){$.getJSON(url, function(data){
			$("#code").attr("src", data.showapi_res_body.image)
					  .data("sid", data.showapi_res_body.sid);
		});
	}
		loadimg();
		$("#changeImg").click(function(){
			loadimg();
		});
		console.log($("#changeImg"))
		$(".yzm").blur(function(){
			var yzm = $(".yzm").val();
			var _url = "http://route.showapi.com/932-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&checkcode="+ yzm +"&sid=" + $("#code").data("sid");
			$.getJSON(_url, function(data){
				if (data.showapi_res_body.valid) {
//					alert("成功")
					$(".tips5").text("验证成功");
					
				} else {
//					alert("失败")
					$(".tips5").text("验证失败");
				}
			})
		});
})