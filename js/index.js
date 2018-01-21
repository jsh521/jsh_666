// 引入远程数据
// 关于城市的信息
var city;
var tianqi;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj) {
	     city=obj.data;
         // console.log(city);
	}
})
// 获取天气信息
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		console.log(tianqi);
	}
})

// 页面加载函数
window.onload=function(){
	// 加载数据
	update();

	// 页面交互
	var pos=document.getElementsByClassName("pos")[0];
	var  cityBox=document.getElementsByClassName("city")[0];
	pos.onclick=function(){
	cityBox.style.display="block";
	}

	var  BOX=$(".city .citys .con .box");
	// console.log(BOX);
	for(let i in BOX){
	    BOX[i].onclick=function(){
		var  chengshi=this.innerHTML;
		AJAX(chengshi);
	   }
    }
	// 搜索部分
    var searchBox=document.getElementsByClassName("searchBox")[0];
    var button=document.getElementsByClassName("button")[0];
    var text;
    searchBox.onfocus=function(){
    	button.innerHTML="确认";
    	text=searchBox.value;
	    	// console.log(text);
	   }

    	button.onclick=function(){
    	var neirong=button.innerHTML;
    	if(neirong=="取消"){
    		var city3=document.getElementsByClassName("city")[0];
    		city3.style.display="none";
    	}else{
    	for(let i in city){
    		for(let j in city[i]){
    			// console.log(city[i]);
    			if(text==j){
    				AJAX(text);
    				return;
    			}else{
    				alert("没有此城市");
    				return;
    			}
    		  }
    	   }
        }

    }
    
}


// 获取点击城市的天气信息函数
function AJAX(str){
	// ``模版字符串
	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		update();
		var  city2=$(".city")[0];
		city2.style.display="none";
	}
    })
}

