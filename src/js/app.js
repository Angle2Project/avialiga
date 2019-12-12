// Closest Polyfill
if (!Element.prototype.closest) {  
  Element.prototype.closest = function(css) {
    var node = this;
    while (node) {
      if (node.matches(css)) return node;
      else node = node.parentElement;
    }
    return null;
  };
}

const app = {

  resours: {
    pixi: 'pixi-legacy.min.js',
    pixiFilters: 'pixi-filters.js',
    splitText: 'SplitText.min.js',
    swiper: 'swiper.min.js',
    aos: 'aos.js'
  },
  globalEvents: function(){
    // Start header
    document.querySelectorAll('[data-action="submenu"]').forEach(function(el, i){
      el.addEventListener('mouseenter', header);
      el.addEventListener('mouseleave', header);      
    });
    document.querySelectorAll('.take-button').forEach(function(el, i){
      el.addEventListener('mouseenter', function(e){
        TweenMax.to(this, 0.5, {color: '#fff', ease: Power2.easeOut});
        TweenMax.to(this.querySelector('i'), 0.5, {y:5, height: '40px', skewX: -31, ease: Power2.easeOut});
      });
    });
    document.querySelectorAll('.take-button').forEach(function(el, i){
      el.addEventListener('mouseleave', function(e){
        TweenMax.to(this, 0.5, {color: function(){
          if(document.body.classList.contains('homepage')){
            return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f':'#ffffff';
          }else if(document.body.classList.contains('catalog')){            
            return '#5ac0b0';
          }
          
        }, ease: Power2.easeOut});
        TweenMax.to(this.querySelector('i'), 0.5, {y:0, height: '1px', skewX: -31, ease: Power2.easeOut});
      });
    });
    // =================================================================================

    // Start buttons
    document.querySelectorAll('.btn-skew').forEach(function(el, i){
      el.addEventListener('mouseenter', function(e){
        TweenMax.set(this.querySelector('i'), {transformOrigin: '0 100%'});
        TweenMax.to(this.querySelector('span'), 0.5, {color: '#ee412a', ease: Power2.easeOut});
        TweenMax.to(this.querySelector('i'), 0.5, {scaleY: 1, ease: Power2.easeOut});
      });
      el.addEventListener('mouseleave', function(e){        
        TweenMax.set(this.querySelector('i'), {transformOrigin: '0 0'});
        TweenMax.to(this.querySelector('span'), 0.5, {color: '#fff', ease: Power2.easeOut});
        TweenMax.to(this.querySelector('i'), 0.5, {scaleY: 0, ease: Power2.easeOut});
      });
    });
    // =================================================================================

    // Start Form render    
    document.querySelectorAll('.form-control').forEach(function(el, i){
      let b = document.createElement('i');    
      el.appendChild(b);
    })    
    // =================================================================================
  }  
}


function header(e){  
  if(e.type == 'mouseenter'){    
    this.classList.add('active');
    let tl = new TimelineMax();    
    tl.to(this.querySelector('a'), 0.6, {color: '#ee412a'}, 'start')
      .to(this.querySelector('.icon'), 0.6, {fill: '#ee412a', rotation: 180}, 'start')
      .to(document.querySelectorAll('.header__nav_link:not(.active) > a, .header__right a'), 0.6, {color: function(){
        let color;
        if(document.body.classList.contains('homepage') || document.body.classList.contains('leisure')){
          color = '#2f2f2f';
        }else if(document.body.classList.contains('catalog')){
          color = '#5ac0b0';
        }
        return color;
      }, ease: Power0.easeNone}, 'start')
      .to(document.querySelectorAll('.header__nav_link:not(.active) > a .icon, .header__right .icon'), 0.6, {fill: function(){
        let color;
        if(document.body.classList.contains('homepage') || document.body.classList.contains('leisure')){
          color = '#2f2f2f';
        }else if(document.body.classList.contains('catalog')){
          color = '#5ac0b0';
        }
        return color;
      }, ease: Power0.easeNone}, 'start')
      .to('.header__bg', 0.5, {opacity: 1, ease: Power0.easeNone}, 'start')
      .to('.header__logo .logo--white', 0.5, {opacity: 0}, 'start')
      .to('.header__logo .logo--black', 0.5, {opacity: 1}, 'start')
      .to(this.querySelector('.submenu'), 0.5, {autoAlpha: 1, ease: Power0.easeNone}, 'start')
      .fromTo(this.querySelectorAll('.submenu .row'), 0.8, {opacity: 0, y: -20,}, {opacity: 1, y: 0, ease: Power2.easeOut}, 'start')
  }else if(e.type == 'mouseleave'){    
    this.classList.remove('active');
    let tl = new TimelineMax();
    tl.to(document.querySelectorAll('.header__nav_link > a, .header__right a'), 0.6, {color: function(){
      console.log(document.body.classList.contains('catalog'))
      if(document.body.classList.contains('homepage') || document.body.classList.contains('leisure')){
        return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f':'#ffffff';
      }else if(document.body.classList.contains('catalog')){
        return '#5ac0b0';
      }
    }, ease: Power0.easeNone}, 'start')
      .to(document.querySelectorAll('.header__nav_link > a .icon, .header__right .icon'), 0.6, {fill: function(){
        if(document.body.classList.contains('homepage') || document.body.classList.contains('leisure') ){
          return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f':'#ffffff';  
        }else if(document.body.classList.contains('catalog')){
          return '#5ac0b0';
        }
        
      }, rotation: 0, ease: Power0.easeNone}, 'start')
      .to('.header__bg', 0.5, {opacity: 0, ease: Power0.easeNone}, 'start')
      .to('.header__logo .logo--white', 0.5, {opacity: 1}, 'start')
      .to('.header__logo .logo--black', 0.5, {opacity: 0}, 'start')
      .to(this.querySelector('.submenu'), 0.5, {autoAlpha: 0, ease: Power0.easeNone}, 'start')
      .to(this.querySelectorAll('.submenu .row'), 0.5, {opacity: 0, y: 20, ease: Power2.easeOut}, '-=0.5')
  }else if(e.type == 'scroll'){    
    let scrollTop = window.pageYOffset;
    if(scrollTop > (window.innerHeight / 2)){      
      document.querySelector('header').classList.add('fixed');
      TweenMax.set(document.querySelectorAll('.header__nav_link:not(.active) > a, .header__right a'), {clearProps: 'all'})
      TweenMax.set(document.querySelectorAll('.header__nav_link:not(.active) > a .icon, .header__right .icon'), {clearProps: 'all'})
      if(scrollTop > (window.innerHeight)){        
        let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > app.lastScrollTop){
          // downscroll code
          TweenMax.to('header', 0.7, {y: 0, ease: Power3.easeOut});          
        } else {
          TweenMax.to('header', 0.7, {y: 100, ease: Power3.easeOut});          
          // upscroll code
        }
        app.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      }else{
        TweenMax.to('header', 0.4, {y: 0, ease: Power1.easeOut, onComplete: function(){
          TweenMax.set('header', {clearProps: 'all'});
        }})
      }
    }else{
      document.querySelector('header').classList.remove('fixed');
    }
  }
  
}





/* ==============================================================
                          HOMEPAGE INIT
   ============================================================== */
