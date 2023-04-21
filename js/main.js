// jQuery
$(document).ready(function () {

  
  const section = $(".wrap > section");
  const footer = $(".footer");

  let sectionSpeed = 500;
  // 각각의 섹션의 위치값 저장
  let sectionPos = [];
  let sectionIndex = 0;

  // 연속휠막기
  let scrolling = false;
  // 화면사이즈 체크
  // 화면너비 1000px이하에서는 휠작동시켜도 fullpage식 섹션전환이 되지 않게 막아주는 변수
  // ture-> fullpage식 섹션전환이 작동됨
  // fullpage모드 on <= true / fullpage모드 off <= false
  let wheeling = true;
  const sectionMenu = $(".section-menu");
  // 윈도우너비가 1000이하이면 fullpage모드 off
  // 윈도우너비가 1000초과이면 fullpage모드 on

  function wheelCheckFn() {
    let windowWidth = window.innerWidth;
    if (windowWidth <= 1000) {
      wheeling = false;
      sectionMenu.hide();
    } else {
      wheeling = true;
      sectionMenu.show();
    }
  }
  wheelCheckFn();

  // 위치파악(Y스크롤이동 px)
  // 화면리사이징이 일어날떄마다 호출됨
  // 화면리사이징시 변경되는 section위치값을 다시 sectionPos배열안에 저장함.
  function resetSection() {
    sectionPos = [];
    $.each(section, function (index, item) {
      // 각각의 seciton의 위치값 구함
      let tempY = $(this).offset().top;
      // console.log(index + ":" +tempY)
      tempY = Math.ceil(tempY);
      sectionPos[index] = tempY;
    });
    sectionPos[sectionPos.length] = Math.ceil(footer.offset().top);
    console.log(sectionPos);
  }
  // 최초에 새로고침 또는 실행시 위치값파악 =>sectionPos배열에 저장
  resetSection();
  //
  let sectionTotal = sectionPos.length;
  console.log("sectionTotal : " + sectionTotal);

  let resizeTimer;
  $(window).bind("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resizeFunction, 500);
  });
  function resizeFunction() {
    // 리사이즈시 실행할 코드
    wheelCheckFn();
    resetSection();
    if (wheeling) {
      // gsap.to($(요소명),durationTime,{설정})
      gsap.to($("html"), sectionSpeed / 1000, {
        scrollTop: sectionPos[sectionIndex],
        onComplete: function () {
          scrolling = false;
        },
      });
    }
  }


  // 마우스휠체크 및 섹션이동
  $(window).bind("mousewheel DOMMouseScroll", function (event) {
    let distance = event.originalEvent.wheelDelta;
    // 화면 사이즈에 따른 작동여부
    if (distance == null) {
      distance = event.originalEvent.detail * -1;
    }
    console.log(event.originalEvent.detail);
    console.log(distance);
    if (wheeling != true) {
      return;
    }
    // wheeling이 트루일때 연속휠 막아준다
    if (scrolling) {
      return;
    }

    // 연속마우스휠작동 막기
    scrolling = true;
    if (distance < 0) {
      sectionIndex++;
      if (sectionIndex >= sectionTotal) {
        sectionIndex = sectionTotal - 1;
      }
      console.log(sectionIndex);
    } else {
      sectionIndex--;
      if (sectionIndex <= 0) {
        sectionIndex = 0;
      }
      console.log(sectionIndex);
    }

    gsap.to($("html"), sectionSpeed / 1000, {
      scrollTop: sectionPos[sectionIndex],
      onComplete: function () {
        scrolling = false;
      },
    });
    sectionColor();
  });

  // 섹션메뉴클릭시 섹션이동
  const sectionLink = $(".section-menu a");
  // console.log(sectionLink)
  $.each(sectionLink, function (index, item) {
    $(this).click(function (e) {
      e.preventDefault();
      moveSection(index);
      sectionColor();
    });
  });

  function moveSection(_index) {
    sectionIndex = _index;
    gsap.to($("html"), sectionSpeed / 1000, {
      scrollTo: sectionPos[sectionIndex],
      onComplete: function () {
        scrolling = false;
      },
    });
  }
  function sectionColor() {
    // 포커스 표현
    sectionLink.removeClass("section-menu-active");
    sectionLink.eq(sectionIndex).addClass("section-menu-active");
    // 색상 표현
    sectionLink.removeClass("section-menu-blue");
    sectionLink.eq(sectionIndex).addClass("section-menu-blue");
  }
  // 최초 또는 새로고침시 색상 셋팅
  sectionColor();


});


