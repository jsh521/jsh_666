
var aa="123";
console.log(aa);
// 页面加载完成时候
window.onload=function(){
	// 1.获取元素
	let button=document.getElementsByClassName("button");
	console.log(button);
	 // 2.添加事件函数  点击确认按钮消失
	 button[0].onclick=function()
	 {
	
	var city=document.getElementsByClassName("city");
	console.log(city);
	 // 3.进行样式的操作
	city[0].style.display="none";
	}

	var pos=document.getElementsByClassName("pos");  
	console.log(pos);  
	pos[0].onclick=function()
	{
    var city=document.getElementsByClassName("city");
	console.log(city);
	city[0].style.display="block";
	}
}

// 引入远程数据
// 
// 关于城市的数据
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		// console.log(obj);
		 var city=obj.data;
		 console.log(city);
	}
})
// 关于天气的数据
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		 var tianqi=obj.data;
		 //如何获取得到
		 console.log(tianqi.weather.current_temperature);
		}
})