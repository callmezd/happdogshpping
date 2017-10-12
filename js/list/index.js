//var timer = null;
var fnowMax = -1;
var fnow = 0;
window.onload = function() {
$(".shoppingcar").mouseenter(
loadingCard()
);
	var s_buy = $("#s_buy");
	var s_btn = $("#s_btn");
	var s_buy_left = $("#s_buy_left");
	header1();
	base();
	var s_buy_bot = $('.s_buy_bot')
	var sli = $("#s_buy_list>li");
	var s_s = $(".s_s");
	var list = $("#s_buy_list");
	var s_btn = $("#s_btn");
	var s_buy_right = $("#s_buy_right");
	var s_buy_left = $("#s_buy_left");
	var s_buy_bot = $('.s_buy_bot')
	s_buy_bot.on("mouseover", sli, function() {
		s_buy_right.show();
		s_buy_left.show();
	});
	s_buy_bot.on("mouseout", function() {
		s_buy_right.hide();
		s_buy_left.hide();
	})

	var now = 0;
	var showN = 5;
	var nowMax = Math.ceil(sli.length / showN) - 1;
	//详情
		function sLi(){
		$(".sli").click(function(){
			var numid=$(this).attr("data-id");
			location.href="detai.html?"+numid;
		})
	};
	function moveList() {
		list.stop(true).animate({
			"left": (940) * now
		});
	}
	s_buy_right.click(function() {
		if (now != -nowMax) {
			now--;
			moveList();
		}
	})
	s_s.click(function() {
		sLi();
		now = 0;
	})
	s_buy_left.click(function() {
		if (now != 0) {
			now++;
			moveList();
		}
	})
	var spancard = $(".floor>.floor_top>.span_wrap>span");
	spancard.mouseover(function() {
		$(this).addClass("active").siblings().removeClass("active");
	})

	var f_sale_left = $('.f_sale_left');
	var f_sale_right = $('.f_sale_right');
	var f_sale_list = $("#f_sale_list");
	f_sale_list.css("width","50000px")
	var fli = $('.fli')

	var fnowmax = Math.ceil(fli.length / showN);
	var l = (fli.width() + 8) * 5;
	var time0 = $('.floor_1>.floor_top>.span_wrap>.time0');
//	var fnowMax = -1;
	var f_info = fli.children('.f_info');
	var f_info1 = f_info.children('.f_info1');
	var ss = 0;
	


	function moveFlist() {
		f_sale_list.animate({
			'left': l * fnow
		})
	}
	f_sale_right.click(function() {
		cc(fnowMax)
		if (fnow != fnowMax) {
			fnow--;
			moveFlist();
		}
	})
	f_sale_left.click(function() {
		if (fnow != 0) {
			fnow++;
			moveFlist();
		}
	})
	var insetime = $('.insetime');
	//tian0函数
	function tian0(num) {
		if (num < 10) {
			num = "0" + num;
		}
		return num;
	}

	var ftopright = $('.cool>.floortop>.ftopright');
	var f5span = ftopright.children('span');
	f5span.mousemove(function() {
		var _this = $(this);
		_this.addClass('active').siblings().removeClass('active');
		var _prev = _this.prev();
		_prev.children("a").addClass('noactive');
		_prev.siblings().children("a").removeClass('noactive');
	})
	sLi();
}
	function tian0(num) {
		if (num < 10) {
			num = "0" + num;
		}
		return num;
	}
//今日直播ajax
$.ajax({
	type: "get",
	url: "data/s_buy_data.json",
	dataType: "json",
	success: function(data) {
		var list = $("#s_buy_list");
		var s_s = $(".s_s");

		for (var i = 0; i < data.length; i++) {
			var str = "";
			if (data[i].type == "s_now") {
				str = $(`<li class="sli" data-id="${data[i].id}">
				<div class="img_wrap">
					<img src="${data[i].img}" alt="" />
				</div>
					<p class="desi p_hover">${data[i].desi}</p>
					<p class="comName p_hover">${data[i].desi}</p>
					<p class="price">
						<span>￥</span>
						<span class="p_price">${data[i].p_price}</span>
						<span class="last_price"></span>
					</p>
			</li>`);
				list.append(str);
			}
		}
		var sli = $('.sli');
		list.css("width", data.length * sli.width());
		s_s.click(function() {
			list.css("left", 0);
			list.html("");
			$(this).addClass("span_active").siblings().removeClass("span_active");
			var str1 = "";
			for (var i = 0; i < data.length; i++) {
				if (data[i].type == $(this).attr("data-type")) {
					str1 = $(`<li class="sli" data-id="${data[i].id}" >
							<div class="img_wrap">
							<img src="${data[i].img}" alt="" />
							</div>
							<p class="desi p_hover">${data[i].desi}</p>
							<p class="comName p_hover">${data[i].desi}</p>
							<p class="price">
								<span> 	￥</span>
								<span class="p_price">${data[i].p_price}</span>
								<span class="last_price"></span>
							</p>
						</li>`);
					list.append(str1);
				}
			}
		})
		
	
		
	}
})