$(window).scroll(function (event) {
  //ㄴ> 스크롤이벤트에대한각종정보들때매매개변수event를 받음,fun익명함수
  let st = $(this).scrollTop();
  console.log(st)
  if (st > 386) {
      $('.header').addClass('hide')
      // $('.mb-bt').addClass('hide')
  } else {
      $('.header').removeClass('hide')
      // $('.mb-bt').removeClass('hide')
  }
})

// 모바일 메뉴 기능
//.mb-bt를 저장해서 활용하자
$('.mb-bt').click(function (e) {
  e.preventDefault(); //a태그의 링크 기능을 삭제해 주겠다
  $(this).toggleClass('mb-bt-open')
  $('.mb-menu-mask').toggleClass('mb-menu-mask-active')
  $('.mb-nav').toggleClass('mb-nav-open')
  $('.mb-menu>li').height(47)

  

})

    //모바일메뉴배경을클릭시사라짐 (원사이트에는 없는 기능 )
    const mb_menu_mask = $('.mb-menu-mask')
    mb_menu_mask.click(function () {
        //모바일버튼기능초기화
        $('.mb-bt').removeClass('mb-bt-open')
        $('.mb-menu-mask').removeClass('mb-menu-mask-active')
        $('.mb-nav').removeClass('mb-nav-open')
        $('.mb-menu>li').height(54)
        $('.mb-mainmenu').removeClass('mb-mainmenu-open')
    })



//화면사이즈체크
$(window).resize(function () {
  let temp = $(window).width(); //resize 화면너비 찾기 
  // console.log(temp)
  if (temp > 1000) {
      $('.mb-bt').removeClass('mb-bt-open') //햄버거 모양 바꿔준거 
      $('.mb-menu-mask').removeClass('mb-menu-mask-active')
      $('.mb-nav').removeClass('mb-nav-open')
  } else {
      $('.all-menu-wrapper').removeClass('all-menu-wrapper-active')
      $('.all-menu-mask').removeClass('all-menu-mask-active')
  }
})
//모바일 메뉴 펼치기
//1.모바일 메뉴 불러오기
const mb_mainmenu = $('.mb-mainmenu')
//2.모바일 서브메뉴 불러오기
const mb_submenu = $('.mb-submenu')
//3.펼쳐진 서브메뉴의 높이값
let mb_submenu_height = [];  //배열 [] 안에 ul높이값 집어넣기

//4.높이값 계산을 실행
//차이점 알아두기 
//배열명.foreach(function(item, index){할일})
//$.each(배열명,function(index,element){할일})
$.each(mb_submenu, function (index) {
  //각각의 .mb-submenu로 가서 li의 개수를 파악한다.
  let count = $(this).find('li').length;// this는 각각의 submenu를 말한다 지금은 첫번째submenu의 li의 length
  //console.log(count)
  mb_submenu_height[index] = 47 * count + 22;
})
//console.log(mb_submenu_height)
let mb_li = $('.mb-menu > li')
$.each(mb_mainmenu, function (index) {
  // console.log(mb_mainmenu)
  $(this).click(function (e) {
      e.preventDefault();
      $(this).toggleClass('mb-mainmenu-open')
      //mb-mainmenu-open이 있으면 펼치고 없으면 닫기
      //let active = this.contains('')  hasclass=contains
      let active = $(this).hasClass('mb-mainmenu-open')
      if (active) {
          //클릭이 된 경우
          let temp = mb_submenu_height[index] 
          mb_li.eq(index).height(temp + 47)
          mb_li.eq(index).siblings().height(47); //해당요소의 높이 부여
      } else {
          //클릭이 안 된 경우
          mb_li.eq(index).height(47);
       

      }
     

  })
})
     




