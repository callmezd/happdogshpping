$(function(){

	console.log($.cookie("init"));

	b = true;
	var str = '';
	//判断data路径
	var urL2;
	var cookieObj = JSON.parse($.cookie("init"));
	$.each(cookieObj, function(index, val) {

		if (index <= 30) {
			urL2 = "data/s_buy_data.json";
		} else {
			urL2 = index <= 62 ? "data/f_sale.json" : (index <= 76 ? "data/floor2.json" : "data/floor4.json");
		}

		$.ajax({url: urL2,type: 'GET'}).done(function(data) {
			//加载载数据
			for (var i = 0; i < data.length; i++) {
				if (data[i].id == index) {
					newLi = `<tr data-id="${data[i].id}" class="box">
							<td><input type="checkbox"/></td>
							<td class="img">
								<img src="${data[i].img}" width="80" height="80">
							</td>
							<td>${data[i].desi}</td>
							<td class="Price">${data[i].p_price.replace(/\D/g,"")}</td>
							<td class="num">
								<a class="reduce">-</a>
									<input type="text" value=${cookieObj[data[i].id]} class="tab">
								<a class="plus">+</a>
							</td>
							<td class="Sub">${data[i].p_price*cookieObj[data[i].id]}</td>
							<td><p class="del">删除</p></td>
							</tr>`
					$('#box tbody').append(newLi);
				}
			}

			$('.checked').click(function(event) {
				if ($('.checked').prop('checked') == true) {
					$.each($('#box tbody input[type=checkbox] '), function(index, val) {
						$('#box tbody input[type=checkbox] ').prop('checked', true)

					});
					Total();
				} else { //如果不是true的话我就循环所有tbody下面所有的checkbox让他们的checked为false
					$.each($('#box tbody input:checkbox '), function(index, val) {
						$('#box tbody input:checkbox ').prop('checked', false)
					});
					Total()
					$('.zong span').html('0');
				}

			});

			//
			function Total() {
				var Tot = 0;
				$.each($('#box tbody input:checkbox '), function(i) {
					if ($('#box tbody input:checkbox ').eq(i).prop('checked') == true) {
						Tot += Number($('#box tbody .Sub').eq(i).html())
						$('.zong span').html(Tot)
					}
				})
			}
			//
			$.each($('.del'), function(index, val) {
				$(this).click(function(event) {
					var index = $(this).parents(".box").index();
					var a = $(this).parent().parent().attr("data-id")
					$(this).parent().parent().remove();
					delete cookieObj[a];
					var b = JSON.stringify(cookieObj);
					$.cookie("init", b, {expires: 7,path: '/'});	
					Total();
				});
			});

			function Subtotal(index) {
				var a = $('.tab').eq(index).val()
				var b = $('.Price').eq(index).html().replace(/\D/g, '')
				c = a * b;
				$('.Sub').eq(index).html(c)
			}

			//循环所有减号的按钮
			$.each($('.reduce'), function(index, val) {
				var a = 0;
					
				$(this).click(function(event) {
					var index = $(this).parents(".box").index();
					a = Number($('.tab').eq(index).val())
					if (a == 1) {
						$('.tab').eq(index).val('1')
					} else {
						a--;
					$('.tab').eq(index).val(a)
					Subtotal(index);
					//更新cookie
					var aa = $(this).parent().parent().attr("data-id");
					cookieObj[aa]--;
					var b = JSON.stringify(cookieObj);
					$.cookie("init", b, {expires: 7,path: '/'});					
					}
					Total();
					});
			});
			//------------------------------点击加号-----------------------------------
			//			循环所有加号
			$.each($('.plus'), function(index, val) {
				var a = 0;
				$(this).click(function(event) {
					var index = $(this).parents(".box").index();
					a = Number($('.tab').eq(index).val())
					a++;
					$('.tab').eq(index).val(a)
					Subtotal(index);
					
					
					//更新cookie
					var aa = $(this).parent().parent().attr("data-id");
					cookieObj[aa]++;
					var b = JSON.stringify(cookieObj);
					$.cookie("init", b, {expires: 7,path: '/'});
					//总价
					Total();
				});
			});

			//循环所有tbody下面的checkbox当我点击的时候如果他的checked的length等于0的话我就让总价的金额为0，其实就是说如果都没有勾选的话那么总价就是0了，只有勾选的才会计算价格
			$.each($('#box tbody input:checkbox '), function(index, val) {
				//点击当前的checkbox的时候
				$(this).click(function(event) {
					Total();
					if ($('#box tbody input:checkbox:checked ').length == 0) {
						$('.zong span').html('0')
					}
				});
			});
			$('#box tbody input:checkbox ').each(function() {
				//当我点击当前的checkbox
				$(this).click(function() {
					//如果选中input的length与当前checkbox的lengt相等的话我就让全选按钮的勾选框为选中状态否则的话就为不选中状态
					if ($('#box tbody input:checkbox:checked ').length == $('#box tbody input:checkbox ').length) {
						$('#box thead input[type=checkbox] ').prop('checked', true)
					} else {
						$('#box thead input[type=checkbox] ').prop('checked', false)
					}
				})

			})

		})

	})




})