//限时抢购
$.ajax("data/f_sale.json").done(function(data){
	var f_span = $(".floor_1>.floor_top>.span_wrap>span");
	var f_sale_list = $("#f_sale_list");
	//加载f_sale_01数据
	for (var i = 0; i < data.length; i++) {
		if (data[i].type == "f_sale_01") {
			var li = "";
			li = $(`<li class="fli" data-id="${data[i].id}" data-tpye="${data[i].type}">
				<div class="img_wrap">
					<img src="${data[i].img}" alt="" />
				</div>
					<div class="f_info">
						<span class="f_info1 ${data[i].type}"></span><span class="insetime ${data[i].type}"></span>
					</div>
					<p class="desi p_hover">${data[i].desi}</p>
					<p class="comName p_hover">${data[i].comName}</p>
					<p class="price">
						￥<span class="p_price">${data[i].p_price}</span><span class="last_price">￥${data[i].last_price}</span>
						<a>立即抢购</a>
					</p>
			</li>`)
			f_sale_list.append(li);
		}
	}
	return data;
}).done(function(data){
	var timer = null;
	$('.floor_1>.floor_top>.span_wrap>.time0').mouseenter(function() {
		// 停止前一个计时
		clearTimeout(timer);
		//f_sale_list恢复初始位置
		fnow=0;
		$("#f_sale_list").css("left", 0)
						 .html(" ");
		
		// 加载数据
		for (var i = 0; i < data.length; i++) {
			if (data[i].type == $(this).attr('data-type')) {
				var data_type = $(this).attr('data-type');
	
				li = $(`<li class="fli ${data_type}" data-tpye="${data_type}" data-id="${data[i].id}">
				<div class="img_wrap">
					<img src="${data[i].img}" alt="" />
				</div>
					<div class="f_info">
						<span class="f_info1 ${data[i].type}"></span><span class="insetime ${data[i].type}"></span>
						
					</div>
					<p class="desi p_hover">${data[i].desi}</p>
					<p class="comName p_hover">${data[i].comName}</p>
					<p class="price">
						￥<span class="p_price">${data[i].p_price}</span><span class="last_price">￥${data[i].last_price}</span>
						<a>立即抢购</a>
					</p>
			</li>`)
				$("#f_sale_list").append(li);
			}
		}
		//更新f_sale_list的右移动最大值fnow
		fnowMax = -Math.ceil($('#f_sale_list').children().length / 5) + 1;
		
		
		// 计时效果		
		var type = $(this).data("time");
		var nextHour = 0;
		

		nextHour=type==9?15:(type==20?24:20);
		var nowHour = new Date().getHours();

		//判断当前活动专场s			
		var s = new Date().getHours();
			s = s < 9 ? 0 : (s < 15 ? 9 : (s < 20 ? 15 : 20));
		//当前活动已结束	
		if (s > type) {
			$(".f_info").text("已结束");
			//价格样式			
			$("#f_sale_list>li>.price").addClass("end");
			//价格提示
			$("#f_sale_list>li>.price>a").text("已结束");
			return;
		}
		
		// 计时函数
		function calc() {
			var now = new Date(); // 当前时间
			var nextTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), nextHour); // 下一计时
			var starTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), type); // 下一计时
			
			//当前活动进行时			
			if(s==type){
				var diff = Math.ceil((nextTime - now) / 1000); // 时间差
				//提示添加活动样式
				$(".f_info").addClass("f_info_active");
				//价格样式
				$("#f_sale_list>li>.price").addClass("active");
				//购买默认为立即抢购
				$("#f_sale_list>li>.price>a").text("立即抢购");
				//倒计时信息
				$(".f_info1").text("距结束");
			}
			//当前活动未开始时						
			if(s<type){
				var diff = Math.ceil((starTime - now) / 1000); // 时间差
				//提示添加等待样式
				$(".f_info").addClass("f_info_wait");
				//价格样式
				$("#f_sale_list>li>.price").addClass("wait");
				//购买提示
				$("#f_sale_list>li>.price>a").text("提前看看");
				//倒计时信息
				$(".f_info1").text("距开始");
			}
			var second = ("0" + (diff % 60)).slice(-2),
					minute = ("0" + Math.floor(diff / 60)%60).slice(-2),
					hour = ("0" + Math.floor(diff / (60*60))).slice(-2);
			var result = `${hour}:${minute}:${second}`;

				$(".insetime").text(result);
			if (diff > 0)
				timer = setTimeout(calc, 1000);
		}
		
		
		calc();
		//加载详情页
		fLi();
		
	}).eq(0).trigger("mouseenter");
	//详情页函数
	function fLi(){
		$('.fli').click(function(){
			var numid=$(this).attr("data-id");
			location.href="detai.html?"+numid;
		})
	}
	fLi();
	
	
});

	//新品推荐 floor2
