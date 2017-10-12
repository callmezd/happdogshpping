var str = location.href;
var dataid = str.split("?")[1];
var urL;
if(dataid<=30){
	urL="data/s_buy_data.json";
}else{
	urL=dataid<=62?"data/f_sale.json":(dataid<=76?"data/floor2.json":"data/floor4.json");
}
	$.get(urL,function(data){
		for(var i=0;i<data.length;i++){
			if(data[i].id==dataid){
				//加载图片
				$(".big").attr("src",data[i].img);
				$(".showpic").attr("src",data[i].img);
				//加载商品详情
				$(".info>.p1").text(data[i].desi);
				$(".info>.p2").text(data[i].comName);
				$(".info .p3").text(data[i].p_price);
				$(".info .p4").text("￥"+data[i].last_price);
				
			}
		}
	})
		
	var bpic = $('.big');
	var bBox = $('#bBox');
	var showpic = $('.showpic');
	var glass = $('#glass');
	var mbox=$("#mbox");
	var show=$("#show");
		mbox.mousemove(function(e){
			show.css("display","block")
			show.css("display","block")
			var l =e.pageX-mbox.offset().left-glass.outerWidth()/2;
			var t =e.pageY-mbox.offset().top-glass.outerHeight()/2;
			if(l<0)
				l=0;
			if(t<0)
				t=0;
			if(l>=mbox.outerWidth()-glass.outerWidth())
				l=mbox.outerWidth()-glass.outerWidth();
			if(t>=mbox.outerHeight()-glass.outerHeight())
				t=mbox.outerHeight()-glass.outerHeight();
			
			glass.css({"display":"block","left":l,"top":t});
			showpic.css({"left":-l*2,"top":-t*2});
			
		})
		mbox.mouseout(function(){
				show.css("display","none");
				glass.css("display","none");
		})
//加减商品数量
$("button").click(function(){
		var num=$("#goodsNum").val();
	if(num>1){
		if($(this).text()=="-"){
			num--;
			$("#goodsNum").val(num);
		}
	}
	if($(this).text()=="+"){
		num++;
		$("#goodsNum").val(num);	
	}
})
//购物车
//我先判断一下是否有这个cookie
var init=$.cookie("init");
//如果有的话

	if($.cookie("init")){
		//我就把这个cookie转换成一个对象存到obj里面---json.parse转化成对象
		obj = JSON.parse($.cookie("init"))
		}else{
			var obj ={}
		}
		// 声明一个空的变量
		//加入购物车
	$(".add_car").click(function(){
	
		if(init==undefined){
			//获取商品数量				
			var goodsNum_val=$("#goodsNum").val();
			//获取商品id
			var goodsid=dataid;
			//obj{商品id：商品数量}
			obj[goodsid] =Number(goodsNum_val);
			
			var objTostr = JSON.stringify(obj);
			
			$.cookie("init",objTostr,{expires:7,path:"/"});
			
		}else{
			var goodsid=dataid;
			//获取为当前购物车里为当前id商品的数量没有即为0
			var num1 = obj[goodsid]||0;
			//获取按钮的要添加的商品数量
			var goodsNum_val=$("#goodsNum").val();
			//当前购物车已有的商品数量加上需要继续加入的数量
			obj[goodsid]=Number(num1)+Number(goodsNum_val);
			//保存cookie
			var objTostr = JSON.stringify(obj);
			$.cookie("init",objTostr,{expires:7,path:"/"});
		}
			console.log($.cookie())
	})
	
$(".shoppingcar").mouseenter(loadingCard())	
	
	//加载头部我的购物车卡pian
function loadingCard(){
	if($.cookie("init")){
		//获取cookie
		var cookieObj = JSON.parse($.cookie("init"));
		//var 新的商品
		var newLi="";
		//路径
		var urL2;
		//cookieObj长度
		var cookieObjlen=0;
		//总价
		var tolMoney=0;
		//总价显示
		$.each(cookieObj, function(index, val) {
			cookieObjlen++;
		//判断data路径
			if(index<=30){
				urL2="data/s_buy_data.json";
			}else{
				urL2=index<=62?"data/f_sale.json":(index<=76?"data/floor2.json":"data/floor4.json");
			}
			$('.card').html(`<li class="totalMoney">
								<p class="pay_p"></p><a href="cart.html" class="a_go_car">去购物车</a>
							</li>`);		
			$.get(urL2,function(data){
				//car num++ 商品种类数量 红圈数字;
				$(".car>.num").text(cookieObjlen);
				//记载数据
				for (var i=0;i<data.length;i++) {
					if(data[i].id==index){
						newLi=`<li class="carLi" data-id=${data[i].id}>
							<img class="carpic" src="${data[i].img}">
							<div class="cardInfo">
								<h4>${data[i].desi}</h4><br/>
								<h4>${data[i].comName}</h4>
							</div>
							<div class="cardPrice">
								<span>${data[i].p_price}x${cookieObj[index]}</span><br/>
								<a>删除</a>	
							</div>
						</li>`
					$('.card .totalMoney').before(newLi);		
					tolMoney=tolMoney+data[i].p_price*cookieObj[index];
					}
				}
					//总价
				$(".card .pay_p").html(`共${cookieObjlen}件商品 共计￥${tolMoney}`)
			})
		})
	}
}


