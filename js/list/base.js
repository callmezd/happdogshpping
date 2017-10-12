function base(){
	var hezuo=document.getElementById('hezuo');
	var kehu=document.getElementById('kehu');
	var span1_ul=document.getElementsByClassName('span1_ul')[0];
	var span1_ul2=document.getElementsByClassName('span1_ul2')[0];
	hezuo.onmouseover=function(){
		span1_ul.style.display='block';
		hezuo.style.border='1px solid #CCCCCC';
		hezuo.style.borderBottom='none';
//		hezuo.style.height='32px';
		hezuo.onmouseout=function(){
			span1_ul.style.display='none';
			hezuo.style.border='none';
		}
	}
	kehu.onmouseover=function(){
		span1_ul2.style.display='block';
		kehu.style.border='1px solid #CCCCCC';
		kehu.style.borderBottom='none';
		kehu.onmouseout=function(){
			span1_ul2.style.display='none';
			kehu.style.border='none';
		}
	}
	
}