$.ajax({
		type: "get",
		url: "data/floor2.json",
		dataType: "json",
		success: function(data) {
			var floor_2_list = $('#floor_2_list');
			var str = '';
			var show = 5;
			for (var i = 0; i < show; i++) {
				str = $(`<li class="f2li" data-id="${data[i].id}">
					<img src="${data[i].img}"/>
					<p class="pp">${data[i].desi}</p>
					<p class="pp">${data[i].comName}</p>
					<p class="price">
						<span>￥</span><span class="p_price">${data[i].p_price}</span>
						<span class="last_price">￥${data[i].last_price}</span>
					</p>
				</li>`)

				floor_2_list.append(str)

			}
			var newgoods = $('.newgoods');
			var a = Math.ceil(data.length / 5);
			var n = 1;
			var len = data.length;
			var str1 = " ";
			newgoods.click(function() {
				if(n==a){
					n=0;
				}
				if (n != a) {
					n += 1;
					floor_2_list.html(" ");
					for (var i = (n - 1) * show; i < Math.min((n * show), len); i++) {
						str1 = $(`<li class="f2li" data-id="${data[i].id}">
					<img src="${data[i].img}"/>
					<p class="pp">${data[i].desi}</p>
					<p class="pp">${data[i].comName}</p>
					<p class="price">
						<span>￥</span><span class="p_price">${data[i].p_price}</span>
						<span class="last_price">￥${data[i].last_price}</span>
					</p>
				</li>`)
						floor_2_list.append(str1)
					}
				}
				//详情页
				f2Li();
			})
			function f2Li(){
				$(".f2li").click(function(){
					var numid=$(this).attr("data-id");
					location.href="detai.html?"+numid;
				})
			}
				f2Li();
		}
	})
//floor3 活动
$.ajax({
	type: 'get',
	url: "data/floor3.json",
	datatype: "json",
	success: function(data) {
		var li = '';
		var f3_list = $('.floor_3>ul');
		for (var i = 0; i < data.length; i++) {
			li = $(`<li>
				<img src="${data[i].img}">
				<div class="liwrap">
					<div class="tips">
						<p class="p1">5折起</p>
						<p class="p2">立即抢购</p>
					</div>
				</div>
			</li>`)
			f3_list.append(li)

		}
	}

})

//floor4-floor10  cool
$.ajax({
	type: "get",
	url: "data/floor4.json",
	dataType: "json",
	success: function(data) {
		var list = $(".cool>.floorlist");
		var f4span = $(".cool>.floortop>.ftopright>span");;
		for (var i = 0; i < data.length; i++) {
			var newlist=$(`.cool>.floorlist[data-type$="${data[i].goodstype}"]`);
			var li = "";
				if (data[i].type == "01") {
					str = $(`<li class="cooli" data-id="${data[i].id}">
					<img src="${data[i].img}" style="width: 100%;height: 182px;"/>
						<p class="pp">${data[i].desi}</p>
						<p class="pp">${data[i].comName}</p>
						<p class="price">
							<span>￥</span><span class="p_price">${data[i].p_price}</span>
							<span class="last_price">￥${data[i].last_price}</span>
						</p>
				</li>`);
					newlist.append(str);
				}
		}
		f4span.mousemove(function() {
			var newlist=$(this).parent().parent().next()
			var aa=newlist.attr('data-type');
			newlist.html(`<li class="f4_li1"></li>`);
			var li = "";
			for (var i = 0; i < data.length; i++) {
				if(data[i].goodstype==aa){
					if (data[i].type == $(this).attr("data-type")) {
						li = $(`<li class="cooli" data-id="${data[i].id}" >
								<img src="${data[i].img}" alt="" />
								<p class="pp">${data[i].desi}</p>
								<p class="pp">${data[i].comName}</p>
								<p class="price">
								<span>￥</span><span class="p_price">54</span>
								<span class="last_price">￥4</span>
								</p>
							</li>`);
						newlist.append(li);
					}
				}
			}
			
			f4Li()
		})
		
		
		function f4Li(){
			$(".cooli").click(function(){
				var numid=$(this).attr("data-id");
				location.href="detai.html?"+numid;
			})
		}
		f4Li()
	}
})
//brand floor4-floor10
$.ajax({
	type: "get",
	url: "data/brand.json",
	dataType: "json",
	success: function(data){
		var li="";
		for (var i=0;i<data.length;i++) {
			var newlist=$(`.floor>.hotbrand>.hotlist[data-type$="${data[i].type}"]`);
			if(newlist.attr("data-type")==data[i].type){
				li=$(`<li>
					<img src="${data[i].img}"/>
				</li>
				<span></span>`)
				newlist.append(li)
			}
		}
	}
})