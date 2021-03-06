// Closest Polyfill
if (!Element.prototype.closest) {
  Element.prototype.closest = function (css) {
    var node = this;
    while (node) {
      if (node.matches(css)) return node;
      else node = node.parentElement;
    }
    return null;
  };
}

let map;

const app = {

  resours: {
    pixi: 'pixi-legacy.min.js',
    pixiFilters: 'pixi-filters.js',
    splitText: 'SplitText.min.js',
    swiper: 'swiper.min.js',
    aos: 'aos.js',
    highcharts: 'highcharts.js',
    jquery: 'jquery.min.js',
    highlight :'jquery.highlight.js',
    datepicker: 'datepicker.min.js',
    map: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDe4WeeWQ8_mWVwzL0Z9j3S4MpM6Of17wo'    
  },
  mode: '',
  touch: false,
  menuTransition: false,
  globalEvents: function () {
    document.addEventListener('touchstart', function(e){
      app.touch = true;
      document.body.classList.add('touch');
      TweenMax.to('.cursor', 0.6, {scale: 0, ease: Power3.easeOut});
      e.currentTarget.removeEventListener(e.type, arguments.callee);
    });
    document.querySelectorAll('a').forEach(function(el, i){
      el.addEventListener('mouseenter', function(){
        TweenMax.to('.cursor span', 0.5, { scale: 1.2});
      });
      el.addEventListener('mouseleave', function(){
        TweenMax.to('.cursor span', 0.5, { scale: 1});
      });
    });
    // Start header
    document.querySelectorAll('[data-action="submenu"]').forEach(function (el, i) {
      el.addEventListener('mouseenter', header);
      el.addEventListener('mouseleave', header);      
    });
    document.querySelectorAll('[data-action="submenu"] > a').forEach(function (el, i) {
      el.addEventListener('click', header);
    });
    document.querySelectorAll('.take-button').forEach(function (el, i) {
      el.addEventListener('mouseenter', function (e) {
        TweenMax.to(this, 0.5, { color: '#fff', ease: Power2.easeOut });
        TweenMax.to(this.querySelector('i'), 0.5, { y: 5, height: '40px', skewX: -31, ease: Power2.easeOut });
      });
    });
    document.querySelectorAll('.take-button').forEach(function (el, i) {
      el.addEventListener('mouseleave', function (e) {        
        TweenMax.to(this, 0.5, {
          color: function () {
            if (document.body.classList.contains('h-white')) {
              return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f' : '#ffffff';
            } else if (document.body.classList.contains('h-green')) {
              return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f' : '#5ac0b0';
            } else if (document.body.classList.contains('h-black')) {
              return '#2f2f2f';
            } else if (document.body.classList.contains('h-blue')) {
              return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f' : '#577082';
            }
          }, ease: Power2.easeOut
        });
        TweenMax.to(this.querySelector('i'), 0.5, { y: 0, height: '1px', skewX: -31, ease: Power2.easeOut });
      });
    });
    document.querySelector('header [data-action="menu-toggle"]').addEventListener('click', function(e){
      if(app.menuTransition)return;
      app.menuTransition = true;
      let active = document.querySelector('header').classList.contains('active');
      if(active){
        new TimelineMax()
        .staggerTo(document.querySelectorAll('.header__wrapper > h2, .header__nav_link, .header__right'), 0.6, {y: -90, opacity: 0, ease: Power3.easeIn}, 0.16)
        .to(['.header__blind .blind-left', '.header__blind .blind-right'], 1.4, {scaleX: 0, ease: Power3.easeOut})
        .add(function(){
          document.querySelector('header').classList.remove('active');
          document.body.classList.remove('menu-active');
        }, '-=1')
        .set('.header__wrapper, .header__wrapper h2', {clearProps: 'all'})        
        .set(document.querySelectorAll('.header__nav_link, .header__right'), {clearProps: 'all'})
        .set('.header__blind', {display: 'none'})
        .add(function(){          
          app.menuTransition = false;
        });

      }else{
        new TimelineMax()
          .set('.header__blind', {display: 'block'})
          .set('.header__wrapper', {display: 'flex', overflow: 'hidden'})
          .to(['.header__blind .blind-left', '.header__blind .blind-right'], 1.2, {scaleX: 1, ease: Power3.easeIn})
          .add(function(){
            document.querySelector('header').classList.add('active');
            document.body.classList.add('menu-active');
          }, '-=0.4')          
          .from('.header__wrapper > h2 span', 1.5, {rotationX: 90, opacity: 0, ease: Power3.easeOut}, '+=0.1')
          .staggerFrom(document.querySelectorAll('.header__nav_link, .header__right'), 1, {y: 90, opacity: 0, ease: Power3.easeOut}, 0.16, '-=1')
          .set(document.querySelectorAll('.header__nav_link, .header__right'), {clearProps: 'all'})
          .set('.header__wrapper', {overflow: 'initial'})
          .add(function(){
            app.menuTransition = false;
          });
      }      

      e.preventDefault();
    });
    document.querySelectorAll('header [data-action="back"]').forEach(function(el, i){
      el.addEventListener('click', function(e){
        let submenu = e.currentTarget.closest('.submenu');
        new TimelineMax()
          .to(e.currentTarget.closest('.submenu'), 1, {y: -100, opacity: 0, ease: Power3.easeOut})
          .set(e.currentTarget.closest('.submenu'), {clearProps: 'all'})          
        e.preventDefault();
      });
    });    

    document.querySelector('[data-action="menu-toggle"]').addEventListener('mouseenter', function(e){
      TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
    });
    document.querySelector('[data-action="menu-toggle"]').addEventListener('mouseleave', function(e){
      TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeOut });
    });
    document.querySelectorAll('[data-action="back"]').forEach(function(el, i){
      el.addEventListener('mouseenter', function(e){
        TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
      });
      el.addEventListener('mouseleave', function(e){
        TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeOut });
      });
    });    
    document.querySelector('[data-action="get-in-touch"]').addEventListener('mouseenter', function(e){
      TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
      TweenMax.to('.cursor .circle', 0.5, {backgroundColor: '#fff', ease: Power3.easeOut });
    });
    document.querySelector('[data-action="get-in-touch"]').addEventListener('mouseleave', function(e){
      TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeOut });
      TweenMax.to('.cursor .circle', 0.5, {backgroundColor: '#ee412a', ease: Power3.easeOut });
    });
    
    // =================================================================================

    // Start buttons
    document.querySelectorAll('.btn-skew').forEach(function (el, i) {
      el.addEventListener('mouseenter', function (e) {
        if(this.classList.contains('current') || app.touch)return;
        TweenMax.set(this.querySelector('i'), { transformOrigin: '0 100%' });
        TweenMax.to(this.querySelector('span'), 0.5, { color: function(){
          return el.closest('.nav__tabs') ? '#fff' : '#ee412a';
        }, ease: Power2.easeOut });
        TweenMax.to(this.querySelector('i'), 0.5, { scaleY: 1, ease: Power2.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 0});
      });
      el.addEventListener('mouseleave', function (e) {
        if(this.classList.contains('current') || app.touch)return;
        TweenMax.set(this.querySelector('i'), { transformOrigin: '0 0' });
        TweenMax.to(this.querySelector('span'), 0.5, { color: function(){
          return el.closest('.nav__tabs') ? '#ee412a' : '#fff';
        }, ease: Power2.easeOut });
        TweenMax.to(this.querySelector('i'), 0.5, { scaleY: 0, ease: Power2.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 1});
      });
    });
    // =================================================================================

    // Start Form render    
    document.querySelectorAll('.form-control').forEach(function (el, i) {
      let b = document.createElement('i');
      el.appendChild(b);
    })
    // =================================================================================
  }
}




function header(e) {
  if (e.type == 'mouseenter') {

    if(app.touch)return;

    this.classList.add('active');
    let tl = new TimelineMax();
    tl.to(this.querySelector('a'), 0.6, { color: '#ee412a' }, 'start')
      .to(this.querySelector('.icon'), 0.6, { fill: '#ee412a', rotation: 180 }, 'start')
      .to(document.querySelectorAll('.header__nav_link:not(.active) > a, .header__right a'), 0.6, {
        color: function () {
          let color;
          console.log(document.body.classList.contains('h-black'))
          if (document.body.classList.contains('h-white') || document.body.classList.contains('h-black')) {
            color = '#2f2f2f';
          } else if (document.body.classList.contains('h-green')) {
            color = document.querySelector('header').classList.contains('fixed') ? '#2f2f2f' : '#5ac0b0';
          } else if (document.body.classList.contains('h-blue')) {
            color = document.querySelector('header').classList.contains('fixed') ? '#2f2f2f' : '#577082';
          }
          return color;
        }, ease: Power0.easeNone
      }, 'start')
      .to(document.querySelectorAll('.header__nav_link:not(.active) > a .icon, .header__right .icon'), 0.6, {
        fill: function () {
          let color;
          if (document.body.classList.contains('h-white') || document.body.classList.contains('h-black')) {
            color = '#2f2f2f';
          } else if (document.body.classList.contains('h-green')) {
            color = document.querySelector('header').classList.contains('fixed') ? '#2f2f2f' : '#5ac0b0';            
          } else if (document.body.classList.contains('h-blue')) {
            color = document.querySelector('header').classList.contains('fixed') ? '#2f2f2f' : '#577082';
          }
          return color;
        }, ease: Power0.easeNone
      }, 'start')
      .to('.header__bg', 0.5, { opacity: 1, ease: Power0.easeNone }, 'start')      
      .to('.header__logo .logo--white', 0.5, { opacity: function(){
        return 0;        
      } }, 'start')
      .to('.header__logo .logo--black', 0.5, { opacity: function(){
        if (document.body.classList.contains('h-white')) {
          return 1;
        } else if (document.body.classList.contains('h-black')) {
          return 1;
        } else if (document.body.classList.contains('h-green')) {
          return 0;
        }
      } }, 'start')
      .to('.header__logo .logo--green', 0.5, { opacity: function(){
        if (document.body.classList.contains('h-white')) {
          return 0;
        } else if (document.body.classList.contains('h-black')) {
          return 0;
        } else if (document.body.classList.contains('h-green')) {
          return 1;
        }
      }}, 'start')
      .to(this.querySelector('.submenu'), 0.5, { autoAlpha: 1, ease: Power0.easeNone }, 'start')
      .fromTo(this.querySelectorAll('.submenu .row'), 0.8, { opacity: 0, y: -20, }, { opacity: 1, y: 0, ease: Power2.easeOut }, 'start')
  } else if (e.type == 'mouseleave') { 
    if(app.touch)return;
    this.classList.remove('active');
    let tl = new TimelineMax();
    tl.to(document.querySelectorAll('.header__nav_link > a, .header__right a'), 0.6, {
      color: function () {        
        if (document.body.classList.contains('h-white')) {
          return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f' : '#ffffff';
        } else if (document.body.classList.contains('h-green')) {
          return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f' : '#5ac0b0';
        } else if (document.body.classList.contains('h-black')) {
          return '#2f2f2f';
        } else if (document.body.classList.contains('h-blue')) {
          return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f' : '#577082';
        }
      }, ease: Power0.easeNone
    }, 'start')
      .to(document.querySelectorAll('.header__nav_link > a .icon, .header__right .icon'), 0.6, {
        fill: function () {
          if (document.body.classList.contains('h-white')) {
            return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f' : '#ffffff';
          } else if (document.body.classList.contains('h-green')) {
            return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f' : '#5ac0b0';
          } else if (document.body.classList.contains('h-black')) {
            return '#2f2f2f';
          } else if (document.body.classList.contains('h-blue')) {
            return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f' : '#577082';
          }
        }, rotation: 0, ease: Power0.easeNone
      }, 'start')
      .to('.header__bg', 0.5, { opacity: 0, ease: Power0.easeNone }, 'start')
      .to('.header__logo .logo--white', 0.5, { opacity: function(){
        if (document.body.classList.contains('h-white')) {
          return 1;
        } else if (document.body.classList.contains('h-black')) {
          return 0;
        } else if (document.body.classList.contains('h-green')) {
          return 0;
        }
      } }, 'start')
      .to('.header__logo .logo--black', 0.5, { opacity: function(){
        if (document.body.classList.contains('h-white')) {
          return 0;
        } else if (document.body.classList.contains('h-black')) {
          return 1;
        } else if (document.body.classList.contains('h-green')) {
          return 0;
        }
      } }, 'start')
      .to('.header__logo .logo--green', 0.5, { opacity: function(){
        if (document.body.classList.contains('h-white')) {
          return 0;
        } else if (document.body.classList.contains('h-black')) {
          return 0;
        } else if (document.body.classList.contains('h-green')) {
          return 1;
        }
      }}, 'start')
      .to(this.querySelector('.submenu'), 0.5, { autoAlpha: 0, ease: Power0.easeNone }, 'start')
      .to(this.querySelectorAll('.submenu .row'), 0.5, { opacity: 0, y: 20, ease: Power2.easeOut }, '-=0.5')
  } else if (e.type == 'scroll') {
    if(app.mode == 'tablet')return;
    let scrollTop = window.pageYOffset;    
    if (scrollTop > (window.innerHeight / 2)) {
      document.querySelector('header').classList.add('fixed');
      TweenMax.set(document.querySelectorAll('.header__nav_link:not(.active) > a, .header__right a'), { clearProps: 'all' })
      TweenMax.set(document.querySelectorAll('.header__nav_link:not(.active) > a .icon, .header__right .icon'), { clearProps: 'all' })      
      if (scrollTop > (window.innerHeight)) {
        let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"        
        if (st > app.lastScrollTop) {
          // downscroll code
          TweenMax.to('header', 0.7, { y: 0, ease: Power3.easeOut });
        } else {
          TweenMax.to('header', 0.7, { y: 100, ease: Power3.easeOut });
          // upscroll code
        }
        app.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      } else {
        TweenMax.to('header', 0.4, {
          y: 0, ease: Power1.easeOut, onComplete: function () {
            TweenMax.set('header', { clearProps: 'all' });
          }
        })
      }
    } else {
      document.querySelector('header').classList.remove('fixed');
    }
  } else if (e.type == 'click') {
    if(app.mode == 'descktop')return;
    let submenu = e.currentTarget.closest('.header__nav_link').querySelector('.submenu')    
    let tl = new TimelineMax()
      .set('header', {overflow: 'hidden'})
      .set(submenu, {display: 'block'})
      .from(submenu, 0.8, {opacity: 0, y: 100, ease: Power3.easeOut})
      .set('header', {clearProps: 'all'})
      .from(submenu.querySelector('.submenu__title h2 span'), 1.5, {rotationX: 90, opacity: 0, ease: Power3.easeOut}, '-=0.3');
      if(!submenu.classList.contains('more')){
        tl.from(submenu.querySelector('.submenu__title a'), 1, {y: 50, opacity: 0, ease: Power3.easeOut}, '-=1.2');
      }      
      tl.from(submenu.querySelectorAll('.row section'), 1, {opacity: 0, ease: Power3.easeOut}, '-=0.4')
      .from(submenu.querySelectorAll('.back'), 1, {opacity: 0, ease: Power3.easeOut}, '-=1')
    e.preventDefault();
  }

}

function heightUpdate(){  
  let vh = window.innerHeight * 0.01;  
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  // Screen mode refresh
  if(window.innerWidth >= 992){
    app.mode = 'descktop'
  }else if(window.innerWidth < 992 && window.innerWidth > 575){
    app.mode = 'tablet'
  }else if(window.innerWidth < 576){
    app.mode = 'mobile'
  }
};

const _getInTouch = function(){
  const root = this;

  this.submited = false;

  this.init = function(){
    const that = this;
    this.inquirer.init();
    document.querySelector('[data-action="get-in-touch"]').addEventListener('click', that.active);
    document.querySelector('.get-in-touch .close').addEventListener('click', that.close);
    document.querySelector('.get-in-touch .form').addEventListener('submit', that.submit);
  }

  this.active = function(e){
    new TimelineMax()
      .set('.get-in-touch', {display: 'block'})      
      .to(document.querySelectorAll('.get-in-touch .blind-left, .get-in-touch .blind-right'), 1.3, {scaleX: 1, ease: Power3.easeIn}, 'start')      
      .from('.get-in-touch .logo--black', 1.3, {opacity: 0, ease: Power3.easeIn}, 'start')
      .set('body', {overflow: 'hidden'})
      .from('.get-in-touch .form h2 span', 1.5, {rotationX: 90, opacity: 0, ease: Power3.easeOut}, '+=0.3')
      .staggerFrom(document.querySelectorAll('.get-in-touch .form .form--text, .get-in-touch .form .form--row, .get-in-touch .form .form-control.comment, .get-in-touch .form .form--submit'), 1, {y: 50, opacity: 0, ease: Power3.easeOut}, 0.16, '-=0.8')
      .from('.get-in-touch .close', 0.6, {scale: 0})      
      .set(document.querySelectorAll('.get-in-touch .form .form--text, .get-in-touch .form .form--row, .get-in-touch .form .form-control.comment, .get-in-touch .form .form--submit'), {clearProps: 'all'})
    e.preventDefault();
  }

  this.close = function(e){
    if(root.submited){
      new TimelineMax()
        .to(document.querySelectorAll('.get-in-touch .thank h2'), 0.6, {y: -100, opacity: 0, ease: Power3.easeIn})
        .to('.get-in-touch .close', 1.4, {scale: 0, ease: Power2.easeOut}, '+=0.5')
        .to('.get-in-touch .logo--black', 1.4, {opacity: 0, ease: Power2.easeOut}, '-=1.4')
        .to(document.querySelectorAll('.get-in-touch .blind-left, .get-in-touch .blind-right'), 1.4, {scaleX: 0, ease: Power2.easeOut}, '-=1.4')
        .set('body', {overflow: 'visible'})
        .set('.get-in-touch', {display: 'none'})
        .set(document.querySelectorAll('.get-in-touch .form, .get-in-touch .thank, .get-in-touch .logo--black, .get-in-touch .close, .get-in-touch h2, .get-in-touch .form .form--text, .get-in-touch .form .form--row, .get-in-touch .form .form-control.comment, .get-in-touch .form .form--submit'), {clearProps: 'all'})
        root.submited = false;
    }else{
      new TimelineMax()
        .staggerTo(document.querySelectorAll('.get-in-touch .form h2, .get-in-touch .form .form--text, .get-in-touch .form .form--row, .get-in-touch .form .form-control.comment, .get-in-touch .form .form--submit'), 0.6, {y: -50, opacity: 0, ease: Power3.easeIn}, 0.16)
        .to('.get-in-touch .close', 1.4, {scale: 0, ease: Power2.easeOut}, 'start')
        .to(document.querySelectorAll('.get-in-touch .blind-left, .get-in-touch .blind-right'), 1.4, {scaleX: 0, ease: Power2.easeOut}, 'start')
        .set('body', {overflow: 'visible'})
        .to('.get-in-touch .logo--black', 1.4, {opacity: 0, ease: Power2.easeOut}, 'start')
        .set('.get-in-touch', {display: 'none'})
        .set(document.querySelectorAll('.get-in-touch .form, .get-in-touch .thank, .get-in-touch .logo--black, .get-in-touch .close, .get-in-touch h2, .get-in-touch .form .form--text, .get-in-touch .form .form--row, .get-in-touch .form .form-control.comment, .get-in-touch .form .form--submit'), {clearProps: 'all'})
    }
    
    e.preventDefault();
  };

  this.submit = function(e){
    root.submited = true;
    new TimelineMax()
      .staggerTo(document.querySelectorAll('.get-in-touch .form h2, .get-in-touch .form .form--text, .get-in-touch .form .form--row, .get-in-touch .form .form-control.comment, .get-in-touch .form .form--submit'), 0.6, {y: -50, opacity: 0, ease: Power3.easeIn}, 0.16)      
      .set('.get-in-touch .form', {display: 'none'})
      .set('.get-in-touch .thank', {display: 'block'})
      .from('.get-in-touch .thank h2 span', 1.5, {rotationX: 90, opacity: 0, ease: Power3.easeOut}, '+=0.3')      
    e.preventDefault();
  };

  this.inquirer = {
    slides: null,
    current: 1,
    init: function(){
      let that = this;      
      document.querySelectorAll('.get-in-touch .custom-select .select--label').forEach(function(el, i){
        el.addEventListener('click', that.onActive);
      });
      document.querySelectorAll('.get-in-touch  .custom-select .select--options input[type="radio"]').forEach(function(el, i){
        el.addEventListener('change', that.onChange);        
      });    
      document.addEventListener('click', function(e){
        if(!e.target.closest('.custom-select') && document.querySelectorAll('.custom-select.active').length){
          new TimelineMax().to(document.querySelector('.custom-select.active .select--options'), 0.4, {height: 0, ease: Power2.easeInOut})
            .set(document.querySelectorAll('.custom-select.active .select--options'), {clearProps: 'all'});
            document.querySelector('.custom-select.active').classList.remove('active');
        }
      });  

    },
    onActive: function(e){
      let target = e.currentTarget.closest('.custom-select');
      let active = target.classList.contains('active');
      if(active){
        new TimelineMax().to(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut})
          .set(target.querySelector('.select--options'), {clearProps: 'all'});
        target.classList.remove('active');
      }else{        
        new TimelineMax().set(target.querySelector('.select--options'), {display: 'block'})
          .from(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut});
        target.classList.add('active');          
      }      
    },
    onChange: function(e){
      let that = this;
      let target = e.target.closest('.custom-select');
      let text = e.target.closest('li').querySelector('span').innerText;
      target.querySelector('.select--label span').innerText = text;
      TweenMax.to('.business__select [data-action="next"]', 0.6, {opacity: 1});
      new TimelineMax().to(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut})
          .set(target.querySelector('.select--options'), {clearProps: 'all'});
        target.classList.remove('active');
      
    },
    onNext: function(e){
      const that = app.businessQuestionaire.inquirer;
      let next = (that.current+1);      
      if(that.current < that.slides){
        if(!document.querySelectorAll('.business__select_slider [data-slide="'+that.current+'"] input[type="radio"]:checked').length)return;
        new TimelineMax()
        .set('.business__select_slider', {overflow: 'hidden'})
        .to('.business__select_slider [data-slide="'+that.current+'"]', 0.6, {x: '-100%', opacity: 0, ease: Power3.easeIn})
        .set('.business__select_slider [data-slide="'+that.current+'"]', {clearProps: 'all'})
        .add(function(){          
          that.current++;
          document.querySelector('.business__select_slider .pagination').innerText = that.current+'/'+that.slides;
          TweenMax.to('.business__select [data-action="next"]', 0.6, {opacity: 0});
        })
        .set('.business__select_slider [data-slide="'+next+'"]', {display: 'block'})
        .from('.business__select_slider [data-slide="'+next+'"]', 0.6, {x: '100%', opacity: 0, ease: Power3.easeOut})
        .set('.business__select_slider', {clearProps: 'all'})
        .add(function(){
          if(that.current == that.slides){
            document.querySelector('.business__select [data-action] span').innerText = 'Submit';
          }
        })
      }else{
        let h = document.querySelector('.business__select_slider [data-slide="'+that.current+'"]').clientHeight;        
        new TimelineMax()
          .set('.business__select_slider .thank', {height: h})
          .set('.business__select_slider', {overflow: 'hidden'})
          .to('.business__select_slider [data-slide="'+that.current+'"]', 0.6, {x: '-100%', opacity: 0, ease: Power3.easeIn})
          .to('.business__select_slider .pagination, .business__select [data-action]', 0.6, {opacity: 0}, '-=0.6')
          .set('.business__select_slider [data-slide="'+that.current+'"]', {clearProps: 'all'})
          .set('.business__select_slider .thank', {display: 'flex'})
          .from('.business__select_slider .thank', 0.6, {x: '100%', opacity: 0, ease: Power3.easeOut})
          .set('.business__select_slider', {clearProps: 'all'})
      }
    }
  };
  this.init();
}



/* ==============================================================
                          HOMEPAGE INIT
   ============================================================== */
const _homepage = function (page) {
  let that = this;
  let root = this;
  this.play = true;

  this.blobs = {
    heroBg: null,
    heroVideo: null
  }

  this.heroBgCover = function () {
    let video = document.querySelector('.hero--bg');
    let ratio = video.videoWidth / video.videoHeight;    
    if (document.body.clientWidth / window.innerHeight > ratio) {
      video.width = document.body.clientWidth;
      video.height = document.body.clientWidth / ratio;
      TweenMax.set(video, { width: document.body.clientWidth, height: document.body.clientWidth / ratio, top: -((document.body.clientWidth / ratio) - window.innerHeight) / 2, left: 0 });
    } else {
      TweenMax.set(video, { width: window.innerHeight * ratio, height: window.innerHeight, top: 0, left: -((window.innerHeight * ratio) - document.body.clientWidth) / 2 });
    }
  };

  // Start Hero video player render
  this.heroVideo = {
    video: document.querySelector('.homepage__hero .hero--player video'),
    controls: document.querySelector('.homepage__hero .hero--player .player--controls'),
    interval: null,
    active: false,
    loaded: false,
    play: function () {
      let that = this;
      that.video.play();
      this.interval = setInterval(function () {
        that.controls.querySelector('[data-time="current"]').innerText = that.time().current;
        that.bar();
      }, 1000);
    },
    pause: function () {
      this.video.pause();
    },
    time: function () {
      return {
        current: (Math.round(this.video.currentTime / 60) < 10 ? '0' + Math.round(this.video.currentTime / 60) : Math.round(this.video.currentTime / 60)) + ':' + (Math.round(this.video.currentTime % 60) < 10 ? '0' + Math.round(this.video.currentTime % 60) : Math.round(this.video.currentTime % 60)),
        duration: (Math.round(this.video.duration / 60) < 10 ? '0' + Math.round(this.video.duration / 60) : Math.round(this.video.duration / 60)) + ':' + (Math.round(this.video.duration % 60) < 10 ? '0' + Math.round(this.video.duration % 60) : Math.round(this.video.duration % 60)),
      }
    },
    bar: function () {
      return 100 / (this.video.duration / this.video.currentTime);
    },
    init: function () {
      let video = this
      let src = document.querySelector('.hero--player video').getAttribute('data-src');      
      document.querySelector('.hero--player video').src = app.homepage.blobs.heroVideo || src;
      

      //this.controls.querySelector('[data-time="all"]').innerText = this.time().duration;      
      this.video.addEventListener('click', function (e) {
        if (this.paused) {
          video.play();
          TweenMax.to('.cursor i.pause', 0.3, { scale: 1, ease: Power2.easeInOut });
          TweenMax.to('.cursor i.play', 0.3, { scale: 0, ease: Power2.easeInOut });
        } else {
          video.pause();
          TweenMax.to('.cursor i.pause', 0.3, { scale: 0, ease: Power2.easeInOut });
          TweenMax.to('.cursor i.play', 0.3, { scale: 1, ease: Power2.easeInOut });
        }
      });
      this.video.addEventListener('loadedmetadata', function (e) {
        video.controls.querySelector('[data-time="all"]').innerText = video.time().duration;
      });
      this.video.addEventListener('timeupdate', function (e) {
        TweenMax.set('.player--controls .controls--bar i', { width: video.bar() + '%' });
      });
      document.querySelector('[data-action="homepage-hero-play"]').addEventListener('click', function (e) {
        video.video.play();
        app.homepage.heroVideo.active = true;
        let tl = new TimelineMax();
        let h1 = [].slice.call(document.querySelectorAll('.homepage__hero h1 span'), 0).reverse();

        tl.to('.homepage__hero h1 span', 1, {opacity: 1}, 'cursor')
          .to([app.homepage.hero.container, app.homepage.hero.container2], 1, { alpha: 0 }, 'cursor')
          .to('[data-action="homepage-hero-play"]', 0.3, { scale: 0, ease: Power2.easeIn }, 'cursor')
          .to('.cursor span', 0.6, { scale: 1.4 }, 'cursor')
          .to('.cursor i.circle', 0.6, { scale: 0 }, 'cursor')
          .to('.cursor i.pause', 0.6, { scale: 1 }, 'cursor')
          .staggerTo(h1, 0.5, { rotationX: 90, opacity: 0, ease: Power2.easeIn }, 0.05, '-=0.3')
          .to('header', 0.5, { opacity: 0 }, '-=0.3')
          .to('.homepage__hero_footer', 0.5, { opacity: 0 }, '-=0.3')          
          .add(function () {
            // if(!video.loaded){
            //   console.log('Not loaded');
            //   if(app.homepage.blobs.heroVideo){
            //     video.video.src = app.homepage.blobs.heroVideo;
            //   }else{
            //     video.video.src = src;
            //   }
            //   video.video.autoplay = false;
            //   video.loaded = true;
            // }            
            //video.video.src = src;
          })
          .set('body', { overflow: 'hidden' })
          .set('.homepage .homepage__hero', { zIndex: 10 })
          .to('.hero--player', 0.5, { autoAlpha: 1 })
          .fromTo('[data-action="homepage-close-video"]', 0.5, { scale: 1.4, opacity: 0 }, { scale: 1, opacity: 1 })
      });
      document.querySelector('[data-action="homepage-close-video"]').addEventListener('click', function (e) {
        app.homepage.heroVideo.active = false;
        let tl = new TimelineMax();
        let h1 = [].slice.call(document.querySelectorAll('.homepage__hero h1 span'), 0).reverse();
        video.video.pause();
        tl.to('.cursor span', 0.6, { scale: 1 }, 'cursor')
          .to('.cursor i.circle', 0.6, { scale: 1 }, 'cursor')
          .to('.cursor i.pause', 0.6, { scale: 0 }, 'cursor')
          .to('.cursor i.play', 0.6, { scale: 0 }, 'cursor')
          .to('[data-action="homepage-close-video"]', 0.5, { scale: 0, ease: Power2.easeIn }, 'cursor')
          .to('.hero--player', 0.5, { autoAlpha: 0 })
          .set('body', { overflow: 'auto' })
          .set('.homepage .homepage__hero', { clearProps: 'z-index'})
          .staggerFromTo(document.querySelectorAll('.homepage__hero h1 span'), 0.8, { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, ease: Power2.easeOut }, 0.1, '-=0.3')
          .to([app.homepage.hero.container, app.homepage.hero.container2], 1, { alpha: 1 })
          .to('.homepage__hero h1 span', 1, { opacity: 0 }, '-=1')          
          .to('header', 0.5, { opacity: 1 }, '-=1.4')
          .to('.homepage__hero_footer', 0.5, { opacity: 1 }, '-=0.3')
          .to('[data-action="homepage-hero-play"]', 0.3, { scale: 1 }, '-=0.3')
          .add(function () {
            video.video.currentTime = 0;
          })

        // tl.to('[data-action="homepage-hero-play"]', 0.3, {scale: 0})
        //   .staggerTo(h1, 0.5, {rotationX: 90, opacity: 0, ease: Power2.easeIn}, 0.05, '-=0.3')
        //   .to('header', 0.5, {opacity: 0}, '-=0.3')
        //   .to('.homepage__hero_footer', 0.5, {opacity: 0}, '-=0.3')
        //   .add(function(){
        //     let src = document.querySelector('.hero--player video').getAttribute('data-src');
        //     document.querySelector('.hero--player video').src = src;
        //   })
        //   .set('body', {overflow: 'hidden'})
        //   .to('.hero--player', 0.5, {autoAlpha: 1})
        //   .fromTo('[data-action="homepage-close-video"]', 0.3, {scale: 0}, {scale: 1})
        //   .add(function(){
        //     video.play();
        //   })
      });
    }
  }


  // Loader
  this.loader = {
    progress: 0,
    resources: 1,
    scripts:
      [
        'pixi',
        'splitText',
        'swiper',
        'aos'
      ],
    resourcesDone: 0,
    next: 0,
    step: 0,
    loaderReady: false,
    colorsAnim: null,
    tl: new TimelineMax(),
    path: [

    ],
    init: function () {
      let that = this;

      //TweenMax.to('#loader-logo .h', 3, {morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z'});
      TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
      TweenMax.set('#loader-logo .h', { x: -55, y: -30 });

      TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });

      this.colorsAnim = new TimelineMax({ repeat: -1 }).to('#loader-logo .h, #loader-logo .m', 0.5, { fill: '#f8d4e4', ease: Power0.easeNone })
        .to('#loader-logo .h, #loader-logo .m', 0.5, { fill: '#d8ebe7', ease: Power0.easeNone })
        .to('#loader-logo .h, #loader-logo .m', 0.5, { fill: '#5ebfaf', ease: Power0.easeNone })
        .to('#loader-logo .h, #loader-logo .m', 0.5, { fill: '#577081', ease: Power0.easeNone })
        .to('#loader-logo .h, #loader-logo .m', 0.5, { fill: '#eb4333', ease: Power0.easeNone })
        .to('#loader-logo .h, #loader-logo .m', 0.5, { fill: '#d7ebe6', ease: Power0.easeNone })
        .to('#loader-logo .h, #loader-logo .m', 0.5, { fill: '#bfbdce', ease: Power0.easeNone })
        .to('#loader-logo .h, #loader-logo .m', 0.5, { fill: '#9ccad5', ease: Power0.easeNone })
        .to('#loader-logo .h, #loader-logo .m', 0.5, { fill: '#5ebfaf', ease: Power0.easeNone })
        .to('#loader-logo .h, #loader-logo .m', 0.5, { fill: '#2f2f2f', ease: Power0.easeNone })



      TweenMax.to('#loader-logo', 1, { autoAlpha: 1 })

      this.resources += this.scripts.length
        + document.querySelectorAll('img[data-src]').length
        //+ document.querySelectorAll('[data-background]').length
        + document.querySelectorAll('[data-displacement]').length
        + document.querySelectorAll('[data-pat-left]').length
        + document.querySelectorAll('[data-pat-right]').length
        + document.querySelectorAll('[data-img-left]').length
        + document.querySelectorAll('[data-img-right]').length;
      that.loaderReady = true;
      that.loading();

      this.scripts.forEach(function (n) {
        let src = './js/lib/' + app.resours[n];
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = function () {
          that.resourcesDone++;
          that.loading();
        }
      });

      document.querySelectorAll('script[data-src]').forEach(function (el, i) {

      });
      document.querySelectorAll('img[data-src]').forEach(function (el, i) {
        let src = el.getAttribute('data-src');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          el.src = src;
          that.resourcesDone++;
          that.loading();
        }
      });
      document.querySelectorAll('[data-displacement]').forEach(function (el, i) {
        let src = el.getAttribute('data-displacement');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          that.resourcesDone++;
          that.loading();
        }
      });
      document.querySelectorAll('[data-pat-left]').forEach(function (el, i) {
        let src = el.getAttribute('data-pat-left');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          that.resourcesDone++;
          that.loading();
        }
      });
      document.querySelectorAll('[data-pat-right]').forEach(function (el, i) {
        let src = el.getAttribute('data-pat-right');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          that.resourcesDone++;
          that.loading();
        }
      });
      document.querySelectorAll('[data-img-left]').forEach(function (el, i) {
        let src = el.getAttribute('data-img-left');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          that.resourcesDone++;
          that.loading();
        }
      });
      document.querySelectorAll('[data-img-right]').forEach(function (el, i) {
        let src = el.getAttribute('data-img-right');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          that.resourcesDone++;
          that.loading();
        }
      });
      // document.querySelectorAll('[data-background]').forEach(function(el, i){      
      //   let src = el.getAttribute('data-background');
      //   var xhr = new XMLHttpRequest();
      //   xhr.open('GET', src, true);
      //   xhr.responseType = 'blob';      
      //   xhr.onload = function(e) {
      //     if (this.status == 200) {          
      //       var myBlob = this.response;
      //       var vid = (window.webkitURL || window.URL).createObjectURL(myBlob);          
      //       app.homepage.blobs.heroBg = vid;            
      //       that.resourcesDone++;
      //       that.loading();
      //     }
      //   }
      //   xhr.send();
      // }); 

    },
    loading: function () {
      let that = this;
      //let p = (100/(this.resources/this.resourcesDone)).toFixed();



      if (!that.loaderReady) return;
      if (this.resources - this.resourcesDone == 1) {
          app.globalEvents();
          buttonsRender();
          app.homepage.cursor.init();
          document.querySelector('.homepage__hero .hero--bg').src = document.querySelector('[data-background]').getAttribute('data-background');
           // LEISURE SWIPER  START//
           that.leisureSwiper = new Swiper('.homepage__feedback_slider.leisure .swiper-container', {
            // Optional parameters
            speed: 800,
            init: false,
            simulateTouch: false,
            followFinger: false,
            touchRatio: 2,          
            // If we need pagination
            pagination: {
              el: '.slider-pagination',
              type: 'fraction'
            },
            // Navigation arrows
            navigation: {
              nextEl: '.slider-button-next',
              prevEl: '.slider-button-prev',
            }
          });
          that.leisureSwiper.on('init', function(){
            const that = this;
            that.images = [];
            that.containers = [];
            that.masks = [];
            function heroBgCover(el) {
              let ratio = el.width / el.height;            
              if (ratio < 1) {
                let width, height, x, y;
                if(app.mode == 'descktop'){
                  width = ((that.el.clientWidth) - 90) / 2;
                  height = (((that.el.clientWidth) - 90) / 2) / ratio;
                  x = ((that.el.clientWidth) - 90) / 4;
                  y = (((that.el.clientWidth) - 90) - (((that.el.clientWidth) - 90)/2) / ratio);
                }else if(app.mode == 'tablet'){
                  width = that.el.clientWidth - 120;
                  height = (that.el.clientWidth - 120) / ratio;
                  x = (that.el.clientWidth - 120) / 2;
                  y = (el.height / 2) + (((that.el.clientWidth - 120) - el.height) / 2);
                }else if(app.mode == 'mobile'){
                  width = that.el.clientWidth - 40;
                  height = (that.el.clientWidth - 40) / ratio;
                  x = (that.el.clientWidth - 40) / 2;
                  y = (el.height / 2) + (((that.el.clientWidth - 40) - el.height) / 2);
                }
                return {
                  width: width,
                  height: height,
                  x: x,
                  y: y
                }
              } else if (ratio > 1) {
                let width, height, x, y;
                if(app.mode == 'descktop'){                  
                  x = (((that.el.clientWidth) - 90) - that.el.clientHeight * ratio);
                  y = ((that.el.clientWidth) - 90) / 4;
                }else if(app.mode == 'tablet'){                  
                  x = (el.width / 2) + (((that.el.clientWidth - 120) - el.width) / 2);
                  y = (that.el.clientWidth - 120) / 2;
                }else if(app.mode == 'mobile'){
                  x = (el.width / 2) + (((that.el.clientWidth - 40) - el.width) / 2);
                  y = (that.el.clientWidth - 40) / 2;
                }
                return {
                  width: that.el.clientHeight * ratio,
                  height: that.el.clientHeight,
                  x: x,
                  y: y
                }
              } else {
                let width, height, x, y;
                if(app.mode == 'descktop'){
                  width = ((that.el.clientWidth) - 180) / 2;
                  height = ((that.el.clientWidth) - 180) / 2;
                  x = (((that.el.clientWidth) - 180) / 2) / 2;
                  y = (((that.el.clientWidth) - 180) / 2) / 2;
                }else if(app.mode == 'tablet'){
                  width = (that.el.clientWidth - 120);
                  height = (that.el.clientWidth - 120);
                  x = (that.el.clientWidth - 120) / 2;
                  y = (that.el.clientWidth - 120) / 2;
                }else if(app.mode == 'mobile'){
                  width = (that.el.clientWidth - 40);
                  height = (that.el.clientWidth - 40);
                  x = (that.el.clientWidth - 40) / 2;
                  y = (that.el.clientWidth - 40) / 2;
                }
                return {
                  width: width,
                  height: height,
                  x: x,
                  y: y
                }
              }
            }
            that.hero = new PIXI.Application({
              width: that.el.clientWidth,
              height: that.el.clientHeight,
              backgroundColor: 0xFFFFFF
            });          
            that.el.appendChild(that.hero.view);
            that.rootContainer = new PIXI.Container();
            that.hero.stage.addChild(that.rootContainer);
            
            let mask = new PIXI.Graphics();          
            mask.lineStyle(0);
            mask.beginFill(0xff0000, 1);
            //that.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
            if(app.mode == 'descktop'){
              mask.drawRect(0, 0, (that.el.clientWidth / 2) - 90, (that.el.clientWidth / 2) - 90);
            }else if(app.mode == 'tablet'){
              mask.drawRect(0, 0, that.el.clientWidth - 120, that.el.clientWidth - 120);
            }else if(app.mode == 'mobile'){
              mask.drawRect(0, 0, that.el.clientWidth - 40, that.el.clientWidth - 40);
            }
            mask.endFill();
  
            that.el.querySelectorAll('.slide--photo img').forEach(function(el, i){
              that.images[i] = new PIXI.Sprite.from(el.getAttribute('src'));
              that.containers[i] = new PIXI.Container();
              let size;
              let rootX;
              if(app.mode == 'descktop'){
                size = (that.el.clientWidth - 180) / 2;
                rootX = (that.el.clientWidth * i) + (((that.el.clientWidth) / 2));
              }else if(app.mode == 'tablet'){
                size = that.el.clientWidth - 120;
                rootX = (that.el.clientWidth * i) + 60;
              }else if(app.mode == 'mobile'){
                size = that.el.clientWidth - 40;
                rootX = (that.el.clientWidth * i) + 20;
              }
              that.containers[i].width = size;
              that.containers[i].height = size;
              that.containers[i].x = rootX;
              that.containers[i].y = 0;
              that.masks[i] = mask.clone();
              that.containers[i].addChild(that.masks[i]);
              that.containers[i].mask = that.masks[i];
              that.images[i].anchor.x = 0.5;
              that.images[i].anchor.y = 0.5;  
              that.rootContainer.addChild(that.containers[i]);
              let params = heroBgCover(el);            
              that.images[i].width = params.width;
              that.images[i].height = params.height;
              that.images[i].x = params.x;
              that.images[i].y = params.y;
              that.containers[i].addChild(that.images[i]);
            });
  
  
          });
          that.leisureSwiper.init();
  
          that.leisureSwiper.on('slideChangeTransitionStart', function(){
            let that = this;          
            TweenMax.to(that.rootContainer, 0.8, {x: -(that.el.clientWidth * that.realIndex), ease: Power2.easeInOut})
            if (that.realIndex > that.previousIndex) {
              for(i in that.images){
                let scale = that.images[i].currentScale;
                new TimelineMax()
                  .to([that.images[i].skew, that.masks[i].skew], 0.4, {x: -0.35, ease: Power2.easeIn}, 'start')
                  .to([that.images[i].scale], 0.4, {x: (scale.x * 1.5), y: (scale.y * 1.5), ease: Power2.easeIn}, 'start')
                  .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: -35, ease: Power2.easeIn}, 'start')
                  .to([that.images[i].skew, that.masks[i].skew], 0.4, {x: 0, ease: Power2.easeOut}, 'end')
                  .to([that.images[i].scale], 0.5, {x: scale.x, y: scale.y, ease: Power2.easeOut}, 'end')
                  .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: 0, ease: Power2.easeOut}, 'end')
              }
            }else{              
              for(i in that.images){
                let scale = that.images[i].currentScale;
                new TimelineMax()
                  .to([that.images[i].skew, that.masks[i].skew], 0.4, {x: 0.35, ease: Power2.easeIn}, 'start')
                  .to([that.images[i].scale], 0.4, {x: (scale.x * 1.5), y: (scale.y * 1.5), ease: Power2.easeIn}, 'start')
                  .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: 35, ease: Power2.easeIn}, 'start')
                  .to([that.images[i].skew, that.masks[i].skew], 0.4, {x: 0, ease: Power2.easeOut}, 'end')
                  .to([that.images[i].scale], 0.5, {x: scale.x, y: scale.y, ease: Power2.easeOut}, 'end')
                  .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: 0, ease: Power2.easeOut}, 'end')
              }
            }
          });         
          // LEISURE SWIPER  END//
          // BUSINESS SWIPER  START//
          that.businessSwiper = new Swiper('.homepage__feedback_slider.business .swiper-container', {
            // Optional parameters
            speed: 800,
            init: false,
            simulateTouch: false,
            followFinger: false,
            touchRatio: 2,          
            // If we need pagination
            pagination: {
              el: '.slider-pagination',
              type: 'fraction'
            },
            // Navigation arrows
            navigation: {
              nextEl: '.slider-button-next',
              prevEl: '.slider-button-prev',
            }
          });
          that.businessSwiper.on('init', function(){
            const that = this;
            that.images = [];
            that.containers = [];
            that.masks = [];
            function heroBgCover(el) {
              let ratio = el.width / el.height;            
              if (ratio < 1) {
                let width, height, x, y;
                if(app.mode == 'descktop'){
                  width = ((that.el.clientWidth) - 90) / 2;
                  height = (((that.el.clientWidth) - 90) / 2) / ratio;
                  x = ((that.el.clientWidth) - 90) / 4;
                  y = (((that.el.clientWidth) - 90) - (((that.el.clientWidth) - 90)/2) / ratio);
                }else if(app.mode == 'tablet'){
                  width = that.el.clientWidth - 120;
                  height = (that.el.clientWidth - 120) / ratio;
                  x = (that.el.clientWidth - 120) / 2;
                  y = (el.height / 2) + (((that.el.clientWidth - 120) - el.height) / 2);
                }else if(app.mode == 'mobile'){
                  width = that.el.clientWidth - 40;
                  height = (that.el.clientWidth - 40) / ratio;
                  x = (that.el.clientWidth - 40) / 2;
                  y = (el.height / 2) + (((that.el.clientWidth - 40) - el.height) / 2);
                }
                return {
                  width: width,
                  height: height,
                  x: x,
                  y: y
                }
              } else if (ratio > 1) {
                let width, height, x, y;
                if(app.mode == 'descktop'){                  
                  x = (((that.el.clientWidth) - 90) - that.el.clientHeight * ratio);
                  y = ((that.el.clientWidth) - 90) / 4;
                }else if(app.mode == 'tablet'){                  
                  x = (el.width / 2) + (((that.el.clientWidth - 120) - el.width) / 2);
                  y = (that.el.clientWidth - 120) / 2;
                }else if(app.mode == 'mobile'){
                  x = (el.width / 2) + (((that.el.clientWidth - 40) - el.width) / 2);
                  y = (that.el.clientWidth - 40) / 2;
                }
                return {
                  width: that.el.clientHeight * ratio,
                  height: that.el.clientHeight,
                  x: x,
                  y: y
                }
              } else {
                let width, height, x, y;
                if(app.mode == 'descktop'){
                  width = ((that.el.clientWidth) - 180) / 2;
                  height = ((that.el.clientWidth) - 180) / 2;
                  x = (((that.el.clientWidth) - 180) / 2) / 2;
                  y = (((that.el.clientWidth) - 180) / 2) / 2;
                }else if(app.mode == 'tablet'){
                  width = (that.el.clientWidth - 120);
                  height = (that.el.clientWidth - 120);
                  x = (that.el.clientWidth - 120) / 2;
                  y = (that.el.clientWidth - 120) / 2;
                }else if(app.mode == 'mobile'){
                  width = (that.el.clientWidth - 40);
                  height = (that.el.clientWidth - 40);
                  x = (that.el.clientWidth - 40) / 2;
                  y = (that.el.clientWidth - 40) / 2;
                }
                return {
                  width: width,
                  height: height,
                  x: x,
                  y: y
                }
              }
            }
            that.hero = new PIXI.Application({
              width: that.el.clientWidth,
              height: that.el.clientHeight,
              backgroundColor: 0xFFFFFF
            });          
            that.el.appendChild(that.hero.view);
            that.rootContainer = new PIXI.Container();
            that.hero.stage.addChild(that.rootContainer);
            
            let mask = new PIXI.Graphics();          
            mask.lineStyle(0);
            mask.beginFill(0xff0000, 1);          
            if(app.mode == 'descktop'){
              mask.drawRect(0, 0, (that.el.clientWidth / 2) - 90, (that.el.clientWidth / 2) - 90);
            }else if(app.mode == 'tablet'){
              mask.drawRect(0, 0, that.el.clientWidth - 120, that.el.clientWidth - 120);
            }else if(app.mode == 'mobile'){
              mask.drawRect(0, 0, that.el.clientWidth - 40, that.el.clientWidth - 40);
            }
            mask.endFill();
  
            that.el.querySelectorAll('.slide--photo img').forEach(function(el, i){
              that.images[i] = new PIXI.Sprite.from(el.getAttribute('src'));
              that.containers[i] = new PIXI.Container();
              let size;
              let rootX;
              if(app.mode == 'descktop'){
                size = (that.el.clientWidth - 180) / 2;
                rootX = (that.el.clientWidth * i) + 90;
              }else if(app.mode == 'tablet'){
                size = that.el.clientWidth - 120;
                rootX = (that.el.clientWidth * i) + 60;
              }else if(app.mode == 'mobile'){
                size = that.el.clientWidth - 40;
                rootX = (that.el.clientWidth * i) + 20;
              }
              that.containers[i].width = size;
              that.containers[i].height = size;
              that.containers[i].x = rootX;
              that.containers[i].y = 0;
              that.masks[i] = mask.clone();
              that.containers[i].addChild(that.masks[i]);            
              that.containers[i].mask = that.masks[i];
              that.images[i].anchor.x = 0.5;
              that.images[i].anchor.y = 0.5;  
              that.rootContainer.addChild(that.containers[i]);
              let params = heroBgCover(el);            
              that.images[i].width = params.width;
              that.images[i].height = params.height;
              that.images[i].x = params.x;
              that.images[i].y = params.y;
              that.containers[i].addChild(that.images[i]);            
            });         
  
  
          });
          that.businessSwiper.init();
  
          that.businessSwiper.on('slideChangeTransitionStart', function(){
            let that = this;          
            TweenMax.to(that.rootContainer, 0.8, {x: -(that.el.clientWidth * that.realIndex), ease: Power2.easeInOut})
            if (that.realIndex > that.previousIndex) {
              for(i in that.images){
                let scale = that.images[i].currentScale;
                new TimelineMax()
                  .to([that.images[i].skew, that.masks[i].skew], 0.4, {x: -0.35, ease: Power2.easeIn}, 'start')
                  .to([that.images[i].scale], 0.4, {x: (scale.x * 1.5), y: (scale.y * 1.5), ease: Power2.easeIn}, 'start')
                  .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: -35, ease: Power2.easeIn}, 'start')
                  .to([that.images[i].skew, that.masks[i].skew], 0.4, {x: 0, ease: Power2.easeOut}, 'end')
                  .to([that.images[i].scale], 0.5, {x: scale.x, y: scale.y, ease: Power2.easeOut}, 'end')
                  .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: 0, ease: Power2.easeOut}, 'end')
              }
            }else{              
              for(i in that.images){
                let scale = that.images[i].currentScale;
                new TimelineMax()
                  .to([that.images[i].skew, that.masks[i].skew], 0.4, {x: 0.35, ease: Power2.easeIn}, 'start')
                  .to([that.images[i].scale], 0.4, {x: (scale.x * 1.5), y: (scale.y * 1.5), ease: Power2.easeIn}, 'start')
                  .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: 35, ease: Power2.easeIn}, 'start')
                  .to([that.images[i].skew, that.masks[i].skew], 0.4, {x: 0, ease: Power2.easeOut}, 'end')
                  .to([that.images[i].scale], 0.5, {x: scale.x, y: scale.y, ease: Power2.easeOut}, 'end')
                  .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: 0, ease: Power2.easeOut}, 'end')
              }
            }
          });          
          // BUSINESS SWIPER  END//
          app.homepage.heroVideo.init();
          app.homepage.tabs.init();
          that.loaded();
      } else {
        
      }
    },
    loaded: function () {
      let that = this;
      window.scroll(0, 0);
      that.colorsAnim.remove();      
      let tl = new TimelineMax({ delay: 0.5 });
      tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')        
        .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')        
        
        .add(function () {          
          app.homepage.hero = new heroRender();
          app.homepage.drag = new dragRender();
          app.homepage.eventsInit();
          that.sts = 0;
          that.stm = 0;
          that.ste = 0;          
  
          // SERVICES LEISURE SWIPER  START//
          that.servicesLeisureSwiper = new Swiper('.homepage__services .leisure .swiper-container', {
            // Optional parameters
            speed: 800,
            init: false,
            simulateTouch: false,
            followFinger: false,
            touchRatio: 2,          
            // If we need pagination
            pagination: {
              el: '.slider-pagination',
              type: 'fraction'
            },
            // Navigation arrows
            navigation: {
              nextEl: '.slider-button-next',
              prevEl: '.slider-button-prev',
            }
          });
          that.servicesLeisureSwiper.on('init', function(){
            const that = this;
            that.images = [];
            that.containers = [];
            that.masks = [];
            function heroBgCover(el) {
              let ratio = el.width / el.height;            
              if (ratio < 1) {
                return {
                  width: that.el.clientWidth,
                  height: that.el.clientWidth / ratio,
                  x: that.el.clientWidth / 2,
                  y: (el.height / 2) + (that.el.clientWidth - el.height) / 2
                }
              } else if (ratio > 1) {
                return {
                  width: that.el.clientWidth * ratio,
                  height: that.el.clientWidth,
                  x: (el.height / 2) + (that.el.clientWidth - el.height) / 2,
                  y: that.el.clientWidth / 2
                }
              } else {              
                return {
                  width: that.el.clientWidth,
                  height: that.el.clientWidth,
                  x: that.el.clientWidth / 2,
                  y: that.el.clientWidth / 2
                }
              }
            }
            that.hero = new PIXI.Application({
              width: that.el.clientWidth,
              height: that.el.clientHeight,
              backgroundColor: 0x000000
            });          
            that.el.appendChild(that.hero.view);
            that.rootContainer = new PIXI.Container();
            that.hero.stage.addChild(that.rootContainer);
            that.rootContainer.alpha = 0.8;
            
            let mask = new PIXI.Graphics();          
            mask.lineStyle(0);
            mask.beginFill(0xFFFFFF, 1);
            //that.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);
            mask.drawRect(0, 0, that.el.clientWidth, that.el.clientWidth);          
            mask.endFill();
  
            that.el.querySelectorAll('.slide--photo img').forEach(function(el, i){
              that.images[i] = new PIXI.Sprite.from(el.getAttribute('src'));
              that.containers[i] = new PIXI.Container();
              that.containers[i].width = that.el.clientWidth;
              that.containers[i].height = that.el.clientWidth;
              that.containers[i].pivot.y = that.el.clientWidth / 2;
              that.containers[i].x = that.el.clientWidth * i;
              that.containers[i].y = that.el.clientWidth / 2;
              that.masks[i] = mask.clone();
              that.containers[i].addChild(that.masks[i]);
              that.containers[i].mask = that.masks[i];
              that.images[i].anchor.x = 0.5;
              that.images[i].anchor.y = 0.5;  
              that.rootContainer.addChild(that.containers[i]);
              let params = heroBgCover(el);
              that.images[i].width = params.width;
              that.images[i].height = params.height;
              that.images[i].x = params.x;
              that.images[i].y = params.y;
              that.containers[i].addChild(that.images[i]);
            });         
  
  
          });
          that.servicesLeisureSwiper.init();
  
          that.servicesLeisureSwiper.on('slideChangeTransitionStart', function(){
            let that = this;          
            TweenMax.to(that.rootContainer, 0.8, {x: -(that.el.clientWidth * that.realIndex), ease: Power2.easeInOut})
            if (that.realIndex > that.previousIndex) {
              for(i in that.images){
                let scale = that.images[i].currentScale;
                new TimelineMax()
                .to(that.containers[i].skew, 0.4, {x: -0.35, ease: Power3.easeIn}, 'start')
                .to(that.containers[i].scale, 0.4, {y: 1.1, ease: Power3.easeIn}, 'start')
                .to([that.images[i].scale], 0.5, {x: (scale.x * 1.5), y: (scale.y * 1.5), ease: Power2.easeIn}, 'start')                
                .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: -35, ease: Power2.easeIn}, 'start')
                .to(that.containers[i].skew, 0.4, {x: 0, ease: Power3.easeOut}, 'end')
                .to(that.containers[i].scale, 0.4, {y: 1, ease: Power3.easeOut}, 'end')
                .to([that.images[i].scale], 0.5, {x: (scale.x), y: (scale.y), ease: Power2.easeOut}, 'end')
                .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: 0, ease: Power2.easeOut}, 'end')
              }
            }else{              
              for(i in that.images){
                let scale = that.images[i].currentScale;
                new TimelineMax()
                  .to(that.containers[i].skew, 0.4, {x: 0.35, ease: Power3.easeIn}, 'start')
                  .to(that.containers[i].scale, 0.4, {y: 1.1, ease: Power3.easeIn}, 'start')
                  .to([that.images[i].scale], 0.5, {x: (scale.x * 1.5), y: (scale.y * 1.5), ease: Power2.easeIn}, 'start')                
                  .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: 35, ease: Power2.easeIn}, 'start')
                  .to(that.containers[i].skew, 0.4, {x: 0, ease: Power3.easeOut}, 'end')
                  .to(that.containers[i].scale, 0.4, {y: 1, ease: Power3.easeOut}, 'end')
                  .to([that.images[i].scale], 0.5, {x: (scale.x), y: (scale.y), ease: Power2.easeOut}, 'end')
                  .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: 0, ease: Power2.easeOut}, 'end')
              }
            }
          });               
          
          // SERVICES LEISURE SWIPER END //
  
          // SERVICES BUSINESS SWIPER  START//
          that.servicesBusinessSwiper = new Swiper('.homepage__services .business .swiper-container', {
            // Optional parameters
            speed: 800,
            init: false,
            simulateTouch: false,
            followFinger: false,
            touchRatio: 2,          
            // If we need pagination
            pagination: {
              el: '.slider-pagination',
              type: 'fraction'
            },
            // Navigation arrows
            navigation: {
              nextEl: '.slider-button-next',
              prevEl: '.slider-button-prev',
            }
          });
          that.servicesBusinessSwiper.on('init', function(){
            const that = this;
            that.images = [];
            that.containers = [];
            that.masks = [];
            function heroBgCover(el) {
              let ratio = el.width / el.height;            
              if (ratio < 1) {
                return {
                  width: that.el.clientWidth,
                  height: that.el.clientWidth / ratio,
                  x: that.el.clientWidth / 2,
                  y: (el.height / 2) + (that.el.clientWidth - el.height) / 2
                }
              } else if (ratio > 1) {
                return {
                  width: that.el.clientWidth * ratio,
                  height: that.el.clientWidth,
                  x: (el.height / 2) + (that.el.clientWidth - el.height) / 2,
                  y: that.el.clientWidth / 2
                }
              } else {              
                return {
                  width: that.el.clientWidth,
                  height: that.el.clientWidth,
                  x: that.el.clientWidth / 2,
                  y: that.el.clientWidth / 2
                }
              }
            }
            that.hero = new PIXI.Application({
              width: that.el.clientWidth,
              height: that.el.clientHeight,
              backgroundColor: 0x000000
            });          
            that.el.appendChild(that.hero.view);
            that.rootContainer = new PIXI.Container();
            that.hero.stage.addChild(that.rootContainer);
            that.rootContainer.alpha = 0.8;
            
            let mask = new PIXI.Graphics();          
            mask.lineStyle(0);
            mask.beginFill(0xff0000, 1);
            //that.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);
            mask.drawRect(0, 0, that.el.clientWidth, that.el.clientWidth);          
            mask.endFill();
  
            that.el.querySelectorAll('.slide--photo img').forEach(function(el, i){
              that.images[i] = new PIXI.Sprite.from(el.getAttribute('src'));
              that.containers[i] = new PIXI.Container();            
              that.containers[i].width = that.el.clientWidth;
              that.containers[i].height = that.el.clientWidth;
              that.containers[i].pivot.y = that.el.clientWidth / 2;
              that.containers[i].x = that.el.clientWidth * i;
              that.containers[i].y = that.el.clientWidth / 2;
              that.masks[i] = mask.clone();
              that.containers[i].addChild(that.masks[i]);
              that.containers[i].mask = that.masks[i];
              that.images[i].anchor.x = 0.5;
              that.images[i].anchor.y = 0.5;  
              that.rootContainer.addChild(that.containers[i]);
              let params = heroBgCover(el);
              that.images[i].width = params.width;
              that.images[i].height = params.height;
              that.images[i].x = params.x;
              that.images[i].y = params.y;
              that.containers[i].addChild(that.images[i]);
            });         
  
  
          });
          that.servicesBusinessSwiper.init();
  
          that.servicesBusinessSwiper.on('slideChangeTransitionStart', function(){
            let that = this;          
            TweenMax.to(that.rootContainer, 0.8, {x: -(that.el.clientWidth * that.realIndex), ease: Power2.easeInOut})
            if (that.realIndex > that.previousIndex) {
              for(i in that.images){
                let scale = that.images[i].currentScale;
                new TimelineMax()
                .to(that.containers[i].skew, 0.4, {x: -0.35, ease: Power3.easeIn}, 'start')
                .to(that.containers[i].scale, 0.4, {y: 1.1, ease: Power3.easeIn}, 'start')
                .to([that.images[i].scale], 0.5, {x: (scale.x * 1.5), y: (scale.y * 1.5), ease: Power2.easeIn}, 'start')                
                .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: -35, ease: Power2.easeIn}, 'start')
                .to(that.containers[i].skew, 0.4, {x: 0, ease: Power3.easeOut}, 'end')
                .to(that.containers[i].scale, 0.4, {y: 1, ease: Power3.easeOut}, 'end')
                .to([that.images[i].scale], 0.5, {x: (scale.x), y: (scale.y), ease: Power2.easeOut}, 'end')
                .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: 0, ease: Power2.easeOut}, 'end')
              }
            }else{              
              for(i in that.images){
                let scale = that.images[i].currentScale;
                new TimelineMax()
                  .to(that.containers[i].skew, 0.4, {x: 0.35, ease: Power3.easeIn}, 'start')
                  .to(that.containers[i].scale, 0.4, {y: 1.1, ease: Power3.easeIn}, 'start')
                  .to([that.images[i].scale], 0.5, {x: (scale.x * 1.5), y: (scale.y * 1.5), ease: Power2.easeIn}, 'start')                
                  .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: 35, ease: Power2.easeIn}, 'start')
                  .to(that.containers[i].skew, 0.4, {x: 0, ease: Power3.easeOut}, 'end')
                  .to(that.containers[i].scale, 0.4, {y: 1, ease: Power3.easeOut}, 'end')
                  .to([that.images[i].scale], 0.5, {x: (scale.x), y: (scale.y), ease: Power2.easeOut}, 'end')
                  .to(that.el.querySelectorAll('.slide--text'), 0.4, {skewX: 0, ease: Power2.easeOut}, 'end')
              }
            }
          });               
          
          // SERVICES LEISURE SWIPER END //
          
          
          aosInit();          
        })
        .to('#loader-logo', 0.5, { opacity: 0}, '+=1')
        .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {
          scaleX: 0, ease: Power4.easeIn, onStart: function(){
            app.homepage.heroBgCover();
          }, onComplete: function () {
            document.querySelector('.loader').remove();
            TweenMax.set('body', { overflow: 'auto' });
            app.homepage.heroBgCover();            
            let ff, fm;
            if(app.mode == 'descktop'){
              ff = 9.9;
              fm = 42;
            }else if(app.mode == 'tablet'){
              ff = 15.9;
              fm = 22;
            }else if(app.mode == 'mobile'){
              ff = 15.9;
              fm = 22;
            }
            let fs = (window.innerWidth / 100) * ff;
            app.homepage.hero.smart.style.fontSize = fs;
            app.homepage.hero.choise.style.fontSize = fs;
            app.homepage.hero.save.style.fontSize = fs;
            app.homepage.hero.time.style.fontSize = fs;
            //that.hero.heroBgCover();
            app.homepage.hero.hero.renderer.resize(app.homepage.hero.el.clientWidth, app.homepage.hero.el.clientHeight);
            app.homepage.hero.smart.x = ((app.homepage.hero.el.clientWidth / 100) * fm);
            app.homepage.hero.smart.y = 140 - ((Math.floor(fs) / 100) * 7.563724377883669);
            app.homepage.hero.choise.x = ((app.homepage.hero.el.clientWidth / 100) * fm) + ((app.homepage.hero.el.clientWidth / 100) * 6);
            app.homepage.hero.choise.y = (140 - ((fs / 100) * 7.563724377883669)) + Math.floor(fs);
            app.homepage.hero.save.x = ((app.homepage.hero.el.clientWidth / 100) * fm) + ((app.homepage.hero.el.clientWidth / 100) * 12.1);
            app.homepage.hero.save.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 2);
            app.homepage.hero.time.x = ((app.homepage.hero.el.clientWidth / 100) * fm) + ((app.homepage.hero.el.clientWidth / 100) * 18.2);
            app.homepage.hero.time.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 3);

            app.homepage.hero.smart2.x = ((app.homepage.hero.el.clientWidth / 100) * fm);
            app.homepage.hero.smart2.y = 140 - ((Math.floor(fs) / 100) * 7.563724377883669);
            app.homepage.hero.choise2.x = ((app.homepage.hero.el.clientWidth / 100) * fm) + ((app.homepage.hero.el.clientWidth / 100) * 6);
            app.homepage.hero.choise2.y = (140 - ((fs / 100) * 7.563724377883669)) + Math.floor(fs);
            app.homepage.hero.save2.x = ((app.homepage.hero.el.clientWidth / 100) * fm) + ((app.homepage.hero.el.clientWidth / 100) * 12.1);
            app.homepage.hero.save2.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 2);
            app.homepage.hero.time2.x = ((app.homepage.hero.el.clientWidth / 100) * fm) + ((app.homepage.hero.el.clientWidth / 100) * 18.2);
            app.homepage.hero.time2.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 3);

            // app.homepage.hero.displacementSprite.width = app.homepage.hero.hero.renderer.width / 3;
            // app.homepage.hero.displacementSprite.height = app.homepage.hero.hero.renderer.width / 3;
            // app.homepage.hero.displacementSprite.x = app.homepage.hero.hero.renderer.width / 2;
            // app.homepage.hero.displacementSprite.y = app.homepage.hero.hero.renderer.height / 2;



            TweenMax.set('.homepage__description_bg .m', { x: -55, y: -31 });
            TweenMax.set('.homepage__description_bg .h', { x: -55, y: -30 });

            TweenMax.to('.homepage__description_bg .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
            TweenMax.to('.homepage__description_bg .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });

            new TimelineMax({ repeat: -1 })
              .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#f8d4e4', ease: Power0.easeNone })
              .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#d8ebe7', ease: Power0.easeNone })
              .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#5ebfaf', ease: Power0.easeNone })
              .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#577081', ease: Power0.easeNone })
              .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#eb4333', ease: Power0.easeNone })
              .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#d7ebe6', ease: Power0.easeNone })
              .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#bfbdce', ease: Power0.easeNone })
              .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#9ccad5', ease: Power0.easeNone })
              .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#5ebfaf', ease: Power0.easeNone })
              .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#2f2f2f', ease: Power0.easeNone })
          }
        }, '-=0.3')
        .staggerFrom(document.querySelectorAll('.homepage__hero h1 span'), 1, { rotationX: 90, opacity: 0, ease: Power2.easeOut }, 0.1, '+=0.3', swichText)
        .from('header', 0.8, { opacity: 0 }, '-=0.5')
        .from('.homepage__hero_footer', 0.8, { opacity: 0 }, '-=0.4')
        .from('[data-action="homepage-hero-play"]', 0.5, { scale: 1.4, opacity: 0 }, '-=0.4')
        .add(function () {          
          TweenMax.set(document.querySelectorAll('.homepage__insta h2 span, .expert__form_title h2 span'), { opacity: 0 });
          root.slidersResize.leisureSwiper();
          root.slidersResize.businessSwiper();
          root.slidersResize.servicesLeisureSwiper();
          root.slidersResize.servicesBusinessSwiper();
          root.slidersResize.leisureSwiper();
          root.slidersResize.businessSwiper();
          root.slidersResize.servicesLeisureSwiper();
          root.slidersResize.servicesBusinessSwiper();
        });
      function swichText() {
        //TweenMax.set(document.querySelectorAll('.homepage__hero h1 span'), {opacity: 0});
        new TimelineMax()
          .to([app.homepage.hero.container, app.homepage.hero.container2], 0.2, { alpha: 1 })
          .to(document.querySelectorAll('.homepage__hero h1 span'), 0.2, { opacity: 0 })
          .to(app.homepage.hero.blur, 1, { blur: app.mode == 'mobile' ? 10 : 16 })
        //.to(app.homepage.hero.displacementFilter.scale, 5 , {x: 30, y: 30});
        // TweenMax.set(app.homepage.hero.choise, 0.5, {alpha: 1});
        // TweenMax.set(app.homepage.hero.save, 0.5, {alpha: 1});
        // TweenMax.set(app.homepage.hero.time, 0.5, {alpha: 1});
      }

    }
  }
  // /.Loader

  this.loader.init();

  

  // Start Hero background
  function heroRender() {
    let that = this;

    this.el = document.querySelector('.homepage__hero');
    this.hero = new PIXI.Application({
      width: this.el.clientWidth,
      height: this.el.clientHeight,
      transparent: true,
      //forceFXAA: true,
      //clearBeforeRender: false
      //forceCanvas: true
    });
    this.el.appendChild(this.hero.view);

    //this.hero.ticker.maxFPS = 30;
    //this.hero.ticker.speed = 0.1;
    this.hero.stage.interactive = true;
    this.container = new PIXI.Container();
    this.container2 = new PIXI.Container();
    that.hero.stage.addChild(that.container);
    that.hero.stage.addChild(that.container2);

    // this.hero.ticker.add(function (delta) {
    //   console.log(delta, that.hero.ticker.FPS);
    // });

    const loader = PIXI.Loader.shared;
    loader.add('displacementSprite', './img/displacement.png')
    loader.load(function (loader, resources) {

      let factor;
      if(app.mode == 'descktop'){
        factor = 9.9;
      }else if(app.mode == 'tablet'){
        factor = 15.9;
      }
      
      let fs = (window.innerWidth / 100) * factor;

      const style = new PIXI.TextStyle({
        fontFamily: 'Futura',
        fontSize: fs,
        fontWeight: 'normal',
        fill: '#ffffff'
      });


      that.smart = new PIXI.Text('Focus', style);
      that.choise = new PIXI.Text('on your', style);
      that.save = new PIXI.Text('important', style);
      that.time = new PIXI.Text('things', style);

      that.smart2 = new PIXI.Text('Focus', style);
      that.choise2 = new PIXI.Text('on your', style);
      that.save2 = new PIXI.Text('important', style);
      that.time2 = new PIXI.Text('things', style);

      that.container.addChild(that.smart);
      that.container.addChild(that.choise);
      that.container.addChild(that.save);
      that.container.addChild(that.time);
      that.container2.addChild(that.smart2);
      that.container2.addChild(that.choise2);
      that.container2.addChild(that.save2);
      that.container2.addChild(that.time2);
      that.blur = new PIXI.filters.BlurFilter();
      that.blur.blur = 0;
      that.blur.quality = app.mode == 'mobile' ? 4 : 8;
      that.container2.filters = [that.blur];


      that.smart.x = ((window.innerWidth / 100) * 42);
      that.smart.y = 140 - ((Math.floor(fs) / 100) * 7.563724377883669);
      that.choise.x = ((window.innerWidth / 100) * 42) + ((window.innerWidth / 100) * 6);
      that.choise.y = (140 - ((fs / 100) * 7.563724377883669)) + Math.floor(fs);
      that.save.x = ((window.innerWidth / 100) * 42) + ((window.innerWidth / 100) * 12);
      that.save.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 2);
      that.time.x = ((window.innerWidth / 100) * 42) + ((window.innerWidth / 100) * 18);
      that.time.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 3);

      that.smart2.x = ((window.innerWidth / 100) * 42);
      that.smart2.y = 140 - ((Math.floor(fs) / 100) * 7.563724377883669);
      that.choise2.x = ((window.innerWidth / 100) * 42) + ((window.innerWidth / 100) * 6);
      that.choise2.y = (140 - ((fs / 100) * 7.563724377883669)) + Math.floor(fs);
      that.save2.x = ((window.innerWidth / 100) * 42) + ((window.innerWidth / 100) * 12);
      that.save2.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 2);
      that.time2.x = ((window.innerWidth / 100) * 42) + ((window.innerWidth / 100) * 18);
      that.time2.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 3);

      that.container.alpha = 0;
      that.container2.alpha = 0;

      const blurSize = 30;
      const radius = app.mode == 'mobile' ? 100 : 170;
      const circle = new PIXI.Graphics()
        .beginFill(0xFF0000)
        .drawCircle(radius + blurSize, radius + blurSize, radius)
        .endFill();
      circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

      const rect = new PIXI.Graphics();

      rect.beginFill(0xFFFFFF);
      rect.drawRect(0, 0, 4000, 4000);
      rect.beginHole();
      rect.drawCircle(1925, 1925, (app.mode == 'mobile' ? 100 : 150));
      rect.endHole();
      rect.endFill();

      rect.filters = [new PIXI.filters.BlurFilter(blurSize)];



      //console.log(app.homepage.hero.hero.renderer)
      const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
      const bounds2 = new PIXI.Rectangle(0, 0, 4000, 4000);
      const texture = app.homepage.hero.hero.renderer.generateTexture(circle, PIXI.SCALE_MODES.NEAREST, 1, bounds);
      const texture2 = app.homepage.hero.hero.renderer.generateTexture(rect, PIXI.SCALE_MODES.NEAREST, 1, bounds2);

      that.focus = new PIXI.Sprite(texture);
      that.unFocus = new PIXI.Sprite(texture2);
      that.hero.stage.addChild(that.focus);
      that.hero.stage.addChild(that.unFocus);
      that.focus.x = (window.document.body.clientWidth / 2) - (app.mode == 'mobile' ? 130 : 200);
      that.focus.y = (window.innerHeight / 2) - (app.mode == 'mobile' ? 130 : 200);
      that.unFocus.x = (window.document.body.clientWidth / 2) - 1925;
      that.unFocus.y = (window.innerHeight / 2) - 1925;      
      that.container.mask = that.focus;
      that.container2.mask = that.unFocus;
      
      let adjust = (app.mode == 'mobile' ? 130 : 200);
      function onPointerMove(e) {
        TweenMax.to(that.focus, 1, { x: e.clientX - adjust, y: e.clientY - adjust});
        TweenMax.to(that.unFocus, 1, { x: e.clientX - 1925, y: e.clientY - 1925 });        
      }
      that.el.addEventListener('mousemove', onPointerMove);      
    });







    //this.heroBgCover();



    // this.heroPlay = false;

    // this.el.addEventListener('click', function(e){
    //   if(that.heroPlay){
    //     that.video.baseTexture.source.pause();
    //     that.heroPlay = false;
    //   }else{        
    //     that.video.baseTexture.source.play();
    //     that.heroPlay = true;
    //   }      
    // });




  }
  // End Hero background

  // Start Drag Slider
  function dragRender() {
    let that = this;
    let ratio;

    this.heroBgCover = function (el) {
      let ratio = el.width / el.height;
      if (document.body.clientWidth / window.innerHeight > ratio) {        
        return {          
          width: window.innerWidth,
          height: window.innerWidth / ratio,
          x: 0,
          y: (window.innerHeight - window.innerWidth / ratio) / 2
        }
      } else {        
        return {
          width: window.innerHeight * ratio,
          height: window.innerHeight,
          x: (window.innerWidth - (window.innerHeight * ratio)) / 2,
          y: 0
        }
      }
    };

    this.show = false;
    this.el = document.querySelector('.homepage__drag');

    this.el.querySelectorAll('h2 a').forEach(function (el, i) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        let href = e.target.href;
        let target = e.target.getAttribute('data-target');
        TweenMax.to('[data-action="homepage-drag"]', 0.6, { scale: 0, ease: Power2.easeInOut });
        if (target == 'leisure') {
          TweenMax.to(document.querySelector('canvas.leisure'), 1.2, {
            x: - that.el.clientWidth, ease: Power2.easeInOut, onComplete: function () {
              window.location.href = href;
            }
          });
          TweenMax.set(document.querySelector('canvas.business'), { x: 0 });
        } else if (target == 'business') {
          TweenMax.set(document.querySelector('canvas.leisure'), { x: 0 });
          TweenMax.to(document.querySelector('canvas.business'), 1.2, {
            x: that.el.clientWidth, ease: Power2.easeInOut, onComplete: function () {
              window.location.href = href;
            }
          });
        }
      });
    });


    this.canv1 = document.createElement('canvas');
    this.canv1.className = 'pats';
    this.ctx1 = this.canv1.getContext('2d');
    this.canv2 = document.createElement('canvas');
    this.canv2.className = 'leisure';
    this.ctx2 = this.canv2.getContext('2d');
    this.canv3 = document.createElement('canvas');
    this.canv3.className = 'business';
    this.ctx3 = this.canv3.getContext('2d');
    // this.canvas.width = this.el.clientWidth;
    // this.canvas.height = this.el.clientHeight;
    this.el.appendChild(this.canv1);
    this.el.appendChild(this.canv2);
    this.el.appendChild(this.canv3);

    this.pat1 = new Image();
    this.pat1.src = this.el.getAttribute('data-pat-left');
    this.pat1.onload = function () {
      ratio = this.width / this.height;
      that.canv1.width = that.el.clientWidth;
      that.canv1.height = (app.mode == 'descktop' ? that.el.clientWidth / ratio : that.el.clientHeight);
      that.ctx1.save();
      that.ctx1.beginPath();
      that.ctx1.moveTo(0, 0);
      that.ctx1.lineTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0);
      that.ctx1.lineTo(((that.el.clientWidth / 2) - (that.el.clientWidth / 2) / 2.92), that.el.clientHeight);
      that.ctx1.lineTo(0, that.el.clientHeight);
      that.ctx1.lineTo(0, 0);
      that.ctx1.closePath();
      // Clip to the current path
      that.ctx1.clip();
      let param = that.heroBgCover(that.pat1);
      that.ctx1.drawImage(that.pat1, param.x, param.y, param.width, param.height);
      that.ctx1.restore();
    }
    this.pat2 = new Image();
    this.pat2.src = this.el.getAttribute('data-pat-right');
    this.pat2.onload = function () {
      that.ctx1.save();
      that.ctx1.beginPath();
      that.ctx1.moveTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0);
      that.ctx1.lineTo(that.el.clientWidth, 0);
      that.ctx1.lineTo(that.el.clientWidth, that.el.clientHeight);
      that.ctx1.lineTo(((that.el.clientWidth / 2) - (that.el.clientWidth / 2) / 2.92), that.el.clientHeight);
      that.ctx1.lineTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0);
      that.ctx1.closePath();
      // Clip to the current path
      that.ctx1.clip();
      let param = that.heroBgCover(that.pat2);
      that.ctx1.drawImage(that.pat2, param.x, param.y, param.width, param.height);      
      that.ctx1.restore();
    }

    this.img1 = new Image();
    this.img1.src = this.el.getAttribute('data-img-left');
    this.img1.onload = function () {
      ratio = this.width / this.height;
      that.canv2.width = that.el.clientWidth;
      that.canv2.height = (app.mode == 'descktop' ? that.el.clientWidth / ratio : that.el.clientHeight);
      that.ctx2.save();
      that.ctx2.beginPath();
      that.ctx2.moveTo(0, 0);
      that.ctx2.lineTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0);
      that.ctx2.lineTo(((that.el.clientWidth / 2) - (that.el.clientWidth / 2) / 2.92), that.el.clientHeight);
      that.ctx2.lineTo(0, that.el.clientHeight);
      that.ctx2.lineTo(0, 0);
      that.ctx2.closePath();
      // Clip to the current path
      that.ctx2.clip();
      let param = that.heroBgCover(that.img1);
      that.ctx2.drawImage(that.img1, param.x, param.y, param.width, param.height);
      that.ctx2.restore();
    }
    this.img2 = new Image();
    this.img2.src = this.el.getAttribute('data-img-right');
    this.img2.onload = function () {
      ratio = this.width / this.height;
      that.canv3.width = that.el.clientWidth;
      that.canv3.height = (app.mode == 'descktop' ? that.el.clientWidth / ratio : that.el.clientHeight);
      that.ctx3.save();
      that.ctx3.beginPath();
      that.ctx3.moveTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0);
      that.ctx3.lineTo(that.el.clientWidth, 0);
      that.ctx3.lineTo(that.el.clientWidth, that.el.clientHeight);
      that.ctx3.lineTo(((that.el.clientWidth / 2) - (that.el.clientWidth / 2) / 2.92), that.el.clientHeight);
      that.ctx3.lineTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0);
      that.ctx3.closePath();
      // Clip to the current path
      that.ctx3.clip();
      let param = that.heroBgCover(that.img2);
      that.ctx3.drawImage(that.img2, param.x, param.y, param.width, param.height);      
      that.ctx3.restore();
    }





    this.dragMove = false;
    this.dragx = 0;
    this.dragDone = false;

    this.dragControl = function (e) {
      let eX = e.clientX || e.touches[0].clientX;
      if (that.dragMove) {
        let limit = (that.el.clientWidth / 2) / 3;
        let x = eX - that.dragx;        
        if (x < 0 && x > -limit) {
          TweenMax.to(document.querySelector('canvas.leisure'), 0, { x: x });
          TweenMax.to(document.querySelector('canvas.business'), 0, { x: 0 });
          TweenMax.to('[data-action="homepage-drag"]', 0, { x: x });
        } else if (x > 0 && x < limit) {
          TweenMax.to(document.querySelector('canvas.leisure'), 0, { x: 0 });
          TweenMax.to(document.querySelector('canvas.business'), 0, { x: x });
          TweenMax.to('[data-action="homepage-drag"]', 0, { x: x });
        } else if (x < -limit || x > limit) {
          that.dragMove = false;
          that.dragDone = true;
          let href;
          TweenMax.to('[data-action="homepage-drag"], .homepage__drag_dots', 0.6, { scale: 0, ease: Power2.easeInOut });
          if (x < -limit) {
            href = document.querySelector('.homepage__drag h2 a[data-target="leisure"]').href;
            TweenMax.to(document.querySelector('canvas.leisure'), 1.2, {
              x: - that.el.clientWidth, ease: Power2.easeInOut, onComplete: function () {
                window.location.href = href;
              }
            });
            TweenMax.set(document.querySelector('canvas.business'), { x: 0 });
          } else if (x > limit) {
            href = document.querySelector('.homepage__drag h2 a[data-target="business"]').href;
            TweenMax.set(document.querySelector('canvas.leisure'), { x: 0 });
            TweenMax.to(document.querySelector('canvas.business'), 1.2, {
              x: that.el.clientWidth, ease: Power2.easeInOut, onComplete: function () {
                window.location.href = href;
              }
            });
          }
        }
      }
    }
  }

  this.slidersResize = {
    leisureSwiper: function(){
      let that = root.loader.leisureSwiper;
      function heroBgCover(el) {
        let ratio = el.width / el.height;            
        if (ratio < 1) {
          let width, height, x, y;
          if(app.mode == 'descktop'){
            width = ((that.el.clientWidth) - 90) / 2;
            height = (((that.el.clientWidth) - 90) / 2) / ratio;
            x = ((that.el.clientWidth) - 90) / 4;
            y = (((that.el.clientWidth) - 90) - (((that.el.clientWidth) - 90)/2) / ratio);
          }else if(app.mode == 'tablet'){
            width = that.el.clientWidth - 120;
            height = (that.el.clientWidth - 120) / ratio;
            x = (that.el.clientWidth - 120) / 2;
            y = (el.height / 2) + (((that.el.clientWidth - 120) - el.height) / 2);
          }else if(app.mode == 'mobile'){
            width = that.el.clientWidth - 40;
            height = (that.el.clientWidth - 40) / ratio;
            x = (that.el.clientWidth - 40) / 2;
            y = (el.height / 2) + (((that.el.clientWidth - 40) - el.height) / 2);
          }
          return {
            width: width,
            height: height,
            x: x,
            y: y
          }
        } else if (ratio > 1) {
          let width, height, x, y;
          if(app.mode == 'descktop'){                  
            x = (((that.el.clientWidth) - 90) - that.el.clientHeight * ratio);
            y = ((that.el.clientWidth) - 90) / 4;
          }else if(app.mode == 'tablet'){                  
            x = (el.width / 2) + (((that.el.clientWidth - 120) - el.width) / 2);
            y = (that.el.clientWidth - 120) / 2;
          }else if(app.mode == 'mobile'){
            x = (el.width / 2) + (((that.el.clientWidth - 40) - el.width) / 2);
            y = (that.el.clientWidth - 40) / 2;
          }
          return {
            width: that.el.clientHeight * ratio,
            height: that.el.clientHeight,
            x: x,
            y: y
          }
        } else {
          let width, height, x, y;
          if(app.mode == 'descktop'){
            width = ((that.el.clientWidth) - 180) / 2;
            height = ((that.el.clientWidth) - 180) / 2;
            x = (((that.el.clientWidth) - 180) / 2) / 2;
            y = (((that.el.clientWidth) - 180) / 2) / 2;
          }else if(app.mode == 'tablet'){
            width = (that.el.clientWidth - 120);
            height = (that.el.clientWidth - 120);
            x = (that.el.clientWidth - 120) / 2;
            y = (that.el.clientWidth - 120) / 2;
          }else if(app.mode == 'mobile'){
            width = (that.el.clientWidth - 40);
            height = (that.el.clientWidth - 40);
            x = (that.el.clientWidth - 40) / 2;
            y = (that.el.clientWidth - 40) / 2;
          }
          return {
            width: width,
            height: height,
            x: x,
            y: y
          }
        }
      }
      that.hero.renderer.resize(that.el.clientWidth, that.el.clientWidth);
      that.el.querySelectorAll('.slide--photo img').forEach(function(el, i){
        let size;
        let rootX;
        if(app.mode == 'descktop'){
          size = (that.el.clientWidth - 180) / 2;
          rootX = (that.el.clientWidth * i) + (((that.el.clientWidth) / 2));
        }else if(app.mode == 'tablet'){
          size = that.el.clientWidth - 120;
          rootX = (that.el.clientWidth * i) + 60;
        }else if(app.mode == 'mobile'){
          size = that.el.clientWidth - 40;
          rootX = (that.el.clientWidth * i) + 20;
        }
        that.containers[i].width = size;
        that.containers[i].height = size;
        that.containers[i].x = rootX;
        that.containers[i].y = 0;
        that.masks[i].clear();
        that.masks[i].lineStyle(0);
        that.masks[i].beginFill(0xff0000, 1);
        //this.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
        if(app.mode == 'descktop'){
          that.masks[i].drawRect(0, 0, (that.el.clientWidth / 2) - 90, (that.el.clientWidth / 2) - 90);
        }else if(app.mode == 'tablet'){
          that.masks[i].drawRect(0, 0, that.el.clientWidth - 120, that.el.clientWidth - 120);
        }else if(app.mode == 'mobile'){
          that.masks[i].drawRect(0, 0, that.el.clientWidth - 40, that.el.clientWidth - 40);
        }
        that.masks[i].endFill();        
        let params = heroBgCover(el);            
        that.images[i].width = params.width;
        that.images[i].height = params.height;
        that.images[i].x = params.x;
        that.images[i].y = params.y;
        that.images[i].currentScale = {
          x: that.images[i].scale.x,
          y: that.images[i].scale.y
        }
        TweenMax.set(that.rootContainer, {x: -(that.el.clientWidth * that.realIndex)});
      });
    },
    businessSwiper: function(){
      let that = root.loader.businessSwiper;
      function heroBgCover(el) {
        let ratio = el.width / el.height;            
        if (ratio < 1) {
          let width, height, x, y;
          if(app.mode == 'descktop'){
            width = ((that.el.clientWidth) - 90) / 2;
            height = (((that.el.clientWidth) - 90) / 2) / ratio;
            x = ((that.el.clientWidth) - 90) / 4;
            y = (((that.el.clientWidth) - 90) - (((that.el.clientWidth) - 90)/2) / ratio);
          }else if(app.mode == 'tablet'){
            width = that.el.clientWidth - 120;
            height = (that.el.clientWidth - 120) / ratio;
            x = (that.el.clientWidth - 120) / 2;
            y = (el.height / 2) + (((that.el.clientWidth - 120) - el.height) / 2);
          }else if(app.mode == 'mobile'){
            width = that.el.clientWidth - 40;
            height = (that.el.clientWidth - 40) / ratio;
            x = (that.el.clientWidth - 40) / 2;
            y = (el.height / 2) + (((that.el.clientWidth - 40) - el.height) / 2);
          }
          return {
            width: width,
            height: height,
            x: x,
            y: y
          }
        } else if (ratio > 1) {
          let width, height, x, y;
          if(app.mode == 'descktop'){                  
            x = (((that.el.clientWidth) - 90) - that.el.clientHeight * ratio);
            y = ((that.el.clientWidth) - 90) / 4;
          }else if(app.mode == 'tablet'){                  
            x = (el.width / 2) + (((that.el.clientWidth - 120) - el.width) / 2);
            y = (that.el.clientWidth - 120) / 2;
          }else if(app.mode == 'mobile'){
            x = (el.width / 2) + (((that.el.clientWidth - 40) - el.width) / 2);
            y = (that.el.clientWidth - 40) / 2;
          }
          return {
            width: that.el.clientHeight * ratio,
            height: that.el.clientHeight,
            x: x,
            y: y
          }
        } else {
          let width, height, x, y;
          if(app.mode == 'descktop'){
            width = ((that.el.clientWidth) - 180) / 2;
            height = ((that.el.clientWidth) - 180) / 2;
            x = (((that.el.clientWidth) - 180) / 2) / 2;
            y = (((that.el.clientWidth) - 180) / 2) / 2;
          }else if(app.mode == 'tablet'){
            width = (that.el.clientWidth - 120);
            height = (that.el.clientWidth - 120);
            x = (that.el.clientWidth - 120) / 2;
            y = (that.el.clientWidth - 120) / 2;
          }else if(app.mode == 'mobile'){
            width = (that.el.clientWidth - 40);
            height = (that.el.clientWidth - 40);
            x = (that.el.clientWidth - 40) / 2;
            y = (that.el.clientWidth - 40) / 2;
          }
          return {
            width: width,
            height: height,
            x: x,
            y: y
          }
        }
      }
      that.hero.renderer.resize(that.el.clientWidth, that.el.clientWidth);
      that.el.querySelectorAll('.slide--photo img').forEach(function(el, i){
        let size;
        let rootX;
        if(app.mode == 'descktop'){
          size = (that.el.clientWidth - 180) / 2;
          rootX = (that.el.clientWidth * i) + 90;
        }else if(app.mode == 'tablet'){
          size = that.el.clientWidth - 120;
          rootX = (that.el.clientWidth * i) + 60;
        }else if(app.mode == 'mobile'){
          size = that.el.clientWidth - 40;
          rootX = (that.el.clientWidth * i) + 20;
        }
        that.containers[i].width = size;
        that.containers[i].height = size;
        that.containers[i].x = rootX;
        that.containers[i].y = 0;
        that.masks[i].clear();
        that.masks[i].lineStyle(0);
        that.masks[i].beginFill(0xff0000, 1);          
        if(app.mode == 'descktop'){
          that.masks[i].drawRect(0, 0, (that.el.clientWidth / 2) - 90, (that.el.clientWidth / 2) - 90);
        }else if(app.mode == 'tablet'){
          that.masks[i].drawRect(0, 0, that.el.clientWidth - 120, that.el.clientWidth - 120);
        }else if(app.mode == 'mobile'){
          that.masks[i].drawRect(0, 0, that.el.clientWidth - 40, that.el.clientWidth - 40);
        }
        that.masks[i].endFill();
        let params = heroBgCover(el);            
        that.images[i].width = params.width;
        that.images[i].height = params.height;
        that.images[i].x = params.x;
        that.images[i].y = params.y;
        that.images[i].currentScale = {
          x: that.images[i].scale.x,
          y: that.images[i].scale.y
        }
        TweenMax.set(that.rootContainer, {x: -(that.el.clientWidth * that.realIndex)});
      }); 
    },
    servicesLeisureSwiper: function(){
      let that = root.loader.servicesLeisureSwiper;
      function heroBgCover(el) {
        let ratio = el.width / el.height;            
        console.log(that.el.clientWidth);
        if (ratio < 1) {
          return {
            width: that.el.clientWidth,
            height: that.el.clientWidth / ratio,
            x: that.el.clientWidth / 2,
            y: (el.height / 2) + (that.el.clientWidth - el.height) / 2
          }
        } else if (ratio > 1) {
          return {
            width: that.el.clientWidth * ratio,
            height: that.el.clientWidth,
            x: (el.height / 2) + (that.el.clientWidth - el.height) / 2,
            y: that.el.clientWidth / 2
          }
        } else {              
          return {
            width: that.el.clientWidth,
            height: that.el.clientWidth,
            x: that.el.clientWidth / 2,
            y: that.el.clientWidth / 2
          }
        }
      };
      that.hero.renderer.resize(that.el.clientWidth, that.el.clientWidth);
      that.el.querySelectorAll('.slide--photo img').forEach(function(el, i){        
        that.containers[i].width = that.el.clientWidth;
        that.containers[i].height = that.el.clientWidth;        
        that.containers[i].x = that.el.clientWidth * i;
        that.containers[i].y = that.el.clientWidth / 2;
        that.containers[i].pivot.y = that.el.clientWidth / 2;
        that.masks[i].clear();
        that.masks[i].lineStyle(0);
        that.masks[i].beginFill(0xff0000, 1);        
        that.masks[i].drawRect(0, 0, that.el.clientWidth, that.el.clientWidth);          
        that.masks[i].endFill();        
        let params = heroBgCover(el);        
        that.images[i].width = params.width;
        that.images[i].height = params.height;
        that.images[i].x = params.x;
        that.images[i].y = params.y;
        that.images[i].currentScale = {
          x: that.images[i].scale.x,
          y: that.images[i].scale.y
        }
        TweenMax.set(that.rootContainer, {x: -(that.el.clientWidth * that.realIndex)});
      }); 
    },
    servicesBusinessSwiper: function(){
      let that = root.loader.servicesBusinessSwiper;
      function heroBgCover(el) {
        let ratio = el.width / el.height;        
        if (ratio < 1) {
          return {
            width: that.el.clientWidth,
            height: that.el.clientWidth / ratio,
            x: that.el.clientWidth / 2,
            y: (el.height / 2) + (that.el.clientWidth - el.height) / 2
          }
        } else if (ratio > 1) {
          return {
            width: that.el.clientWidth * ratio,
            height: that.el.clientWidth,
            x: (el.height / 2) + (that.el.clientWidth - el.height) / 2,
            y: that.el.clientWidth / 2
          }
        } else {              
          return {
            width: that.el.clientWidth,
            height: that.el.clientWidth,
            x: that.el.clientWidth / 2,
            y: that.el.clientWidth / 2
          }
        }
      };
      that.hero.renderer.resize(that.el.clientWidth, that.el.clientWidth);
      that.el.querySelectorAll('.slide--photo img').forEach(function(el, i){        
        that.containers[i].width = that.el.clientWidth;
        that.containers[i].height = that.el.clientWidth;        
        that.containers[i].x = that.el.clientWidth * i;
        that.containers[i].y = that.el.clientWidth / 2;
        that.containers[i].pivot.y = that.el.clientWidth / 2;
        that.masks[i].clear();
        that.masks[i].lineStyle(0);
        that.masks[i].beginFill(0xff0000, 1);        
        that.masks[i].drawRect(0, 0, that.el.clientWidth, that.el.clientWidth);          
        that.masks[i].endFill();        
        let params = heroBgCover(el);        
        that.images[i].width = params.width;
        that.images[i].height = params.height;
        that.images[i].x = params.x;
        that.images[i].y = params.y;
        that.images[i].currentScale = {
          x: that.images[i].scale.x,
          y: that.images[i].scale.y
        }
        TweenMax.set(that.rootContainer, {x: -(that.el.clientWidth * that.realIndex)});
      }); 
    }
  };

  // End Drag Slider

  this.resizeHomepage = function (e) {
    heightUpdate();    
    root.slidersResize.leisureSwiper();
    root.slidersResize.businessSwiper();
    root.slidersResize.servicesLeisureSwiper();
    root.slidersResize.servicesBusinessSwiper();
    app.homepage.heroBgCover();
    if(app.mode == 'descktop'){
      ff = 9.9;
      fm = 42;
    }else if(app.mode == 'tablet'){
      ff = 15.9;
      fm = 22;
    }else if(app.mode == 'mobile'){
      ff = 15.9;
      fm = 22;
    }
    function resizeBg(el) {
      let ratio = el.width / el.height;
      if (document.body.clientWidth / window.innerHeight > ratio) {        
        return {          
          width: window.innerWidth,
          height: window.innerWidth / ratio,
          x: 0,
          y: (window.innerHeight - window.innerWidth / ratio) / 2
        }
      } else {        
        return {
          width: window.innerHeight * ratio,
          height: window.innerHeight,
          x: (window.innerWidth - (window.innerHeight * ratio)) / 2,
          y: 0
        }
      }
    };
    let fs = (window.innerWidth / 100) * ff;
    that.hero.smart.style.fontSize = fs;
    that.hero.choise.style.fontSize = fs;
    that.hero.save.style.fontSize = fs;
    that.hero.time.style.fontSize = fs;
    //that.hero.heroBgCover();
    that.hero.hero.renderer.resize(that.hero.el.clientWidth, that.hero.el.clientHeight);


    that.hero.smart.x = ((that.hero.el.clientWidth / 100) * fm);
    that.hero.smart.y = 140 - ((Math.floor(fs) / 100) * 7.563724377883669);
    that.hero.choise.x = ((that.hero.el.clientWidth / 100) * fm) + ((that.hero.el.clientWidth / 100) * 6);
    that.hero.choise.y = (140 - ((fs / 100) * 7.563724377883669)) + Math.floor(fs);
    that.hero.save.x = ((that.hero.el.clientWidth / 100) * fm) + ((that.hero.el.clientWidth / 100) * 12.1);
    that.hero.save.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 2);
    that.hero.time.x = ((that.hero.el.clientWidth / 100) * fm) + ((that.hero.el.clientWidth / 100) * 18.2);
    that.hero.time.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 3);

    that.hero.smart2.x = ((that.hero.el.clientWidth / 100) * fm);
    that.hero.smart2.y = 140 - ((Math.floor(fs) / 100) * 7.563724377883669);
    that.hero.choise2.x = ((that.hero.el.clientWidth / 100) * fm) + ((that.hero.el.clientWidth / 100) * 6);
    that.hero.choise2.y = (140 - ((fs / 100) * 7.563724377883669)) + Math.floor(fs);
    that.hero.save2.x = ((that.hero.el.clientWidth / 100) * fm) + ((that.hero.el.clientWidth / 100) * 12.1);
    that.hero.save2.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 2);
    that.hero.time2.x = ((that.hero.el.clientWidth / 100) * fm) + ((that.hero.el.clientWidth / 100) * 18.2);
    that.hero.time2.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 3);
    // that.hero.bg.width = that.hero.heroBgWidth;
    // that.hero.bg.height = that.hero.heroBgHeight;
    // that.hero.bg.x  = that.hero.heroBgLeft;
    // that.hero.bg.y  = that.hero.heroBgTop;
    // that.hero.displacementSprite.width = app.homepage.hero.hero.renderer.width / 3;
    // that.hero.displacementSprite.height = app.homepage.hero.hero.renderer.width / 3;

    let ratio = that.drag.pat1.width / that.drag.pat1.height;
    that.drag.canv1.width = that.drag.el.clientWidth;
    that.drag.canv1.height = (app.mode == 'descktop' ? that.hero.el.clientWidth / ratio : that.hero.el.clientHeight);
    that.drag.canv2.width = that.drag.el.clientWidth;
    that.drag.canv2.height = (app.mode == 'descktop' ? that.hero.el.clientWidth / ratio : that.hero.el.clientHeight);
    that.drag.canv3.width = that.drag.el.clientWidth;
    that.drag.canv3.height = (app.mode == 'descktop' ? that.hero.el.clientWidth / ratio : that.hero.el.clientHeight);

    that.drag.ctx1.save();
    that.drag.ctx1.beginPath();
    that.drag.ctx1.moveTo(0, 0);
    that.drag.ctx1.lineTo(((that.drag.el.clientWidth / 2) + (that.drag.el.clientWidth / 2) / 2.92), 0);
    that.drag.ctx1.lineTo(((that.drag.el.clientWidth / 2) - (that.drag.el.clientWidth / 2) / 2.92), that.drag.el.clientHeight);
    that.drag.ctx1.lineTo(0, that.drag.el.clientHeight);
    that.drag.ctx1.lineTo(0, 0);
    that.drag.ctx1.closePath();
    // Clip to the current path
    that.drag.ctx1.clip();
    let param = resizeBg(that.drag.pat1);    
    that.drag.ctx1.drawImage(that.drag.pat1, param.x, param.y, param.width, param.height);
    that.drag.ctx1.restore();

    that.drag.ctx1.save();
    that.drag.ctx1.beginPath();
    that.drag.ctx1.moveTo(((that.drag.el.clientWidth / 2) + (that.drag.el.clientWidth / 2) / 2.92), 0);
    that.drag.ctx1.lineTo(that.drag.el.clientWidth, 0);
    that.drag.ctx1.lineTo(that.drag.el.clientWidth, that.drag.el.clientHeight);
    that.drag.ctx1.lineTo(((that.drag.el.clientWidth / 2) - (that.drag.el.clientWidth / 2) / 2.92), that.drag.el.clientHeight);
    that.drag.ctx1.lineTo(((that.drag.el.clientWidth / 2) + (that.drag.el.clientWidth / 2) / 2.92), 0);
    that.drag.ctx1.closePath();
    // Clip to the current path
    that.drag.ctx1.clip();
    let param2 = resizeBg(that.drag.pat2);
    that.drag.ctx1.drawImage(that.drag.pat2, param2.x, param2.y, param2.width, param2.height);
    that.drag.ctx1.restore();

    that.drag.ctx2.save();
    that.drag.ctx2.beginPath();
    that.drag.ctx2.moveTo(0, 0);
    that.drag.ctx2.lineTo(((that.drag.el.clientWidth / 2) + (that.drag.el.clientWidth / 2) / 2.92), 0);
    that.drag.ctx2.lineTo(((that.drag.el.clientWidth / 2) - (that.drag.el.clientWidth / 2) / 2.92), that.drag.el.clientHeight);
    that.drag.ctx2.lineTo(0, that.drag.el.clientHeight);
    that.drag.ctx2.lineTo(0, 0);
    that.drag.ctx2.closePath();
    // Clip to the current path
    that.drag.ctx2.clip();
    let param3 = resizeBg(that.drag.img1);
    that.drag.ctx2.drawImage(that.drag.img1, param2.x, param2.y, param2.width, param2.height);    
    that.drag.ctx2.restore();

    that.drag.ctx3.save();
    that.drag.ctx3.beginPath();
    that.drag.ctx3.moveTo(((that.drag.el.clientWidth / 2) + (that.drag.el.clientWidth / 2) / 2.92), 0);
    that.drag.ctx3.lineTo(that.drag.el.clientWidth, 0);
    that.drag.ctx3.lineTo(that.drag.el.clientWidth, that.drag.el.clientHeight);
    that.drag.ctx3.lineTo(((that.drag.el.clientWidth / 2) - (that.drag.el.clientWidth / 2) / 2.92), that.drag.el.clientHeight);
    that.drag.ctx3.lineTo(((that.drag.el.clientWidth / 2) + (that.drag.el.clientWidth / 2) / 2.92), 0);
    that.drag.ctx3.closePath();
    // Clip to the current path
    that.drag.ctx3.clip();
    let param4 = resizeBg(that.drag.img2);
    that.drag.ctx3.drawImage(that.drag.img2, param2.x, param2.y, param2.width, param2.height);
    that.drag.ctx3.restore();

  }



  this.eventsInit = function () {    
    window.addEventListener('scroll', function (e) {
      let scrollTop = window.pageYOffset;
      header(e);
      if (scrollTop > (window.innerHeight)) {
        if (that.play) {
          app.homepage.hero.hero.ticker.stop();
          //app.homepage.hero.resours.source.pause();
          that.play = false;
        }
      } else {
        if (!that.play) {
          app.homepage.hero.hero.ticker.start();
          //app.homepage.hero.resours.source.play();
          that.play = true;
        }
      }
    });

    document.querySelector('[data-action="homepage-drag"]').addEventListener('mousedown', function (e) {
      if(app.touch)return;
      if (app.homepage.drag.show) {
        that.drag.dragMove = true;
        that.drag.dragx = e.clientX;
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut })
        TweenMax.to(document.querySelector('.homepage__drag_dots'), 0.8, { scaleX: 1, ease: Power4.easeOut });
        TweenMax.to('.cursor i.circle', 0.6, { backgroundColor: '#ee412a' });
      }
    });
    document.querySelector('[data-action="homepage-drag"]').addEventListener('mouseup', function (e) {
      if(app.touch)return;
      if (!that.drag.dragDone) {
        that.drag.dragMove = false;
        that.drag.dragx = 0;
        TweenMax.to('[data-action="homepage-drag"]', 0.5, { x: 0, ease: Power2.easeOut });
        TweenMax.to([document.querySelector('canvas.leisure'), document.querySelector('canvas.business')], 0.5, { x: 0, ease: Power2.easeOut });
      }
    });
    document.querySelector('.homepage__drag').addEventListener('mousemove', that.drag.dragControl);

    let dotsTween;
    document.querySelector('[data-action="homepage-drag"]').addEventListener('touchstart', function (e) {
      if (app.homepage.drag.show) {
        that.drag.dragMove = true;
        that.drag.dragx = e.touches[0].clientX;
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut })
        TweenMax.to(document.querySelector('.homepage__drag_dots'), 0.8, { scaleX: 1, ease: Power4.easeOut });
        TweenMax.to('.cursor i.circle', 0.6, { backgroundColor: '#ee412a' });        
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
        dotsTween = TweenMax.to(document.querySelector('.homepage__drag_dots'), 0.8, { scaleX: 1, ease: Power4.easeOut });
        TweenMax.to('.cursor i.circle', 0.6, { backgroundColor: '#ee412a' });
        TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut })
        
      }
    });
    document.querySelector('[data-action="homepage-drag"]').addEventListener('touchend', function (e) {
      if (!that.drag.dragDone) {
        that.drag.dragMove = false;
        that.drag.dragx = 0;
        TweenMax.to('[data-action="homepage-drag"]', 0.5, { x: 0, ease: Power2.easeOut });
        TweenMax.to([document.querySelector('canvas.leisure'), document.querySelector('canvas.business')], 0.5, { x: 0, ease: Power2.easeOut });
        that.drag.dragMove = false;
        that.drag.dragx = 0;
        TweenMax.to('[data-action="homepage-drag"]', 0.5, { x: 0, ease: Power2.easeOut });
        TweenMax.to([document.querySelector('canvas.leisure'), document.querySelector('canvas.business')], 0.5, { x: 0, ease: Power2.easeOut });        
      }
      dotsTween.kill();
      TweenMax.to(this.querySelector('i'), 0.6, { scale: 0, ease: Power4.easeIn });
      TweenMax.to(document.querySelector('.homepage__drag_dots'), 0.4, { scaleX: 0, ease: Power3.easeIn });
      TweenMax.to('.cursor span', 0.6, { scale: 1, ease: Power4.easeIn })
      TweenMax.to('.cursor i.circle', 0.6, { backgroundColor: '#fff' });
    });
    document.querySelector('.homepage__drag').addEventListener('touchmove', that.drag.dragControl);



    document.querySelector('[data-action="homepage-hero-play"]').addEventListener('mouseenter', function (e) {
      TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
      TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#fff', ease: Power3.easeOut });
      TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
    });
    document.querySelector('[data-action="homepage-hero-play"]').addEventListener('mouseleave', function (e) {
      TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeIn });
      TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#ee412a', ease: Power3.easeIn });
      if (!app.homepage.heroVideo.active) TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeIn });
    });

    document.querySelector('[data-action="homepage-close-video"]').addEventListener('mouseenter', function (e) {
      TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
      TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#fff', ease: Power3.easeOut });
      TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
      TweenMax.to('.cursor i.circle', 0.5, { scale: 1 })
      TweenMax.to('.cursor i.pause', 0.5, { scale: 0 })
      TweenMax.to('.cursor i.play', 0.5, { scale: 0 })
    });
    document.querySelector('[data-action="homepage-close-video"]').addEventListener('mouseleave', function (e) {
      TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeIn });
      TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#ee412a', ease: Power3.easeIn });
      if (app.homepage.heroVideo.active) {
        TweenMax.to('.cursor span', 0.5, { scale: 1.4, ease: Power3.easeIn });
        TweenMax.to('.cursor i.circle', 0.5, { scale: 0, ease: Power3.easeIn })
        if (app.homepage.heroVideo.video.paused) {
          TweenMax.to('.cursor i.play', 0.5, { scale: 1, ease: Power3.easeIn })
        } else {
          TweenMax.to('.cursor i.pause', 0.5, { scale: 1, ease: Power3.easeIn })
        }
      }
    });

    document.querySelector('[data-action="homepage-drag"]').addEventListener('mouseenter', function (e) {
      if(app.touch)return;      
      if (app.homepage.drag.show) {
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
        TweenMax.to(document.querySelector('.homepage__drag_dots'), 0.8, { scaleX: 1, ease: Power4.easeOut });
        TweenMax.to('.cursor i.circle', 0.6, { backgroundColor: '#ee412a' });
        TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut })
      }
    });
    document.querySelector('[data-action="homepage-drag"]').addEventListener('mouseleave', function (e) {
      if(app.touch)return;      
      if (!that.drag.dragDone) {
        that.drag.dragMove = false;
        that.drag.dragx = 0;
        TweenMax.to('[data-action="homepage-drag"]', 0.5, { x: 0, ease: Power2.easeOut });
        TweenMax.to([document.querySelector('canvas.leisure'), document.querySelector('canvas.business')], 0.5, { x: 0, ease: Power2.easeOut });
      }
      TweenMax.to(this.querySelector('i'), 0.6, { scale: 0, ease: Power4.easeIn });
      TweenMax.to(document.querySelector('.homepage__drag_dots'), 0.4, { scaleX: 0, ease: Power3.easeIn });
      TweenMax.to('.cursor span', 0.6, { scale: 1, ease: Power4.easeIn })
      TweenMax.to('.cursor i.circle', 0.6, { backgroundColor: '#fff' });
    });
    window.addEventListener('resize', function(){
      setTimeout(function(){
        that.resizeHomepage();
      }, 100);
    });
    window.addEventListener('orientationchange', function(e){
      setTimeout(function(){
        that.resizeHomepage();
      }, 100);
    });

    document.querySelectorAll('[data-action="learn-more"]').forEach(function(el, i){
      el.addEventListener('mouseenter', function (e) {        
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
        TweenMax.to('.cursor i.circle', 0.6, { backgroundColor: '#fff' });
      });
      el.addEventListener('mouseleave', function (e) {
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeIn });
        TweenMax.to('.cursor i.circle', 0.6, { backgroundColor: '#ee412a' });
      });
    });    
    document.querySelectorAll('.slider-button-prev, .slider-button-next').forEach(function (el, i) {
      el.addEventListener('mouseenter', function (e) {
        if (this.classList.contains('swiper-button-disabled')) return;
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
        if (this.closest('.homepage__services')) return;
        TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#fff', ease: Power3.easeOut });
      });
      el.addEventListener('mouseleave', function (e) {
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeIn });
        TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeIn });
        if (this.closest('.homepage__services')) return;
        TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#ee412a', ease: Power3.easeIn });
      });
    });

  }

  // Start Buttons render
  function buttonsRender() {
    document.querySelectorAll('.button-circle').forEach(function (el, i) {
      var text = el.getAttribute('data-text').replace(' ', '&nbsp;');
      var textBlock = document.createElement('div');
      var top = document.createElement('div');
      var bot = document.createElement('div');
      textBlock.className = 'text';
      top.className = 'top';
      bot.className = 'bot';
      top.innerHTML = text;
      bot.innerHTML = text;
      var splitTop = new SplitText(top, { type: "chars" });
      var splitBot = new SplitText(bot, { type: "chars" });
      textBlock.appendChild(top);
      textBlock.appendChild(bot);
      el.appendChild(textBlock);
      var deg = 120 / splitTop.chars.length, origin = 0, radius = 75;
      for (var i in splitTop.chars) {
        splitTop.chars[i].style.height = radius + 'px';
        splitTop.chars[i].style.transform = 'rotate(' + (origin) + 'deg)';
        origin += deg;
      }
      origin = 180;
      for (var i in splitBot.chars) {
        splitBot.chars[i].style.height = radius + 'px';
        splitBot.chars[i].style.transform = 'rotate(' + (origin) + 'deg)';
        origin += deg;
      }
      if (el.getAttribute('data-hover')) {
        var hoverText = el.getAttribute('data-hover').replace(' ', '&nbsp;');
        var textBlock = document.createElement('div');
        var top = document.createElement('div');
        var bot = document.createElement('div');
        textBlock.className = 'hover';
        top.className = 'top';
        bot.className = 'bot';
        top.innerHTML = hoverText;
        bot.innerHTML = hoverText;
        var splitTop = new SplitText(top, { type: "chars" });
        var splitBot = new SplitText(bot, { type: "chars" });
        textBlock.appendChild(top);
        textBlock.appendChild(bot);
        el.appendChild(textBlock);
        var deg = 100 / splitTop.chars.length, origin = 0, radius = 75;
        for (var i in splitTop.chars) {
          splitTop.chars[i].style.height = radius + 'px';
          splitTop.chars[i].style.transform = 'rotate(' + (origin) + 'deg)';
          origin += deg;
        }
        origin = 180;
        for (var i in splitBot.chars) {
          splitBot.chars[i].style.height = radius + 'px';
          splitBot.chars[i].style.transform = 'rotate(' + (origin) + 'deg)';
          origin += deg;
        }
      }
      el.appendChild(document.createElement('i'));
    });
  }
  // End Buttons render

  this.cursor = {
    init: function () {
      TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });

      document.body.addEventListener('mousemove', function (e) {
        TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
      });
      document.querySelector('.homepage__hero').addEventListener('mouseenter', function (e) {
        TweenMax.to('.cursor', 0.5, { borderColor: '#ee412a' });
        TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#fff' });
      });
      document.querySelector('.homepage__description').addEventListener('mouseenter', function (e) {
        TweenMax.to('.cursor', 0.5, { borderColor: '#ee412a' });
        TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#ee412a' });
      });
      document.querySelector('.homepage__drag').addEventListener('mouseenter', function (e) {
        TweenMax.to('.cursor', 0.5, { borderColor: '#ee412a' });
        TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#fff' });
      });
      document.querySelector('.homepage__feedback').addEventListener('mouseenter', function (e) {
        TweenMax.to('.cursor', 0.5, { borderColor: '#ee412a' });
        TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#ee412a' });
      });

    }
  }


  // Start Tabs render
  this.tabs = {
    active: false,
    diskTextAnim: null,
    show: false,
    init: function () {
      let that = this;
      this.render();
      document.querySelectorAll('.homepage__tabs_list span').forEach(function (el, i) {
        el.addEventListener('click', function (e) {
          if (that.show) that.onActive(e);
        });
        el.addEventListener('mouseenter', function (e) {
          if (that.show) that.onHover(e);
        });
        el.addEventListener('mouseleave', function (e) {
          if (that.show) that.onHover(e);
        });
      });
      document.querySelectorAll('.homepage__tabs_content h3 i').forEach(function (el, i) {
        el.addEventListener('click', function (e) {
          that.onClose(e);
        });
      });

    },
    onHover: function (e) {
      if (!this.active) {
        if (e.type == 'mouseenter') {
          e.target.classList.add('active');
          TweenMax.to(document.querySelectorAll('.homepage__tabs_list span:not(.active)'), 1, { opacity: 0.1, color: '#2f2f2f', ease: Power2.easeOut });
        } else {
          TweenMax.to(document.querySelectorAll('.homepage__tabs_list span'), 0.8, { opacity: 1, color: '#ee412a', ease: Power2.easeOut });
          e.target.classList.remove('active');
        }
      }
    },
    onActive: function (e) {
      this.active = true;
      e.target.classList.add('active');
      let that = this;
      let target = e.target.getAttribute('data-target');
      TweenMax.to('.homepage__tabs_disk .disk--arrow-1', 1.5, { rotation: 360, ease: Power3.easeInOut });
      TweenMax.to('.homepage__tabs_disk .disk--arrow-2', 1.5, { rotation: 360, ease: Power3.easeInOut });
      TweenMax.to('.homepage__tabs_disk .disk--text', 1.5, {
        color: '#d7ebe6', onComplete: function () {
          that.diskTextAnim.pause();
          TweenMax.set('.homepage__tabs_disk .disk--arrow-1, .homepage__tabs_disk .disk--arrow-2', { clearProps: 'all' });
        }
      });
      let tl = new TimelineMax();
      tl.staggerTo(document.querySelectorAll('.homepage__tabs_list span:not(.active)'), 0.8, { opacity: 0, ease: Power2.easeOut }, 0.1)
        .to(document.querySelector('.homepage__tabs_list span.active'), 0.7, { opacity: 0, ease: Power2.easeOut }, '-=0.8')
        .set('.homepage__tabs_content [data-tab="' + target + '"]', { display: 'block', zIndex: 2, position: 'relative' }, '-=0.5')
        .fromTo('.homepage__tabs_content [data-tab="' + target + '"] h3 div', 0.8, { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, ease: Power2.easeOut })
        .fromTo('.homepage__tabs_content [data-tab="' + target + '"] p', 1.5, { opacity: 0 }, { opacity: 1, ease: Power2.easeOut }, '-=0.3')
        .set('.homepage__tabs_list', { visibility: 'hidden' })
    },
    onClose: function (e) {
      let that = this;
      TweenMax.to('.homepage__tabs_disk .disk--text', 1.5, {
        color: '#9BCAD6', onComplete: function () {
          TweenMax.to('.homepage__tabs_disk .disk--arrow-1', 90, { rotation: 360, repeat: -1, ease: Power0.easeNone });
          TweenMax.to('.homepage__tabs_disk .disk--arrow-2', 15, { rotation: 360, repeat: -1, ease: Power0.easeNone });
          that.diskTextAnim.play();
          document.querySelector('.homepage__tabs_list .active').classList.remove('active');
          that.active = false;
        }
      });
      let tl = new TimelineMax();
      tl.to(e.target.closest('.title'), 0.8, { rotationX: 90, opacity: 0, ease: Power2.easeOut }, 'start')
        .to(e.target.closest('.tab--body').querySelector('p'), 1, { opacity: 0, ease: Power2.easeOut }, 'start')
        .set(e.target.closest('.tab--body'), { clearProps: 'all' })
        .set(document.querySelectorAll('.homepage__tabs_list span'), { color: '#ee412a' })
        .set('.homepage__tabs_list', { visibility: 'visible' })
        .staggerTo(document.querySelectorAll('.homepage__tabs_list span'), 2, { opacity: 1 }, 0.1)
    },
    render: function () {
      let el = document.querySelector('.homepage__tabs_disk .disk--text');
      var text = '';
      for (var i in el.innerText) {
        text += el.innerText[i].replace(' ', '&nbsp;');
        if (i == el.innerText.length - 1) text += '&nbsp;+&nbsp;';
      }
      var textBlock = document.createElement('div');
      textBlock.className = 'text';
      textBlock.innerHTML = text;
      var split = new SplitText(textBlock, { type: "chars", reduceWhiteSpace: false });
      el.innerHTML = '';
      el.appendChild(textBlock);
      var deg = 360 / split.chars.length, origin = 0, radius = 320;
      for (var i in split.chars) {
        split.chars[i].style.height = radius + 'px';
        split.chars[i].style.transform = 'rotate(' + (origin) + 'deg)';
        origin += deg;
      }
      this.diskTextAnim = TweenMax.to('.homepage__tabs_disk .disk--text', 60, { rotation: 360, repeat: -1, ease: Power0.easeNone });
      TweenMax.to('.homepage__tabs_disk .disk--arrow-1', 90, { rotation: 360, repeat: -1, ease: Power0.easeNone });
      TweenMax.to('.homepage__tabs_disk .disk--arrow-2', 15, { rotation: 360, repeat: -1, ease: Power0.easeNone });

      document.querySelectorAll('.homepage__tabs_content .tab--body h3 div').forEach(function (el, i) {
        let split = new SplitText(el, { type: "words" });
        let plus = document.createElement('i');
        plus.innerText = '+';
        split.words[split.words.length - 1].appendChild(plus);
      });
      TweenMax.set(document.querySelectorAll('.homepage__tabs_list span'), { opacity: 0 })
    }
  }
  // End Tabs render


  function aosInit() {
    app.aos = AOS.init({
      offset: 100,
      once: true      
    });
    
    TweenMax.set(document.querySelectorAll('.homepage__services canvas'), {scale: 1.5});
        
    //TweenMax.set('.homepage__drag canvas.leisure, .homepage__drag canvas.business', {scale: 1.5});
    document.addEventListener('aos:in', function (e) {
      if (e.detail.classList.contains('homepage__drag')) {
        new TimelineMax().to(['.homepage__drag .blind-left', '.homepage__drag .blind-right'], 0.8, { scaleX: 0, ease: Power2.easeIn })
          .staggerFrom(document.querySelectorAll('.homepage__drag canvas.leisure, .homepage__drag canvas.business'), 1.6, { scale: 1.4 }, 0.1, '-=0.8')
          .staggerFrom(document.querySelectorAll('.homepage__drag h2 a, .homepage__drag h2 span'), 1.5, { rotationX: 90, opacity: 0, ease: Power3.easeOut }, 0.25, '-=0.8')
          .to('.homepage__drag h2.or span', 0.8, { scale: 0, opacity: 0, transformOrigin: 'center', ease: Power3.easeOut }, '+=0.8')
          .from('.homepage__drag .button-circle', 0.8, { scale: 1.4, opacity: 0, ease: Power3.easeOut }, '-=0.6')
          .add(function () {
            app.homepage.drag.show = true;
          });
      }
      if (e.detail.classList.contains('homepage__feedback_slider') && e.detail.classList.contains('leisure')) {
        //root.slidersResize.leisureSwiper();
        const slider = root.loader.leisureSwiper;
        let scale = slider.images[0].scale;
        let width = slider.containers[0].width;
        new TimelineMax().set(e.detail, { visibility: 'visible' })
          .from(slider.rootContainer, 1.4, {x: width, alpha: 0, ease: Power2.easeOut }, 'start')
          .from([slider.images[0].skew, slider.masks[0].skew], 1.4, {x: -0.35, ease: Power2.easeOut}, 'start')
          .from([slider.images[0].scale], 1.6, {x: (scale.x * 1.5), y: (scale.y * 1.5), ease: Power2.easeOut}, 'start')
          .fromTo('.homepage__feedback_slider.leisure h2 span', 1, { opacity: 0, rotationX: 90 }, { opacity: 1, rotationX: 0, ease: Power2.easeOut }, '-=0.7')
          .fromTo(e.detail.querySelector('.swiper-slide-active .slide--text'), 1, { opacity: 0, y: '50%' }, { opacity: 1, y: '0%', ease: Power2.easeOut }, '-=0.6')
          .fromTo('.homepage__feedback_slider.leisure .slider-control', 1, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, ease: Power2.easeOut }, '-=0.6')
      }
      if (e.detail.classList.contains('homepage__feedback_slider') && e.detail.classList.contains('business')) {
        //root.slidersResize.businessSwiper();
        const slider = root.loader.businessSwiper;
        let scale = slider.images[0].scale;
        let width = slider.containers[0].width;
        new TimelineMax().set(e.detail, { visibility: 'visible' })
          .from(slider.containers[0], 1.4, {x: -width, alpha: 0, ease: Power2.easeOut }, 'start')
          .from([slider.images[0].skew, slider.masks[0].skew], 1.4, {x: 0.35, ease: Power2.easeOut}, 'start')
          .from([slider.images[0].scale], 1.6, {x: (scale.x * 1.5), y: (scale.y * 1.5), ease: Power2.easeOut}, 'start')          
          .fromTo('.homepage__feedback_slider.business h2 span', 1, { opacity: 0, rotationX: 90 }, { opacity: 1, rotationX: 0, ease: Power2.easeOut }, '-=0.7')
          .fromTo(e.detail.querySelector('.swiper-slide-active .slide--text'), 1, { opacity: 0, y: '50%' }, { opacity: 1, y: '0%', ease: Power2.easeOut }, '-=0.6')
          .fromTo('.homepage__feedback_slider.business .slider-control', 1, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, ease: Power2.easeOut }, '-=0.6')
          .fromTo('.homepage__feedback .button-circle', 1, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power2.easeOut }, '-=1');          
      }
      if (e.detail.classList.contains('homepage__services')) {        
        new TimelineMax()
          .to(document.querySelectorAll('.homepage__services canvas'), 1.6, {scale: 1})
          .staggerFrom(e.detail.querySelectorAll('h2'), 1, { opacity: 0, scale: 1.3, ease: Power2.easeOut }, 0.3, '-=1')
          .staggerFrom(e.detail.querySelectorAll('.swiper-slide-active h3 a'), 1.5, { rotationX: 90, opacity: 0, ease: Power3.easeOut }, 0.3, '-=0.8')
          .staggerFrom(e.detail.querySelectorAll('.slider-control'), 1, { opacity: 0, scale: 1.4, ease: Power2.easeOut }, 0.3, '-=1')
      }
      if (e.detail.classList.contains('homepage__tabs')) {
        new TimelineMax().staggerTo(document.querySelectorAll('.homepage__tabs_list span'), 2, { opacity: 1 }, 0.1)
          .add(function () {
            app.homepage.tabs.show = true;
          });
      }
      if (e.detail.classList.contains('leisure') && e.detail.closest('.homepage__insta')) {
        TweenMax.fromTo(e.detail.querySelectorAll('h2 span'), 1.5, { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, ease: Power3.easeOut });
      }
      if (e.detail.classList.contains('business') && e.detail.closest('.homepage__insta')) {
        TweenMax.fromTo(e.detail.querySelectorAll('h2 span'), 1.5, { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, ease: Power3.easeOut });
      }
      if (e.detail.classList.contains('expert__form')) {
        TweenMax.fromTo(e.detail.querySelectorAll('h2 span'), 1.5, { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, ease: Power3.easeOut });
      }

    });
  }

}


/* ==============================================================
                          CATALOG INIT
   ============================================================== */
const _catalog = function () {
  const root = this;  
  this.eventsInit = function () {
    window.addEventListener('scroll', function (e) {
      header(e);
    });
    window.addEventListener('resize', function (e) {
      heightUpdate();
    });
    window.addEventListener('orientationchange', function(e){
      setTimeout(function(){
        heightUpdate();
      }, 100);
    });
    document.querySelectorAll('[data-action="submenu"]').forEach(function (el, i) {
      el.addEventListener('mouseenter', header);
      el.addEventListener('mouseleave', header);
    });
    document.querySelector('.catalog__filter .mobile--title').addEventListener('click', function(e){
      let target = e.currentTarget;
      let active = target.classList.contains('active');      
      if(active){
        TweenMax.to('.catalog__filter_nav', 0.3, {height: 0, onComplete: function(){
          TweenMax.set('.catalog__filter_nav', {clearProps: 'all'});
          target.classList.remove('active');
          document.querySelector('.catalog__filter_nav').classList.remove('show');
        }});
        TweenMax.to(document.querySelectorAll('.catalog__filter_nav li i'), 0.3, {rotation: 0, scale: 1})
        if(document.querySelectorAll('.catalog__filter_list .active').length){
          TweenMax.to(document.querySelector('.catalog__filter_list .active'), 0.3, {height: 0})
        }        
      }else{
        TweenMax.set('.catalog__filter_nav', {display: 'flex'});
        TweenMax.from('.catalog__filter_nav', 0.3, {height: 0, onComplete: function(){
          target.classList.add('active');
        }});
      }
    });
    document.querySelectorAll('.catalog__filter_nav li').forEach(function (el, i) {
      el.addEventListener('click', function (e) {
        let target = document.querySelector('.catalog__filter_list #' + e.currentTarget.getAttribute('data-target'));
        if (document.querySelectorAll('.catalog__filter_list .active').length) {
          TweenMax.to(document.querySelectorAll('.catalog__filter .catalog__filter_nav li i '), 0.3, {rotation: 90, scale: 1})
          let current = document.querySelector('.catalog__filter_list .active').id == e.currentTarget.getAttribute('data-target');          
          if(app.mode == 'descktop'){
            document.querySelector('.catalog__filter .mobile--title').classList.remove('active');            
            TweenMax.set('.catalog__filter_nav', {clearProps: 'all'});
            document.querySelector('.catalog__filter_nav').classList.remove('show');
          }
          TweenMax.to(document.querySelector('.catalog__filter_list .active'), 0.3, {
            height: 0, opacity: 0, onComplete: function () {
              TweenMax.set(document.querySelector('.catalog__filter_list .active'), { clearProps: "all" });
              document.querySelector('.catalog__filter_list .active').classList.remove('active');              
              if (!current) {
                TweenMax.set(target, {display: 'block' });
                TweenMax.to(el.querySelector('i'), 0.3, {rotation: -45, scale: 1.2})
                TweenMax.from(target, 0.3, {
                  height: 0, opacity: 0, onComplete: function () {
                    target.classList.add('active');
                    if(app.mode == 'descktop'){
                      document.querySelector('.catalog__filter_nav').classList.add('show');
                    }                    
                    document.querySelector('.catalog__filter .mobile--title').classList.add('active');
                  }
                });
              }
            }
          });
        } else {          
          TweenMax.to(el.querySelector('i'), 0.3, {rotation: -45, scale: 1.2})
          TweenMax.set(target, { display: 'block' });
          TweenMax.from(target, 0.3, {
            height: 0, opacity: 0, onComplete: function () {
              target.classList.add('active');
                if(app.mode == 'descktop'){
                  document.querySelector('.catalog__filter_nav').classList.add('show');
                }              
              document.querySelector('.catalog__filter .mobile--title').classList.add('active');
            }
          });
        }




      });
    });
  };

  this.loader = {
    init: function () {
      let that = this;
      //app.globalEvents();

      document.querySelectorAll('img[data-src]').forEach(function (el, i) {
        let src = el.getAttribute('data-src');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          el.src = src;
        }
      });

      root.eventsInit();
    }
  }
  // /.Loader

  this.loader.init();
};


/* ==============================================================
                          LEISURE INIT
   ============================================================== */
const _leisure = function () {
  const root = this;  

  this.loader = {
    progress: 0,
    resources: 1,
    resourcesDone: 0,
    loaderReady: false,
    scripts:
      [
        'pixi',
        'splitText',
        'swiper',
        'aos',
        //'pixiFilters'
      ],    
    resourcesDone: 0,
    init: function () {
      let that = this;

      window.scrollTo(0, 0);

      TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
      TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
      TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
      
      this.resources += document.querySelectorAll('img[data-src]').length        
        + this.scripts.length;

      document.querySelectorAll('img[data-src]').forEach(function (el, i) {
        let src = el.getAttribute('data-src');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          el.src = src;
          that.resourcesDone++;
          that.loading();
        }
      });

      this.scripts.forEach(function (n) {        
        let src = './js/lib/' + app.resours[n];
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = function () {
          if (n == 'pixi') {
            filters();
          }
          that.resourcesDone++;
          that.loading();
        }
      });

      function filters() {
        let src = './js/lib/pixi-filters.js';
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = function () {
          that.resourcesDone++;
          that.loading();
        }
      }      
    },
    loading: function () {
      const that = this;
      if (this.resources == this.resourcesDone) {        
        let tl = new TimelineMax();
        tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
        .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
        .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
        .add(function(){          
          root.hero.render();
          root.tabs.init();
          root.eventsInit();
          root.sliders.init();
          root.trust.init();
          root.cursor.init();
          app.globalEvents();
        })
        .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
        .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
        .add(function(){
          that.loaded();
        });       
        
      }
    },
    loaded: function () {
      const that = this;      
      new TimelineMax()      
      .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})      
      .add(function(){
        root.sliders.resize();
        root.hero.startTimer();
        document.querySelector('.loader').remove();
        TweenMax.set('body', { overflow: 'auto' });
        root.hero.resize();        
        root.trust.resize();
        root.aosInit();
        root.sliders.resize();
      })
      .staggerFrom(document.querySelectorAll('.leisure__hero h1 span'), 1, { rotationX: 90, opacity: 0, ease: Power2.easeOut }, 0.1, '+=0.3')
      .from('header, .leisure__hero .breadcrumb', 0.8, { opacity: 0 }, '-=0.5')
      .from('.hero--scroll, .leisure__hero_pagination', 0.8, { opacity: 0 }, '-=0.4')
      .to(root.hero.heroFilter, 0.8, { innerRadius: 200 }, '-=0.4')      
    }
  };

  this.hero = {
    slides: document.querySelectorAll('.leisure__hero_backgrounds img').length,
    slide: 1,
    timer: null,
    transition: false,
    heroBgCover: function (el) {
      let ratio = el.width / el.height;
      if (document.body.clientWidth / window.innerHeight > ratio) {        
        return {          
          width: window.innerWidth,
          height: window.innerWidth / ratio,
          x: 0,
          y: (window.innerHeight - window.innerWidth / ratio) / 2
        }
      } else {        
        return {
          width: window.innerHeight * ratio,
          height: window.innerHeight,
          x: (window.innerWidth - (window.innerHeight * ratio)) / 2,
          y: 0
        }
      }
    },
    render: function () {
      let that = this;
      that.el = document.querySelector('.leisure__hero');
      that.hero = new PIXI.Application({
        width: that.el.clientWidth,
        height: that.el.clientHeight,
        transparent: true,
        //forceCanvas: true
      });
      that.el.appendChild(that.hero.view);
      that.container = new PIXI.Container();
      that.hero.stage.addChild(that.container);
      that.hero.stage.interactive = true;
      const loader = PIXI.Loader.shared;
      document.querySelectorAll('.leisure__hero_backgrounds img').forEach(function (el, i) {
        loader.add('slide' + (i + 1), el.getAttribute('data-src'));
      });

      loader.load(function (loader, resources) {
        for (i in resources) {
          that[i] = new PIXI.Sprite(resources[i].texture);
          that.container.addChild(that[i]);
          let params = that.heroBgCover(resources[i].data);
          that[i].width = params.width;
          that[i].height = params.height;
          that[i].x = params.x;
          that[i].y = params.y;
          that[i].alpha = 0;
        }
        that.slide1.alpha = 1;
        TweenMax.set('.leisure__hero h1 .switch[data-slide="1"]', { display: 'block' });
        document.querySelector('.leisure__hero_pagination .pagination--slide .current').innerHTML = that.slide < 10 ? '0' + that.slide : that.slide;
        document.querySelector('.leisure__hero_pagination .pagination--slide .all').innerHTML = that.slides < 10 ? '0' + that.slides : that.slides;
        that.heroFilter = new PIXI.filters.ZoomBlurFilter();
        that.heroFilter.strength = 0.1;
        that.heroFilter.center = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        }
        that.heroFilter.innerRadius = 0;
        that.container.filters = [that.heroFilter];        
        that.el.addEventListener('mousemove', onPointerMove);
        that.el.addEventListener('click', that.onPointerClick);

        function onPointerMove(e) {
          TweenMax.to(that.heroFilter.center, 1, { x: e.clientX, y: e.clientY });
        };
        
      });
    },
     onPointerClick: function(e){
      const that = app.leisure.hero;
      if (that.transition) return;
      clearTimeout(that.timer);
      that.transition = true;
      let r = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
      let current = that['slide' + that.slide];
      let next;
      let pS, pE;
      if (that.slide < that.slides) {
        next = that['slide' + (that.slide + 1)];
        pS = ((100 / that.slides) * (that.slide + 1)) - ((100 / that.slides) / 2);
        pE = ((100 / that.slides) * (that.slide + 1));
      } else {
        next = that['slide1'];
        pS = (100 - ((100 / that.slides)));
        pE = 100 / that.slides;
      }
      new TimelineMax().to(that.heroFilter, 1.3, { innerRadius: r, ease: Power4.easeIn })
        .set(that.heroFilter, { innerRadius: 0, strength: 0 })
        .to('.leisure__hero_pagination .pagination--bar i', 1, { width: pS + '%', ease: Power3.easeIn }, 'transition +=1')
        .to(that.heroFilter, 1, { strength: 2, ease: Power3.easeIn }, 'transition +=1')
        .to(current, 1, { alpha: 0, ease: Power3.easeIn }, 'transition +=1')
        .to(next, 1, { alpha: 1, ease: Power3.easeIn }, 'transition +=1')
        .fromTo('.leisure__hero h1 .switch[data-slide="' + that.slide + '"]', 1, { rotationX: 0, opacity: 1, y: 0 }, { rotationX: 90, opacity: 0, y: 30, ease: Power3.easeIn }, 'transition +=1')
        .set('.leisure__hero h1 .switch[data-slide="' + that.slide + '"]', { display: 'none' })
        .set('.leisure__hero h1 .switch[data-slide="' + (that.slide < that.slides ? (that.slide + 1) : 1) + '"]', { display: 'block' })
        .add(function () {
          let slide;
          if (that.slide < that.slides) {
            slide = (that.slide + 1) < 10 ? '0' + (that.slide + 1) : (that.slide + 1)
          } else {
            slide = '01';
          }
          document.querySelector('.leisure__hero_pagination .pagination--slide .current').innerHTML = slide;
        })
        .to('.leisure__hero_pagination .pagination--bar i', 1, { width: pE + '%', ease: Power3.easeOut }, 'end')
        .fromTo('.leisure__hero h1 .switch[data-slide="' + (that.slide < that.slides ? (that.slide + 1) : 1) + '"]', 1, { rotationX: -90, opacity: 0, y: 30 }, { rotationX: 0, opacity: 1, y: 0, ease: Power3.easeOut }, 'end')
        .to(that.heroFilter, 1, { strength: 0.1, ease: Power3.easeOut }, 'end')
        .to(that.heroFilter, 1, { innerRadius: 200, ease: Power3.easeOut }, 'end')
        .add(function () {
          if (that.slide < that.slides) {
            that.slide++;
          } else {
            that.slide = 1;
          }
          that.transition = false;
          that.startTimer();

        })
    },
    startTimer: function() {
      const that = this;
      app.leisure.hero.timer = setTimeout(function () {
        that.onPointerClick();
      }, 5000);
    },
    resize: function(){
      this.hero.renderer.resize(this.el.clientWidth, window.innerHeight);
      for (var i=0; i<this.slides; i++) {
        let n = i+1;
        let slide = this['slide'+n];        
        let params = this.heroBgCover(slide._texture);
        slide.width = params.width;
        slide.height = params.height;
        slide.x = params.x;
        slide.y = params.y;        
      }
    }
  }

  this.tabs = {
    active: false,
    diskTextAnim: null,
    show: false,
    slides: document.querySelectorAll('.leisure .homepage__tabs .disk--icons img[data-slide]').length,
    slide: 1,
    transition: false,
    init: function () {
      let that = this;
      this.render();
      document.querySelectorAll('.homepage__tabs_list span').forEach(function (el, i) {
        el.addEventListener('click', function (e) {
          if (that.show) that.onActive(e);
        });
        el.addEventListener('mouseenter', function (e) {
          if (that.show) that.onHover(e);
        });
        el.addEventListener('mouseleave', function (e) {
          if (that.show) that.onHover(e);
        });
      });
      document.querySelectorAll('.homepage__tabs_content h3 i').forEach(function (el, i) {
        el.addEventListener('click', function (e) {
          that.onClose(e);
        });
      });

    },
    onHover: function (e) {
      if (!this.active) {
        if (e.type == 'mouseenter') {
          e.target.classList.add('active');
          TweenMax.to(document.querySelectorAll('.homepage__tabs_list span:not(.active)'), 1, { opacity: 0.1, color: '#2f2f2f', ease: Power2.easeOut });
        } else {
          TweenMax.to(document.querySelectorAll('.homepage__tabs_list span'), 0.8, { opacity: 1, color: '#ee412a', ease: Power2.easeOut });
          e.target.classList.remove('active');
        }
      }
    },
    onActive: function (e) {

      this.active = true;
      e.target.classList.add('active');
      let that = this;
      let target = e.target.getAttribute('data-target');
      console.log(this.transition);
      if (!this.transition) {
        this.animation.pause();
      }
      TweenMax.to('.homepage__tabs_disk .disk--text', 1.5, {
        color: '#ffffff', onComplete: function () {
          that.diskTextAnim.pause();
          TweenMax.set('.homepage__tabs_disk .disk--arrow-1, .homepage__tabs_disk .disk--arrow-2', { clearProps: 'all' });
        }
      });
      let tl = new TimelineMax();
      tl.staggerTo(document.querySelectorAll('.homepage__tabs_list span:not(.active)'), 0.8, { opacity: 0, ease: Power2.easeOut }, 0.1)
        .to(document.querySelector('.homepage__tabs_list span.active'), 0.7, { opacity: 0, ease: Power2.easeOut }, '-=0.8')
        .set('.homepage__tabs_content [data-tab="' + target + '"]', { display: 'block', zIndex: 2, position: 'relative' }, '-=0.5')
        .fromTo('.homepage__tabs_content [data-tab="' + target + '"] h3 div', 0.8, { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, ease: Power2.easeOut })
        .fromTo('.homepage__tabs_content [data-tab="' + target + '"] p', 1.5, { opacity: 0 }, { opacity: 1, ease: Power2.easeOut }, '-=0.3')
        .set('.homepage__tabs_list', { visibility: 'hidden' })
    },
    onClose: function (e) {
      let that = this;
      TweenMax.to('.homepage__tabs_disk .disk--text', 1.5, {
        color: '#ffffff', onComplete: function () {
          that.diskTextAnim.play();
          document.querySelector('.homepage__tabs_list .active').classList.remove('active');
          that.active = false;
          that.animation.play();
        }
      });
      let tl = new TimelineMax();
      tl.to(e.target.closest('.title'), 0.8, { rotationX: 90, opacity: 0, ease: Power2.easeOut }, 'start')
        .to(e.target.closest('.tab--body').querySelector('p'), 1, { opacity: 0, ease: Power2.easeOut }, 'start')
        .set(e.target.closest('.tab--body'), { clearProps: 'all' })
        .set(document.querySelectorAll('.homepage__tabs_list span'), { color: '#ee412a' })
        .set('.homepage__tabs_list', { visibility: 'visible' })
        .staggerTo(document.querySelectorAll('.homepage__tabs_list span'), 2, { opacity: 1 }, 0.1)
    },
    render: function () {
      let that = this;
      let el = document.querySelector('.homepage__tabs_disk .disk--text');
      var text = '';
      for (var i in el.innerText) {
        text += el.innerText[i].replace(' ', '&nbsp;');
        if (i == el.innerText.length - 1) text += '&nbsp;+&nbsp;';
      }
      var textBlock = document.createElement('div');
      textBlock.className = 'text';
      textBlock.innerHTML = text;
      var split = new SplitText(textBlock, { type: "chars", reduceWhiteSpace: false });
      el.innerHTML = '';
      el.appendChild(textBlock);
      var deg = 360 / split.chars.length, origin = 0, radius = 320;
      for (var i in split.chars) {
        split.chars[i].style.height = radius + 'px';
        split.chars[i].style.transform = 'rotate(' + (origin) + 'deg)';
        origin += deg;
      }
      this.diskTextAnim = TweenMax.to('.homepage__tabs_disk .disk--text', 60, { rotation: 360, repeat: -1, ease: Power0.easeNone });
      document.querySelectorAll('.homepage__tabs_content .tab--body h3 div').forEach(function (el, i) {
        let split = new SplitText(el, { type: "words" });
        let plus = document.createElement('i');
        plus.innerText = '+';
        split.words[split.words.length - 1].appendChild(plus);
      });
      document.querySelector('.leisure .homepage__tabs .disk--icons img[data-slide="1"]').classList.add('current');
      this.animation = new TimelineMax({ repeat: -1 })
      this.animation.set('.leisure .homepage__tabs .disk--icons .shape', { transformOrigin: 'left', scaleX: 0, ease: Power4.easeInOut })
        .add(function () {
          that.transition = true;
        }, '+=3')
        .to('.leisure .homepage__tabs .disk--icons .shape', 0.8, { scaleX: 1, ease: Power4.easeInOut })
        .add(function () {
          document.querySelector('.leisure .homepage__tabs .disk--icons img.current').classList.remove('current');
          if (that.slide < that.slides) {
            that.slide++
          } else {
            that.slide = 1;
          }
          document.querySelector('.leisure .homepage__tabs .disk--icons img[data-slide="' + that.slide + '"]').classList.add('current');
        })
        .set('.leisure .homepage__tabs .disk--icons .shape', { transformOrigin: 'right', ease: Power4.easeInOut })
        .to('.leisure .homepage__tabs .disk--icons .shape', 0.8, { scaleX: 0, ease: Power4.easeInOut })
        .add(function () {
          that.transition = false;
          if (that.active) {
            that.animation.pause();
          }
        })
      //TweenMax.set(document.querySelectorAll('.homepage__tabs_list span'), {opacity: 0})
    }
  };

  this.sliders = {
    typesSlider: null,
    singleSlider: null,
    catalogSlider: null,
    init: function(){
      this.typesSlider = new Swiper('.tour-types .swiper-container', {
        // Optional parameters
        //init: false,
        speed: 800,        
        followFinger: false,
        slidesPerView: 3,        
        //simulateTouch: false,        
        // If we need pagination
        pagination: {
          el: '.slider-pagination',
          type: 'fraction'
        },
        // Navigation arrows
        navigation: {
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        },
        breakpoints: {
          992: {
            slidesPerView: 1
          }
        }
      });
      this.singleSlider = new Swiper('.single-slider .swiper-container', {
        // Optional parameters
        init: false,
        speed: 1000,
        followFinger: false,
        //simulateTouch: false,        
        // If we need pagination
        pagination: {
          el: '.slider-pagination',
          type: 'fraction'
        },
        // Navigation arrows
        navigation: {
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        }
      });
      this.catalogSlider = new Swiper('.catalog__slider .swiper-container', {
        // Optional parameters    
        speed: 800,
        //simulateTouch: false,        
        followFinger: false,
        slidesPerView: 3,
        spaceBetween: 60,
        // If we need pagination
        // pagination: {
        //   el: '.slider-pagination',
        //   type: 'fraction'
        // },
        // Navigation arrows
        navigation: {
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        },
        breakpoints: {
          992: {
            slidesPerView: 'auto'
          },
          576: {
            slidesPerView: 'auto',
            spaceBetween: 20,
          }
        },        
      });
      this.events();
      this.singleSlider.init();
      
    },
    events: function(){
      this.typesSlider.on('slideChangeTransitionStart', function(){        
        if (this.realIndex > this.previousIndex) {          
          new TimelineMax()
            .to(this.el.querySelectorAll('.tour-types__section h2'), 0.4, { skewX: 0, ease: Power2.easeIn }, 'start')
            .to(this.el.querySelectorAll('.tour-types__section .btn-skew'), 0.4, {scaleY: 0.7, ease: Power2.easeIn }, 'start')
            .to(this.el.querySelectorAll('.tour-types__section h2'), 0.4, { skewX: 34, x: 0, ease: Power2.easeOut }, 'end')
            .to(this.el.querySelectorAll('.tour-types__section .btn-skew'), 0.4, {scaleY: 1, ease: Power2.easeOut }, 'end')
            
        } else {          
          new TimelineMax()
          .to(this.el.querySelectorAll('.tour-types__section h2'), 0.4, { skewX: 48, ease: Power2.easeIn }, 'start')
          .to(this.el.querySelectorAll('.tour-types__section .btn-skew'), 0.4, { scaleY: 0.7, ease: Power2.easeIn }, 'start')
          .to(this.el.querySelectorAll('.tour-types__section h2'), 0.4, { skewX: 34, x: 0, ease: Power2.easeOut }, 'end')
          .to(this.el.querySelectorAll('.tour-types__section .btn-skew'), 0.4, { scaleY: 1, ease: Power2.easeOut }, 'end')
        }
      });
      this.singleSlider.on('init', function () {
        const that = this;
        function heroBgCover(el) {
          let ratio = el.width / el.height;
          let size;
          if(app.mode == 'descktop'){
            size = (325 * 2);
          }else if(app.mode == 'tablet'){
            size = (600 * 2);
          }else if(app.mode == 'mobile'){
            size = (700 * 2);
          }
          if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
            return {
              width: (that.el.clientWidth + size),
              height: (that.el.clientWidth + size) / ratio,
              x: 0,
              y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
            }
          } else {
            return {
              width: that.el.clientHeight * ratio,
              height: that.el.clientHeight,
              x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
              y: 0
            }
          }
        }

        let galleryEl = this.el.closest('.single-slider');
        this.gallery = new PIXI.Application({
          width: galleryEl.clientWidth,
          height: galleryEl.clientHeight,
          backgroundColor: 0x000000
        });
        galleryEl.appendChild(this.gallery.view);
        this.rootContainer = new PIXI.Container();
        this.gallery.stage.addChild(this.rootContainer);
        this.containers = [];
        this.cloneContainers = [];
        this.images = [];
        this.cloneImages = [];
        this.masks = [];
        this.cloneMasks = [];

        this.mask = new PIXI.Graphics();
        this.mask.lineStyle(0);
        this.mask.beginFill(0xff0000, 1);
        if(app.mode == 'descktop'){
          this.mask.drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
        }else if(app.mode == 'tablet'){
          this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
        }else if(app.mode == 'mobile'){
          this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
        }
        this.mask.endFill();

        this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          let container = new PIXI.Container();
          let image = PIXI.Sprite.from(src);
          let mask = that.mask.clone();          
          container.addChild(mask);          
          image.anchor.x = 0.5;
          image.anchor.y = 0.5;          
          image.width = heroBgCover(el).width;
          image.height = heroBgCover(el).height;          
          image.x = heroBgCover(el).x + (image.width / 2);
          image.y = heroBgCover(el).y + (image.height / 2);
          image.alpha = (i == 0 ? 0.7 : 0.5);
          if(app.mode == 'descktop'){
            container.width = galleryEl.clientWidth + (325 * 2);
            container.x = (galleryEl.clientWidth * i) - 325;
          }else if(app.mode == 'tablet'){
            container.width = galleryEl.clientWidth + (600 * 2);
            container.x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
          }else if(app.mode == 'mobile'){
            container.width = galleryEl.clientWidth + (700 * 2);
            container.x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
          }
          that.rootContainer.addChild(container);
          container.addChild(image);
          image.mask = mask;
          

          if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
            let cloneImage = PIXI.Sprite.from(src);
            cloneImage.width = heroBgCover(el).width;
            cloneImage.height = heroBgCover(el).height;
            cloneImage.x = heroBgCover(el).x;
            cloneImage.y = heroBgCover(el).y;
            cloneImage.alpha = 0.5;
            let cloneContaner = new PIXI.Container();
            that.rootContainer.addChild(cloneContaner);
            if(app.mode == 'descktop'){
              cloneContaner.width = galleryEl.clientWidth + (325 * 2);
              cloneContaner.x = -galleryEl.clientWidth - 325;
            }else if(app.mode == 'tablet'){
              cloneContaner.width = galleryEl.clientWidth + (600 * 2);
              cloneContaner.x = -(galleryEl.clientWidth - 600) - 1600;
            }else if(app.mode == 'mobile'){
              cloneContaner.width = galleryEl.clientWidth + (700 * 2);
              cloneContaner.x = -(galleryEl.clientWidth - 700) - 2000;
            }
            let cloneMask = that.mask.clone();
            //cloneMask.x = -galleryEl.clientWidth;
            cloneContaner.addChild(cloneMask);
            cloneContaner.addChild(cloneImage);
            cloneImage.mask = cloneMask;
            that.cloneMasks.push(cloneMask);
            that.cloneContainers.push(cloneContaner);
            that.cloneImages.push(cloneImage);
          } else if (i == 0) {
            let cloneImage = PIXI.Sprite.from(src);
            cloneImage.width = heroBgCover(el).width;
            cloneImage.height = heroBgCover(el).height;
            cloneImage.x = heroBgCover(el).x;
            cloneImage.y = heroBgCover(el).y;
            cloneImage.alpha = 0.5;
            let cloneContaner = new PIXI.Container();            
            that.rootContainer.addChild(cloneContaner);
            if(app.mode == 'descktop'){
              cloneContaner.width = galleryEl.clientWidth + (325 * 2);
              cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
            }else if(app.mode == 'tablet'){
              cloneContaner.width = galleryEl.clientWidth + (600 * 2);              
              cloneContaner.x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
            }else if(app.mode == 'mobile'){
              cloneContaner.width = galleryEl.clientWidth + (700 * 2);
              cloneContaner.x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
            }
            let cloneMask = that.mask.clone();
            //cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
            cloneContaner.addChild(cloneMask);            
            cloneContaner.addChild(cloneImage);
            cloneImage.mask = cloneMask;
            that.cloneMasks.push(cloneMask);            
            that.cloneContainers.push(cloneContaner);
            that.cloneImages.push(cloneImage);
          }
          that.containers.push(container);
          that.images.push(image);
          that.masks.push(mask);

        });
      });

      this.singleSlider.on('slideChangeTransitionStart', function () {
        let that = this;
        let x;
        if(app.mode == 'descktop'){
          x = this.el.clientWidth * this.realIndex;
        }else if(app.mode == 'tablet'){
          x = (this.el.clientWidth + 400) * this.realIndex;
        }else if(app.mode == 'mobile'){
          x = (this.el.clientWidth + 600) * this.realIndex;
        }
        if (this.realIndex > this.previousIndex) {
          this.images.forEach(function (el, i) {
            TweenMax.to(el, 0.8, {
              alpha: function () {
                return that.realIndex == i ? 0.7 : 0.5;
              }, ease: Power2.easeIn
            });
            let scale = el.scale;
            new TimelineMax()
              .to(el.skew, 0.5, { x: -0.6, ease: Power2.easeIn }, 'start')
              .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
              .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
              .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
          });
          new TimelineMax()
            .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: -34, scale: 1.2, ease: Power1.easeIn }, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
        } else {
          this.images.forEach(function (el, i) {
            TweenMax.to(el, 0.8, {
              alpha: function () {
                return that.realIndex == i ? 0.7 : 0.5;
              }, ease: Power2.easeIn
            });
            let scale = el.scale;
            new TimelineMax()
            .to(el.skew, 0.5, { x: 0.6, ease: Power2.easeIn }, 'start')
            .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
            .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
            .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
          });
          new TimelineMax()
            .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 34, scale: 1.2, ease: Power1.easeIn }, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
        }
      });
      this.catalogSlider.forEach(function(el, i){
        el.on('slideChangeTransitionStart', function () {
          console.log(this.realIndex, this.previousIndex)
          if (this.realIndex > this.previousIndex) {
            new TimelineMax()
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: -30, scale: 1.2, ease: Power1.easeIn})
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
          } else {
            new TimelineMax()
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 30, scale: 1.2, ease: Power1.easeIn})
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
          }
        });
      });
      
      
    },    
    resize: function(){      
      const that = this.singleSlider;
      function heroBgCover(el) {
        let ratio = el.width / el.height;
        let size;
        if(app.mode == 'descktop'){
          size = (325 * 2);
        }else if(app.mode == 'tablet'){
          size = (600 * 2);
        }else if(app.mode == 'mobile'){
          size = (700 * 2);
        }
        if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
          return {
            width: (that.el.clientWidth + size),
            height: (that.el.clientWidth + size) / ratio,
            x: 0,
            y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
          }
        } else {
          return {
            width: that.el.clientHeight * ratio,
            height: that.el.clientHeight,
            x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
            y: 0
          }
        }
      }
      let x;
        if(app.mode == 'descktop'){
          x = that.el.clientWidth * that.realIndex;
        }else if(app.mode == 'tablet'){
          x = (that.el.clientWidth + 400) * that.realIndex;
        }else if(app.mode == 'mobile'){
          x = (that.el.clientWidth + 600) * that.realIndex;
        }
      that.rootContainer.x = -x;
      let galleryEl = that.el.closest('.single-slider');
      that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
      setTimeout(function(){
        that.images.forEach(function(el, i){        
          el.width = heroBgCover(el.texture).width;
          el.height = heroBgCover(el.texture).height;
          el.x = heroBgCover(el).x + (el.width / 2);
          el.y = heroBgCover(el).y + (el.height / 2);
          if(app.mode == 'descktop'){
            that.containers[i].width = galleryEl.clientWidth + (325 * 2);
            that.containers[i].x = (galleryEl.clientWidth * i) - 325;
          }else if(app.mode == 'tablet'){
            that.containers[i].width = galleryEl.clientWidth + (600 * 2);
            that.containers[i].x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
          }else if(app.mode == 'mobile'){
            that.containers[i].width = galleryEl.clientWidth + (700 * 2);
            that.containers[i].x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
          }          
          that.masks[i].clear();
          that.masks[i].lineStyle(0);
          that.masks[i].beginFill(0xffffff, 0.5);          
          if(app.mode == 'descktop'){
            that.masks[i].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
          }else if(app.mode == 'tablet'){
            that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
          }else if(app.mode == 'mobile'){
            that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
          }
          that.masks[i].endFill();
        });
        that.cloneImages.forEach(function(el, i){
            el.width = heroBgCover(el.texture).width;
            el.height = heroBgCover(el.texture).height;
            el.x = heroBgCover(el).x + (el.width / 2);
            el.y = heroBgCover(el).y + (el.height / 2);
            if(i == 0){
              that.cloneImages[0].width = heroBgCover(that.cloneImages[0].texture).width;
              that.cloneImages[0].height = heroBgCover(that.cloneImages[0].texture).height;
              that.cloneImages[0].x = heroBgCover(that.cloneImages[0].texture).x;
              that.cloneImages[0].y = heroBgCover(that.cloneImages[0].texture).y;
              if(app.mode == 'descktop'){
                that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
              }else if(app.mode == 'tablet'){
                that.cloneContainers[0].width = galleryEl.clientWidth + (600 * 2);              
                that.cloneContainers[0].x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
              }else if(app.mode == 'mobile'){
                that.cloneContainers[0].width = galleryEl.clientWidth + (700 * 2);
                that.cloneContainers[0].x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
              }              
              that.cloneMasks[0].clear();
              that.cloneMasks[0].lineStyle(0);
              that.cloneMasks[0].beginFill(0xff0000, 0.5);
              if(app.mode == 'descktop'){
                that.cloneMasks[0].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
              }else if(app.mode == 'tablet'){
                that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
              }else if(app.mode == 'mobile'){
                that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
              }
              that.cloneMasks[0].endFill();            
            }else {            
              that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
              that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
              that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
              that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
              if(app.mode == 'descktop'){
                that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                that.cloneContainers[1].x = -galleryEl.clientWidth - 325;
              }else if(app.mode == 'tablet'){
                that.cloneContainers[1].width = galleryEl.clientWidth + (600 * 2);
                that.cloneContainers[1].x = -(galleryEl.clientWidth - 600) - 1600;
              }else if(app.mode == 'mobile'){
                that.cloneContainers[1].width = galleryEl.clientWidth + (700 * 2);
                that.cloneContainers[1].x = -(galleryEl.clientWidth - 700) - 2000;
              }              
              that.cloneMasks[1].clear();
              that.cloneMasks[1].lineStyle(0);
              that.cloneMasks[1].beginFill(0xff0000, 1);
              if(app.mode == 'descktop'){
                that.cloneMasks[1].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
              }else if(app.mode == 'tablet'){
                that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
              }else if(app.mode == 'mobile'){
                that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
              }
              that.cloneMasks[1].endFill();              
            }
        });
        
      }, 100);
    }
  }

  this.trust = {
    init: function() {
      let that = this;
      let ratio;
      this.show = false;
      this.el = document.querySelector('.homepage__drag');

      this.canv1 = document.createElement('canvas');
      this.canv1.className = 'left';
      this.ctx1 = this.canv1.getContext('2d');
      this.canv2 = document.createElement('canvas');
      this.canv2.className = 'right';
      this.ctx2 = this.canv2.getContext('2d');
      
      // this.canvas.width = this.el.clientWidth;
      // this.canvas.height = this.el.clientHeight;
      this.el.appendChild(this.canv1);
      this.pat1 = new Image();      
      this.pat1.src = this.el.querySelector('[data-img-left]').getAttribute('src');
      this.pat1.onload = function () {                
        that.canv1.width = that.el.clientWidth;
        that.canv1.height = that.el.clientHeight;
        that.ctx1.save();
        that.ctx1.beginPath();
        that.ctx1.moveTo(0, 0);
        that.ctx1.lineTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0);
        that.ctx1.lineTo(((that.el.clientWidth / 2) - (that.el.clientWidth / 2) / 2.92), that.el.clientHeight);
        that.ctx1.lineTo(0, that.el.clientHeight);
        that.ctx1.lineTo(0, 0);
        that.ctx1.closePath();
        // Clip to the current path
        that.ctx1.clip();        
        that.ctx1.drawImage(that.pat1, that.heroBgCover(that.pat1).x, that.heroBgCover(that.pat1).y, that.heroBgCover(that.pat1).width, that.heroBgCover(that.pat1).height);
        that.ctx1.restore();
      }
      
      this.el.appendChild(this.canv2);
      this.pat2 = new Image();
      this.pat2.src = this.el.querySelector('[data-img-right]').getAttribute('src');
      this.pat2.onload = function () {
        that.canv2.width = that.el.clientWidth;
        that.canv2.height = that.el.clientHeight;
        that.ctx2.save();
        that.ctx2.beginPath();
        that.ctx2.moveTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0);
        that.ctx2.lineTo(that.el.clientWidth, 0);
        that.ctx2.lineTo(that.el.clientWidth, that.el.clientHeight);
        that.ctx2.lineTo(((that.el.clientWidth / 2) - (that.el.clientWidth / 2) / 2.92), that.el.clientHeight);
        that.ctx2.lineTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0);
        that.ctx2.closePath();
        // Clip to the current path
        that.ctx2.clip();
        that.ctx2.drawImage(that.pat2, that.heroBgCover(that.pat2).x, that.heroBgCover(that.pat2).y, that.heroBgCover(that.pat2).width, that.heroBgCover(that.pat2).height);
        that.ctx2.restore();
      };
    },
    heroBgCover: function (img) {      
      let el = document.querySelector('.homepage__drag');
      let ratio = img.width / img.height;      
      if (document.body.clientWidth / window.innerHeight > ratio) {        
        return {
          width: el.clientWidth,
          height: el.clientWidth / ratio,
          x: 0,
          y: el.clientHeight - el.clientWidth / ratio
        }
      } else {        
        return {
          width: el.clientHeight * ratio,
          height: el.clientHeight,
          x: el.clientWidth - el.clientHeight * ratio,
          y: 0
        }
      }
    },
    resize: function(){      
      this.ctx1.clearRect(0, 0, this.el.clientWidth, this.el.clientHeight);
      this.canv1.width = this.el.clientWidth;
      this.canv1.height = this.el.clientHeight;
      this.ctx1.save();
      this.ctx1.beginPath();
      this.ctx1.moveTo(0, 0);
      this.ctx1.lineTo(((this.el.clientWidth / 2) + (this.el.clientWidth / 2) / 2.92), 0);
      this.ctx1.lineTo(((this.el.clientWidth / 2) - (this.el.clientWidth / 2) / 2.92), this.el.clientHeight);
      this.ctx1.lineTo(0, this.el.clientHeight);
      this.ctx1.lineTo(0, 0);
      this.ctx1.closePath();      
      this.ctx1.clip();        
      this.ctx1.drawImage(this.pat1, this.heroBgCover(this.pat1).x, this.heroBgCover(this.pat1).y, this.heroBgCover(this.pat1).width, this.heroBgCover(this.pat1).height);
      this.ctx1.restore();

      this.ctx2.clearRect(0, 0, this.el.clientWidth, this.el.clientHeight);
      this.canv2.width = this.el.clientWidth;
      this.canv2.height = this.el.clientHeight;
      this.ctx2.save();
      this.ctx2.beginPath();
      this.ctx2.moveTo(((this.el.clientWidth / 2) + (this.el.clientWidth / 2) / 2.92), 0);
      this.ctx2.lineTo(this.el.clientWidth, 0);
      this.ctx2.lineTo(this.el.clientWidth, this.el.clientHeight);
      this.ctx2.lineTo(((this.el.clientWidth / 2) - (this.el.clientWidth / 2) / 2.92), this.el.clientHeight);
      this.ctx2.lineTo(((this.el.clientWidth / 2) + (this.el.clientWidth / 2) / 2.92), 0);
      this.ctx2.closePath();
      // Clip to the current path
      this.ctx2.clip();
      this.ctx2.drawImage(this.pat2, this.heroBgCover(this.pat2).x, this.heroBgCover(this.pat2).y, this.heroBgCover(this.pat2).width, this.heroBgCover(this.pat2).height);
      this.ctx2.restore();      
    }
  }

  this.eventsInit = function () {
    const that = this;    
    window.addEventListener('scroll', function (e) {
      let scrollTop = window.pageYOffset;
      header(e);      
    });
    window.addEventListener('resize', function(){
      heightUpdate();
      that.hero.resize();      
      that.sliders.resize();      
      that.trust.resize();
    });
    window.addEventListener('orientationchange', function(e){
      setTimeout(function(){
        heightUpdate();
        that.hero.resize();      
        that.sliders.resize();      
        that.trust.resize();
      }, 100);
    });

    
    
    document.querySelectorAll('.slider-button-prev, .slider-button-next').forEach(function (el, i) {      
      el.addEventListener('mouseenter', function (e) {
        if (this.classList.contains('swiper-button-disabled') || app.touch) return;
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
        //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#ee412a', ease: Power3.easeOut });        
        if (this.closest('.catalog__slider')){
          TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#ee412a', ease: Power3.easeOut });
        }
      });
      el.addEventListener('mouseleave', function (e) {
        if (app.touch) return;
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeIn });
        TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeIn });
        //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#fff', ease: Power3.easeOut });        
        if (this.closest('.catalog__slider')){
          TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#fff', ease: Power3.easeIn });
        }        
      });
    });

  }

  this.cursor = {
    init: function () {
      TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
      document.body.addEventListener('mousemove', function (e) {
        TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
      });      
    }
  }

  this.aosInit = function() {
    console.log('aosInit');    
    AOS.init({
      offset: 300,
      once: true
    });
    TweenMax.set('.leisure .homepage__tabs_list span', {opacity: 0});
    TweenMax.set(document.querySelectorAll('.leisure .tour-types h2 span'), {visibility: 'hidden'});
    TweenMax.set(document.querySelectorAll('.leisure .tour-types .btn-skew'), {visibility: 'hidden'});        
    TweenMax.set(document.querySelectorAll('.single-slider .swiper-slide-active .slide--content h2, .single-slider .swiper-slide-active .slide--content .slide--text, .single-slider .swiper-slide-active .slide--content .slide--nav'), {opacity: 0, y: 100});
    TweenMax.set('.single-slider .slider-control', {opacity: 0, scale: 1.3});    
    TweenMax.set(document.querySelectorAll('.catalog__slider .swiper-slide'), {x: '100%', opacity: 0, skewX: -34});
    TweenMax.set(document.querySelectorAll('.catalog__slider .slider-button-next'), {opacity: 0, scale: 1.3});
    TweenMax.set('.leisure__calendar h2 span', {opacity: 0, rotationX: 90});
    TweenMax.set('.leisure__calendar_text', {opacity: 0, y: 50});
    TweenMax.set('.leisure__calendar .btn-skew', {opacity: 0, y: 50});
    TweenMax.set('.homepage__insta');
    TweenMax.set('.homepage__insta h2 span', {rotationX: 90, opacity: 0});
    TweenMax.set('.expert__form h2 span', { rotationX: 90, opacity: 0});
    if(app.mode != 'descktop')TweenMax.set('.tour-types', {opacity: 0});
    
    

    document.addEventListener('aos:in', function (e) {      
      if (e.detail.classList.contains('homepage__tabs')) {
        new TimelineMax().staggerTo(document.querySelectorAll('.homepage__tabs_list span'), 2, { opacity: 1 }, 0.1)
          .add(function () {
            root.tabs.show = true;
          });
      }
      if (e.detail.classList.contains('tour-types')) {
        new TimelineMax()          
          .set(document.querySelectorAll('.leisure .tour-types h2 span, .leisure .tour-types .btn-skew'), {visibility: 'visible'})
          .to('.tour-types', 2, {opacity: 1})
          .staggerFrom(document.querySelectorAll('.leisure .tour-types h2 span'), 1.5, {rotationX: 90, opacity: 0, ease: Power3.easeOut }, 0.25, '-=1')
          .staggerFrom(document.querySelectorAll('.leisure .tour-types .btn-skew'), 1.5, {opacity: 0}, 0.3, '-=1')
      }
      if (e.detail.classList.contains('single-slider')) {                
        new TimelineMax()
          .staggerTo(document.querySelectorAll('.single-slider .swiper-slide-active .slide--content h2, .single-slider .swiper-slide-active .slide--content .slide--text, .single-slider .swiper-slide-active .slide--content .slide--nav'), 0.8, {opacity: 1, y: 0, ease: Power2.easeOut}, 0.2)
          .to('.single-slider .slider-control', 1, {opacity: 1, scale: 1}, '-=0.5');
      }
      if (e.detail.classList.contains('catalog__slider') && e.detail.classList.contains('tours')) {
        new TimelineMax()
          .staggerTo(document.querySelectorAll('.catalog__slider.tours .swiper-slide'), 0.8, {x: '0%', opacity: 1, skewX: 0, scale: 1, ease: Power1.easeOut}, 0.25)          
          .to('.catalog__slider.tours .slider-button-next', 1, {opacity: 1, scale: 1})
          .set('.catalog__slider.tours .slider-button-next', {clearProps: 'all'});
      }
      if (e.detail.classList.contains('catalog__slider') && e.detail.classList.contains('hotels')) {
        new TimelineMax()
          .staggerTo(document.querySelectorAll('.catalog__slider.hotels .swiper-slide'), 0.8, {x: '0%', opacity: 1, skewX: 0, scale: 1, ease: Power1.easeOut}, 0.25)
          .to('.catalog__slider.hotels .slider-button-prev', 1, {opacity: 0.3, scale: 1})
          .to('.catalog__slider.hotels .slider-button-next', 1, {opacity: 1, scale: 1}, '-=1')
          .set('.catalog__slider.hotels .slider-button-next', {clearProps: 'all'});
      }
      if (e.detail.classList.contains('leisure__calendar')) {
        new TimelineMax()
          .to('.leisure__calendar_bg .date i', 1, {scaleX: 0, ease: Power3.easeInOut})
          .to('.leisure__calendar h2 span', 1.5, {opacity: 1, rotationX: 0, ease: Power3.easeOut}, '-=0.2') 
          .to('.leisure__calendar_text', 1, {opacity: 1, y: 0, ease: Power2.easeOut}, '-=0.6') 
          .to('.leisure__calendar .btn-skew', 1, {opacity: 1, y: 0, ease: Power2.easeOut}, '-=0.8') 
      }
      if (e.detail.classList.contains('homepage__drag')) {
        new TimelineMax().to(['.homepage__drag .blind-left', '.homepage__drag .blind-right'], 0.8, { scaleX: 0, ease: Power2.easeIn })
          .staggerFrom(document.querySelectorAll('.homepage__drag canvas.left, .homepage__drag canvas.right'), 1.6, { scale: 1.4 }, 0.1, '-=0.8')
          .staggerFrom('.homepage__drag h2 span', 1, { rotationX: 90, opacity: 0, ease: Power3.easeOut }, 0.25, '-=0.8')
          .from('.homepage__drag .btn-skew', 1.5, { opacity: 0, ease: Power2.easeOut }, '-=0.5')
      }
      if (e.detail.classList.contains('homepage__insta')) {        
        TweenMax.to('.homepage__insta h2 span', 1.5, {rotationX: 0, opacity: 1, ease: Power3.easeOut });
      }
      if (e.detail.classList.contains('expert__form')) {
        TweenMax.to('.expert__form h2 span', 1.5, { rotationX: 0, opacity: 1, ease: Power3.easeOut });
      }

    });
  }




  this.loader.init();
};


/* ==============================================================
                          BUSINESS INIT
   ============================================================== */
const _business = function () {
  const root = this;

  this.loader = {
    progress: 0,
    resources: 1,
    resourcesDone: 0,
    loaderReady: false,
    scripts:
      [
        'pixi',
        'splitText',
        'swiper',
        'aos',
        //'pixiFilters'
      ],    
    resourcesDone: 0,
    init: function () {
      let that = this;

      window.scrollTo(0, 0);

      TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
      TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
      TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
      
      this.resources += document.querySelectorAll('img[data-src]').length        
        + this.scripts.length;

      document.querySelectorAll('img[data-src]').forEach(function (el, i) {
        let src = el.getAttribute('data-src');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          el.src = src;
          that.resourcesDone++;
          that.loading();
        }
      });

      this.scripts.forEach(function (n) {        
        let src = './js/lib/' + app.resours[n];
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = function () {
          if (n == 'pixi') {
            filters();
          }
          that.resourcesDone++;
          that.loading();
        }
      });

      function filters() {
        let src = './js/lib/pixi-filters.js';
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = function () {
          that.resourcesDone++;
          that.loading();
        }
      }      
    },
    loading: function () {
      const that = this;
      console.log(this.resources, this.resourcesDone);
      if (this.resources == this.resourcesDone) {        
        let tl = new TimelineMax();
        tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
        .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
        .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
        .add(function(){
          root.hero.render();
          root.tabs.init();
          root.eventsInit();
          root.sliders.init();
          root.inquirer.init();      
          root.cursor.init();
          app.globalEvents();          
        })
        .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
        .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
        .add(function(){
          that.loaded();
        });
        
      }
    },
    loaded: function () {
      const that = this;
      new TimelineMax()
      .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
      .add(function(){
        root.hero.startTimer();
        document.querySelector('.loader').remove();
        TweenMax.set('body', { overflow: 'auto' });
        root.hero.resize();
        root.sliders.resize();        
        root.aosInit();
      })
      .staggerFrom(document.querySelectorAll('.leisure__hero h1 span'), 1, { rotationX: 90, opacity: 0, ease: Power2.easeOut }, 0.1, '+=0.3')
      .from('header, .leisure__hero .breadcrumb', 0.8, { opacity: 0 }, '-=0.5')
      .from('.hero--scroll, .leisure__hero_pagination', 0.8, { opacity: 0 }, '-=0.4')
      .to(root.hero.heroFilter, 0.8, { innerRadius: 200 }, '-=0.4')      
    }
  };

  this.hero = {
    slides: document.querySelectorAll('.leisure__hero_backgrounds img').length,
    slide: 1,
    timer: null,
    transition: false,
    heroBgCover: function (el) {
      let ratio = el.width / el.height;
      if (document.body.clientWidth / window.innerHeight > ratio) {        
        return {          
          width: window.innerWidth,
          height: window.innerWidth / ratio,
          x: 0,
          y: (window.innerHeight - window.innerWidth / ratio) / 2
        }
      } else {        
        return {
          width: window.innerHeight * ratio,
          height: window.innerHeight,
          x: (window.innerWidth - (window.innerHeight * ratio)) / 2,
          y: 0
        }
      }
    },
    render: function () {
      let that = this;
      that.el = document.querySelector('.leisure__hero');
      that.hero = new PIXI.Application({
        width: that.el.clientWidth,
        height: that.el.clientHeight,
        transparent: true,
        //forceCanvas: true
      });
      that.el.appendChild(that.hero.view);
      that.container = new PIXI.Container();
      that.hero.stage.addChild(that.container);
      that.hero.stage.interactive = true;
      const loader = PIXI.Loader.shared;
      document.querySelectorAll('.leisure__hero_backgrounds img').forEach(function (el, i) {
        loader.add('slide' + (i + 1), el.getAttribute('data-src'));
      });

      loader.load(function (loader, resources) {
        for (i in resources) {
          that[i] = new PIXI.Sprite(resources[i].texture);
          that.container.addChild(that[i]);
          let params = that.heroBgCover(resources[i].data);
          that[i].width = params.width;
          that[i].height = params.height;
          that[i].x = params.x;
          that[i].y = params.y;
          that[i].alpha = 0;
        }
        that.slide1.alpha = 1;
        TweenMax.set('.leisure__hero h1 .switch[data-slide="1"]', { display: 'block' });
        document.querySelector('.leisure__hero_pagination .pagination--slide .current').innerHTML = that.slide < 10 ? '0' + that.slide : that.slide;
        document.querySelector('.leisure__hero_pagination .pagination--slide .all').innerHTML = that.slides < 10 ? '0' + that.slides : that.slides;
        that.heroFilter = new PIXI.filters.ZoomBlurFilter();
        that.heroFilter.strength = 0.1;
        that.heroFilter.center = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        }
        that.heroFilter.innerRadius = 0;
        that.container.filters = [that.heroFilter];        
        that.el.addEventListener('mousemove', onPointerMove);
        that.el.addEventListener('click', that.onPointerClick);

        function onPointerMove(e) {
          TweenMax.to(that.heroFilter.center, 1, { x: e.clientX, y: e.clientY });
        };
        
      });
    },
     onPointerClick: function(e){
      const that = app.business.hero;
      if (that.transition) return;
      clearTimeout(that.timer);
      that.transition = true;
      let r = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
      let current = that['slide' + that.slide];
      let next;
      let pS, pE;
      if (that.slide < that.slides) {
        next = that['slide' + (that.slide + 1)];
        pS = ((100 / that.slides) * (that.slide + 1)) - ((100 / that.slides) / 2);
        pE = ((100 / that.slides) * (that.slide + 1));
      } else {
        next = that['slide1'];
        pS = (100 - ((100 / that.slides)));
        pE = 100 / that.slides;
      }      
      new TimelineMax().to(that.heroFilter, 1.3, { innerRadius: r, ease: Power4.easeIn })
        .set(that.heroFilter, { innerRadius: 0, strength: 0 })
        .to('.leisure__hero_pagination .pagination--bar i', 1, { width: pS + '%', ease: Power3.easeIn }, 'transition +=1')
        .to(that.heroFilter, 1, { strength: 2, ease: Power3.easeIn }, 'transition +=1')
        .to(current, 1, { alpha: 0, ease: Power3.easeIn }, 'transition +=1')
        .to(next, 1, { alpha: 1, ease: Power3.easeIn }, 'transition +=1')
        .fromTo('.leisure__hero h1 .switch[data-slide="' + that.slide + '"]', 1, { rotationX: 0, opacity: 1, y: 0 }, { rotationX: 90, opacity: 0, y: 30, ease: Power3.easeIn }, 'transition +=1')
        .set('.leisure__hero h1 .switch[data-slide="' + that.slide + '"]', { display: 'none' })
        .set('.leisure__hero h1 .switch[data-slide="' + (that.slide < that.slides ? (that.slide + 1) : 1) + '"]', { display: 'block' })
        .add(function () {
          let slide;
          if (that.slide < that.slides) {
            slide = (that.slide + 1) < 10 ? '0' + (that.slide + 1) : (that.slide + 1)
          } else {
            slide = '01';
          }
          document.querySelector('.leisure__hero_pagination .pagination--slide .current').innerHTML = slide;
        })
        .to('.leisure__hero_pagination .pagination--bar i', 1, { width: pE + '%', ease: Power3.easeOut }, 'end')
        .fromTo('.leisure__hero h1 .switch[data-slide="' + (that.slide < that.slides ? (that.slide + 1) : 1) + '"]', 1, { rotationX: -90, opacity: 0, y: 30 }, { rotationX: 0, opacity: 1, y: 0, ease: Power3.easeOut }, 'end')
        .to(that.heroFilter, 1, { strength: 0.1, ease: Power3.easeOut }, 'end')
        .to(that.heroFilter, 1, { innerRadius: 200, ease: Power3.easeOut }, 'end')
        .add(function () {
          if (that.slide < that.slides) {
            that.slide++;
          } else {
            that.slide = 1;
          }
          that.transition = false;
          that.startTimer();

        })
    },
    startTimer: function() {
      const that = this;
      app.business.hero.timer = setTimeout(function () {
        that.onPointerClick();
      }, 5000);
    },
    resize: function(){
      this.hero.renderer.resize(this.el.clientWidth, window.innerHeight);
      for (var i=0; i<this.slides; i++) {
        let n = i+1;
        let slide = this['slide'+n];        
        let params = this.heroBgCover(slide._texture);
        slide.width = params.width;
        slide.height = params.height;
        slide.x = params.x;
        slide.y = params.y;        
      }
    }
  };

  this.tabs = {
    active: false,
    diskTextAnim: null,
    show: true,
    init: function () {
      let that = this;
      this.render();
      document.querySelectorAll('.homepage__tabs_list span').forEach(function (el, i) {        
        el.addEventListener('click', function (e) {
          if (that.show) that.onActive(e);
        });
        el.addEventListener('mouseenter', function (e) {
          if (that.show) that.onHover(e);
        });
        el.addEventListener('mouseleave', function (e) {
          if (that.show) that.onHover(e);
        });
      });
      document.querySelectorAll('.homepage__tabs_content h3 i').forEach(function (el, i) {
        el.addEventListener('click', function (e) {
          that.onClose(e);
        });
      });

    },
    onHover: function (e) {
      if (!this.active) {
        if (e.type == 'mouseenter') {
          e.target.classList.add('active');
          TweenMax.to(document.querySelectorAll('.homepage__tabs_list span:not(.active)'), 1, { opacity: 0.1, color: '#2f2f2f', ease: Power2.easeOut });
        } else {
          TweenMax.to(document.querySelectorAll('.homepage__tabs_list span'), 0.8, { opacity: 1, color: '#ee412a', ease: Power2.easeOut });
          e.target.classList.remove('active');
        }
      }
    },
    onActive: function (e) {
      this.active = true;
      e.target.classList.add('active');
      let that = this;
      let target = e.target.getAttribute('data-target');
      TweenMax.to('.homepage__tabs_disk .disk--arrow-1', 1.5, { rotation: 360, ease: Power3.easeInOut });
      TweenMax.to('.homepage__tabs_disk .disk--arrow-2', 1.5, { rotation: 360, ease: Power3.easeInOut });
      TweenMax.to('.homepage__tabs_disk .disk--text', 1.5, {
        opacity: 0.5, onComplete: function () {
          that.diskTextAnim.pause();
          TweenMax.set('.homepage__tabs_disk .disk--arrow-1, .homepage__tabs_disk .disk--arrow-2', { clearProps: 'all' });
        }
      });
      let tl = new TimelineMax();
      tl.staggerTo(document.querySelectorAll('.homepage__tabs_list span:not(.active)'), 0.8, { opacity: 0, ease: Power2.easeOut }, 0.1)
        .to(document.querySelector('.homepage__tabs_list span.active'), 0.7, { opacity: 0, ease: Power2.easeOut }, '-=0.8')
        .set('.homepage__tabs_content [data-tab="' + target + '"]', { display: 'block', zIndex: 2, position: 'relative' }, '-=0.5')
        .fromTo('.homepage__tabs_content [data-tab="' + target + '"] h3 div', 0.8, { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, ease: Power2.easeOut })
        .fromTo('.homepage__tabs_content [data-tab="' + target + '"] p', 1.5, { opacity: 0 }, { opacity: 1, ease: Power2.easeOut }, '-=0.3')
        .set('.homepage__tabs_list', { visibility: 'hidden' })
    },
    onClose: function (e) {
      let that = this;
      TweenMax.to('.homepage__tabs_disk .disk--text', 1.5, {
        opacity: 1, onComplete: function () {
          TweenMax.to('.homepage__tabs_disk .disk--arrow-1', 90, { rotation: 360, repeat: -1, ease: Power0.easeNone });
          TweenMax.to('.homepage__tabs_disk .disk--arrow-2', 15, { rotation: 360, repeat: -1, ease: Power0.easeNone });
          that.diskTextAnim.play();
          document.querySelector('.homepage__tabs_list .active').classList.remove('active');
          that.active = false;
        }
      });
      let tl = new TimelineMax();
      tl.to(e.target.closest('.title'), 0.8, { rotationX: 90, opacity: 0, ease: Power2.easeOut }, 'start')
        .to(e.target.closest('.tab--body').querySelector('p'), 1, { opacity: 0, ease: Power2.easeOut }, 'start')
        .set(e.target.closest('.tab--body'), { clearProps: 'all' })
        .set(document.querySelectorAll('.homepage__tabs_list span'), { color: '#ee412a' })
        .set('.homepage__tabs_list', { visibility: 'visible' })
        .staggerTo(document.querySelectorAll('.homepage__tabs_list span'), 2, { opacity: 1 }, 0.1)
    },
    render: function () {
      let el = document.querySelector('.homepage__tabs_disk .disk--text');
      var text = '';
      for (var i in el.innerText) {
        text += el.innerText[i].replace(' ', '&nbsp;');
        if (i == el.innerText.length - 1) text += '&nbsp;+&nbsp;';
      }
      var textBlock = document.createElement('div');
      textBlock.className = 'text';
      textBlock.innerHTML = text;
      var split = new SplitText(textBlock, { type: "chars", reduceWhiteSpace: false });
      el.innerHTML = '';
      el.appendChild(textBlock);
      var deg = 360 / split.chars.length, origin = 0, radius = 320;
      for (var i in split.chars) {
        split.chars[i].style.height = radius + 'px';
        split.chars[i].style.transform = 'rotate(' + (origin) + 'deg)';
        origin += deg;
      }
      this.diskTextAnim = TweenMax.to('.homepage__tabs_disk .disk--text', 60, { rotation: 360, repeat: -1, ease: Power0.easeNone });
      TweenMax.to('.homepage__tabs_disk .disk--arrow-1', 90, { rotation: 360, repeat: -1, ease: Power0.easeNone });
      TweenMax.to('.homepage__tabs_disk .disk--arrow-2', 15, { rotation: 360, repeat: -1, ease: Power0.easeNone });

      document.querySelectorAll('.homepage__tabs_content .tab--body h3 div').forEach(function (el, i) {
        let split = new SplitText(el, { type: "words" });
        let plus = document.createElement('i');
        plus.innerText = '+';
        split.words[split.words.length - 1].appendChild(plus);
      });      
    }
  };

  this.sliders = {
    meetingsSlider: null,
    caseSlider: null,
    init: function(){
      this.meetingsSlider = new Swiper('.single-slider.meetings .swiper-container', {
         // Optional parameters
         init: false,
         speed: 1000,
         followFinger: false,
         //simulateTouch: false,        
         // If we need pagination
         pagination: {
           el: '.slider-pagination',
           type: 'fraction'
         },
         // Navigation arrows
         navigation: {
           nextEl: '.slider-button-next',
           prevEl: '.slider-button-prev',
         }
      });
      this.caseSlider = new Swiper('.single-slider.case .swiper-container', {
        // Optional parameters
        init: false,
        speed: 1000,
        followFinger: false,
        //simulateTouch: false,        
        // If we need pagination
        pagination: {
          el: '.slider-pagination',
          type: 'fraction'
        },
        // Navigation arrows
        navigation: {
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        }
      });
      this.events();
      this.meetingsSlider.init();
      this.caseSlider.init();
      
    },
    events: function(){      
      this.meetingsSlider.on('init', function () {
        const that = this;
        function heroBgCover(el) {
          let ratio = el.width / el.height;
          let size;
          if(app.mode == 'descktop'){
            size = (325 * 2);
          }else if(app.mode == 'tablet'){
            size = (600 * 2);
          }else if(app.mode == 'mobile'){
            size = (700 * 2);
          }
          if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
            return {
              width: (that.el.clientWidth + size),
              height: (that.el.clientWidth + size) / ratio,
              x: 0,
              y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
            }
          } else {
            return {
              width: that.el.clientHeight * ratio,
              height: that.el.clientHeight,
              x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
              y: 0
            }
          }
        }

        let galleryEl = this.el.closest('.single-slider');
        this.gallery = new PIXI.Application({
          width: galleryEl.clientWidth,
          height: galleryEl.clientHeight,
          backgroundColor: 0x000000
        });
        galleryEl.appendChild(this.gallery.view);
        this.rootContainer = new PIXI.Container();
        this.gallery.stage.addChild(this.rootContainer);
        this.containers = [];
        this.cloneContainers = [];
        this.images = [];
        this.cloneImages = [];
        this.masks = [];
        this.cloneMasks = [];

        this.mask = new PIXI.Graphics();
        this.mask.lineStyle(0);
        this.mask.beginFill(0xff0000, 1);
        if(app.mode == 'descktop'){
          this.mask.drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
        }else if(app.mode == 'tablet'){
          this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
        }else if(app.mode == 'mobile'){
          this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
        }
        this.mask.endFill();

        this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          let container = new PIXI.Container();
          let image = PIXI.Sprite.from(src);
          let mask = that.mask.clone();          
          container.addChild(mask);          
          image.anchor.x = 0.5;
          image.anchor.y = 0.5;          
          image.width = heroBgCover(el).width;
          image.height = heroBgCover(el).height;          
          image.x = heroBgCover(el).x + (image.width / 2);
          image.y = heroBgCover(el).y + (image.height / 2);
          image.alpha = (i == 0 ? 0.7 : 0.5);
          if(app.mode == 'descktop'){
            container.width = galleryEl.clientWidth + (325 * 2);
            container.x = (galleryEl.clientWidth * i) - 325;
          }else if(app.mode == 'tablet'){
            container.width = galleryEl.clientWidth + (600 * 2);
            container.x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
          }else if(app.mode == 'mobile'){
            container.width = galleryEl.clientWidth + (700 * 2);
            container.x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
          }
          that.rootContainer.addChild(container);
          container.addChild(image);
          image.mask = mask;
          

          if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
            let cloneImage = PIXI.Sprite.from(src);
            cloneImage.width = heroBgCover(el).width;
            cloneImage.height = heroBgCover(el).height;
            cloneImage.x = heroBgCover(el).x;
            cloneImage.y = heroBgCover(el).y;
            cloneImage.alpha = 0.5;
            let cloneContaner = new PIXI.Container();
            that.rootContainer.addChild(cloneContaner);
            if(app.mode == 'descktop'){
              cloneContaner.width = galleryEl.clientWidth + (325 * 2);
              cloneContaner.x = -galleryEl.clientWidth - 325;
            }else if(app.mode == 'tablet'){
              cloneContaner.width = galleryEl.clientWidth + (600 * 2);
              cloneContaner.x = -(galleryEl.clientWidth - 600) - 1600;
            }else if(app.mode == 'mobile'){
              cloneContaner.width = galleryEl.clientWidth + (700 * 2);
              cloneContaner.x = -(galleryEl.clientWidth - 700) - 2000;
            }
            let cloneMask = that.mask.clone();
            //cloneMask.x = -galleryEl.clientWidth;
            cloneContaner.addChild(cloneMask);
            cloneContaner.addChild(cloneImage);
            cloneImage.mask = cloneMask;
            that.cloneMasks.push(cloneMask);
            that.cloneContainers.push(cloneContaner);
            that.cloneImages.push(cloneImage);
          } else if (i == 0) {
            let cloneImage = PIXI.Sprite.from(src);
            cloneImage.width = heroBgCover(el).width;
            cloneImage.height = heroBgCover(el).height;
            cloneImage.x = heroBgCover(el).x;
            cloneImage.y = heroBgCover(el).y;
            cloneImage.alpha = 0.5;
            let cloneContaner = new PIXI.Container();            
            that.rootContainer.addChild(cloneContaner);
            if(app.mode == 'descktop'){
              cloneContaner.width = galleryEl.clientWidth + (325 * 2);
              cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
            }else if(app.mode == 'tablet'){
              cloneContaner.width = galleryEl.clientWidth + (600 * 2);              
              cloneContaner.x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
            }else if(app.mode == 'mobile'){
              cloneContaner.width = galleryEl.clientWidth + (700 * 2);
              cloneContaner.x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
            }
            let cloneMask = that.mask.clone();
            //cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
            cloneContaner.addChild(cloneMask);            
            cloneContaner.addChild(cloneImage);
            cloneImage.mask = cloneMask;
            that.cloneMasks.push(cloneMask);            
            that.cloneContainers.push(cloneContaner);
            that.cloneImages.push(cloneImage);
          }
          that.containers.push(container);
          that.images.push(image);
          that.masks.push(mask);

        });
      });
      this.meetingsSlider.on('slideChangeTransitionStart', function () {
        let that = this;
        let x;
        if(app.mode == 'descktop'){
          x = this.el.clientWidth * this.realIndex;
        }else if(app.mode == 'tablet'){
          x = (this.el.clientWidth + 400) * this.realIndex;
        }else if(app.mode == 'mobile'){
          x = (this.el.clientWidth + 600) * this.realIndex;
        }
        if (this.realIndex > this.previousIndex) {
          this.images.forEach(function (el, i) {
            TweenMax.to(el, 0.8, {
              alpha: function () {
                return that.realIndex == i ? 0.7 : 0.5;
              }, ease: Power2.easeIn
            });
            let scale = el.scale;
            new TimelineMax()
              .to(el.skew, 0.5, { x: -0.6, ease: Power2.easeIn }, 'start')
              .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
              .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
              .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
          });
          new TimelineMax()
            .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: -34, scale: 1.2, ease: Power1.easeIn }, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
        } else {
          this.images.forEach(function (el, i) {
            TweenMax.to(el, 0.8, {
              alpha: function () {
                return that.realIndex == i ? 0.7 : 0.5;
              }, ease: Power2.easeIn
            });
            let scale = el.scale;
            new TimelineMax()
            .to(el.skew, 0.5, { x: 0.6, ease: Power2.easeIn }, 'start')
            .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
            .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
            .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
          });
          new TimelineMax()
            .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 34, scale: 1.2, ease: Power1.easeIn }, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
        }
      });      
      this.caseSlider.on('init', function () {
        const that = this;
        function heroBgCover(el) {
          let ratio = el.width / el.height;
          let size;
          if(app.mode == 'descktop'){
            size = (325 * 2);
          }else if(app.mode == 'tablet'){
            size = (600 * 2);
          }else if(app.mode == 'mobile'){
            size = (700 * 2);
          }
          if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
            return {
              width: (that.el.clientWidth + size),
              height: (that.el.clientWidth + size) / ratio,
              x: 0,
              y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
            }
          } else {
            return {
              width: that.el.clientHeight * ratio,
              height: that.el.clientHeight,
              x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
              y: 0
            }
          }
        }

        let galleryEl = this.el.closest('.single-slider');
        this.gallery = new PIXI.Application({
          width: galleryEl.clientWidth,
          height: galleryEl.clientHeight,
          backgroundColor: 0x000000
        });
        galleryEl.appendChild(this.gallery.view);
        this.rootContainer = new PIXI.Container();
        this.gallery.stage.addChild(this.rootContainer);
        this.containers = [];
        this.cloneContainers = [];
        this.images = [];
        this.cloneImages = [];
        this.masks = [];
        this.cloneMasks = [];

        this.mask = new PIXI.Graphics();
        this.mask.lineStyle(0);
        this.mask.beginFill(0xff0000, 1);
        if(app.mode == 'descktop'){
          this.mask.drawPolygon([650, 0, (galleryEl.clientWidth + 650), 0, (galleryEl.clientWidth), window.innerHeight, 0, window.innerHeight]);
        }else if(app.mode == 'tablet'){
          this.mask.drawPolygon([800, 0, (galleryEl.clientWidth + 1200), 0, (galleryEl.clientWidth + 1200 - 800), window.innerHeight, 0, window.innerHeight]);          
        }else if(app.mode == 'mobile'){
          this.mask.drawPolygon([800, 0, (galleryEl.clientWidth + 1400), 0, (galleryEl.clientWidth + 1400 - 800), window.innerHeight, 0, window.innerHeight]);
        }
        this.mask.endFill();

        this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          let container = new PIXI.Container();
          let image = PIXI.Sprite.from(src);
          let mask = that.mask.clone();          
          container.addChild(mask);          
          image.anchor.x = 0.5;
          image.anchor.y = 0.5;          
          image.width = heroBgCover(el).width;
          image.height = heroBgCover(el).height;          
          image.x = heroBgCover(el).x + (image.width / 2);
          image.y = heroBgCover(el).y + (image.height / 2);
          image.alpha = (i == 0 ? 0.7 : 0.5);
          if(app.mode == 'descktop'){
            container.width = galleryEl.clientWidth + (325 * 2);
            container.x = (galleryEl.clientWidth * i) - 325;
          }else if(app.mode == 'tablet'){
            container.width = galleryEl.clientWidth + (600 * 2);
            container.x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
          }else if(app.mode == 'mobile'){
            container.width = galleryEl.clientWidth + (700 * 2);
            container.x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
          }
          that.rootContainer.addChild(container);
          container.addChild(image);
          image.mask = mask;

          if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
            let cloneImage = PIXI.Sprite.from(src);
            cloneImage.width = heroBgCover(el).width;
            cloneImage.height = heroBgCover(el).height;
            cloneImage.x = heroBgCover(el).x;
            cloneImage.y = heroBgCover(el).y;
            cloneImage.alpha = 0.5;
            let cloneContaner = new PIXI.Container();
            that.rootContainer.addChild(cloneContaner);
            if(app.mode == 'descktop'){
              cloneContaner.width = galleryEl.clientWidth + (325 * 2);
              cloneContaner.x = -galleryEl.clientWidth - 325;
            }else if(app.mode == 'tablet'){
              cloneContaner.width = galleryEl.clientWidth + (600 * 2);
              cloneContaner.x = -(galleryEl.clientWidth - 600) - 1600;
            }else if(app.mode == 'mobile'){
              cloneContaner.width = galleryEl.clientWidth + (700 * 2);
              cloneContaner.x = -(galleryEl.clientWidth - 700) - 2000;
            }
            let cloneMask = that.mask.clone();
            //cloneMask.x = -galleryEl.clientWidth;
            cloneContaner.addChild(cloneMask);
            cloneContaner.addChild(cloneImage);
            cloneImage.mask = cloneMask;
            that.cloneMasks.push(cloneMask);
            that.cloneContainers.push(cloneContaner);
            that.cloneImages.push(cloneImage);
          } else if (i == 0) {
            let cloneImage = PIXI.Sprite.from(src);
            cloneImage.width = heroBgCover(el).width;
            cloneImage.height = heroBgCover(el).height;
            cloneImage.x = heroBgCover(el).x;
            cloneImage.y = heroBgCover(el).y;
            cloneImage.alpha = 0.5;
            let cloneContaner = new PIXI.Container();            
            that.rootContainer.addChild(cloneContaner);
            if(app.mode == 'descktop'){
              cloneContaner.width = galleryEl.clientWidth + (325 * 2);
              cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
            }else if(app.mode == 'tablet'){
              cloneContaner.width = galleryEl.clientWidth + (600 * 2);              
              cloneContaner.x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
            }else if(app.mode == 'mobile'){
              cloneContaner.width = galleryEl.clientWidth + (700 * 2);
              cloneContaner.x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
            }
            let cloneMask = that.mask.clone();
            //cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
            cloneContaner.addChild(cloneMask);            
            cloneContaner.addChild(cloneImage);
            cloneImage.mask = cloneMask;
            that.cloneMasks.push(cloneMask);            
            that.cloneContainers.push(cloneContaner);
            that.cloneImages.push(cloneImage);
          }
          that.containers.push(container);
          that.images.push(image);
          that.masks.push(mask);

        });
      });
      this.caseSlider.on('slideChangeTransitionStart', function () {
        let that = this;        
        let x;
        if(app.mode == 'descktop'){
          x = this.el.clientWidth * this.realIndex;
        }else if(app.mode == 'tablet'){
          x = (this.el.clientWidth + 400) * this.realIndex;
        }else if(app.mode == 'mobile'){
          x = (this.el.clientWidth + 600) * this.realIndex;
        }
        if (this.realIndex > this.previousIndex) {
          this.images.forEach(function (el, i) {
            TweenMax.to(el, 0.8, {
              alpha: function () {
                return that.realIndex == i ? 0.7 : 0.5;
              }, ease: Power2.easeIn
            });
            let scale = el.scale;
            new TimelineMax()
              .to(el.skew, 0.5, { x: -0.6, ease: Power2.easeIn }, 'start')
              .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
              .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
              .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
          });
          new TimelineMax()
            .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: -34, scale: 1.2, ease: Power1.easeIn }, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
        } else {
          this.images.forEach(function (el, i) {
            TweenMax.to(el, 0.8, {
              alpha: function () {
                return that.realIndex == i ? 0.7 : 0.5;
              }, ease: Power2.easeIn
            });
            let scale = el.scale;
            new TimelineMax()
            .to(el.skew, 0.5, { x: 0.6, ease: Power2.easeIn }, 'start')
            .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
            .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
            .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
          });
          new TimelineMax()
            .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 34, scale: 1.2, ease: Power1.easeIn }, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
        }
      });
      
      
    },    
    resize: function(){      
      meetingsResize(this.meetingsSlider);
      caseResize(this.caseSlider);
      function meetingsResize(slider){
        const that = slider;
        function heroBgCover(el) {
          let ratio = el.width / el.height;
          let size;
          if(app.mode == 'descktop'){
            size = (325 * 2);
          }else if(app.mode == 'tablet'){
            size = (600 * 2);
          }else if(app.mode == 'mobile'){
            size = (700 * 2);
          }
          if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
            return {
              width: (that.el.clientWidth + size),
              height: (that.el.clientWidth + size) / ratio,
              x: 0,
              y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
            }
          } else {
            return {
              width: that.el.clientHeight * ratio,
              height: that.el.clientHeight,
              x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
              y: 0
            }
          }
        }
        let x;
          if(app.mode == 'descktop'){
            x = that.el.clientWidth * that.realIndex;
          }else if(app.mode == 'tablet'){
            x = (that.el.clientWidth + 400) * that.realIndex;
          }else if(app.mode == 'mobile'){
            x = (that.el.clientWidth + 600) * that.realIndex;
          }
        that.rootContainer.x = -x;
        let galleryEl = that.el.closest('.single-slider');
        that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
        setTimeout(function(){
          that.images.forEach(function(el, i){        
            el.width = heroBgCover(el.texture).width;
            el.height = heroBgCover(el.texture).height;
            el.x = heroBgCover(el).x + (el.width / 2);
            el.y = heroBgCover(el).y + (el.height / 2);
            if(app.mode == 'descktop'){
              that.containers[i].width = galleryEl.clientWidth + (325 * 2);
              that.containers[i].x = (galleryEl.clientWidth * i) - 325;
            }else if(app.mode == 'tablet'){
              that.containers[i].width = galleryEl.clientWidth + (600 * 2);
              that.containers[i].x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
            }else if(app.mode == 'mobile'){
              that.containers[i].width = galleryEl.clientWidth + (700 * 2);
              that.containers[i].x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
            }          
            that.masks[i].clear();
            that.masks[i].lineStyle(0);
            that.masks[i].beginFill(0xffffff, 0.5);          
            if(app.mode == 'descktop'){
              that.masks[i].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
            }else if(app.mode == 'tablet'){
              that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
            }else if(app.mode == 'mobile'){
              that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
            }
            that.masks[i].endFill();
          });
          that.cloneImages.forEach(function(el, i){
              el.width = heroBgCover(el.texture).width;
              el.height = heroBgCover(el.texture).height;
              el.x = heroBgCover(el).x + (el.width / 2);
              el.y = heroBgCover(el).y + (el.height / 2);
              if(i == 0){
                that.cloneImages[0].width = heroBgCover(that.cloneImages[0].texture).width;
                that.cloneImages[0].height = heroBgCover(that.cloneImages[0].texture).height;
                that.cloneImages[0].x = heroBgCover(that.cloneImages[0].texture).x;
                that.cloneImages[0].y = heroBgCover(that.cloneImages[0].texture).y;
                if(app.mode == 'descktop'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                }else if(app.mode == 'tablet'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (600 * 2);              
                  that.cloneContainers[0].x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }else if(app.mode == 'mobile'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (700 * 2);
                  that.cloneContainers[0].x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }              
                that.cloneMasks[0].clear();
                that.cloneMasks[0].lineStyle(0);
                that.cloneMasks[0].beginFill(0xff0000, 0.5);
                if(app.mode == 'descktop'){
                  that.cloneMasks[0].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                }else if(app.mode == 'tablet'){
                  that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                }else if(app.mode == 'mobile'){
                  that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                }
                that.cloneMasks[0].endFill();            
              }else {            
                that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                if(app.mode == 'descktop'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[1].x = -galleryEl.clientWidth - 325;
                }else if(app.mode == 'tablet'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (600 * 2);
                  that.cloneContainers[1].x = -(galleryEl.clientWidth - 600) - 1600;
                }else if(app.mode == 'mobile'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (700 * 2);
                  that.cloneContainers[1].x = -(galleryEl.clientWidth - 700) - 2000;
                }              
                that.cloneMasks[1].clear();
                that.cloneMasks[1].lineStyle(0);
                that.cloneMasks[1].beginFill(0xff0000, 1);
                if(app.mode == 'descktop'){
                  that.cloneMasks[1].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                }else if(app.mode == 'tablet'){
                  that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                }else if(app.mode == 'mobile'){
                  that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                }
                that.cloneMasks[1].endFill();              
              }
          });
          
        }, 100);
      };
      function caseResize(slider){
        const that = slider;
        function heroBgCover(el) {
          let ratio = el.width / el.height;
          let size;
          if(app.mode == 'descktop'){
            size = (325 * 2);
          }else if(app.mode == 'tablet'){
            size = (600 * 2);
          }else if(app.mode == 'mobile'){
            size = (700 * 2);
          }
          if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
            return {
              width: (that.el.clientWidth + size),
              height: (that.el.clientWidth + size) / ratio,
              x: 0,
              y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
            }
          } else {
            return {
              width: that.el.clientHeight * ratio,
              height: that.el.clientHeight,
              x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
              y: 0
            }
          }
        }
        let x;
          if(app.mode == 'descktop'){
            x = that.el.clientWidth * that.realIndex;
          }else if(app.mode == 'tablet'){
            x = (that.el.clientWidth + 400) * that.realIndex;
          }else if(app.mode == 'mobile'){
            x = (that.el.clientWidth + 600) * that.realIndex;
          }
        that.rootContainer.x = -x;
        let galleryEl = that.el.closest('.single-slider');
        that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
        setTimeout(function(){
          that.images.forEach(function(el, i){        
            el.width = heroBgCover(el.texture).width;
            el.height = heroBgCover(el.texture).height;
            el.x = heroBgCover(el).x + (el.width / 2);
            el.y = heroBgCover(el).y + (el.height / 2);
            if(app.mode == 'descktop'){
              that.containers[i].width = galleryEl.clientWidth + (325 * 2);
              that.containers[i].x = (galleryEl.clientWidth * i) - 325;
            }else if(app.mode == 'tablet'){
              that.containers[i].width = galleryEl.clientWidth + (600 * 2);
              that.containers[i].x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
            }else if(app.mode == 'mobile'){
              that.containers[i].width = galleryEl.clientWidth + (700 * 2);
              that.containers[i].x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
            }          
            that.masks[i].clear();
            that.masks[i].lineStyle(0);
            that.masks[i].beginFill(0xffffff, 0.5);          
            if(app.mode == 'descktop'){
              that.masks[i].drawPolygon([650, 0, (galleryEl.clientWidth + 650), 0, (galleryEl.clientWidth), window.innerHeight, 0, window.innerHeight]);
            }else if(app.mode == 'tablet'){
              that.masks[i].drawPolygon([800, 0, (galleryEl.clientWidth + 1200), 0, (galleryEl.clientWidth + 1200 - 800), window.innerHeight, 0, window.innerHeight]);          
            }else if(app.mode == 'mobile'){
              that.masks[i].drawPolygon([800, 0, (galleryEl.clientWidth + 1400), 0, (galleryEl.clientWidth + 1400 - 800), window.innerHeight, 0, window.innerHeight]);
            }
            that.masks[i].endFill();
          });
          that.cloneImages.forEach(function(el, i){
              el.width = heroBgCover(el.texture).width;
              el.height = heroBgCover(el.texture).height;
              el.x = heroBgCover(el).x + (el.width / 2);
              el.y = heroBgCover(el).y + (el.height / 2);
              if(i == 0){
                that.cloneImages[0].width = heroBgCover(that.cloneImages[0].texture).width;
                that.cloneImages[0].height = heroBgCover(that.cloneImages[0].texture).height;
                that.cloneImages[0].x = heroBgCover(that.cloneImages[0].texture).x;
                that.cloneImages[0].y = heroBgCover(that.cloneImages[0].texture).y;
                if(app.mode == 'descktop'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                }else if(app.mode == 'tablet'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (600 * 2);              
                  that.cloneContainers[0].x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }else if(app.mode == 'mobile'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (700 * 2);
                  that.cloneContainers[0].x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }              
                that.cloneMasks[0].clear();
                that.cloneMasks[0].lineStyle(0);
                that.cloneMasks[0].beginFill(0xff0000, 0.5);
                if(app.mode == 'descktop'){
                  that.cloneMasks[0].drawPolygon([650, 0, (galleryEl.clientWidth + 650), 0, (galleryEl.clientWidth), window.innerHeight, 0, window.innerHeight]);
                }else if(app.mode == 'tablet'){
                  that.cloneMasks[0].drawPolygon([800, 0, (galleryEl.clientWidth + 1200), 0, (galleryEl.clientWidth + 1200 - 800), window.innerHeight, 0, window.innerHeight]);          
                }else if(app.mode == 'mobile'){
                  that.cloneMasks[0].drawPolygon([800, 0, (galleryEl.clientWidth + 1400), 0, (galleryEl.clientWidth + 1400 - 800), window.innerHeight, 0, window.innerHeight]);
                }
                that.cloneMasks[0].endFill();            
              }else {            
                that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                if(app.mode == 'descktop'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[1].x = -galleryEl.clientWidth - 325;
                }else if(app.mode == 'tablet'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (600 * 2);
                  that.cloneContainers[1].x = -(galleryEl.clientWidth - 600) - 1600;
                }else if(app.mode == 'mobile'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (700 * 2);
                  that.cloneContainers[1].x = -(galleryEl.clientWidth - 700) - 2000;
                }              
                that.cloneMasks[1].clear();
                that.cloneMasks[1].lineStyle(0);
                that.cloneMasks[1].beginFill(0xff0000, 1);
                if(app.mode == 'descktop'){
                  that.cloneMasks[1].drawPolygon([650, 0, (galleryEl.clientWidth + 650), 0, (galleryEl.clientWidth), window.innerHeight, 0, window.innerHeight]);
                }else if(app.mode == 'tablet'){
                  that.cloneMasks[1].drawPolygon([800, 0, (galleryEl.clientWidth + 1200), 0, (galleryEl.clientWidth + 1200 - 800), window.innerHeight, 0, window.innerHeight]);          
                }else if(app.mode == 'mobile'){
                  that.cloneMasks[1].drawPolygon([800, 0, (galleryEl.clientWidth + 1400), 0, (galleryEl.clientWidth + 1400 - 800), window.innerHeight, 0, window.innerHeight]);
                }
                that.cloneMasks[1].endFill();              
              }
          });
          
        }, 100);
      }

      
    }      
  };

  this.inquirer = {
    slides: null,
    current: 1,
    init: function(){
      let that = this;
      this.slides = document.querySelectorAll('.business__select_slider .slide').length;
      document.querySelector('.business__select_slider .pagination').innerText = this.current+'/'+this.slides;
      document.querySelectorAll('.business__select .custom-select .select--label').forEach(function(el, i){
        el.addEventListener('click', that.onActive);
      });
      document.querySelectorAll('.business__select .custom-select .select--options input[type="radio"]').forEach(function(el, i){
        el.addEventListener('change', that.onChange);        
      });
      document.querySelector('.business__select [data-action]').addEventListener('click', this.onNext);
      TweenMax.set('.business__select_slider [data-slide="1"]', {display: 'block'});
      TweenMax.set('.business__select [data-action="next"]', {opacity: 0});

    },
    onActive: function(e){
      let target = e.currentTarget.closest('.custom-select');
      let active = target.classList.contains('active');
      if(active){
        new TimelineMax().to(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut})
          .set(target.querySelector('.select--options'), {clearProps: 'all'});
        target.classList.remove('active');
      }else{        
        new TimelineMax().set(target.querySelector('.select--options'), {display: 'block'})
          .from(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut});
        target.classList.add('active');          
      }      
    },
    onChange: function(e){
      let that = this;
      let target = e.target.closest('.custom-select');
      let text = e.target.closest('li').querySelector('span').innerText;
      target.querySelector('.select--label span').innerText = text;
      TweenMax.to('.business__select [data-action="next"]', 0.6, {opacity: 1});
      new TimelineMax().to(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut})
          .set(target.querySelector('.select--options'), {clearProps: 'all'});
        target.classList.remove('active');
      
    },
    onNext: function(e){
      const that = app.business.inquirer;
      let next = (that.current+1);      
      if(that.current < that.slides){
        if(!document.querySelectorAll('.business__select_slider [data-slide="'+that.current+'"] input[type="radio"]:checked').length)return;
        new TimelineMax()
        .set('.business__select_slider', {overflow: 'hidden'})
        .to('.business__select_slider [data-slide="'+that.current+'"]', 0.6, {x: '-100%', opacity: 0, ease: Power3.easeIn})
        .set('.business__select_slider [data-slide="'+that.current+'"]', {clearProps: 'all'})
        .add(function(){          
          that.current++;
          document.querySelector('.business__select_slider .pagination').innerText = that.current+'/'+that.slides;
          TweenMax.to('.business__select [data-action="next"]', 0.6, {opacity: 0});
        })
        .set('.business__select_slider [data-slide="'+next+'"]', {display: 'block'})
        .from('.business__select_slider [data-slide="'+next+'"]', 0.6, {x: '100%', opacity: 0, ease: Power3.easeOut})
        .set('.business__select_slider', {clearProps: 'all'})
        .add(function(){
          if(that.current == that.slides){
            document.querySelector('.business__select [data-action] span').innerText = 'Submit';
          }
        })
      }else{
        let h = document.querySelector('.business__select_slider [data-slide="'+that.current+'"]').clientHeight;        
        new TimelineMax()
          .set('.business__select_slider .thank', {height: h})
          .set('.business__select_slider', {overflow: 'hidden'})
          .to('.business__select_slider [data-slide="'+that.current+'"]', 0.6, {x: '-100%', opacity: 0, ease: Power3.easeIn})
          .to('.business__select_slider .pagination, .business__select [data-action]', 0.6, {opacity: 0}, '-=0.6')
          .set('.business__select_slider [data-slide="'+that.current+'"]', {clearProps: 'all'})
          .set('.business__select_slider .thank', {display: 'flex'})
          .from('.business__select_slider .thank', 0.6, {x: '100%', opacity: 0, ease: Power3.easeOut})
          .set('.business__select_slider', {clearProps: 'all'})
      }
    }
  };

  this.cursor = {
    init: function () {
      TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
      document.body.addEventListener('mousemove', function (e) {
        TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
      });      
    }
  };

  this.aosInit = function() {
    console.log('aosInit');
    AOS.init({
      offset: 300,
      once: true
    });
    TweenMax.set('.homepage__tabs_list span', {opacity: 0});    
    TweenMax.set(document.querySelectorAll('.single-slider .swiper-slide-active .slide--content h2, .single-slider .swiper-slide-active .slide--content .slide--text, .single-slider .swiper-slide-active .slide--content .slide--nav'), {opacity: 0, y: 100});
    TweenMax.set('.single-slider .slider-control', {opacity: 0, scale: 1.3});            
    TweenMax.set('.homepage__insta');
    TweenMax.set('.homepage__insta h2 span', {rotationX: 90, opacity: 0});
    TweenMax.set('.expert__form h2 span', { rotationX: 90, opacity: 0});
    TweenMax.set('.business__select h2 span', { rotationX: 90, opacity: 0});
    TweenMax.set('.business__select .description--text', { y: 50, opacity: 0});
    TweenMax.set('.business__select .business__select_slider', { y: 50, opacity: 0});
    
    
    
    

    document.addEventListener('aos:in', function (e) {      
      if (e.detail.classList.contains('homepage__tabs')) {
        new TimelineMax().staggerTo(document.querySelectorAll('.homepage__tabs_list span'), 2, { opacity: 1 }, 0.1)
          .add(function () {
            root.tabs.show = true;
          });
      }      
      if (e.detail.classList.contains('single-slider') && e.detail.classList.contains('meetings')) {
        new TimelineMax()
          .staggerTo(document.querySelectorAll('.single-slider.meetings .swiper-slide-active .slide--content h2, .single-slider.meetings .swiper-slide-active .slide--content .slide--text, .single-slider.meetings .swiper-slide-active .slide--content .slide--nav'), 0.8, {opacity: 1, y: 0, ease: Power2.easeOut}, 0.2)
          .to('.single-slider.meetings .slider-control', 1, {opacity: 1, scale: 1}, '-=0.5');
      }
      if (e.detail.classList.contains('single-slider') && e.detail.classList.contains('case')) {
        new TimelineMax()
          .staggerTo(document.querySelectorAll('.single-slider.case .swiper-slide-active .slide--content h2, .single-slider.case .swiper-slide-active .slide--content .slide--text, .single-slider.case .swiper-slide-active .slide--content .slide--nav'), 0.8, {opacity: 1, y: 0, ease: Power2.easeOut}, 0.2)
          .to('.single-slider.case .slider-control', 1, {opacity: 1, scale: 1}, '-=0.5');
      }            
      if (e.detail.classList.contains('business__select')) {
        new TimelineMax()
          .to('.business__select h2 span', 1, { rotationX: 0, opacity: 1, ease: Power2.easeOut })
          .to('.business__select .description--text', 1, {y: 0, opacity: 1, ease: Power2.easeOut })
          .to('.business__select .business__select_slider', 1, {y: 0, opacity: 1, ease: Power2.easeOut }, '-=0.7')
      }
      if (e.detail.classList.contains('expert__form')) {
        TweenMax.to('.expert__form h2 span', 1.5, { rotationX: 0, opacity: 1, ease: Power3.easeOut });
      }
    });
  };

  this.eventsInit = function () {
    const that = this;    
    window.addEventListener('scroll', function (e) {
      let scrollTop = window.pageYOffset;
      header(e);      
    });
    window.addEventListener('resize', function(){
      heightUpdate();
      that.hero.resize();
      that.sliders.resize();
    });
    window.addEventListener('orientationchange', function(e){
      setTimeout(function(){
        heightUpdate();
        that.hero.resize();
        that.sliders.resize();
      }, 100);
    });
    document.addEventListener('click', function(e){
      if(!e.target.closest('.custom-select') && document.querySelectorAll('.custom-select.active').length){
        new TimelineMax().to(document.querySelector('.custom-select.active .select--options'), 0.4, {height: 0, ease: Power2.easeInOut})
          .set(document.querySelectorAll('.custom-select.active .select--options'), {clearProps: 'all'});
          document.querySelector('.custom-select.active').classList.remove('active');
      }
    });
    
    
    document.querySelectorAll('.slider-button-prev, .slider-button-next').forEach(function (el, i) {
      el.addEventListener('mouseenter', function (e) {        
        if (this.classList.contains('swiper-button-disabled')) return;
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
        //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#ee412a', ease: Power3.easeOut });        
        if (this.closest('.catalog__slider')){
          TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#ee412a', ease: Power3.easeOut });
        }
      });
      el.addEventListener('mouseleave', function (e) {        
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeIn });
        TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeIn });
        //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#fff', ease: Power3.easeOut });        
        if (this.closest('.catalog__slider')){
          TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#fff', ease: Power3.easeIn });
        }        
      });
    });

  }

  this.loader.init(); 
};

/* ==============================================================
                          DEFAULT INIT
   ============================================================== */
const _default = function () {
  const root = this;

  this.loader = {
    progress: 0,
    resources: 0,
    resourcesDone: 0,
    loaderReady: false,
    scripts:
      [         
        //'pixiFilters'
      ],    
    resourcesDone: 0,
    init: function () {
      let that = this;

      window.scrollTo(0, 0);

      TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
      TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
      TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
      
      this.resources += document.querySelectorAll('img[data-src]').length        
        + this.scripts.length;

      document.querySelectorAll('img[data-src]').forEach(function (el, i) {
        let src = el.getAttribute('data-src');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          el.src = src;
          that.resourcesDone++;
          that.loading();
        }
      });      
    },
    loading: function () {
      const that = this;      
      if (this.resources == this.resourcesDone) {
        let tl = new TimelineMax();
        tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
        .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
        .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
        .add(function(){          
          root.eventsInit();          
          root.cursor.init();
          app.globalEvents();
        })
        .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
        .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
        .add(function(){
          that.loaded();
        });
        
      }
    },
    loaded: function () {
      const that = this;      
      new TimelineMax()
      .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
      .add(function(){        
        document.querySelector('.loader').remove();
        TweenMax.set('body', { overflow: 'auto' });        
      })      
    },
  };

  this.cursor = {
    init: function () {
      TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
      document.body.addEventListener('mousemove', function (e) {
        TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
      });      
    }
  };

  this.eventsInit = function () {
    const that = this;    
    window.addEventListener('scroll', function (e) {
      let scrollTop = window.pageYOffset;
      header(e);      
    });
    window.addEventListener('resize', function(){
      heightUpdate();      
    });
  }

  this.loader.init(); 
};

/* ==============================================================
                          CONTACTS INIT
   ============================================================== */
   const _contacts = function () {
    const root = this;    
  
    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [         
          'map'
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;
  
        window.scrollTo(0, 0);
  
        TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;
  
        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });
  
        this.scripts.forEach(function (n) {
          let src = app.resours[n];
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {          
            that.resourcesDone++;
            that.loading();
          }
        });
      },
      loading: function () {
        const that = this;      
        if (this.resources == this.resourcesDone) {
          let tl = new TimelineMax();
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
          .add(function(){          
            root.eventsInit();          
            root.cursor.init();
            root.map.init();
            app.globalEvents();
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
          .add(function(){
            that.loaded();
          });
          
        }
      },
      loaded: function () {
        const that = this;      
        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });        
        })      
      },
    };

    this.map = {      
      init: function(){
          var myLatLong = { lat: 49.839683, lng: 24.029717 };
          map = new google.maps.Map(document.getElementById("map"), {
            center: myLatLong,
            zoom: 15,
            marker: true,
            scrollwheel: false,
            mapTypeControl: false,
            streetViewControl: false
          });
          const marker = new google.maps.Marker({
            position: myLatLong,
            map,
            title: "Avialiga",
            icon: {
              url:"./img/icon_map-marker.svg"
            }
          });
      }
    }
  
    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };
  
    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();      
      });
    }
  
    this.loader.init(); 
  };

/* ==============================================================
                          CASES INIT
   ============================================================== */
const _cases = function () {
  const root = this;  
  this.loader = {
    progress: 0,
    resources: 0,
    resourcesDone: 0,
    loaderReady: false,
    scripts:
      [         
        //'pixiFilters'
      ],    
    resourcesDone: 0,
    init: function () {
      let that = this;

      window.scrollTo(0, 0);

      TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
      TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
      TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
      
      this.resources += document.querySelectorAll('img[data-src]').length        
        + this.scripts.length;

      document.querySelectorAll('img[data-src]').forEach(function (el, i) {
        let src = el.getAttribute('data-src');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          el.src = src;
          that.resourcesDone++;
          that.loading();
        }
      });

      this.scripts.forEach(function (n) {        
        let src = './js/lib/' + app.resours[n];
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = function () {          
          that.resourcesDone++;
          that.loading();
        }
      });      
    },
    loading: function () {
      const that = this;      
      if(this.resources == this.resourcesDone) {
        let tl = new TimelineMax();
        tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
        .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
        .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
        .add(function(){          
          root.tabs.init();      
          root.cursor.init();
          root.eventsInit();
          app.globalEvents();          
        })
        .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
        .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
        .add(function(){
          that.loaded();
        });
        
      }
    },
    loaded: function () {
      const that = this;      
      new TimelineMax()
      .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
      .add(function(){        
        document.querySelector('.loader').remove();
        TweenMax.set('body', { overflow: 'auto' });        
      })
    },
  };

  this.tabs = {
    init: function(){
      const that = this;      
      let width = (100/document.querySelectorAll('.nav__tabs li').length);
      TweenMax.set(document.querySelectorAll('.nav__tabs li'), {width: width+'%'});
      document.querySelector('.nav__tabs li:first-child').classList.add('current');
      TweenMax.set('.tabs__list > li:first-child', {display: 'block'});
      let current = document.querySelector('.nav__tabs ul li.current span').innerText;
      document.querySelector('.nav__tabs .nav__tabs_title').innerText = current;
      console.log(current);
      document.querySelectorAll('.nav__tabs li').forEach(function(el, i){
        el.addEventListener('click', that.onClick);
        el.addEventListener('mouseenter', that.onHover);
        el.addEventListener('mouseleave', that.onHover);
      });
      document.querySelector('.nav__tabs_title').addEventListener('click', function(e){
        let active = this.classList.contains('active');
        if(!active){
          TweenMax.set('.nav__tabs ul', {display: 'flex'});
          TweenMax.from('.nav__tabs ul', 0.6, {height: 0, ease: Power3.easeInOut});
          this.classList.add('active');
        }else{          
          TweenMax.to('.nav__tabs ul', 0.6, {height: 0, ease: Power3.easeInOut, onComplete(){
            TweenMax.set('.nav__tabs ul', {clearProps: 'all'});
          }});
          this.classList.remove('active');
        }
        console.log(active);
      });
    },
    onClick: function(e){
      if(e.currentTarget.classList.contains('current'))return;
      let target = e.currentTarget.getAttribute('data-target');
      let current = document.querySelector('.nav__tabs li.current').getAttribute('data-target');
      let text = this.querySelector('span').innerText;
      console.log(text);
      document.querySelector('.nav__tabs_title').innerText = text;
      document.querySelector('.nav__tabs li.current').classList.remove('current');
      e.currentTarget.classList.add('current');      

      TweenMax.set(this.querySelector('i'), { transformOrigin: '0 0' });
      TweenMax.to('.nav__tabs [data-target="'+current+'"] span', 0.5, { color: '#ee412a', ease: Power2.easeOut });
      TweenMax.to(this.querySelector('span'), 0.5, { color: '#fff', ease: Power2.easeOut });
      TweenMax.to(this.querySelector('i'), 0.5, { scaleY: 0, ease: Power2.easeOut });
      TweenMax.to('.cursor span', 0.5, { scale: 1});

      new TimelineMax()
        .to('.tabs__list #'+current, 0.6, {opacity: 0, x: '-50%', ease: Power2.easeIn})
        .set('.tabs__list #'+current, {clearProps: 'all'})
        .set('.tabs__list #'+target, {display: 'block'})
        .from('.tabs__list #'+target, 0.6, {opacity: 0, x: '50%', ease: Power2.easeOut})
    },
    onHover: function(e){
      if(e.type == 'mouseenter'){
        TweenMax.to('.cursor .circle', 0.5, {backgroundColor: '#fff'});
      }else{
        TweenMax.to('.cursor .circle', 0.5, {backgroundColor: '#ee412a'});
      }
    }
  };

  this.cursor = {
    init: function () {
      TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
      document.body.addEventListener('mousemove', function (e) {
        TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
      });      
    }
  };

  this.eventsInit = function () {
    const that = this;    
    window.addEventListener('scroll', function (e) {
      let scrollTop = window.pageYOffset;      
      header(e);      
    });
    window.addEventListener('resize', function(){
      heightUpdate();      
    });
  }

  this.loader.init(); 
};

/* ==============================================================
                          NEWS INIT
   ============================================================== */
  const _news = function () {
    const root = this;  
    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [         
          //'pixiFilters'
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;
  
        window.scrollTo(0, 0);
  
        TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;
  
        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });
  
        this.scripts.forEach(function (n) {        
          let src = './js/lib/' + app.resours[n];
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {          
            that.resourcesDone++;
            that.loading();
          }
        });      
      },
      loading: function () {
        const that = this;      
        if(this.resources == this.resourcesDone) {
          let tl = new TimelineMax();
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
          .add(function(){          
            root.tabs.init();      
            root.cursor.init();
            root.eventsInit();
            app.globalEvents();          
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
          .add(function(){
            that.loaded();
          });
          
        }
      },
      loaded: function () {
        const that = this;        
        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });        
        })
      },
    };
  
    this.tabs = {
      init: function(){
        const that = this;
        document.querySelector('.nav__tabs li:first-child').classList.add('current');
        TweenMax.set('.tabs__list > li:first-child', {display: 'block'});
        document.querySelectorAll('.nav__tabs li').forEach(function(el, i){
          el.addEventListener('click', that.onClick);
          el.addEventListener('mouseenter', that.onHover);
          el.addEventListener('mouseleave', that.onHover);
        });      
      },
      onClick: function(e){
        if(e.currentTarget.classList.contains('current'))return;
        let target = e.currentTarget.getAttribute('data-target');
        let current = document.querySelector('.nav__tabs li.current').getAttribute('data-target');
        document.querySelector('.nav__tabs li.current').classList.remove('current');
        e.currentTarget.classList.add('current');      
  
        
  
        TweenMax.set(this.querySelector('i'), { transformOrigin: '0 0' });
        TweenMax.to('.nav__tabs [data-target="'+current+'"] span', 0.5, { color: '#ee412a', ease: Power2.easeOut });
        TweenMax.to(this.querySelector('span'), 0.5, { color: '#fff', ease: Power2.easeOut });
        TweenMax.to(this.querySelector('i'), 0.5, { scaleY: 0, ease: Power2.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 1});
  
        new TimelineMax()
          .to('.tabs__list #'+current, 0.6, {opacity: 0, x: '-50%', ease: Power2.easeIn})
          .set('.tabs__list #'+current, {clearProps: 'all'})
          .set('.tabs__list #'+target, {display: 'block'})
          .from('.tabs__list #'+target, 0.6, {opacity: 0, x: '50%', ease: Power2.easeOut})
      },
      onHover: function(e){
        if(e.type == 'mouseenter'){
          TweenMax.to('.cursor .circle', 0.5, {backgroundColor: '#fff'});
        }else{
          TweenMax.to('.cursor .circle', 0.5, {backgroundColor: '#ee412a'});
        }
      }
    };
  
    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };
  
    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);
      });
      window.addEventListener('resize', function(){
        heightUpdate();      
      });
    }
  
    this.loader.init(); 
  }

  /* ==============================================================
                          SPA INIT
   ============================================================== */
const _spa = function () {
  const root = this;  
  this.loader = {
    progress: 0,
    resources: 0,
    resourcesDone: 0,
    loaderReady: false,
    scripts:
      [         
        //'pixiFilters'
      ],    
    resourcesDone: 0,
    init: function () {
      let that = this;

      window.scrollTo(0, 0);

      TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
      TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
      TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
      
      this.resources += document.querySelectorAll('img[data-src]').length        
        + this.scripts.length;

      document.querySelectorAll('img[data-src]').forEach(function (el, i) {
        let src = el.getAttribute('data-src');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          el.src = src;
          that.resourcesDone++;
          that.loading();
        }
      });

      this.scripts.forEach(function (n) {        
        let src = './js/lib/' + app.resours[n];
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = function () {          
          that.resourcesDone++;
          that.loading();
        }
      });      
    },
    loading: function () {
      const that = this;      
      if(this.resources == this.resourcesDone) {
        let tl = new TimelineMax();
        tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
        .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
        .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
        .add(function(){
          root.cursor.init();
          root.eventsInit();
          app.globalEvents();
        })
        .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
        .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
        .add(function(){
          that.loaded();
        });
        
      }
    },
    loaded: function () {
      const that = this;        
      new TimelineMax()
      .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
      .add(function(){        
        document.querySelector('.loader').remove();
        TweenMax.set('body', { overflow: 'auto' });        
      })
      .from(document.querySelectorAll('.photo__hero h1 span'), 1, {rotationX: 90, opacity: 0, ease: Power2.easeOut }, '+=0.3')
      .from('.photo__hero .hero__description', 0.8, { opacity: 0, y: 50 }, '-=0.5')
      .from('header, .photo__hero .breadcrumb, .hero--scroll', 0.8, { opacity: 0 }, '-=0.5')
    },
  };    

  this.cursor = {
    init: function () {
      TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
      document.body.addEventListener('mousemove', function (e) {
        TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
      });      
    }
  };

  this.eventsInit = function () {
    const that = this;    
    window.addEventListener('scroll', function (e) {
      let scrollTop = window.pageYOffset;
      header(e);      
    });
    window.addEventListener('resize', function(){
      heightUpdate();      
    });
    document.querySelector('.catalog__filter .mobile--title').addEventListener('click', function(e){
      let target = e.currentTarget;
      let active = target.classList.contains('active');      
      if(active){
        TweenMax.to('.catalog__filter_nav', 0.3, {height: 0, onComplete: function(){
          TweenMax.set('.catalog__filter_nav', {clearProps: 'all'});
          target.classList.remove('active');
          document.querySelector('.catalog__filter_nav').classList.remove('show');
        }});
        TweenMax.to(document.querySelectorAll('.catalog__filter_nav li i'), 0.3, {rotation: 0, scale: 1})
        if(document.querySelectorAll('.catalog__filter_list .active').length){
          TweenMax.to(document.querySelector('.catalog__filter_list .active'), 0.3, {height: 0})
        }        
      }else{
        TweenMax.set('.catalog__filter_nav', {display: 'flex'});
        TweenMax.from('.catalog__filter_nav', 0.3, {height: 0, onComplete: function(){
          target.classList.add('active');
        }});
      }
    });
    document.querySelectorAll('.catalog__filter_nav li').forEach(function (el, i) {
      el.addEventListener('click', function (e) {
        let target = document.querySelector('.catalog__filter_list #' + e.currentTarget.getAttribute('data-target'));
        if (document.querySelectorAll('.catalog__filter_list .active').length) {
          TweenMax.to(document.querySelectorAll('.catalog__filter .catalog__filter_nav li i '), 0.3, {rotation: 90, scale: 1})
          let current = document.querySelector('.catalog__filter_list .active').id == e.currentTarget.getAttribute('data-target');          
          if(app.mode == 'descktop'){
            document.querySelector('.catalog__filter .mobile--title').classList.remove('active');            
            TweenMax.set('.catalog__filter_nav', {clearProps: 'all'});
            document.querySelector('.catalog__filter_nav').classList.remove('show');
          }
          TweenMax.to(document.querySelector('.catalog__filter_list .active'), 0.3, {
            height: 0, opacity: 0, onComplete: function () {
              TweenMax.set(document.querySelector('.catalog__filter_list .active'), { clearProps: "all" });
              document.querySelector('.catalog__filter_list .active').classList.remove('active');              
              if (!current) {
                TweenMax.set(target, {display: 'block' });
                TweenMax.to(el.querySelector('i'), 0.3, {rotation: -45, scale: 1.2})
                TweenMax.from(target, 0.3, {
                  height: 0, opacity: 0, onComplete: function () {
                    target.classList.add('active');
                    if(app.mode == 'descktop'){
                      document.querySelector('.catalog__filter_nav').classList.add('show');
                    }                    
                    document.querySelector('.catalog__filter .mobile--title').classList.add('active');
                  }
                });
              }
            }
          });
        } else {          
          TweenMax.to(el.querySelector('i'), 0.3, {rotation: -45, scale: 1.2})
          TweenMax.set(target, { display: 'block' });
          TweenMax.from(target, 0.3, {
            height: 0, opacity: 0, onComplete: function () {
              target.classList.add('active');
                if(app.mode == 'descktop'){
                  document.querySelector('.catalog__filter_nav').classList.add('show');
                }              
              document.querySelector('.catalog__filter .mobile--title').classList.add('active');
            }
          });
        }




      });
    });
  }

  this.loader.init(); 
}

  /* ==============================================================
                          RELAX INIT
   ============================================================== */
   const _relax = function () {
    const root = this;  
    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [         
          'swiper'
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;
  
        window.scrollTo(0, 0);
  
        TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;
  
        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });
  
        this.scripts.forEach(function (n) {        
          let src = './js/lib/' + app.resours[n];
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {          
            that.resourcesDone++;
            that.loading();
          }
        });      
      },
      loading: function () {
        const that = this;      
        if(this.resources == this.resourcesDone) {          
          let tl = new TimelineMax();
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
          .add(function(){
            root.eventsInit();
            root.cursor.init();
            root.sliders.init();
            app.globalEvents();
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
          .add(function(){
            that.loaded();
          });
          
        }
      },
      loaded: function () {
        const that = this;
        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });        
        })
        .from(document.querySelectorAll('.photo__hero h1 span'), 1, {rotationX: 90, opacity: 0, ease: Power2.easeOut }, '+=0.3')
        .from('.photo__hero .hero__description', 0.8, { opacity: 0, y: 50 }, '-=0.5')
        .from('header, .photo__hero .breadcrumb, .hero--scroll', 0.8, { opacity: 0 }, '-=0.5')
      },
    };    
  
    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };

    this.sliders = {
      singleSlider: null,
      catalogSlider: null,
      init: function(){
        this.catalogSlider = new Swiper('.catalog__slider .swiper-container', {
          // Optional parameters    
        speed: 800,
        //simulateTouch: false,        
        followFinger: false,
        slidesPerView: 3,
        spaceBetween: 60,
        // If we need pagination
        // pagination: {
        //   el: '.slider-pagination',
        //   type: 'fraction'
        // },
        // Navigation arrows
        navigation: {
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        },
        breakpoints: {
          992: {
            slidesPerView: 'auto'
          },
          576: {
            slidesPerView: 'auto',
            spaceBetween: 20,
          }
        }, 
        });
        this.events();        
      },
      events: function(){
        this.catalogSlider.on('slideChangeTransitionStart', function () {
          if (this.realIndex > this.previousIndex) {
            new TimelineMax()
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: -30, scale: 1.2, ease: Power1.easeIn})
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
          } else {
            new TimelineMax()
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 30, scale: 1.2, ease: Power1.easeIn})
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
          }
        });
      }
    }
  
    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();      
      });
      document.querySelectorAll('.slider-button-prev, .slider-button-next').forEach(function (el, i) {
        el.addEventListener('mouseenter', function (e) {        
          if (this.classList.contains('swiper-button-disabled')) return;
          TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
          TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
          //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#ee412a', ease: Power3.easeOut });        
          if (this.closest('.catalog__slider')){
            TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#ee412a', ease: Power3.easeOut });
          }
        });
        el.addEventListener('mouseleave', function (e) {        
          TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeIn });
          TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeIn });
          //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#fff', ease: Power3.easeOut });        
          if (this.closest('.catalog__slider')){
            TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#fff', ease: Power3.easeIn });
          }        
        });
      });
    }
  
    this.loader.init(); 
  }

  /* ==============================================================
                          BT INIT
   ============================================================== */
  const _bt = function () {
    const root = this;  
    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [         
          //'pixiFilters'
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;

        window.scrollTo(0, 0);

        TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;

        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });

        this.scripts.forEach(function (n) {        
          let src = './js/lib/' + app.resours[n];
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {          
            that.resourcesDone++;
            that.loading();
          }
        });      
      },
      loading: function () {
        const that = this;      
        if(this.resources == this.resourcesDone) {        
          let tl = new TimelineMax();
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
          .add(function(){
            root.cursor.init();
            root.eventsInit();
            app.globalEvents();
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
          .add(function(){
            that.loaded();
          });
          
        }
      },
      loaded: function () {
        const that = this;
        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });        
        })
        .from(document.querySelectorAll('.photo__hero h1 span'), 1, {rotationX: 90, opacity: 0, ease: Power2.easeOut }, '+=0.3')
        .from('.photo__hero .hero__description', 0.8, { opacity: 0, y: 50 }, '-=0.5')
        .from('header, .photo__hero .breadcrumb, .hero--scroll', 0.8, { opacity: 0 }, '-=0.5')
      },
    };    

    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };

    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();      
      });
      document.querySelectorAll('.catalog__filter_nav li').forEach(function (el, i) {
        el.addEventListener('click', function (e) {
          let target = document.querySelector('.catalog__filter_list #' + e.currentTarget.getAttribute('data-target'));
          if (document.querySelectorAll('.catalog__filter_list .active').length) {
            let current = document.querySelector('.catalog__filter_list .active').id == e.currentTarget.getAttribute('data-target');
            TweenMax.to(document.querySelector('.catalog__filter_list .active'), 0.3, {
              height: 0, opacity: 0, onComplete: function () {
                TweenMax.set(document.querySelector('.catalog__filter_list .active'), { clearProps: "all" });
                document.querySelector('.catalog__filter_list .active').classList.remove('active');
                if (!current) {
                  TweenMax.set(target, { display: 'block' });
                  TweenMax.from(target, 0.3, {
                    height: 0, opacity: 0, onComplete: function () {
                      target.classList.add('active');
                    }
                  });
                }
              }
            });
          } else {
            TweenMax.set(target, { display: 'block' });
            TweenMax.from(target, 0.3, {
              height: 0, opacity: 0, onComplete: function () {
                target.classList.add('active');
              }
            });
          }  
        });
      });
    }

    this.loader.init(); 
  }

  /* ==============================================================
                          SINGLE COUNTRY INIT
   ============================================================== */
   const _singleCountry = function () {
    const root = this;  
    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [         
          'pixi',          
          'swiper'          
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;

        window.scrollTo(0, 0);

        TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;

        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });

        this.scripts.forEach(function (n) {        
          let src = './js/lib/' + app.resours[n];
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {          
            that.resourcesDone++;
            that.loading();
          }
        });      
      },
      loading: function () {
        const that = this;      
        if(this.resources == this.resourcesDone) {          
          let tl = new TimelineMax();
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
          .add(function(){            
            root.sliders.init();        
            root.cursor.init();
            root.eventsInit();
            app.globalEvents();
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
          .add(function(){
            that.loaded();
          });
          
        }
      },
      loaded: function () {
        const that = this;        
        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){                  
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });
          root.sliders.resize();
        })
        .from(document.querySelectorAll('.photo__hero h1 span'), 1, {rotationX: 90, opacity: 0, ease: Power2.easeOut }, '+=0.3')
        .from('.photo__hero .hero__description p', 0.8, { opacity: 0, y: 50 }, '-=0.5')
        .from('.photo__hero .hero__description_info', 0.8, { opacity: 0, y: 50 }, '-=0.5')        
        .from('header, .photo__hero .breadcrumb, .hero--scroll', 0.8, { opacity: 0 }, '-=0.5')
      },
    };

    this.sliders = {
      singleSlider: null,
      catalogSlider: null,
      init: function(){
        this.singleSlider = new Swiper('.single-slider .swiper-container', {
          // Optional parameters
          init: false,
          speed: 1000,
          followFinger: false,
          //simulateTouch: false,        
          // If we need pagination
          pagination: {
            el: '.slider-pagination',
            type: 'fraction'
          },
          // Navigation arrows
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          }
        });      
        this.catalogSlider = new Swiper('.catalog__slider .swiper-container', {
          // Optional parameters    
          speed: 800,
          //simulateTouch: false,        
          followFinger: false,
          slidesPerView: 3,
          spaceBetween: 60,
          // If we need pagination
          // pagination: {
          //   el: '.slider-pagination',
          //   type: 'fraction'
          // },
          // Navigation arrows
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          },
          breakpoints: {
            992: {
              slidesPerView: 'auto'
            },
            576: {
              slidesPerView: 'auto',
              spaceBetween: 20,
            }
          }, 
        });
        this.events();
        this.singleSlider.init();
        
      },
      events: function(){
        this.singleSlider.on('init', function () {        
          const that = this;
          function heroBgCover(el) {
            let ratio = el.width / el.height;
            let size;
            if(app.mode == 'descktop'){
              size = (325 * 2);
            }else if(app.mode == 'tablet'){
              size = (600 * 2);
            }else if(app.mode == 'mobile'){
              size = (700 * 2);
            }
            if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
              return {
                width: (that.el.clientWidth + size),
                height: (that.el.clientWidth + size) / ratio,
                x: 0,
                y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
              }
            } else {
              return {
                width: that.el.clientHeight * ratio,
                height: that.el.clientHeight,
                x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
                y: 0
              }
            }
          }

          let galleryEl = this.el.closest('.single-slider');
          this.gallery = new PIXI.Application({
            width: galleryEl.clientWidth,
            height: galleryEl.clientHeight,
            backgroundColor: 0x000000
          });
          galleryEl.appendChild(this.gallery.view);
          this.rootContainer = new PIXI.Container();
          this.gallery.stage.addChild(this.rootContainer);
          this.containers = [];
          this.cloneContainers = [];
          this.images = [];
          this.cloneImages = [];
          this.masks = [];
          this.cloneMasks = [];

          this.mask = new PIXI.Graphics();
          this.mask.lineStyle(0);
          this.mask.beginFill(0xff0000, 1);
          if(app.mode == 'descktop'){
            this.mask.drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
          }else if(app.mode == 'tablet'){
            this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
          }else if(app.mode == 'mobile'){
            this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
          }
          this.mask.endFill();

          this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
            let src = el.getAttribute('data-src');
            let container = new PIXI.Container();
            let image = PIXI.Sprite.from(src);
            let mask = that.mask.clone();          
            container.addChild(mask);          
            image.anchor.x = 0.5;
            image.anchor.y = 0.5;          
            image.width = heroBgCover(el).width;
            image.height = heroBgCover(el).height;          
            image.x = heroBgCover(el).x + (image.width / 2);
            image.y = heroBgCover(el).y + (image.height / 2);
            image.alpha = (i == 0 ? 0.7 : 0.5);
            if(app.mode == 'descktop'){
              container.width = galleryEl.clientWidth + (325 * 2);
              container.x = (galleryEl.clientWidth * i) - 325;
            }else if(app.mode == 'tablet'){
              container.width = galleryEl.clientWidth + (600 * 2);
              container.x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
            }else if(app.mode == 'mobile'){
              container.width = galleryEl.clientWidth + (700 * 2);
              container.x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
            }
            that.rootContainer.addChild(container);
            container.addChild(image);
            image.mask = mask;
            

            if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
              let cloneImage = PIXI.Sprite.from(src);
              cloneImage.width = heroBgCover(el).width;
              cloneImage.height = heroBgCover(el).height;
              cloneImage.x = heroBgCover(el).x;
              cloneImage.y = heroBgCover(el).y;
              cloneImage.alpha = 0.5;
              let cloneContaner = new PIXI.Container();
              that.rootContainer.addChild(cloneContaner);
              if(app.mode == 'descktop'){
                cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                cloneContaner.x = -galleryEl.clientWidth - 325;
              }else if(app.mode == 'tablet'){
                cloneContaner.width = galleryEl.clientWidth + (600 * 2);
                cloneContaner.x = -(galleryEl.clientWidth - 600) - 1600;
              }else if(app.mode == 'mobile'){
                cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                cloneContaner.x = -(galleryEl.clientWidth - 700) - 2000;
              }
              let cloneMask = that.mask.clone();
              //cloneMask.x = -galleryEl.clientWidth;
              cloneContaner.addChild(cloneMask);
              cloneContaner.addChild(cloneImage);
              cloneImage.mask = cloneMask;
              that.cloneMasks.push(cloneMask);
              that.cloneContainers.push(cloneContaner);
              that.cloneImages.push(cloneImage);
            } else if (i == 0) {
              let cloneImage = PIXI.Sprite.from(src);
              cloneImage.width = heroBgCover(el).width;
              cloneImage.height = heroBgCover(el).height;
              cloneImage.x = heroBgCover(el).x;
              cloneImage.y = heroBgCover(el).y;
              cloneImage.alpha = 0.5;
              let cloneContaner = new PIXI.Container();            
              that.rootContainer.addChild(cloneContaner);
              if(app.mode == 'descktop'){
                cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
              }else if(app.mode == 'tablet'){
                cloneContaner.width = galleryEl.clientWidth + (600 * 2);              
                cloneContaner.x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
              }else if(app.mode == 'mobile'){
                cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                cloneContaner.x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
              }
              let cloneMask = that.mask.clone();
              //cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
              cloneContaner.addChild(cloneMask);            
              cloneContaner.addChild(cloneImage);
              cloneImage.mask = cloneMask;
              that.cloneMasks.push(cloneMask);            
              that.cloneContainers.push(cloneContaner);
              that.cloneImages.push(cloneImage);
            }
            that.containers.push(container);
            that.images.push(image);
            that.masks.push(mask);

          });
        });
        this.singleSlider.on('slideChangeTransitionStart', function () {
          let that = this;
          let x;
          if(app.mode == 'descktop'){
            x = this.el.clientWidth * this.realIndex;
          }else if(app.mode == 'tablet'){
            x = (this.el.clientWidth + 400) * this.realIndex;
          }else if(app.mode == 'mobile'){
            x = (this.el.clientWidth + 600) * this.realIndex;
          }
          if (this.realIndex > this.previousIndex) {
            this.images.forEach(function (el, i) {
              TweenMax.to(el, 0.8, {
                alpha: function () {
                  return that.realIndex == i ? 0.7 : 0.5;
                }, ease: Power2.easeIn
              });
              let scale = el.scale;
              new TimelineMax()
                .to(el.skew, 0.5, { x: -0.6, ease: Power2.easeIn }, 'start')
                .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
                .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
                .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
            });
            new TimelineMax()
              .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
              .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: -34, scale: 1.2, ease: Power1.easeIn }, 'start')
              .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
          } else {
            this.images.forEach(function (el, i) {
              TweenMax.to(el, 0.8, {
                alpha: function () {
                  return that.realIndex == i ? 0.7 : 0.5;
                }, ease: Power2.easeIn
              });
              let scale = el.scale;
              new TimelineMax()
              .to(el.skew, 0.5, { x: 0.6, ease: Power2.easeIn }, 'start')
              .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
              .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
              .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
            });
            new TimelineMax()
              .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
              .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 34, scale: 1.2, ease: Power1.easeIn }, 'start')
              .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
          }
        });
        this.catalogSlider.on('slideChangeTransitionStart', function () {
          if (this.realIndex > this.previousIndex) {
            new TimelineMax()
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: -30, scale: 1.2, ease: Power1.easeIn})
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
          } else {
            new TimelineMax()
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 30, scale: 1.2, ease: Power1.easeIn})
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
          }
        });        
      },    
      resize: function(){      
        const that = this.singleSlider;
        function heroBgCover(el) {
          let ratio = el.width / el.height;
          let size;
          if(app.mode == 'descktop'){
            size = (325 * 2);
          }else if(app.mode == 'tablet'){
            size = (600 * 2);
          }else if(app.mode == 'mobile'){
            size = (700 * 2);
          }
          if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
            return {
              width: (that.el.clientWidth + size),
              height: (that.el.clientWidth + size) / ratio,
              x: 0,
              y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
            }
          } else {
            return {
              width: that.el.clientHeight * ratio,
              height: that.el.clientHeight,
              x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
              y: 0
            }
          }
        }
        let x;
          if(app.mode == 'descktop'){
            x = that.el.clientWidth * that.realIndex;
          }else if(app.mode == 'tablet'){
            x = (that.el.clientWidth + 400) * that.realIndex;
          }else if(app.mode == 'mobile'){
            x = (that.el.clientWidth + 600) * that.realIndex;
          }
        that.rootContainer.x = -x;
        let galleryEl = that.el.closest('.single-slider');
        that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
        setTimeout(function(){
          that.images.forEach(function(el, i){        
            el.width = heroBgCover(el.texture).width;
            el.height = heroBgCover(el.texture).height;
            el.x = heroBgCover(el).x + (el.width / 2);
            el.y = heroBgCover(el).y + (el.height / 2);
            if(app.mode == 'descktop'){
              that.containers[i].width = galleryEl.clientWidth + (325 * 2);
              that.containers[i].x = (galleryEl.clientWidth * i) - 325;
            }else if(app.mode == 'tablet'){
              that.containers[i].width = galleryEl.clientWidth + (600 * 2);
              that.containers[i].x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
            }else if(app.mode == 'mobile'){
              that.containers[i].width = galleryEl.clientWidth + (700 * 2);
              that.containers[i].x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
            }          
            that.masks[i].clear();
            that.masks[i].lineStyle(0);
            that.masks[i].beginFill(0xffffff, 0.5);          
            if(app.mode == 'descktop'){
              that.masks[i].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
            }else if(app.mode == 'tablet'){
              that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
            }else if(app.mode == 'mobile'){
              that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
            }
            that.masks[i].endFill();
          });
          that.cloneImages.forEach(function(el, i){
              el.width = heroBgCover(el.texture).width;
              el.height = heroBgCover(el.texture).height;
              el.x = heroBgCover(el).x + (el.width / 2);
              el.y = heroBgCover(el).y + (el.height / 2);
              if(i == 0){
                that.cloneImages[0].width = heroBgCover(that.cloneImages[0].texture).width;
                that.cloneImages[0].height = heroBgCover(that.cloneImages[0].texture).height;
                that.cloneImages[0].x = heroBgCover(that.cloneImages[0].texture).x;
                that.cloneImages[0].y = heroBgCover(that.cloneImages[0].texture).y;
                if(app.mode == 'descktop'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                }else if(app.mode == 'tablet'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (600 * 2);              
                  that.cloneContainers[0].x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }else if(app.mode == 'mobile'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (700 * 2);
                  that.cloneContainers[0].x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }              
                that.cloneMasks[0].clear();
                that.cloneMasks[0].lineStyle(0);
                that.cloneMasks[0].beginFill(0xff0000, 0.5);
                if(app.mode == 'descktop'){
                  that.cloneMasks[0].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                }else if(app.mode == 'tablet'){
                  that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                }else if(app.mode == 'mobile'){
                  that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                }
                that.cloneMasks[0].endFill();            
              }else {            
                that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                if(app.mode == 'descktop'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[1].x = -galleryEl.clientWidth - 325;
                }else if(app.mode == 'tablet'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (600 * 2);
                  that.cloneContainers[1].x = -(galleryEl.clientWidth - 600) - 1600;
                }else if(app.mode == 'mobile'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (700 * 2);
                  that.cloneContainers[1].x = -(galleryEl.clientWidth - 700) - 2000;
                }              
                that.cloneMasks[1].clear();
                that.cloneMasks[1].lineStyle(0);
                that.cloneMasks[1].beginFill(0xff0000, 1);
                if(app.mode == 'descktop'){
                  that.cloneMasks[1].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                }else if(app.mode == 'tablet'){
                  that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                }else if(app.mode == 'mobile'){
                  that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                }
                that.cloneMasks[1].endFill();              
              }
          });
          
        }, 100);
      }
    }

    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };

    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();
        that.sliders.resize();
      });
      window.addEventListener('orientationchange', function(e){
        setTimeout(function(){
          that.sliders.resize();
        }, 100);
      });
      document.querySelectorAll('.slider-button-prev, .slider-button-next').forEach(function (el, i) {
        el.addEventListener('mouseenter', function (e) {        
          if (this.classList.contains('swiper-button-disabled')) return;
          TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
          TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
          //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#ee412a', ease: Power3.easeOut });        
          if (this.closest('.catalog__slider')){
            TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#ee412a', ease: Power3.easeOut });
          }
        });
        el.addEventListener('mouseleave', function (e) {        
          TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeIn });
          TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeIn });
          //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#fff', ease: Power3.easeOut });        
          if (this.closest('.catalog__slider')){
            TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#fff', ease: Power3.easeIn });
          }        
        });
      });   
    }

    this.loader.init(); 
  }

  /* ==============================================================
                          MEETINGS INIT
   ============================================================== */
   const _meetings = function () {
    const root = this;  
    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [
          'pixi',
          'swiper'          
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;

        window.scrollTo(0, 0);

        TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;

        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });

        this.scripts.forEach(function (n) {        
          let src = './js/lib/' + app.resours[n];
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {          
            that.resourcesDone++;
            that.loading();
          }
        });      
      },
      loading: function () {
        const that = this;      
        if(this.resources == this.resourcesDone) {          
          let tl = new TimelineMax();
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
          .add(function(){
            root.sliders.init();
            root.cursor.init();
            root.eventsInit();
            app.globalEvents();
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
          .add(function(){
            that.loaded();
          });
          
        }
      },
      loaded: function () {
        const that = this;        

        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });
          root.sliders.resize();
        })
        .from(document.querySelectorAll('.photo__hero h1 span'), 1, {rotationX: 90, opacity: 0, ease: Power2.easeOut }, '+=0.3')
        .from('.photo__hero .hero__description', 0.8, { opacity: 0, y: 50 }, '-=0.5')
        .from('header, .photo__hero .breadcrumb, .hero--scroll', 0.8, { opacity: 0 }, '-=0.5')
      },
    };

    this.sliders = {
      singleSlider: null,      
      init: function(){
        this.singleSlider = new Swiper('.single-slider .swiper-container', {
          // Optional parameters
          init: false,
          speed: 1000,
          followFinger: false,
          //simulateTouch: false,        
          // If we need pagination
          pagination: {
            el: '.slider-pagination',
            type: 'fraction'
          },
          // Navigation arrows
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          }
        });       
        this.events();
        this.singleSlider.init();        
      },
      events: function(){
        this.singleSlider.on('init', function () {        
          const that = this;
          function heroBgCover(el) {
            let ratio = el.width / el.height;
            let size;
            if(app.mode == 'descktop'){
              size = (325 * 2);
            }else if(app.mode == 'tablet'){
              size = (600 * 2);
            }else if(app.mode == 'mobile'){
              size = (700 * 2);
            }
            if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
              return {
                width: (that.el.clientWidth + size),
                height: (that.el.clientWidth + size) / ratio,
                x: 0,
                y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
              }
            } else {
              return {
                width: that.el.clientHeight * ratio,
                height: that.el.clientHeight,
                x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
                y: 0
              }
            }
          }

          let galleryEl = this.el.closest('.single-slider');
          this.gallery = new PIXI.Application({
            width: galleryEl.clientWidth,
            height: galleryEl.clientHeight,
            backgroundColor: 0x000000
          });
          galleryEl.appendChild(this.gallery.view);
          this.rootContainer = new PIXI.Container();
          this.gallery.stage.addChild(this.rootContainer);
          this.containers = [];
          this.cloneContainers = [];
          this.images = [];
          this.cloneImages = [];
          this.masks = [];
          this.cloneMasks = [];

          this.mask = new PIXI.Graphics();
          this.mask.lineStyle(0);
          this.mask.beginFill(0xff0000, 1);
          if(app.mode == 'descktop'){
            this.mask.drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
          }else if(app.mode == 'tablet'){
            this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
          }else if(app.mode == 'mobile'){
            this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
          }
          this.mask.endFill();

          this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
            let src = el.getAttribute('data-src');
            let container = new PIXI.Container();
            let image = PIXI.Sprite.from(src);
            let mask = that.mask.clone();          
            container.addChild(mask);          
            image.anchor.x = 0.5;
            image.anchor.y = 0.5;          
            image.width = heroBgCover(el).width;
            image.height = heroBgCover(el).height;          
            image.x = heroBgCover(el).x + (image.width / 2);
            image.y = heroBgCover(el).y + (image.height / 2);
            image.alpha = (i == 0 ? 0.7 : 0.5);
            if(app.mode == 'descktop'){
              container.width = galleryEl.clientWidth + (325 * 2);
              container.x = (galleryEl.clientWidth * i) - 325;
            }else if(app.mode == 'tablet'){
              container.width = galleryEl.clientWidth + (600 * 2);
              container.x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
            }else if(app.mode == 'mobile'){
              container.width = galleryEl.clientWidth + (700 * 2);
              container.x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
            }
            that.rootContainer.addChild(container);
            container.addChild(image);
            image.mask = mask;
            

            if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
              let cloneImage = PIXI.Sprite.from(src);
              cloneImage.width = heroBgCover(el).width;
              cloneImage.height = heroBgCover(el).height;
              cloneImage.x = heroBgCover(el).x;
              cloneImage.y = heroBgCover(el).y;
              cloneImage.alpha = 0.5;
              let cloneContaner = new PIXI.Container();
              that.rootContainer.addChild(cloneContaner);
              if(app.mode == 'descktop'){
                cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                cloneContaner.x = -galleryEl.clientWidth - 325;
              }else if(app.mode == 'tablet'){
                cloneContaner.width = galleryEl.clientWidth + (600 * 2);
                cloneContaner.x = -(galleryEl.clientWidth - 600) - 1600;
              }else if(app.mode == 'mobile'){
                cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                cloneContaner.x = -(galleryEl.clientWidth - 700) - 2000;
              }
              let cloneMask = that.mask.clone();
              //cloneMask.x = -galleryEl.clientWidth;
              cloneContaner.addChild(cloneMask);
              cloneContaner.addChild(cloneImage);
              cloneImage.mask = cloneMask;
              that.cloneMasks.push(cloneMask);
              that.cloneContainers.push(cloneContaner);
              that.cloneImages.push(cloneImage);
            } else if (i == 0) {
              let cloneImage = PIXI.Sprite.from(src);
              cloneImage.width = heroBgCover(el).width;
              cloneImage.height = heroBgCover(el).height;
              cloneImage.x = heroBgCover(el).x;
              cloneImage.y = heroBgCover(el).y;
              cloneImage.alpha = 0.5;
              let cloneContaner = new PIXI.Container();            
              that.rootContainer.addChild(cloneContaner);
              if(app.mode == 'descktop'){
                cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
              }else if(app.mode == 'tablet'){
                cloneContaner.width = galleryEl.clientWidth + (600 * 2);              
                cloneContaner.x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
              }else if(app.mode == 'mobile'){
                cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                cloneContaner.x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
              }
              let cloneMask = that.mask.clone();
              //cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
              cloneContaner.addChild(cloneMask);            
              cloneContaner.addChild(cloneImage);
              cloneImage.mask = cloneMask;
              that.cloneMasks.push(cloneMask);            
              that.cloneContainers.push(cloneContaner);
              that.cloneImages.push(cloneImage);
            }
            that.containers.push(container);
            that.images.push(image);
            that.masks.push(mask);

          });
        });
        this.singleSlider.on('slideChangeTransitionStart', function () {
          let that = this;
          let x;
          if(app.mode == 'descktop'){
            x = this.el.clientWidth * this.realIndex;
          }else if(app.mode == 'tablet'){
            x = (this.el.clientWidth + 400) * this.realIndex;
          }else if(app.mode == 'mobile'){
            x = (this.el.clientWidth + 600) * this.realIndex;
          }
          if (this.realIndex > this.previousIndex) {
            this.images.forEach(function (el, i) {
              TweenMax.to(el, 0.8, {
                alpha: function () {
                  return that.realIndex == i ? 0.7 : 0.5;
                }, ease: Power2.easeIn
              });
              let scale = el.scale;
              new TimelineMax()
                .to(el.skew, 0.5, { x: -0.6, ease: Power2.easeIn }, 'start')
                .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
                .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
                .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
            });
            new TimelineMax()
              .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
              .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: -34, scale: 1.2, ease: Power1.easeIn }, 'start')
              .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
          } else {
            this.images.forEach(function (el, i) {
              TweenMax.to(el, 0.8, {
                alpha: function () {
                  return that.realIndex == i ? 0.7 : 0.5;
                }, ease: Power2.easeIn
              });
              let scale = el.scale;
              new TimelineMax()
              .to(el.skew, 0.5, { x: 0.6, ease: Power2.easeIn }, 'start')
              .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
              .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
              .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
            });
            new TimelineMax()
              .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
              .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 34, scale: 1.2, ease: Power1.easeIn }, 'start')
              .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
          }
        });
      },    
      resize: function(){      
        const that = this.singleSlider;
        function heroBgCover(el) {
          let ratio = el.width / el.height;
          let size;
          if(app.mode == 'descktop'){
            size = (325 * 2);
          }else if(app.mode == 'tablet'){
            size = (600 * 2);
          }else if(app.mode == 'mobile'){
            size = (700 * 2);
          }
          if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
            return {
              width: (that.el.clientWidth + size),
              height: (that.el.clientWidth + size) / ratio,
              x: 0,
              y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
            }
          } else {
            return {
              width: that.el.clientHeight * ratio,
              height: that.el.clientHeight,
              x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
              y: 0
            }
          }
        }
        let x;
          if(app.mode == 'descktop'){
            x = that.el.clientWidth * that.realIndex;
          }else if(app.mode == 'tablet'){
            x = (that.el.clientWidth + 400) * that.realIndex;
          }else if(app.mode == 'mobile'){
            x = (that.el.clientWidth + 600) * that.realIndex;
          }
        that.rootContainer.x = -x;
        let galleryEl = that.el.closest('.single-slider');
        that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
        setTimeout(function(){
          that.images.forEach(function(el, i){        
            el.width = heroBgCover(el.texture).width;
            el.height = heroBgCover(el.texture).height;
            el.x = heroBgCover(el).x + (el.width / 2);
            el.y = heroBgCover(el).y + (el.height / 2);
            if(app.mode == 'descktop'){
              that.containers[i].width = galleryEl.clientWidth + (325 * 2);
              that.containers[i].x = (galleryEl.clientWidth * i) - 325;
            }else if(app.mode == 'tablet'){
              that.containers[i].width = galleryEl.clientWidth + (600 * 2);
              that.containers[i].x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
            }else if(app.mode == 'mobile'){
              that.containers[i].width = galleryEl.clientWidth + (700 * 2);
              that.containers[i].x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
            }          
            that.masks[i].clear();
            that.masks[i].lineStyle(0);
            that.masks[i].beginFill(0xffffff, 0.5);          
            if(app.mode == 'descktop'){
              that.masks[i].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
            }else if(app.mode == 'tablet'){
              that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
            }else if(app.mode == 'mobile'){
              that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
            }
            that.masks[i].endFill();
          });
          that.cloneImages.forEach(function(el, i){
              el.width = heroBgCover(el.texture).width;
              el.height = heroBgCover(el.texture).height;
              el.x = heroBgCover(el).x + (el.width / 2);
              el.y = heroBgCover(el).y + (el.height / 2);
              if(i == 0){
                that.cloneImages[0].width = heroBgCover(that.cloneImages[0].texture).width;
                that.cloneImages[0].height = heroBgCover(that.cloneImages[0].texture).height;
                that.cloneImages[0].x = heroBgCover(that.cloneImages[0].texture).x;
                that.cloneImages[0].y = heroBgCover(that.cloneImages[0].texture).y;
                if(app.mode == 'descktop'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                }else if(app.mode == 'tablet'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (600 * 2);              
                  that.cloneContainers[0].x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }else if(app.mode == 'mobile'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (700 * 2);
                  that.cloneContainers[0].x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }              
                that.cloneMasks[0].clear();
                that.cloneMasks[0].lineStyle(0);
                that.cloneMasks[0].beginFill(0xff0000, 0.5);
                if(app.mode == 'descktop'){
                  that.cloneMasks[0].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                }else if(app.mode == 'tablet'){
                  that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                }else if(app.mode == 'mobile'){
                  that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                }
                that.cloneMasks[0].endFill();            
              }else {            
                that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                if(app.mode == 'descktop'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[1].x = -galleryEl.clientWidth - 325;
                }else if(app.mode == 'tablet'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (600 * 2);
                  that.cloneContainers[1].x = -(galleryEl.clientWidth - 600) - 1600;
                }else if(app.mode == 'mobile'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (700 * 2);
                  that.cloneContainers[1].x = -(galleryEl.clientWidth - 700) - 2000;
                }              
                that.cloneMasks[1].clear();
                that.cloneMasks[1].lineStyle(0);
                that.cloneMasks[1].beginFill(0xff0000, 1);
                if(app.mode == 'descktop'){
                  that.cloneMasks[1].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                }else if(app.mode == 'tablet'){
                  that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                }else if(app.mode == 'mobile'){
                  that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                }
                that.cloneMasks[1].endFill();              
              }
          });
          
        }, 100);
      }
    };

    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };

    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();
        that.sliders.resize();
      });
      window.addEventListener('orientationchange', function(e){
        setTimeout(function(){
          that.sliders.resize();
        }, 100);
      });
      document.querySelectorAll('.slider-button-prev, .slider-button-next').forEach(function (el, i) {
        el.addEventListener('mouseenter', function (e) {        
          if (this.classList.contains('swiper-button-disabled')) return;
          TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
          TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
          //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#ee412a', ease: Power3.easeOut });        
          if (this.closest('.catalog__slider')){
            TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#ee412a', ease: Power3.easeOut });
          }
        });
        el.addEventListener('mouseleave', function (e) {        
          TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeIn });
          TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeIn });
          //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#fff', ease: Power3.easeOut });        
          if (this.closest('.catalog__slider')){
            TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#fff', ease: Power3.easeIn });
          }        
        });
      });
    }

    this.loader.init(); 
  }

/* ==============================================================
                          PRODUCT CARD INIT
   ============================================================== */
const _product = function () {
    const root = this;
  
    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [         
          'pixi',
          'swiper',          
          'map',
          'highcharts',
          'jquery'
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;
  
        window.scrollTo(0, 0);
  
        TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;
  
        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });
  
        this.scripts.forEach(function (n) {          
          let src;
          if(n == 'map'){
            src = app.resours[n];
          }else{
            src = './js/lib/' + app.resours[n];
          }          
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {          
            that.resourcesDone++;
            that.loading();
          }
        });      
      },
      loading: function () {
        const that = this;
        if (this.resources == this.resourcesDone) {
          let tl = new TimelineMax();          
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut}, '-=0.6')          
          .add(function(){          
            root.tabs.init();
            root.map.init();
            root.sliders.init();
            root.eventsInit();
            root.weather.init();
            root.cursor.init();
            app.globalEvents();            
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 , onComplete: that.loaded}, '-=0.3')          
        }
      },
      loaded: function () {
        const that = this;
        root.sliders.resize();
        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });
          root.sliders.resize();
        })
        .staggerFrom(document.querySelectorAll('.card__hero .swiper-slide-active .slide--content h2, .card__hero .swiper-slide-active .slide--content .slide--text'), 1, { y: 50, opacity: 0, ease: Power2.easeOut }, 0.1, '+=0.3')
        .from('header, .card__hero .breadcrumb', 0.8, { opacity: 0 }, '-=0.5')
        .from('.card__hero .slider-button-prev, .card__hero .slider-button-next, .card__hero .slider-pagination', 0.8, { opacity: 0 }, '-=0.4')
        .set('.card__hero .slider-button-prev, .card__hero .slider-button-next, .card__hero .slider-pagination', { clearProps: 'all' })
        
      },
    };

    this.sliders = {
      singleSliders: null,
      catalogSlider: null,
      init: function(){
        this.singleSlider = new Swiper('.single-slider .swiper-container', {
          // Optional parameters
          init: false,
          speed: 1000,
          followFinger: false,
          //simulateTouch: false,        
          // If we need pagination
          pagination: {
            el: '.slider-pagination',
            type: 'fraction'
          },
          // Navigation arrows
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          }
        });
        this.catalogSlider = new Swiper('.catalog__slider .swiper-container', {
          // Optional parameters    
          speed: 800,
          //simulateTouch: false,        
          followFinger: false,
          slidesPerView: 3,
          spaceBetween: 60,
          // If we need pagination
          // pagination: {
          //   el: '.slider-pagination',
          //   type: 'fraction'
          // },
          // Navigation arrows
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          },
          breakpoints: {
            992: {
              slidesPerView: 'auto'
            },
            576: {
              slidesPerView: 'auto',
              spaceBetween: 20,
            }
          },
        });
        this.events();
        if(this.singleSlider.length){
          this.singleSlider.forEach(function(el, i){
            el.init();    
          });          
        }else{
          this.singleSlider.init();
        }        
      },
      events: function(){
        if(this.singleSlider.length){
          this.singleSlider.forEach(function(el, i){
            el.on('init', function () {        
              const that = this;
              function heroBgCover(el) {
                let ratio = el.width / el.height;
                let size;
                if(app.mode == 'descktop'){
                  size = (325 * 2);
                }else if(app.mode == 'tablet'){
                  size = (600 * 2);
                }else if(app.mode == 'mobile'){
                  size = (700 * 2);
                }
                if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
                  return {
                    width: (that.el.clientWidth + size),
                    height: (that.el.clientWidth + size) / ratio,
                    x: 0,
                    y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
                  }
                } else {
                  return {
                    width: that.el.clientHeight * ratio,
                    height: that.el.clientHeight,
                    x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
                    y: 0
                  }
                }
              }

              let galleryEl = this.el.closest('.single-slider');
              this.gallery = new PIXI.Application({
                width: galleryEl.clientWidth,
                height: galleryEl.clientHeight,
                backgroundColor: 0x000000
              });
              galleryEl.appendChild(this.gallery.view);
              this.rootContainer = new PIXI.Container();
              this.gallery.stage.addChild(this.rootContainer);
              this.containers = [];
              this.cloneContainers = [];
              this.images = [];
              this.cloneImages = [];
              this.masks = [];
              this.cloneMasks = [];

              this.mask = new PIXI.Graphics();
              this.mask.lineStyle(0);
              this.mask.beginFill(0xff0000, 1);
              if(app.mode == 'descktop'){
                this.mask.drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
              }else if(app.mode == 'tablet'){
                this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
              }else if(app.mode == 'mobile'){
                this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
              }
              this.mask.endFill();

              this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
                let src = el.getAttribute('data-src');
                let container = new PIXI.Container();
                let image = PIXI.Sprite.from(src);
                let mask = that.mask.clone();          
                container.addChild(mask);          
                image.anchor.x = 0.5;
                image.anchor.y = 0.5;          
                image.width = heroBgCover(el).width;
                image.height = heroBgCover(el).height;          
                image.x = heroBgCover(el).x + (image.width / 2);
                image.y = heroBgCover(el).y + (image.height / 2);
                image.alpha = (i == 0 ? 0.7 : 0.5);
                if(app.mode == 'descktop'){
                  container.width = galleryEl.clientWidth + (325 * 2);
                  container.x = (galleryEl.clientWidth * i) - 325;
                }else if(app.mode == 'tablet'){
                  container.width = galleryEl.clientWidth + (600 * 2);
                  container.x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
                }else if(app.mode == 'mobile'){
                  container.width = galleryEl.clientWidth + (700 * 2);
                  container.x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
                }
                that.rootContainer.addChild(container);
                container.addChild(image);
                image.mask = mask;
                

                if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
                  let cloneImage = PIXI.Sprite.from(src);
                  cloneImage.width = heroBgCover(el).width;
                  cloneImage.height = heroBgCover(el).height;
                  cloneImage.x = heroBgCover(el).x;
                  cloneImage.y = heroBgCover(el).y;
                  cloneImage.alpha = 0.5;
                  let cloneContaner = new PIXI.Container();
                  that.rootContainer.addChild(cloneContaner);
                  if(app.mode == 'descktop'){
                    cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                    cloneContaner.x = -galleryEl.clientWidth - 325;
                  }else if(app.mode == 'tablet'){
                    cloneContaner.width = galleryEl.clientWidth + (600 * 2);
                    cloneContaner.x = -(galleryEl.clientWidth - 600) - 1600;
                  }else if(app.mode == 'mobile'){
                    cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                    cloneContaner.x = -(galleryEl.clientWidth - 700) - 2000;
                  }
                  let cloneMask = that.mask.clone();
                  //cloneMask.x = -galleryEl.clientWidth;
                  cloneContaner.addChild(cloneMask);
                  cloneContaner.addChild(cloneImage);
                  cloneImage.mask = cloneMask;
                  that.cloneMasks.push(cloneMask);
                  that.cloneContainers.push(cloneContaner);
                  that.cloneImages.push(cloneImage);
                } else if (i == 0) {
                  let cloneImage = PIXI.Sprite.from(src);
                  cloneImage.width = heroBgCover(el).width;
                  cloneImage.height = heroBgCover(el).height;
                  cloneImage.x = heroBgCover(el).x;
                  cloneImage.y = heroBgCover(el).y;
                  cloneImage.alpha = 0.5;
                  let cloneContaner = new PIXI.Container();            
                  that.rootContainer.addChild(cloneContaner);
                  if(app.mode == 'descktop'){
                    cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                    cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                  }else if(app.mode == 'tablet'){
                    cloneContaner.width = galleryEl.clientWidth + (600 * 2);              
                    cloneContaner.x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                  }else if(app.mode == 'mobile'){
                    cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                    cloneContaner.x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                  }
                  let cloneMask = that.mask.clone();
                  //cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
                  cloneContaner.addChild(cloneMask);            
                  cloneContaner.addChild(cloneImage);
                  cloneImage.mask = cloneMask;
                  that.cloneMasks.push(cloneMask);            
                  that.cloneContainers.push(cloneContaner);
                  that.cloneImages.push(cloneImage);
                }
                that.containers.push(container);
                that.images.push(image);
                that.masks.push(mask);

              });
            });
            el.on('slideChangeTransitionStart', function () {
              let that = this;
              let x;
              if(app.mode == 'descktop'){
                x = this.el.clientWidth * this.realIndex;
              }else if(app.mode == 'tablet'){
                x = (this.el.clientWidth + 400) * this.realIndex;
              }else if(app.mode == 'mobile'){
                x = (this.el.clientWidth + 600) * this.realIndex;
              }
              if (this.realIndex > this.previousIndex) {
                this.images.forEach(function (el, i) {
                  TweenMax.to(el, 0.8, {
                    alpha: function () {
                      return that.realIndex == i ? 0.7 : 0.5;
                    }, ease: Power2.easeIn
                  });
                  let scale = el.scale;
                  new TimelineMax()
                    .to(el.skew, 0.5, { x: -0.6, ease: Power2.easeIn }, 'start')
                    .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
                    .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
                    .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
                });
                new TimelineMax()
                  .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
                  .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: -34, scale: 1.2, ease: Power1.easeIn }, 'start')
                  .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
              } else {
                this.images.forEach(function (el, i) {
                  TweenMax.to(el, 0.8, {
                    alpha: function () {
                      return that.realIndex == i ? 0.7 : 0.5;
                    }, ease: Power2.easeIn
                  });
                  let scale = el.scale;
                  new TimelineMax()
                  .to(el.skew, 0.5, { x: 0.6, ease: Power2.easeIn }, 'start')
                  .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
                  .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
                  .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
                });
                new TimelineMax()
                  .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
                  .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 34, scale: 1.2, ease: Power1.easeIn }, 'start')
                  .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
              }
            });
          });
        }else{
          this.singleSlider.on('init', function () {
            const that = this;
            function heroBgCover(el) {
              let ratio = el.width / el.height;
              let size;
              if(app.mode == 'descktop'){
                size = (325 * 2);
              }else if(app.mode == 'tablet'){
                size = (600 * 2);
              }else if(app.mode == 'mobile'){
                size = (700 * 2);
              }
              if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
                return {
                  width: (that.el.clientWidth + size),
                  height: (that.el.clientWidth + size) / ratio,
                  x: 0,
                  y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
                }
              } else {
                return {
                  width: that.el.clientHeight * ratio,
                  height: that.el.clientHeight,
                  x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
                  y: 0
                }
              }
            }
    
            let galleryEl = this.el.closest('.single-slider');
            this.gallery = new PIXI.Application({
              width: galleryEl.clientWidth,
              height: galleryEl.clientHeight,
              backgroundColor: 0x000000
            });
            galleryEl.appendChild(this.gallery.view);
            this.rootContainer = new PIXI.Container();
            this.gallery.stage.addChild(this.rootContainer);
            this.containers = [];
            this.cloneContainers = [];
            this.images = [];
            this.cloneImages = [];
            this.masks = [];
            this.cloneMasks = [];
    
            this.mask = new PIXI.Graphics();
            this.mask.lineStyle(0);
            this.mask.beginFill(0xff0000, 1);
            if(app.mode == 'descktop'){
              this.mask.drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
            }else if(app.mode == 'tablet'){
              this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
            }else if(app.mode == 'mobile'){
              this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
            }
            this.mask.endFill();
    
            this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
              let src = el.getAttribute('data-src');
              let container = new PIXI.Container();
              let image = PIXI.Sprite.from(src);
              let mask = that.mask.clone();          
              container.addChild(mask);          
              image.anchor.x = 0.5;
              image.anchor.y = 0.5;          
              image.width = heroBgCover(el).width;
              image.height = heroBgCover(el).height;          
              image.x = heroBgCover(el).x + (image.width / 2);
              image.y = heroBgCover(el).y + (image.height / 2);
              image.alpha = (i == 0 ? 0.7 : 0.5);
              if(app.mode == 'descktop'){
                container.width = galleryEl.clientWidth + (325 * 2);
                container.x = (galleryEl.clientWidth * i) - 325;
              }else if(app.mode == 'tablet'){
                container.width = galleryEl.clientWidth + (600 * 2);
                container.x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
              }else if(app.mode == 'mobile'){
                container.width = galleryEl.clientWidth + (700 * 2);
                container.x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
              }
              that.rootContainer.addChild(container);
              container.addChild(image);
              image.mask = mask;
              
    
              if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
                let cloneImage = PIXI.Sprite.from(src);
                cloneImage.width = heroBgCover(el).width;
                cloneImage.height = heroBgCover(el).height;
                cloneImage.x = heroBgCover(el).x;
                cloneImage.y = heroBgCover(el).y;
                cloneImage.alpha = 0.5;
                let cloneContaner = new PIXI.Container();
                that.rootContainer.addChild(cloneContaner);
                if(app.mode == 'descktop'){
                  cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                  cloneContaner.x = -galleryEl.clientWidth - 325;
                }else if(app.mode == 'tablet'){
                  cloneContaner.width = galleryEl.clientWidth + (600 * 2);
                  cloneContaner.x = -(galleryEl.clientWidth - 600) - 1600;
                }else if(app.mode == 'mobile'){
                  cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                  cloneContaner.x = -(galleryEl.clientWidth - 700) - 2000;
                }
                let cloneMask = that.mask.clone();
                //cloneMask.x = -galleryEl.clientWidth;
                cloneContaner.addChild(cloneMask);
                cloneContaner.addChild(cloneImage);
                cloneImage.mask = cloneMask;
                that.cloneMasks.push(cloneMask);
                that.cloneContainers.push(cloneContaner);
                that.cloneImages.push(cloneImage);
              } else if (i == 0) {
                let cloneImage = PIXI.Sprite.from(src);
                cloneImage.width = heroBgCover(el).width;
                cloneImage.height = heroBgCover(el).height;
                cloneImage.x = heroBgCover(el).x;
                cloneImage.y = heroBgCover(el).y;
                cloneImage.alpha = 0.5;
                let cloneContaner = new PIXI.Container();            
                that.rootContainer.addChild(cloneContaner);
                if(app.mode == 'descktop'){
                  cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                  cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                }else if(app.mode == 'tablet'){
                  cloneContaner.width = galleryEl.clientWidth + (600 * 2);              
                  cloneContaner.x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }else if(app.mode == 'mobile'){
                  cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                  cloneContaner.x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }
                let cloneMask = that.mask.clone();
                //cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
                cloneContaner.addChild(cloneMask);            
                cloneContaner.addChild(cloneImage);
                cloneImage.mask = cloneMask;
                that.cloneMasks.push(cloneMask);            
                that.cloneContainers.push(cloneContaner);
                that.cloneImages.push(cloneImage);
              }
              that.containers.push(container);
              that.images.push(image);
              that.masks.push(mask);
    
            });
          });
          this.singleSlider.on('slideChangeTransitionStart', function () {
            let that = this;
            let x;
            if(app.mode == 'descktop'){
              x = this.el.clientWidth * this.realIndex;
            }else if(app.mode == 'tablet'){
              x = (this.el.clientWidth + 400) * this.realIndex;
            }else if(app.mode == 'mobile'){
              x = (this.el.clientWidth + 600) * this.realIndex;
            }
            if (this.realIndex > this.previousIndex) {
              this.images.forEach(function (el, i) {
                TweenMax.to(el, 0.8, {
                  alpha: function () {
                    return that.realIndex == i ? 0.7 : 0.5;
                  }, ease: Power2.easeIn
                });
                let scale = el.scale;
                new TimelineMax()
                  .to(el.skew, 0.5, { x: -0.6, ease: Power2.easeIn }, 'start')
                  .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
                  .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
                  .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
              });
              new TimelineMax()
                .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
                .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: -34, scale: 1.2, ease: Power1.easeIn }, 'start')
                .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
            } else {
              this.images.forEach(function (el, i) {
                TweenMax.to(el, 0.8, {
                  alpha: function () {
                    return that.realIndex == i ? 0.7 : 0.5;
                  }, ease: Power2.easeIn
                });
                let scale = el.scale;
                new TimelineMax()
                .to(el.skew, 0.5, { x: 0.6, ease: Power2.easeIn }, 'start')
                .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
                .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
                .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
              });
              new TimelineMax()
                .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
                .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 34, scale: 1.2, ease: Power1.easeIn }, 'start')
                .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
            }
          });       
        }
        if(this.catalogSlider.length){
          this.catalogSlider.forEach(function(el, i){
            el.on('slideChangeTransitionStart', function () {
              if (this.realIndex > this.previousIndex) {
                new TimelineMax()
                .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: -30, scale: 1.2, ease: Power1.easeIn})
                .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
              } else {
                new TimelineMax()
                .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 30, scale: 1.2, ease: Power1.easeIn})
                .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
              }
            });
          });
        }else{
          this.catalogSlider.on('slideChangeTransitionStart', function () {
            if (this.realIndex > this.previousIndex) {
              new TimelineMax()
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: -30, scale: 1.2, ease: Power1.easeIn})
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
            } else {
              new TimelineMax()
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 30, scale: 1.2, ease: Power1.easeIn})
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
            }
          });
        }
      },    
      resize: function(){
        if(this.singleSlider.length){          
          this.singleSlider.forEach(function(el, i){
            const that = el;
            function heroBgCover(el) {
              let ratio = el.width / el.height;
              let size;
              if(app.mode == 'descktop'){
                size = (325 * 2);
              }else if(app.mode == 'tablet'){
                size = (600 * 2);
              }else if(app.mode == 'mobile'){
                size = (700 * 2);
              }
              if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
                return {
                  width: (that.el.clientWidth + size),
                  height: (that.el.clientWidth + size) / ratio,
                  x: 0,
                  y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
                }
              } else {
                return {
                  width: that.el.clientHeight * ratio,
                  height: that.el.clientHeight,
                  x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
                  y: 0
                }
              }
            }
            let x;
              if(app.mode == 'descktop'){
                x = that.el.clientWidth * that.realIndex;
              }else if(app.mode == 'tablet'){
                x = (that.el.clientWidth + 400) * that.realIndex;
              }else if(app.mode == 'mobile'){
                x = (that.el.clientWidth + 600) * that.realIndex;
              }
            that.rootContainer.x = -x;
            let galleryEl = that.el.closest('.single-slider');
            that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
            setTimeout(function(){
              that.images.forEach(function(el, i){        
                el.width = heroBgCover(el.texture).width;
                el.height = heroBgCover(el.texture).height;
                el.x = heroBgCover(el).x + (el.width / 2);
                el.y = heroBgCover(el).y + (el.height / 2);
                if(app.mode == 'descktop'){
                  that.containers[i].width = galleryEl.clientWidth + (325 * 2);
                  that.containers[i].x = (galleryEl.clientWidth * i) - 325;
                }else if(app.mode == 'tablet'){
                  that.containers[i].width = galleryEl.clientWidth + (600 * 2);
                  that.containers[i].x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
                }else if(app.mode == 'mobile'){
                  that.containers[i].width = galleryEl.clientWidth + (700 * 2);
                  that.containers[i].x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
                }          
                that.masks[i].clear();
                that.masks[i].lineStyle(0);
                that.masks[i].beginFill(0xffffff, 0.5);          
                if(app.mode == 'descktop'){
                  that.masks[i].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                }else if(app.mode == 'tablet'){
                  that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                }else if(app.mode == 'mobile'){
                  that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                }
                that.masks[i].endFill();
              });
              that.cloneImages.forEach(function(el, i){
                  el.width = heroBgCover(el.texture).width;
                  el.height = heroBgCover(el.texture).height;
                  el.x = heroBgCover(el).x + (el.width / 2);
                  el.y = heroBgCover(el).y + (el.height / 2);
                  if(i == 0){
                    that.cloneImages[0].width = heroBgCover(that.cloneImages[0].texture).width;
                    that.cloneImages[0].height = heroBgCover(that.cloneImages[0].texture).height;
                    that.cloneImages[0].x = heroBgCover(that.cloneImages[0].texture).x;
                    that.cloneImages[0].y = heroBgCover(that.cloneImages[0].texture).y;
                    if(app.mode == 'descktop'){
                      that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                      that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                    }else if(app.mode == 'tablet'){
                      that.cloneContainers[0].width = galleryEl.clientWidth + (600 * 2);              
                      that.cloneContainers[0].x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                    }else if(app.mode == 'mobile'){
                      that.cloneContainers[0].width = galleryEl.clientWidth + (700 * 2);
                      that.cloneContainers[0].x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                    }              
                    that.cloneMasks[0].clear();
                    that.cloneMasks[0].lineStyle(0);
                    that.cloneMasks[0].beginFill(0xff0000, 0.5);
                    if(app.mode == 'descktop'){
                      that.cloneMasks[0].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                    }else if(app.mode == 'tablet'){
                      that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                    }else if(app.mode == 'mobile'){
                      that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                    }
                    that.cloneMasks[0].endFill();            
                  }else {            
                    that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                    that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                    that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                    that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                    if(app.mode == 'descktop'){
                      that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                      that.cloneContainers[1].x = -galleryEl.clientWidth - 325;
                    }else if(app.mode == 'tablet'){
                      that.cloneContainers[1].width = galleryEl.clientWidth + (600 * 2);
                      that.cloneContainers[1].x = -(galleryEl.clientWidth - 600) - 1600;
                    }else if(app.mode == 'mobile'){
                      that.cloneContainers[1].width = galleryEl.clientWidth + (700 * 2);
                      that.cloneContainers[1].x = -(galleryEl.clientWidth - 700) - 2000;
                    }              
                    that.cloneMasks[1].clear();
                    that.cloneMasks[1].lineStyle(0);
                    that.cloneMasks[1].beginFill(0xff0000, 1);
                    if(app.mode == 'descktop'){
                      that.cloneMasks[1].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                    }else if(app.mode == 'tablet'){
                      that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                    }else if(app.mode == 'mobile'){
                      that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                    }
                    that.cloneMasks[1].endFill();              
                  }
              });
              
            }, 100);
          });          
        }else{
          const that = this.singleSlider;          
          function heroBgCover(el) {
            let ratio = el.width / el.height;
            let size;
            if(app.mode == 'descktop'){
              size = (325 * 2);
            }else if(app.mode == 'tablet'){
              size = (600 * 2);
            }else if(app.mode == 'mobile'){
              size = (700 * 2);
            }
            if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
              return {
                width: (that.el.clientWidth + size),
                height: (that.el.clientWidth + size) / ratio,
                x: 0,
                y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
              }
            } else {
              return {
                width: that.el.clientHeight * ratio,
                height: that.el.clientHeight,
                x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
                y: 0
              }
            }
          }
          let x;
            if(app.mode == 'descktop'){
              x = that.el.clientWidth * that.realIndex;
            }else if(app.mode == 'tablet'){
              x = (that.el.clientWidth + 400) * that.realIndex;
            }else if(app.mode == 'mobile'){
              x = (that.el.clientWidth + 600) * that.realIndex;
            }
          that.rootContainer.x = -x;
          let galleryEl = that.el.closest('.single-slider');
          that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
          setTimeout(function(){
            that.images.forEach(function(el, i){        
              el.width = heroBgCover(el.texture).width;
              el.height = heroBgCover(el.texture).height;
              el.x = heroBgCover(el).x + (el.width / 2);
              el.y = heroBgCover(el).y + (el.height / 2);
              if(app.mode == 'descktop'){
                that.containers[i].width = galleryEl.clientWidth + (325 * 2);
                that.containers[i].x = (galleryEl.clientWidth * i) - 325;
              }else if(app.mode == 'tablet'){
                that.containers[i].width = galleryEl.clientWidth + (600 * 2);
                that.containers[i].x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
              }else if(app.mode == 'mobile'){
                that.containers[i].width = galleryEl.clientWidth + (700 * 2);
                that.containers[i].x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
              }          
              that.masks[i].clear();
              that.masks[i].lineStyle(0);
              that.masks[i].beginFill(0xffffff, 0.5);          
              if(app.mode == 'descktop'){
                that.masks[i].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
              }else if(app.mode == 'tablet'){
                that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
              }else if(app.mode == 'mobile'){
                that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
              }
              that.masks[i].endFill();
            });
            that.cloneImages.forEach(function(el, i){
                el.width = heroBgCover(el.texture).width;
                el.height = heroBgCover(el.texture).height;
                el.x = heroBgCover(el).x + (el.width / 2);
                el.y = heroBgCover(el).y + (el.height / 2);
                if(i == 0){
                  that.cloneImages[0].width = heroBgCover(that.cloneImages[0].texture).width;
                  that.cloneImages[0].height = heroBgCover(that.cloneImages[0].texture).height;
                  that.cloneImages[0].x = heroBgCover(that.cloneImages[0].texture).x;
                  that.cloneImages[0].y = heroBgCover(that.cloneImages[0].texture).y;
                  if(app.mode == 'descktop'){
                    that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                    that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                  }else if(app.mode == 'tablet'){
                    that.cloneContainers[0].width = galleryEl.clientWidth + (600 * 2);              
                    that.cloneContainers[0].x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                  }else if(app.mode == 'mobile'){
                    that.cloneContainers[0].width = galleryEl.clientWidth + (700 * 2);
                    that.cloneContainers[0].x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                  }              
                  that.cloneMasks[0].clear();
                  that.cloneMasks[0].lineStyle(0);
                  that.cloneMasks[0].beginFill(0xff0000, 0.5);
                  if(app.mode == 'descktop'){
                    that.cloneMasks[0].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                  }else if(app.mode == 'tablet'){
                    that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                  }else if(app.mode == 'mobile'){
                    that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                  }
                  that.cloneMasks[0].endFill();            
                }else {            
                  that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                  that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                  that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                  that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                  if(app.mode == 'descktop'){
                    that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                    that.cloneContainers[1].x = -galleryEl.clientWidth - 325;
                  }else if(app.mode == 'tablet'){
                    that.cloneContainers[1].width = galleryEl.clientWidth + (600 * 2);
                    that.cloneContainers[1].x = -(galleryEl.clientWidth - 600) - 1600;
                  }else if(app.mode == 'mobile'){
                    that.cloneContainers[1].width = galleryEl.clientWidth + (700 * 2);
                    that.cloneContainers[1].x = -(galleryEl.clientWidth - 700) - 2000;
                  }              
                  that.cloneMasks[1].clear();
                  that.cloneMasks[1].lineStyle(0);
                  that.cloneMasks[1].beginFill(0xff0000, 1);
                  if(app.mode == 'descktop'){
                    that.cloneMasks[1].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                  }else if(app.mode == 'tablet'){
                    that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                  }else if(app.mode == 'mobile'){
                    that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                  }
                  that.cloneMasks[1].endFill();              
                }
            });
            
          }, 100);
        }        
      }
    }

    this.tabs = {
      init: function(){
        const that = this;      
        let width = (100/document.querySelectorAll('.nav__tabs li').length);
        TweenMax.set(document.querySelectorAll('.nav__tabs li'), {width: width+'%'});
        document.querySelector('.nav__tabs li:first-child').classList.add('current');
        TweenMax.set('.tabs__list > li:first-child', {display: 'block'});
        let current = document.querySelector('.nav__tabs ul li.current span').innerText;
        document.querySelector('.nav__tabs .nav__tabs_title').innerText = current;
        console.log(current);
        document.querySelectorAll('.nav__tabs li').forEach(function(el, i){
          el.addEventListener('click', that.onClick);
          el.addEventListener('mouseenter', that.onHover);
          el.addEventListener('mouseleave', that.onHover);
        });
        document.querySelector('.nav__tabs_title').addEventListener('click', function(e){
          let active = this.classList.contains('active');
          if(!active){
            TweenMax.set('.nav__tabs ul', {display: 'flex'});
            TweenMax.from('.nav__tabs ul', 0.6, {height: 0, ease: Power3.easeInOut});
            this.classList.add('active');
          }else{          
            TweenMax.to('.nav__tabs ul', 0.6, {height: 0, ease: Power3.easeInOut, onComplete(){
              TweenMax.set('.nav__tabs ul', {clearProps: 'all'});
            }});
            this.classList.remove('active');
          }
          console.log(active);
        });
      },
      onClick: function(e){
        if(e.currentTarget.classList.contains('current'))return;
        let target = e.currentTarget.getAttribute('data-target');
        let current = document.querySelector('.nav__tabs li.current').getAttribute('data-target');
        let text = this.querySelector('span').innerText;
        console.log(text);
        document.querySelector('.nav__tabs_title').innerText = text;
        document.querySelector('.nav__tabs li.current').classList.remove('current');
        e.currentTarget.classList.add('current');      
  
        TweenMax.set(this.querySelector('i'), { transformOrigin: '0 0' });
        TweenMax.to('.nav__tabs [data-target="'+current+'"] span', 0.5, { color: '#ee412a', ease: Power2.easeOut });
        TweenMax.to(this.querySelector('span'), 0.5, { color: '#fff', ease: Power2.easeOut });
        TweenMax.to(this.querySelector('i'), 0.5, { scaleY: 0, ease: Power2.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 1});
  
        new TimelineMax()
          .to('.tabs__list #'+current, 0.6, {opacity: 0, x: '-50%', ease: Power2.easeIn})
          .set('.tabs__list #'+current, {clearProps: 'all'})
          .set('.tabs__list #'+target, {display: 'block'})
          .from('.tabs__list #'+target, 0.6, {opacity: 0, x: '50%', ease: Power2.easeOut})
      },
      onHover: function(e){
        if(e.type == 'mouseenter'){
          TweenMax.to('.cursor .circle', 0.5, {backgroundColor: '#fff'});
        }else{
          TweenMax.to('.cursor .circle', 0.5, {backgroundColor: '#ee412a'});
        }
      }
    };

    this.map = {      
      init: function(){        
          var myLatLong = { lat: -0.650633, lng: 73.172559 };
          map = new google.maps.Map(document.getElementById("map"), {
            center: myLatLong,
            zoom: 12,
            scrollwheel: false,
            mapTypeControl: false,
            streetViewControl: false,
            //zoomControl: false,            
          });
      }
    }
  
    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };

    this.weather = {
      chart: null,
      init: function(){
        let dates = [
          '2015-06-15',
          '2016-06-15',
          '2017-06-15',
          '2018-06-15',
          '2019-06-15'
        ];
        let dataT = [];
        let dataP = [];
        for(var i in dates){
          let date = dates[i];
          $.get('https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=58ef83e2070f431fb6a105633200303&q=маврикий&format=json&date='+date+'&tp=24&lang=ru', function(res){            
            dataT.push(Number(res.data.weather[0].avgtempC));
            dataP.push(Number(res.data.weather[0].hourly[0].precipMM));
            console.log(dataT, dataP);
            if(dataT.length == 5){              
              root.weather.chart = Highcharts.chart('container', {
                title: {
                  text: 'Маврикий'
                },                
                chart: {
                    type: 'spline'
                },              
                xAxis: {
                    categories: ['Jun 2015', 'Jun 2016', 'Jun 2017', 'Jun 2018', 'Jun 2019']
                },
                yAxis: [
                  {
                    labels: {
                      formatter: function() {
                          return this.value + '°C';
                      }
                    },
                    title: ''
                  },
                  { // right y axis
                    linkedTo: 0,
                    gridLineWidth: 0,
                    opposite: true,
                    title: {
                        text: null
                    },
                    labels: {
                        align: 'right',
                        step: 1,
                        formatter: function() {
                          return this.value + 'mm';
                        }
                        //format: '{value:.,0f}'
                    },
                    showFirstLabel: false
                }
                ],
                legend: {
                  align: 'left'
                },
                series: [{
                    name: 'Temperature',
                    data: dataT,
                    color: '#5ac0b0',
                }, {
                    name: 'Rainfall',
                    data: dataP,
                    color: '#ee412a',
                }]
              });
            }
          });
        }
        

        document.querySelector('[data-action="climate-modal"]').addEventListener('click', root.weather.open);
        document.querySelector('.modal__weather .close').addEventListener('click', root.weather.close);        
      },
      open: function(e){
        e.preventDefault();
        new TimelineMax().set('.modal__weather', {display: 'block'})
          .from('.modal__weather', 0.6, {opacity: 0, scale: 0.9, ease: Power2.easeOut})
          .from('.modal__weather h2 span', 0.6, {opacity: 0, rotationX: 90, ease: Power2.easeOut}, '-=0.1')
          .from('.modal__weather .close', 0.6, {scale: 0, ease: Power2.easeOut}, '-=0.3')
      },
      close: function(e){
        e.preventDefault();
        new TimelineMax()
          .to('.modal__weather', 0.6, {opacity: 0, scale: 0.9, ease: Power2.easeIn})
          .set('.modal__weather', {clearProps: 'all'})
      }
    };
  
    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();
        that.sliders.resize();
      });
      window.addEventListener('orientationchange', function(e){
        setTimeout(function(){
          heightUpdate();
          that.sliders.resize();
        }, 100);
      });

      document.querySelectorAll('.slider-button-prev, .slider-button-next').forEach(function (el, i) {
        el.addEventListener('mouseenter', function (e) {        
          if (this.classList.contains('swiper-button-disabled')) return;
          TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
          TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
          //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#ee412a', ease: Power3.easeOut });        
          if (this.closest('.catalog__slider')){
            TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#ee412a', ease: Power3.easeOut });
          }
        });
        el.addEventListener('mouseleave', function (e) {        
          TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeIn });
          TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeIn });
          //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#fff', ease: Power3.easeOut });        
          if (this.closest('.catalog__slider')){
            TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#fff', ease: Power3.easeIn });
          }        
        });
      });
    }
  
    this.loader.init(); 
};

  /* ==============================================================
                          HOTEL CARD INIT
   ============================================================== */
   const _hotel = function () {
    const root = this;
  
    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [         
          'pixi',
          'swiper',
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;
  
        window.scrollTo(0, 0);
  
        TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;
  
        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });
  
        this.scripts.forEach(function (n) {          
          let src;
          if(n == 'map'){
            src = app.resours[n];
          }else{
            src = './js/lib/' + app.resours[n];
          }          
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {          
            that.resourcesDone++;
            that.loading();
          }
        });      
      },
      loading: function () {
        const that = this;
        if (this.resources == this.resourcesDone) {          
          let tl = new TimelineMax();          
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut}, '-=0.6')          
          .add(function(){          
            root.tabs.init();
            root.sliders.init();
            root.eventsInit();
            root.cursor.init();
            app.globalEvents();
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 , onComplete: that.loaded}, '-=0.3')          
        }
      },
      loaded: function () {
        const that = this;
        root.sliders.resize();
        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });
          root.sliders.resize();
        })
        .staggerFrom(document.querySelectorAll('.card__hero .swiper-slide-active .slide--content h2, .card__hero .swiper-slide-active .slide--content .slide--text'), 1, { y: 50, opacity: 0, ease: Power2.easeOut }, 0.1, '+=0.3')
        .from('header, .card__hero .breadcrumb', 0.8, { opacity: 0 }, '-=0.5')
        .from('.card__hero .slider-button-prev, .card__hero .slider-button-next, .card__hero .slider-pagination, .card__heroe_link', 0.8, { opacity: 0 }, '-=0.4')
        .set('.card__hero .slider-button-prev, .card__hero .slider-button-next, .card__hero .slider-pagination, .card__heroe_link', { clearProps: 'all' })
        
      },
    };

    this.sliders = {
      singleSliders: null,
      catalogSlider: null,
      init: function(){
        this.singleSlider = new Swiper('.single-slider .swiper-container', {
          // Optional parameters
          init: false,
          speed: 1000,
          followFinger: false,
          //simulateTouch: false,        
          // If we need pagination
          pagination: {
            el: '.slider-pagination',
            type: 'fraction'
          },
          // Navigation arrows
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          }
        });
        this.catalogSlider = new Swiper('.catalog__slider .swiper-container', {
          // Optional parameters    
          speed: 800,
          //simulateTouch: false,        
          followFinger: false,
          slidesPerView: 3,
          spaceBetween: 60,
          // If we need pagination
          // pagination: {
          //   el: '.slider-pagination',
          //   type: 'fraction'
          // },
          // Navigation arrows
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          },
          breakpoints: {
            992: {
              slidesPerView: 'auto'
            },
            576: {
              slidesPerView: 'auto',
              spaceBetween: 20,
            }
          },
        });
        this.events();
        if(this.singleSlider.length){
          this.singleSlider.forEach(function(el, i){
            el.init();    
          });          
        }else{
          this.singleSlider.init();
        }        
      },
      events: function(){
        if(this.singleSlider.length){
          this.singleSlider.forEach(function(el, i){
            el.on('init', function () {        
              const that = this;
              function heroBgCover(el) {
                let ratio = el.width / el.height;
                let size;
                if(app.mode == 'descktop'){
                  size = (325 * 2);
                }else if(app.mode == 'tablet'){
                  size = (600 * 2);
                }else if(app.mode == 'mobile'){
                  size = (700 * 2);
                }
                if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
                  return {
                    width: (that.el.clientWidth + size),
                    height: (that.el.clientWidth + size) / ratio,
                    x: 0,
                    y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
                  }
                } else {
                  return {
                    width: that.el.clientHeight * ratio,
                    height: that.el.clientHeight,
                    x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
                    y: 0
                  }
                }
              }

              let galleryEl = this.el.closest('.single-slider');
              this.gallery = new PIXI.Application({
                width: galleryEl.clientWidth,
                height: galleryEl.clientHeight,
                backgroundColor: 0x000000
              });
              galleryEl.appendChild(this.gallery.view);
              this.rootContainer = new PIXI.Container();
              this.gallery.stage.addChild(this.rootContainer);
              this.containers = [];
              this.cloneContainers = [];
              this.images = [];
              this.cloneImages = [];
              this.masks = [];
              this.cloneMasks = [];

              this.mask = new PIXI.Graphics();
              this.mask.lineStyle(0);
              this.mask.beginFill(0xff0000, 1);
              if(app.mode == 'descktop'){
                this.mask.drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
              }else if(app.mode == 'tablet'){
                this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
              }else if(app.mode == 'mobile'){
                this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
              }
              this.mask.endFill();

              this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
                let src = el.getAttribute('data-src');
                let container = new PIXI.Container();
                let image = PIXI.Sprite.from(src);
                let mask = that.mask.clone();          
                container.addChild(mask);          
                image.anchor.x = 0.5;
                image.anchor.y = 0.5;          
                image.width = heroBgCover(el).width;
                image.height = heroBgCover(el).height;          
                image.x = heroBgCover(el).x + (image.width / 2);
                image.y = heroBgCover(el).y + (image.height / 2);
                image.alpha = (i == 0 ? 0.7 : 0.5);
                if(app.mode == 'descktop'){
                  container.width = galleryEl.clientWidth + (325 * 2);
                  container.x = (galleryEl.clientWidth * i) - 325;
                }else if(app.mode == 'tablet'){
                  container.width = galleryEl.clientWidth + (600 * 2);
                  container.x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
                }else if(app.mode == 'mobile'){
                  container.width = galleryEl.clientWidth + (700 * 2);
                  container.x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
                }
                that.rootContainer.addChild(container);
                container.addChild(image);
                image.mask = mask;
                

                if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
                  let cloneImage = PIXI.Sprite.from(src);
                  cloneImage.width = heroBgCover(el).width;
                  cloneImage.height = heroBgCover(el).height;
                  cloneImage.x = heroBgCover(el).x;
                  cloneImage.y = heroBgCover(el).y;
                  cloneImage.alpha = 0.5;
                  let cloneContaner = new PIXI.Container();
                  that.rootContainer.addChild(cloneContaner);
                  if(app.mode == 'descktop'){
                    cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                    cloneContaner.x = -galleryEl.clientWidth - 325;
                  }else if(app.mode == 'tablet'){
                    cloneContaner.width = galleryEl.clientWidth + (600 * 2);
                    cloneContaner.x = -(galleryEl.clientWidth - 600) - 1600;
                  }else if(app.mode == 'mobile'){
                    cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                    cloneContaner.x = -(galleryEl.clientWidth - 700) - 2000;
                  }
                  let cloneMask = that.mask.clone();
                  //cloneMask.x = -galleryEl.clientWidth;
                  cloneContaner.addChild(cloneMask);
                  cloneContaner.addChild(cloneImage);
                  cloneImage.mask = cloneMask;
                  that.cloneMasks.push(cloneMask);
                  that.cloneContainers.push(cloneContaner);
                  that.cloneImages.push(cloneImage);
                } else if (i == 0) {
                  let cloneImage = PIXI.Sprite.from(src);
                  cloneImage.width = heroBgCover(el).width;
                  cloneImage.height = heroBgCover(el).height;
                  cloneImage.x = heroBgCover(el).x;
                  cloneImage.y = heroBgCover(el).y;
                  cloneImage.alpha = 0.5;
                  let cloneContaner = new PIXI.Container();            
                  that.rootContainer.addChild(cloneContaner);
                  if(app.mode == 'descktop'){
                    cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                    cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                  }else if(app.mode == 'tablet'){
                    cloneContaner.width = galleryEl.clientWidth + (600 * 2);              
                    cloneContaner.x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                  }else if(app.mode == 'mobile'){
                    cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                    cloneContaner.x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                  }
                  let cloneMask = that.mask.clone();
                  //cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
                  cloneContaner.addChild(cloneMask);            
                  cloneContaner.addChild(cloneImage);
                  cloneImage.mask = cloneMask;
                  that.cloneMasks.push(cloneMask);            
                  that.cloneContainers.push(cloneContaner);
                  that.cloneImages.push(cloneImage);
                }
                that.containers.push(container);
                that.images.push(image);
                that.masks.push(mask);

              });
            });
            el.on('slideChangeTransitionStart', function () {
              let that = this;
              let x;
              if(app.mode == 'descktop'){
                x = this.el.clientWidth * this.realIndex;
              }else if(app.mode == 'tablet'){
                x = (this.el.clientWidth + 400) * this.realIndex;
              }else if(app.mode == 'mobile'){
                x = (this.el.clientWidth + 600) * this.realIndex;
              }
              if (this.realIndex > this.previousIndex) {
                this.images.forEach(function (el, i) {
                  TweenMax.to(el, 0.8, {
                    alpha: function () {
                      return that.realIndex == i ? 0.7 : 0.5;
                    }, ease: Power2.easeIn
                  });
                  let scale = el.scale;
                  new TimelineMax()
                    .to(el.skew, 0.5, { x: -0.6, ease: Power2.easeIn }, 'start')
                    .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
                    .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
                    .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
                });
                new TimelineMax()
                  .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
                  .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: -34, scale: 1.2, ease: Power1.easeIn }, 'start')
                  .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
              } else {
                this.images.forEach(function (el, i) {
                  TweenMax.to(el, 0.8, {
                    alpha: function () {
                      return that.realIndex == i ? 0.7 : 0.5;
                    }, ease: Power2.easeIn
                  });
                  let scale = el.scale;
                  new TimelineMax()
                  .to(el.skew, 0.5, { x: 0.6, ease: Power2.easeIn }, 'start')
                  .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
                  .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
                  .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
                });
                new TimelineMax()
                  .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
                  .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 34, scale: 1.2, ease: Power1.easeIn }, 'start')
                  .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
              }
            });
          });
        }else{
          this.singleSlider.on('init', function () {
            const that = this;
            function heroBgCover(el) {
              let ratio = el.width / el.height;
              let size;
              if(app.mode == 'descktop'){
                size = (325 * 2);
              }else if(app.mode == 'tablet'){
                size = (600 * 2);
              }else if(app.mode == 'mobile'){
                size = (700 * 2);
              }
              if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
                return {
                  width: (that.el.clientWidth + size),
                  height: (that.el.clientWidth + size) / ratio,
                  x: 0,
                  y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
                }
              } else {
                return {
                  width: that.el.clientHeight * ratio,
                  height: that.el.clientHeight,
                  x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
                  y: 0
                }
              }
            }
    
            let galleryEl = this.el.closest('.single-slider');
            this.gallery = new PIXI.Application({
              width: galleryEl.clientWidth,
              height: galleryEl.clientHeight,
              backgroundColor: 0x000000
            });
            galleryEl.appendChild(this.gallery.view);
            this.rootContainer = new PIXI.Container();
            this.gallery.stage.addChild(this.rootContainer);
            this.containers = [];
            this.cloneContainers = [];
            this.images = [];
            this.cloneImages = [];
            this.masks = [];
            this.cloneMasks = [];
    
            this.mask = new PIXI.Graphics();
            this.mask.lineStyle(0);
            this.mask.beginFill(0xff0000, 1);
            if(app.mode == 'descktop'){
              this.mask.drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
            }else if(app.mode == 'tablet'){
              this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
            }else if(app.mode == 'mobile'){
              this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
            }
            this.mask.endFill();
    
            this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
              let src = el.getAttribute('data-src');
              let container = new PIXI.Container();
              let image = PIXI.Sprite.from(src);
              let mask = that.mask.clone();          
              container.addChild(mask);          
              image.anchor.x = 0.5;
              image.anchor.y = 0.5;          
              image.width = heroBgCover(el).width;
              image.height = heroBgCover(el).height;          
              image.x = heroBgCover(el).x + (image.width / 2);
              image.y = heroBgCover(el).y + (image.height / 2);
              image.alpha = (i == 0 ? 0.7 : 0.5);
              if(app.mode == 'descktop'){
                container.width = galleryEl.clientWidth + (325 * 2);
                container.x = (galleryEl.clientWidth * i) - 325;
              }else if(app.mode == 'tablet'){
                container.width = galleryEl.clientWidth + (600 * 2);
                container.x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
              }else if(app.mode == 'mobile'){
                container.width = galleryEl.clientWidth + (700 * 2);
                container.x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
              }
              that.rootContainer.addChild(container);
              container.addChild(image);
              image.mask = mask;
              
    
              if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
                let cloneImage = PIXI.Sprite.from(src);
                cloneImage.width = heroBgCover(el).width;
                cloneImage.height = heroBgCover(el).height;
                cloneImage.x = heroBgCover(el).x;
                cloneImage.y = heroBgCover(el).y;
                cloneImage.alpha = 0.5;
                let cloneContaner = new PIXI.Container();
                that.rootContainer.addChild(cloneContaner);
                if(app.mode == 'descktop'){
                  cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                  cloneContaner.x = -galleryEl.clientWidth - 325;
                }else if(app.mode == 'tablet'){
                  cloneContaner.width = galleryEl.clientWidth + (600 * 2);
                  cloneContaner.x = -(galleryEl.clientWidth - 600) - 1600;
                }else if(app.mode == 'mobile'){
                  cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                  cloneContaner.x = -(galleryEl.clientWidth - 700) - 2000;
                }
                let cloneMask = that.mask.clone();
                //cloneMask.x = -galleryEl.clientWidth;
                cloneContaner.addChild(cloneMask);
                cloneContaner.addChild(cloneImage);
                cloneImage.mask = cloneMask;
                that.cloneMasks.push(cloneMask);
                that.cloneContainers.push(cloneContaner);
                that.cloneImages.push(cloneImage);
              } else if (i == 0) {
                let cloneImage = PIXI.Sprite.from(src);
                cloneImage.width = heroBgCover(el).width;
                cloneImage.height = heroBgCover(el).height;
                cloneImage.x = heroBgCover(el).x;
                cloneImage.y = heroBgCover(el).y;
                cloneImage.alpha = 0.5;
                let cloneContaner = new PIXI.Container();            
                that.rootContainer.addChild(cloneContaner);
                if(app.mode == 'descktop'){
                  cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                  cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                }else if(app.mode == 'tablet'){
                  cloneContaner.width = galleryEl.clientWidth + (600 * 2);              
                  cloneContaner.x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }else if(app.mode == 'mobile'){
                  cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                  cloneContaner.x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }
                let cloneMask = that.mask.clone();
                //cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
                cloneContaner.addChild(cloneMask);            
                cloneContaner.addChild(cloneImage);
                cloneImage.mask = cloneMask;
                that.cloneMasks.push(cloneMask);            
                that.cloneContainers.push(cloneContaner);
                that.cloneImages.push(cloneImage);
              }
              that.containers.push(container);
              that.images.push(image);
              that.masks.push(mask);
    
            });
          });
          this.singleSlider.on('slideChangeTransitionStart', function () {
            let that = this;
            let x;
            if(app.mode == 'descktop'){
              x = this.el.clientWidth * this.realIndex;
            }else if(app.mode == 'tablet'){
              x = (this.el.clientWidth + 400) * this.realIndex;
            }else if(app.mode == 'mobile'){
              x = (this.el.clientWidth + 600) * this.realIndex;
            }
            if (this.realIndex > this.previousIndex) {
              this.images.forEach(function (el, i) {
                TweenMax.to(el, 0.8, {
                  alpha: function () {
                    return that.realIndex == i ? 0.7 : 0.5;
                  }, ease: Power2.easeIn
                });
                let scale = el.scale;
                new TimelineMax()
                  .to(el.skew, 0.5, { x: -0.6, ease: Power2.easeIn }, 'start')
                  .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
                  .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
                  .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
              });
              new TimelineMax()
                .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
                .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: -34, scale: 1.2, ease: Power1.easeIn }, 'start')
                .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
            } else {
              this.images.forEach(function (el, i) {
                TweenMax.to(el, 0.8, {
                  alpha: function () {
                    return that.realIndex == i ? 0.7 : 0.5;
                  }, ease: Power2.easeIn
                });
                let scale = el.scale;
                new TimelineMax()
                .to(el.skew, 0.5, { x: 0.6, ease: Power2.easeIn }, 'start')
                .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
                .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
                .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
              });
              new TimelineMax()
                .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
                .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 34, scale: 1.2, ease: Power1.easeIn }, 'start')
                .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
            }
          });       
        }
        if(this.catalogSlider.length){
          this.catalogSlider.forEach(function(el, i){
            el.on('slideChangeTransitionStart', function () {
              if (this.realIndex > this.previousIndex) {
                new TimelineMax()
                .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: -30, scale: 1.2, ease: Power1.easeIn})
                .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
              } else {
                new TimelineMax()
                .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 30, scale: 1.2, ease: Power1.easeIn})
                .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
              }
            });
          });
        }else{
          this.catalogSlider.on('slideChangeTransitionStart', function () {
            if (this.realIndex > this.previousIndex) {
              new TimelineMax()
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: -30, scale: 1.2, ease: Power1.easeIn})
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
            } else {
              new TimelineMax()
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 30, scale: 1.2, ease: Power1.easeIn})
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
            }
          });
        }
      },    
      resize: function(){
        if(this.singleSlider.length){          
          this.singleSlider.forEach(function(el, i){
            const that = el;
            function heroBgCover(el) {
              let ratio = el.width / el.height;
              let size;
              if(app.mode == 'descktop'){
                size = (325 * 2);
              }else if(app.mode == 'tablet'){
                size = (600 * 2);
              }else if(app.mode == 'mobile'){
                size = (700 * 2);
              }
              if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
                return {
                  width: (that.el.clientWidth + size),
                  height: (that.el.clientWidth + size) / ratio,
                  x: 0,
                  y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
                }
              } else {
                return {
                  width: that.el.clientHeight * ratio,
                  height: that.el.clientHeight,
                  x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
                  y: 0
                }
              }
            }
            let x;
              if(app.mode == 'descktop'){
                x = that.el.clientWidth * that.realIndex;
              }else if(app.mode == 'tablet'){
                x = (that.el.clientWidth + 400) * that.realIndex;
              }else if(app.mode == 'mobile'){
                x = (that.el.clientWidth + 600) * that.realIndex;
              }
            that.rootContainer.x = -x;
            let galleryEl = that.el.closest('.single-slider');
            that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
            setTimeout(function(){
              that.images.forEach(function(el, i){        
                el.width = heroBgCover(el.texture).width;
                el.height = heroBgCover(el.texture).height;
                el.x = heroBgCover(el).x + (el.width / 2);
                el.y = heroBgCover(el).y + (el.height / 2);
                if(app.mode == 'descktop'){
                  that.containers[i].width = galleryEl.clientWidth + (325 * 2);
                  that.containers[i].x = (galleryEl.clientWidth * i) - 325;
                }else if(app.mode == 'tablet'){
                  that.containers[i].width = galleryEl.clientWidth + (600 * 2);
                  that.containers[i].x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
                }else if(app.mode == 'mobile'){
                  that.containers[i].width = galleryEl.clientWidth + (700 * 2);
                  that.containers[i].x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
                }          
                that.masks[i].clear();
                that.masks[i].lineStyle(0);
                that.masks[i].beginFill(0xffffff, 0.5);          
                if(app.mode == 'descktop'){
                  that.masks[i].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                }else if(app.mode == 'tablet'){
                  that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                }else if(app.mode == 'mobile'){
                  that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                }
                that.masks[i].endFill();
              });
              that.cloneImages.forEach(function(el, i){
                  el.width = heroBgCover(el.texture).width;
                  el.height = heroBgCover(el.texture).height;
                  el.x = heroBgCover(el).x + (el.width / 2);
                  el.y = heroBgCover(el).y + (el.height / 2);
                  if(i == 0){
                    that.cloneImages[0].width = heroBgCover(that.cloneImages[0].texture).width;
                    that.cloneImages[0].height = heroBgCover(that.cloneImages[0].texture).height;
                    that.cloneImages[0].x = heroBgCover(that.cloneImages[0].texture).x;
                    that.cloneImages[0].y = heroBgCover(that.cloneImages[0].texture).y;
                    if(app.mode == 'descktop'){
                      that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                      that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                    }else if(app.mode == 'tablet'){
                      that.cloneContainers[0].width = galleryEl.clientWidth + (600 * 2);              
                      that.cloneContainers[0].x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                    }else if(app.mode == 'mobile'){
                      that.cloneContainers[0].width = galleryEl.clientWidth + (700 * 2);
                      that.cloneContainers[0].x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                    }              
                    that.cloneMasks[0].clear();
                    that.cloneMasks[0].lineStyle(0);
                    that.cloneMasks[0].beginFill(0xff0000, 0.5);
                    if(app.mode == 'descktop'){
                      that.cloneMasks[0].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                    }else if(app.mode == 'tablet'){
                      that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                    }else if(app.mode == 'mobile'){
                      that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                    }
                    that.cloneMasks[0].endFill();            
                  }else {            
                    that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                    that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                    that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                    that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                    if(app.mode == 'descktop'){
                      that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                      that.cloneContainers[1].x = -galleryEl.clientWidth - 325;
                    }else if(app.mode == 'tablet'){
                      that.cloneContainers[1].width = galleryEl.clientWidth + (600 * 2);
                      that.cloneContainers[1].x = -(galleryEl.clientWidth - 600) - 1600;
                    }else if(app.mode == 'mobile'){
                      that.cloneContainers[1].width = galleryEl.clientWidth + (700 * 2);
                      that.cloneContainers[1].x = -(galleryEl.clientWidth - 700) - 2000;
                    }              
                    that.cloneMasks[1].clear();
                    that.cloneMasks[1].lineStyle(0);
                    that.cloneMasks[1].beginFill(0xff0000, 1);
                    if(app.mode == 'descktop'){
                      that.cloneMasks[1].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                    }else if(app.mode == 'tablet'){
                      that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                    }else if(app.mode == 'mobile'){
                      that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                    }
                    that.cloneMasks[1].endFill();              
                  }
              });
              
            }, 100);
          });          
        }else{
          const that = this.singleSlider;          
          function heroBgCover(el) {
            let ratio = el.width / el.height;
            let size;
            if(app.mode == 'descktop'){
              size = (325 * 2);
            }else if(app.mode == 'tablet'){
              size = (600 * 2);
            }else if(app.mode == 'mobile'){
              size = (700 * 2);
            }
            if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
              return {
                width: (that.el.clientWidth + size),
                height: (that.el.clientWidth + size) / ratio,
                x: 0,
                y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
              }
            } else {
              return {
                width: that.el.clientHeight * ratio,
                height: that.el.clientHeight,
                x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
                y: 0
              }
            }
          }
          let x;
            if(app.mode == 'descktop'){
              x = that.el.clientWidth * that.realIndex;
            }else if(app.mode == 'tablet'){
              x = (that.el.clientWidth + 400) * that.realIndex;
            }else if(app.mode == 'mobile'){
              x = (that.el.clientWidth + 600) * that.realIndex;
            }
          that.rootContainer.x = -x;
          let galleryEl = that.el.closest('.single-slider');
          that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
          setTimeout(function(){
            that.images.forEach(function(el, i){        
              el.width = heroBgCover(el.texture).width;
              el.height = heroBgCover(el.texture).height;
              el.x = heroBgCover(el).x + (el.width / 2);
              el.y = heroBgCover(el).y + (el.height / 2);
              if(app.mode == 'descktop'){
                that.containers[i].width = galleryEl.clientWidth + (325 * 2);
                that.containers[i].x = (galleryEl.clientWidth * i) - 325;
              }else if(app.mode == 'tablet'){
                that.containers[i].width = galleryEl.clientWidth + (600 * 2);
                that.containers[i].x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
              }else if(app.mode == 'mobile'){
                that.containers[i].width = galleryEl.clientWidth + (700 * 2);
                that.containers[i].x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
              }          
              that.masks[i].clear();
              that.masks[i].lineStyle(0);
              that.masks[i].beginFill(0xffffff, 0.5);          
              if(app.mode == 'descktop'){
                that.masks[i].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
              }else if(app.mode == 'tablet'){
                that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
              }else if(app.mode == 'mobile'){
                that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
              }
              that.masks[i].endFill();
            });
            that.cloneImages.forEach(function(el, i){
                el.width = heroBgCover(el.texture).width;
                el.height = heroBgCover(el.texture).height;
                el.x = heroBgCover(el).x + (el.width / 2);
                el.y = heroBgCover(el).y + (el.height / 2);
                if(i == 0){
                  that.cloneImages[0].width = heroBgCover(that.cloneImages[0].texture).width;
                  that.cloneImages[0].height = heroBgCover(that.cloneImages[0].texture).height;
                  that.cloneImages[0].x = heroBgCover(that.cloneImages[0].texture).x;
                  that.cloneImages[0].y = heroBgCover(that.cloneImages[0].texture).y;
                  if(app.mode == 'descktop'){
                    that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                    that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                  }else if(app.mode == 'tablet'){
                    that.cloneContainers[0].width = galleryEl.clientWidth + (600 * 2);              
                    that.cloneContainers[0].x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                  }else if(app.mode == 'mobile'){
                    that.cloneContainers[0].width = galleryEl.clientWidth + (700 * 2);
                    that.cloneContainers[0].x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                  }              
                  that.cloneMasks[0].clear();
                  that.cloneMasks[0].lineStyle(0);
                  that.cloneMasks[0].beginFill(0xff0000, 0.5);
                  if(app.mode == 'descktop'){
                    that.cloneMasks[0].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                  }else if(app.mode == 'tablet'){
                    that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                  }else if(app.mode == 'mobile'){
                    that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                  }
                  that.cloneMasks[0].endFill();            
                }else {            
                  that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                  that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                  that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                  that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                  if(app.mode == 'descktop'){
                    that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                    that.cloneContainers[1].x = -galleryEl.clientWidth - 325;
                  }else if(app.mode == 'tablet'){
                    that.cloneContainers[1].width = galleryEl.clientWidth + (600 * 2);
                    that.cloneContainers[1].x = -(galleryEl.clientWidth - 600) - 1600;
                  }else if(app.mode == 'mobile'){
                    that.cloneContainers[1].width = galleryEl.clientWidth + (700 * 2);
                    that.cloneContainers[1].x = -(galleryEl.clientWidth - 700) - 2000;
                  }              
                  that.cloneMasks[1].clear();
                  that.cloneMasks[1].lineStyle(0);
                  that.cloneMasks[1].beginFill(0xff0000, 1);
                  if(app.mode == 'descktop'){
                    that.cloneMasks[1].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                  }else if(app.mode == 'tablet'){
                    that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                  }else if(app.mode == 'mobile'){
                    that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                  }
                  that.cloneMasks[1].endFill();              
                }
            });
            
          }, 100);
        }        
      }
    }

    this.tabs = {
      init: function(){
        const that = this;      
        let width = (100/document.querySelectorAll('.nav__tabs li').length);
        TweenMax.set(document.querySelectorAll('.nav__tabs li'), {width: width+'%'});
        document.querySelector('.nav__tabs li:first-child').classList.add('current');
        TweenMax.set('.tabs__list > li:first-child', {display: 'block'});
        let current = document.querySelector('.nav__tabs ul li.current span').innerText;
        document.querySelector('.nav__tabs .nav__tabs_title').innerText = current;
        console.log(current);
        document.querySelectorAll('.nav__tabs li').forEach(function(el, i){
          el.addEventListener('click', that.onClick);
          el.addEventListener('mouseenter', that.onHover);
          el.addEventListener('mouseleave', that.onHover);
        });
        document.querySelector('.nav__tabs_title').addEventListener('click', function(e){
          let active = this.classList.contains('active');
          if(!active){
            TweenMax.set('.nav__tabs ul', {display: 'flex'});
            TweenMax.from('.nav__tabs ul', 0.6, {height: 0, ease: Power3.easeInOut});
            this.classList.add('active');
          }else{          
            TweenMax.to('.nav__tabs ul', 0.6, {height: 0, ease: Power3.easeInOut, onComplete(){
              TweenMax.set('.nav__tabs ul', {clearProps: 'all'});
            }});
            this.classList.remove('active');
          }
          console.log(active);
        });
      },
      onClick: function(e){
        if(e.currentTarget.classList.contains('current'))return;
        let target = e.currentTarget.getAttribute('data-target');
        let current = document.querySelector('.nav__tabs li.current').getAttribute('data-target');
        let text = this.querySelector('span').innerText;
        console.log(text);
        document.querySelector('.nav__tabs_title').innerText = text;
        document.querySelector('.nav__tabs li.current').classList.remove('current');
        e.currentTarget.classList.add('current');      
  
        TweenMax.set(this.querySelector('i'), { transformOrigin: '0 0' });
        TweenMax.to('.nav__tabs [data-target="'+current+'"] span', 0.5, { color: '#ee412a', ease: Power2.easeOut });
        TweenMax.to(this.querySelector('span'), 0.5, { color: '#fff', ease: Power2.easeOut });
        TweenMax.to(this.querySelector('i'), 0.5, { scaleY: 0, ease: Power2.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 1});
  
        new TimelineMax()
          .to('.tabs__list #'+current, 0.6, {opacity: 0, x: '-50%', ease: Power2.easeIn})
          .set('.tabs__list #'+current, {clearProps: 'all'})
          .set('.tabs__list #'+target, {display: 'block'})
          .from('.tabs__list #'+target, 0.6, {opacity: 0, x: '50%', ease: Power2.easeOut})
      },
      onHover: function(e){
        if(e.type == 'mouseenter'){
          TweenMax.to('.cursor .circle', 0.5, {backgroundColor: '#fff'});
        }else{
          TweenMax.to('.cursor .circle', 0.5, {backgroundColor: '#ee412a'});
        }
      }
    };

    
  
    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };

    this.weather = {
      chart: null,
      init: function(){
        document.querySelector('[data-action="climate-modal"]').addEventListener('click', root.weather.open);
        document.querySelector('.modal__weather .close').addEventListener('click', root.weather.close);
        root.weather.chart = Highcharts.chart('container', {
          chart: {
              type: 'spline'
          },              
          xAxis: {
              categories: ['Jun 2015', 'Jun 2016', 'Jun 2017', 'Jun 2018', 'Jun 2019']
          },
          yAxis: {
              labels: {
                formatter: function() {
                    return this.value + '°C';
                }                    
            },
            title: ''
          },
          legend: {
            align: 'left'
          },
          series: [{
              name: 'Temperature',
              data: [18, 22, 18, 16, 24],
              color: '#5ac0b0',
          }, {
              name: 'Rainfall',
              data: [16, 18, 24, 20, 18],
              color: '#ee412a',
          }]
        });
      },
      open: function(e){        
        e.preventDefault();
        new TimelineMax().set('.modal__weather', {display: 'block'})
          .from('.modal__weather', 0.6, {opacity: 0, scale: 0.9, ease: Power2.easeOut})
          .from('.modal__weather h2 span', 0.6, {opacity: 0, rotationX: 90, ease: Power2.easeOut}, '-=0.1')
          .from('.modal__weather .close', 0.6, {scale: 0, ease: Power2.easeOut}, '-=0.3')
      },
      close: function(e){
        e.preventDefault();
        new TimelineMax()
          .to('.modal__weather', 0.6, {opacity: 0, scale: 0.9, ease: Power2.easeIn})
          .set('.modal__weather', {clearProps: 'all'})
      }
    };
  
    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();
        that.sliders.resize();
      });
      window.addEventListener('orientationchange', function(e){
        setTimeout(function(){
          heightUpdate();
          that.sliders.resize();
        }, 100);
      });

      document.querySelectorAll('.slider-button-prev, .slider-button-next').forEach(function (el, i) {
        el.addEventListener('mouseenter', function (e) {        
          if (this.classList.contains('swiper-button-disabled')) return;
          TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
          TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
          //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#ee412a', ease: Power3.easeOut });        
          if (this.closest('.catalog__slider')){
            TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#ee412a', ease: Power3.easeOut });
          }
        });
        el.addEventListener('mouseleave', function (e) {        
          TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeIn });
          TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeIn });
          //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#fff', ease: Power3.easeOut });        
          if (this.closest('.catalog__slider')){
            TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#fff', ease: Power3.easeIn });
          }        
        });
      });
    }
  
    this.loader.init(); 
  };

  /* ==============================================================
                          MICE INIT
   ============================================================== */
const _mice = function () {
  const root = this;  

  this.loader = {
    progress: 0,
    resources: 1,
    resourcesDone: 0,
    loaderReady: false,
    scripts:
      [
        'pixi',        
        //'pixiFilters'
      ],    
    resourcesDone: 0,
    init: function () {
      let that = this;

      window.scrollTo(0, 0);

      TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
      TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
      TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
      
      this.resources += document.querySelectorAll('img[data-src]').length        
        + this.scripts.length;

      document.querySelectorAll('img[data-src]').forEach(function (el, i) {
        let src = el.getAttribute('data-src');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          el.src = src;
          that.resourcesDone++;
          that.loading();
        }
      });

      this.scripts.forEach(function (n) {        
        let src = './js/lib/' + app.resours[n];
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = function () {
          if (n == 'pixi') {
            filters();
          }
          that.resourcesDone++;
          that.loading();
        }
      });

      function filters() {
        let src = './js/lib/pixi-filters.js';
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = function () {
          that.resourcesDone++;
          that.loading();
        }
      }      
    },
    loading: function () {
      const that = this;
      if (this.resources == this.resourcesDone) {         
        let tl = new TimelineMax();
        tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
        .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
        .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
        .add(function(){          
          root.hero.render();      
          root.cursor.init();
          root.inquirer.init();
          root.eventsInit();
          app.globalEvents();      
        })
        .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
        .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
        .add(function(){
          that.loaded();
        });       
        
      }
    },
    loaded: function () {
      const that = this;
      new TimelineMax()
      .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
      .add(function(){
        root.hero.startTimer();
        document.querySelector('.loader').remove();
        TweenMax.set('body', { overflow: 'auto' });
        root.hero.resize();        
      })
      .staggerFrom(document.querySelectorAll('.mice__hero h1 span'), 1, { rotationX: 90, opacity: 0, ease: Power2.easeOut }, 0.1, '+=0.3')
      .from('header, .mice__hero .breadcrumb', 0.8, { opacity: 0 }, '-=0.5')
      .from('.hero--scroll', 0.8, { opacity: 0 }, '-=0.4')
      .to(root.hero.heroFilter, 0.8, { innerRadius: 200 }, '-=0.4')
    }
  };

  this.hero = {
    slides: document.querySelectorAll('.leisure__hero_backgrounds img').length,
    slide: 1,
    timer: null,
    transition: false,
    heroBgCover: function (el) {
      let ratio = el.width / el.height;
      if (document.body.clientWidth / window.innerHeight > ratio) {        
        return {          
          width: window.innerWidth,
          height: window.innerWidth / ratio,
          x: 0,
          y: (window.innerHeight - window.innerWidth / ratio) / 2
        }
      } else {        
        return {
          width: window.innerHeight * ratio,
          height: window.innerHeight,
          x: (window.innerWidth - (window.innerHeight * ratio)) / 2,
          y: 0
        }
      }
    },
    render: function () {
      let that = this;      
      that.el = document.querySelector('.mice__hero');
      console.log(that.el);
      that.hero = new PIXI.Application({
        width: that.el.clientWidth,
        height: that.el.clientHeight,
        transparent: true,
        //forceCanvas: true
      });
      that.el.appendChild(that.hero.view);
      that.container = new PIXI.Container();
      that.hero.stage.addChild(that.container);
      that.hero.stage.interactive = true;
      const loader = PIXI.Loader.shared;
      document.querySelectorAll('.leisure__hero_backgrounds img').forEach(function (el, i) {
        loader.add('slide' + (i + 1), el.getAttribute('data-src'));
      });

      loader.load(function (loader, resources) {
        for (i in resources) {
          that[i] = new PIXI.Sprite(resources[i].texture);
          that.container.addChild(that[i]);
          let params = that.heroBgCover(resources[i].data);
          that[i].width = params.width;
          that[i].height = params.height;
          that[i].x = params.x;
          that[i].y = params.y;
          that[i].alpha = 0;
        }
        that.slide1.alpha = 1;
        TweenMax.set('.leisure__hero h1 .switch[data-slide="1"]', { display: 'block' });        
        that.heroFilter = new PIXI.filters.ZoomBlurFilter();
        that.heroFilter.strength = 0.1;
        that.heroFilter.center = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        }
        that.heroFilter.innerRadius = 0;
        that.container.filters = [that.heroFilter];        
        that.el.addEventListener('mousemove', onPointerMove);
        that.el.addEventListener('click', that.onPointerClick);

        function onPointerMove(e) {
          TweenMax.to(that.heroFilter.center, 1, { x: e.clientX, y: e.clientY });
        };
        
      });
    },
     onPointerClick: function(e){
      const that = app.mice.hero;
      if (that.transition) return;
      clearTimeout(that.timer);
      that.transition = true;
      let r = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
      let current = that['slide' + that.slide];
      let next;
      let pS, pE;
      if (that.slide < that.slides) {
        next = that['slide' + (that.slide + 1)];
        pS = ((100 / that.slides) * (that.slide + 1)) - ((100 / that.slides) / 2);
        pE = ((100 / that.slides) * (that.slide + 1));
      } else {
        next = that['slide1'];
        pS = (100 - ((100 / that.slides)));
        pE = 100 / that.slides;
      }      
      new TimelineMax().to(that.heroFilter, 1.3, { innerRadius: r, ease: Power4.easeIn })
        .set(that.heroFilter, { innerRadius: 0, strength: 0 })
        .to('.leisure__hero_pagination .pagination--bar i', 1, { width: pS + '%', ease: Power3.easeIn }, 'transition +=1')
        .to(that.heroFilter, 1, { strength: 2, ease: Power3.easeIn }, 'transition +=1')
        .to(current, 1, { alpha: 0, ease: Power3.easeIn }, 'transition +=1')
        .to(next, 1, { alpha: 1, ease: Power3.easeIn }, 'transition +=1')
        .fromTo('.leisure__hero h1 .switch[data-slide="' + that.slide + '"]', 1, { rotationX: 0, opacity: 1, y: 0 }, { rotationX: 90, opacity: 0, y: 30, ease: Power3.easeIn }, 'transition +=1')
        .set('.leisure__hero h1 .switch[data-slide="' + that.slide + '"]', { display: 'none' })
        .set('.leisure__hero h1 .switch[data-slide="' + (that.slide < that.slides ? (that.slide + 1) : 1) + '"]', { display: 'block' })
        .add(function () {
          let slide;
          if (that.slide < that.slides) {
            slide = (that.slide + 1) < 10 ? '0' + (that.slide + 1) : (that.slide + 1)
          } else {
            slide = '01';
          }          
        })
        .to('.leisure__hero_pagination .pagination--bar i', 1, { width: pE + '%', ease: Power3.easeOut }, 'end')
        .fromTo('.leisure__hero h1 .switch[data-slide="' + (that.slide < that.slides ? (that.slide + 1) : 1) + '"]', 1, { rotationX: -90, opacity: 0, y: 30 }, { rotationX: 0, opacity: 1, y: 0, ease: Power3.easeOut }, 'end')
        .to(that.heroFilter, 1, { strength: 0.1, ease: Power3.easeOut }, 'end')
        .to(that.heroFilter, 1, { innerRadius: 200, ease: Power3.easeOut }, 'end')
        .add(function () {
          if (that.slide < that.slides) {
            that.slide++;
          } else {
            that.slide = 1;
          }
          that.transition = false;
          that.startTimer();

        })
    },
    startTimer: function() {
      const that = this;
      app.mice.hero.timer = setTimeout(function () {
        that.onPointerClick();
      }, 5000);
    },
    resize: function(){
      this.hero.renderer.resize(this.el.clientWidth, window.innerHeight);
      for (var i=0; i<this.slides; i++) {
        let n = i+1;
        let slide = this['slide'+n];        
        let params = this.heroBgCover(slide._texture);
        slide.width = params.width;
        slide.height = params.height;
        slide.x = params.x;
        slide.y = params.y;        
      }
    }
  };

  this.inquirer = {
    slides: null,
    current: 1,
    init: function(){
      let that = this;
      this.slides = document.querySelectorAll('.business__select_slider .slide').length;
      document.querySelector('.business__select_slider .pagination').innerText = this.current+'/'+this.slides;
      document.querySelectorAll('.business__select .custom-select .select--label').forEach(function(el, i){
        el.addEventListener('click', that.onActive);
      });
      document.querySelectorAll('.business__select .custom-select .select--options input[type="radio"]').forEach(function(el, i){
        el.addEventListener('change', that.onChange);        
      });
      document.querySelector('.business__select [data-action]').addEventListener('click', this.onNext);
      TweenMax.set('.business__select_slider [data-slide="1"]', {display: 'block'});
      TweenMax.set('.business__select [data-action="next"]', {opacity: 0});
    },
    onActive: function(e){
      let target = e.currentTarget.closest('.custom-select');
      let active = target.classList.contains('active');
      if(active){
        new TimelineMax().to(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut})
          .set(target.querySelector('.select--options'), {clearProps: 'all'});
        target.classList.remove('active');
      }else{        
        new TimelineMax().set(target.querySelector('.select--options'), {display: 'block'})
          .from(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut});
        target.classList.add('active');          
      }      
    },
    onChange: function(e){
      let that = this;
      let target = e.target.closest('.custom-select');
      let text = e.target.closest('li').querySelector('span').innerText;
      target.querySelector('.select--label span').innerText = text;
      TweenMax.to('.business__select [data-action="next"]', 0.6, {opacity: 1});
      new TimelineMax().to(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut})
          .set(target.querySelector('.select--options'), {clearProps: 'all'});
        target.classList.remove('active');
      
    },
    onNext: function(e){
      const that = app.mice.inquirer;
      let next = (that.current+1);      
      if(that.current < that.slides){
        if(!document.querySelectorAll('.business__select_slider [data-slide="'+that.current+'"] input[type="radio"]:checked').length)return;
        new TimelineMax()
        .set('.business__select_slider', {overflow: 'hidden'})
        .to('.business__select_slider [data-slide="'+that.current+'"]', 0.6, {x: '-100%', opacity: 0, ease: Power3.easeIn})
        .set('.business__select_slider [data-slide="'+that.current+'"]', {clearProps: 'all'})
        .add(function(){          
          that.current++;
          document.querySelector('.business__select_slider .pagination').innerText = that.current+'/'+that.slides;
          TweenMax.to('.business__select [data-action="next"]', 0.6, {opacity: 0});
        })
        .set('.business__select_slider [data-slide="'+next+'"]', {display: 'block'})
        .from('.business__select_slider [data-slide="'+next+'"]', 0.6, {x: '100%', opacity: 0, ease: Power3.easeOut})
        .set('.business__select_slider', {clearProps: 'all'})
        .add(function(){
          if(that.current == that.slides){
            document.querySelector('.business__select [data-action] span').innerText = 'Submit';
          }
        })
      }else{
        let h = document.querySelector('.business__select_slider [data-slide="'+that.current+'"]').clientHeight;        
        new TimelineMax()
          .set('.business__select_slider .thank', {height: h})
          .set('.business__select_slider', {overflow: 'hidden'})
          .to('.business__select_slider [data-slide="'+that.current+'"]', 0.6, {x: '-100%', opacity: 0, ease: Power3.easeIn})
          .to('.business__select_slider .pagination, .business__select [data-action]', 0.6, {opacity: 0}, '-=0.6')
          .set('.business__select_slider [data-slide="'+that.current+'"]', {clearProps: 'all'})
          .set('.business__select_slider .thank', {display: 'flex'})
          .from('.business__select_slider .thank', 0.6, {x: '100%', opacity: 0, ease: Power3.easeOut})
          .set('.business__select_slider', {clearProps: 'all'})
      }
    }
  };


  this.eventsInit = function () {
    const that = this;    
    window.addEventListener('scroll', function (e) {
      let scrollTop = window.pageYOffset;
      header(e);      
    });
    window.addEventListener('resize', function(){
      heightUpdate();
      that.hero.resize();      
    });
  }

  this.cursor = {
    init: function () {
      TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
      document.body.addEventListener('mousemove', function (e) {
        TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
      });      
    }
  }

  
  this.loader.init();
};

/* ==============================================================
                    BUSINESS QUESTIONAIRE INIT
   ============================================================== */
   const _businessQuestionaire = function () {
    const root = this;  
    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [         
          //'pixiFilters'
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;
  
        window.scrollTo(0, 0);
  
        TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;
  
        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });
  
        this.scripts.forEach(function (n) {        
          let src = './js/lib/' + app.resours[n];
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {          
            that.resourcesDone++;
            that.loading();
          }
        });      
      },
      loading: function () {
        const that = this;      
        if(this.resources == this.resourcesDone) {          
          let tl = new TimelineMax();
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
          .add(function(){          
            root.cursor.init();
            root.eventsInit();
            root.inquirer.init();
            app.globalEvents();
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
          .add(function(){
            that.loaded();
          });
          
        }
      },
      loaded: function () {
        const that = this;
        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });        
        })
        .from('header, .breadcrumb', 0.8, { opacity: 0 })
        .from('.business__select h2 span', 1, { rotationX: 90, opacity: 0, ease: Power2.easeOut }, '-=0.5')
        .from('.business__select .description--text', 1, {y: 50, opacity: 0, ease: Power2.easeOut })
        .from('.business__select .business__select_slider', 1, {y: 50, opacity: 0, ease: Power2.easeOut }, '-=0.7')
      },
    };  
  
    this.inquirer = {
      slides: null,
      current: 1,
      init: function(){
        let that = this;
        this.slides = document.querySelectorAll('.business__select_slider .slide').length;
        document.querySelector('.business__select_slider .pagination').innerText = this.current+'/'+this.slides;
        document.querySelectorAll('.business__select .custom-select .select--label').forEach(function(el, i){
          el.addEventListener('click', that.onActive);
        });
        document.querySelectorAll('.business__select .custom-select .select--options input[type="radio"]').forEach(function(el, i){
          el.addEventListener('change', that.onChange);        
        });
        document.querySelector('.business__select [data-action]').addEventListener('click', this.onNext);
        TweenMax.set('.business__select_slider [data-slide="1"]', {display: 'block'});
        TweenMax.set('.business__select [data-action="next"]', {opacity: 0});
  
      },
      onActive: function(e){
        let target = e.currentTarget.closest('.custom-select');
        let active = target.classList.contains('active');
        if(active){
          new TimelineMax().to(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut})
            .set(target.querySelector('.select--options'), {clearProps: 'all'});
          target.classList.remove('active');
        }else{        
          new TimelineMax().set(target.querySelector('.select--options'), {display: 'block'})
            .from(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut});
          target.classList.add('active');          
        }      
      },
      onChange: function(e){
        let that = this;
        let target = e.target.closest('.custom-select');
        let text = e.target.closest('li').querySelector('span').innerText;
        target.querySelector('.select--label span').innerText = text;
        TweenMax.to('.business__select [data-action="next"]', 0.6, {opacity: 1});
        new TimelineMax().to(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut})
            .set(target.querySelector('.select--options'), {clearProps: 'all'});
          target.classList.remove('active');
        
      },
      onNext: function(e){
        const that = app.businessQuestionaire.inquirer;
        let next = (that.current+1);      
        if(that.current < that.slides){
          if(!document.querySelectorAll('.business__select_slider [data-slide="'+that.current+'"] input[type="radio"]:checked').length)return;
          new TimelineMax()
          .set('.business__select_slider', {overflow: 'hidden'})
          .to('.business__select_slider [data-slide="'+that.current+'"]', 0.6, {x: '-100%', opacity: 0, ease: Power3.easeIn})
          .set('.business__select_slider [data-slide="'+that.current+'"]', {clearProps: 'all'})
          .add(function(){          
            that.current++;
            document.querySelector('.business__select_slider .pagination').innerText = that.current+'/'+that.slides;
            TweenMax.to('.business__select [data-action="next"]', 0.6, {opacity: 0});
          })
          .set('.business__select_slider [data-slide="'+next+'"]', {display: 'block'})
          .from('.business__select_slider [data-slide="'+next+'"]', 0.6, {x: '100%', opacity: 0, ease: Power3.easeOut})
          .set('.business__select_slider', {clearProps: 'all'})
          .add(function(){
            if(that.current == that.slides){
              document.querySelector('.business__select [data-action] span').innerText = 'Submit';
            }
          })
        }else{
          let h = document.querySelector('.business__select_slider [data-slide="'+that.current+'"]').clientHeight;        
          new TimelineMax()
            .set('.business__select_slider .thank', {height: h})
            .set('.business__select_slider', {overflow: 'hidden'})
            .to('.business__select_slider [data-slide="'+that.current+'"]', 0.6, {x: '-100%', opacity: 0, ease: Power3.easeIn})
            .to('.business__select_slider .pagination, .business__select [data-action]', 0.6, {opacity: 0}, '-=0.6')
            .set('.business__select_slider [data-slide="'+that.current+'"]', {clearProps: 'all'})
            .set('.business__select_slider .thank', {display: 'flex'})
            .from('.business__select_slider .thank', 0.6, {x: '100%', opacity: 0, ease: Power3.easeOut})
            .set('.business__select_slider', {clearProps: 'all'})
        }
      }
    };
  
    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };
  
    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;      
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();      
      });
    }
  
    this.loader.init(); 
  };

  /* ==============================================================
                          AGENTS INIT
   ============================================================== */
   const _agents = function () {
    const root = this;    
  
    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [         
          
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;
  
        window.scrollTo(0, 0);
  
        TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;
  
        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });
  
        this.scripts.forEach(function (n) {
          let src = app.resours[n];
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {          
            that.resourcesDone++;
            that.loading();
          }
        });
      },
      loading: function () {
        const that = this;      
        if (this.resources == this.resourcesDone) {          
          let tl = new TimelineMax();
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
          .add(function(){          
            root.cursor.init();
            root.eventsInit();
            app.globalEvents();
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
          .add(function(){
            that.loaded();
          });
          
        }
      },
      loaded: function () {
        const that = this;
        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });        
        })      
      },
    };

    this.map = {      
      init: function(){
          var myLatLong = { lat: 49.839683, lng: 24.029717 };
          map = new google.maps.Map(document.getElementById("map"), {
            center: myLatLong,
            zoom: 15,
            marker: true,
            scrollwheel: false,
            mapTypeControl: false,
            streetViewControl: false
          });
          const marker = new google.maps.Marker({
            position: myLatLong,
            map,
            title: "Avialiga",
            icon: {
              url:"./img/icon_map-marker.svg"
            }
          });
      }
    }
  
    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };
  
    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();      
      });
    }
  
    this.loader.init(); 
  };

  /* ==============================================================
                          ABOUT INIT
   ============================================================== */
const _about = function () {
  const root = this;  

  this.loader = {
    progress: 0,
    resources: 1,
    resourcesDone: 0,
    loaderReady: false,
    scripts:
      [
        'pixi',
        'splitText',
        'swiper',
        'aos',
        //'pixiFilters'
      ],
    resourcesDone: 0,
    init: function () {
      let that = this;

      window.scrollTo(0, 0);

      TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
      TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
      TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
      TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
      
      this.resources += document.querySelectorAll('img[data-src]').length        
        + this.scripts.length;

      document.querySelectorAll('img[data-src]').forEach(function (el, i) {
        let src = el.getAttribute('data-src');
        var img = new Image();
        img.src = src;
        img.onload = function () {
          el.src = src;
          that.resourcesDone++;
          that.loading();
        }
      });

      this.scripts.forEach(function (n) {
        let src = './js/lib/' + app.resours[n];
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = function () {
          if (n == 'pixi') {
            filters();
          }
          that.resourcesDone++;
          that.loading();
        }
      });

      function filters() {
        let src = './js/lib/pixi-filters.js';
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = function () {
          that.resourcesDone++;
          that.loading();
        }
      }      
    },
    loading: function () {
      const that = this;
      if (this.resources == this.resourcesDone) {
        let tl = new TimelineMax();
        tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
        .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
        .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
        .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
        .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
        .add(function(){     
          root.hero.render();
          root.tabs.init();
          root.sliders.init();
          root.cursor.init();
          root.eventsInit();
          app.globalEvents();          
        })
        .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
        .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
        .add(function(){
          that.loaded();
        });       
        
      }
    },
    loaded: function () {
      const that = this;
      new TimelineMax()
      .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
      .add(function(){
        root.hero.startTimer();
        document.querySelector('.loader').remove();
        TweenMax.set('body', { overflow: 'auto' });
        root.hero.resize();
        root.sliders.resize();
        root.aosInit();
      })
      .staggerFrom(document.querySelectorAll('.leisure__hero h1 span'), 1, { rotationX: 90, opacity: 0, ease: Power2.easeOut }, 0.1, '+=0.3')
      .from('header, .leisure__hero .breadcrumb', 0.8, { opacity: 0 }, '-=0.5')
      .from('.hero--scroll, .leisure__hero_pagination', 0.8, { opacity: 0 }, '-=0.4')
      .to(root.hero.heroFilter, 0.8, { innerRadius: 200 }, '-=0.4')      
    }
  };

  this.hero = {
    slides: document.querySelectorAll('.leisure__hero_backgrounds img').length,
    slide: 1,
    timer: null,
    transition: false,
    heroBgCover: function (el) {
      let ratio = el.width / el.height;
      if (document.body.clientWidth / window.innerHeight > ratio) {        
        return {          
          width: window.innerWidth,
          height: window.innerWidth / ratio,
          x: 0,
          y: (window.innerHeight - window.innerWidth / ratio) / 2
        }
      } else {        
        return {
          width: window.innerHeight * ratio,
          height: window.innerHeight,
          x: (window.innerWidth - (window.innerHeight * ratio)) / 2,
          y: 0
        }
      }
    },
    render: function () {
      let that = this;
      that.el = document.querySelector('.leisure__hero');
      that.hero = new PIXI.Application({
        width: that.el.clientWidth,
        height: that.el.clientHeight,
        transparent: true,
        //forceCanvas: true
      });
      that.el.appendChild(that.hero.view);
      that.container = new PIXI.Container();
      that.hero.stage.addChild(that.container);
      that.hero.stage.interactive = true;
      const loader = PIXI.Loader.shared;
      document.querySelectorAll('.leisure__hero_backgrounds img').forEach(function (el, i) {
        loader.add('slide' + (i + 1), el.getAttribute('data-src'));
      });

      loader.load(function (loader, resources) {
        for (i in resources) {
          that[i] = new PIXI.Sprite(resources[i].texture);
          that.container.addChild(that[i]);
          let params = that.heroBgCover(resources[i].data);
          that[i].width = params.width;
          that[i].height = params.height;
          that[i].x = params.x;
          that[i].y = params.y;
          that[i].alpha = 0;
        }
        that.slide1.alpha = 1;
        TweenMax.set('.leisure__hero h1 .switch[data-slide="1"]', { display: 'block' });
        document.querySelector('.leisure__hero_pagination .pagination--slide .current').innerHTML = that.slide < 10 ? '0' + that.slide : that.slide;
        document.querySelector('.leisure__hero_pagination .pagination--slide .all').innerHTML = that.slides < 10 ? '0' + that.slides : that.slides;
        that.heroFilter = new PIXI.filters.ZoomBlurFilter();
        that.heroFilter.strength = 0.1;
        that.heroFilter.center = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        }
        that.heroFilter.innerRadius = 0;
        that.container.filters = [that.heroFilter];        
        that.el.addEventListener('mousemove', onPointerMove);
        that.el.addEventListener('click', that.onPointerClick);

        function onPointerMove(e) {
          TweenMax.to(that.heroFilter.center, 1, { x: e.clientX, y: e.clientY });
        };
        
      });
    },
     onPointerClick: function(e){
      const that = root.hero;
      if (that.transition) return;
      clearTimeout(that.timer);
      that.transition = true;
      let r = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
      let current = that['slide' + that.slide];
      let next;
      let pS, pE;
      if (that.slide < that.slides) {
        next = that['slide' + (that.slide + 1)];
        pS = ((100 / that.slides) * (that.slide + 1)) - ((100 / that.slides) / 2);
        pE = ((100 / that.slides) * (that.slide + 1));
      } else {
        next = that['slide1'];
        pS = (100 - ((100 / that.slides)));
        pE = 100 / that.slides;
      }      
      new TimelineMax().to(that.heroFilter, 1.3, { innerRadius: r, ease: Power4.easeIn })
        .set(that.heroFilter, { innerRadius: 0, strength: 0 })
        .to('.leisure__hero_pagination .pagination--bar i', 1, { width: pS + '%', ease: Power3.easeIn }, 'transition +=1')
        .to(that.heroFilter, 1, { strength: 2, ease: Power3.easeIn }, 'transition +=1')
        .to(current, 1, { alpha: 0, ease: Power3.easeIn }, 'transition +=1')
        .to(next, 1, { alpha: 1, ease: Power3.easeIn }, 'transition +=1')
        .fromTo('.leisure__hero h1 .switch[data-slide="' + that.slide + '"]', 1, { rotationX: 0, opacity: 1, y: 0 }, { rotationX: 90, opacity: 0, y: 30, ease: Power3.easeIn }, 'transition +=1')
        .set('.leisure__hero h1 .switch[data-slide="' + that.slide + '"]', { display: 'none' })
        .set('.leisure__hero h1 .switch[data-slide="' + (that.slide < that.slides ? (that.slide + 1) : 1) + '"]', { display: 'block' })
        .add(function () {
          let slide;
          if (that.slide < that.slides) {
            slide = (that.slide + 1) < 10 ? '0' + (that.slide + 1) : (that.slide + 1)
          } else {
            slide = '01';
          }
          document.querySelector('.leisure__hero_pagination .pagination--slide .current').innerHTML = slide;
        })
        .to('.leisure__hero_pagination .pagination--bar i', 1, { width: pE + '%', ease: Power3.easeOut }, 'end')
        .fromTo('.leisure__hero h1 .switch[data-slide="' + (that.slide < that.slides ? (that.slide + 1) : 1) + '"]', 1, { rotationX: -90, opacity: 0, y: 30 }, { rotationX: 0, opacity: 1, y: 0, ease: Power3.easeOut }, 'end')
        .to(that.heroFilter, 1, { strength: 0.1, ease: Power3.easeOut }, 'end')
        .to(that.heroFilter, 1, { innerRadius: 200, ease: Power3.easeOut }, 'end')
        .add(function () {
          if (that.slide < that.slides) {
            that.slide++;
          } else {
            that.slide = 1;
          }
          that.transition = false;
          that.startTimer();

        })
    },
    startTimer: function() {
      const that = this;
      root.hero.timer = setTimeout(function () {
        that.onPointerClick();
      }, 5000);
    },
    resize: function(){
      this.hero.renderer.resize(this.el.clientWidth, window.innerHeight);
      for (var i=0; i<this.slides; i++) {
        let n = i+1;
        let slide = this['slide'+n];        
        let params = this.heroBgCover(slide._texture);
        slide.width = params.width;
        slide.height = params.height;
        slide.x = params.x;
        slide.y = params.y;        
      }
    }
  }

  this.tabs = {
    active: false,
    diskTextAnim: null,
    show: true,
    init: function () {
      let that = this;
      this.render();
      document.querySelectorAll('.homepage__tabs_list span').forEach(function (el, i) {        
        el.addEventListener('click', function (e) {
          if (that.show) that.onActive(e);
        });
        el.addEventListener('mouseenter', function (e) {
          if (that.show) that.onHover(e);
        });
        el.addEventListener('mouseleave', function (e) {
          if (that.show) that.onHover(e);
        });
      });
      document.querySelectorAll('.homepage__tabs_content h3 i').forEach(function (el, i) {
        el.addEventListener('click', function (e) {
          that.onClose(e);
        });
      });

    },
    onHover: function (e) {
      if (!this.active) {
        if (e.type == 'mouseenter') {
          e.target.classList.add('active');
          TweenMax.to(document.querySelectorAll('.homepage__tabs_list span:not(.active)'), 1, { opacity: 0.1, color: '#2f2f2f', ease: Power2.easeOut });
        } else {
          TweenMax.to(document.querySelectorAll('.homepage__tabs_list span'), 0.8, { opacity: 1, color: '#ee412a', ease: Power2.easeOut });
          e.target.classList.remove('active');
        }
      }
    },
    onActive: function (e) {
      this.active = true;
      e.target.classList.add('active');
      let that = this;
      let target = e.target.getAttribute('data-target');
      TweenMax.to('.homepage__tabs_disk .disk--arrow-1', 1.5, { rotation: 360, ease: Power3.easeInOut });
      TweenMax.to('.homepage__tabs_disk .disk--arrow-2', 1.5, { rotation: 360, ease: Power3.easeInOut });
      TweenMax.to('.homepage__tabs_disk .disk--text', 1.5, {
        opacity: 0.5, onComplete: function () {
          that.diskTextAnim.pause();
          TweenMax.set('.homepage__tabs_disk .disk--arrow-1, .homepage__tabs_disk .disk--arrow-2', { clearProps: 'all' });
        }
      });
      let tl = new TimelineMax();
      tl.staggerTo(document.querySelectorAll('.homepage__tabs_list span:not(.active)'), 0.8, { opacity: 0, ease: Power2.easeOut }, 0.1)
        .to(document.querySelector('.homepage__tabs_list span.active'), 0.7, { opacity: 0, ease: Power2.easeOut }, '-=0.8')
        .set('.homepage__tabs_content [data-tab="' + target + '"]', { display: 'block', zIndex: 2, position: 'relative' }, '-=0.5')
        .fromTo('.homepage__tabs_content [data-tab="' + target + '"] h3 div', 0.8, { rotationX: 90, opacity: 0 }, { rotationX: 0, opacity: 1, ease: Power2.easeOut })
        .fromTo('.homepage__tabs_content [data-tab="' + target + '"] p', 1.5, { opacity: 0 }, { opacity: 1, ease: Power2.easeOut }, '-=0.3')
        .set('.homepage__tabs_list', { visibility: 'hidden' })
    },
    onClose: function (e) {
      let that = this;
      TweenMax.to('.homepage__tabs_disk .disk--text', 1.5, {
        opacity: 1, onComplete: function () {
          TweenMax.to('.homepage__tabs_disk .disk--arrow-1', 90, { rotation: 360, repeat: -1, ease: Power0.easeNone });
          TweenMax.to('.homepage__tabs_disk .disk--arrow-2', 15, { rotation: 360, repeat: -1, ease: Power0.easeNone });
          that.diskTextAnim.play();
          document.querySelector('.homepage__tabs_list .active').classList.remove('active');
          that.active = false;
        }
      });
      let tl = new TimelineMax();
      tl.to(e.target.closest('.title'), 0.8, { rotationX: 90, opacity: 0, ease: Power2.easeOut }, 'start')
        .to(e.target.closest('.tab--body').querySelector('p'), 1, { opacity: 0, ease: Power2.easeOut }, 'start')
        .set(e.target.closest('.tab--body'), { clearProps: 'all' })
        .set(document.querySelectorAll('.homepage__tabs_list span'), { color: '#ee412a' })
        .set('.homepage__tabs_list', { visibility: 'visible' })
        .staggerTo(document.querySelectorAll('.homepage__tabs_list span'), 2, { opacity: 1 }, 0.1)
    },
    render: function () {
      let el = document.querySelector('.homepage__tabs_disk .disk--text');
      var text = '';
      for (var i in el.innerText) {
        text += el.innerText[i].replace(' ', '&nbsp;');
        if (i == el.innerText.length - 1) text += '&nbsp;+&nbsp;';
      }
      var textBlock = document.createElement('div');
      textBlock.className = 'text';
      textBlock.innerHTML = text;
      var split = new SplitText(textBlock, { type: "chars", reduceWhiteSpace: false });
      el.innerHTML = '';
      el.appendChild(textBlock);
      var deg = 360 / split.chars.length, origin = 0, radius = 320;
      for (var i in split.chars) {
        split.chars[i].style.height = radius + 'px';
        split.chars[i].style.transform = 'rotate(' + (origin) + 'deg)';
        origin += deg;
      }
      this.diskTextAnim = TweenMax.to('.homepage__tabs_disk .disk--text', 60, { rotation: 360, repeat: -1, ease: Power0.easeNone });
      TweenMax.to('.homepage__tabs_disk .disk--arrow-1', 90, { rotation: 360, repeat: -1, ease: Power0.easeNone });
      TweenMax.to('.homepage__tabs_disk .disk--arrow-2', 15, { rotation: 360, repeat: -1, ease: Power0.easeNone });

      document.querySelectorAll('.homepage__tabs_content .tab--body h3 div').forEach(function (el, i) {
        let split = new SplitText(el, { type: "words" });
        let plus = document.createElement('i');
        plus.innerText = '+';
        split.words[split.words.length - 1].appendChild(plus);
      });      
    }
  };

  this.sliders = {
    singleSliders: null,
    catalogSlider: null,
    init: function(){
      this.singleSlider = new Swiper('.single-slider .swiper-container', {
        // Optional parameters
        init: false,
        speed: 1000,
        followFinger: false,
        //simulateTouch: false,        
        // If we need pagination
        pagination: {
          el: '.slider-pagination',
          type: 'fraction'
        },
        // Navigation arrows
        navigation: {
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        }
      });
      this.catalogSlider = new Swiper('.catalog__slider .swiper-container', {
        // Optional parameters    
        speed: 800,
        //simulateTouch: false,        
        followFinger: false,
        slidesPerView: 3,
        spaceBetween: 60,
        // If we need pagination
        // pagination: {
        //   el: '.slider-pagination',
        //   type: 'fraction'
        // },
        // Navigation arrows
        navigation: {
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        },
        breakpoints: {
          992: {
            slidesPerView: 'auto'
          },
          576: {
            slidesPerView: 'auto',
            spaceBetween: 20,
          }
        },
      });
      this.events();
      if(this.singleSlider.length){
        this.singleSlider.forEach(function(el, i){
          el.init();    
        });          
      }else{
        this.singleSlider.init();
      }        
    },
    events: function(){
      if(this.singleSlider.length){
        this.singleSlider.forEach(function(el, i){
          el.on('init', function () {        
            const that = this;
            function heroBgCover(el) {
              let ratio = el.width / el.height;
              let size;
              if(app.mode == 'descktop'){
                size = (325 * 2);
              }else if(app.mode == 'tablet'){
                size = (600 * 2);
              }else if(app.mode == 'mobile'){
                size = (700 * 2);
              }
              if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
                return {
                  width: (that.el.clientWidth + size),
                  height: (that.el.clientWidth + size) / ratio,
                  x: 0,
                  y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
                }
              } else {
                return {
                  width: that.el.clientHeight * ratio,
                  height: that.el.clientHeight,
                  x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
                  y: 0
                }
              }
            }

            let galleryEl = this.el.closest('.single-slider');
            this.gallery = new PIXI.Application({
              width: galleryEl.clientWidth,
              height: galleryEl.clientHeight,
              backgroundColor: 0x000000
            });
            galleryEl.appendChild(this.gallery.view);
            this.rootContainer = new PIXI.Container();
            this.gallery.stage.addChild(this.rootContainer);
            this.containers = [];
            this.cloneContainers = [];
            this.images = [];
            this.cloneImages = [];
            this.masks = [];
            this.cloneMasks = [];

            this.mask = new PIXI.Graphics();
            this.mask.lineStyle(0);
            this.mask.beginFill(0xff0000, 1);
            if(app.mode == 'descktop'){
              this.mask.drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
            }else if(app.mode == 'tablet'){
              this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
            }else if(app.mode == 'mobile'){
              this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
            }
            this.mask.endFill();

            this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
              let src = el.getAttribute('data-src');
              let container = new PIXI.Container();
              let image = PIXI.Sprite.from(src);
              let mask = that.mask.clone();          
              container.addChild(mask);          
              image.anchor.x = 0.5;
              image.anchor.y = 0.5;          
              image.width = heroBgCover(el).width;
              image.height = heroBgCover(el).height;          
              image.x = heroBgCover(el).x + (image.width / 2);
              image.y = heroBgCover(el).y + (image.height / 2);
              image.alpha = (i == 0 ? 0.7 : 0.5);
              if(app.mode == 'descktop'){
                container.width = galleryEl.clientWidth + (325 * 2);
                container.x = (galleryEl.clientWidth * i) - 325;
              }else if(app.mode == 'tablet'){
                container.width = galleryEl.clientWidth + (600 * 2);
                container.x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
              }else if(app.mode == 'mobile'){
                container.width = galleryEl.clientWidth + (700 * 2);
                container.x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
              }
              that.rootContainer.addChild(container);
              container.addChild(image);
              image.mask = mask;
              

              if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
                let cloneImage = PIXI.Sprite.from(src);
                cloneImage.width = heroBgCover(el).width;
                cloneImage.height = heroBgCover(el).height;
                cloneImage.x = heroBgCover(el).x;
                cloneImage.y = heroBgCover(el).y;
                cloneImage.alpha = 0.5;
                let cloneContaner = new PIXI.Container();
                that.rootContainer.addChild(cloneContaner);
                if(app.mode == 'descktop'){
                  cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                  cloneContaner.x = -galleryEl.clientWidth - 325;
                }else if(app.mode == 'tablet'){
                  cloneContaner.width = galleryEl.clientWidth + (600 * 2);
                  cloneContaner.x = -(galleryEl.clientWidth - 600) - 1600;
                }else if(app.mode == 'mobile'){
                  cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                  cloneContaner.x = -(galleryEl.clientWidth - 700) - 2000;
                }
                let cloneMask = that.mask.clone();
                //cloneMask.x = -galleryEl.clientWidth;
                cloneContaner.addChild(cloneMask);
                cloneContaner.addChild(cloneImage);
                cloneImage.mask = cloneMask;
                that.cloneMasks.push(cloneMask);
                that.cloneContainers.push(cloneContaner);
                that.cloneImages.push(cloneImage);
              } else if (i == 0) {
                let cloneImage = PIXI.Sprite.from(src);
                cloneImage.width = heroBgCover(el).width;
                cloneImage.height = heroBgCover(el).height;
                cloneImage.x = heroBgCover(el).x;
                cloneImage.y = heroBgCover(el).y;
                cloneImage.alpha = 0.5;
                let cloneContaner = new PIXI.Container();            
                that.rootContainer.addChild(cloneContaner);
                if(app.mode == 'descktop'){
                  cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                  cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                }else if(app.mode == 'tablet'){
                  cloneContaner.width = galleryEl.clientWidth + (600 * 2);              
                  cloneContaner.x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }else if(app.mode == 'mobile'){
                  cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                  cloneContaner.x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }
                let cloneMask = that.mask.clone();
                //cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
                cloneContaner.addChild(cloneMask);            
                cloneContaner.addChild(cloneImage);
                cloneImage.mask = cloneMask;
                that.cloneMasks.push(cloneMask);            
                that.cloneContainers.push(cloneContaner);
                that.cloneImages.push(cloneImage);
              }
              that.containers.push(container);
              that.images.push(image);
              that.masks.push(mask);

            });
          });
          el.on('slideChangeTransitionStart', function () {
            let that = this;
            let x;
            if(app.mode == 'descktop'){
              x = this.el.clientWidth * this.realIndex;
            }else if(app.mode == 'tablet'){
              x = (this.el.clientWidth + 400) * this.realIndex;
            }else if(app.mode == 'mobile'){
              x = (this.el.clientWidth + 600) * this.realIndex;
            }
            if (this.realIndex > this.previousIndex) {
              this.images.forEach(function (el, i) {
                TweenMax.to(el, 0.8, {
                  alpha: function () {
                    return that.realIndex == i ? 0.7 : 0.5;
                  }, ease: Power2.easeIn
                });
                let scale = el.scale;
                new TimelineMax()
                  .to(el.skew, 0.5, { x: -0.6, ease: Power2.easeIn }, 'start')
                  .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
                  .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
                  .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
              });
              new TimelineMax()
                .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
                .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: -34, scale: 1.2, ease: Power1.easeIn }, 'start')
                .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
            } else {
              this.images.forEach(function (el, i) {
                TweenMax.to(el, 0.8, {
                  alpha: function () {
                    return that.realIndex == i ? 0.7 : 0.5;
                  }, ease: Power2.easeIn
                });
                let scale = el.scale;
                new TimelineMax()
                .to(el.skew, 0.5, { x: 0.6, ease: Power2.easeIn }, 'start')
                .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
                .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
                .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
              });
              new TimelineMax()
                .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
                .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 34, scale: 1.2, ease: Power1.easeIn }, 'start')
                .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
            }
          });
        });
      }else{
        this.singleSlider.on('init', function () {
          const that = this;
          function heroBgCover(el) {
            let ratio = el.width / el.height;
            let size;
            if(app.mode == 'descktop'){
              size = (325 * 2);
            }else if(app.mode == 'tablet'){
              size = (600 * 2);
            }else if(app.mode == 'mobile'){
              size = (700 * 2);
            }
            if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
              return {
                width: (that.el.clientWidth + size),
                height: (that.el.clientWidth + size) / ratio,
                x: 0,
                y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
              }
            } else {
              return {
                width: that.el.clientHeight * ratio,
                height: that.el.clientHeight,
                x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
                y: 0
              }
            }
          }
  
          let galleryEl = this.el.closest('.single-slider');
          this.gallery = new PIXI.Application({
            width: galleryEl.clientWidth,
            height: galleryEl.clientHeight,
            backgroundColor: 0x000000
          });
          galleryEl.appendChild(this.gallery.view);
          this.rootContainer = new PIXI.Container();
          this.gallery.stage.addChild(this.rootContainer);
          this.containers = [];
          this.cloneContainers = [];
          this.images = [];
          this.cloneImages = [];
          this.masks = [];
          this.cloneMasks = [];
  
          this.mask = new PIXI.Graphics();
          this.mask.lineStyle(0);
          this.mask.beginFill(0xff0000, 1);
          if(app.mode == 'descktop'){
            this.mask.drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
          }else if(app.mode == 'tablet'){
            this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
          }else if(app.mode == 'mobile'){
            this.mask.drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
          }
          this.mask.endFill();
  
          this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
            let src = el.getAttribute('data-src');
            let container = new PIXI.Container();
            let image = PIXI.Sprite.from(src);
            let mask = that.mask.clone();          
            container.addChild(mask);          
            image.anchor.x = 0.5;
            image.anchor.y = 0.5;          
            image.width = heroBgCover(el).width;
            image.height = heroBgCover(el).height;          
            image.x = heroBgCover(el).x + (image.width / 2);
            image.y = heroBgCover(el).y + (image.height / 2);
            image.alpha = (i == 0 ? 0.7 : 0.5);
            if(app.mode == 'descktop'){
              container.width = galleryEl.clientWidth + (325 * 2);
              container.x = (galleryEl.clientWidth * i) - 325;
            }else if(app.mode == 'tablet'){
              container.width = galleryEl.clientWidth + (600 * 2);
              container.x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
            }else if(app.mode == 'mobile'){
              container.width = galleryEl.clientWidth + (700 * 2);
              container.x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
            }
            that.rootContainer.addChild(container);
            container.addChild(image);
            image.mask = mask;
            
  
            if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
              let cloneImage = PIXI.Sprite.from(src);
              cloneImage.width = heroBgCover(el).width;
              cloneImage.height = heroBgCover(el).height;
              cloneImage.x = heroBgCover(el).x;
              cloneImage.y = heroBgCover(el).y;
              cloneImage.alpha = 0.5;
              let cloneContaner = new PIXI.Container();
              that.rootContainer.addChild(cloneContaner);
              if(app.mode == 'descktop'){
                cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                cloneContaner.x = -galleryEl.clientWidth - 325;
              }else if(app.mode == 'tablet'){
                cloneContaner.width = galleryEl.clientWidth + (600 * 2);
                cloneContaner.x = -(galleryEl.clientWidth - 600) - 1600;
              }else if(app.mode == 'mobile'){
                cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                cloneContaner.x = -(galleryEl.clientWidth - 700) - 2000;
              }
              let cloneMask = that.mask.clone();
              //cloneMask.x = -galleryEl.clientWidth;
              cloneContaner.addChild(cloneMask);
              cloneContaner.addChild(cloneImage);
              cloneImage.mask = cloneMask;
              that.cloneMasks.push(cloneMask);
              that.cloneContainers.push(cloneContaner);
              that.cloneImages.push(cloneImage);
            } else if (i == 0) {
              let cloneImage = PIXI.Sprite.from(src);
              cloneImage.width = heroBgCover(el).width;
              cloneImage.height = heroBgCover(el).height;
              cloneImage.x = heroBgCover(el).x;
              cloneImage.y = heroBgCover(el).y;
              cloneImage.alpha = 0.5;
              let cloneContaner = new PIXI.Container();            
              that.rootContainer.addChild(cloneContaner);
              if(app.mode == 'descktop'){
                cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
              }else if(app.mode == 'tablet'){
                cloneContaner.width = galleryEl.clientWidth + (600 * 2);              
                cloneContaner.x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
              }else if(app.mode == 'mobile'){
                cloneContaner.width = galleryEl.clientWidth + (700 * 2);
                cloneContaner.x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
              }
              let cloneMask = that.mask.clone();
              //cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
              cloneContaner.addChild(cloneMask);            
              cloneContaner.addChild(cloneImage);
              cloneImage.mask = cloneMask;
              that.cloneMasks.push(cloneMask);            
              that.cloneContainers.push(cloneContaner);
              that.cloneImages.push(cloneImage);
            }
            that.containers.push(container);
            that.images.push(image);
            that.masks.push(mask);
  
          });
        });
        this.singleSlider.on('slideChangeTransitionStart', function () {
          let that = this;
          let x;
          if(app.mode == 'descktop'){
            x = this.el.clientWidth * this.realIndex;
          }else if(app.mode == 'tablet'){
            x = (this.el.clientWidth + 400) * this.realIndex;
          }else if(app.mode == 'mobile'){
            x = (this.el.clientWidth + 600) * this.realIndex;
          }
          if (this.realIndex > this.previousIndex) {
            this.images.forEach(function (el, i) {
              TweenMax.to(el, 0.8, {
                alpha: function () {
                  return that.realIndex == i ? 0.7 : 0.5;
                }, ease: Power2.easeIn
              });
              let scale = el.scale;
              new TimelineMax()
                .to(el.skew, 0.5, { x: -0.6, ease: Power2.easeIn }, 'start')
                .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
                .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
                .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
            });
            new TimelineMax()
              .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
              .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: -34, scale: 1.2, ease: Power1.easeIn }, 'start')
              .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
          } else {
            this.images.forEach(function (el, i) {
              TweenMax.to(el, 0.8, {
                alpha: function () {
                  return that.realIndex == i ? 0.7 : 0.5;
                }, ease: Power2.easeIn
              });
              let scale = el.scale;
              new TimelineMax()
              .to(el.skew, 0.5, { x: 0.6, ease: Power2.easeIn }, 'start')
              .to(el.scale, 0.5, { x: (scale.x * 2), y: (scale.y * 2), ease: Power2.easeIn }, 'start')
              .to(el.skew, 0.5, { x: 0, ease: Power2.easeOut }, 'end')
              .to(el.scale, 0.5, { x: scale.x, y: scale.y, ease: Power2.easeOut }, 'end')
            });
            new TimelineMax()
              .to(this.rootContainer, 1, { x: -x, ease: Power2.easeInOut }, 'start')
              .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 34, scale: 1.2, ease: Power1.easeIn }, 'start')
              .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, { skewX: 0, scale: 1, ease: Power2.easeOut }, '-=0.4');
          }
        });       
      }
      if(this.catalogSlider.length){
        this.catalogSlider.forEach(function(el, i){
          el.on('slideChangeTransitionStart', function () {
            if (this.realIndex > this.previousIndex) {
              new TimelineMax()
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: -30, scale: 1.2, ease: Power1.easeIn})
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
            } else {
              new TimelineMax()
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 30, scale: 1.2, ease: Power1.easeIn})
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
            }
          });
        });
      }else{
        this.catalogSlider.on('slideChangeTransitionStart', function () {
          if (this.realIndex > this.previousIndex) {
            new TimelineMax()
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: -30, scale: 1.2, ease: Power1.easeIn})
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
          } else {
            new TimelineMax()
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 30, scale: 1.2, ease: Power1.easeIn})
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
          }
        });
      }
    },    
    resize: function(){
      if(this.singleSlider.length){          
        this.singleSlider.forEach(function(el, i){
          const that = el;
          function heroBgCover(el) {
            let ratio = el.width / el.height;
            let size;
            if(app.mode == 'descktop'){
              size = (325 * 2);
            }else if(app.mode == 'tablet'){
              size = (600 * 2);
            }else if(app.mode == 'mobile'){
              size = (700 * 2);
            }
            if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
              return {
                width: (that.el.clientWidth + size),
                height: (that.el.clientWidth + size) / ratio,
                x: 0,
                y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
              }
            } else {
              return {
                width: that.el.clientHeight * ratio,
                height: that.el.clientHeight,
                x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
                y: 0
              }
            }
          }
          let x;
            if(app.mode == 'descktop'){
              x = that.el.clientWidth * that.realIndex;
            }else if(app.mode == 'tablet'){
              x = (that.el.clientWidth + 400) * that.realIndex;
            }else if(app.mode == 'mobile'){
              x = (that.el.clientWidth + 600) * that.realIndex;
            }
          that.rootContainer.x = -x;
          let galleryEl = that.el.closest('.single-slider');
          that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
          setTimeout(function(){
            that.images.forEach(function(el, i){        
              el.width = heroBgCover(el.texture).width;
              el.height = heroBgCover(el.texture).height;
              el.x = heroBgCover(el).x + (el.width / 2);
              el.y = heroBgCover(el).y + (el.height / 2);
              if(app.mode == 'descktop'){
                that.containers[i].width = galleryEl.clientWidth + (325 * 2);
                that.containers[i].x = (galleryEl.clientWidth * i) - 325;
              }else if(app.mode == 'tablet'){
                that.containers[i].width = galleryEl.clientWidth + (600 * 2);
                that.containers[i].x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
              }else if(app.mode == 'mobile'){
                that.containers[i].width = galleryEl.clientWidth + (700 * 2);
                that.containers[i].x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
              }          
              that.masks[i].clear();
              that.masks[i].lineStyle(0);
              that.masks[i].beginFill(0xffffff, 0.5);          
              if(app.mode == 'descktop'){
                that.masks[i].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
              }else if(app.mode == 'tablet'){
                that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
              }else if(app.mode == 'mobile'){
                that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
              }
              that.masks[i].endFill();
            });
            that.cloneImages.forEach(function(el, i){
                el.width = heroBgCover(el.texture).width;
                el.height = heroBgCover(el.texture).height;
                el.x = heroBgCover(el).x + (el.width / 2);
                el.y = heroBgCover(el).y + (el.height / 2);
                if(i == 0){
                  that.cloneImages[0].width = heroBgCover(that.cloneImages[0].texture).width;
                  that.cloneImages[0].height = heroBgCover(that.cloneImages[0].texture).height;
                  that.cloneImages[0].x = heroBgCover(that.cloneImages[0].texture).x;
                  that.cloneImages[0].y = heroBgCover(that.cloneImages[0].texture).y;
                  if(app.mode == 'descktop'){
                    that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                    that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                  }else if(app.mode == 'tablet'){
                    that.cloneContainers[0].width = galleryEl.clientWidth + (600 * 2);              
                    that.cloneContainers[0].x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                  }else if(app.mode == 'mobile'){
                    that.cloneContainers[0].width = galleryEl.clientWidth + (700 * 2);
                    that.cloneContainers[0].x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                  }              
                  that.cloneMasks[0].clear();
                  that.cloneMasks[0].lineStyle(0);
                  that.cloneMasks[0].beginFill(0xff0000, 0.5);
                  if(app.mode == 'descktop'){
                    that.cloneMasks[0].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                  }else if(app.mode == 'tablet'){
                    that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                  }else if(app.mode == 'mobile'){
                    that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                  }
                  that.cloneMasks[0].endFill();            
                }else {            
                  that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                  that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                  that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                  that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                  if(app.mode == 'descktop'){
                    that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                    that.cloneContainers[1].x = -galleryEl.clientWidth - 325;
                  }else if(app.mode == 'tablet'){
                    that.cloneContainers[1].width = galleryEl.clientWidth + (600 * 2);
                    that.cloneContainers[1].x = -(galleryEl.clientWidth - 600) - 1600;
                  }else if(app.mode == 'mobile'){
                    that.cloneContainers[1].width = galleryEl.clientWidth + (700 * 2);
                    that.cloneContainers[1].x = -(galleryEl.clientWidth - 700) - 2000;
                  }              
                  that.cloneMasks[1].clear();
                  that.cloneMasks[1].lineStyle(0);
                  that.cloneMasks[1].beginFill(0xff0000, 1);
                  if(app.mode == 'descktop'){
                    that.cloneMasks[1].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                  }else if(app.mode == 'tablet'){
                    that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                  }else if(app.mode == 'mobile'){
                    that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                  }
                  that.cloneMasks[1].endFill();              
                }
            });
            
          }, 100);
        });          
      }else{
        const that = this.singleSlider;          
        function heroBgCover(el) {
          let ratio = el.width / el.height;
          let size;
          if(app.mode == 'descktop'){
            size = (325 * 2);
          }else if(app.mode == 'tablet'){
            size = (600 * 2);
          }else if(app.mode == 'mobile'){
            size = (700 * 2);
          }
          if ((that.el.clientWidth + size) / that.el.clientHeight > ratio) {
            return {
              width: (that.el.clientWidth + size),
              height: (that.el.clientWidth + size) / ratio,
              x: 0,
              y: (window.innerHeight - (that.el.clientWidth + size) / ratio) / 2
            }
          } else {
            return {
              width: that.el.clientHeight * ratio,
              height: that.el.clientHeight,
              x: ((that.el.clientWidth + size) - that.el.clientHeight * ratio) / 2,
              y: 0
            }
          }
        }
        let x;
          if(app.mode == 'descktop'){
            x = that.el.clientWidth * that.realIndex;
          }else if(app.mode == 'tablet'){
            x = (that.el.clientWidth + 400) * that.realIndex;
          }else if(app.mode == 'mobile'){
            x = (that.el.clientWidth + 600) * that.realIndex;
          }
        that.rootContainer.x = -x;
        let galleryEl = that.el.closest('.single-slider');
        that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
        setTimeout(function(){
          that.images.forEach(function(el, i){        
            el.width = heroBgCover(el.texture).width;
            el.height = heroBgCover(el.texture).height;
            el.x = heroBgCover(el).x + (el.width / 2);
            el.y = heroBgCover(el).y + (el.height / 2);
            if(app.mode == 'descktop'){
              that.containers[i].width = galleryEl.clientWidth + (325 * 2);
              that.containers[i].x = (galleryEl.clientWidth * i) - 325;
            }else if(app.mode == 'tablet'){
              that.containers[i].width = galleryEl.clientWidth + (600 * 2);
              that.containers[i].x = ((galleryEl.clientWidth + 600) * i) - 600 - (200 * i);
            }else if(app.mode == 'mobile'){
              that.containers[i].width = galleryEl.clientWidth + (700 * 2);
              that.containers[i].x = ((galleryEl.clientWidth + 700) * i) - 700 - (100 * i);
            }          
            that.masks[i].clear();
            that.masks[i].lineStyle(0);
            that.masks[i].beginFill(0xffffff, 0.5);          
            if(app.mode == 'descktop'){
              that.masks[i].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
            }else if(app.mode == 'tablet'){
              that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
            }else if(app.mode == 'mobile'){
              that.masks[i].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
            }
            that.masks[i].endFill();
          });
          that.cloneImages.forEach(function(el, i){
              el.width = heroBgCover(el.texture).width;
              el.height = heroBgCover(el.texture).height;
              el.x = heroBgCover(el).x + (el.width / 2);
              el.y = heroBgCover(el).y + (el.height / 2);
              if(i == 0){
                that.cloneImages[0].width = heroBgCover(that.cloneImages[0].texture).width;
                that.cloneImages[0].height = heroBgCover(that.cloneImages[0].texture).height;
                that.cloneImages[0].x = heroBgCover(that.cloneImages[0].texture).x;
                that.cloneImages[0].y = heroBgCover(that.cloneImages[0].texture).y;
                if(app.mode == 'descktop'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                }else if(app.mode == 'tablet'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (600 * 2);              
                  that.cloneContainers[0].x = ((galleryEl.clientWidth + 600) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 600 - (200 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }else if(app.mode == 'mobile'){
                  that.cloneContainers[0].width = galleryEl.clientWidth + (700 * 2);
                  that.cloneContainers[0].x = ((galleryEl.clientWidth + 700) * that.el.querySelectorAll('.swiper-slide .slide--photo img').length) - 700 - (100 * that.el.querySelectorAll('.swiper-slide .slide--photo img').length);
                }              
                that.cloneMasks[0].clear();
                that.cloneMasks[0].lineStyle(0);
                that.cloneMasks[0].beginFill(0xff0000, 0.5);
                if(app.mode == 'descktop'){
                  that.cloneMasks[0].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                }else if(app.mode == 'tablet'){
                  that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                }else if(app.mode == 'mobile'){
                  that.cloneMasks[0].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                }
                that.cloneMasks[0].endFill();            
              }else {            
                that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                if(app.mode == 'descktop'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[1].x = -galleryEl.clientWidth - 325;
                }else if(app.mode == 'tablet'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (600 * 2);
                  that.cloneContainers[1].x = -(galleryEl.clientWidth - 600) - 1600;
                }else if(app.mode == 'mobile'){
                  that.cloneContainers[1].width = galleryEl.clientWidth + (700 * 2);
                  that.cloneContainers[1].x = -(galleryEl.clientWidth - 700) - 2000;
                }              
                that.cloneMasks[1].clear();
                that.cloneMasks[1].lineStyle(0);
                that.cloneMasks[1].beginFill(0xff0000, 1);
                if(app.mode == 'descktop'){
                  that.cloneMasks[1].drawPolygon([0, 0, galleryEl.clientWidth, 0, (galleryEl.clientWidth + 650), window.innerHeight, 650, window.innerHeight]);
                }else if(app.mode == 'tablet'){
                  that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1200) - 800, 0, (galleryEl.clientWidth + 1200), window.innerHeight, 800, window.innerHeight]);          
                }else if(app.mode == 'mobile'){
                  that.cloneMasks[1].drawPolygon([0, 0, (galleryEl.clientWidth + 1400) - 800, 0, (galleryEl.clientWidth + 1400), window.innerHeight, 800, window.innerHeight]);
                }
                that.cloneMasks[1].endFill();              
              }
          });
          
        }, 100);
      }        
    }
  }

  

  

  this.eventsInit = function () {
    const that = this;    
    window.addEventListener('scroll', function (e) {
      let scrollTop = window.pageYOffset;
      header(e);      
    });
    window.addEventListener('resize', function(){
      heightUpdate();
      that.hero.resize();
      that.sliders.resize();      
    });
    window.addEventListener('orientationchange', function(e){
      setTimeout(function(){
        heightUpdate();
        that.hero.resize();
        that.sliders.resize();
      }, 100);
    });

    
    
    document.querySelectorAll('.slider-button-prev, .slider-button-next').forEach(function (el, i) {
      el.addEventListener('mouseenter', function (e) {        
        if (this.classList.contains('swiper-button-disabled')) return;
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
        //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#ee412a', ease: Power3.easeOut });        
        if (this.closest('.catalog__slider')){
          TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#ee412a', ease: Power3.easeOut });
        }
      });
      el.addEventListener('mouseleave', function (e) {        
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeIn });
        TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeIn });
        //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#fff', ease: Power3.easeOut });        
        if (this.closest('.catalog__slider')){
          TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#fff', ease: Power3.easeIn });
        }        
      });
    });

  }

  this.cursor = {
    init: function () {
      TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
      document.body.addEventListener('mousemove', function (e) {
        TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
      });      
    }
  }

  this.aosInit = function() {
    AOS.init({
      offset: 300,
      once: true
    });
    TweenMax.set('.homepage__tabs_list span', {opacity: 0});    
    TweenMax.set(document.querySelectorAll('.single-slider .swiper-slide-active .slide--content h2, .single-slider .swiper-slide-active .slide--content .slide--text, .single-slider .swiper-slide-active .slide--content .slide--nav'), {opacity: 0, y: 100});
    TweenMax.set('.single-slider .slider-control', {opacity: 0, scale: 1.3});    
    TweenMax.set(document.querySelectorAll('.abuot__mission'), {visibility: 'hidden'});

    TweenMax.set(document.querySelectorAll('.catalog__slider .swiper-slide'), {x: '100%', opacity: 0, skewX: -34});
    TweenMax.set(document.querySelectorAll('.catalog__slider .slider-button-next'), {opacity: 0, scale: 1.3});
    TweenMax.set('.leisure__calendar h2 span', {opacity: 0, rotationX: 90});
    TweenMax.set('.leisure__calendar_text', {opacity: 0, y: 50});
    TweenMax.set('.leisure__calendar .btn-skew', {opacity: 0, y: 50});
    TweenMax.set('.homepage__insta');
    TweenMax.set('.homepage__insta h2 span', {rotationX: 90, opacity: 0});
    TweenMax.set('.expert__form h2 span', { rotationX: 90, opacity: 0});
    
    

    document.addEventListener('aos:in', function (e) {      
      if (e.detail.classList.contains('homepage__tabs')) {
        new TimelineMax().staggerTo(document.querySelectorAll('.homepage__tabs_list span'), 2, { opacity: 1 }, 0.1)
          .add(function () {
            root.tabs.show = true;
          });
      }
      if (e.detail.classList.contains('abuot__mission')) {
        new TimelineMax()        
          .set('.abuot__mission', {visibility: 'visible'})
          .staggerFrom(document.querySelectorAll('.abuot__mission h2 span'), 1, {rotationX: 90, opacity: 0, ease: Power3.easeOut }, 0.3)
          .staggerFrom(document.querySelectorAll('.abuot__mission .abuot__mission_text'), 0.8, {opacity: 0, y: 50, ease: Power3.easeOut}, 0.4, '-=1.5')
      }
      if (e.detail.classList.contains('single-slider')) {                
        new TimelineMax()
          .staggerTo(document.querySelectorAll('.single-slider .swiper-slide-active .slide--content h2, .single-slider .swiper-slide-active .slide--content .slide--text, .single-slider .swiper-slide-active .slide--content .slide--nav'), 0.8, {opacity: 1, y: 0, ease: Power2.easeOut}, 0.2)
          .to('.single-slider .slider-control', 1, {opacity: 1, scale: 1}, '-=0.5');
      }
      if (e.detail.classList.contains('catalog__slider') && e.detail.classList.contains('tours')) {
        new TimelineMax()
          .staggerTo(document.querySelectorAll('.catalog__slider.tours .swiper-slide'), 0.8, {x: '0%', opacity: 1, skewX: 0, scale: 1, ease: Power1.easeOut}, 0.25)          
          .to('.catalog__slider.tours .slider-button-next', 1, {opacity: 1, scale: 1})
          .set('.catalog__slider.tours .slider-button-next', {clearProps: 'all'});
      }                  
      if (e.detail.classList.contains('homepage__insta')) {        
        TweenMax.to('.homepage__insta h2 span', 1.5, {rotationX: 0, opacity: 1, ease: Power3.easeOut });
      }
      if (e.detail.classList.contains('expert__form')) {
        TweenMax.to('.expert__form h2 span', 1.5, { rotationX: 0, opacity: 1, ease: Power3.easeOut });
      }

    });
  }




  this.loader.init();
};

/* ==============================================================
                          VACANCY INIT
   ============================================================== */
   const _vacancy = function () {
    const root = this;    
  
    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [         
          
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;
  
        window.scrollTo(0, 0);
  
        TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;
  
        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });        
      },
      loading: function () {
        const that = this;      
        if (this.resources == this.resourcesDone) {          
          let tl = new TimelineMax();
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
          .add(function(){          
            root.cursor.init();
            root.form.init();
            root.eventsInit();
            app.globalEvents();
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
          .add(function(){
            that.loaded();
          });
          
        }
      },
      loaded: function () {
        const that = this;
        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });        
        })      
      },
    };
    
    this.form = {
      init: function(){
        document.querySelector('.vacancy__form #cv').addEventListener('change', this.change)
        document.querySelector('.vacancy__form [data-target="remove"]').addEventListener('click', this.remove)
      },
      change: function(e){
        var fullPath = this.value
        if (fullPath) {
          var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
          var filename = fullPath.substring(startIndex);
          if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
              filename = filename.substring(1);
          }
          var _size = this.files[0].size;
          var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
          i=0;while(_size>900){_size/=1024;i++;}
          var exactSize = (Math.round(_size*100)/100)+' '+fSExt[i];

          if(fullPath){
            document.querySelector('.expert__form_body .form-atach .value .name').innerHTML = filename;
            document.querySelector('.expert__form_body .form-atach .value .size').innerHTML = exactSize;            
            new TimelineMax()
              .set('.expert__form_body .form-atach .value', {display: 'flex'}, 'start')
              .to('.expert__form_body .form-atach .placeholder', 1, {y: -30, opacity: 0, ease: Power3.easeInOut}, 'start')
              .from('.expert__form_body .form-atach .value', 1, {y: 30, opacity: 0, ease: Power3.easeInOut}, 'start')
              .set('.expert__form_body .form-atach .placeholder, #cv', {display: 'none'})
          }          
        }
      },
      remove: function(e){
        new TimelineMax()
          .set('.expert__form_body .form-atach .placeholder', {y: 30, display: 'flex'})
          .to('.expert__form_body .form-atach .placeholder', 1, {y: 0, opacity: 1, ease: Power3.easeInOut}, 'start')
          .to('.expert__form_body .form-atach .value', 1, {y: -30, opacity: 0, ease: Power3.easeInOut}, 'start')
          .set('.expert__form_body .form-atach .value', {clearProps: 'all'})
          .set('#cv', {display: 'block'})
          .add(function(){
            document.querySelector('.expert__form_body .form-atach #cv').value = '';
            document.querySelector('.expert__form_body .form-atach .value .name').innerHTML = '';
            document.querySelector('.expert__form_body .form-atach .value .size').innerHTML = '';
          })
        e.preventDefault();
      }
    };
  
    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };
  
    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();      
      });
    }
  
    this.loader.init(); 
  };

  /* ==============================================================
                          ARTICLE INIT
   ============================================================== */
   const _article = function () {
    const root = this;    
  
    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      resourcesDone: 0,
      scripts: [
        'swiper'
      ],
      init: function () {
        let that = this;
  
        window.scrollTo(0, 0);
  
        TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;
  
        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });
        this.scripts.forEach(function (n) {        
          let src = './js/lib/' + app.resours[n];
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {
            if (n == 'pixi') {
              filters();
            }
            that.resourcesDone++;
            that.loading();
          }
        });
      },
      loading: function () {
        const that = this;      
        if (this.resources == this.resourcesDone) {          
          let tl = new TimelineMax();
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
          .add(function(){          
            root.sliders.init();
            root.cursor.init();
            root.eventsInit();
            app.globalEvents();
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
          .add(function(){
            that.loaded();
          });
          
        }
      },
      loaded: function () {
        const that = this;
        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });        
        })      
      },
    };

    this.sliders = {      
      catalogSlider: null,
      init: function(){        
        this.catalogSlider = new Swiper('.catalog__slider .swiper-container', {
          // Optional parameters    
          speed: 800,
          //simulateTouch: false,        
          followFinger: false,
          slidesPerView: 3,
          spaceBetween: 60,
          // If we need pagination
          // pagination: {
          //   el: '.slider-pagination',
          //   type: 'fraction'
          // },
          // Navigation arrows
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          },
          breakpoints: {
            992: {
              slidesPerView: 'auto'
            },
            576: {
              slidesPerView: 'auto',
              spaceBetween: 20,
            }
          },
        });
        this.events();
      },
      events: function(){
        if(this.catalogSlider.length){
          this.catalogSlider.forEach(function(el, i){
            el.on('slideChangeTransitionStart', function () {
              if (this.realIndex > this.previousIndex) {
                new TimelineMax()
                .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: -30, scale: 1.2, ease: Power1.easeIn})
                .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
              } else {
                new TimelineMax()
                .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 30, scale: 1.2, ease: Power1.easeIn})
                .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
              }
            });
          });
        }else{
          this.catalogSlider.on('slideChangeTransitionStart', function () {
            if (this.realIndex > this.previousIndex) {
              new TimelineMax()
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: -30, scale: 1.2, ease: Power1.easeIn})
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
            } else {
              new TimelineMax()
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 30, scale: 1.2, ease: Power1.easeIn})
              .to(this.el.querySelectorAll('.swiper-slide'), 0.4, { skewX: 0, scale: 1, ease: Power1.easeOut})  
            }
          });
        }
      },    
      resize: function(){
               
      }
    }
    
  
    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };
  
    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();      
      });
      window.addEventListener('orientationchange', function(e){
        setTimeout(function(){
          heightUpdate();          
        }, 100);
      });

      document.querySelectorAll('.slider-button-prev, .slider-button-next').forEach(function (el, i) {
        el.addEventListener('mouseenter', function (e) {        
          if (this.classList.contains('swiper-button-disabled')) return;
          TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
          TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
          //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#ee412a', ease: Power3.easeOut });        
          if (this.closest('.catalog__slider')){
            TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#ee412a', ease: Power3.easeOut });
          }
        });
        el.addEventListener('mouseleave', function (e) {        
          TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeIn });
          TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeIn });
          //TweenMax.to('.cursor i.circle', 0.5, { backgroundColor: '#fff', ease: Power3.easeOut });        
          if (this.closest('.catalog__slider')){
            TweenMax.to(this.querySelector('.icon'), 0.5, { fill: '#fff', ease: Power3.easeIn });
          }        
        });
      });
    }
  
    this.loader.init(); 
  };

  /* ==============================================================
                          TICKETS INIT
   ============================================================== */
  const _tickets = function () {
    const root = this;

    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [         
          //'pixiFilters'
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;

        // window.scrollTo(0, 0);

        // TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        // TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        // TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        // TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        // TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;

        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });      
      },
      loading: function () {
        const that = this;      
        if (this.resources == this.resourcesDone) {

          that.loaded();
          return;
          let tl = new TimelineMax();
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
          .add(function(){          
            root.eventsInit();          
            root.cursor.init();
            app.globalEvents();
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
          .add(function(){
            that.loaded();
          });
          
        }
      },
      loaded: function () {
        const that = this;

        root.eventsInit();          
        //root.cursor.init();
        app.globalEvents();
        return;

        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });        
        })      
      },
    };

    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };

    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();      
      });
    }

    this.loader.init(); 
  };

/* ==============================================================
                          LEISURE QUESTIONAIRE INIT
   ============================================================== */
   const _leisureQuestionaire = function () {
    const root = this;
  
    this.loader = {
      progress: 0,
      resources: 0,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [         
          'pixi',
          //'pixiFilters'
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;
  
        window.scrollTo(0, 0);
  
        TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;
  
        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });
        this.scripts.forEach(function (n) {        
          let src = './js/lib/' + app.resours[n];
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {
            if (n == 'pixi') {
              filters();
            }
            that.resourcesDone++;
            that.loading();
          }
        });
        function filters() {
          let src = './js/lib/pixi-filters.js';
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {
            that.resourcesDone++;
            that.loading();
          }
        } 

      },
      loading: function () {
        const that = this;      
        if (this.resources == this.resourcesDone) {
          let tl = new TimelineMax();
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
          .add(function(){          
            root.questionaire.init();
            root.eventsInit();          
            root.cursor.init();
            app.globalEvents();        
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
          .add(function(){
            that.loaded();
          });
          
        }
      },
      loaded: function () {
        const that = this;
        for(i in root.questionaire.questions){
          if(i > 0)root.questionaire.questions[i].container.visible = false;
        }

        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });        
        })
        .staggerFrom(document.querySelectorAll('.hero--wrapper h1 p'), 1, { rotationX: 90, opacity: 0, ease: Power2.easeOut }, 0.1, '+=0.3')
        .staggerFrom(document.querySelectorAll('.hero--wrapper .intro > p, .hero--wrapper .intro .btn-skew'), 1, {y: 50, opacity: 0, ease: Power3.easeOut}, 0.18, '-=0.5')
      },
    };

    this.questionaire = {
      questions: [],
      data: [],
      base: document.querySelector('.leisure-questionaire__hero').getAttribute('data-base'),
      total: document.querySelectorAll('.leisure-questionaire__hero .hero--questions li').length,
      current: 0,
      transition: true,
      side: null,
      click: false,
      timerTween: null,
      heroBgCover: function (el) {
        let ratio = el.width / el.height;        
        if (document.body.clientWidth / window.innerHeight > ratio) {        
          return {          
            width: window.innerWidth,
            height: window.innerWidth / ratio,
            x: 0,
            y: (window.innerHeight - window.innerWidth / ratio) / 2
          }
        } else {        
          return {
            width: window.innerHeight * ratio,
            height: window.innerHeight,
            x: (window.innerWidth - (window.innerHeight * ratio)) / 2,
            y: 0
          }
        }
      },
      init: function(){
        let that = this;        
        document.querySelector('.leisure__hero_pagination .pagination--slide .current').innerHTML = (that.current + 1) < 10 ? '0' + (that.current + 1) : (that.current + 1);
        document.querySelector('.leisure__hero_pagination .pagination--slide .all').innerHTML = that.total < 10 ? '0' + that.total : that.total;
        TweenMax.set('.leisure__hero_pagination .pagination--bar i', {width: (100 / that.total)+'%'})
        TweenMax.set('.leisure__hero_pagination, .hero-timer', {visibility: 'hidden'});

        that.click = true;
        const loader = PIXI.Loader.shared;
        document.querySelectorAll('.leisure-questionaire__hero .hero--questions li').forEach(function(el, i){            
          let question = {};
          el.querySelectorAll('[data-value]').forEach(function(elem, n){
            loader.add('src-'+i+'-'+n, elem.getAttribute('src'));            
            question['value'+n] = elem.getAttribute('data-value');
            question['key'] = el.getAttribute('data-question');

          });          
          that.questions.push(question);
        });
        
        that.el = document.querySelector('.leisure-questionaire__hero');
        that.hero = new PIXI.Application({
          width: that.el.clientWidth,
          height: that.el.clientHeight,
          transparent: true,
          //forceCanvas: true
        });
        that.hero.stage.interactive = true;
        that.el.appendChild(that.hero.view);        

        loader.load(function (loader, resources) {
          that.filter0 = new PIXI.filters.ZoomBlurFilter();
          that.filter0.strength = 0;
          that.filter0.center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
          }
          that.filter0.innerRadius = 0;
          that.filter1 = new PIXI.filters.ZoomBlurFilter();
          that.filter1.strength = 0;
          that.filter1.center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
          }
          that.filter1.innerRadius = 0;
          for(i in that.questions){
            let slide = that.questions[i];
            that.questions[i].container = new PIXI.Container();            
            that.questions[i].img0 =  new PIXI.Sprite(resources['src-'+i+'-0'].texture);
            that.questions[i].img1 =  new PIXI.Sprite(resources['src-'+i+'-1'].texture);
            that.questions[i].img0.index = 0;
            that.questions[i].img1.index = 1;
            that.questions[i].img0.key = that.questions[i].key;
            that.questions[i].img1.key = that.questions[i].key;
            that.questions[i].img0.value = that.questions[i].value0;
            that.questions[i].img1.value = that.questions[i].value1;
            let params0 = that.heroBgCover(resources['src-'+i+'-0'].data);
            let params1 = that.heroBgCover(resources['src-'+i+'-1'].data);
            that.questions[i].img0.width = params0.width;
            that.questions[i].img0.height = params0.height;
            that.questions[i].img0.x = params0.x;
            that.questions[i].img0.y = params0.y;
            that.questions[i].img1.width = params1.width;
            that.questions[i].img1.height = params1.height;
            that.questions[i].img1.x = params1.x;
            that.questions[i].img1.y = params1.y;
            
            that.questions[i].container.addChild(that.questions[i].img0);
            that.questions[i].container.addChild(that.questions[i].img1);
            that.questions[i].mask0 = new PIXI.Graphics();
            that.questions[i].mask0.lineStyle(0);
            that.questions[i].mask0.beginFill(0xFFFFFF, 1);
            that.questions[i].mask0.drawPolygon([0, 0, ((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0, ((that.el.clientWidth / 2) - (that.el.clientWidth / 2) / 2.92), that.el.clientHeight, 0, that.el.clientHeight]);
            that.questions[i].mask0.endFill();
            that.questions[i].mask1 = new PIXI.Graphics();            
            that.questions[i].mask1.lineStyle(0);
            that.questions[i].mask1.beginFill(0xFFFFFF, 1);
            that.questions[i].mask1.drawPolygon([((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0, that.el.clientWidth, 0, that.el.clientWidth, that.el.clientHeight, ((that.el.clientWidth / 2) - (that.el.clientWidth / 2) / 2.92), that.el.clientHeight]);
            that.questions[i].mask1.endFill();
            // that.questions[i].container.addChild(that.questions[i].mask0);
            // that.questions[i].container.addChild(that.questions[i].mask1);
            
            that.questions[i].img0.mask = that.questions[i].mask0;
            that.questions[i].img1.mask = that.questions[i].mask1;

            that.questions[i].img0.interactive = true;
            that.questions[i].img1.interactive = true;
            that.questions[i].img0.on('mouseover', mouseEnter);
            that.questions[i].img1.on('mouseover', mouseEnter);
            that.questions[i].img0.on('mouseout', mouseLeave);
            that.questions[i].img1.on('mouseout', mouseLeave);
            that.questions[i].img0.on('click', click);
            that.questions[i].img1.on('click', click);
            that.questions[i].img0.on('pointertap', click);
            that.questions[i].img1.on('pointertap', click);

            that.questions[i].img0.filters = [that.filter0];
            that.questions[i].img1.filters = [that.filter1];            
            that.hero.stage.addChild(that.questions[i].container);

            //if(i > 0)that.questions[i].container.visible = false;
          }         
          

          function mouseEnter(e){
            let i = e.currentTarget.index;
            that.side = i;
            if(that.transition)return;            
            TweenMax.to(that['filter'+i], 0.8, {strength: 0});
          }
          function mouseLeave(e){
            let i = e.currentTarget.index;
            that.side = i;
            if(that.transition)return;            
            TweenMax.to(that['filter'+i], 0.8, {strength: 0.15});
          }
          function click(e){            
            let i = e.currentTarget.index;
            that.side = i;
            if(!that.click)return;            
            that.transition = true;
            that.click = false;            
            let key = e.currentTarget.key;
            let value = e.currentTarget.value;
            that.data.push({
              key: key,
              value: value
            });

            if((that.current+1) < that.total){
              let c = that.current;
            let n = that.current+1;
            let f = i == 0 ? that.filter0 : that.filter1;
            let x = e.data.global.x;
            let y = e.data.global.y;           
            let pS, pE;
            if ((that.current+1) < that.total) {
              pS = ((100 / that.total) * (that.current + 2)) - ((100 / that.total) / 2);
              pE = ((100 / that.total) * (that.current + 2));
            } else {
              pS = (100 - ((100 / that.total)));
              pE = 100 / that.total;
            }
            
            let tl = new TimelineMax()
              .set(that.questions[n].container, {visible: true, alpha: 0})              
               .to('.hero-timer', 1, {opacity: 0, y: -50, ease: Power4.easeIn}, 'transition')
              .to([that.filter0, that.filter1], 1, {strength: 2, ease: Power3.easeIn}, 'transition')
              .to(that.questions[c].container, 1, {alpha: 0, ease: Power3.easeIn }, 'transition')
              .to(that.questions[n].container, 1, {alpha: 1, ease: Power3.easeIn }, 'transition')
              .to('.pagination--bar i', 1, { width: pS + '%', ease: Power3.easeIn }, 'transition')
              .set(that.questions[c].container, {visible: false})
              .set('.hero-timer span', {clearProps: 'all'})
              .set('.hero-timer', {opacity: 0, y: 50})
              .add(function(){
                that.transition = false;
                that.timerTween.kill();
                document.querySelector('.hero-timer span').innerHTML = 3;
                document.querySelector('.pagination--slide .current').innerHTML = (that.current+2) < 10 ? '0'+(that.current+2) : (that.current+2);
              })
              .to('.pagination--bar i', 1, { width: pE + '%', ease: Power3.easeOut }, 'end')
              .to('.hero-timer', 1, {opacity: 1, y: 0, ease: Power4.easeOut}, 'end')
              .to(that.filter0, 1, { strength: function(){
                if(that.side == 0){
                  return 0;
                }else{
                  return app.touch ? 0 : 0.15;
                }
              }, ease: Power3.easeOut }, 'end')
              .to(that.filter1, 1, { strength: function(){
                if(that.side == 1){
                  return 0;
                }else{
                  return app.touch ? 0 : 0.15;
                }
              }, ease: Power3.easeOut }, 'end')
              .add(function(){                
                that.current++;
                that.click = true;                
              })
              .add(function(){
                that.timer();
              }, '+=0.5')
            }else{
              // Тут редирект на результаты
              console.log(root.questionaire.data)
              let url = root.questionaire.base+'?';
              for(var k in root.questionaire.data) {
                let i = Number(k);
                url += root.questionaire.data[i].key+'='+root.questionaire.data[i].value+((i<(root.questionaire.data.length - 1)) ? '&' : '');                
              }                            
              new TimelineMax()
                .set('.hero--blinder', {visibility: 'visible', zIndex: 20})
                .set(document.querySelectorAll('.hero--blinder h1, .hero--blinder p, .hero--blinder .btn-skew'), {visibility: 'hidden'})
                .to(['.hero--blinder .blind-left', '.hero--blinder .blind-right'], 1.7, {scaleX: 1, ease: Power3.easeIn}, 'start')
                .add(function(){
                  window.location.replace(url);
                })
            }            
          }          
        });
        document.querySelector('[data-action="start"]').addEventListener('click', that.start);
        document.querySelector('[data-action="restart"]').addEventListener('click', that.restart);
      },
      start: function(e){
        const that = root.questionaire;        
        new TimelineMax()
          .staggerTo(document.querySelectorAll('.leisure-questionaire__hero .intro h1, .leisure-questionaire__hero .intro > p, .leisure-questionaire__hero .intro button'), 0.6, {y: -50, opacity: 0, ease: Power3.easeIn}, 0.18)
          .set('.leisure-questionaire__hero .intro', {display: 'none'})
          .set('.leisure-questionaire__hero .start', {display: 'block'})          
          .staggerFrom(document.querySelectorAll('.leisure-questionaire__hero .start h1 p'), 1.5, {rotationX: 90, opacity: 0, ease: Power3.easeOut}, 0.18)
          //.to([that.filter0, that.filter1], 4, {strength: 0.15})
          .to('.leisure-questionaire__hero .start h1 span', 0.5, {y: -50, opacity: 0, ease: Power4.easeIn}, '-=0.3')
          .set('.leisure-questionaire__hero .start h1 span', {y: 50})
          .add(function(){
            document.querySelector('.leisure-questionaire__hero .start h1 span').innerHTML = 2;
          })
          .to('.leisure-questionaire__hero .start h1 span', 0.5, {y: 0, opacity: 1, ease: Power4.easeOut})
          .to('.leisure-questionaire__hero .start h1 span', 0.5, {y: -50, opacity: 0, ease: Power4.easeIn})
          .set('.leisure-questionaire__hero .start h1 span', {y: 50})
          .add(function(){
            document.querySelector('.leisure-questionaire__hero .start h1 span').innerHTML = 1;
          })
          .to('.leisure-questionaire__hero .start h1 span', 0.5, {y: 0, opacity: 1, ease: Power4.easeOut})
          .to('.leisure-questionaire__hero .start h1 span', 0.5, {y: -50, opacity: 0, ease: Power4.easeIn})
          .set('.leisure-questionaire__hero .start h1 span', {y: 90})
          .add(function(){
            document.querySelector('.leisure-questionaire__hero .start h1 span').innerHTML = 0;
          })
          .to('.leisure-questionaire__hero .start h1 span', 0.5, {y: 0, opacity: 1, ease: Power4.easeOut})
          .staggerTo(document.querySelectorAll('.leisure-questionaire__hero .start h1 p'), 0.6, {y: -50, opacity: 0, ease: Power3.easeIn}, 0.18)          
          .set('.leisure__hero_pagination, .hero-timer', {visibility: 'visible'})
          .from('.leisure__hero_pagination, .hero-timer', 2, {opacity: 0}, 'start')
          .to(that.filter0, 2, { strength: function(){
            if(that.side == 0){
              return 0;
            }else{
              return  app.touch ? 0 : 0.15;
            }
          }, ease: Power3.easeOut }, 'start')
          .to(that.filter1, 2, { strength: function(){
            if(that.side == 1){
              return 0;
            }else{
              return app.touch ? 0 : 0.15;
            }
          }, ease: Power3.easeOut }, 'start')
          .add(function(){
            that.transition = false;
            that.click = true;            
          }, '-=1')
          .set('.hero--wrapper', {display: 'none'}, '-=1')
          .add(function(){            
            that.timer();
          })
        e.preventDefault();
      },
      timer: function(){
        const that = this;
        that.timerTween = new TimelineMax()
          .to('.leisure-questionaire__hero .hero-timer span', 0.5, {y: -50, opacity: 0, ease: Power4.easeIn})
          .set('.leisure-questionaire__hero .hero-timer span', {y: 50})
          .add(function(){
            document.querySelector('.leisure-questionaire__hero .hero-timer span').innerHTML = 2;
          })
          .to('.leisure-questionaire__hero .hero-timer span', 0.5, {y: 0, opacity: 1, ease: Power4.easeOut})
          .to('.leisure-questionaire__hero .hero-timer span', 0.5, {y: -50, opacity: 0, ease: Power4.easeIn})
          .set('.leisure-questionaire__hero .hero-timer span', {y: 50})
          .add(function(){
            document.querySelector('.leisure-questionaire__hero .hero-timer span').innerHTML = 1;
          })
          .to('.leisure-questionaire__hero .hero-timer span', 0.5, {y: 0, opacity: 1, ease: Power4.easeOut})
          .to('.leisure-questionaire__hero .hero-timer span', 0.5, {y: -50, opacity: 0, ease: Power4.easeIn})
          .set('.leisure-questionaire__hero .hero-timer span', {y: 50})
          .add(function(){
            document.querySelector('.leisure-questionaire__hero .hero-timer span').innerHTML = 0;
          })
          .to('.leisure-questionaire__hero .hero-timer span', 0.5, {y: 0, opacity: 1, ease: Power4.easeOut})
          .add(function(){
            if(!that.transition)that.ooops();
          })
      },
      ooops: function(){
        const that = this;        
        new TimelineMax()          
          .set('.hero--blinder', {visibility: 'visible'})
          .set(document.querySelectorAll('header a'), {clearProps: 'all'})
          .to(document.querySelectorAll('.header__nav_link > a, .take-button'), 1.7, {color: '#5ac0b0', ease: Power3.easeIn}, 'start')
          .to(document.querySelectorAll('.header__nav_link > a .icon'), 1.7, {fill: '#5ac0b0', ease: Power3.easeIn}, 'start')
          .to('.logo--white', 1.7, {opacity: 0, ease: Power3.easeIn}, 'start')
          .to('.logo--green', 1.7, {opacity: 1, ease: Power3.easeIn}, 'start')
          .to(document.querySelectorAll('.breadcrumb a, .breadcrumb span'), 1.7, {color: '#2f2f2f', ease: Power3.easeIn}, 'start')
          .to(['.hero--blinder .blind-left', '.hero--blinder .blind-right'], 1.7, {scaleX: 1, ease: Power3.easeIn}, 'start')
          .add(function(){
            document.body.classList.replace('h-white', 'h-green')
          })
          .from('.hero--blinder h1 span', 1.5, {rotationX: 90, opacity: 0, ease: Power3.easeOut}, '+=0.2')
          .staggerFrom(document.querySelectorAll('.hero--blinder p, .hero--blinder .btn-skew'), 1, {y: 50, opacity: 0, ease: Power4.easeOut}, 0.18, '-=0.8')
          .add(function(){
            that.filter0.strength = 0;
            that.filter1.strength = 0;
            that.current = 0;
            for(i in that.questions){
              if(i == 0){
                that.questions[i].container.alpha = 1;
                that.questions[i].container.visible = true;
              }else{
                that.questions[i].container.alpha = 0;
                that.questions[i].container.visible = false;
              }
            }
            TweenMax.set('.hero--wrapper, .hero--wrapper .start p, .hero--wrapper .start p span', {clearProps: 'all'});            
            TweenMax.set('.leisure__hero_pagination, .hero-timer', {clearProps: 'all'})
            TweenMax.set('.leisure__hero_pagination, .hero-timer', {visibility: 'hidden'})
            document.querySelector('.hero-timer span').innerHTML = 3;
            document.querySelector('.hero--wrapper .start p span').innerHTML = 3;
            document.querySelector('.leisure__hero_pagination .pagination--slide .current').innerHTML = (that.current + 1) < 10 ? '0' + (that.current + 1) : (that.current + 1);
            document.querySelector('.leisure__hero_pagination .pagination--slide .all').innerHTML = that.total < 10 ? '0' + that.total : that.total;
            TweenMax.set('.leisure__hero_pagination .pagination--bar i', {width: (100 / that.total)+'%'})
          })
      },
      restart: function(){
        const that = root.questionaire;        
        new TimelineMax()
          .staggerTo(document.querySelectorAll('.hero--blinder h1, .hero--blinder p, .hero--blinder .btn-skew'), 0.6, {y: -50, opacity: 0, ease: Power3.easeIn}, 0.18)
          .to(['.hero--blinder .blind-left', '.hero--blinder .blind-right'], 0.8, {scaleX: 0, ease: Power3.easeIn}, 'start')
          .to(document.querySelectorAll('.header__nav_link > a, .take-button'), 0.8, {color: '#ffffff', ease: Power3.easeIn}, 'start')
          .to(document.querySelectorAll('.header__nav_link > a .icon'), 0.8, {fill: '#ffffff', ease: Power3.easeIn}, 'start')
          .to('.logo--white', 0.8, {opacity: 1, ease: Power3.easeIn}, 'start')
          .to('.logo--green', 0.8, {opacity: 0, ease: Power3.easeIn}, 'start')
          .to(document.querySelectorAll('.breadcrumb a, .breadcrumb span'), 0.8, {color: '#ffffff', ease: Power3.easeIn}, 'start')
          .add(function(){
            document.body.classList.replace('h-green', 'h-white')
          })
          .set(document.querySelectorAll('header a'), {clearProps: 'all'})
          .set('.hero--blinder', {visibility: 'hidden'})
          .to('.leisure-questionaire__hero .start h1 span', 0.5, {y: -50, opacity: 0, ease: Power4.easeIn}, '+=0.3')
          .set('.leisure-questionaire__hero .start h1 span', {y: 50})
          .add(function(){
            document.querySelector('.leisure-questionaire__hero .start h1 span').innerHTML = 2;
          })
          .to('.leisure-questionaire__hero .start h1 span', 0.5, {y: 0, opacity: 1, ease: Power4.easeOut})
          .to('.leisure-questionaire__hero .start h1 span', 0.5, {y: -50, opacity: 0, ease: Power4.easeIn})
          .set('.leisure-questionaire__hero .start h1 span', {y: 50})
          .add(function(){
            document.querySelector('.leisure-questionaire__hero .start h1 span').innerHTML = 1;
          })
          .to('.leisure-questionaire__hero .start h1 span', 0.5, {y: 0, opacity: 1, ease: Power4.easeOut})
          .to('.leisure-questionaire__hero .start h1 span', 0.5, {y: -50, opacity: 0, ease: Power4.easeIn})
          .set('.leisure-questionaire__hero .start h1 span', {y: 90})
          .add(function(){
            document.querySelector('.leisure-questionaire__hero .start h1 span').innerHTML = 0;
          })
          .to('.leisure-questionaire__hero .start h1 span', 0.5, {y: 0, opacity: 1, ease: Power4.easeOut})
          .staggerTo(document.querySelectorAll('.leisure-questionaire__hero .start h1 p'), 0.6, {y: -50, opacity: 0, ease: Power3.easeIn}, 0.18)          
          .set('.leisure__hero_pagination, .hero-timer', {visibility: 'visible'})
          .from('.leisure__hero_pagination, .hero-timer', 2, {opacity: 0}, 'end')
          .to(that.filter0, 2, { strength: function(){
            return  app.touch ? 0 : 0.15;
            // if(that.side == 0){
            //   return 0;
            // }else{
            //   return 0.15;
            // }
          }, ease: Power3.easeOut }, 'end')
          .to(that.filter1, 2, { strength: function(){
            return app.touch ? 0 : 0.15;
            // if(that.side == 1){
            //   return 0;
            // }else{
            //   return 0.15;
            // }
          }, ease: Power3.easeOut }, 'end')
          .add(function(){
            that.transition = false;
            that.click = true;
          }, '-=1')
          .set('.hero--wrapper', {display: 'none'}, '-=1')
          .set(document.querySelectorAll('.hero--blinder h1, .hero--blinder h1 span, .hero--blinder p, .hero--blinder .btn-skew'), {clearProps: 'all'})
          .add(function(){            
            that.timer();
          })
      },
      resize: function(){
        const that = this;
        this.hero.renderer.resize(this.el.clientWidth, window.innerHeight);
        for(i in that.questions){
          let params0 = that.heroBgCover(that.questions[i].img0.texture);
          let params1 = that.heroBgCover(that.questions[i].img0.texture);  
          that.questions[i].img0.width = params0.width;
          that.questions[i].img0.height = params0.height;
          that.questions[i].img0.x = params0.x;
          that.questions[i].img0.y = params0.y;
          that.questions[i].img1.width = params1.width;
          that.questions[i].img1.height = params1.height;
          that.questions[i].img1.x = params1.x;
          that.questions[i].img1.y = params1.y;
          that.questions[i].mask0.clear();
          that.questions[i].mask1.clear();          
          that.questions[i].mask0.lineStyle(0);
          that.questions[i].mask0.beginFill(0xFFFFFF, 1);
          that.questions[i].mask0.drawPolygon([0, 0, ((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0, ((that.el.clientWidth / 2) - (that.el.clientWidth / 2) / 2.92), that.el.clientHeight, 0, that.el.clientHeight]);
          that.questions[i].mask0.endFill();          
          that.questions[i].mask1.lineStyle(0);
          that.questions[i].mask1.beginFill(0xFFFFFF, 1);
          that.questions[i].mask1.drawPolygon([((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0, that.el.clientWidth, 0, that.el.clientWidth, that.el.clientHeight, ((that.el.clientWidth / 2) - (that.el.clientWidth / 2) / 2.92), that.el.clientHeight]);
          that.questions[i].mask1.endFill();
          that.filter0.center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
          }
          that.filter1.center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
          }
          //console.log([0, 0, ((that.el.clientWidth / 2) + (that.el.clientWidth / 2) / 2.92), 0, ((that.el.clientWidth / 2) - (that.el.clientWidth / 2) / 2.92), that.el.clientHeight, 0, that.el.clientHeight]);
        }
        
      }
    };
  
    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };
  
    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();
        root.questionaire.resize();
      });
      window.addEventListener('orientationchange', function(e){
        setTimeout(function(){
          heightUpdate();
          root.questionaire.resize();
        }, 100);
      });
    }
  
    this.loader.init(); 
  };
  
  /* ==============================================================
                          AGENTS TOURS INIT
   ============================================================== */
   const _agentsTours = function () {
    const root = this;

    this.loader = {
      progress: 0,
      resources: 2,
      resourcesDone: 0,
      loaderReady: false,
      scripts:
        [         
          //'pixiFilters'
          'jquery'          
        ],    
      resourcesDone: 0,
      init: function () {
        let that = this;

        // window.scrollTo(0, 0);

        // TweenMax.set('#loader-logo .m', { x: -55, y: -31 });
        // TweenMax.set('#loader-logo .h', { x: -55, y: -30 });
        // TweenMax.to('#loader-logo .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        // TweenMax.to('#loader-logo .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        // TweenMax.to('#loader-logo', 2, { autoAlpha: 1});
        
        this.resources += document.querySelectorAll('img[data-src]').length        
          + this.scripts.length;         

        document.querySelectorAll('img[data-src]').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function () {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });
        this.scripts.forEach(function (n) {
          let src = './js/lib/' + app.resours[n];
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {
            if (n == 'jquery') {
              highlight();
              datepicker();
            }
            that.resourcesDone++;
            that.loading();
          }
        });        
        function datepicker() {
          let src = './js/lib/datepicker.min.js';
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {
            that.resourcesDone++;
            that.loading();
          }
        }  
        function highlight() {
          let src = './js/lib/jquery.highlight.js';
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function () {
            that.resourcesDone++;
            that.loading();
          }
        }  
      },
      loading: function () {
        const that = this;
        if (this.resources == this.resourcesDone) {
          that.loaded();
          return;
          let tl = new TimelineMax();
          tl.to('#loader-logo .h, #loader-logo .m', 0.8, { fill: '#2f2f2f', ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .h', 0.8, { rotation: 360, transformOrigin: "88% 95%", ease: Power3.easeInOut }, 'arrows')
          .to('#loader-logo .m', 0.8, { rotation: 360, transformOrigin: "96% 50%", ease: Power3.easeInOut }, 'arrows')        
          .to('#loader-logo .m', 0.8, { x: 0, y: 0, opacity: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { x: 0, y: 0, ease: Power3.easeInOut }, 'morph')
          .to('#loader-logo .h', 0.8, { morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut }, 'morph')
          .fromTo('.loader-logo .brand', 0.8, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power3.easeInOut }, '-=0.6')
          .add(function(){          
            root.eventsInit();          
            root.cursor.init();
            app.globalEvents();
          })
          .to('#loader-logo', 0.5, { opacity: 0 }, '+=1')
          .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
          .add(function(){
            that.loaded();
          });
          
        }
      },
      loaded: function () {
        const that = this;

        root.inquirer.init();
        root.hotels.init();
        root.eventsInit();          
        //root.cursor.init();
        app.globalEvents();


        TweenMax.set('.homepage__description_bg .m', { x: -55, y: -31 });
        TweenMax.set('.homepage__description_bg .h', { x: -55, y: -30 });

        TweenMax.to('.homepage__description_bg .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
        TweenMax.to('.homepage__description_bg .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });
        new TimelineMax({ repeat: -1 })
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#f8d4e4', ease: Power0.easeNone })
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#d8ebe7', ease: Power0.easeNone })
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#5ebfaf', ease: Power0.easeNone })
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#577081', ease: Power0.easeNone })
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#eb4333', ease: Power0.easeNone })
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#d7ebe6', ease: Power0.easeNone })
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#bfbdce', ease: Power0.easeNone })
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#9ccad5', ease: Power0.easeNone })
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#5ebfaf', ease: Power0.easeNone })
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#2f2f2f', ease: Power0.easeNone })
        return;

        new TimelineMax()
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn})
        .add(function(){        
          document.querySelector('.loader').remove();
          TweenMax.set('body', { overflow: 'auto' });        
        })      
      },
    };

    this.inquirer = {
      slides: null,
      current: 1,
      init: function(){
        let that = this;      
        document.querySelectorAll('.custom-select .select--label').forEach(function(el, i){
          el.addEventListener('click', that.onActive);
        });
        document.querySelectorAll('.custom-select .select--options input[type="radio"]').forEach(function(el, i){
          el.addEventListener('change', that.onChange);        
        });    
        document.addEventListener('click', function(e){
          if(!e.target.closest('.custom-select') && document.querySelectorAll('.custom-select.active').length){
            new TimelineMax().to(document.querySelector('.custom-select.active .select--options'), 0.4, {height: 0, ease: Power2.easeInOut})
              .set(document.querySelectorAll('.custom-select.active .select--options'), {clearProps: 'all'});
              document.querySelector('.custom-select.active').classList.remove('active');
          }          
          if(!e.target.closest('.da-search-block') && document.querySelectorAll('.da-search-block.active').length){
            $('.da-search-block .da-block-find').slideUp(300);
            $('.da-search-block.active').removeClass('active');
          }
          if(!e.target.closest('.da-child') && document.querySelectorAll('.da-child.active').length){
            $('.da-child .da-child-list').slideUp(300);
            $('.da-child.active').removeClass('active');
          }
        });  
  
      },
      onActive: function(e){
        let target = e.currentTarget.closest('.custom-select');
        let active = target.classList.contains('active');
        if(active){
          new TimelineMax().to(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut})
            .set(target.querySelector('.select--options'), {clearProps: 'all'});
          target.classList.remove('active');
        }else{        
          new TimelineMax().set(target.querySelector('.select--options'), {display: 'block'})
            .from(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut});
          target.classList.add('active');          
        }      
      },
      onChange: function(e){
        let that = this;
        let target = e.target.closest('.custom-select');
        let text = e.target.closest('li').querySelector('span').innerText;
        target.querySelector('.select--label span').innerText = text;
        TweenMax.to('.business__select [data-action="next"]', 0.6, {opacity: 1});
        new TimelineMax().to(target.querySelector('.select--options'), 0.4, {height: 0, ease: Power2.easeInOut})
            .set(target.querySelector('.select--options'), {clearProps: 'all'});
          target.classList.remove('active');
        
      },
      onNext: function(e){
        const that = app.businessQuestionaire.inquirer;
        let next = (that.current+1);      
        if(that.current < that.slides){
          if(!document.querySelectorAll('.business__select_slider [data-slide="'+that.current+'"] input[type="radio"]:checked').length)return;
          new TimelineMax()
          .set('.business__select_slider', {overflow: 'hidden'})
          .to('.business__select_slider [data-slide="'+that.current+'"]', 0.6, {x: '-100%', opacity: 0, ease: Power3.easeIn})
          .set('.business__select_slider [data-slide="'+that.current+'"]', {clearProps: 'all'})
          .add(function(){          
            that.current++;
            document.querySelector('.business__select_slider .pagination').innerText = that.current+'/'+that.slides;
            TweenMax.to('.business__select [data-action="next"]', 0.6, {opacity: 0});
          })
          .set('.business__select_slider [data-slide="'+next+'"]', {display: 'block'})
          .from('.business__select_slider [data-slide="'+next+'"]', 0.6, {x: '100%', opacity: 0, ease: Power3.easeOut})
          .set('.business__select_slider', {clearProps: 'all'})
          .add(function(){
            if(that.current == that.slides){
              document.querySelector('.business__select [data-action] span').innerText = 'Submit';
            }
          })
        }else{
          let h = document.querySelector('.business__select_slider [data-slide="'+that.current+'"]').clientHeight;        
          new TimelineMax()
            .set('.business__select_slider .thank', {height: h})
            .set('.business__select_slider', {overflow: 'hidden'})
            .to('.business__select_slider [data-slide="'+that.current+'"]', 0.6, {x: '-100%', opacity: 0, ease: Power3.easeIn})
            .to('.business__select_slider .pagination, .business__select [data-action]', 0.6, {opacity: 0}, '-=0.6')
            .set('.business__select_slider [data-slide="'+that.current+'"]', {clearProps: 'all'})
            .set('.business__select_slider .thank', {display: 'flex'})
            .from('.business__select_slider .thank', 0.6, {x: '100%', opacity: 0, ease: Power3.easeOut})
            .set('.business__select_slider', {clearProps: 'all'})
        }
      }
    };

    this.hotels = {
      country: '',
      init: function(){
        root.hotels.modal();
        $.fn.datepicker.languages['ru-RU'] = {
          format: 'dd.mm.YYYY',
          days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
          daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
          weekStart: 1,
          startView: 0,
          yearFirst: false,
          yearSuffix: ''
        };        
        $('body').on('keyup', 'input.da-find-option', function(e){
          let val = $(this).val();
          $(this).closest('.da-block-find').find('.da-selection-list').unhighlight();          
          $(this).closest('.da-block-find').find('.da-selection-list li').filter(function (e) {            
            $(this).toggle($(this).text().toLowerCase().indexOf(val.toLowerCase()) > -1);
            $(this).closest('.da-block-find').find('.da-selection-list').highlight(val);
          });
        });

        $('body').on('click', '.da-search-block .da-search-selection', function(e){
          let list = $(this).closest('.da-search-block').find('.da-block-find');
          if(!$(this).closest('.da-search-block').hasClass('active')){
            $('.da-search-block.active .da-block-find').slideUp(400);
            $('.da-search-block.active').removeClass('active');
            list.slideDown(400, function(){
              list.find('.da-find-option').focus();
            })
            $(this).closest('.da-search-block').addClass('active');
          }else{
            $('.da-search-block.active .da-block-find').slideUp(400);
            $('.da-search-block.active').removeClass('active');
          }
        });

        $('body').on('click', '.da-selection-list li', function(e){
          let root = $(this).closest('.da-search-block');
          let val = $(this).text();
          root.removeClass('error');
          root.find('.da-search-selection span:nth-child(2)').text(val);
          $('.da-search-block.active .da-block-find').slideUp(400);
          $('.da-search-block.active').removeClass('active');          
        });

        $('body').on('click', '#da-childs .da-child .da-child-age', function(e){
          let list = $(this).closest('.da-child').find('.da-child-list');
          if(!$(this).closest('.da-child').hasClass('active')){
            $('.da-child.active .da-child-list').slideUp(400);
            $('.da-child.active').removeClass('active');
            list.slideDown(400);
            $(this).closest('.da-child').addClass('active');
          }else{
            $('.da-child.active .da-child-list').slideUp(400);
            $('.da-child.active').removeClass('active');
          }
        });

        $('body').on('click', '#da-childs .da-child .da-child-list li', function(e){
          let parrent = $(this).closest('.da-child');
          let val = $(this).text();
          parrent.removeClass('error');
          parrent.find('.da-child-age').text(val);
          $('.da-child.active .da-child-list').slideUp(400);
          $('.da-child.active').removeClass('active');
          if(root.hotels.country == 'mauritius'){
            root.hotels.mauritiusGetHotels();
          }
        });

        $('#da-sabmit').click(function(e){
          if(root.hotels.country == 'oae'){
            root.hotels.oaeSubmit();
          }else if(root.hotels.country == 'mauritius'){
            root.hotels.mauritiusSubmit();
          }else if(root.hotels.country == 'seychelles'){
            root.hotels.seychellesSubmit();
          }         
        });

        document.querySelectorAll('#country-select input[name="country"]').forEach(function(el, i){          
          el.addEventListener('change', function(e){
            let name = e.target.getAttribute('value');
            $('.hotels__results').slideUp(400, function(){
              $('#hotels__results').html('');
            });
            if(name == 'oae'){
              TweenMax.set('.hotels-loader', {visibility: 'visible'});
              TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 0.3});
              $.ajax({
                async: true,
                type: "POST",
                url: "https://avialiga.ua/wp-admin/admin-ajax.php",
                // headers: {
                //   'access-control-allow-origin': 'https://avialiga.ua'
                // },
                data: {
                  action: 'display_form_oae',
                  lastName: 'ОАЭ'
                },
                dataType: "html",
                crossDomain: true,
                success: function(data){
                  root.hotels.oae(data);
                }
              });
            }else if(name == 'mauritius'){
              TweenMax.set('.hotels-loader', {visibility: 'visible'});
              TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 0.3});
              $.ajax({
                async: true,
                type: "POST",
                url: "https://avialiga.ua/wp-admin/admin-ajax.php",
                // headers: {
                //   'access-control-allow-origin': 'https://avialiga.ua'
                // },
                data: {
                  action: 'display_form_mauritius',
                  country_id: 28
                },
                dataType: "html",
                crossDomain: true,
                success: function(data){
                  root.hotels.mauritius(data);
                }
              });
            }else if(name == 'seychelles'){
              TweenMax.set('.hotels-loader', {visibility: 'visible'});
              TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 0.3});
              $.ajax({
                async: true,
                type: "POST",
                url: "https://avialiga.ua/wp-admin/admin-ajax.php",
                // headers: {
                //   'access-control-allow-origin': 'https://avialiga.ua'
                // },
                data: {
                  action: 'display_form_seychelles',
                  country_id: 40
                },
                dataType: "html",
                crossDomain: true,
                success: function(data){
                  root.hotels.seychelles(data);
                }
              });
            }
          });
        })
      },
      oae: function(data){
        root.hotels.country = 'oae';
        $('.da-submit').fadeIn();
        $('#da-childs-container, .da-sort-options').slideUp();
        $('#da-childs .da-child-age').text('Возраст');
        $('.hotels__form .da-search-block').remove();
        $('.hotels__form').append(data);
        $('#da-select-hotel').closest('.da-search-block').hide();
        $('.hotels__body').addClass('loaded').removeClass('mauritius').removeClass('seychelles').addClass('oae');
        TweenMax.set('.hotels-loader', {visibility: 'hidden'});
        TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 1});
        $('#da-select-childs').prepend('<li style="display: none;">0</li>')
        $('#da-selected-city').closest('.da-search-selection').click();
        $('.da-datepicker').each(function(el, i){
          $(this).closest('.da-search-block').addClass('datepicker');                    
        })
        $('.da-datepicker').datepicker({
          language: 'ru-RU',
          format: 'yyyy-mm-dd',
          startDate: new Date(),
          autoHide: true
        });        
        $('#da-datepicker-1').change(function(e){
          $('#da-datepicker-1').datepicker('hide');
          let date = $('#da-datepicker-1').datepicker('getDate');
          let back = date;
          back.setDate(date.getDate() + 1);
          $('#da-datepicker-2').datepicker('destroy');
          $('#da-datepicker-2').datepicker({
            language: 'ru-RU',
            format: 'yyyy-mm-dd',
            startDate: back,
            autoHide: true
          });
          $('#da-datepicker-2').datepicker('show');
        });
        $('#da-datepicker-2').change(function(e){          
          $('#da-selected-room').closest('.da-search-selection').click();          
        });
        $('#da-select-city li').click(function(e){
          let name = $(this).text();
          TweenMax.set('.hotels-loader', {visibility: 'visible'});
          TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 0.3});
          $.ajax({
            async: true,
            type: "POST",
            url: "https://avialiga.ua/wp-admin/admin-ajax.php",
            // headers: {
            //   'access-control-allow-origin': 'https://avialiga.ua'
            // },
            data: {
              action: 'display_hotels_oae',
              city: name
            },
            dataType: "json",
            crossDomain: true,
            success: function(res){
              for(var i in res){
                let all = document.createElement('li');
                if(i == 0){
                  all.innerText = 'All';  
                  $('#da-select-hotel').append(all);
                }                
                let li = document.createElement('li')
                li.innerText = res[i];
                $('#da-select-hotel').append(li);
                if(i == (res.length - 1)){
                  $('#da-select-hotel li').click(function(e){
                    let name = $(this).text();
                    if(name == 'All'){
                      $('.da-sort-options').slideDown(300);
                    }else{
                      if($('.da-sort-options').is(':visible')){
                        $('.da-sort-options').slideUp(300);
                      }
                    }
                  });
                }
              }
              $('#da-select-hotel').closest('.da-search-block').show();
              TweenMax.set('.hotels-loader', {visibility: 'hidden'});
              TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 1});
              $('#da-selected-hotel').closest('.da-search-selection').click();
              $('#da-select-hotel li').click(function(e){
                setTimeout(function(){
                  if(!$('#da-datepicker-1').val().length){
                    $('#da-datepicker-1').datepicker('show');
                  }
                }, 100)
              });
            }
          });
        });
        $('.da-sort-options .da-sort-order').click(function(e){
          let val = $(this).attr('data-value');
          if(val == 'asc'){
            $(this).text('По убыванию');
            $(this).attr('data-value', 'desc');
          }else{
            $(this).text('По возрастанию');
            $(this).attr('data-value', 'asc');
          }
        });
        $('#da-select-room li').click(function(e){
          setTimeout(function(){
            $('#da-selected-adults').closest('.da-search-selection').click();
          }, 100);          
        });
        $('#da-select-childs li').click(function(e){
          let n = Number($(this).text());
          $('#da-childs .da-child').slideUp();
          $('#da-childs .da-child-age').text('Возраст');
          if(n > 0){
            $('#da-select-childs li:first-child').show();
            $('#da-childs .da-child').each(function(i, el){
              console.log(i)
              if(i < n){
                $(el).show();
              }
            });
            $('#da-childs-container').slideDown(400);
          }else{
            setTimeout(function(){
              $('#da-selected-childs').text('');
            }, 20);
            $('#da-select-childs li:first-child').hide();
            $('#da-childs-container').slideUp(400);
          }      
        });
      },
      mauritius: function(data){
        root.hotels.country = 'mauritius';
        $('.da-submit').fadeIn();
        $('#da-childs-container, .da-sort-options').slideUp();
        $('#da-childs .da-child-age').text('Возраст');
        $('.hotels__form .da-search-block').remove();
        $('.hotels__form').append(data);
        $('#goodwin-selected-hotel').closest('.da-search-block').hide();
        $('.hotels__body').addClass('loaded').removeClass('oae').removeClass('seychelles').addClass('mauritius');
        TweenMax.set('.hotels-loader', {visibility: 'hidden'});
        TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 1});
        $('#goodwin-select-childs').prepend('<li style="display: none;">0</li>');
        $('.da-datepicker').each(function(el, i){
          $(this).closest('.da-search-block').addClass('datepicker');                    
        })
        $('.da-datepicker').datepicker({
          language: 'ru-RU',
          format: 'yyyy-mm-dd',
          startDate: new Date(),
          autoHide: true
        });
        $('#goodwin-selected-regions').closest('.da-search-selection').click();
        $('#goodwin-select-region li').click(function(e){
          setTimeout(function(){
            $('#goodwin-datepicker-1').datepicker('show');            
          }, 100);
          let val = $(this).attr('data-id');
          $('#goodwin-selected-regions').attr('data-id', val);
          root.hotels.mauritiusGetHotels();
        });
        $('#goodwin-datepicker-1').change(function(e){
          $('#goodwin-datepicker-1').datepicker('hide');
          let date = $('#goodwin-datepicker-1').datepicker('getDate');
          let back = date;
          back.setDate(date.getDate() + 1);
          $('#goodwin-datepicker-2').datepicker('destroy');
          $('#goodwin-datepicker-2').datepicker({
            language: 'ru-RU',
            format: 'yyyy-mm-dd',
            startDate: back,
            autoHide: true
          });
          $('#goodwin-datepicker-2').datepicker('show');
          root.hotels.mauritiusGetHotels();
        });
        $('#goodwin-datepicker-2').change(function(e){          
          $('#goodwin-selected-adults').closest('.da-search-selection').click();
          root.hotels.mauritiusGetHotels();
        });
        $('#goodwin-select-adults li').click(function(e){
          root.hotels.mauritiusGetHotels();
        });
        $('#goodwin-select-childs li').click(function(e){
          root.hotels.mauritiusGetHotels();
        });
        $('#goodwin-select-childs li').click(function(e){
          let n = Number($(this).text());
          $('#da-childs .da-child').hide();
          $('#da-childs .da-child-age').text('Возраст');
          if(n > 0){
            $('#goodwin-select-childs li:first-child').show();
            $('#da-childs .da-child').each(function(i, el){
              if(i < n){
                $(el).show();
              }
            });
            $('#da-childs-container').slideDown(400);
          }else{
            setTimeout(function(){
              $('#goodwin-selected-childs').text('');
            }, 20);
            $('#goodwin-select-childs li:first-child').hide();
            $('#da-childs-container').slideUp(400);
          }      
        });
      },
      mauritiusGetHotels: function(){
        setTimeout(function(){
          let errors = 0;
          let data = {};
          $('.da-search-block').each(function(i, el){
            if($(el).hasClass('search-block-hotels'))return;
            if($(el).find('#goodwin-selected-childs').length){
              if($(el).find('#goodwin-selected-childs').text().length){
                console.log($('#da-childs .da-child:visible'));
                $('#da-childs .da-child:visible').each(function(i, el){
                  if($(el).find('.da-child-age').text() == 'Возраст'){
                    $(el).addClass('error');
                    errors++;
                  }
                });
              }else{
                return;
              }
            }
            let val;
            if($(el).hasClass('datepicker')){
              val = $.trim($(el).find('.da-datepicker').val()).length;
              if(val == 0)errors++;
            }else{
              val = $.trim($(el).find('.da-search-selection span:nth-child(2)').text()).length;
              if(val == 0)errors++;
            }
          });
          console.log(errors);
          if(errors == 0){
            data = {
              action: 'get_hotels_goodwin',
              country: 28,
              region: $('#goodwin-selected-regions').attr('data-id'),
              dateFrom: $('#goodwin-datepicker-1').val(),
              dateTo: $('#goodwin-datepicker-2').val(),
              adults: Number($('#goodwin-selected-adults').text()),
            }
            let childVal = $('#goodwin-selected-childs').text();
            let children = [];
            if(childVal.length){
              data.childs = childVal;
              $('#da-childs .da-child:visible').each(function(i, el){
                children.push($(el).find('.da-child-age').text())
              });
              data.childsAge = children;
            }
            TweenMax.set('.hotels-loader', {visibility: 'visible'});
            TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 0.3});
            $('.da-sort-options').slideUp(400);
            $.ajax({
              async: true,
              type: "POST",
              url: "https://avialiga.ua/wp-admin/admin-ajax.php",
              // headers: {
              //   'access-control-allow-origin': 'https://avialiga.ua'
              // },
              data: data,
              //dataType: "html",
              crossDomain: true,
              success: function(res){
                TweenMax.set('.hotels-loader', {visibility: 'hidden'});
                TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 1});
                $('#goodwin-selected-hotel').text('');
                $('#goodwin-select-hotel').html(res);
                $('.search-block-hotels').show().find('.da-search-selection').click();                
                $('#goodwin-select-hotel li').click(function(e){
                  let name = $(this).attr('data-value');
                  $('#goodwin-selected-hotel').attr('data-value', name);
                  if(name == 'all'){
                    $('.da-sort-options').slideDown(300);
                  }else{
                    if($('.da-sort-options').is(':visible')){
                      $('.da-sort-options').slideUp(300);
                    }
                  }
                });                
                console.log(res);
              }
            });
          }
        }, 100);
      },
      seychelles: function(data){
        root.hotels.country = 'seychelles';
        $('.da-submit').fadeIn();
        $('#da-childs-container, .da-sort-options').slideUp();
        $('#da-childs .da-child-age').text('Возраст');
        $('.hotels__form .da-search-block').remove();
        $('.hotels__form').append(data);
        $('#goodwin-selected-hotel').closest('.da-search-block').hide();
        $('.hotels__body').addClass('loaded').removeClass('oae').removeClass('mauritius').addClass('seychelles');
        TweenMax.set('.hotels-loader', {visibility: 'hidden'});
        TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 1});
        $('#goodwin-select-childs').prepend('<li style="display: none;">0</li>');
        $('.da-datepicker').each(function(el, i){
          $(this).closest('.da-search-block').addClass('datepicker');                    
        })
        $('.da-datepicker').datepicker({
          language: 'ru-RU',
          format: 'yyyy-mm-dd',
          startDate: new Date(),
          autoHide: true
        });
        $('#goodwin-selected-regions').closest('.da-search-selection').click();
        $('#goodwin-select-region li').click(function(e){
          setTimeout(function(){
            $('#goodwin-datepicker-1').datepicker('show');            
          }, 100);
          let val = $(this).attr('data-id');
          $('#goodwin-selected-regions').attr('data-id', val);
          root.hotels.seychellesGetHotels();
        });
        $('#goodwin-datepicker-1').change(function(e){
          $('#goodwin-datepicker-1').datepicker('hide');
          let date = $('#goodwin-datepicker-1').datepicker('getDate');
          let back = date;
          back.setDate(date.getDate() + 1);
          $('#goodwin-datepicker-2').datepicker('destroy');
          $('#goodwin-datepicker-2').datepicker({
            language: 'ru-RU',
            format: 'yyyy-mm-dd',
            startDate: back,
            autoHide: true
          });
          $('#goodwin-datepicker-2').datepicker('show');
          root.hotels.seychellesGetHotels();
        });
        $('#goodwin-datepicker-2').change(function(e){          
          $('#goodwin-selected-adults').closest('.da-search-selection').click();
          root.hotels.seychellesGetHotels();
        });
        $('#goodwin-select-adults li').click(function(e){
          root.hotels.seychellesGetHotels();
        });
        $('#goodwin-select-childs li').click(function(e){
          root.hotels.seychellesGetHotels();
        });
        $('#goodwin-select-childs li').click(function(e){
          let n = Number($(this).text());
          $('#da-childs .da-child').hide();
          $('#da-childs .da-child-age').text('Возраст');
          if(n > 0){
            $('#goodwin-select-childs li:first-child').show();
            $('#da-childs .da-child').each(function(i, el){
              if(i < n){
                $(el).show();
              }
            });
            $('#da-childs-container').slideDown(400);
          }else{
            setTimeout(function(){
              $('#goodwin-selected-childs').text('');
            }, 20);
            $('#goodwin-select-childs li:first-child').hide();
            $('#da-childs-container').slideUp(400);
          }      
        });
      },
      seychellesGetHotels: function(){
        setTimeout(function(){
          let errors = 0;
          let data = {};
          $('.da-search-block').each(function(i, el){
            if($(el).hasClass('search-block-hotels'))return;
            if($(el).find('#goodwin-selected-childs').length){
              if($(el).find('#goodwin-selected-childs').text().length){
                console.log($('#da-childs .da-child:visible'));
                $('#da-childs .da-child:visible').each(function(i, el){
                  if($(el).find('.da-child-age').text() == 'Возраст'){
                    $(el).addClass('error');
                    errors++;
                  }
                });
              }else{
                return;
              }
            }
            let val;
            if($(el).hasClass('datepicker')){
              val = $.trim($(el).find('.da-datepicker').val()).length;
              if(val == 0)errors++;
            }else{
              val = $.trim($(el).find('.da-search-selection span:nth-child(2)').text()).length;
              if(val == 0)errors++;
            }
          });
          console.log(errors);
          if(errors == 0){
            data = {
              action: 'get_hotels_goodwin',
              country: 40,
              region: $('#goodwin-selected-regions').attr('data-id'),
              dateFrom: $('#goodwin-datepicker-1').val(),
              dateTo: $('#goodwin-datepicker-2').val(),
              adults: Number($('#goodwin-selected-adults').text()),
            }
            let childVal = $('#goodwin-selected-childs').text();
            let children = [];
            if(childVal.length){
              data.childs = childVal;
              $('#da-childs .da-child:visible').each(function(i, el){
                children.push($(el).find('.da-child-age').text())
              });
              data.childsAge = children;
            }
            TweenMax.set('.hotels-loader', {visibility: 'visible'});
            TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 0.3});
            $('.da-sort-options').slideUp(400);
            $.ajax({
              async: true,
              type: "POST",
              url: "https://avialiga.ua/wp-admin/admin-ajax.php",
              // headers: {
              //   'access-control-allow-origin': 'https://avialiga.ua'
              // },
              data: data,
              //dataType: "html",
              crossDomain: true,
              success: function(res){
                TweenMax.set('.hotels-loader', {visibility: 'hidden'});
                TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 1});
                $('#goodwin-selected-hotel').text('');
                $('#goodwin-select-hotel').html(res);
                $('.search-block-hotels').show().find('.da-search-selection').click();                
                $('#goodwin-select-hotel li').click(function(e){
                  let name = $(this).attr('data-value');
                  $('#goodwin-selected-hotel').attr('data-value', name);
                  if(name == 'all'){
                    $('.da-sort-options').slideDown(300);
                  }else{
                    if($('.da-sort-options').is(':visible')){
                      $('.da-sort-options').slideUp(300);
                    }
                  }
                });                
                console.log(res);
              }
            });
          }
        }, 100);
      },
      
      oaeSubmit: function(){
        let errors = 0;
        let data = {};
        $('.da-search-block').each(function(i, el){
          if($(el).find('#da-selected-childs').length)return;
          let val;
          if($(el).hasClass('datepicker')){
            val = $.trim($(el).find('.da-datepicker').val()).length;
            if(val == 0){
              $(el).addClass('error');
              errors++;
            }            
                        
          }else{
            val = $.trim($(el).find('.da-search-selection span:nth-child(2)').text()).length
            if(val == 0){
              $(el).addClass('error');
              errors++;
            }
          }          
        });
        $('.da-childs-container .da-child').each(function(i, el){          
          if($(this).is(':visible')){
            if($(this).find('.da-child-age').text() == 'Возраст'){
              $(this).addClass('error');            
              errors++;
            }
          }
        });
        if(errors == 0){
          $('.hotels__results').slideUp(400, function(){
            $('#hotels__results').html('');
          });
          let data = {
            'info[city]': $('#da-selected-city').text(),
            'info[hotel]': $('#da-selected-hotel').text(),
            'info[dateFrom]': $('#da-datepicker-1').val(),
            'info[dateTo]': $('#da-datepicker-2').val(),
            'info[adults]': $('#da-selected-adults').text(),
            'info[room]': $('#da-selected-room').text(),
            'action': 'get_hotels_oae'
          }
          if($('#da-selected-hotel').text() == 'All'){
            data['info[sort]'] = $('input[name="sorting"]:checked').val(),
            data['info[sortOrder]'] = $('.da-sort-options .da-sort-order').attr('data-value')
          }
          if($('#da-selected-childs').text().length > 0){
            let childs = [];
            $('.da-child').each(function(i, el){
              if($(el).is(':visible')){
                childs.push(Number($(el).find('.da-child-age').text()));
              }
            });
            data['info[childs]'] = childs;
          }
          TweenMax.set('.hotels-loader', {visibility: 'visible'});
          TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 0.3});
          $.ajax({
            async: true,
            type: "POST",
            url: "https://avialiga.ua/wp-admin/admin-ajax.php",
            // headers: {
            //   'access-control-allow-origin': 'https://avialiga.ua'
            // },
            data: data,
            dataType: "json",
            crossDomain: true,
            success: function(res){
              console.log(res.hotels);
              for(var i in res.hotels){
                let data = res.hotels[i];
                let temp = '<div class="da-option">';
                temp += '<div class="da-option-img"><img src="'+data.image+'" alt="'+data.hotelName+'"/></div>';
                temp += '<div class="da-option-descr"><div class="da-option-hotel"><h3 class="da-option-hotel-name">'+data.hotelName+'</h3><span class="da-option-hotel-descr">'+data.city+', '+data.locality+'</span><span>'+data.class+'*</span></div>';
                temp += '<table class="da-option-variants"><tbody>';
                for(var n in data.options){
                  temp += '<tr class="da-option-variant">'
                  temp += '<td class="da-option-variant-descr">'+data.options[n].description+'</td>';
                  temp += '<td class="da-option-variant-price">'+data.options[n].price+'</td>';
                  temp += '<td class="da-option-variant-currency">'+data.options[n].currency+'</td>';
                  temp += '<td class="da-option-variant-book"><a title="On request" class="da-cart-icon '+(data.options[n].avail == 'RQ' ? 'da-on-req':'da-avail')+'"></a></td>'
                  temp += '</tr>'
                }
                temp += '</tr></tbody></table></div></div>';                
                $('#hotels__results').append(temp);
              }
              TweenMax.set('.hotels-loader', {visibility: 'hidden'});
              TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 1});
              $('.hotels__results').slideDown();
            }
          });
        }
      },
      mauritiusSubmit: function(){
        let errors = 0;
        let data = {};
        $('.da-search-block').each(function(i, el){
          if($(el).find('#goodwin-selected-childs').length){
            if($(el).find('#goodwin-selected-childs').text().length){
              $('#da-childs .da-child:visible').each(function(i, el){
                if($(el).find('.da-child-age').text() == 'Возраст'){
                  $(el).addClass('error');
                  errors++;
                }
              });
            }else{
              return;
            }
          }
          let val;
          if($(el).hasClass('datepicker')){
            val = $.trim($(el).find('.da-datepicker').val()).length;
            if(val == 0){
              $(el).addClass('error');
              errors++;
            }
          }else{
            val = $.trim($(el).find('.da-search-selection span:nth-child(2)').text()).length;
            if(val == 0){
              $(el).addClass('error');
              errors++;
            }
          }
        });
        console.log(errors);
        if(errors == 0){          
          $('.hotels__results').slideUp(400, function(){
            $('#hotels__results').html('');
          });
          data = {
            action: 'get_information_goodwin',
            'requestInfo[country]': 28,
            'requestInfo[region]': $('#goodwin-selected-regions').attr('data-id'),
            'requestInfo[dateFrom]': $('#goodwin-datepicker-1').val(),
            'requestInfo[dateTo]': $('#goodwin-datepicker-2').val(),
            'requestInfo[adults]': Number($('#goodwin-selected-adults').text()),
            'requestInfo[hotel]': $('#goodwin-selected-hotel').attr('data-value')
          }          
          if($('#goodwin-selected-hotel').attr('data-value') == 'all'){
            data['requestInfo[sort]'] = $('input[name="sorting"]:checked').val(),
            data['requestInfo[sortOrder]'] = $('.da-sort-options .da-sort-order').attr('data-value')
          }
          let childVal = $('#goodwin-selected-childs').text();
          let children = [];
          if(childVal.length){
            data.childs = childVal;
            $('#da-childs .da-child:visible').each(function(i, el){
              children.push($(el).find('.da-child-age').text())
            });
            data['requestInfo[childs]'] = children;
          }
          TweenMax.set('.hotels-loader', {visibility: 'visible'});
          TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 0.3});
          $.ajax({
            async: true,
            type: "POST",
            url: "https://avialiga.ua/wp-admin/admin-ajax.php",
            // headers: {
            //   'access-control-allow-origin': 'https://avialiga.ua'
            // },
            data: data,
            crossDomain: true,
            success: function(res){
              TweenMax.set('.hotels-loader', {visibility: 'hidden'});
              TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 1});
              $('#hotels__results').html(res);
              $('.hotels__results').slideDown();
            }
          });
        }
      },
      seychellesSubmit: function(){
        let errors = 0;
        let data = {};
        $('.da-search-block').each(function(i, el){
          if($(el).find('#goodwin-selected-childs').length){
            if($(el).find('#goodwin-selected-childs').text().length){
              $('#da-childs .da-child:visible').each(function(i, el){
                if($(el).find('.da-child-age').text() == 'Возраст'){
                  $(el).addClass('error');
                  errors++;
                }
              });
            }else{
              return;
            }
          }
          let val;
          if($(el).hasClass('datepicker')){
            val = $.trim($(el).find('.da-datepicker').val()).length;
            if(val == 0){
              $(el).addClass('error');
              errors++;
            }
          }else{
            val = $.trim($(el).find('.da-search-selection span:nth-child(2)').text()).length;
            if(val == 0){
              $(el).addClass('error');
              errors++;
            }
          }
        });
        console.log(errors);
        if(errors == 0){
          $('.hotels__results').slideUp(400, function(){
            $('#hotels__results').html('');
          });
          data = {
            action: 'get_information_goodwin',
            'requestInfo[country]': 40,
            'requestInfo[region]': $('#goodwin-selected-regions').attr('data-id'),
            'requestInfo[dateFrom]': $('#goodwin-datepicker-1').val(),
            'requestInfo[dateTo]': $('#goodwin-datepicker-2').val(),
            'requestInfo[adults]': Number($('#goodwin-selected-adults').text()),
            'requestInfo[hotel]': $('#goodwin-selected-hotel').attr('data-value')
          }          
          if($('#goodwin-selected-hotel').attr('data-value') == 'all'){
            data['requestInfo[sort]'] = $('input[name="sorting"]:checked').val(),
            data['requestInfo[sortOrder]'] = $('.da-sort-options .da-sort-order').attr('data-value')
          }
          let childVal = $('#goodwin-selected-childs').text();
          let children = [];
          if(childVal.length){
            data.childs = childVal;
            $('#da-childs .da-child:visible').each(function(i, el){
              children.push($(el).find('.da-child-age').text())
            });
            data['requestInfo[childs]'] = children;
          }
          TweenMax.set('.hotels-loader', {visibility: 'visible'});
          TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 0.3});
          $.ajax({
            async: true,
            type: "POST",
            url: "https://avialiga.ua/wp-admin/admin-ajax.php",
            // headers: {
            //   'access-control-allow-origin': 'https://avialiga.ua'
            // },
            data: data,
            crossDomain: true,
            success: function(res){
              TweenMax.set('.hotels-loader', {visibility: 'hidden'});
              TweenMax.to('.hotels__form, .da-sort-options, .da-childs-container, .da-submit', 0.8, {opacity: 1});
              $('#hotels__results').html(res);
              $('.hotels__results').slideDown();
            }
          });
        }
      },
      modal: function(){
        $('body').on('click', '#hotels__results .da-cart-icon', open);
        $('body').on('click', '.modal__hotels .close', close);
        function open(e){
          e.preventDefault();
          let data = [];
          data.push($(this).closest('.da-option-descr').find('.da-option-hotel-name').text());
          data.push($($('.da-datepicker')[0]).val().replace('-', '.').replace('-', '.')+' - '+$($('.da-datepicker')[1]).val().replace('-', '.').replace('-', '.'));
          if($('#da-childs .da-child:visible').length){
            let children = 'Children: '+$('#da-childs .da-child:visible').length+' (';
            $('#da-childs .da-child:visible').each(function(i, el){
              children+= $(el).find('.da-child-age').text()+' years';
              if(i < ($('#da-childs .da-child:visible').length-1)){
                children+=', '
              }
            });
            children+=')';
            data.push(children);
          }
          data.push($(this).closest('.da-option-variant').find('.da-option-variant-descr').text());
          data.push($(this).closest('.da-option-variant').find('.da-option-variant-price').text()+' '+$(this).closest('.da-option-variant').find('.da-option-variant-currency').text());
          
          for(var i in data){
            let p = '<p>'+data[i]+'</p>'
            $('#modal__hotels_info').append(p);
          }

          new TimelineMax().set('.modal__hotels', {display: 'block'})
            .from('.modal__hotels', 0.6, {opacity: 0, scale: 0.9, ease: Power2.easeOut})            
            .from('.modal__hotels .close', 0.6, {scale: 0, ease: Power2.easeOut}, '-=0.1')
        };
        function close(e){
          e.preventDefault();          
          new TimelineMax()
            .to('.modal__hotels', 0.6, {opacity: 0, scale: 0.9, ease: Power2.easeIn})
            .set('.modal__hotels', {clearProps: 'all'})
            .add(function(){
              $('#modal__hotels_info').html('');
            })
        };
      }
    };

    this.cursor = {
      init: function () {
        TweenMax.set('.cursor', { x: (document.body.clientWidth / 2) - 35, y: (window.innerHeight / 2) - 35 });
        document.body.addEventListener('mousemove', function (e) {
          TweenMax.set('.cursor', { x: (e.clientX - 35), y: (e.clientY - 35) });
        });      
      }
    };

    this.eventsInit = function () {
      const that = this;    
      window.addEventListener('scroll', function (e) {
        let scrollTop = window.pageYOffset;
        header(e);      
      });
      window.addEventListener('resize', function(){
        heightUpdate();      
      });
    }

    this.loader.init(); 
  };





window.onload = function () {
  setTimeout(function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // Screen mode init
    
    if(window.innerWidth >= 992){
      app.mode = 'descktop'
    }else if(window.innerWidth < 992 && window.innerWidth > 575){
      app.mode = 'tablet'
    }else if(window.innerWidth < 576){
      app.mode = 'mobile'
    }    

    app.getInTouch = new _getInTouch();
    if (
      document.body.classList.contains('blogs') ||      
      document.body.classList.contains('countries') || 
      document.body.classList.contains('catalog')
    ){
      app.blogs = new _default();
    }
    if (document.body.classList.contains('homepage')) {
      app.homepage = new _homepage();
    }
    if (document.body.classList.contains('catalog')) {
      app.catalog = new _catalog();
    }
    if (document.body.classList.contains('leisure')) {
      app.leisure = new _leisure();
    }
    if (document.body.classList.contains('business')) {
      app.business = new _business();
    }    
    if (document.body.classList.contains('cases')) {
      app.cases = new _cases();
    }
    if (document.body.classList.contains('news')) {
      app.news = new _news();
    }
    if (document.body.classList.contains('spa')) {
      app.spa = new _spa();
    }
    if (document.body.classList.contains('relax')) {
      app.relax = new _relax();
    }
    if (document.body.classList.contains('bt')) {
      app.bt = new _bt();
    }
    if (document.body.classList.contains('single-country')) {
      app.singleCountry = new _singleCountry();
    }
    if (document.body.classList.contains('meetings')) {
      app.meetings = new _meetings();
    }
    if (document.body.classList.contains('contacts')) {
      app.contacts = new _contacts();
    }
    if (document.body.classList.contains('product')) {
      app.product = new _product();
    }
    if (document.body.classList.contains('hotel')) {
      app.hotel = new _hotel();
    }
    if (document.body.classList.contains('mice')) {
      app.mice = new _mice();
    }
    if (document.body.classList.contains('business-questionaire')) {
      app.businessQuestionaire = new _businessQuestionaire();
    }
    if (document.body.classList.contains('agents')) {
      app.agents = new _agents();
    }
    if (document.body.classList.contains('about')) {
      app.about = new _about();
    }
    if (document.body.classList.contains('vacancy')) {
      app.vacancy = new _vacancy();
    }
    if (document.body.classList.contains('article')) {
      app.article = new _article();
    }
    if (document.body.classList.contains('tickets')) {
      app.tickets = new _tickets();
    }
    if (document.body.classList.contains('leisure-questionaire')) {
      app.leisureQuestionaire = new _leisureQuestionaire();
    }
    if (document.body.classList.contains('leisure-questionaire-results')) {
      app.leisureQuestionaireResults = new _leisureQuestionaireResults();
    }
    if (document.body.classList.contains('agents-tours')) {
      app.agentsTours = new _agentsTours();
    }    
  }, 100);
}