// 获取数据的函数
function update(){
	// 当前城市
	var pos=document.getElementsByClassName("pos")[0];
	// console.log(pos);
	pos.innerHTML=tianqi.city;	
	// 当前空气质量
	var quality_level=document.getElementsByTagName('h5')[0];
	// console.log(quality_level);
	quality_level.innerHTML=tianqi.weather.quality_level;
	// 当前温度
	var current_temperature=document.getElementsByClassName("title1")[0];
	// console.log(current_temperature);
	current_temperature.innerHTML=tianqi.weather.current_temperature+"°";
	// 当前空气状况
	var current_condition=document.getElementsByClassName("title2")[0];
	// console.log(current_condition);
	current_condition.innerHTML=tianqi.weather.current_condition;
	// 当前风的方向
	var wind_direction=document.getElementsByClassName("wind_der")[0];
	wind_direction.innerHTML=tianqi.weather.wind_direction;
	// 当前风的等级
	var wind_level=document.getElementsByClassName("wind_level")[0];
	wind_level.innerHTML=tianqi.weather.wind_level+"级";

	// 当前最高温度
	var dat_high_temperature=document.getElementsByClassName("heigher")[0];
	dat_high_temperature.innerHTML=tianqi.weather.dat_high_temperature+"°";
	// 当前最低温度
	var dat_low_temperature=document.getElementsByClassName("lower")[0];
	dat_low_temperature.innerHTML=tianqi.weather.dat_low_temperature+"°";
    // 当前空气状况
	var current_condition=document.getElementsByClassName("con")[0];
	// console.log(current_condition);
	current_condition.innerHTML=tianqi.weather.current_condition;
	//今天的天气图标
	var today_icon=document.getElementsByClassName("conPic")[0];
	// 今天天气图标：变量名。style=`background-image:url("img/${从远程获取来的id号}.png")`;  
	today_icon.style=`background-image:url("img/${
	tianqi.weather.dat_weather_icon_id}.png")`;
     

     // 明天最高温度
	var tomorrow_high_temperature=document.getElementsByClassName("tomorrow_heigher")[0];
	tomorrow_high_temperature.innerHTML=tianqi.weather.tomorrow_high_temperature+"°";
	// 明天最低温度
	var tomorrow_low_temperature=document.getElementsByClassName("tomorrow_lower")[0];
	tomorrow_low_temperature.innerHTML=tianqi.weather.tomorrow_low_temperature+"°";
	// 明天天气状况
	var tomorrow_condition=document.getElementsByClassName("tomorrow_condition")[0];
	// console.log(current_condition);
	tomorrow_condition.innerHTML=tianqi.weather.tomorrow_condition;
	// 明天的天气图标
	var tomorrow_icon=document.getElementsByClassName("tomorrow_icon")[0];
	tomorrow_icon.style=`background-image:url("img/${
	tianqi.weather.tomorrow_weather_icon_id}.png")`;

// 每小时的天气情况
	var hourlyArr=tianqi.weather.hourly_forecast;
	var wrap=document.getElementsByClassName("wrap")[0];

	// console.log(hourlyArr);
	for(let i in hourlyArr){
	// console.log(hourlyArr);创建box
	var box1=document.createElement("div");
    box1.className="box";
	// 创建time块
	var time=document.createElement("div");
	// 添加类名
	time.className="time";
	// 添加到父级元素身上
	box1.appendChild(time);
	// 添加内容
	time.innerHTML=hourlyArr[i].hour+":00";

	var icon=document.createElement("div");
	icon.className="icon";
	box1.appendChild(icon);
	// 修改样式
	icon.style=`background-image:url("img/${
	hourlyArr[i].weather_icon_id}.png")`;

	var timeTem=document.createElement("div");
	timeTem.className="timeTem";
	box1.appendChild(timeTem);
	timeTem.innerHTML=hourlyArr[i].temperature+"°";
	
	wrap.appendChild(box1);
	}

// 未来十五天的天气情况
    var dayArr=tianqi.weather.forecast_list;
	var wrap1=document.getElementsByClassName("wrap1")[0];
	for(let i in dayArr){
	// 创建box
	var box1=document.createElement("div");
    box1.className="box";
	// 创建time块
	var date=document.createElement("div");
	// 添加类名
	date.className="date";
	// 添加到父级元素身上
	box1.appendChild(date);
	// 添加内容
	date.innerHTML=dayArr[i].date;

	var tianqi_condition=document.createElement("div");
	tianqi_condition.className="tianqi";
	box1.appendChild(tianqi_condition);
	tianqi_condition.innerHTML=dayArr[i].condition;


	var icon=document.createElement("div");
	icon.className="icon";
	box1.appendChild(icon);
	// 修改样式
	icon.style=`background-image:url("img/${
	dayArr[i].weather_icon_id}.png")`;

	var heigher=document.createElement("div");
	heigher.className="heigher";
	box1.appendChild(heigher);
	heigher.innerHTML=dayArr[i].high_temperature+"°";

	var lower=document.createElement("div");
	lower.className="lower";
	box1.appendChild(lower);
	lower.innerHTML=dayArr[i].low_temperature+"°";

	var wind=document.createElement("div");
	wind.className="wind";
	box1.appendChild(wind);
	wind.innerHTML=dayArr[i].wind_direction;

	var jishu=document.createElement("div");
	jishu.className="jishu";
	box1.appendChild(jishu);
	jishu.innerHTML=dayArr[i].wind_level+"级";

	
	wrap1.appendChild(box1);
	}

// 关于城市的信息
	// 获取真个页面city
	var city1=document.getElementsByClassName("city")[0];
	// console.log(city1);
	// 循环city   i是所有的省
	for(let i in city){ 
		// 创建
	    var citys=document.createElement("div");
	    citys.className="citys";


	    var  title=document.createElement("div");
	    title.className="title";
	    title.innerHTML=i;
	    citys.appendChild(title);

	    var con=document.createElement("div");
	    con.className="con";

	    //  j是市
	    for(let j in city[i]){
	    	var box=document.createElement("div");
	    	box.className="box";
	    	box.innerHTML=j;
	    	con.appendChild(box);
	    }
	    citys.appendChild(con);
	    city1.appendChild(citys);

		}


}





