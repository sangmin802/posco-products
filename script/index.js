$(document).ready(function(){
    var index, interva, delta, vhheight, vhoffsettop, pdt, id, name, src, date, type, layout;
    var count = 0;
    var slide = false;
    var scroll = false;
    var mobile;
    var html = '';
    var txt = '';
    var offsetTop = $('html body').offset().top;
    var type1 = [];
    var type2 = [];
    var width_size;
    var count2 = 0;

    $.ajax({
        url : 'https://raw.githubusercontent.com/sangmin802/posco-products/master/json/section4_news.json',
        method : 'get',
        dataType : 'Json'
    }).done(function(data){
        pdt = data;

        fill(pdt)
    })

    function fill(pdt){
        html = '';
        for(var i in pdt){
            txt = '';

            id=pdt[i].id;
            name=pdt[i].name;
            src=pdt[i].src;
            date=pdt[i].date;
            type=pdt[i].type;
            layout=pdt[i].layout;

            if(!layout){
                txt = '<div class="news_item1 news_item"><div class="news_img"><img src="'+src+'" alt="'+name+'"></div><div class="bgtop"></div><div class="bgbot"></div><div class="news_absolute"><div class="news_name overflow_dot">'+name+'</div><div class="news_date">'+date+'</div><div class="news_type">'+type+'</div></div></div>'
            }else if(layout){
                txt = '<div class="news_item2 news_item"><div class="news_img"><img src="'+src+'" alt="'+name+'"></div><div class="news_absolute"><div class="news_name overflow_dot">'+name+'</div><div class="news_date">'+date+'</div><div class="news_type">'+type+'</div></div></div>'
            }

            html = html + txt;
        }
        $('.news_wrap').html(html);
    }


    autoplay(count);

    // 클릭시 리스트보이기
    $(document).on('click', '.header_ul_li', function(){
        index = $(this).index();
        $('.aside_content').removeClass('block');
        $('.header_ul_li').removeClass('li_focus');
        $('.aside_content').eq(index).addClass('block');
        $('.header_ul_li').eq(index).addClass('li_focus');
    });

    // 리스트에서 x누르면 닫기
    $(document).on('click', '.hide', function(){
        $('.aside_content').removeClass('block');
    });

    // section1 슬라이드
    $(document).on('click', '.slidelist', function(){
        if(!slide){
            slide = true;
            count = $(this).index();
            clearInterval(interval);
    
            effect(count);
    
            setTimeout(function(){
                slide = false;
                autoplay(count);
            }, 2000)
        }
    })

    // section3 swiper
    sizecheck();
    $(window).resize(function(){
        sizecheck(width_size);
    })

    function sizecheck(width_size){
        width_size = window.innerWidth;
        if(width_size > 1024){
            swiper(3, 60);
            mobile = false;
            $('body').css('overflow-y', 'hidden');
        }else if(1024 >= width_size){
            mobile = true;
            $('.section3_wrap').css('opacity', '0');
            $('body').css('overflow-y', 'inherit');
            // 즉시적용이라 setTimeout 처리
            setTimeout(function(){
                if(1024 >= width_size && width_size >= 818){
                    swiper(2, 60)
                }else if(818 > width_size && width_size >= 600){
                    swiper(2, 20)
                }else if(600 > width_size && width_size >= 360){
                    swiper(1, 60)
                }
                $('.section3_wrap').css('opacity', '1');
            }, 1000)
        }
    }

    // 우측 section 바로이동
    $(document).on('click', '.direct_go', function(){
        count2 = $(this).index();
        if(!scroll){
            scroll=true;
            move(count2);
        }
    })

    $('.main_section').on('scroll touchmove mousewheel', function(e){
        if(!mobile){
            // wheel event 전달 중단
            e.preventDefault();
            // 마우스휠로 section이동
            delta = e.originalEvent.wheelDelta;
            console.log(delta);
            if(delta < 0 && count2 < 4 && !scroll){
                scroll=true;
                count2++;
                move(count2);
            }else if(delta > 0 && count2 > 0 && !scroll){
                scroll=true;
                count2--;
                move(count2);
            }
        }else if(mobile){
            e.originalEvent;
        }
    })

    // 모바일
    $(document).on('click', '.mclose', function(){
        $(this).parent().parent().removeClass('mobile_wrap');
    })

    $(document).on('click', '.mleft', function(){
        $('.mobile_aside_wrap').addClass('mobile_wrap');
    })

    var mcount = 0;
    $(document).on('click', '.mmainmenu_span', function(){
        mcount++;
        mcount = mcount%2;
        if(mcount == 1){
            $('.mmainmenu').children('.sub').addClass('mhidden');
            $('.sub').children('li').children('ul').addClass('mhidden')
            $(this).parent().children('.sub').removeClass('mhidden');
        }else{
            $('.mmainmenu').children('.sub').addClass('mhidden');
        }
    })

    var mcount2 = 0;
    $(document).on('click', '.sub span', function(){
        mcount2++;
        mcount2 = mcount2%2;
        if(mcount2 == 1){
            $('.sub').children('li').children('ul').addClass('mhidden')
            $(this).parent('li').children('.subsub').removeClass('mhidden')
        }else{
            $('.sub').children('li').children('ul').addClass('mhidden')            
        }
    })

    // 함수모음
    function swiper(perview, gap){
        var swiper = new Swiper('.section3_swiper', {
            slidesPerView: perview,
            spaceBetween: gap,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
              },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
        });
    }

    function autoplay(count){
        interval = setInterval(function(){
            count++
            count=count%5;

            effect(count);

        }, 3000)
    }

    function effect(count){
        $('.section1_bg').removeClass('opacity1')
        $('.section1_bg').eq(count).addClass('opacity1')

        $('.slidelist').removeClass('position')
        $('.slidelist').eq(count).addClass('position')
        
        $('.section1_bg').removeClass('scale')
        $('.section1_bg').eq(count).addClass('scale')

        $('.textarea').removeClass('opacity1')
        $('.textarea').eq(count).addClass('opacity1')

        $('.p_animation').removeClass('fromleft')
        $('.p_animation').removeClass('fromright')

        if(count==4){
            $('.first_p').eq(count).addClass('fromleft');
        }else {
            $('.second_p').eq(count).addClass('fromleft');
            $('.third_p').eq(count).addClass('fromright');
        }
    }

    move(0);
    function move(value){
        vhoffsettop = $('.main_section').eq(value).offset().top;
        $('.direct_go').removeClass('backgroundwhite');
        $('.direct_go').eq(value).addClass('backgroundwhite');
        $('html, body').animate({
            scrollTop : vhoffsettop
        }, {
            duration : 1000,
            complete : function(){
                scroll = false;
            }
        });
    }

    // function enableScroll(){
    //     $('.main_section').off('scroll touchmove mousewheel');
    // }
});