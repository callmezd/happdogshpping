//banner
	function cc(a){return console.log(a)}

function header1(){
	var banner=document.getElementById("banner");
	var banner_li=banner.children[0].children;
	var banner_btn_wrap=document.getElementsByClassName("banner_btn_wrap")[0];
	var banner_btn_span=document.querySelectorAll('.banner_btn_wrap>span');
	var now=0;
	var next=0;
	
//	自动轮播
	autoPlay();
	function autoPlay(){
		timer=setInterval(function(){
			next++;
			next%=banner_li.length;
			tab()
		},3000)
	}
//  轮播
	function tab(){
		move(banner_li[now],{'opacity':0})
		move(banner_li[next],{'opacity':"100"})
		for(var j=0;j<banner_btn_span.length;j++){
			banner_btn_span[j].className='';
		}
		banner_btn_span[next].className='active';
		now=next;
	}
	
	for(var i=0;i<banner_btn_span.length;i++){
		banner_btn_span[i].index=i
		banner_btn_span[i].onclick= function(){
			for(var j=0;j<banner_li.length;j++){
				banner_btn_span[j].className='';
			}
			next = this.index;
			banner_btn_span[next].className='active';
			tab()
		}	
	}
	
	var all_top=document.getElementById("all_top");
	alltop();
	}
function alltop(){
	window.onscroll=function(e){
		var e=e||event;
		if(document.body.scrollTop>600){
			all_top.style.display="block";
		}else{
		all_top.style.display="none";
		}
	}
}
$(".shoppingcar").mouseenter(loadingCard());
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

