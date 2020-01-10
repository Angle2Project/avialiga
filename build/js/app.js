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
    map: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDe4WeeWQ8_mWVwzL0Z9j3S4MpM6Of17wo'
    
  },
  globalEvents: function () {
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
    // =================================================================================

    // Start buttons
    document.querySelectorAll('.btn-skew').forEach(function (el, i) {
      el.addEventListener('mouseenter', function (e) {
        if(this.classList.contains('current'))return;
        TweenMax.set(this.querySelector('i'), { transformOrigin: '0 100%' });
        TweenMax.to(this.querySelector('span'), 0.5, { color: function(){
          return el.closest('.nav__tabs') ? '#fff' : '#ee412a';
        }, ease: Power2.easeOut });
        TweenMax.to(this.querySelector('i'), 0.5, { scaleY: 1, ease: Power2.easeOut });
        TweenMax.to('.cursor span', 0.5, { scale: 0});
      });
      el.addEventListener('mouseleave', function (e) {
        if(this.classList.contains('current'))return;
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
  }

}

function heightUpdate(){  
  let vh = window.innerHeight * 0.01;  
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};



/* ==============================================================
                          HOMEPAGE INIT
   ============================================================== */
const _homepage = function (page) {
  let that = this;
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
      // var xhr = new XMLHttpRequest();
      // xhr.open('GET', src, true);
      // xhr.responseType = 'blob';      
      // xhr.onload = function(e) {
      //   if (this.status == 200) {          
      //     var myBlob = this.response;
      //     var vid = (window.webkitURL || window.URL).createObjectURL(myBlob);          
      //     app.homepage.blobs.heroVideo = vid;
      //     //document.querySelector('.hero--player video').src = app.homepage.blobs.heroVideo;
      //     //console.log(app.homepage.video)
      //     //app.homepage.video.loaded = true;
      //   }
      // }
      // xhr.send();
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
        + document.querySelectorAll('img').length
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
      document.querySelectorAll('img').forEach(function (el, i) {
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
        app.homepage.tabs.init();
        app.homepage.cursor.init();
        app.homepage.hero = new heroRender();
        app.homepage.drag = new dragRender();
        app.homepage.eventsInit();
        this.mySwiper = new Swiper('.swiper-container', {
          // Optional parameters    
          speed: 800,
          simulateTouch: false,
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
        this.mySwiper.forEach(function (el, i) {
          if (el.el.closest('.homepage__services')) {
            TweenMax.set(el.el.querySelector('.swiper-slide-active .slide--photo'), { scale: 1.4 });
          }
          el.on('slideChangeTransitionStart', function () {
            if (this.realIndex > this.previousIndex) {
              let tl = new TimelineMax();
              tl//.to(this.el.querySelector('.swiper-slide-prev .slide--photo img'), 0.7, {opacity: 0}, 'start')
                .to(this.el.querySelector('.swiper-slide-prev .slide--photo img'), 1.4, { scale: 1.5 }, 'start')
                .to(this.el.querySelector('.swiper-slide-prev'), 0.4, { skewX: -30, scale: 1.2, ease: Power1.easeIn, yoyo: true, repeat: 1 }, 'start')
                //.fromTo(this.el.querySelector('.swiper-slide-active .slide--photo img'), 1.6, {opacity: 0}, {opacity: 1, scale: 1, ease:Power4.easeOut}, 'start')
                .fromTo(this.el.querySelector('.swiper-slide-active .slide--photo img'), 1.4, { scale: 1.5 }, { scale: 1 }, 'start')
                .fromTo(this.el.querySelector('.swiper-slide-active'), 0.4, { skewX: 0, scale: 1 }, { skewX: -30, scale: 1.2, ease: Power1.easeIn, yoyo: true, repeat: 1 }, 'start')
            } else {
              let tl = new TimelineMax();
              tl//.to(this.el.querySelector('.swiper-slide-next .slide--photo img'), 0.7, {opacity: 0}, 'start')
                .to(this.el.querySelector('.swiper-slide-next .slide--photo img'), 1.4, { scale: 1.5 }, 'start')
                .to(this.el.querySelector('.swiper-slide-next'), 0.4, { skewX: 30, scale: 1.2, ease: Power1.easeIn, yoyo: true, repeat: 1 }, 'start')
                //.fromTo(this.el.querySelector('.swiper-slide-active .slide--photo img'), 1.6, {opacity: 0}, {opacity: 1, scale: 1, ease:Power4.easeOut}, 'start')
                .fromTo(this.el.querySelector('.swiper-slide-active .slide--photo img'), 1.4, { scale: 1.5 }, { scale: 1 }, 'start')
                .fromTo(this.el.querySelector('.swiper-slide-active'), 0.4, { skewX: 0, scale: 1 }, { skewX: 30, scale: 1.2, ease: Power1.easeIn, yoyo: true, repeat: 1 }, 'start')
            }
          });
        });
        document.querySelector('.homepage__hero .hero--bg').src = document.querySelector('[data-background]').getAttribute('data-background');
        that.loaded();
        aosInit();



      } else {
        // TweenMax.to(this, 1, {progress: p, onUpdate: function(){
        //   document.querySelector('.loader .progress').innerHTML = that.progress.toFixed()+'%';
        // }});
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

        .to('#loader-logo', 0.5, { opacity: 0 })
        .to('.loader-logo .brand', 0.5, { opacity: 0 }, '-=0.3')
        .add(function () {
          app.homepage.heroBgCover();
        })
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {
          scaleX: 0, ease: Power4.easeIn, onComplete: function () {
            document.querySelector('.loader').remove();
            TweenMax.set('body', { overflow: 'auto' });

            let fs = (window.innerWidth / 100) * 9.9;
            app.homepage.hero.smart.style.fontSize = fs;
            app.homepage.hero.choise.style.fontSize = fs;
            app.homepage.hero.save.style.fontSize = fs;
            app.homepage.hero.time.style.fontSize = fs;
            //that.hero.heroBgCover();
            app.homepage.hero.hero.renderer.resize(app.homepage.hero.el.clientWidth, app.homepage.hero.el.clientHeight);
            app.homepage.hero.smart.x = ((app.homepage.hero.el.clientWidth / 100) * 42);
            app.homepage.hero.smart.y = 140 - ((Math.floor(fs) / 100) * 7.563724377883669);
            app.homepage.hero.choise.x = ((app.homepage.hero.el.clientWidth / 100) * 42) + ((app.homepage.hero.el.clientWidth / 100) * 6);
            app.homepage.hero.choise.y = (140 - ((fs / 100) * 7.563724377883669)) + Math.floor(fs);
            app.homepage.hero.save.x = ((app.homepage.hero.el.clientWidth / 100) * 42) + ((app.homepage.hero.el.clientWidth / 100) * 12.1);
            app.homepage.hero.save.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 2);
            app.homepage.hero.time.x = ((app.homepage.hero.el.clientWidth / 100) * 42) + ((app.homepage.hero.el.clientWidth / 100) * 18.2);
            app.homepage.hero.time.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 3);

            app.homepage.hero.smart2.x = ((app.homepage.hero.el.clientWidth / 100) * 42);
            app.homepage.hero.smart2.y = 140 - ((Math.floor(fs) / 100) * 7.563724377883669);
            app.homepage.hero.choise2.x = ((app.homepage.hero.el.clientWidth / 100) * 42) + ((app.homepage.hero.el.clientWidth / 100) * 6);
            app.homepage.hero.choise2.y = (140 - ((fs / 100) * 7.563724377883669)) + Math.floor(fs);
            app.homepage.hero.save2.x = ((app.homepage.hero.el.clientWidth / 100) * 42) + ((app.homepage.hero.el.clientWidth / 100) * 12.1);
            app.homepage.hero.save2.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 2);
            app.homepage.hero.time2.x = ((app.homepage.hero.el.clientWidth / 100) * 42) + ((app.homepage.hero.el.clientWidth / 100) * 18.2);
            app.homepage.hero.time2.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 3);

            // app.homepage.hero.displacementSprite.width = app.homepage.hero.hero.renderer.width / 3;
            // app.homepage.hero.displacementSprite.height = app.homepage.hero.hero.renderer.width / 3;
            // app.homepage.hero.displacementSprite.x = app.homepage.hero.hero.renderer.width / 2;
            // app.homepage.hero.displacementSprite.y = app.homepage.hero.hero.renderer.height / 2;



            TweenMax.set('.homepage__description_bg .m', { x: -55, y: -31 });
            TweenMax.set('.homepage__description_bg .h', { x: -55, y: -30 });

            TweenMax.to('.homepage__description_bg .h', 20, { rotation: 360, transformOrigin: "88% 95%", ease: Power0.easeNone, repeat: -1 });
            TweenMax.to('.homepage__description_bg .m', 2, { rotation: 360, transformOrigin: "96% 50%", ease: Power0.easeNone, repeat: -1 });

            new TimelineMax({ repeat: -1 }).to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, { fill: '#f8d4e4', ease: Power0.easeNone })
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
        })
        .staggerFrom(document.querySelectorAll('.homepage__hero h1 span'), 1, { rotationX: 90, opacity: 0, ease: Power2.easeOut }, 0.1, '+=0.3', swichText)
        .from('header', 0.8, { opacity: 0 }, '-=0.5')
        .from('.homepage__hero_footer', 0.8, { opacity: 0 }, '-=0.4')
        .from('[data-action="homepage-hero-play"]', 0.5, { scale: 1.4, opacity: 0 }, '-=0.4')
        .add(function () {
          app.homepage.heroVideo.init();
          TweenMax.set(document.querySelectorAll('.homepage__insta h2 span, .expert__form_title h2 span'), { opacity: 0 });
        });
      function swichText() {
        //TweenMax.set(document.querySelectorAll('.homepage__hero h1 span'), {opacity: 0});
        new TimelineMax()
          .to([app.homepage.hero.container, app.homepage.hero.container2], 0.2, { alpha: 1 })
          .to(document.querySelectorAll('.homepage__hero h1 span'), 0.2, { opacity: 0 })
          .to(app.homepage.hero.blur, 1, { blur: 16 })
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
      forceFXAA: true,
      clearBeforeRender: false
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

      let fs = (window.innerWidth / 100) * 9.9;

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
      that.blur.quality = 8;
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
      const radius = 170;
      const circle = new PIXI.Graphics()
        .beginFill(0xFF0000)
        .drawCircle(radius + blurSize, radius + blurSize, radius)
        .endFill();
      circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

      const rect = new PIXI.Graphics();

      rect.beginFill(0xFFFFFF);
      rect.drawRect(0, 0, 4000, 4000);
      rect.beginHole();
      rect.drawCircle(1925, 1925, 150);
      rect.endHole();
      rect.endFill();

      rect.filters = [new PIXI.filters.BlurFilter(blurSize)];



      //console.log(app.homepage.hero.hero.renderer)
      const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
      const bounds2 = new PIXI.Rectangle(0, 0, 4000, 4000);
      const texture = app.homepage.hero.hero.renderer.generateTexture(circle, PIXI.SCALE_MODES.NEAREST, 1, bounds);
      const texture2 = app.homepage.hero.hero.renderer.generateTexture(rect, PIXI.SCALE_MODES.NEAREST, 1, bounds2);

      const focus = new PIXI.Sprite(texture);
      const unFocus = new PIXI.Sprite(texture2);
      that.hero.stage.addChild(focus);
      that.hero.stage.addChild(unFocus);      
      focus.x = (window.document.body.clientWidth / 2) - 200;
      focus.y = (window.innerHeight / 2) - 200;
      unFocus.x = (window.document.body.clientWidth / 2) - 1925;
      unFocus.y = (window.innerHeight / 2) - 1925;      
      that.container.mask = focus;
      that.container2.mask = unFocus;     
      
      function onPointerMove(e) {
        TweenMax.to(focus, 1, { x: e.clientX - 200, y: e.clientY - 200 });
        TweenMax.to(unFocus, 1, { x: e.clientX - 1925, y: e.clientY - 1925 });        
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
      that.canv1.height = that.el.clientWidth / ratio;
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
      that.ctx1.drawImage(that.pat1, 0, 0, that.el.clientWidth, that.el.clientHeight);
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
      that.ctx1.drawImage(that.pat2, 0, 0, that.el.clientWidth, that.el.clientHeight);
      that.ctx1.restore();
    }

    this.img1 = new Image();
    this.img1.src = this.el.getAttribute('data-img-left');
    this.img1.onload = function () {
      ratio = this.width / this.height;
      that.canv2.width = that.el.clientWidth;
      that.canv2.height = that.el.clientWidth / ratio;
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
      that.ctx2.drawImage(that.img1, 0, 0, that.el.clientWidth, that.el.clientHeight);
      that.ctx2.restore();
    }
    this.img2 = new Image();
    this.img2.src = this.el.getAttribute('data-img-right');
    this.img2.onload = function () {
      ratio = this.width / this.height;
      that.canv3.width = that.el.clientWidth;
      that.canv3.height = that.el.clientWidth / ratio;
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
      that.ctx3.drawImage(that.img2, 0, 0, that.el.clientWidth, that.el.clientHeight);
      that.ctx3.restore();
    }





    this.dragMove = false;
    this.dragx = 0;
    this.dragDone = false;

    this.dragControl = function (e) {
      if (that.dragMove) {
        let limit = (that.el.clientWidth / 2) / 3;
        let x = e.clientX - that.dragx;
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



  // End Drag Slider

  this.resizeHomepage = function (e) {
    heightUpdate();
    app.homepage.heroBgCover();
    let fs = (window.innerWidth / 100) * 9.9;
    that.hero.smart.style.fontSize = fs;
    that.hero.choise.style.fontSize = fs;
    that.hero.save.style.fontSize = fs;
    that.hero.time.style.fontSize = fs;
    //that.hero.heroBgCover();
    that.hero.hero.renderer.resize(that.hero.el.clientWidth, that.hero.el.clientHeight);
    that.hero.smart.x = ((that.hero.el.clientWidth / 100) * 42);
    that.hero.smart.y = 140 - ((Math.floor(fs) / 100) * 7.563724377883669);
    that.hero.choise.x = ((that.hero.el.clientWidth / 100) * 42) + ((that.hero.el.clientWidth / 100) * 6);
    that.hero.choise.y = (140 - ((fs / 100) * 7.563724377883669)) + Math.floor(fs);
    that.hero.save.x = ((that.hero.el.clientWidth / 100) * 42) + ((that.hero.el.clientWidth / 100) * 12.1);
    that.hero.save.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 2);
    that.hero.time.x = ((that.hero.el.clientWidth / 100) * 42) + ((that.hero.el.clientWidth / 100) * 18.2);
    that.hero.time.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 3);

    that.hero.smart2.x = ((that.hero.el.clientWidth / 100) * 42);
    that.hero.smart2.y = 140 - ((Math.floor(fs) / 100) * 7.563724377883669);
    that.hero.choise2.x = ((that.hero.el.clientWidth / 100) * 42) + ((that.hero.el.clientWidth / 100) * 6);
    that.hero.choise2.y = (140 - ((fs / 100) * 7.563724377883669)) + Math.floor(fs);
    that.hero.save2.x = ((that.hero.el.clientWidth / 100) * 42) + ((that.hero.el.clientWidth / 100) * 12.1);
    that.hero.save2.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 2);
    that.hero.time2.x = ((that.hero.el.clientWidth / 100) * 42) + ((that.hero.el.clientWidth / 100) * 18.2);
    that.hero.time2.y = (140 - ((Math.floor(fs) / 100) * 7.563724377883669)) + (Math.floor(fs) * 3);
    // that.hero.bg.width = that.hero.heroBgWidth;
    // that.hero.bg.height = that.hero.heroBgHeight;
    // that.hero.bg.x  = that.hero.heroBgLeft;
    // that.hero.bg.y  = that.hero.heroBgTop;
    // that.hero.displacementSprite.width = app.homepage.hero.hero.renderer.width / 3;
    // that.hero.displacementSprite.height = app.homepage.hero.hero.renderer.width / 3;

    let ratio = that.drag.pat1.width / that.drag.pat1.height;
    that.drag.canv1.width = that.drag.el.clientWidth;
    that.drag.canv1.height = that.drag.el.clientWidth / ratio;
    that.drag.canv2.width = that.drag.el.clientWidth;
    that.drag.canv2.height = that.drag.el.clientWidth / ratio;
    that.drag.canv3.width = that.drag.el.clientWidth;
    that.drag.canv3.height = that.drag.el.clientWidth / ratio;

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
    that.drag.ctx1.drawImage(that.drag.pat1, 0, 0, that.drag.el.clientWidth, that.drag.el.clientHeight);
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
    that.drag.ctx1.drawImage(that.drag.pat2, 0, 0, that.drag.el.clientWidth, that.drag.el.clientHeight);
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
    that.drag.ctx2.drawImage(that.drag.img1, 0, 0, that.drag.el.clientWidth, that.drag.el.clientHeight);
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
    that.drag.ctx3.drawImage(that.drag.img2, 0, 0, that.drag.el.clientWidth, that.drag.el.clientHeight);
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
      if (!that.drag.dragDone) {
        that.drag.dragMove = false;
        that.drag.dragx = 0;
        TweenMax.to('[data-action="homepage-drag"]', 0.5, { x: 0, ease: Power2.easeOut });
        TweenMax.to([document.querySelector('canvas.leisure'), document.querySelector('canvas.business')], 0.5, { x: 0, ease: Power2.easeOut });
      }
    });
    document.querySelector('.homepage__drag').addEventListener('mousemove', that.drag.dragControl);
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
      if (app.homepage.drag.show) {
        TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
        TweenMax.to(document.querySelector('.homepage__drag_dots'), 0.8, { scaleX: 1, ease: Power4.easeOut });
        TweenMax.to('.cursor i.circle', 0.6, { backgroundColor: '#ee412a' });
        TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut })
      }
    });
    document.querySelector('[data-action="homepage-drag"]').addEventListener('mouseleave', function (e) {
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
    window.addEventListener('resize', this.resizeHomepage);

    document.querySelector('[data-action="learn-more"]').addEventListener('mouseenter', function (e) {
      TweenMax.to(this.querySelector('i'), 0.5, { scale: 1, ease: Power3.easeOut });
      TweenMax.to('.cursor span', 0.5, { scale: 0, ease: Power3.easeOut });
      TweenMax.to('.cursor i.circle', 0.6, { backgroundColor: '#fff' });
    });
    document.querySelector('[data-action="learn-more"]').addEventListener('mouseleave', function (e) {
      TweenMax.to(this.querySelector('i'), 0.5, { scale: 0, ease: Power3.easeIn });
      TweenMax.to('.cursor span', 0.5, { scale: 1, ease: Power3.easeIn });
      TweenMax.to('.cursor i.circle', 0.6, { backgroundColor: '#ee412a' });
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
    AOS.init({
      offset: 100,
      once: true
    });
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
        new TimelineMax().set(e.detail, { visibility: 'visible' })
          .fromTo(e.detail.querySelector('.swiper-slide-active .slide--photo'), 1.4, { x: '100%', scale: 1.3, opacity: 0 }, { x: '0%', scale: 1, opacity: 1, ease: Power4.easeOut }, 'start')
          .fromTo(e.detail.querySelector('.swiper-slide-active .slide--photo'), 1.4, { skewX: -30 }, { skewX: 0, ease: Power4.easeOut }, 'start')
          .fromTo('.homepage__feedback_slider.leisure h2 span', 1, { opacity: 0, rotationX: 90 }, { opacity: 1, rotationX: 0, ease: Power2.easeOut }, '-=0.7')
          .fromTo(e.detail.querySelector('.swiper-slide-active .slide--text'), 1, { opacity: 0, y: '50%' }, { opacity: 1, y: '0%', ease: Power2.easeOut }, '-=0.6')
          .fromTo('.homepage__feedback_slider.leisure .slider-control', 1, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, ease: Power2.easeOut }, '-=0.6')
      }
      if (e.detail.classList.contains('homepage__feedback_slider') && e.detail.classList.contains('business')) {
        new TimelineMax().set(e.detail, { visibility: 'visible' })
          .fromTo(e.detail.querySelector('.swiper-slide-active .slide--photo'), 1.4, { x: '-100%', scale: 1.3, opacity: 0 }, { x: '0%', scale: 1, opacity: 1, ease: Power4.easeOut }, 'start')
          .fromTo(e.detail.querySelector('.swiper-slide-active .slide--photo'), 1.4, { skewX: 30 }, { skewX: 0, ease: Power4.easeOut }, 'start')
          .fromTo('.homepage__feedback_slider.business h2 span', 1, { opacity: 0, rotationX: 90 }, { opacity: 1, rotationX: 0, ease: Power2.easeOut }, '-=0.7')
          .fromTo(e.detail.querySelector('.swiper-slide-active .slide--text'), 1, { opacity: 0, y: '50%' }, { opacity: 1, y: '0%', ease: Power2.easeOut }, '-=0.6')
          .fromTo('.homepage__feedback_slider.business .slider-control', 1, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, ease: Power2.easeOut }, '-=0.6')
          .fromTo('.homepage__feedback .button-circle', 1, { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, ease: Power2.easeOut }, '-=1')
      }
      if (e.detail.classList.contains('homepage__services')) {
        new TimelineMax().to(e.detail.querySelectorAll('.swiper-slide-active .slide--photo'), 1.6, { scale: 1 })
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
    document.querySelectorAll('[data-action="submenu"]').forEach(function (el, i) {
      el.addEventListener('mouseenter', header);
      el.addEventListener('mouseleave', header);
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
  };

  this.loader = {
    init: function () {
      let that = this;
      app.globalEvents();

      document.querySelectorAll('img').forEach(function (el, i) {
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
      
      this.resources += document.querySelectorAll('img').length        
        + this.scripts.length;

      document.querySelectorAll('img').forEach(function (el, i) {
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
        root.hero.startTimer();
        document.querySelector('.loader').remove();
        TweenMax.set('body', { overflow: 'auto' });
        root.hero.resize();
        root.sliders.resize();
        root.trust.resize();
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
        .to('.leisure__hero_pagination .pagination--bar i', 1, { width: pS + '%', ease: Power3.easeIn }, 'transition')
        .to(that.heroFilter, 1, { strength: 2, ease: Power3.easeIn }, 'transition')
        .to(current, 1, { alpha: 0, ease: Power3.easeIn }, 'transition')
        .to(next, 1, { alpha: 1, ease: Power3.easeIn }, 'transition')
        .fromTo('.leisure__hero h1 .switch[data-slide="' + that.slide + '"]', 1, { rotationX: 0, opacity: 1, y: 0 }, { rotationX: 90, opacity: 0, y: 30, ease: Power3.easeIn }, 'transition')
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
    singleSlider: null,
    catalogSlider: null,
    init: function(){
      this.singleSlider = new Swiper('.single-slider .swiper-container', {
        // Optional parameters
        init: false,
        speed: 1000,
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
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
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
          if ((that.el.clientWidth + (325 * 2)) / that.el.clientHeight > ratio) {
            return {
              width: (that.el.clientWidth + (325 * 2)),
              height: (that.el.clientWidth + (325 * 2)) / ratio,
              x: 0,
              y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
            }
          } else {
            return {
              width: that.el.clientHeight * ratio,
              height: that.el.clientHeight,
              x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
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
        this.mask.beginFill(0xffffff, 0.5);
        //this.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
        this.mask.drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
        this.mask.endFill();

        this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          let container = new PIXI.Container();
          let image = PIXI.Sprite.from(src);
          let mask = that.mask.clone();
          mask.x = galleryEl.clientWidth * i;
          that.rootContainer.addChild(mask);
          container.mask = mask;
          image.anchor.x = 0.5;
          image.anchor.y = 0.5;          
          image.width = heroBgCover(el).width;
          image.height = heroBgCover(el).height;          
          image.x = heroBgCover(el).x + (image.width / 2);
          image.y = heroBgCover(el).y + (image.height / 2);
          image.alpha = (i == 0 ? 0.7 : 0.5);
          container.width = galleryEl.clientWidth + (325 * 2);
          container.x = (galleryEl.clientWidth * i) - 325;
          that.rootContainer.addChild(container);
          container.addChild(image);

          if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
            let cloneImage = PIXI.Sprite.from(src);
            cloneImage.width = heroBgCover(el).width;
            cloneImage.height = heroBgCover(el).height;
            cloneImage.x = heroBgCover(el).x;
            cloneImage.y = heroBgCover(el).y;
            cloneImage.alpha = 0.5;
            let cloneContaner = new PIXI.Container();
            cloneContaner.width = galleryEl.clientWidth + (325 * 2);
            that.rootContainer.addChild(cloneContaner);
            cloneContaner.x = -galleryEl.clientWidth;
            let cloneMask = that.mask.clone();
            cloneMask.x = -galleryEl.clientWidth;
            that.rootContainer.addChild(cloneMask);
            cloneContaner.mask = cloneMask;
            cloneContaner.addChild(cloneImage);
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
            cloneContaner.width = galleryEl.clientWidth + (325 * 2);
            that.rootContainer.addChild(cloneContaner);
            cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
            let cloneMask = that.mask.clone();
            cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
            that.rootContainer.addChild(cloneMask);
            cloneContaner.mask = cloneMask;
            cloneContaner.addChild(cloneImage);
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
        let x = this.el.clientWidth * this.realIndex;
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
        if (((that.el.clientWidth + (325 * 2)) / that.el.clientHeight) > ratio) {          
          return {
            width: (that.el.clientWidth + (325 * 2)),
            height: (that.el.clientWidth + (325 * 2)) / ratio,
            x: 0,
            y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
          }
        } else {          
          return {
            width: that.el.clientHeight * ratio,
            height: that.el.clientHeight,
            x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
            y: 0
          }
        }
      };
      let x = that.el.clientWidth * that.realIndex;
      that.rootContainer.x = -x;
      let galleryEl = that.el.closest('.single-slider');
      that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
      that.images.forEach(function(el, i){        
          el.width = heroBgCover(el.texture).width;
          el.height = heroBgCover(el.texture).height;
          el.x = heroBgCover(el).x + (el.width / 2);
          el.y = heroBgCover(el).y + (el.height / 2);
          that.containers[i].width = galleryEl.clientWidth + (325 * 2);
          that.containers[i].x = (galleryEl.clientWidth * i) - 325;
          that.masks[i].clear();
          that.masks[i].lineStyle(0);
          that.masks[i].beginFill(0xffffff, 0.5);          
          that.masks[i].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
          that.masks[i].endFill();
          that.masks[i].x = galleryEl.clientWidth * i;
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
            that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
            that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;            
            that.cloneMasks[0].clear();
            that.cloneMasks[0].lineStyle(0);
            that.cloneMasks[0].beginFill(0xffffff, 0.5);          
            that.cloneMasks[0].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
            that.cloneMasks[0].endFill();
            that.cloneMasks[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
          }else {
            that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
            that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
            that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
            that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
            that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
            that.cloneContainers[1].x = -galleryEl.clientWidth;
            that.cloneMasks[1].clear();
            that.cloneMasks[1].lineStyle(0);
            that.cloneMasks[1].beginFill(0xffffff, 0.5);          
            that.cloneMasks[1].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
            that.cloneMasks[1].endFill();
            that.cloneMasks[1].x = -galleryEl.clientWidth;
          }
      });
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
          .staggerFrom(document.querySelectorAll('.leisure .tour-types h2 span'), 1.5, {rotationX: 90, opacity: 0, ease: Power3.easeOut }, 0.25)
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
      
      this.resources += document.querySelectorAll('img').length        
        + this.scripts.length;

      document.querySelectorAll('img').forEach(function (el, i) {
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
        .to('.leisure__hero_pagination .pagination--bar i', 1, { width: pS + '%', ease: Power3.easeIn }, 'transition')
        .to(that.heroFilter, 1, { strength: 2, ease: Power3.easeIn }, 'transition')
        .to(current, 1, { alpha: 0, ease: Power3.easeIn }, 'transition')
        .to(next, 1, { alpha: 1, ease: Power3.easeIn }, 'transition')
        .fromTo('.leisure__hero h1 .switch[data-slide="' + that.slide + '"]', 1, { rotationX: 0, opacity: 1, y: 0 }, { rotationX: 90, opacity: 0, y: 30, ease: Power3.easeIn }, 'transition')
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
          if ((that.el.clientWidth + (325 * 2)) / that.el.clientHeight > ratio) {
            return {
              width: (that.el.clientWidth + (325 * 2)),
              height: (that.el.clientWidth + (325 * 2)) / ratio,
              x: 0,
              y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
            }
          } else {
            return {
              width: that.el.clientHeight * ratio,
              height: that.el.clientHeight,
              x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
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
        this.mask.beginFill(0xffffff, 0.5);
        //this.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
        this.mask.drawPolygon([325, 0, galleryEl.clientWidth + 325, 0, (galleryEl.clientWidth - (325)), window.innerHeight, -325, window.innerHeight]);
        this.mask.endFill();

        this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          let container = new PIXI.Container();
          let image = PIXI.Sprite.from(src);
          let mask = that.mask.clone();
          mask.x = galleryEl.clientWidth * i;
          that.rootContainer.addChild(mask);
          container.mask = mask;
          image.anchor.x = 0.5;
          image.anchor.y = 0.5;          
          image.width = heroBgCover(el).width;
          image.height = heroBgCover(el).height;          
          image.x = heroBgCover(el).x + (image.width / 2);
          image.y = heroBgCover(el).y + (image.height / 2);
          image.alpha = (i == 0 ? 0.7 : 0.5);
          container.width = galleryEl.clientWidth + (325 * 2);
          container.x = (galleryEl.clientWidth * i) - 325;
          that.rootContainer.addChild(container);
          container.addChild(image);

          if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
            let cloneImage = PIXI.Sprite.from(src);
            cloneImage.width = heroBgCover(el).width;
            cloneImage.height = heroBgCover(el).height;
            cloneImage.x = heroBgCover(el).x;
            cloneImage.y = heroBgCover(el).y;
            cloneImage.alpha = 0.5;
            let cloneContaner = new PIXI.Container();
            cloneContaner.width = galleryEl.clientWidth + (325 * 2);
            that.rootContainer.addChild(cloneContaner);
            cloneContaner.x = -galleryEl.clientWidth;
            let cloneMask = that.mask.clone();
            cloneMask.x = -galleryEl.clientWidth;
            that.rootContainer.addChild(cloneMask);
            cloneContaner.mask = cloneMask;
            cloneContaner.addChild(cloneImage);
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
            cloneContaner.width = galleryEl.clientWidth + (325 * 2);
            that.rootContainer.addChild(cloneContaner);
            cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
            let cloneMask = that.mask.clone();
            cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
            that.rootContainer.addChild(cloneMask);
            cloneContaner.mask = cloneMask;
            cloneContaner.addChild(cloneImage);
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
        let x = this.el.clientWidth * this.realIndex;
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
          if ((that.el.clientWidth + (325 * 2)) / that.el.clientHeight > ratio) {
            return {
              width: (that.el.clientWidth + (325 * 2)),
              height: (that.el.clientWidth + (325 * 2)) / ratio,
              x: 0,
              y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
            }
          } else {
            return {
              width: that.el.clientHeight * ratio,
              height: that.el.clientHeight,
              x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
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
        this.mask.beginFill(0xffffff, 0.5);
        //this.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
        this.mask.drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
        this.mask.endFill();

        this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
          let src = el.getAttribute('data-src');
          let container = new PIXI.Container();
          let image = PIXI.Sprite.from(src);
          let mask = that.mask.clone();
          mask.x = galleryEl.clientWidth * i;
          that.rootContainer.addChild(mask);
          container.mask = mask;
          image.anchor.x = 0.5;
          image.anchor.y = 0.5;          
          image.width = heroBgCover(el).width;
          image.height = heroBgCover(el).height;          
          image.x = heroBgCover(el).x + (image.width / 2);
          image.y = heroBgCover(el).y + (image.height / 2);
          image.alpha = (i == 0 ? 0.7 : 0.5);
          container.width = galleryEl.clientWidth + (325 * 2);
          container.x = (galleryEl.clientWidth * i) - 325;
          that.rootContainer.addChild(container);
          container.addChild(image);

          if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
            let cloneImage = PIXI.Sprite.from(src);
            cloneImage.width = heroBgCover(el).width;
            cloneImage.height = heroBgCover(el).height;
            cloneImage.x = heroBgCover(el).x;
            cloneImage.y = heroBgCover(el).y;
            cloneImage.alpha = 0.5;
            let cloneContaner = new PIXI.Container();
            cloneContaner.width = galleryEl.clientWidth + (325 * 2);
            that.rootContainer.addChild(cloneContaner);
            cloneContaner.x = -galleryEl.clientWidth;
            let cloneMask = that.mask.clone();
            cloneMask.x = -galleryEl.clientWidth;
            that.rootContainer.addChild(cloneMask);
            cloneContaner.mask = cloneMask;
            cloneContaner.addChild(cloneImage);
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
            cloneContaner.width = galleryEl.clientWidth + (325 * 2);
            that.rootContainer.addChild(cloneContaner);
            cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
            let cloneMask = that.mask.clone();
            cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
            that.rootContainer.addChild(cloneMask);
            cloneContaner.mask = cloneMask;
            cloneContaner.addChild(cloneImage);
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
        let x = this.el.clientWidth * this.realIndex;
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
      let meetingsSlider = this.meetingsSlider;
      let caseSlider = this.caseSlider;
      function heroBgCover(el) {
        let ratio = el.width / el.height;
        if (((meetingsSlider.el.clientWidth + (325 * 2)) / meetingsSlider.el.clientHeight) > ratio) {          
          return {
            width: (meetingsSlider.el.clientWidth + (325 * 2)),
            height: (meetingsSlider.el.clientWidth + (325 * 2)) / ratio,
            x: 0,
            y: (window.innerHeight - (meetingsSlider.el.clientWidth + (325 * 2)) / ratio) / 2
          }
        } else {          
          return {
            width: meetingsSlider.el.clientHeight * ratio,
            height: meetingsSlider.el.clientHeight,
            x: ((meetingsSlider.el.clientWidth + (325 * 2)) - meetingsSlider.el.clientHeight * ratio) / 2,
            y: 0
          }
        }
      };
      let meetingsX = meetingsSlider.el.clientWidth * meetingsSlider.realIndex;
      meetingsSlider.rootContainer.x = -meetingsX;
      let meetingsGalleryEl = meetingsSlider.el.closest('.single-slider');
      meetingsSlider.gallery.renderer.resize(meetingsSlider.el.clientWidth, window.innerHeight);      
      meetingsSlider.images.forEach(function(el, i){        
          el.width = heroBgCover(el.texture).width;
          el.height = heroBgCover(el.texture).height;
          el.x = heroBgCover(el).x + (el.width / 2);
          el.y = heroBgCover(el).y + (el.height / 2);
          meetingsSlider.containers[i].width = meetingsGalleryEl.clientWidth + (325 * 2);
          meetingsSlider.containers[i].x = (meetingsGalleryEl.clientWidth * i) - 325;
          meetingsSlider.masks[i].clear();
          meetingsSlider.masks[i].lineStyle(0);
          meetingsSlider.masks[i].beginFill(0xffffff, 0.5);          
          meetingsSlider.masks[i].drawPolygon([325, 0, meetingsGalleryEl.clientWidth + 325, 0, (meetingsGalleryEl.clientWidth - (325)), window.innerHeight, -325, window.innerHeight]);
          meetingsSlider.masks[i].endFill();
          meetingsSlider.masks[i].x = meetingsGalleryEl.clientWidth * i;
      });      
      meetingsSlider.cloneImages.forEach(function(el, i){
          el.width = heroBgCover(el.texture).width;
          el.height = heroBgCover(el.texture).height;
          el.x = heroBgCover(el).x + (el.width / 2);
          el.y = heroBgCover(el).y + (el.height / 2);
          if(i == 0){
            meetingsSlider.cloneImages[0].width = heroBgCover(meetingsSlider.cloneImages[0].texture).width;
            meetingsSlider.cloneImages[0].height = heroBgCover(meetingsSlider.cloneImages[0].texture).height;
            meetingsSlider.cloneImages[0].x = heroBgCover(meetingsSlider.cloneImages[0].texture).x;
            meetingsSlider.cloneImages[0].y = heroBgCover(meetingsSlider.cloneImages[0].texture).y;
            meetingsSlider.cloneContainers[0].width = meetingsGalleryEl.clientWidth + (325 * 2);
            meetingsSlider.cloneContainers[0].x = meetingsGalleryEl.clientWidth * meetingsSlider.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;            
            meetingsSlider.cloneMasks[0].clear();
            meetingsSlider.cloneMasks[0].lineStyle(0);
            meetingsSlider.cloneMasks[0].beginFill(0xffffff, 0.5);          
            meetingsSlider.cloneMasks[0].drawPolygon([325, 0, meetingsGalleryEl.clientWidth + 325, 0, (meetingsGalleryEl.clientWidth - (325)), window.innerHeight, -325, window.innerHeight]);
            meetingsSlider.cloneMasks[0].endFill();
            meetingsSlider.cloneMasks[0].x = meetingsGalleryEl.clientWidth * meetingsSlider.el.querySelectorAll('.swiper-slide .slide--photo img').length;
          }else {
            meetingsSlider.cloneImages[1].width = heroBgCover(meetingsSlider.cloneImages[0].texture).width;
            meetingsSlider.cloneImages[1].height = heroBgCover(meetingsSlider.cloneImages[0].texture).height;
            meetingsSlider.cloneImages[1].x = heroBgCover(meetingsSlider.cloneImages[0].texture).x;
            meetingsSlider.cloneImages[1].y = heroBgCover(meetingsSlider.cloneImages[0].texture).y;
            meetingsSlider.cloneContainers[1].width = meetingsGalleryEl.clientWidth + (325 * 2);
            meetingsSlider.cloneContainers[1].x = -meetingsGalleryEl.clientWidth;
            meetingsSlider.cloneMasks[1].clear();
            meetingsSlider.cloneMasks[1].lineStyle(0);
            meetingsSlider.cloneMasks[1].beginFill(0xffffff, 0.5);          
            meetingsSlider.cloneMasks[1].drawPolygon([325, 0, meetingsGalleryEl.clientWidth + 325, 0, (meetingsGalleryEl.clientWidth - (325)), window.innerHeight, -325, window.innerHeight]);
            meetingsSlider.cloneMasks[1].endFill();
            meetingsSlider.cloneMasks[1].x = -meetingsGalleryEl.clientWidth;
          }
      });

      
      let caseX = caseSlider.el.clientWidth * caseSlider.realIndex;
      caseSlider.rootContainer.x = -caseX;
      let caseGalleryEl = caseSlider.el.closest('.single-slider');
      caseSlider.gallery.renderer.resize(caseSlider.el.clientWidth, window.innerHeight);      
      caseSlider.images.forEach(function(el, i){        
          el.width = heroBgCover(el.texture).width;
          el.height = heroBgCover(el.texture).height;
          el.x = heroBgCover(el).x + (el.width / 2);
          el.y = heroBgCover(el).y + (el.height / 2);
          caseSlider.containers[i].width = caseGalleryEl.clientWidth + (325 * 2);
          caseSlider.containers[i].x = (caseGalleryEl.clientWidth * i) - 325;
          caseSlider.masks[i].clear();
          caseSlider.masks[i].lineStyle(0);
          caseSlider.masks[i].beginFill(0xffffff, 0.5);          
          caseSlider.masks[i].drawPolygon([-325, 0, caseGalleryEl.clientWidth - 325, 0, (caseGalleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
          caseSlider.masks[i].endFill();
          caseSlider.masks[i].x = caseGalleryEl.clientWidth * i;
      });      
      caseSlider.cloneImages.forEach(function(el, i){
          el.width = heroBgCover(el.texture).width;
          el.height = heroBgCover(el.texture).height;
          el.x = heroBgCover(el).x + (el.width / 2);
          el.y = heroBgCover(el).y + (el.height / 2);
          if(i == 0){
            caseSlider.cloneImages[0].width = heroBgCover(caseSlider.cloneImages[0].texture).width;
            caseSlider.cloneImages[0].height = heroBgCover(caseSlider.cloneImages[0].texture).height;
            caseSlider.cloneImages[0].x = heroBgCover(caseSlider.cloneImages[0].texture).x;
            caseSlider.cloneImages[0].y = heroBgCover(caseSlider.cloneImages[0].texture).y;
            caseSlider.cloneContainers[0].width = caseGalleryEl.clientWidth + (325 * 2);
            caseSlider.cloneContainers[0].x = caseGalleryEl.clientWidth * caseSlider.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;            
            caseSlider.cloneMasks[0].clear();
            caseSlider.cloneMasks[0].lineStyle(0);
            caseSlider.cloneMasks[0].beginFill(0xffffff, 0.5);          
            caseSlider.cloneMasks[0].drawPolygon([-325, 0, caseGalleryEl.clientWidth - 325, 0, (caseGalleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
            caseSlider.cloneMasks[0].endFill();
            caseSlider.cloneMasks[0].x = caseGalleryEl.clientWidth * caseSlider.el.querySelectorAll('.swiper-slide .slide--photo img').length;
          }else {
            caseSlider.cloneImages[1].width = heroBgCover(caseSlider.cloneImages[0].texture).width;
            caseSlider.cloneImages[1].height = heroBgCover(caseSlider.cloneImages[0].texture).height;
            caseSlider.cloneImages[1].x = heroBgCover(caseSlider.cloneImages[0].texture).x;
            caseSlider.cloneImages[1].y = heroBgCover(caseSlider.cloneImages[0].texture).y;
            caseSlider.cloneContainers[1].width = caseGalleryEl.clientWidth + (325 * 2);
            caseSlider.cloneContainers[1].x = -caseGalleryEl.clientWidth;
            caseSlider.cloneMasks[1].clear();
            caseSlider.cloneMasks[1].lineStyle(0);
            caseSlider.cloneMasks[1].beginFill(0xffffff, 0.5);          
            caseSlider.cloneMasks[1].drawPolygon([-325, 0, caseGalleryEl.clientWidth - 325, 0, (caseGalleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
            caseSlider.cloneMasks[1].endFill();
            caseSlider.cloneMasks[1].x = -caseGalleryEl.clientWidth;
          }
      });
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
      
      this.resources += document.querySelectorAll('img').length        
        + this.scripts.length;

      document.querySelectorAll('img').forEach(function (el, i) {
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
        
        this.resources += document.querySelectorAll('img').length        
          + this.scripts.length;
  
        document.querySelectorAll('img').forEach(function (el, i) {
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
      
      this.resources += document.querySelectorAll('img').length        
        + this.scripts.length;

      document.querySelectorAll('img').forEach(function (el, i) {
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
        
        this.resources += document.querySelectorAll('img').length        
          + this.scripts.length;
  
        document.querySelectorAll('img').forEach(function (el, i) {
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
      
      this.resources += document.querySelectorAll('img').length        
        + this.scripts.length;

      document.querySelectorAll('img').forEach(function (el, i) {
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
        
        this.resources += document.querySelectorAll('img').length        
          + this.scripts.length;
  
        document.querySelectorAll('img').forEach(function (el, i) {
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
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
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
          }
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
        
        this.resources += document.querySelectorAll('img').length        
          + this.scripts.length;

        document.querySelectorAll('img').forEach(function (el, i) {
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
        
        this.resources += document.querySelectorAll('img').length        
          + this.scripts.length;

        document.querySelectorAll('img').forEach(function (el, i) {
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
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
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
            if ((that.el.clientWidth + (325 * 2)) / that.el.clientHeight > ratio) {
              return {
                width: (that.el.clientWidth + (325 * 2)),
                height: (that.el.clientWidth + (325 * 2)) / ratio,
                x: 0,
                y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
              }
            } else {
              return {
                width: that.el.clientHeight * ratio,
                height: that.el.clientHeight,
                x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
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
          this.mask.beginFill(0xffffff, 0.5);
          //this.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
          this.mask.drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
          this.mask.endFill();
  
          this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
            let src = el.getAttribute('data-src');
            let container = new PIXI.Container();
            let image = PIXI.Sprite.from(src);
            let mask = that.mask.clone();
            mask.x = galleryEl.clientWidth * i;
            that.rootContainer.addChild(mask);
            container.mask = mask;
            image.anchor.x = 0.5;
            image.anchor.y = 0.5;          
            image.width = heroBgCover(el).width;
            image.height = heroBgCover(el).height;          
            image.x = heroBgCover(el).x + (image.width / 2);
            image.y = heroBgCover(el).y + (image.height / 2);
            image.alpha = (i == 0 ? 0.7 : 0.5);
            container.width = galleryEl.clientWidth + (325 * 2);
            container.x = (galleryEl.clientWidth * i) - 325;
            that.rootContainer.addChild(container);
            container.addChild(image);
  
            if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
              let cloneImage = PIXI.Sprite.from(src);
              cloneImage.width = heroBgCover(el).width;
              cloneImage.height = heroBgCover(el).height;
              cloneImage.x = heroBgCover(el).x;
              cloneImage.y = heroBgCover(el).y;
              cloneImage.alpha = 0.5;
              let cloneContaner = new PIXI.Container();
              cloneContaner.width = galleryEl.clientWidth + (325 * 2);
              that.rootContainer.addChild(cloneContaner);
              cloneContaner.x = -galleryEl.clientWidth;
              let cloneMask = that.mask.clone();
              cloneMask.x = -galleryEl.clientWidth;
              that.rootContainer.addChild(cloneMask);
              cloneContaner.mask = cloneMask;
              cloneContaner.addChild(cloneImage);
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
              cloneContaner.width = galleryEl.clientWidth + (325 * 2);
              that.rootContainer.addChild(cloneContaner);
              cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
              let cloneMask = that.mask.clone();
              cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
              that.rootContainer.addChild(cloneMask);
              cloneContaner.mask = cloneMask;
              cloneContaner.addChild(cloneImage);
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
          let x = this.el.clientWidth * this.realIndex;
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
          if (((that.el.clientWidth + (325 * 2)) / that.el.clientHeight) > ratio) {          
            return {
              width: (that.el.clientWidth + (325 * 2)),
              height: (that.el.clientWidth + (325 * 2)) / ratio,
              x: 0,
              y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
            }
          } else {          
            return {
              width: that.el.clientHeight * ratio,
              height: that.el.clientHeight,
              x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
              y: 0
            }
          }
        };
        let x = that.el.clientWidth * that.realIndex;
        that.rootContainer.x = -x;
        let galleryEl = that.el.closest('.single-slider');
        that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
        that.images.forEach(function(el, i){        
            el.width = heroBgCover(el.texture).width;
            el.height = heroBgCover(el.texture).height;
            el.x = heroBgCover(el).x + (el.width / 2);
            el.y = heroBgCover(el).y + (el.height / 2);
            that.containers[i].width = galleryEl.clientWidth + (325 * 2);
            that.containers[i].x = (galleryEl.clientWidth * i) - 325;
            that.masks[i].clear();
            that.masks[i].lineStyle(0);
            that.masks[i].beginFill(0xffffff, 0.5);          
            that.masks[i].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
            that.masks[i].endFill();
            that.masks[i].x = galleryEl.clientWidth * i;
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
              that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
              that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;            
              that.cloneMasks[0].clear();
              that.cloneMasks[0].lineStyle(0);
              that.cloneMasks[0].beginFill(0xffffff, 0.5);          
              that.cloneMasks[0].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
              that.cloneMasks[0].endFill();
              that.cloneMasks[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
            }else {
              that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
              that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
              that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
              that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
              that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
              that.cloneContainers[1].x = -galleryEl.clientWidth;
              that.cloneMasks[1].clear();
              that.cloneMasks[1].lineStyle(0);
              that.cloneMasks[1].beginFill(0xffffff, 0.5);          
              that.cloneMasks[1].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
              that.cloneMasks[1].endFill();
              that.cloneMasks[1].x = -galleryEl.clientWidth;
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
        that.sliders.resize();
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
        
        this.resources += document.querySelectorAll('img').length        
          + this.scripts.length;

        document.querySelectorAll('img').forEach(function (el, i) {
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
            if ((that.el.clientWidth + (325 * 2)) / that.el.clientHeight > ratio) {
              return {
                width: (that.el.clientWidth + (325 * 2)),
                height: (that.el.clientWidth + (325 * 2)) / ratio,
                x: 0,
                y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
              }
            } else {
              return {
                width: that.el.clientHeight * ratio,
                height: that.el.clientHeight,
                x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
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
          this.mask.beginFill(0xffffff, 0.5);
          //this.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
          this.mask.drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
          this.mask.endFill();
  
          this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
            let src = el.getAttribute('data-src');
            let container = new PIXI.Container();
            let image = PIXI.Sprite.from(src);
            let mask = that.mask.clone();
            mask.x = galleryEl.clientWidth * i;
            that.rootContainer.addChild(mask);
            container.mask = mask;
            image.anchor.x = 0.5;
            image.anchor.y = 0.5;          
            image.width = heroBgCover(el).width;
            image.height = heroBgCover(el).height;          
            image.x = heroBgCover(el).x + (image.width / 2);
            image.y = heroBgCover(el).y + (image.height / 2);
            image.alpha = (i == 0 ? 0.7 : 0.5);
            container.width = galleryEl.clientWidth + (325 * 2);
            container.x = (galleryEl.clientWidth * i) - 325;
            that.rootContainer.addChild(container);
            container.addChild(image);
  
            if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
              let cloneImage = PIXI.Sprite.from(src);
              cloneImage.width = heroBgCover(el).width;
              cloneImage.height = heroBgCover(el).height;
              cloneImage.x = heroBgCover(el).x;
              cloneImage.y = heroBgCover(el).y;
              cloneImage.alpha = 0.5;
              let cloneContaner = new PIXI.Container();
              cloneContaner.width = galleryEl.clientWidth + (325 * 2);
              that.rootContainer.addChild(cloneContaner);
              cloneContaner.x = -galleryEl.clientWidth;
              let cloneMask = that.mask.clone();
              cloneMask.x = -galleryEl.clientWidth;
              that.rootContainer.addChild(cloneMask);
              cloneContaner.mask = cloneMask;
              cloneContaner.addChild(cloneImage);
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
              cloneContaner.width = galleryEl.clientWidth + (325 * 2);
              that.rootContainer.addChild(cloneContaner);
              cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
              let cloneMask = that.mask.clone();
              cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
              that.rootContainer.addChild(cloneMask);
              cloneContaner.mask = cloneMask;
              cloneContaner.addChild(cloneImage);
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
          let x = this.el.clientWidth * this.realIndex;
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
        let caseSlider = this.singleSlider;
        function heroBgCover(el) {
          let ratio = el.width / el.height;
          if (((caseSlider.el.clientWidth + (325 * 2)) / caseSlider.el.clientHeight) > ratio) {          
            return {
              width: (caseSlider.el.clientWidth + (325 * 2)),
              height: (caseSlider.el.clientWidth + (325 * 2)) / ratio,
              x: 0,
              y: (window.innerHeight - (caseSlider.el.clientWidth + (325 * 2)) / ratio) / 2
            }
          } else {          
            return {
              width: caseSlider.el.clientHeight * ratio,
              height: caseSlider.el.clientHeight,
              x: ((caseSlider.el.clientWidth + (325 * 2)) - caseSlider.el.clientHeight * ratio) / 2,
              y: 0
            }
          }
        };  
        
        let caseX = caseSlider.el.clientWidth * caseSlider.realIndex;
        caseSlider.rootContainer.x = -caseX;
        let caseGalleryEl = caseSlider.el.closest('.single-slider');
        caseSlider.gallery.renderer.resize(caseSlider.el.clientWidth, window.innerHeight);      
        caseSlider.images.forEach(function(el, i){        
            el.width = heroBgCover(el.texture).width;
            el.height = heroBgCover(el.texture).height;
            el.x = heroBgCover(el).x + (el.width / 2);
            el.y = heroBgCover(el).y + (el.height / 2);
            caseSlider.containers[i].width = caseGalleryEl.clientWidth + (325 * 2);
            caseSlider.containers[i].x = (caseGalleryEl.clientWidth * i) - 325;
            caseSlider.masks[i].clear();
            caseSlider.masks[i].lineStyle(0);
            caseSlider.masks[i].beginFill(0xffffff, 0.5);          
            caseSlider.masks[i].drawPolygon([-325, 0, caseGalleryEl.clientWidth - 325, 0, (caseGalleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
            caseSlider.masks[i].endFill();
            caseSlider.masks[i].x = caseGalleryEl.clientWidth * i;
        });      
        caseSlider.cloneImages.forEach(function(el, i){
            el.width = heroBgCover(el.texture).width;
            el.height = heroBgCover(el.texture).height;
            el.x = heroBgCover(el).x + (el.width / 2);
            el.y = heroBgCover(el).y + (el.height / 2);
            if(i == 0){
              caseSlider.cloneImages[0].width = heroBgCover(caseSlider.cloneImages[0].texture).width;
              caseSlider.cloneImages[0].height = heroBgCover(caseSlider.cloneImages[0].texture).height;
              caseSlider.cloneImages[0].x = heroBgCover(caseSlider.cloneImages[0].texture).x;
              caseSlider.cloneImages[0].y = heroBgCover(caseSlider.cloneImages[0].texture).y;
              caseSlider.cloneContainers[0].width = caseGalleryEl.clientWidth + (325 * 2);
              caseSlider.cloneContainers[0].x = caseGalleryEl.clientWidth * caseSlider.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;            
              caseSlider.cloneMasks[0].clear();
              caseSlider.cloneMasks[0].lineStyle(0);
              caseSlider.cloneMasks[0].beginFill(0xffffff, 0.5);          
              caseSlider.cloneMasks[0].drawPolygon([-325, 0, caseGalleryEl.clientWidth - 325, 0, (caseGalleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
              caseSlider.cloneMasks[0].endFill();
              caseSlider.cloneMasks[0].x = caseGalleryEl.clientWidth * caseSlider.el.querySelectorAll('.swiper-slide .slide--photo img').length;
            }else {
              caseSlider.cloneImages[1].width = heroBgCover(caseSlider.cloneImages[0].texture).width;
              caseSlider.cloneImages[1].height = heroBgCover(caseSlider.cloneImages[0].texture).height;
              caseSlider.cloneImages[1].x = heroBgCover(caseSlider.cloneImages[0].texture).x;
              caseSlider.cloneImages[1].y = heroBgCover(caseSlider.cloneImages[0].texture).y;
              caseSlider.cloneContainers[1].width = caseGalleryEl.clientWidth + (325 * 2);
              caseSlider.cloneContainers[1].x = -caseGalleryEl.clientWidth;
              caseSlider.cloneMasks[1].clear();
              caseSlider.cloneMasks[1].lineStyle(0);
              caseSlider.cloneMasks[1].beginFill(0xffffff, 0.5);          
              caseSlider.cloneMasks[1].drawPolygon([-325, 0, caseGalleryEl.clientWidth - 325, 0, (caseGalleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
              caseSlider.cloneMasks[1].endFill();
              caseSlider.cloneMasks[1].x = -caseGalleryEl.clientWidth;
            }
        });
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
          'highcharts'
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
        
        this.resources += document.querySelectorAll('img').length        
          + this.scripts.length;
  
        document.querySelectorAll('img').forEach(function (el, i) {
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
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
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
          }
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
                if ((that.el.clientWidth + (325 * 2)) / that.el.clientHeight > ratio) {
                  return {
                    width: (that.el.clientWidth + (325 * 2)),
                    height: (that.el.clientWidth + (325 * 2)) / ratio,
                    x: 0,
                    y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
                  }
                } else {
                  return {
                    width: that.el.clientHeight * ratio,
                    height: that.el.clientHeight,
                    x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
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
              this.mask.beginFill(0xffffff, 0.5);
              //this.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
              this.mask.drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
              this.mask.endFill();
      
              this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
                let src = el.getAttribute('data-src');
                let container = new PIXI.Container();
                let image = PIXI.Sprite.from(src);
                let mask = that.mask.clone();
                mask.x = galleryEl.clientWidth * i;
                that.rootContainer.addChild(mask);
                container.mask = mask;
                image.anchor.x = 0.5;
                image.anchor.y = 0.5;          
                image.width = heroBgCover(el).width;
                image.height = heroBgCover(el).height;          
                image.x = heroBgCover(el).x + (image.width / 2);
                image.y = heroBgCover(el).y + (image.height / 2);
                image.alpha = (i == 0 ? 0.7 : 0.5);
                container.width = galleryEl.clientWidth + (325 * 2);
                container.x = (galleryEl.clientWidth * i) - 325;
                that.rootContainer.addChild(container);
                container.addChild(image);
      
                if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
                  let cloneImage = PIXI.Sprite.from(src);
                  cloneImage.width = heroBgCover(el).width;
                  cloneImage.height = heroBgCover(el).height;
                  cloneImage.x = heroBgCover(el).x;
                  cloneImage.y = heroBgCover(el).y;
                  cloneImage.alpha = 0.5;
                  let cloneContaner = new PIXI.Container();
                  cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                  that.rootContainer.addChild(cloneContaner);
                  cloneContaner.x = -galleryEl.clientWidth;
                  let cloneMask = that.mask.clone();
                  cloneMask.x = -galleryEl.clientWidth;
                  that.rootContainer.addChild(cloneMask);
                  cloneContaner.mask = cloneMask;
                  cloneContaner.addChild(cloneImage);
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
                  cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                  that.rootContainer.addChild(cloneContaner);
                  cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                  let cloneMask = that.mask.clone();
                  cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
                  that.rootContainer.addChild(cloneMask);
                  cloneContaner.mask = cloneMask;
                  cloneContaner.addChild(cloneImage);
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
              let x = this.el.clientWidth * this.realIndex;
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
              if ((that.el.clientWidth + (325 * 2)) / that.el.clientHeight > ratio) {
                return {
                  width: (that.el.clientWidth + (325 * 2)),
                  height: (that.el.clientWidth + (325 * 2)) / ratio,
                  x: 0,
                  y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
                }
              } else {
                return {
                  width: that.el.clientHeight * ratio,
                  height: that.el.clientHeight,
                  x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
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
            this.mask.beginFill(0xffffff, 0.5);
            //this.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
            this.mask.drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
            this.mask.endFill();
    
            this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
              let src = el.getAttribute('data-src');
              let container = new PIXI.Container();
              let image = PIXI.Sprite.from(src);
              let mask = that.mask.clone();
              mask.x = galleryEl.clientWidth * i;
              that.rootContainer.addChild(mask);
              container.mask = mask;
              image.anchor.x = 0.5;
              image.anchor.y = 0.5;          
              image.width = heroBgCover(el).width;
              image.height = heroBgCover(el).height;          
              image.x = heroBgCover(el).x + (image.width / 2);
              image.y = heroBgCover(el).y + (image.height / 2);
              image.alpha = (i == 0 ? 0.7 : 0.5);
              container.width = galleryEl.clientWidth + (325 * 2);
              container.x = (galleryEl.clientWidth * i) - 325;
              that.rootContainer.addChild(container);
              container.addChild(image);
    
              if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
                let cloneImage = PIXI.Sprite.from(src);
                cloneImage.width = heroBgCover(el).width;
                cloneImage.height = heroBgCover(el).height;
                cloneImage.x = heroBgCover(el).x;
                cloneImage.y = heroBgCover(el).y;
                cloneImage.alpha = 0.5;
                let cloneContaner = new PIXI.Container();
                cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                that.rootContainer.addChild(cloneContaner);
                cloneContaner.x = -galleryEl.clientWidth;
                let cloneMask = that.mask.clone();
                cloneMask.x = -galleryEl.clientWidth;
                that.rootContainer.addChild(cloneMask);
                cloneContaner.mask = cloneMask;
                cloneContaner.addChild(cloneImage);
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
                cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                that.rootContainer.addChild(cloneContaner);
                cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                let cloneMask = that.mask.clone();
                cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
                that.rootContainer.addChild(cloneMask);
                cloneContaner.mask = cloneMask;
                cloneContaner.addChild(cloneImage);
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
            let x = this.el.clientWidth * this.realIndex;
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
              if (((that.el.clientWidth + (325 * 2)) / that.el.clientHeight) > ratio) {          
                return {
                  width: (that.el.clientWidth + (325 * 2)),
                  height: (that.el.clientWidth + (325 * 2)) / ratio,
                  x: 0,
                  y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
                }
              } else {          
                return {
                  width: that.el.clientHeight * ratio,
                  height: that.el.clientHeight,
                  x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
                  y: 0
                }
              }
            };        
            let x = that.el.clientWidth * that.realIndex;
            that.rootContainer.x = -x;
            let galleryEl = that.el.closest('.single-slider');
            that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
            that.images.forEach(function(el, i){        
                el.width = heroBgCover(el.texture).width;
                el.height = heroBgCover(el.texture).height;
                el.x = heroBgCover(el).x + (el.width / 2);
                el.y = heroBgCover(el).y + (el.height / 2);
                that.containers[i].width = galleryEl.clientWidth + (325 * 2);
                that.containers[i].x = (galleryEl.clientWidth * i) - 325;
                that.masks[i].clear();
                that.masks[i].lineStyle(0);
                that.masks[i].beginFill(0xffffff, 0.5);          
                that.masks[i].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
                that.masks[i].endFill();
                that.masks[i].x = galleryEl.clientWidth * i;
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
                  that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;            
                  that.cloneMasks[0].clear();
                  that.cloneMasks[0].lineStyle(0);
                  that.cloneMasks[0].beginFill(0xffffff, 0.5);          
                  that.cloneMasks[0].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
                  that.cloneMasks[0].endFill();
                  that.cloneMasks[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
                }else {
                  that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                  that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                  that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                  that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                  that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[1].x = -galleryEl.clientWidth;
                  that.cloneMasks[1].clear();
                  that.cloneMasks[1].lineStyle(0);
                  that.cloneMasks[1].beginFill(0xffffff, 0.5);          
                  that.cloneMasks[1].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
                  that.cloneMasks[1].endFill();
                  that.cloneMasks[1].x = -galleryEl.clientWidth;
                }
            });
          });          
        }else{
          const that = this.singleSlider;          
          function heroBgCover(el) {          
            let ratio = el.width / el.height;
            if (((that.el.clientWidth + (325 * 2)) / that.el.clientHeight) > ratio) {          
              return {
                width: (that.el.clientWidth + (325 * 2)),
                height: (that.el.clientWidth + (325 * 2)) / ratio,
                x: 0,
                y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
              }
            } else {          
              return {
                width: that.el.clientHeight * ratio,
                height: that.el.clientHeight,
                x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
                y: 0
              }
            }
          };        
          let x = that.el.clientWidth * that.realIndex;
          that.rootContainer.x = -x;
          let galleryEl = that.el.closest('.single-slider');
          that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
          that.images.forEach(function(el, i){        
              el.width = heroBgCover(el.texture).width;
              el.height = heroBgCover(el.texture).height;
              el.x = heroBgCover(el).x + (el.width / 2);
              el.y = heroBgCover(el).y + (el.height / 2);
              that.containers[i].width = galleryEl.clientWidth + (325 * 2);
              that.containers[i].x = (galleryEl.clientWidth * i) - 325;
              that.masks[i].clear();
              that.masks[i].lineStyle(0);
              that.masks[i].beginFill(0xffffff, 0.5);          
              that.masks[i].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
              that.masks[i].endFill();
              that.masks[i].x = galleryEl.clientWidth * i;
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
                that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;            
                that.cloneMasks[0].clear();
                that.cloneMasks[0].lineStyle(0);
                that.cloneMasks[0].beginFill(0xffffff, 0.5);          
                that.cloneMasks[0].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
                that.cloneMasks[0].endFill();
                that.cloneMasks[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
              }else {
                that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                that.cloneContainers[1].x = -galleryEl.clientWidth;
                that.cloneMasks[1].clear();
                that.cloneMasks[1].lineStyle(0);
                that.cloneMasks[1].beginFill(0xffffff, 0.5);          
                that.cloneMasks[1].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
                that.cloneMasks[1].endFill();
                that.cloneMasks[1].x = -galleryEl.clientWidth;
              }
          });
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
        document.querySelectorAll('.nav__tabs li').forEach(function(el, i){
          el.addEventListener('click', that.onClick);
          el.addEventListener('mouseenter', that.onHover);
          el.addEventListener('mouseleave', that.onHover);
        });
        document.querySelector('[data-action="full-itinerary"]').addEventListener('click', function(e){
          e.preventDefault();
          document.querySelector('[data-target="itinerary"]').click();
          let y = document.querySelector('.nav__tabs').offsetTop;
          setTimeout(function(){
            window.scroll(0, y);
          }, 600)
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
        
        this.resources += document.querySelectorAll('img').length        
          + this.scripts.length;
  
        document.querySelectorAll('img').forEach(function (el, i) {
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
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
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
          }
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
                if ((that.el.clientWidth + (325 * 2)) / that.el.clientHeight > ratio) {
                  return {
                    width: (that.el.clientWidth + (325 * 2)),
                    height: (that.el.clientWidth + (325 * 2)) / ratio,
                    x: 0,
                    y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
                  }
                } else {
                  return {
                    width: that.el.clientHeight * ratio,
                    height: that.el.clientHeight,
                    x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
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
              this.mask.beginFill(0xffffff, 0.5);
              //this.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
              this.mask.drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
              this.mask.endFill();
      
              this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
                let src = el.getAttribute('data-src');
                let container = new PIXI.Container();
                let image = PIXI.Sprite.from(src);
                let mask = that.mask.clone();
                mask.x = galleryEl.clientWidth * i;
                that.rootContainer.addChild(mask);
                container.mask = mask;
                image.anchor.x = 0.5;
                image.anchor.y = 0.5;          
                image.width = heroBgCover(el).width;
                image.height = heroBgCover(el).height;          
                image.x = heroBgCover(el).x + (image.width / 2);
                image.y = heroBgCover(el).y + (image.height / 2);
                image.alpha = (i == 0 ? 0.7 : 0.5);
                container.width = galleryEl.clientWidth + (325 * 2);
                container.x = (galleryEl.clientWidth * i) - 325;
                that.rootContainer.addChild(container);
                container.addChild(image);
      
                if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
                  let cloneImage = PIXI.Sprite.from(src);
                  cloneImage.width = heroBgCover(el).width;
                  cloneImage.height = heroBgCover(el).height;
                  cloneImage.x = heroBgCover(el).x;
                  cloneImage.y = heroBgCover(el).y;
                  cloneImage.alpha = 0.5;
                  let cloneContaner = new PIXI.Container();
                  cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                  that.rootContainer.addChild(cloneContaner);
                  cloneContaner.x = -galleryEl.clientWidth;
                  let cloneMask = that.mask.clone();
                  cloneMask.x = -galleryEl.clientWidth;
                  that.rootContainer.addChild(cloneMask);
                  cloneContaner.mask = cloneMask;
                  cloneContaner.addChild(cloneImage);
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
                  cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                  that.rootContainer.addChild(cloneContaner);
                  cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                  let cloneMask = that.mask.clone();
                  cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
                  that.rootContainer.addChild(cloneMask);
                  cloneContaner.mask = cloneMask;
                  cloneContaner.addChild(cloneImage);
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
              let x = this.el.clientWidth * this.realIndex;
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
              if ((that.el.clientWidth + (325 * 2)) / that.el.clientHeight > ratio) {
                return {
                  width: (that.el.clientWidth + (325 * 2)),
                  height: (that.el.clientWidth + (325 * 2)) / ratio,
                  x: 0,
                  y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
                }
              } else {
                return {
                  width: that.el.clientHeight * ratio,
                  height: that.el.clientHeight,
                  x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
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
            this.mask.beginFill(0xffffff, 0.5);
            //this.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
            this.mask.drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
            this.mask.endFill();
    
            this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
              let src = el.getAttribute('data-src');
              let container = new PIXI.Container();
              let image = PIXI.Sprite.from(src);
              let mask = that.mask.clone();
              mask.x = galleryEl.clientWidth * i;
              that.rootContainer.addChild(mask);
              container.mask = mask;
              image.anchor.x = 0.5;
              image.anchor.y = 0.5;          
              image.width = heroBgCover(el).width;
              image.height = heroBgCover(el).height;          
              image.x = heroBgCover(el).x + (image.width / 2);
              image.y = heroBgCover(el).y + (image.height / 2);
              image.alpha = (i == 0 ? 0.7 : 0.5);
              container.width = galleryEl.clientWidth + (325 * 2);
              container.x = (galleryEl.clientWidth * i) - 325;
              that.rootContainer.addChild(container);
              container.addChild(image);
    
              if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
                let cloneImage = PIXI.Sprite.from(src);
                cloneImage.width = heroBgCover(el).width;
                cloneImage.height = heroBgCover(el).height;
                cloneImage.x = heroBgCover(el).x;
                cloneImage.y = heroBgCover(el).y;
                cloneImage.alpha = 0.5;
                let cloneContaner = new PIXI.Container();
                cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                that.rootContainer.addChild(cloneContaner);
                cloneContaner.x = -galleryEl.clientWidth;
                let cloneMask = that.mask.clone();
                cloneMask.x = -galleryEl.clientWidth;
                that.rootContainer.addChild(cloneMask);
                cloneContaner.mask = cloneMask;
                cloneContaner.addChild(cloneImage);
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
                cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                that.rootContainer.addChild(cloneContaner);
                cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                let cloneMask = that.mask.clone();
                cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
                that.rootContainer.addChild(cloneMask);
                cloneContaner.mask = cloneMask;
                cloneContaner.addChild(cloneImage);
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
            let x = this.el.clientWidth * this.realIndex;
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
              if (((that.el.clientWidth + (325 * 2)) / that.el.clientHeight) > ratio) {          
                return {
                  width: (that.el.clientWidth + (325 * 2)),
                  height: (that.el.clientWidth + (325 * 2)) / ratio,
                  x: 0,
                  y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
                }
              } else {          
                return {
                  width: that.el.clientHeight * ratio,
                  height: that.el.clientHeight,
                  x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
                  y: 0
                }
              }
            };        
            let x = that.el.clientWidth * that.realIndex;
            that.rootContainer.x = -x;
            let galleryEl = that.el.closest('.single-slider');
            that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
            that.images.forEach(function(el, i){        
                el.width = heroBgCover(el.texture).width;
                el.height = heroBgCover(el.texture).height;
                el.x = heroBgCover(el).x + (el.width / 2);
                el.y = heroBgCover(el).y + (el.height / 2);
                that.containers[i].width = galleryEl.clientWidth + (325 * 2);
                that.containers[i].x = (galleryEl.clientWidth * i) - 325;
                that.masks[i].clear();
                that.masks[i].lineStyle(0);
                that.masks[i].beginFill(0xffffff, 0.5);          
                that.masks[i].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
                that.masks[i].endFill();
                that.masks[i].x = galleryEl.clientWidth * i;
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
                  that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;            
                  that.cloneMasks[0].clear();
                  that.cloneMasks[0].lineStyle(0);
                  that.cloneMasks[0].beginFill(0xffffff, 0.5);          
                  that.cloneMasks[0].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
                  that.cloneMasks[0].endFill();
                  that.cloneMasks[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
                }else {
                  that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                  that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                  that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                  that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                  that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                  that.cloneContainers[1].x = -galleryEl.clientWidth;
                  that.cloneMasks[1].clear();
                  that.cloneMasks[1].lineStyle(0);
                  that.cloneMasks[1].beginFill(0xffffff, 0.5);          
                  that.cloneMasks[1].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
                  that.cloneMasks[1].endFill();
                  that.cloneMasks[1].x = -galleryEl.clientWidth;
                }
            });
          });          
        }else{
          const that = this.singleSlider;          
          function heroBgCover(el) {          
            let ratio = el.width / el.height;
            if (((that.el.clientWidth + (325 * 2)) / that.el.clientHeight) > ratio) {          
              return {
                width: (that.el.clientWidth + (325 * 2)),
                height: (that.el.clientWidth + (325 * 2)) / ratio,
                x: 0,
                y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
              }
            } else {          
              return {
                width: that.el.clientHeight * ratio,
                height: that.el.clientHeight,
                x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
                y: 0
              }
            }
          };        
          let x = that.el.clientWidth * that.realIndex;
          that.rootContainer.x = -x;
          let galleryEl = that.el.closest('.single-slider');
          that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
          that.images.forEach(function(el, i){        
              el.width = heroBgCover(el.texture).width;
              el.height = heroBgCover(el.texture).height;
              el.x = heroBgCover(el).x + (el.width / 2);
              el.y = heroBgCover(el).y + (el.height / 2);
              that.containers[i].width = galleryEl.clientWidth + (325 * 2);
              that.containers[i].x = (galleryEl.clientWidth * i) - 325;
              that.masks[i].clear();
              that.masks[i].lineStyle(0);
              that.masks[i].beginFill(0xffffff, 0.5);          
              that.masks[i].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
              that.masks[i].endFill();
              that.masks[i].x = galleryEl.clientWidth * i;
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
                that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;            
                that.cloneMasks[0].clear();
                that.cloneMasks[0].lineStyle(0);
                that.cloneMasks[0].beginFill(0xffffff, 0.5);          
                that.cloneMasks[0].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
                that.cloneMasks[0].endFill();
                that.cloneMasks[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
              }else {
                that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                that.cloneContainers[1].x = -galleryEl.clientWidth;
                that.cloneMasks[1].clear();
                that.cloneMasks[1].lineStyle(0);
                that.cloneMasks[1].beginFill(0xffffff, 0.5);          
                that.cloneMasks[1].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
                that.cloneMasks[1].endFill();
                that.cloneMasks[1].x = -galleryEl.clientWidth;
              }
          });
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
      
      this.resources += document.querySelectorAll('img').length        
        + this.scripts.length;

      document.querySelectorAll('img').forEach(function (el, i) {
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
        .to('.leisure__hero_pagination .pagination--bar i', 1, { width: pS + '%', ease: Power3.easeIn }, 'transition')
        .to(that.heroFilter, 1, { strength: 2, ease: Power3.easeIn }, 'transition')
        .to(current, 1, { alpha: 0, ease: Power3.easeIn }, 'transition')
        .to(next, 1, { alpha: 1, ease: Power3.easeIn }, 'transition')
        .fromTo('.leisure__hero h1 .switch[data-slide="' + that.slide + '"]', 1, { rotationX: 0, opacity: 1, y: 0 }, { rotationX: 90, opacity: 0, y: 30, ease: Power3.easeIn }, 'transition')
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
        
        this.resources += document.querySelectorAll('img').length        
          + this.scripts.length;
  
        document.querySelectorAll('img').forEach(function (el, i) {
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
        
        this.resources += document.querySelectorAll('img').length        
          + this.scripts.length;
  
        document.querySelectorAll('img').forEach(function (el, i) {
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
      
      this.resources += document.querySelectorAll('img').length        
        + this.scripts.length;

      document.querySelectorAll('img').forEach(function (el, i) {
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
        .to('.leisure__hero_pagination .pagination--bar i', 1, { width: pS + '%', ease: Power3.easeIn }, 'transition')
        .to(that.heroFilter, 1, { strength: 2, ease: Power3.easeIn }, 'transition')
        .to(current, 1, { alpha: 0, ease: Power3.easeIn }, 'transition')
        .to(next, 1, { alpha: 1, ease: Power3.easeIn }, 'transition')
        .fromTo('.leisure__hero h1 .switch[data-slide="' + that.slide + '"]', 1, { rotationX: 0, opacity: 1, y: 0 }, { rotationX: 90, opacity: 0, y: 30, ease: Power3.easeIn }, 'transition')
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
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        slidesPerView: 2,
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
        }
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
              if ((that.el.clientWidth + (325 * 2)) / that.el.clientHeight > ratio) {
                return {
                  width: (that.el.clientWidth + (325 * 2)),
                  height: (that.el.clientWidth + (325 * 2)) / ratio,
                  x: 0,
                  y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
                }
              } else {
                return {
                  width: that.el.clientHeight * ratio,
                  height: that.el.clientHeight,
                  x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
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
            this.mask.beginFill(0xffffff, 0.5);
            //this.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
            this.mask.drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
            this.mask.endFill();
    
            this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
              let src = el.getAttribute('data-src');
              let container = new PIXI.Container();
              let image = PIXI.Sprite.from(src);
              let mask = that.mask.clone();
              mask.x = galleryEl.clientWidth * i;
              that.rootContainer.addChild(mask);
              container.mask = mask;
              image.anchor.x = 0.5;
              image.anchor.y = 0.5;          
              image.width = heroBgCover(el).width;
              image.height = heroBgCover(el).height;          
              image.x = heroBgCover(el).x + (image.width / 2);
              image.y = heroBgCover(el).y + (image.height / 2);
              image.alpha = (i == 0 ? 0.7 : 0.5);
              container.width = galleryEl.clientWidth + (325 * 2);
              container.x = (galleryEl.clientWidth * i) - 325;
              that.rootContainer.addChild(container);
              container.addChild(image);
    
              if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
                let cloneImage = PIXI.Sprite.from(src);
                cloneImage.width = heroBgCover(el).width;
                cloneImage.height = heroBgCover(el).height;
                cloneImage.x = heroBgCover(el).x;
                cloneImage.y = heroBgCover(el).y;
                cloneImage.alpha = 0.5;
                let cloneContaner = new PIXI.Container();
                cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                that.rootContainer.addChild(cloneContaner);
                cloneContaner.x = -galleryEl.clientWidth;
                let cloneMask = that.mask.clone();
                cloneMask.x = -galleryEl.clientWidth;
                that.rootContainer.addChild(cloneMask);
                cloneContaner.mask = cloneMask;
                cloneContaner.addChild(cloneImage);
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
                cloneContaner.width = galleryEl.clientWidth + (325 * 2);
                that.rootContainer.addChild(cloneContaner);
                cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
                let cloneMask = that.mask.clone();
                cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
                that.rootContainer.addChild(cloneMask);
                cloneContaner.mask = cloneMask;
                cloneContaner.addChild(cloneImage);
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
            let x = this.el.clientWidth * this.realIndex;
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
            if ((that.el.clientWidth + (325 * 2)) / that.el.clientHeight > ratio) {
              return {
                width: (that.el.clientWidth + (325 * 2)),
                height: (that.el.clientWidth + (325 * 2)) / ratio,
                x: 0,
                y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
              }
            } else {
              return {
                width: that.el.clientHeight * ratio,
                height: that.el.clientHeight,
                x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
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
          this.mask.beginFill(0xffffff, 0.5);
          //this.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
          this.mask.drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
          this.mask.endFill();
  
          this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function (el, i) {
            let src = el.getAttribute('data-src');
            let container = new PIXI.Container();
            let image = PIXI.Sprite.from(src);
            let mask = that.mask.clone();
            mask.x = galleryEl.clientWidth * i;
            that.rootContainer.addChild(mask);
            container.mask = mask;
            image.anchor.x = 0.5;
            image.anchor.y = 0.5;          
            image.width = heroBgCover(el).width;
            image.height = heroBgCover(el).height;          
            image.x = heroBgCover(el).x + (image.width / 2);
            image.y = heroBgCover(el).y + (image.height / 2);
            image.alpha = (i == 0 ? 0.7 : 0.5);
            container.width = galleryEl.clientWidth + (325 * 2);
            container.x = (galleryEl.clientWidth * i) - 325;
            that.rootContainer.addChild(container);
            container.addChild(image);
  
            if (i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)) {
              let cloneImage = PIXI.Sprite.from(src);
              cloneImage.width = heroBgCover(el).width;
              cloneImage.height = heroBgCover(el).height;
              cloneImage.x = heroBgCover(el).x;
              cloneImage.y = heroBgCover(el).y;
              cloneImage.alpha = 0.5;
              let cloneContaner = new PIXI.Container();
              cloneContaner.width = galleryEl.clientWidth + (325 * 2);
              that.rootContainer.addChild(cloneContaner);
              cloneContaner.x = -galleryEl.clientWidth;
              let cloneMask = that.mask.clone();
              cloneMask.x = -galleryEl.clientWidth;
              that.rootContainer.addChild(cloneMask);
              cloneContaner.mask = cloneMask;
              cloneContaner.addChild(cloneImage);
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
              cloneContaner.width = galleryEl.clientWidth + (325 * 2);
              that.rootContainer.addChild(cloneContaner);
              cloneContaner.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
              let cloneMask = that.mask.clone();
              cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
              that.rootContainer.addChild(cloneMask);
              cloneContaner.mask = cloneMask;
              cloneContaner.addChild(cloneImage);
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
          let x = this.el.clientWidth * this.realIndex;
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
            if (((that.el.clientWidth + (325 * 2)) / that.el.clientHeight) > ratio) {          
              return {
                width: (that.el.clientWidth + (325 * 2)),
                height: (that.el.clientWidth + (325 * 2)) / ratio,
                x: 0,
                y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
              }
            } else {          
              return {
                width: that.el.clientHeight * ratio,
                height: that.el.clientHeight,
                x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
                y: 0
              }
            }
          };        
          let x = that.el.clientWidth * that.realIndex;
          that.rootContainer.x = -x;
          let galleryEl = that.el.closest('.single-slider');
          that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
          that.images.forEach(function(el, i){        
              el.width = heroBgCover(el.texture).width;
              el.height = heroBgCover(el.texture).height;
              el.x = heroBgCover(el).x + (el.width / 2);
              el.y = heroBgCover(el).y + (el.height / 2);
              that.containers[i].width = galleryEl.clientWidth + (325 * 2);
              that.containers[i].x = (galleryEl.clientWidth * i) - 325;
              that.masks[i].clear();
              that.masks[i].lineStyle(0);
              that.masks[i].beginFill(0xffffff, 0.5);          
              that.masks[i].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
              that.masks[i].endFill();
              that.masks[i].x = galleryEl.clientWidth * i;
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
                that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
                that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;            
                that.cloneMasks[0].clear();
                that.cloneMasks[0].lineStyle(0);
                that.cloneMasks[0].beginFill(0xffffff, 0.5);          
                that.cloneMasks[0].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
                that.cloneMasks[0].endFill();
                that.cloneMasks[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
              }else {
                that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
                that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
                that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
                that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
                that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
                that.cloneContainers[1].x = -galleryEl.clientWidth;
                that.cloneMasks[1].clear();
                that.cloneMasks[1].lineStyle(0);
                that.cloneMasks[1].beginFill(0xffffff, 0.5);          
                that.cloneMasks[1].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
                that.cloneMasks[1].endFill();
                that.cloneMasks[1].x = -galleryEl.clientWidth;
              }
          });
        });          
      }else{
        const that = this.singleSlider;          
        function heroBgCover(el) {          
          let ratio = el.width / el.height;
          if (((that.el.clientWidth + (325 * 2)) / that.el.clientHeight) > ratio) {          
            return {
              width: (that.el.clientWidth + (325 * 2)),
              height: (that.el.clientWidth + (325 * 2)) / ratio,
              x: 0,
              y: (window.innerHeight - (that.el.clientWidth + (325 * 2)) / ratio) / 2
            }
          } else {          
            return {
              width: that.el.clientHeight * ratio,
              height: that.el.clientHeight,
              x: ((that.el.clientWidth + (325 * 2)) - that.el.clientHeight * ratio) / 2,
              y: 0
            }
          }
        };        
        let x = that.el.clientWidth * that.realIndex;
        that.rootContainer.x = -x;
        let galleryEl = that.el.closest('.single-slider');
        that.gallery.renderer.resize(that.el.clientWidth, window.innerHeight);
        that.images.forEach(function(el, i){        
            el.width = heroBgCover(el.texture).width;
            el.height = heroBgCover(el.texture).height;
            el.x = heroBgCover(el).x + (el.width / 2);
            el.y = heroBgCover(el).y + (el.height / 2);
            that.containers[i].width = galleryEl.clientWidth + (325 * 2);
            that.containers[i].x = (galleryEl.clientWidth * i) - 325;
            that.masks[i].clear();
            that.masks[i].lineStyle(0);
            that.masks[i].beginFill(0xffffff, 0.5);          
            that.masks[i].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
            that.masks[i].endFill();
            that.masks[i].x = galleryEl.clientWidth * i;
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
              that.cloneContainers[0].width = galleryEl.clientWidth + (325 * 2);
              that.cloneContainers[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;            
              that.cloneMasks[0].clear();
              that.cloneMasks[0].lineStyle(0);
              that.cloneMasks[0].beginFill(0xffffff, 0.5);          
              that.cloneMasks[0].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
              that.cloneMasks[0].endFill();
              that.cloneMasks[0].x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
            }else {
              that.cloneImages[1].width = heroBgCover(that.cloneImages[0].texture).width;
              that.cloneImages[1].height = heroBgCover(that.cloneImages[0].texture).height;
              that.cloneImages[1].x = heroBgCover(that.cloneImages[0].texture).x;
              that.cloneImages[1].y = heroBgCover(that.cloneImages[0].texture).y;
              that.cloneContainers[1].width = galleryEl.clientWidth + (325 * 2);
              that.cloneContainers[1].x = -galleryEl.clientWidth;
              that.cloneMasks[1].clear();
              that.cloneMasks[1].lineStyle(0);
              that.cloneMasks[1].beginFill(0xffffff, 0.5);          
              that.cloneMasks[1].drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth + (325)), window.innerHeight, 325, window.innerHeight]);
              that.cloneMasks[1].endFill();
              that.cloneMasks[1].x = -galleryEl.clientWidth;
            }
        });
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
      that.trust.resize();
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
        
        this.resources += document.querySelectorAll('img').length        
          + this.scripts.length;
  
        document.querySelectorAll('img').forEach(function (el, i) {
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
        
        this.resources += document.querySelectorAll('img').length        
          + this.scripts.length;
  
        document.querySelectorAll('img').forEach(function (el, i) {
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
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
          slidesPerView: 2,
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
          }
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
      
      this.resources += document.querySelectorAll('img').length        
        + this.scripts.length;

      document.querySelectorAll('img').forEach(function (el, i) {
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
        
        this.resources += document.querySelectorAll('img').length        
          + this.scripts.length;
  
        document.querySelectorAll('img').forEach(function (el, i) {
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
        return

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





window.onload = function () {
  setTimeout(function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
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
    
    
    
    
  }, 100);
}