const _homepage = function(page){
  let that = this;
  this.play = true;

  this.blobs = {
    heroBg: null,
    heroVideo: null
  }

  this.heroBgCover = function(){    
    let video = document.querySelector('.hero--bg');
    let ratio = video.videoWidth / video.videoHeight;    
    if(document.body.clientWidth / window.innerHeight > ratio){
      video.width = document.body.clientWidth;
      video.height = document.body.clientWidth / ratio;
      TweenMax.set(video, {width: document.body.clientWidth, height: document.body.clientWidth / ratio, top: -((document.body.clientWidth / ratio) - window.innerHeight) / 2, left: 0});      
    }else{
      TweenMax.set(video, {width: window.innerHeight*ratio, height: window.innerHeight, top: 0, left: -((window.innerHeight * ratio) - document.body.clientWidth) / 2});      
    }
  };

  // Start Hero video player render
  this.heroVideo = {
    video: document.querySelector('.homepage__hero .hero--player video'),
    controls: document.querySelector('.homepage__hero .hero--player .player--controls'),
    interval: null,
    active: false,
    loaded: false,
    play: function(){
      let that = this;
      that.video.play();
      this.interval = setInterval(function(){
        that.controls.querySelector('[data-time="current"]').innerText = that.time().current;
        that.bar();
      }, 1000);
    },
    pause: function(){
      this.video.pause();      
    },
    time: function(){
      return {
        current: (Math.round(this.video.currentTime / 60) < 10 ? '0'+Math.round(this.video.currentTime / 60) : Math.round(this.video.currentTime / 60)) + ':' + (Math.round(this.video.currentTime % 60) < 10 ? '0'+Math.round(this.video.currentTime % 60) : Math.round(this.video.currentTime % 60)),
        duration: (Math.round(this.video.duration / 60) < 10 ? '0'+Math.round(this.video.duration / 60) : Math.round(this.video.duration / 60)) + ':' + (Math.round(this.video.duration % 60) < 10 ? '0'+Math.round(this.video.duration % 60):Math.round(this.video.duration % 60)),
      }
    },
    bar: function(){      
      return 100/(this.video.duration/this.video.currentTime);
    },
    init: function(){
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
      this.video.addEventListener('click', function(e){
        if(this.paused){
          video.play();
          TweenMax.to('.cursor i.pause', 0.3, {scale: 1, ease: Power2.easeInOut});
          TweenMax.to('.cursor i.play', 0.3, {scale: 0, ease: Power2.easeInOut});
        }else{
          video.pause();
          TweenMax.to('.cursor i.pause', 0.3, {scale: 0, ease: Power2.easeInOut});
          TweenMax.to('.cursor i.play', 0.3, {scale: 1, ease: Power2.easeInOut});
        }    
      });
      this.video.addEventListener('loadedmetadata', function(e){        
        video.controls.querySelector('[data-time="all"]').innerText = video.time().duration;
      });
      this.video.addEventListener('timeupdate', function(e){        
        TweenMax.set('.player--controls .controls--bar i', {width: video.bar()+'%'});
      });
      document.querySelector('[data-action="homepage-hero-play"]').addEventListener('click', function(e){        
        video.video.play();
        app.homepage.heroVideo.active = true;        
        let tl = new TimelineMax();        
        let h1 = [].slice.call(document.querySelectorAll('.homepage__hero h1 span'), 0).reverse();          
        
        tl.to(app.homepage.hero.displacementFilter.scale, 0.2, {x: 0, y:0, onComplete: function(){
            TweenMax.to('.homepage__hero h1 span', 0.2, {opacity: 1, onComplete: function(){
              TweenMax.to(app.homepage.hero.container, 0.2, {alpha: 0})
            }})
          }}, 'cursor')
          .to('[data-action="homepage-hero-play"]', 0.3, {scale: 0, ease: Power2.easeIn}, 'cursor')
          .to('.cursor span', 0.6, {scale: 1.4}, 'cursor')
          .to('.cursor i.circle', 0.6, {scale: 0}, 'cursor')
          .to('.cursor i.pause', 0.6, {scale: 1}, 'cursor')
          .staggerTo(h1, 0.5, {rotationX: 90, opacity: 0, ease: Power2.easeIn}, 0.05, '-=0.3')
          .to('header', 0.5, {opacity: 0}, '-=0.3')
          .to('.homepage__hero_footer', 0.5, {opacity: 0}, '-=0.3')
          .add(function(){
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
          .set('body', {overflow: 'hidden'})
          .to('.hero--player', 0.5, {autoAlpha: 1})
          .fromTo('[data-action="homepage-close-video"]', 0.5, {scale: 1.4, opacity:0}, {scale: 1, opacity: 1})
      });      
      document.querySelector('[data-action="homepage-close-video"]').addEventListener('click', function(e){
        app.homepage.heroVideo.active = false;
        let tl = new TimelineMax();        
        let h1 = [].slice.call(document.querySelectorAll('.homepage__hero h1 span'), 0).reverse();
        video.video.pause();        
        tl.to('.cursor span', 0.6, {scale: 1}, 'cursor')
        .to('.cursor i.circle', 0.6, {scale: 1}, 'cursor')
        .to('.cursor i.pause', 0.6, {scale: 0}, 'cursor')
        .to('.cursor i.play', 0.6, {scale: 0}, 'cursor')
        .to('[data-action="homepage-close-video"]', 0.5, {scale: 0, ease: Power2.easeIn}, 'cursor')
        .to('.hero--player', 0.5, {autoAlpha: 0})
        .set('body', {overflow: 'auto'})
        .staggerFromTo(document.querySelectorAll('.homepage__hero h1 span'), 0.8, {rotationX: 90, opacity: 0}, {rotationX: 0, opacity: 1, ease: Power2.easeOut}, 0.1, '-=0.3')
        .to(app.homepage.hero.container, 0.3, {alpha: 1})
        .to('.homepage__hero h1 span', 0.3, {opacity: 0})        
        .to(app.homepage.hero.displacementFilter.scale, 0.5, {x: 30, y:30})
        .to('header', 0.5, {opacity: 1}, '-=1.4')
        .to('.homepage__hero_footer', 0.5, {opacity: 1}, '-=0.3')
        .to('[data-action="homepage-hero-play"]', 0.3, {scale: 1}, '-=0.3')
        .add(function(){
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
    init: function(){
      let that = this;      
      
      //TweenMax.to('#loader-logo .h', 3, {morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z'});
      TweenMax.set('#loader-logo .m', {x: -55, y: -31});
      TweenMax.set('#loader-logo .h', {x: -55, y: -30});
      
      TweenMax.to('#loader-logo .h', 20, {rotation: 360, transformOrigin:"88% 95%", ease: Power0.easeNone, repeat: -1});
      TweenMax.to('#loader-logo .m', 2, {rotation: 360, transformOrigin:"96% 50%", ease: Power0.easeNone, repeat: -1});

      this.colorsAnim = new TimelineMax({repeat: -1}).to('#loader-logo .h, #loader-logo .m', 0.5, {fill: '#f8d4e4', ease: Power0.easeNone})
      .to('#loader-logo .h, #loader-logo .m', 0.5, {fill: '#d8ebe7', ease: Power0.easeNone})
      .to('#loader-logo .h, #loader-logo .m', 0.5, {fill: '#5ebfaf', ease: Power0.easeNone})
      .to('#loader-logo .h, #loader-logo .m', 0.5, {fill: '#577081', ease: Power0.easeNone})
      .to('#loader-logo .h, #loader-logo .m', 0.5, {fill: '#eb4333', ease: Power0.easeNone})
      .to('#loader-logo .h, #loader-logo .m', 0.5, {fill: '#d7ebe6', ease: Power0.easeNone})
      .to('#loader-logo .h, #loader-logo .m', 0.5, {fill: '#bfbdce', ease: Power0.easeNone})
      .to('#loader-logo .h, #loader-logo .m', 0.5, {fill: '#9ccad5', ease: Power0.easeNone})
      .to('#loader-logo .h, #loader-logo .m', 0.5, {fill: '#5ebfaf', ease: Power0.easeNone})
      .to('#loader-logo .h, #loader-logo .m', 0.5, {fill: '#2f2f2f', ease: Power0.easeNone})
      
      

      TweenMax.to('#loader-logo', 1, {autoAlpha: 1})

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

      this.scripts.forEach(function(n){
        let src = './js/lib/'+app.resours[n];
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = function() {            
          that.resourcesDone++;
          that.loading();
        }
      });

      document.querySelectorAll('script[data-src]').forEach(function(el, i){
        
      });
      document.querySelectorAll('img').forEach(function(el, i){
        let src = el.getAttribute('data-src');
        var img = new Image();
        img.src = src;
        img.onload = function() {
          el.src = src;          
          that.resourcesDone++;
          that.loading();
        }
      });
      document.querySelectorAll('[data-displacement]').forEach(function(el, i){
        let src = el.getAttribute('data-displacement');
        var img = new Image();
        img.src = src;        
        img.onload = function() {            
          that.resourcesDone++;
          that.loading();
        }
      });
      document.querySelectorAll('[data-pat-left]').forEach(function(el, i){
        let src = el.getAttribute('data-pat-left');        
        var img = new Image();
        img.src = src;        
        img.onload = function() {            
          that.resourcesDone++;
          that.loading();
        }
      });
      document.querySelectorAll('[data-pat-right]').forEach(function(el, i){
        let src = el.getAttribute('data-pat-right');        
        var img = new Image();
        img.src = src;        
        img.onload = function() {            
          that.resourcesDone++;
          that.loading();
        }
      });
      document.querySelectorAll('[data-img-left]').forEach(function(el, i){
        let src = el.getAttribute('data-img-left');        
        var img = new Image();
        img.src = src;        
        img.onload = function() {
          that.resourcesDone++;
          that.loading();
        }
      });
      document.querySelectorAll('[data-img-right]').forEach(function(el, i){
        let src = el.getAttribute('data-img-right');        
        var img = new Image();
        img.src = src;        
        img.onload = function() {            
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
    loading: function(){
      let that = this;
      //let p = (100/(this.resources/this.resourcesDone)).toFixed();
      
      
      
      if(!that.loaderReady)return;      
      if(this.resources - this.resourcesDone == 1){
        app.globalEvents();        
        buttonsRender();
        app.homepage.tabs.init();
        app.homepage.cursor.init();
        app.homepage.hero = new heroRender();
        app.homepage.drag = new dragRender();
        app.homepage.eventsInit();
        this.mySwiper = new Swiper ('.swiper-container', {
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
        this.mySwiper.forEach(function(el, i){
          if(el.el.closest('.homepage__services')){
            TweenMax.set(el.el.querySelector('.swiper-slide-active .slide--photo'), {scale: 1.4});
          }
          el.on('slideChangeTransitionStart', function(){
            if(this.realIndex > this.previousIndex){
              let tl = new TimelineMax();
              tl//.to(this.el.querySelector('.swiper-slide-prev .slide--photo img'), 0.7, {opacity: 0}, 'start')
              .to(this.el.querySelector('.swiper-slide-prev .slide--photo img'), 1.4, {scale: 1.5}, 'start')
              .to(this.el.querySelector('.swiper-slide-prev'), 0.4, {skewX: -30, scale: 1.2, ease:Power1.easeIn, yoyo: true, repeat: 1}, 'start')
              //.fromTo(this.el.querySelector('.swiper-slide-active .slide--photo img'), 1.6, {opacity: 0}, {opacity: 1, scale: 1, ease:Power4.easeOut}, 'start')
              .fromTo(this.el.querySelector('.swiper-slide-active .slide--photo img'), 1.4, {scale: 1.5}, {scale: 1}, 'start')
              .fromTo(this.el.querySelector('.swiper-slide-active'), 0.4, {skewX: 0, scale: 1}, {skewX: -30, scale: 1.2, ease:Power1.easeIn, yoyo: true, repeat: 1}, 'start')
            }else{
              let tl = new TimelineMax();
              tl//.to(this.el.querySelector('.swiper-slide-next .slide--photo img'), 0.7, {opacity: 0}, 'start')
              .to(this.el.querySelector('.swiper-slide-next .slide--photo img'), 1.4, {scale: 1.5}, 'start')
              .to(this.el.querySelector('.swiper-slide-next'), 0.4, {skewX: 30, scale: 1.2, ease:Power1.easeIn, yoyo: true, repeat: 1}, 'start')
              //.fromTo(this.el.querySelector('.swiper-slide-active .slide--photo img'), 1.6, {opacity: 0}, {opacity: 1, scale: 1, ease:Power4.easeOut}, 'start')
              .fromTo(this.el.querySelector('.swiper-slide-active .slide--photo img'), 1.4, {scale: 1.5}, {scale: 1}, 'start')
              .fromTo(this.el.querySelector('.swiper-slide-active'), 0.4, {skewX: 0, scale: 1}, {skewX: 30, scale: 1.2, ease:Power1.easeIn, yoyo: true, repeat: 1}, 'start')
            }              
          });            
        });
        document.querySelector('.homepage__hero .hero--bg').src = document.querySelector('[data-background]').getAttribute('data-background');
        that.loaded();
        aosInit();
            
          
        
      }else{
        // TweenMax.to(this, 1, {progress: p, onUpdate: function(){
        //   document.querySelector('.loader .progress').innerHTML = that.progress.toFixed()+'%';
        // }});
      }
    },
    loaded: function(){
      let that = this;
      window.scroll(0, 0);      
      that.colorsAnim.remove();      
      let tl = new TimelineMax({delay: 0.5});
        tl.to('#loader-logo .h, #loader-logo .m', 0.8, {fill: '#2f2f2f', ease: Power3.easeInOut}, 'arrows')
        .to('#loader-logo .h', 0.8, {rotation: 360, transformOrigin:"88% 95%", ease: Power3.easeInOut}, 'arrows')
        .to('#loader-logo .m', 0.8, {rotation: 360, transformOrigin:"96% 50%", ease: Power3.easeInOut}, 'arrows')
        .to('#loader-logo .m', 0.8, {x: 0, y: 0, opacity: 0, ease: Power3.easeInOut}, 'morph')
        .to('#loader-logo .h', 0.8, {x: 0, y: 0, ease: Power3.easeInOut}, 'morph')
        .to('#loader-logo .h', 0.8, {morphSVG: 'M113.5,133.7l-14.3-47h15.7c0,0,10-1.3,19.6,10.4s45.7,56.1,45.7,56.1l-120-2.6l110.9-1.3l-43-52.2c0,0-5.7-6.5-13-6.5s-11.7,0-11.7,0L113.5,133.7z', ease: Power3.easeInOut}, 'morph')
        .fromTo('.loader-logo .brand', 0.8, {opacity: 0, scale: 1.4}, {opacity: 1, scale: 1, ease: Power3.easeInOut}, '-=0.6')
        
        .to('#loader-logo', 0.5, {opacity: 0})
        .to('.loader-logo .brand', 0.5, {opacity: 0}, '-=0.3')
        .add(function(){
          app.homepage.heroBgCover();
        })
        .to(['.loader .blind-left', '.loader .blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn, onComplete: function(){
          document.querySelector('.loader').remove();
          TweenMax.set('body', {overflow: 'auto'});
          
          let fs = (window.innerWidth / 100) * 9.9;
          app.homepage.hero.smart.style.fontSize = fs;
          app.homepage.hero.choise.style.fontSize = fs;
          app.homepage.hero.save.style.fontSize = fs;
          app.homepage.hero.time.style.fontSize = fs; 
          //that.hero.heroBgCover();
          app.homepage.hero.hero.renderer.resize(app.homepage.hero.el.clientWidth, app.homepage.hero.el.clientHeight);
          app.homepage.hero.smart.x = ((app.homepage.hero.el.clientWidth / 100) * 42);
          app.homepage.hero.smart.y = 140 - ((Math.floor(fs)/100) * 7.563724377883669);      
          app.homepage.hero.choise.x = ((app.homepage.hero.el.clientWidth / 100) * 42) + ((app.homepage.hero.el.clientWidth / 100) * 6);
          app.homepage.hero.choise.y = (140 - ((fs/100) * 7.563724377883669)) + Math.floor(fs);
          app.homepage.hero.save.x = ((app.homepage.hero.el.clientWidth / 100) * 42) + ((app.homepage.hero.el.clientWidth / 100) * 12.1);
          app.homepage.hero.save.y = (140 - ((Math.floor(fs)/100) * 7.563724377883669)) + (Math.floor(fs) * 2);
          app.homepage.hero.time.x = ((app.homepage.hero.el.clientWidth / 100) * 42) + ((app.homepage.hero.el.clientWidth / 100) * 18.2);
          app.homepage.hero.time.y = (140 - ((Math.floor(fs)/100) * 7.563724377883669)) + (Math.floor(fs) * 3);

          app.homepage.hero.smart2.x = ((app.homepage.hero.el.clientWidth / 100) * 42);
          app.homepage.hero.smart2.y = 140 - ((Math.floor(fs)/100) * 7.563724377883669);      
          app.homepage.hero.choise2.x = ((app.homepage.hero.el.clientWidth / 100) * 42) + ((app.homepage.hero.el.clientWidth / 100) * 6);
          app.homepage.hero.choise2.y = (140 - ((fs/100) * 7.563724377883669)) + Math.floor(fs);
          app.homepage.hero.save2.x = ((app.homepage.hero.el.clientWidth / 100) * 42) + ((app.homepage.hero.el.clientWidth / 100) * 12.1);
          app.homepage.hero.save2.y = (140 - ((Math.floor(fs)/100) * 7.563724377883669)) + (Math.floor(fs) * 2);
          app.homepage.hero.time2.x = ((app.homepage.hero.el.clientWidth / 100) * 42) + ((app.homepage.hero.el.clientWidth / 100) * 18.2);
          app.homepage.hero.time2.y = (140 - ((Math.floor(fs)/100) * 7.563724377883669)) + (Math.floor(fs) * 3);

          // app.homepage.hero.displacementSprite.width = app.homepage.hero.hero.renderer.width / 3;
          // app.homepage.hero.displacementSprite.height = app.homepage.hero.hero.renderer.width / 3;
          // app.homepage.hero.displacementSprite.x = app.homepage.hero.hero.renderer.width / 2;
          // app.homepage.hero.displacementSprite.y = app.homepage.hero.hero.renderer.height / 2;

          
          
          TweenMax.set('.homepage__description_bg .m', {x: -55, y: -31});
          TweenMax.set('.homepage__description_bg .h', {x: -55, y: -30});
          
          TweenMax.to('.homepage__description_bg .h', 20, {rotation: 360, transformOrigin:"88% 95%", ease: Power0.easeNone, repeat: -1});
          TweenMax.to('.homepage__description_bg .m', 2, {rotation: 360, transformOrigin:"96% 50%", ease: Power0.easeNone, repeat: -1});

          new TimelineMax({repeat: -1}).to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, {fill: '#f8d4e4', ease: Power0.easeNone})
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, {fill: '#d8ebe7', ease: Power0.easeNone})
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, {fill: '#5ebfaf', ease: Power0.easeNone})
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, {fill: '#577081', ease: Power0.easeNone})
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, {fill: '#eb4333', ease: Power0.easeNone})
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, {fill: '#d7ebe6', ease: Power0.easeNone})
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, {fill: '#bfbdce', ease: Power0.easeNone})
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, {fill: '#9ccad5', ease: Power0.easeNone})
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, {fill: '#5ebfaf', ease: Power0.easeNone})
          .to('.homepage__description_bg .h, .homepage__description_bg .m', 0.5, {fill: '#2f2f2f', ease: Power0.easeNone})
        }})
        .staggerFrom(document.querySelectorAll('.homepage__hero h1 span'), 1, {rotationX: 90, opacity: 0, ease: Power2.easeOut}, 0.1, '+=0.3', swichText)
        .from('header', 0.8, {opacity: 0}, '-=0.5')
        .from('.homepage__hero_footer', 0.8, {opacity: 0}, '-=0.4')
        .from('[data-action="homepage-hero-play"]', 0.5, {scale: 1.4, opacity: 0}, '-=0.4')
        .add(function(){
          app.homepage.heroVideo.init();
          TweenMax.set(document.querySelectorAll('.homepage__insta h2 span, .expert__form_title h2 span'), {opacity: 0});
        });
        function swichText(){
          //TweenMax.set(document.querySelectorAll('.homepage__hero h1 span'), {opacity: 0});
          new TimelineMax()
          .to([app.homepage.hero.container, app.homepage.hero.container2], 0.2, {alpha: 1})
          .to(document.querySelectorAll('.homepage__hero h1 span'), 0.2, {opacity: 0})
          .to(app.homepage.hero.blur, 1, {blur: 16})
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
  function heroRender(){
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
    loader.load(function(loader, resources){

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
      that.smart.y = 140 - ((Math.floor(fs)/100) * 7.563724377883669);      
      that.choise.x = ((window.innerWidth / 100) * 42) + ((window.innerWidth / 100) * 6);
      that.choise.y = (140 - ((fs/100) * 7.563724377883669)) + Math.floor(fs);
      that.save.x = ((window.innerWidth / 100) * 42) + ((window.innerWidth / 100) * 12);
      that.save.y = (140 - ((Math.floor(fs)/100) * 7.563724377883669)) + (Math.floor(fs) * 2);
      that.time.x = ((window.innerWidth / 100) * 42) + ((window.innerWidth / 100) * 18);
      that.time.y = (140 - ((Math.floor(fs)/100) * 7.563724377883669)) + (Math.floor(fs) * 3);      

      that.smart2.x = ((window.innerWidth / 100) * 42);      
      that.smart2.y = 140 - ((Math.floor(fs)/100) * 7.563724377883669);      
      that.choise2.x = ((window.innerWidth / 100) * 42) + ((window.innerWidth / 100) * 6);
      that.choise2.y = (140 - ((fs/100) * 7.563724377883669)) + Math.floor(fs);
      that.save2.x = ((window.innerWidth / 100) * 42) + ((window.innerWidth / 100) * 12);
      that.save2.y = (140 - ((Math.floor(fs)/100) * 7.563724377883669)) + (Math.floor(fs) * 2);
      that.time2.x = ((window.innerWidth / 100) * 42) + ((window.innerWidth / 100) * 18);
      that.time2.y = (140 - ((Math.floor(fs)/100) * 7.563724377883669)) + (Math.floor(fs) * 3);

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
    //that.container.addChild(focus);
    that.container.mask = focus;
    that.container2.mask = unFocus;

    


      //const blurFilter = new PIXI.filters.BlurFilter();
      //littleDudes.filters = [blurFilter1];

      

      // that.displacementSprite = new PIXI.Sprite(resources.displacementSprite.texture);
      // that.displacementSprite.width = document.body.clientWidth / 3;
      // that.displacementSprite.height = document.body.clientWidth / 3;
      // that.displacementSprite.anchor.set(0.5);
      // that.displacementFilter = new PIXI.filters.DisplacementFilter(that.displacementSprite);
      // that.displacementFilter.scale.x = 0;
      // that.displacementFilter.scale.y = 0;
      // that.hero.stage.addChild(that.displacementSprite);  
      // that.container.filters = [that.displacementFilter];
      //that.container2.mask = that.displacementSprite;
      function onPointerMove(e) {      
        TweenMax.to(focus, 1, {x:e.clientX - 200, y: e.clientY - 200});
        TweenMax.to(unFocus, 1, {x:e.clientX - 1925, y: e.clientY - 1925});

        // 3d hover
        // let rootX = -((e.currentTarget.clientWidth / 2) - e.clientX);
        // let moveX = 100 / ((e.currentTarget.clientWidth / 2) / rootX);
        // let degX = (20/100)*moveX;
        // let rootY = ((e.currentTarget.clientHeight / 2) - e.clientY);
        // let moveY = 100 / ((e.currentTarget.clientHeight / 2) / rootY);
        // let degY = (20/100)*moveY;
        // TweenMax.set(e.currentTarget.querySelector('canvas'), {rotationY: degX, rotationX: degY})
        
        //console.log(deg);
      }  
      that.el.addEventListener('mousemove', onPointerMove);
      // TweenMax.to(that.displacementSprite, 12, {rotation: 6.28319, ease: Power0.easeNone, repeat: -1, onUpdate: function(){        
      
      // }});      
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
  function dragRender(){
    let that = this;    
    let ratio;

    this.show = false;
    this.el = document.querySelector('.homepage__drag');

    this.el.querySelectorAll('h2 a').forEach(function(el, i){
      el.addEventListener('click', function(e){        
        e.preventDefault();
        let href = e.target.href;
        let target = e.target.getAttribute('data-target');        
        TweenMax.to('[data-action="homepage-drag"]', 0.6, {scale: 0, ease: Power2.easeInOut});
        if(target == 'leisure'){
          TweenMax.to(document.querySelector('canvas.leisure'), 1.2, {x:- that.el.clientWidth, ease: Power2.easeInOut, onComplete: function(){
            window.location.href = href;
          }});
          TweenMax.set(document.querySelector('canvas.business'), {x:0});
        }else if(target == 'business'){
          TweenMax.set(document.querySelector('canvas.leisure'), {x:0});
          TweenMax.to(document.querySelector('canvas.business'), 1.2, {x: that.el.clientWidth, ease: Power2.easeInOut, onComplete: function(){
            window.location.href = href;
          }});
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
    this.pat1.onload = function(){
      ratio = this.width/this.height;
      that.canv1.width = that.el.clientWidth;
      that.canv1.height = that.el.clientWidth/ratio;
      that.ctx1.save();
      that.ctx1.beginPath();
      that.ctx1.moveTo(0, 0);
      that.ctx1.lineTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2)/2.92), 0);
      that.ctx1.lineTo(((that.el.clientWidth / 2) - (that.el.clientWidth / 2)/2.92), that.el.clientHeight);
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
    this.pat2.onload = function(){      
      that.ctx1.save();
      that.ctx1.beginPath();
      that.ctx1.moveTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2)/2.92), 0);
      that.ctx1.lineTo(that.el.clientWidth, 0);
      that.ctx1.lineTo(that.el.clientWidth, that.el.clientHeight);
      that.ctx1.lineTo(((that.el.clientWidth / 2) - (that.el.clientWidth / 2)/2.92), that.el.clientHeight);      
      that.ctx1.lineTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2)/2.92), 0);    
      that.ctx1.closePath();
      // Clip to the current path
      that.ctx1.clip();
      that.ctx1.drawImage(that.pat2, 0, 0, that.el.clientWidth, that.el.clientHeight);
      that.ctx1.restore();
    }

    this.img1 = new Image();
    this.img1.src = this.el.getAttribute('data-img-left');
    this.img1.onload = function(){
      ratio = this.width/this.height;
      that.canv2.width = that.el.clientWidth;
      that.canv2.height = that.el.clientWidth/ratio;
      that.ctx2.save();
      that.ctx2.beginPath();
      that.ctx2.moveTo(0, 0);
      that.ctx2.lineTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2)/2.92), 0);
      that.ctx2.lineTo(((that.el.clientWidth / 2) - (that.el.clientWidth / 2)/2.92), that.el.clientHeight);
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
    this.img2.onload = function(){
      ratio = this.width/this.height;
      that.canv3.width = that.el.clientWidth;
      that.canv3.height = that.el.clientWidth/ratio;
      that.ctx3.save();
      that.ctx3.beginPath();
      that.ctx3.moveTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2)/2.92), 0);
      that.ctx3.lineTo(that.el.clientWidth, 0);
      that.ctx3.lineTo(that.el.clientWidth, that.el.clientHeight);
      that.ctx3.lineTo(((that.el.clientWidth / 2) - (that.el.clientWidth / 2)/2.92), that.el.clientHeight);      
      that.ctx3.lineTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2)/2.92), 0);      
      that.ctx3.closePath();
      // Clip to the current path
      that.ctx3.clip();
      that.ctx3.drawImage(that.img2, 0, 0, that.el.clientWidth, that.el.clientHeight);
      that.ctx3.restore();
    }


    


    this.dragMove = false;
    this.dragx = 0;
    this.dragDone = false;

    this.dragControl = function(e){
      if(that.dragMove){
        let limit = (that.el.clientWidth / 2) / 3;        
        let x = e.clientX - that.dragx;
        if(x < 0 && x > -limit){
          TweenMax.to(document.querySelector('canvas.leisure'), 0, {x:x});
          TweenMax.to(document.querySelector('canvas.business'), 0, {x:0});
          TweenMax.to('[data-action="homepage-drag"]', 0, {x:x});
        }else if(x > 0 && x < limit){
          TweenMax.to(document.querySelector('canvas.leisure'), 0, {x:0});
          TweenMax.to(document.querySelector('canvas.business'), 0, {x:x});
          TweenMax.to('[data-action="homepage-drag"]', 0, {x:x});
        }else if(x < -limit || x > limit){
          that.dragMove = false;
          that.dragDone = true;
          let href;
          TweenMax.to('[data-action="homepage-drag"], .homepage__drag_dots', 0.6, {scale: 0, ease: Power2.easeInOut});
          if(x < -limit){
            href = document.querySelector('.homepage__drag h2 a[data-target="leisure"]').href;
            TweenMax.to(document.querySelector('canvas.leisure'), 1.2, {x:- that.el.clientWidth, ease: Power2.easeInOut, onComplete: function(){
              window.location.href = href;
            }});
            TweenMax.set(document.querySelector('canvas.business'), {x:0});
          }else if(x > limit){
            href = document.querySelector('.homepage__drag h2 a[data-target="business"]').href;
            TweenMax.set(document.querySelector('canvas.leisure'), {x:0});
            TweenMax.to(document.querySelector('canvas.business'), 1.2, {x: that.el.clientWidth, ease: Power2.easeInOut, onComplete: function(){
              window.location.href = href;
            }});
          }
        }
      }
    }    
  }  
  
  
  
  // End Drag Slider

  this.resizeHomepage = function(e){
    app.homepage.heroBgCover();
    let fs = (window.innerWidth / 100) * 9.9;
    that.hero.smart.style.fontSize = fs;
    that.hero.choise.style.fontSize = fs;
    that.hero.save.style.fontSize = fs;
    that.hero.time.style.fontSize = fs; 
    //that.hero.heroBgCover();
    that.hero.hero.renderer.resize(that.hero.el.clientWidth, that.hero.el.clientHeight);
    that.hero.smart.x = ((that.hero.el.clientWidth / 100) * 42);
    that.hero.smart.y = 140 - ((Math.floor(fs)/100) * 7.563724377883669);      
    that.hero.choise.x = ((that.hero.el.clientWidth / 100) * 42) + ((that.hero.el.clientWidth / 100) * 6);
    that.hero.choise.y = (140 - ((fs/100) * 7.563724377883669)) + Math.floor(fs);
    that.hero.save.x = ((that.hero.el.clientWidth / 100) * 42) + ((that.hero.el.clientWidth / 100) * 12.1);
    that.hero.save.y = (140 - ((Math.floor(fs)/100) * 7.563724377883669)) + (Math.floor(fs) * 2);
    that.hero.time.x = ((that.hero.el.clientWidth / 100) * 42) + ((that.hero.el.clientWidth / 100) * 18.2);
    that.hero.time.y = (140 - ((Math.floor(fs)/100) * 7.563724377883669)) + (Math.floor(fs) * 3);
    // that.hero.bg.width = that.hero.heroBgWidth;
    // that.hero.bg.height = that.hero.heroBgHeight;
    // that.hero.bg.x  = that.hero.heroBgLeft;
    // that.hero.bg.y  = that.hero.heroBgTop;
    // that.hero.displacementSprite.width = app.homepage.hero.hero.renderer.width / 3;
    // that.hero.displacementSprite.height = app.homepage.hero.hero.renderer.width / 3;
    
    let ratio = that.drag.pat1.width/that.drag.pat1.height;
    that.drag.canv1.width = that.drag.el.clientWidth;
    that.drag.canv1.height = that.drag.el.clientWidth/ratio;
    that.drag.canv2.width = that.drag.el.clientWidth;
    that.drag.canv2.height = that.drag.el.clientWidth/ratio;
    that.drag.canv3.width = that.drag.el.clientWidth;
    that.drag.canv3.height = that.drag.el.clientWidth/ratio;

    that.drag.ctx1.save();
    that.drag.ctx1.beginPath();
    that.drag.ctx1.moveTo(0, 0);
    that.drag.ctx1.lineTo(((that.drag.el.clientWidth / 2) + (that.drag.el.clientWidth / 2)/2.92), 0);
    that.drag.ctx1.lineTo(((that.drag.el.clientWidth / 2) - (that.drag.el.clientWidth / 2)/2.92), that.drag.el.clientHeight);
    that.drag.ctx1.lineTo(0, that.drag.el.clientHeight);      
    that.drag.ctx1.lineTo(0, 0);      
    that.drag.ctx1.closePath();
    // Clip to the current path
    that.drag.ctx1.clip();
    that.drag.ctx1.drawImage(that.drag.pat1, 0, 0, that.drag.el.clientWidth, that.drag.el.clientHeight);
    that.drag.ctx1.restore();

    that.drag.ctx1.save();
    that.drag.ctx1.beginPath();
    that.drag.ctx1.moveTo(((that.drag.el.clientWidth / 2) + (that.drag.el.clientWidth / 2)/2.92), 0);
    that.drag.ctx1.lineTo(that.drag.el.clientWidth, 0);
    that.drag.ctx1.lineTo(that.drag.el.clientWidth, that.drag.el.clientHeight);
    that.drag.ctx1.lineTo(((that.drag.el.clientWidth / 2) - (that.drag.el.clientWidth / 2)/2.92), that.drag.el.clientHeight);      
    that.drag.ctx1.lineTo(((that.drag.el.clientWidth / 2) + (that.drag.el.clientWidth / 2)/2.92), 0);    
    that.drag.ctx1.closePath();
    // Clip to the current path
    that.drag.ctx1.clip();
    that.drag.ctx1.drawImage(that.drag.pat2, 0, 0, that.drag.el.clientWidth, that.drag.el.clientHeight);
    that.drag.ctx1.restore();

    that.drag.ctx2.save();
    that.drag.ctx2.beginPath();
    that.drag.ctx2.moveTo(0, 0);
    that.drag.ctx2.lineTo(((that.drag.el.clientWidth / 2) + (that.drag.el.clientWidth / 2)/2.92), 0);
    that.drag.ctx2.lineTo(((that.drag.el.clientWidth / 2) - (that.drag.el.clientWidth / 2)/2.92), that.drag.el.clientHeight);
    that.drag.ctx2.lineTo(0, that.drag.el.clientHeight);      
    that.drag.ctx2.lineTo(0, 0);
    that.drag.ctx2.closePath();
    // Clip to the current path
    that.drag.ctx2.clip();
    that.drag.ctx2.drawImage(that.drag.img1, 0, 0, that.drag.el.clientWidth, that.drag.el.clientHeight);
    that.drag.ctx2.restore();

    that.drag.ctx3.save();
    that.drag.ctx3.beginPath();
    that.drag.ctx3.moveTo(((that.drag.el.clientWidth / 2) + (that.drag.el.clientWidth / 2)/2.92), 0);
    that.drag.ctx3.lineTo(that.drag.el.clientWidth, 0);
    that.drag.ctx3.lineTo(that.drag.el.clientWidth, that.drag.el.clientHeight);
    that.drag.ctx3.lineTo(((that.drag.el.clientWidth / 2) - (that.drag.el.clientWidth / 2)/2.92), that.drag.el.clientHeight);      
    that.drag.ctx3.lineTo(((that.drag.el.clientWidth / 2) + (that.drag.el.clientWidth / 2)/2.92), 0);      
    that.drag.ctx3.closePath();
    // Clip to the current path
    that.drag.ctx3.clip();
    that.drag.ctx3.drawImage(that.drag.img2, 0, 0, that.drag.el.clientWidth, that.drag.el.clientHeight);
    that.drag.ctx3.restore();
    
  }



  this.eventsInit = function(){
    window.addEventListener('scroll', function(e){      
      let scrollTop = window.pageYOffset;
      header(e);
      if(scrollTop > (window.innerHeight)){
        if(that.play){
          app.homepage.hero.hero.ticker.stop();
          //app.homepage.hero.resours.source.pause();
          that.play = false;          
        }
      }else{
        if(!that.play){
          app.homepage.hero.hero.ticker.start();
          //app.homepage.hero.resours.source.play();
          that.play = true;          
        }        
      }
    });        
    
    document.querySelector('[data-action="homepage-drag"]').addEventListener('mousedown', function (e) {
      if(app.homepage.drag.show){
        that.drag.dragMove = true;
        that.drag.dragx = e.clientX;    
        TweenMax.to(this.querySelector('i'), 0.5, {scale: 1, ease: Power3.easeOut});
        TweenMax.to('.cursor span', 0.5, {scale: 0, ease: Power3.easeOut})
        TweenMax.to(document.querySelector('.homepage__drag_dots'), 0.8, {scaleX: 1, ease: Power4.easeOut});
        TweenMax.to('.cursor i.circle', 0.6, {backgroundColor: '#ee412a'});
      }      
    });
    document.querySelector('[data-action="homepage-drag"]').addEventListener('mouseup', function(e){
      if(!that.drag.dragDone){
        that.drag.dragMove = false;
        that.drag.dragx = 0;
        TweenMax.to('[data-action="homepage-drag"]', 0.5, {x:0, ease: Power2.easeOut});
        TweenMax.to([document.querySelector('canvas.leisure'), document.querySelector('canvas.business')], 0.5, {x:0, ease: Power2.easeOut});
      }
    });
    document.querySelector('.homepage__drag').addEventListener('mousemove', that.drag.dragControl);
    document.querySelector('[data-action="homepage-hero-play"]').addEventListener('mouseenter', function(e){
      TweenMax.to(this.querySelector('i'), 0.5, {scale: 1, ease: Power3.easeOut});
      TweenMax.to(this.querySelector('.icon'), 0.5, {fill: '#fff', ease: Power3.easeOut});
      TweenMax.to('.cursor span', 0.5, {scale: 0, ease: Power3.easeOut});
    });
    document.querySelector('[data-action="homepage-hero-play"]').addEventListener('mouseleave', function(e){
      TweenMax.to(this.querySelector('i'), 0.5, {scale: 0, ease: Power3.easeIn});
      TweenMax.to(this.querySelector('.icon'), 0.5, {fill: '#ee412a', ease: Power3.easeIn});
      if(!app.homepage.heroVideo.active)TweenMax.to('.cursor span', 0.5, {scale: 1, ease: Power3.easeIn});
    });

    document.querySelector('[data-action="homepage-close-video"]').addEventListener('mouseenter', function(e){
      TweenMax.to(this.querySelector('i'), 0.5, {scale: 1, ease: Power3.easeOut});
      TweenMax.to(this.querySelector('.icon'), 0.5, {fill: '#fff', ease: Power3.easeOut});
      TweenMax.to('.cursor span', 0.5, {scale: 0, ease: Power3.easeOut});
      TweenMax.to('.cursor i.circle', 0.5, {scale: 1})
      TweenMax.to('.cursor i.pause', 0.5, {scale: 0})
      TweenMax.to('.cursor i.play', 0.5, {scale: 0})
    });
    document.querySelector('[data-action="homepage-close-video"]').addEventListener('mouseleave', function(e){      
      TweenMax.to(this.querySelector('i'), 0.5, {scale: 0, ease: Power3.easeIn});
      TweenMax.to(this.querySelector('.icon'), 0.5, {fill: '#ee412a', ease: Power3.easeIn});
      if(app.homepage.heroVideo.active){
        TweenMax.to('.cursor span', 0.5, {scale: 1.4, ease: Power3.easeIn});
        TweenMax.to('.cursor i.circle', 0.5, {scale: 0, ease: Power3.easeIn})
        if(app.homepage.heroVideo.video.paused){         
          TweenMax.to('.cursor i.play', 0.5, {scale: 1, ease: Power3.easeIn})
        }else{
          TweenMax.to('.cursor i.pause', 0.5, {scale: 1, ease: Power3.easeIn})
        }
      }
    });

    document.querySelector('[data-action="homepage-drag"]').addEventListener('mouseenter', function(e){
      if(app.homepage.drag.show){
        TweenMax.to(this.querySelector('i'), 0.5, {scale: 1, ease: Power3.easeOut});
        TweenMax.to(document.querySelector('.homepage__drag_dots'), 0.8, {scaleX: 1, ease: Power4.easeOut});
        TweenMax.to('.cursor i.circle', 0.6, {backgroundColor: '#ee412a'});
        TweenMax.to('.cursor span', 0.5, {scale: 0, ease: Power3.easeOut})
      }      
    });
    document.querySelector('[data-action="homepage-drag"]').addEventListener('mouseleave', function(e){
      if(!that.drag.dragDone){
        that.drag.dragMove = false;
        that.drag.dragx = 0;
        TweenMax.to('[data-action="homepage-drag"]', 0.5, {x:0, ease: Power2.easeOut});
        TweenMax.to([document.querySelector('canvas.leisure'), document.querySelector('canvas.business')], 0.5, {x:0, ease: Power2.easeOut});        
      }
      TweenMax.to(this.querySelector('i'), 0.6, {scale: 0, ease: Power4.easeIn});
      TweenMax.to(document.querySelector('.homepage__drag_dots'), 0.4, {scaleX: 0, ease: Power3.easeIn});
      TweenMax.to('.cursor span', 0.6, {scale: 1, ease: Power4.easeIn})
      TweenMax.to('.cursor i.circle', 0.6, {backgroundColor: '#fff'});
    });    
    window.addEventListener('resize', this.resizeHomepage);
    
    document.querySelector('[data-action="learn-more"]').addEventListener('mouseenter', function(e){      
      TweenMax.to(this.querySelector('i'), 0.5, {scale: 1, ease: Power3.easeOut});
      TweenMax.to('.cursor span', 0.5, {scale: 0, ease: Power3.easeOut});
      TweenMax.to('.cursor i.circle', 0.6, {backgroundColor: '#fff'});
    });
    document.querySelector('[data-action="learn-more"]').addEventListener('mouseleave', function(e){
      TweenMax.to(this.querySelector('i'), 0.5, {scale: 0, ease: Power3.easeIn});
      TweenMax.to('.cursor span', 0.5, {scale: 1, ease: Power3.easeIn});
      TweenMax.to('.cursor i.circle', 0.6, {backgroundColor: '#ee412a'});
    });
    document.querySelectorAll('.slider-button-prev, .slider-button-next').forEach(function(el, i){      
      el.addEventListener('mouseenter', function(e){        
        if(this.classList.contains('swiper-button-disabled'))return;        
        TweenMax.to(this.querySelector('i'), 0.5, {scale: 1, ease: Power3.easeOut});
        TweenMax.to('.cursor span', 0.5, {scale: 0, ease: Power3.easeOut});
        if(this.closest('.homepage__services'))return;
        TweenMax.to(this.querySelector('.icon'), 0.5, {fill: '#fff', ease: Power3.easeOut});        
      });
      el.addEventListener('mouseleave', function(e){        
        TweenMax.to(this.querySelector('i'), 0.5, {scale: 0, ease: Power3.easeIn});
        TweenMax.to('.cursor span', 0.5, {scale: 1, ease: Power3.easeIn});
        if(this.closest('.homepage__services'))return;
        TweenMax.to(this.querySelector('.icon'), 0.5, {fill: '#ee412a', ease: Power3.easeIn});
      });
    });
    
  }

  // Start Buttons render
  function buttonsRender(){
    document.querySelectorAll('.button-circle').forEach(function(el, i){
      var text = el.getAttribute('data-text').replace(' ', '&nbsp;');
      var textBlock = document.createElement('div');
      var top = document.createElement('div');
      var bot = document.createElement('div');
      textBlock.className = 'text';
      top.className = 'top';
      bot.className = 'bot';
      top.innerHTML = text;
      bot.innerHTML = text;    
      var splitTop = new SplitText(top, {type:"chars"});
      var splitBot = new SplitText(bot, {type:"chars"});    
      textBlock.appendChild(top);
      textBlock.appendChild(bot);
      el.appendChild(textBlock);      
      var deg = 120 / splitTop.chars.length, origin = 0, radius = 75;
      for(var i in splitTop.chars){
        splitTop.chars[i].style.height = radius+'px';        
        splitTop.chars[i].style.transform = 'rotate('+(origin)+'deg)';
        origin += deg;
      }   
      origin = 180;    
      for(var i in splitBot.chars){
        splitBot.chars[i].style.height = radius+'px';        
        splitBot.chars[i].style.transform = 'rotate('+(origin)+'deg)';
        origin += deg;
      }
      if(el.getAttribute('data-hover')){
        var hoverText = el.getAttribute('data-hover').replace(' ', '&nbsp;');
        var textBlock = document.createElement('div');
        var top = document.createElement('div');
        var bot = document.createElement('div');
        textBlock.className = 'hover';
        top.className = 'top';
        bot.className = 'bot';
        top.innerHTML = hoverText;
        bot.innerHTML = hoverText;    
        var splitTop = new SplitText(top, {type:"chars"});
        var splitBot = new SplitText(bot, {type:"chars"});    
        textBlock.appendChild(top);
        textBlock.appendChild(bot);
        el.appendChild(textBlock);      
        var deg = 100 / splitTop.chars.length, origin = 0, radius = 75;
        for(var i in splitTop.chars){
          splitTop.chars[i].style.height = radius+'px';          
          splitTop.chars[i].style.transform = 'rotate('+(origin)+'deg)';
          origin += deg;
        }   
        origin = 180;    
        for(var i in splitBot.chars){
          splitBot.chars[i].style.height = radius+'px';          
          splitBot.chars[i].style.transform = 'rotate('+(origin)+'deg)';
          origin += deg;
        }
      }
      el.appendChild(document.createElement('i'));
    });
  } 
  // End Buttons render

  this.cursor = {
    init: function(){
      TweenMax.set('.cursor', {x:(document.body.clientWidth / 2)-35, y: (window.innerHeight / 2)-35});

      document.body.addEventListener('mousemove', function(e){
        TweenMax.set('.cursor', {x : (e.clientX - 35), y : (e.clientY - 35)});
      });
      document.querySelector('.homepage__hero').addEventListener('mouseenter', function(e){        
        TweenMax.to('.cursor', 0.5, {borderColor: '#ee412a'});
        TweenMax.to('.cursor i.circle', 0.5, {backgroundColor: '#fff'});
      });
      document.querySelector('.homepage__description').addEventListener('mouseenter', function(e){        
        TweenMax.to('.cursor', 0.5, {borderColor: '#ee412a'});
        TweenMax.to('.cursor i.circle', 0.5, {backgroundColor: '#ee412a'});
      });
      document.querySelector('.homepage__drag').addEventListener('mouseenter', function(e){        
        TweenMax.to('.cursor', 0.5, {borderColor: '#ee412a'});
        TweenMax.to('.cursor i.circle', 0.5, {backgroundColor: '#fff'});
      });
      document.querySelector('.homepage__feedback').addEventListener('mouseenter', function(e){        
        TweenMax.to('.cursor', 0.5, {borderColor: '#ee412a'});
        TweenMax.to('.cursor i.circle', 0.5, {backgroundColor: '#ee412a'});
      });
      
    }
  }


  // Start Tabs render

  this.tabs = {
    active: false,
    diskTextAnim: null,
    show: false,
    init: function(){
      let that = this;
      this.render();
      document.querySelectorAll('.homepage__tabs_list span').forEach(function(el, i){        
        el.addEventListener('click', function(e){
          if(that.show)that.onActive(e);
        });
        el.addEventListener('mouseenter', function(e){
          if(that.show)that.onHover(e);
        });
        el.addEventListener('mouseleave', function(e){
          if(that.show)that.onHover(e);
        });
      });
      document.querySelectorAll('.homepage__tabs_content h3 i').forEach(function(el, i){
        el.addEventListener('click', function(e){
          that.onClose(e);
        });
      });
      
    },
    onHover: function(e){
      if(!this.active){
        if(e.type == 'mouseenter'){
          e.target.classList.add('active');
          TweenMax.to(document.querySelectorAll('.homepage__tabs_list span:not(.active)'), 1, {opacity: 0.1, color: '#2f2f2f', ease: Power2.easeOut});
        }else{
          TweenMax.to(document.querySelectorAll('.homepage__tabs_list span'), 0.8, {opacity: 1, color: '#ee412a', ease: Power2.easeOut});
          e.target.classList.remove('active');
        }
      }
    },
    onActive: function(e){
      this.active = true;
      e.target.classList.add('active');
      let that = this;
      let target = e.target.getAttribute('data-target');
      TweenMax.to('.homepage__tabs_disk .disk--arrow-1', 1.5, {rotation: 360, ease:Power3.easeInOut});
      TweenMax.to('.homepage__tabs_disk .disk--arrow-2', 1.5, {rotation: 360, ease:Power3.easeInOut});      
      TweenMax.to('.homepage__tabs_disk .disk--text', 1.5, {color: '#d7ebe6', onComplete: function(){
        that.diskTextAnim.pause();
        TweenMax.set('.homepage__tabs_disk .disk--arrow-1, .homepage__tabs_disk .disk--arrow-2', {clearProps: 'all'});
      }});
      let tl = new TimelineMax();      
      tl.staggerTo(document.querySelectorAll('.homepage__tabs_list span:not(.active)'), 0.8, {opacity: 0, ease: Power2.easeOut}, 0.1)
      .to(document.querySelector('.homepage__tabs_list span.active'), 0.7, {opacity: 0, ease: Power2.easeOut}, '-=0.8')
      .set('.homepage__tabs_content [data-tab="'+target+'"]', {display: 'block', zIndex: 2, position: 'relative'}, '-=0.5')
      .fromTo('.homepage__tabs_content [data-tab="'+target+'"] h3 div', 0.8, {rotationX: 90, opacity: 0}, {rotationX: 0, opacity: 1, ease: Power2.easeOut})
      .fromTo('.homepage__tabs_content [data-tab="'+target+'"] p', 1.5, {opacity: 0}, {opacity: 1, ease: Power2.easeOut}, '-=0.3')
      .set('.homepage__tabs_list', {visibility: 'hidden'})
    },
    onClose: function(e){
      let that = this;
      TweenMax.to('.homepage__tabs_disk .disk--text', 1.5, {color: '#9BCAD6', onComplete: function(){
        TweenMax.to('.homepage__tabs_disk .disk--arrow-1', 90, {rotation: 360, repeat: -1, ease:Power0.easeNone});
        TweenMax.to('.homepage__tabs_disk .disk--arrow-2', 15, {rotation: 360, repeat: -1, ease:Power0.easeNone});
        that.diskTextAnim.play();
        document.querySelector('.homepage__tabs_list .active').classList.remove('active');
        that.active = false;
      }});
      let tl = new TimelineMax();
      tl.to(e.target.closest('.title'), 0.8, {rotationX: 90, opacity: 0, ease: Power2.easeOut}, 'start')
      .to(e.target.closest('.tab--body').querySelector('p'), 1, {opacity: 0, ease: Power2.easeOut}, 'start')
      .set(e.target.closest('.tab--body'), {clearProps: 'all'})
      .set(document.querySelectorAll('.homepage__tabs_list span'), {color: '#ee412a'})
      .set('.homepage__tabs_list', {visibility: 'visible'})
      .staggerTo(document.querySelectorAll('.homepage__tabs_list span'), 2, {opacity: 1}, 0.1)
    },
    render: function(){
      let el = document.querySelector('.homepage__tabs_disk .disk--text');
      var text = '';
      for(var i in el.innerText){      
        text+=el.innerText[i].replace(' ', '&nbsp;');
        if(i == el.innerText.length-1)text+='&nbsp;+&nbsp;';
      }      
      var textBlock = document.createElement('div');    
      textBlock.className = 'text';    
      textBlock.innerHTML = text;    
      var split = new SplitText(textBlock, {type:"chars", reduceWhiteSpace: false});      
      el.innerHTML = '';
      el.appendChild(textBlock);
      var deg = 360 / split.chars.length, origin = 0, radius = 320;
      for(var i in split.chars){
        split.chars[i].style.height = radius+'px';        
        split.chars[i].style.transform = 'rotate('+(origin)+'deg)';
        origin += deg;
      }  
      this.diskTextAnim = TweenMax.to('.homepage__tabs_disk .disk--text', 60, {rotation: 360, repeat: -1, ease:Power0.easeNone});
      TweenMax.to('.homepage__tabs_disk .disk--arrow-1', 90, {rotation: 360, repeat: -1, ease:Power0.easeNone});
      TweenMax.to('.homepage__tabs_disk .disk--arrow-2', 15, {rotation: 360, repeat: -1, ease:Power0.easeNone});

      document.querySelectorAll('.homepage__tabs_content .tab--body h3 div').forEach(function(el, i){
        let split = new SplitText(el, {type:"words"});        
        let plus = document.createElement('i');
        plus.innerText = '+';
        split.words[split.words.length - 1].appendChild(plus);        
      });
      TweenMax.set(document.querySelectorAll('.homepage__tabs_list span'), {opacity: 0})
    }    
  }  
  // End Tabs render

  


  function aosInit(){    
    AOS.init({
      offset: 100,
      once: true
    });
    //TweenMax.set('.homepage__drag canvas.leisure, .homepage__drag canvas.business', {scale: 1.5});
    document.addEventListener('aos:in', function(e){      
      if(e.detail.classList.contains('homepage__drag')){
        new TimelineMax().to(['.homepage__drag .blind-left', '.homepage__drag .blind-right'], 0.8, {scaleX: 0, ease: Power2.easeIn})
        .staggerFrom(document.querySelectorAll('.homepage__drag canvas.leisure, .homepage__drag canvas.business'), 1.6, {scale: 1.4}, 0.1, '-=0.8')
        .staggerFrom(document.querySelectorAll('.homepage__drag h2 a, .homepage__drag h2 span'), 1.5, {rotationX: 90, opacity:0, ease: Power3.easeOut}, 0.25, '-=0.8')
        .to('.homepage__drag h2.or span', 0.8, {scale: 0, opacity: 0, transformOrigin: 'center', ease: Power3.easeOut}, '+=0.8')
        .from('.homepage__drag .button-circle', 0.8, {scale: 1.4, opacity: 0, ease: Power3.easeOut}, '-=0.6')
        .add(function(){
          app.homepage.drag.show = true;
        });
      }      
      if(e.detail.classList.contains('homepage__feedback_slider') && e.detail.classList.contains('leisure')){
        new TimelineMax().set(e.detail, {visibility: 'visible'})
        .fromTo(e.detail.querySelector('.swiper-slide-active .slide--photo'), 1.4, {x: '100%', scale: 1.3, opacity:0}, {x: '0%', scale: 1, opacity:1, ease:Power4.easeOut}, 'start')
        .fromTo(e.detail.querySelector('.swiper-slide-active .slide--photo'), 1.4, {skewX: -30}, {skewX: 0, ease:Power4.easeOut}, 'start')
        .fromTo('.homepage__feedback_slider.leisure h2 span', 1, {opacity: 0, rotationX: 90}, {opacity: 1, rotationX: 0, ease: Power2.easeOut}, '-=0.7')
        .fromTo(e.detail.querySelector('.swiper-slide-active .slide--text'), 1, {opacity: 0, y: '50%'}, {opacity: 1, y: '0%', ease: Power2.easeOut}, '-=0.6')
        .fromTo('.homepage__feedback_slider.leisure .slider-control', 1, {opacity: 0, scale: 1.3}, {opacity: 1, scale: 1, ease: Power2.easeOut}, '-=0.6')
      }
      if(e.detail.classList.contains('homepage__feedback_slider') && e.detail.classList.contains('business')){
        new TimelineMax().set(e.detail, {visibility: 'visible'})
        .fromTo(e.detail.querySelector('.swiper-slide-active .slide--photo'), 1.4, {x: '-100%', scale: 1.3, opacity:0}, {x: '0%', scale: 1, opacity:1, ease:Power4.easeOut}, 'start')
        .fromTo(e.detail.querySelector('.swiper-slide-active .slide--photo'), 1.4, {skewX: 30}, {skewX: 0, ease:Power4.easeOut}, 'start')
        .fromTo('.homepage__feedback_slider.business h2 span', 1, {opacity: 0, rotationX: 90}, {opacity: 1, rotationX: 0, ease: Power2.easeOut}, '-=0.7')
        .fromTo(e.detail.querySelector('.swiper-slide-active .slide--text'), 1, {opacity: 0, y: '50%'}, {opacity: 1, y: '0%', ease: Power2.easeOut}, '-=0.6')
        .fromTo('.homepage__feedback_slider.business .slider-control', 1, {opacity: 0, scale: 1.3}, {opacity: 1, scale: 1, ease: Power2.easeOut}, '-=0.6')
        .fromTo('.homepage__feedback .button-circle', 1, {opacity: 0, scale: 1.4}, {opacity: 1, scale: 1, ease: Power2.easeOut}, '-=1')
      }
      if(e.detail.classList.contains('homepage__services')){
        new TimelineMax().to(e.detail.querySelectorAll('.swiper-slide-active .slide--photo'), 1.6, {scale: 1})
        .staggerFrom(e.detail.querySelectorAll('h2'), 1, {opacity: 0, scale: 1.3, ease: Power2.easeOut}, 0.3, '-=1')
        .staggerFrom(e.detail.querySelectorAll('.swiper-slide-active h3 a'), 1.5, {rotationX: 90, opacity:0, ease: Power3.easeOut}, 0.3, '-=0.8')
        .staggerFrom(e.detail.querySelectorAll('.slider-control'), 1, {opacity: 0, scale: 1.4, ease: Power2.easeOut}, 0.3, '-=1')
      }
      if(e.detail.classList.contains('homepage__tabs')){
        new TimelineMax().staggerTo(document.querySelectorAll('.homepage__tabs_list span'), 2, {opacity: 1}, 0.1)
        .add(function(){
          app.homepage.tabs.show = true;
        });
      }      
      if(e.detail.classList.contains('leisure') && e.detail.closest('.homepage__insta')){
        TweenMax.fromTo(e.detail.querySelectorAll('h2 span'), 1.5, {rotationX: 90, opacity: 0}, {rotationX: 0, opacity:1, ease: Power3.easeOut});
      }
      if(e.detail.classList.contains('business') && e.detail.closest('.homepage__insta')){
        TweenMax.fromTo(e.detail.querySelectorAll('h2 span'), 1.5, {rotationX: 90, opacity: 0}, {rotationX: 0, opacity:1, ease: Power3.easeOut});
      }
      if(e.detail.classList.contains('expert__form')){
        TweenMax.fromTo(e.detail.querySelectorAll('h2 span'), 1.5, {rotationX: 90, opacity: 0}, {rotationX: 0, opacity:1, ease: Power3.easeOut});
      }
      
    });    
  }
  
}