// vanilla Javascript
window.onload = function () {


  // 메뉴 기능
  const header = $('.header'),
        gnb = $('.gnb')
  let  gnbHeight=gnb.height();
  // console.log(gnbHeight)
  gnb.mouseenter(function(){
    header.css('height',gnbHeight)
  })
  gnb.mouseleave(function(){
    header.css('height',70)
  })

  


  //-------------sw-visual영역 -slide---------------



  new Swiper(".sw-visual", {
    autoplay: true,
    loop: true,
   
    effect: "fade",
    speed: 2000,
    pagination: {
        el: ".swiper-pagination-visual",
        clickable: true,
    },
    
    on: {
      slideChangeTransitionStart: function () {
        $('.box').hide(0);
        $('.box').removeClass('aos-init').removeClass('aos-animate');
      },
      slideChangeTransitionEnd: function () {
        $('.box').show(0);
        AOS.init();
      },
    } ,
    afterload: {
      slideChangeTransitionStart: function () {
        $('.box').hide(0);
        $('.box').removeClass('aos-init').removeClass('aos-animate');
      },
      slideChangeTransitionEnd: function () {
        $('.box').show(0);
        AOS.init();
      },
    } 
});

// -------------------------메뉴영역-Slide--------------------- 
new Swiper(".sw-basic", {

  navigation: {
      nextEl: ".m-btn-next ",
      prevEl: ".m-btn-prev ",
  },
  speed: 1000,
  autoplay: true,
  loop: true,
  spaceBetween: 20,
  slidesPerView: 4,
  // slidesPerGroup: 4,
  watchOverflow: true, // 슬라이드가 1개 일 때 pager, button 숨김 여부 설정
  breakpoints: {
    2800: {slidesPerView:4},
    1024: { slidesPerView: 4 },
    1000: { slidesPerView: 3, },
    960: { slidesPerView: 3, },
    800: { slidesPerView: 3, },

    760: {slidesPerView: 2,},
    676: { slidesPerView: 2 },
    620: { slidesPerView: 2 },
    500: { slidesPerView: 2 },
    480: { slidesPerView: 1},
    320: {slidesPerView: 1},
  }

});
   // 음료메뉴 탭-슬라이드 영역-----------------
   $(document).ready(function () {
    tab();
})

function tab() {
    //탭메뉴 클릭할 때 실행
    $(".tab_wrap .tit_list > li a").on("click", function (e) {
        e.preventDefault();

        //초기화
        $(".tab_wrap .tit_list > li").removeClass("active");
        $(".tab_wrap .tab_list").hide();

        //실행
        $(this).parent().addClass("active");
        var activeTab = $(this).attr("href");
        $(activeTab).show();
    });

    //초기 탭 설정
    var activeChk = 0;
    $(".tab_wrap .tit_list > li> a").each(function (i) {
        if ($(this).hasClass("active")) {
            $(this).addClass("active");
            $(this).find('a').trigger("click");
            activeChk++
        }
    });

    //active 지정 안했을 시 첫 탭메뉴 선택
    if (activeChk == 0) {
        $(".tab_wrap .tit_list > li:first-child a").trigger("click");
    }
    slider();//슬라이드 실행
}


// bean information
$(function () {
  const tabAnchor = $('.beanInfo-list li a'), 
      tabPanel = $('.tabs-panel')
  //링크를 클릭했을때 할 일
  tabAnchor.click(function (e) {
      e.preventDefault();

      tabAnchor.removeClass('active'); //전체를 클리어해놓고
      $(e.currentTarget).addClass("active")//내가 선택한거 active된다 this로 적어줘도된다 

      tabPanel.hide(); //display:none;
      let target = $(this).attr('href')
      $(target).show();

  })
  tabAnchor.eq(2).trigger("click")
});
//md's pick 슬라이드
new Swiper(".md-slide-container", {
  pagination: { // 페이징 설정
      el: '.swiper-pagination2',
      clickable: true, // 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동
  },
  navigation: {
      nextEl: ".md-btn-next ",
      prevEl: ".md-btn-prev ",
  },
  speed: 2000,
  autoplay: true,
  loop: Infinity,
  spaceBetween: 20,
  slidesPerView: 4,
  watchOverflow: true, // 슬라이드가 1개 일 때 pager, button 숨김 여부 설정
  breakpoints: {
    2800: {slidesPerView:4},
    1024: { slidesPerView: 4 },
    1000: { slidesPerView: 3, },
    960: { slidesPerView: 3, },
    800: { slidesPerView: 3, },

    760: {slidesPerView: 2,},
    676: { slidesPerView: 2 },
    620: { slidesPerView: 2 },
    500: { slidesPerView: 2 },
    480: { slidesPerView: 1},
    390: { slidesPerView: 1},
    320: {slidesPerView: 1}
}



});

    var swiper = new Swiper(".SwiperBean", {
      slidesPerView:3,
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      centeredSlidesBounds:true,
      slidesPerView: "auto",
      // loopedSlides:10,
      initialSlide:2,
      coverflowEffect: {
        rotate: 20,
        stretch: 10,
        depth: 50,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
   
    
    });
    

};


