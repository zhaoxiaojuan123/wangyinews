/**
 * Created by Administrator on 2018/9/2.
 */

var $oul=$('.ulBox');
// 实现轮播图
var $listBox=$('.listBox');
    function bannerFn() {
    var mySwiper=new Swiper('.bannerBox',{
        autoplay:{
            disableOnInteraction:false , // 鼠标移上去，false图片可以轮播
            delay:1000 ,  // 一个图在当前窗口的停留时间
        },
        loop:true,  // 是否无缝滚动
        pagination: {  // 分页器
            el: '.pageBox', // 分页器的盒子
            type: 'fraction',  // 分页器的类型 1/2
            currentClass:'currentPage', //变动数字的 盒子类型
            totalClass:'totalPage'  // 总共数字 盒子的类名
            //type: 'fraction',
            //type : 'progressbar',
            //type : 'custom',
        },

    })
}


// $.ajax({
//     type:'get', //请求的方式
//     url:'data/banner.json', // 请求路径
//     data:{t:123,q:324},  // 发送给后台的数据
//     success:function (d) {  // 请求成功后执行的函数
//         console.log(d);
//         giveHtml(d);
//     },
//     error:function () { // 请求失败后执行的函数
//
//     }
// });
// 将数据转换成页面可见的元素
function giveHtml(data) {
  data=data||[];
    var str=''; // 用来存储拼接好的 结构 字符串 的
    data.forEach((item)=>{
      str+=`<li class="swiper-slide">
                    <a href="##">
                        <img src="${item.img}" alt="">
                        <div>${item.title}</div>
                    </a></li>`
    })
    $oul.html(str);
    // bannerFn();
}
// 先请求数据 再把数据放到页面上 再执行轮播图函数

// promise 写法
var p=new Promise(function (resolve,reject) {
    $.ajax({
        type:'get',
        url:'data/banner.json',
        success:function (data) {
            resolve(data)
        },
        error:function (res) {
            reject(res)
        }
    })
});
p.then(function (data) {
    // 第一个参数是promise 执行成功的函数
    console.log(data);
    giveHtml(data);
    return data;
},function () {
    // 第一个参数是promise 执行失败的函数
}).then(function (data) {
    bannerFn();
},function () {

})

//新闻列表部分
var listPro=new Promise(function (resove,reject) {
    $.ajax({
        type:'get',
        url:'data/list.json',
        data:{t:1},
        success:function (data) {
            resove(data);
            console.log(data);
        },
        error:function (res) {
            reject(res)
        }
    })
});
// 把数据放到列表中
function giveListHtml(data) {
    data=data||[];
    var str='';
    data.forEach((item)=>{
     switch (item.type){
         case 0: // 第一种无图的结构
             str+=`<a href="##">
            <div class="text_box">
                <p>${item.title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${item.num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>`;
             break;
         case 1:// 一张图
             str+=` <a href="##">
            <div class="img_box">
                <img src="${item.img}" alt="">
            </div>
            <div class="text_box">
                <p>${item.title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${item.num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>

            </div>
        </a>`;
             break;
         case 3://三张图
             str+=` <a href="##" class="three_box">
            <p>${item.title}</p>
            <div class="three_pic">
                <div>
                <img src="${item.img[0]}" alt=""></div>
                <div>
                <img src="${item.img[1]}" alt=""></div>
                <div>
                <img src="${item.img[2]}" alt=""></div>
            </div>
            <div class="comment_box">
                <em class="">
                    <span class="">${item.num}</span>
                    <span class="icon_com"></span>
                </em>
            </div>
        </a>`;
             break;
     }
    });
    $listBox.html(str);
}
listPro.then(function (data) {
    giveListHtml(data);
})