/* ==============================================================
                          CATALOG INIT
   ============================================================== */
const _catalog = function(){
  const root = this;

  this.eventsInit = function(){
    window.addEventListener('scroll', function(e){
      header(e);        
    });    
    document.querySelectorAll('[data-action="submenu"]').forEach(function(el, i){
      el.addEventListener('mouseenter', header);
      el.addEventListener('mouseleave', header);
    });

    document.querySelectorAll('.catalog__filter_nav li').forEach(function(el, i){      
      el.addEventListener('click', function(e){
        let target = document.querySelector('.catalog__filter_list #'+e.currentTarget.getAttribute('data-target'));
        if(document.querySelectorAll('.catalog__filter_list .active').length){
          let current = document.querySelector('.catalog__filter_list .active').id == e.currentTarget.getAttribute('data-target');
          TweenMax.to(document.querySelector('.catalog__filter_list .active'), 0.3, {height: 0, opacity: 0, onComplete: function(){
            TweenMax.set(document.querySelector('.catalog__filter_list .active'), {clearProps: "all"});
            document.querySelector('.catalog__filter_list .active').classList.remove('active');
            if(!current){
              TweenMax.set(target, {display: 'block'});
              TweenMax.from(target, 0.3, {height: 0, opacity: 0, onComplete: function(){
                target.classList.add('active');
              }});    
            }
          }});
        }else{
          TweenMax.set(target, {display: 'block'});
          TweenMax.from(target, 0.3, {height: 0, opacity: 0, onComplete: function(){
            target.classList.add('active');
          }});
        }
        
        
        
        
      });
    });
  };  

  this.loader = {
    init: function(){
      let that = this;
      app.globalEvents();
      
      document.querySelectorAll('img').forEach(function(el, i){
        let src = el.getAttribute('data-src');
        var img = new Image();
        img.src = src;
        img.onload = function() {
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
   const _leisure = function(){
    const root = this;

    
    this.hero = {
      slides: document.querySelectorAll('.leisure__hero_backgrounds img').length,
      slide: 1,
      timer: null,
      transition: false,
      heroBgCover: function(el){
        let ratio = el.width / el.height;        
        if(document.body.clientWidth / window.innerHeight > ratio){          
          return {
            width: window.innerWidth,
            height: window.innerWidth / ratio,
            x: 0,
            y: window.innerHeight - window.innerWidth / ratio
          }
        }else{          
          return {
            width: window.innerHeight*ratio,
            height: window.innerHeight,
            x: window.innerWidth - window.innerHeight*ratio,
            y: 0
          }          
        }
      },
      render: function(){
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
        document.querySelectorAll('.leisure__hero_backgrounds img').forEach(function(el, i){
          loader.add('slide'+(i+1), el.getAttribute('data-src'));
        });
        
        loader.load(function(loader, resources){
          for(i in resources){
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
          TweenMax.set('.leisure__hero h1 .switch[data-slide="1"]', {display: 'block'});
          document.querySelector('.leisure__hero_pagination .pagination--slide .current').innerHTML = that.slide < 10 ? '0'+that.slide : that.slide;
          document.querySelector('.leisure__hero_pagination .pagination--slide .all').innerHTML = that.slides < 10 ? '0'+that.slides : that.slides;
          that.heroFilter = new PIXI.filters.ZoomBlurFilter();
          that.heroFilter.strength = 0.1;
          that.heroFilter.center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
          }
          that.heroFilter.innerRadius = 200;
          that.container.filters = [that.heroFilter];
          startTimer();
          that.el.addEventListener('mousemove', onPointerMove);
          that.el.addEventListener('click', onPointerClick);

          function onPointerMove(e) {          
            TweenMax.to(that.heroFilter.center, 1, {x:e.clientX, y: e.clientY});
          };

          function onPointerClick(e){
            if(that.transition)return;            
            clearTimeout(that.timer);
            that.transition = true;
            let r = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
            let current = that['slide'+that.slide];
            let next;
            let pS, pE;            
            if(that.slide < that.slides){
              next = that['slide'+(that.slide+1)];
              pS = ((100/that.slides)*(that.slide+1)) - ((100/that.slides)/2);
              pE = ((100/that.slides)*(that.slide+1));
            }else {
              next = that['slide1'];
              pS = (100 - ((100/that.slides)));
              pE = 100/that.slides;
            }            
            new TimelineMax().to(that.heroFilter, 1.3, {innerRadius: r, ease: Power4.easeIn})
            .set(that.heroFilter, {innerRadius: 0, strength: 0})
            .to('.leisure__hero_pagination .pagination--bar i', 1, {width: pS+'%', ease: Power3.easeIn},'transition')
            .to(that.heroFilter, 1, {strength: 2, ease: Power3.easeIn}, 'transition')
            .to(current, 1, {alpha: 0, ease: Power3.easeIn}, 'transition')
            .to(next, 1, {alpha: 1, ease: Power3.easeIn}, 'transition')            
            .fromTo('.leisure__hero h1 .switch[data-slide="'+that.slide+'"]', 1, {rotationX: 0, opacity: 1, y: 0}, {rotationX: 90, opacity: 0, y: 30, ease: Power3.easeIn}, 'transition')
            .set('.leisure__hero h1 .switch[data-slide="'+that.slide+'"]', {display: 'none'})
            .set('.leisure__hero h1 .switch[data-slide="'+(that.slide < that.slides ? (that.slide+1) : 1 )+'"]', {display: 'block'})
            .add(function(){
              let slide;
              if(that.slide < that.slides){
                slide = (that.slide+1) < 10 ? '0'+(that.slide+1) : (that.slide+1)
              }else {
                slide = '01';
              }
              document.querySelector('.leisure__hero_pagination .pagination--slide .current').innerHTML = slide;
            })
            .to('.leisure__hero_pagination .pagination--bar i', 1, {width: pE+'%', ease: Power3.easeOut},'end')
            .fromTo('.leisure__hero h1 .switch[data-slide="'+(that.slide < that.slides ? (that.slide+1) : 1 )+'"]', 1, {rotationX: -90, opacity: 0, y: 30}, {rotationX: 0, opacity: 1, y: 0, ease: Power3.easeOut}, 'end')
            .to(that.heroFilter, 1, {strength: 0.1, ease: Power3.easeOut}, 'end')
            .to(that.heroFilter, 1, {innerRadius: 200, ease: Power3.easeOut}, 'end')
            .add(function(){
              if(that.slide < that.slides){
                that.slide++;
              }else {
                that.slide = 1;
              }
              that.transition = false;              
              startTimer();
              
            })
          };
          function startTimer(){
            app.leisure.hero.timer = setTimeout(function(){
              onPointerClick();
            }, 5000);
          }
        });
      }      
    }
    
    this.tabs = {
      active: false,
      diskTextAnim: null,
      show: true,
      slides: document.querySelectorAll('.leisure .homepage__tabs .disk--icons img[data-slide]').length,
      slide: 1,
      transition: false,
      init: function(){
        let that = this;
        this.render();
        document.querySelectorAll('.homepage__tabs_list span').forEach(function(el, i){                
          el.addEventListener('click', function(e){
            if(that.show)that.onActive(e);
          });
          el.addEventListener('mouseenter', function(e){
            if(that.show)that.onHover(e);
          });
          el.addEventListener('mouseleave', function(e){
            if(that.show)that.onHover(e);
          });
        });
        document.querySelectorAll('.homepage__tabs_content h3 i').forEach(function(el, i){
          el.addEventListener('click', function(e){
            that.onClose(e);
          });
        });
        
      },
      onHover: function(e){
        if(!this.active){
          if(e.type == 'mouseenter'){
            e.target.classList.add('active');
            TweenMax.to(document.querySelectorAll('.homepage__tabs_list span:not(.active)'), 1, {opacity: 0.1, color: '#2f2f2f', ease: Power2.easeOut});
          }else{
            TweenMax.to(document.querySelectorAll('.homepage__tabs_list span'), 0.8, {opacity: 1, color: '#ee412a', ease: Power2.easeOut});
            e.target.classList.remove('active');
          }
        }
      },
      onActive: function(e){      

        this.active = true;
        e.target.classList.add('active');
        let that = this;
        let target = e.target.getAttribute('data-target');
        console.log(this.transition);
        if(!this.transition){
          this.animation.pause();
        }      
        TweenMax.to('.homepage__tabs_disk .disk--text', 1.5, {color: '#ffffff', onComplete: function(){
          that.diskTextAnim.pause();
          TweenMax.set('.homepage__tabs_disk .disk--arrow-1, .homepage__tabs_disk .disk--arrow-2', {clearProps: 'all'});
        }});
        let tl = new TimelineMax();      
        tl.staggerTo(document.querySelectorAll('.homepage__tabs_list span:not(.active)'), 0.8, {opacity: 0, ease: Power2.easeOut}, 0.1)
        .to(document.querySelector('.homepage__tabs_list span.active'), 0.7, {opacity: 0, ease: Power2.easeOut}, '-=0.8')
        .set('.homepage__tabs_content [data-tab="'+target+'"]', {display: 'block', zIndex: 2, position: 'relative'}, '-=0.5')
        .fromTo('.homepage__tabs_content [data-tab="'+target+'"] h3 div', 0.8, {rotationX: 90, opacity: 0}, {rotationX: 0, opacity: 1, ease: Power2.easeOut})
        .fromTo('.homepage__tabs_content [data-tab="'+target+'"] p', 1.5, {opacity: 0}, {opacity: 1, ease: Power2.easeOut}, '-=0.3')
        .set('.homepage__tabs_list', {visibility: 'hidden'})
      },
      onClose: function(e){
        let that = this;
        TweenMax.to('.homepage__tabs_disk .disk--text', 1.5, {color: '#ffffff', onComplete: function(){        
          that.diskTextAnim.play();
          document.querySelector('.homepage__tabs_list .active').classList.remove('active');
          that.active = false;
          that.animation.play();
        }});
        let tl = new TimelineMax();
        tl.to(e.target.closest('.title'), 0.8, {rotationX: 90, opacity: 0, ease: Power2.easeOut}, 'start')
        .to(e.target.closest('.tab--body').querySelector('p'), 1, {opacity: 0, ease: Power2.easeOut}, 'start')
        .set(e.target.closest('.tab--body'), {clearProps: 'all'})
        .set(document.querySelectorAll('.homepage__tabs_list span'), {color: '#ee412a'})
        .set('.homepage__tabs_list', {visibility: 'visible'})
        .staggerTo(document.querySelectorAll('.homepage__tabs_list span'), 2, {opacity: 1}, 0.1)
      },
      render: function(){   
        let that = this;   
        let el = document.querySelector('.homepage__tabs_disk .disk--text');
        var text = '';
        for(var i in el.innerText){      
          text+=el.innerText[i].replace(' ', '&nbsp;');
          if(i == el.innerText.length-1)text+='&nbsp;+&nbsp;';
        }      
        var textBlock = document.createElement('div');    
        textBlock.className = 'text';    
        textBlock.innerHTML = text;    
        var split = new SplitText(textBlock, {type:"chars", reduceWhiteSpace: false});      
        el.innerHTML = '';
        el.appendChild(textBlock);
        var deg = 360 / split.chars.length, origin = 0, radius = 320;
        for(var i in split.chars){
          split.chars[i].style.height = radius+'px';        
          split.chars[i].style.transform = 'rotate('+(origin)+'deg)';
          origin += deg;
        }  
        this.diskTextAnim = TweenMax.to('.homepage__tabs_disk .disk--text', 60, {rotation: 360, repeat: -1, ease:Power0.easeNone});
        document.querySelectorAll('.homepage__tabs_content .tab--body h3 div').forEach(function(el, i){
          let split = new SplitText(el, {type:"words"});        
          let plus = document.createElement('i');
          plus.innerText = '+';
          split.words[split.words.length - 1].appendChild(plus);        
        });      
        document.querySelector('.leisure .homepage__tabs .disk--icons img[data-slide="1"]').classList.add('current');
        this.animation = new TimelineMax({repeat: -1})
        this.animation.set('.leisure .homepage__tabs .disk--icons .shape', {transformOrigin: 'left', scaleX: 0, ease: Power4.easeInOut})
          .add(function(){
            that.transition = true;
          }, '+=3')
          .to('.leisure .homepage__tabs .disk--icons .shape', 0.8, {scaleX: 1, ease: Power4.easeInOut})
          .add(function(){
            document.querySelector('.leisure .homepage__tabs .disk--icons img.current').classList.remove('current');    
            if(that.slide < that.slides){
              that.slide++
            }else{
              that.slide = 1;
            }
            document.querySelector('.leisure .homepage__tabs .disk--icons img[data-slide="'+that.slide+'"]').classList.add('current');
          })
          .set('.leisure .homepage__tabs .disk--icons .shape', {transformOrigin: 'right', ease: Power4.easeInOut})
          .to('.leisure .homepage__tabs .disk--icons .shape', 0.8, {scaleX: 0, ease: Power4.easeInOut})
          .add(function(){
            that.transition = false;
            if(that.active){
              that.animation.pause();
            }
          })
        //TweenMax.set(document.querySelectorAll('.homepage__tabs_list span'), {opacity: 0})
      }    
    };    

    this.loader = {
      scripts:
        [
          'pixi',
          'splitText',
          'swiper',
          'aos',
          //'pixiFilters'
        ],
      resources: 0,
      resourcesDone: 0,
      init: function(){
        let that = this;
        this.resources += document.querySelectorAll('img').length
        + document.querySelectorAll('[data-bg]').length
        + this.scripts.length;

        document.querySelectorAll('img').forEach(function(el, i){
          let src = el.getAttribute('data-src');
          var img = new Image();
          img.src = src;
          img.onload = function() {
            el.src = src;
            that.resourcesDone++;
            that.loading();
          }
        });
        document.querySelectorAll('[data-bg]').forEach(function(el, i){
          let src = el.getAttribute('data-bg');
          var img = new Image();
          img.src = src;        
          img.onload = function() {            
            that.resourcesDone++;
            that.loading();
          }
        });
        
        this.scripts.forEach(function(n){
          let src = './js/lib/'+app.resours[n];
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function() {
            if(n == 'pixi'){
              filters();
            }
            that.resourcesDone++;
            that.loading();
          }
        });

        function filters(){
          let src = './js/lib/pixi-filters.js';
          var script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = function() {            
            root.hero.render();
          }
        }        
        // TweenMax.staggerTo(document.querySelectorAll('.loader ul li'), 0.25, {width: '100%', ease: Power0.easeNone}, 0.25, endFill);
        // function endFill(){
        //   document.querySelector('.loader ul').classList.add('fill');
        //   that.loading();
        // }
      },
      loading: function(){
        if(this.resources == this.resourcesDone){
          this.loaded();
        }
      },
      loaded: function(){
        //TweenMax.staggerTo(document.querySelectorAll('.loader ul li'), 0.25, {width: '0%', ease: Power0.easeNone}, 0.25);
        app.globalEvents();
        console.log(this);
        root.tabs.init();
        this.singleSlider = new Swiper ('.single-slider .swiper-container', {
          // Optional parameters
          init: false,
          speed: 1000,
          simulateTouch: false,
          // loop: true,
          // loopAdditionalSlides: 1,
          //spaceBetween: -60,
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
        this.singleSlider.on('init', function(){
          const that = this;

          function heroBgCover(el){
            let ratio = el.width / el.height;            
            if((that.el.clientWidth + (325*2)) / that.el.clientHeight > ratio){              
              return {
                width: (that.el.clientWidth + (325*2)),
                height: (that.el.clientWidth + (325*2)) / ratio,
                x: 0,
                y: (window.innerHeight - (that.el.clientWidth + (325*2)) / ratio) / 2
              }
            }else{
              return {
                width: that.el.clientHeight*ratio,
                height: that.el.clientHeight,
                x: ((that.el.clientWidth + (325*2)) - that.el.clientHeight*ratio) / 2,
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
          this.images = [];

          this.mask = new PIXI.Graphics();
          this.mask.lineStyle(0);
          this.mask.beginFill(0xffffff, 0.5);
          //this.mask.drawPolygon([0, 0, 100, 0, window.innerWidth, window.innerHeight, (325*2), window.innerHeight, 0, 0]);          
          this.mask.drawPolygon([-325, 0, galleryEl.clientWidth - 325, 0, (galleryEl.clientWidth+(325)), window.innerHeight, 325, window.innerHeight]);
          this.mask.endFill();
          
          this.el.querySelectorAll('.swiper-slide .slide--photo img').forEach(function(el, i){
            let src = el.getAttribute('data-src');
            let container = new PIXI.Container();
            let image = PIXI.Sprite.from(src);
            let mask = that.mask.clone();
            mask.x = galleryEl.clientWidth*i;
            that.rootContainer.addChild(mask);
            container.mask = mask;
            
            image.anchor.x = 0.5;
            image.anchor.y = 0.5;
            image.width = heroBgCover(el).width;
            image.height = heroBgCover(el).height;
            image.x = heroBgCover(el).x + (image.width/2);
            image.y = heroBgCover(el).y + (image.height/2);
            image.alpha = 0.7;
            container.width = galleryEl.clientWidth + (325*2);
            container.x =  (galleryEl.clientWidth * i) - 325;
            that.rootContainer.addChild(container);
            container.addChild(image);

            if(i == (that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 1)){
              let cloneImage = PIXI.Sprite.from(src);
              cloneImage.width = heroBgCover(el).width;
              cloneImage.height = heroBgCover(el).height;
              cloneImage.x = heroBgCover(el).x;
              cloneImage.y = heroBgCover(el).y;
              cloneImage.alpha = 0.7;
              let cloneContaner = new PIXI.Container();
              cloneContaner.width = galleryEl.clientWidth + (325*2);              
              that.rootContainer.addChild(cloneContaner);
              cloneContaner.x = -galleryEl.clientWidth;              
              let cloneMask = that.mask.clone();
              cloneMask.x = -galleryEl.clientWidth;
              that.rootContainer.addChild(cloneMask);
              cloneContaner.mask = cloneMask;
              cloneContaner.addChild(cloneImage);
            }else if(i == 0){
              let cloneImage = PIXI.Sprite.from(src);
              cloneImage.width = heroBgCover(el).width;
              cloneImage.height = heroBgCover(el).height;
              cloneImage.x = heroBgCover(el).x;
              cloneImage.y = heroBgCover(el).y;
              cloneImage.alpha = 0.7;
              let cloneContaner = new PIXI.Container();
              cloneContaner.width = galleryEl.clientWidth + (325*2);
              that.rootContainer.addChild(cloneContaner);
              cloneContaner.x = galleryEl.clientWidth*that.el.querySelectorAll('.swiper-slide .slide--photo img').length - 325;
              let cloneMask = that.mask.clone();
              cloneMask.x = galleryEl.clientWidth * that.el.querySelectorAll('.swiper-slide .slide--photo img').length;
              that.rootContainer.addChild(cloneMask);
              cloneContaner.mask = cloneMask;
              cloneContaner.addChild(cloneImage);
            }            
            that.containers.push(container);
            that.images.push(image);
            
            
          });
          this.rootContainer.x = 0;
          this.rootContainer.y = 0;
          return


          this.container1 = new PIXI.Container();
          this.container2 = new PIXI.Container();         


          

          
          this.image1 = PIXI.Sprite.from('./img/maldives.jpg');
          this.image1.width = galleryEl.clientWidth;
          this.image1.height = galleryEl.clientHeight;
          this.image1.alpha = 0.7;

          this.image2 = PIXI.Sprite.from('./img/seychelles.jpg');
          this.image2.width = galleryEl.clientWidth;
          this.image2.height = galleryEl.clientHeight;
          this.image2.alpha = 0.7;

          this.container1.addChild(this.image1);
          this.container2.addChild(this.image2);
          this.container2.x = galleryEl.clientWidth + 325;
          this.rootContainer.addChild(this.container1);
          this.rootContainer.addChild(this.container2);

          
          
          this.container1.width = galleryEl.clientWidth + (325*2)          
          this.container1.x = -325;

          this.rootContainer.x = -600;
          
          

          
          
         //this.mask2 = this.mask.clone();
          
          // console.log(this.mask2)
          

          this.rootContainer.addChild(this.mask);
          // this.container1.mask = this.mask;
          //this.rootContainer.addChild(this.mask);
          this.container2.mask = this.mask;

        });
        this.singleSlider.init();
        this.singleSlider.on('slideChangeTransitionStart', function(){
          let x = this.el.clientWidth * this.realIndex;
          console.log(this);
          if(this.realIndex > this.previousIndex){
            this.images.forEach(function(el, i){
              TweenMax.to(el.skew, 0.5, {x: -0.6, ease:Power2.easeIn, yoyo: true, repeat: 1});
              TweenMax.to(el.scale, 0.5, {x: 1.5, y: 1.5, ease:Power2.easeIn, yoyo: true, repeat: 1});
            });
            new TimelineMax().to(this.rootContainer, 1, {x: -x, ease:Power2.easeInOut}, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, {skewX: -34, scale: 1.2, ease:Power1.easeIn, yoyo: true, repeat: 1}, 'start');
          }else{
            this.images.forEach(function(el, i){
              TweenMax.to(el.skew, 0.5, {x: 0.6, ease:Power2.easeIn, yoyo: true, repeat: 1});
              TweenMax.to(el.scale, 0.5, {x: 1.5, y: 1.5, ease:Power2.easeIn, yoyo: true, repeat: 1});
            });
            new TimelineMax().to(this.rootContainer, 1, {x: -x, ease:Power2.easeInOut}, 'start')
            .to(this.el.querySelectorAll('.swiper-slide .slide--content'), 0.5, {skewX: 34, scale: 1.2, ease:Power1.easeIn, yoyo: true, repeat: 1}, 'start');
          }
        });
        this.catalogSlider = new Swiper ('.catalog__slider .swiper-container', {
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
        this.catalogSlider.on('slideChangeTransitionStart', function(){
          if(this.realIndex > this.previousIndex){
            let tl = new TimelineMax();
            tl//.to(this.el.querySelector('.swiper-slide-prev .slide--photo img'), 0.7, {opacity: 0}, 'start')            
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, {skewX: -30, scale: 1.2, ease:Power1.easeIn, yoyo: true, repeat: 1}, 'start')
            //.fromTo(this.el.querySelector('.swiper-slide-active .slide--photo img'), 1.6, {opacity: 0}, {opacity: 1, scale: 1, ease:Power4.easeOut}, 'start')            
            
          }else{
            let tl = new TimelineMax();
            tl//.to(this.el.querySelector('.swiper-slide-next .slide--photo img'), 0.7, {opacity: 0}, 'start')            
            .to(this.el.querySelectorAll('.swiper-slide'), 0.4, {skewX: 30, scale: 1.2, ease:Power1.easeIn, yoyo: true, repeat: 1}, 'start')
            //.fromTo(this.el.querySelector('.swiper-slide-active .slide--photo img'), 1.6, {opacity: 0}, {opacity: 1, scale: 1, ease:Power4.easeOut}, 'start')            
          }              
        });
      }
    };  
    
  
    this.loader.init();
   };



window.onload = function(){
  setTimeout(function(){
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    if(document.body.classList.contains('homepage')){
      app.homepage = new _homepage();
    }
    if(document.body.classList.contains('catalog')){      
      app.catalog = new _catalog();
    }
    if(document.body.classList.contains('leisure')){
      app.leisure = new _leisure();
    }
  }, 100);
}











