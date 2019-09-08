

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
  lastScrollTop: 0,
  init: function(){
    window.addEventListener('scroll', function(e){
      header(e);
    });
    document.querySelectorAll('[data-action="submenu"]').forEach(function(el, i){
      el.addEventListener('mouseenter', header);
      el.addEventListener('mouseleave', header);      
    });
    document.querySelector('.take-button').addEventListener('mouseenter', function(e){
      TweenMax.to(this, 0.5, {color: '#fff', ease: Power2.easeOut});
      TweenMax.to(this.querySelector('i'), 0.5, {y:5, height: '40px', ease: Power2.easeOut});
    });
    document.querySelector('.take-button').addEventListener('mouseleave', function(e){
      TweenMax.to(this, 0.5, {color: function(){
        return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f':'#ffffff';
      }, ease: Power2.easeOut});
      TweenMax.to(this.querySelector('i'), 0.5, {y:0, height: '1px', ease: Power2.easeOut});
    });
    
  }  
}


function header(e){
  if(e.type == 'mouseenter'){    
    this.classList.add('active');
    let tl = new TimelineMax();    
    tl.to(this.querySelector('a'), 0.6, {color: '#ee412a'}, 'start')
      .to(this.querySelector('.icon'), 0.6, {fill: '#ee412a', rotation: 180}, 'start')
      .to(document.querySelectorAll('.header__nav_link:not(.active) > a, .header__right a'), 0.6, {color: '#2f2f2f', ease: Power0.easeNone}, 'start')
      .to(document.querySelectorAll('.header__nav_link:not(.active) > a .icon, .header__right .icon'), 0.6, {fill: '#2f2f2f', ease: Power0.easeNone}, 'start')
      .to('.header__bg', 0.5, {opacity: 1, ease: Power0.easeNone}, 'start')
      .to('.header__logo .logo--white', 0.5, {opacity: 0}, 'start')
      .to('.header__logo .logo--black', 0.5, {opacity: 1}, 'start')
      .to(this.querySelector('.submenu'), 0.5, {autoAlpha: 1, ease: Power0.easeNone}, 'start')
      .fromTo(this.querySelectorAll('.submenu .row'), 0.8, {opacity: 0, y: -20,}, {opacity: 1, y: 0, ease: Power2.easeOut}, 'start')
  }else if(e.type == 'mouseleave'){    
    this.classList.remove('active');
    let tl = new TimelineMax();
    tl.to(document.querySelectorAll('.header__nav_link > a, .header__right a'), 0.6, {color: function(){
      return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f':'#ffffff';
    }, ease: Power0.easeNone}, 'start')
      .to(document.querySelectorAll('.header__nav_link > a .icon, .header__right .icon'), 0.6, {fill: function(){
        return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f':'#ffffff';
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





// Homepage init
const _homepage = function(page){
  let that = this;

  this.blobs = {
    heroBg: null,
    heroVideo: null
  }

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
      var xhr = new XMLHttpRequest();
      xhr.open('GET', src, true);
      xhr.responseType = 'blob';      
      xhr.onload = function(e) {
        if (this.status == 200) {          
          var myBlob = this.response;
          var vid = (window.webkitURL || window.URL).createObjectURL(myBlob);          
          app.homepage.blobs.heroVideo = vid;
          //document.querySelector('.hero--player video').src = app.homepage.blobs.heroVideo;
          //console.log(app.homepage.video)
          //app.homepage.video.loaded = true;
        }
      }
      xhr.send();
      document.querySelector('.hero--player video').src = app.homepage.blobs.heroVideo || src;
      
      
      //this.controls.querySelector('[data-time="all"]').innerText = this.time().duration;      
      this.video.addEventListener('click', function(e){        
        if(this.paused){
          video.play();
        }else{
          video.pause();
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
        let tl = new TimelineMax();        
        let h1 = [].slice.call(document.querySelectorAll('.homepage__hero h1 span'), 0).reverse();          
        tl.to('[data-action="homepage-hero-play"]', 0.3, {scale: 0, ease: Power2.easeIn})
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
          })
          .set('body', {overflow: 'hidden'})
          .to('.hero--player', 0.5, {autoAlpha: 1})
          .fromTo('[data-action="homepage-close-video"]', 0.5, {scale: 0}, {scale: 1, ease: Power2.easeInOut})
          .add(function(){
            app.homepage.hero.resours.source.pause();
            //video.video.play();
          })
      });
      document.querySelector('[data-action="homepage-close-video"]').addEventListener('click', function(e){
        let tl = new TimelineMax();        
        let h1 = [].slice.call(document.querySelectorAll('.homepage__hero h1 span'), 0).reverse();
        video.video.pause();        
        app.homepage.hero.resours.source.play();
        video.video.currentTime = 0;
        tl.to('[data-action="homepage-close-video"]', 0.5, {scale: 0, ease: Power2.easeIn})
        .to('.hero--player', 0.5, {autoAlpha: 0})
        .set('body', {overflow: 'auto'})
        .staggerFromTo(document.querySelectorAll('.homepage__hero h1 span'), 0.8, {rotationX: 90, opacity: 0}, {rotationX: 0, opacity: 1, ease: Power2.easeOut}, 0.1, '-=0.3')
        .to('header', 0.5, {opacity: 1}, '-=0.3')
        .to('.homepage__hero_footer', 0.5, {opacity: 1}, '-=0.3')
        .to('[data-action="homepage-hero-play"]', 0.3, {scale: 1}, '-=0.3')

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
    resourcesDone: 0,
    next: 0,
    step: 0,    
    tl: new TimelineMax(),
    path: [
     'M150.2,68.6l-74.9,9.6l-25.2-11l23.5,7L150.2,68.6z',
     'M137.1,117l-60-39.9L49.6,66.6l25.7,6.5L137.1,117z',
     'M73.6,150l3.9-72.9L49.7,66.5l26.1,6.6L73.6,150z',
     'M20.4,126.4l57.1-49.1L50.1,65.3l25.7,7.9L20.4,126.4z',
     'M0,82.2l78-3.1l-29.4-6.5l27.6,2.5L0,82.2z',
     'M52.5,36.1l47.7,64.2l-50.4,1.2l43.4-4.2L52.5,36.1z',
     'M70,85.5l-11-36h12c0,0,7.7-1,15,8c7.3,9,35,43,35,43l-92-2l85-1l-33-40c0,0-4.4-5-10-5c-5.6,0-9,0-9,0L70,85.5z'
    ],
    init: function(){
      let that = this;
      this.resources += document.querySelectorAll('script[data-src]').length
      + document.querySelectorAll('img').length
      + document.querySelectorAll('[data-background]').length
      + document.querySelectorAll('[data-displacement]').length
      + document.querySelectorAll('[data-pat-left]').length
      + document.querySelectorAll('[data-pat-right]').length
      + document.querySelectorAll('[data-img-left]').length
      + document.querySelectorAll('[data-img-right]').length;
      document.querySelectorAll('script[data-src]').forEach(function(el, i){
        let src = el.getAttribute('data-src');
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = function() {            
          that.resourcesDone++;
          that.loading();
        }
      });
      document.querySelectorAll('img').forEach(function(el, i){
        let src = el.getAttribute('src');
        var img = new Image();
        img.src = src;        
        img.onload = function() {            
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
      document.querySelectorAll('[data-background]').forEach(function(el, i){      
        let src = el.getAttribute('data-background');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.responseType = 'blob';      
        xhr.onload = function(e) {
          if (this.status == 200) {          
            var myBlob = this.response;
            var vid = (window.webkitURL || window.URL).createObjectURL(myBlob);          
            app.homepage.blobs.heroBg = vid;            
            that.resourcesDone++;
            that.loading();
          }
        }
        xhr.send();
      }); 
      
    },
    loading: function(){
      let that = this;
      let p = (100/(this.resources/this.resourcesDone)).toFixed();
      let ratio = 100/this.path.length;      
      if(Number(p) >= this.next){
        // this.next = this.next+=ratio;
        // let path = this.path[this.step];        
        // this.tl.to("#morph", 0.5, {morphSVG: path, ease: Power0.easeNone});
        // console.log(this.tl);
        // this.step ++;
      }      
      if(this.resources - this.resourcesDone == 1){
        formRender();
        buttonsRender();        
        app.homepage.tabs.init();
        app.homepage.hero = new heroRender();
        app.homepage.drag = new dragRender();
        app.homepage.eventsInit();
        TweenMax.to(this, 1, {progress: 100, onUpdate: function(){
          document.querySelector('.loader .progress').innerHTML = that.progress.toFixed()+'%';
        }, ease: Power3.easeOut, onComplete: function(){
          app.homepage.hero.heroBgCover();
          app.homepage.hero.hero.renderer.resize(app.homepage.hero.el.clientWidth, app.homepage.hero.el.clientHeight);
          app.homepage.hero.bg.width = app.homepage.hero.heroBgWidth;
          app.homepage.hero.bg.height = app.homepage.hero.heroBgHeight;
          app.homepage.hero.bg.x  = app.homepage.hero.heroBgLeft;
          app.homepage.hero.bg.y  = app.homepage.hero.heroBgTop;
          app.homepage.hero.displacementSprite.width = app.homepage.hero.hero.renderer.width / 2;
          app.homepage.hero.displacementSprite.height = app.homepage.hero.hero.renderer.width / 2;
          app.homepage.hero.displacementSprite.x = app.homepage.hero.hero.renderer.width / 2;
          app.homepage.hero.displacementSprite.y = app.homepage.hero.hero.renderer.height / 2;
          this.mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters    
            speed: 800,
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
          that.loaded();
        }});
      }else{
        TweenMax.to(this, 1, {progress: p, onUpdate: function(){
          document.querySelector('.loader .progress').innerHTML = that.progress.toFixed()+'%';
        }});
      }      
      //console.log(Number(p), this.next);
      
      
      
      //console.log(ratio);
      // TweenMax.to("#morph", 5, {morphSVG: 'M83.5,64.25L54.125,48.7500114L34.625,40.25l17.75,4.5000076L83.5,64.25z'});
      // if(p < 100){
      //   TweenMax.to(this, 1, {progress: p, onUpdate: function(){
      //     document.querySelector('.loader .progress').innerHTML = that.progress.toFixed();
      //   }});
      // }else{
      //   TweenMax.to(this, 1, {progress: p, onUpdate: function(){
      //     document.querySelector('.loader .progress').innerHTML = that.progress.toFixed();
      //   }, onComplete: this.loaded});
      // }
    },
    loaded: function(){      
      window.scroll(0, 0);
      let tl = new TimelineMax({});
      tl.to('.loader .progress', 0.7, {opacity: 0})
        .to('.loader .logo', 0.7, {opacity: 0, onComplete: function(){          
          app.homepage.hero.resours.source.play();
        }}, '-=1')              
        .to(['.blind-left', '.blind-right'], 0.8, {scaleX: 0, ease: Power4.easeIn, onComplete: function(){
          document.querySelector('.loader').remove();
          TweenMax.set('body', {overflow: 'auto'});
        }})
        .staggerFrom(document.querySelectorAll('.homepage__hero h1 span'), 1, {rotationX: 90, opacity: 0, ease: Power2.easeOut}, 0.1, '+=0.3')
        .from('header', 0.8, {opacity: 0}, '-=0.5')
        .from('.homepage__hero_footer', 0.8, {opacity: 0}, '-=0.4')
        .from('[data-action="homepage-hero-play"]', 0.5, {scale: 0}, '-=0.4')
        .add(function(){
          app.homepage.heroVideo.init();          
        });
    }
  }
  // /.Loader

  this.loader.init()
  
  

  
  
    // this.heroVideo = document.querySelector('.homepage__hero .hero--player video');  
  
  

  // Start Hero background
  function heroRender(){
    let that = this;    
    this.heroBgCover = function(){
      let ratio = this.resours.width / this.resours.height;
      if(document.body.clientWidth / window.innerHeight > ratio){
        this.heroBgWidth = document.body.clientWidth;
        this.heroBgHeight = document.body.clientWidth / ratio;
        this.heroBgTop = -((document.body.clientWidth / ratio) - window.innerHeight) / 2;
        this.heroBgLeft = 0;
      }else{
        this.heroBgWidth = window.innerHeight*ratio;
        this.heroBgHeight = window.innerHeight;
        this.heroBgTop = 0;
        this.heroBgLeft = -((window.innerHeight * ratio) - document.body.clientWidth) / 2;
      }
    };
    
    this.el = document.querySelector('.homepage__hero');
    this.hero = new PIXI.Application({
      width: this.el.clientWidth,
      height: this.el.clientHeight,      
      forceFXAA: true,
      clearBeforeRender: false
    });
    this.el.appendChild(this.hero.view);
    this.hero.stage.interactive = true;  

    let blob = document.createElement('video');
    blob.src = app.homepage.blobs.heroBg;    
    this.resours = new PIXI.resources.VideoResource(blob, {
      autoPlay: false,
      updateFPS: 30
    });
    this.resours.source.loop = true;
    this.resours.source.autoplay = true;
    this.resours.source.muted = true;
    this.baseTexture = new PIXI.BaseTexture(this.resours);
    this.ratio = this.baseTexture.realWidth / this.baseTexture.realWidth;
    this.texture = new PIXI.Texture(this.baseTexture);
    this.bg = new PIXI.Sprite(this.texture);    
    this.hero.stage.addChild(this.bg);

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
    
    

    this.displacementSprite = PIXI.Sprite.from('./img/displacement.png');
    this.displacementSprite.width = document.body.clientWidth / 2;
    this.displacementSprite.height = document.body.clientWidth / 2;
    this.displacementSprite.anchor.set(0.5);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    this.displacementFilter.scale.x = 50;
    this.displacementFilter.scale.y = 50;
    this.hero.stage.addChild(this.displacementSprite);  
    this.bg.filters = [this.displacementFilter];
    function onPointerMove(e) {      
      TweenMax.to(that.displacementSprite, 1.5, {x:e.clientX - 25, y: e.clientY});
    }  
    this.el.addEventListener('mousemove', onPointerMove);
    TweenMax.to(that.displacementSprite, 12, {rotation: 6.28319, ease: Power0.easeNone, repeat: -1});    
  }    
  // End Hero background

  // Start Drag Slider
  function dragRender(){
    let that = this;
    let ratio;

    this.el = document.querySelector('.homepage__drag');
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
          if(x < -limit){            
            TweenMax.to(document.querySelector('canvas.leisure'), 1.2, {x:- that.el.clientWidth, ease: Power2.easeInOut});
            TweenMax.to(document.querySelector('canvas.business'), 0, {x:0});
          }else if(x > limit){
            TweenMax.to(document.querySelector('canvas.leisure'), 0, {x:0});
            TweenMax.to(document.querySelector('canvas.business'), 1.2, {x: that.el.clientWidth, ease: Power2.easeInOut});
            
          }
        }
      }
    }
    
      
    
    return;
    
    this.img1 = new Image();
    this.img1.src = this.el.getAttribute('data-img-left');
    this.img1.onload = function(){
      that.ctx.save();
      that.ctx.beginPath();
      that.ctx.moveTo(-200, 0);
      that.ctx.lineTo(((that.el.clientWidth / 2) - 200 + (that.el.clientWidth / 2)/2.92), 0);
      that.ctx.lineTo(((that.el.clientWidth / 2) - 200 - (that.el.clientWidth / 2)/2.92), that.el.clientHeight);
      that.ctx.lineTo(-200, that.el.clientHeight);      
      that.ctx.lineTo(-200, 0);      
      that.ctx.closePath();
      // Clip to the current path
      that.ctx.clip();
      that.ctx.drawImage(that.img1, -200, 0, that.el.clientWidth, that.el.clientHeight);
      that.ctx.restore();
    }    
    this.img2 = new Image();
    this.img2.src = this.el.getAttribute('data-img-right');
    this.img2.onload = function(){
      that.ctx.save();
      that.ctx.beginPath();
      that.ctx.moveTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2)/2.92), 0);
      that.ctx.lineTo(that.el.clientWidth, 0);
      that.ctx.lineTo(that.el.clientWidth, that.el.clientHeight);
      that.ctx.lineTo(((that.el.clientWidth / 2) - (that.el.clientWidth / 2)/2.92), that.el.clientHeight);      
      that.ctx.lineTo(((that.el.clientWidth / 2) + (that.el.clientWidth / 2)/2.92), 0);      
      that.ctx.closePath();
      // Clip to the current path
      that.ctx.clip();
      that.ctx.drawImage(that.img2, 0, 0, that.el.clientWidth, that.el.clientHeight);
      that.ctx.restore();
    }


    
    // this.img2 = new Image();
    // this.img2.src = this.el.getAttribute('data-img-right');    
    // this.img2.onload = function(){
    //   that.ctx.drawImage(that.img2, 50, 50, 200, 100);
    // }
    
    

    return
    this.el = document.querySelector('.homepage__drag');
    this.drag = new PIXI.Application({
      width: this.el.clientWidth,
      height: this.el.clientHeight,
      clearBeforeRender: false,
      forceCanvas: true
    });  
    this.el.appendChild(this.drag.view);
    this.container1 = new PIXI.Container();
    this.container2 = new PIXI.Container();
    

    this.pat1 = PIXI.Sprite.from(this.el.getAttribute('data-pat-left'));
    this.pat1.width = this.el.clientWidth;
    this.pat1.height = this.el.clientHeight;
    this.pat1.x  = 0;
    this.pat1.y  = 0;    
    this.drag.stage.addChild(this.pat1);    

    this.pat2 = PIXI.Sprite.from(this.el.getAttribute('data-pat-right'));
    this.pat2.width = this.el.clientWidth;
    this.pat2.height = this.el.clientHeight;
    this.pat2.x  = 0;
    this.pat2.y  = 0;    
    this.drag.stage.addChild(this.pat2);
      
    this.img1 = PIXI.Sprite.from(this.el.getAttribute('data-img-left'));
    this.img1.width = this.el.clientWidth;
    this.img1.height = this.el.clientHeight;
    this.img1.x  = 0;
    this.img1.y  = 0;
    //this.drag.stage.addChild(this.img1);
    this.container1.addChild(this.img1);
    
    const dragPoligonPath1 = [0, this.drag.renderer.height, 0, 0, ((this.drag.renderer.width / 2) + (this.drag.renderer.width / 2)/2.95), 0, ((this.drag.renderer.width / 2) - (this.drag.renderer.width / 2)/2.95), this.drag.renderer.height];
    this.dragPoligon1 = new PIXI.Graphics()
    .lineStyle(0)
    .beginFill(0xFFFFFF, 1)
    .drawPolygon(dragPoligonPath1)
    .endFill();
    //this.drag.stage.addChild(this.dragPoligon1);
    this.container1.addChild(this.dragPoligon1);
    this.img1.mask = this.dragPoligon1;
    this.drag.stage.addChild(this.container1);
    


    this.img2 = PIXI.Sprite.from(this.el.getAttribute('data-img-right'));
    this.img2.width = this.el.clientWidth;
    this.img2.height = this.el.clientHeight;
    this.img2.x  = 0;
    this.img2.y  = 0;
    //this.drag.stage.addChild(this.img2);
    this.container2.addChild(this.img2);
    
    const dragPoligonPath2 = [((this.drag.renderer.width / 2) - (this.drag.renderer.width / 2)/2.95), this.drag.renderer.height, ((this.drag.renderer.width / 2) + (this.drag.renderer.width / 2)/2.95), 0, (this.drag.renderer.width * 2), 0, (this.drag.renderer.width * 2), this.drag.renderer.height];

    this.dragPoligon2 = new PIXI.Graphics()
    .lineStyle(0)
    .beginFill(0xFFFFFF, 1)
    .drawPolygon(dragPoligonPath2)
    .endFill();
    this.container2.addChild(this.dragPoligon2);
    this.img2.mask = this.dragPoligon2;
    this.drag.stage.addChild(this.container2);

    
    this.patPoligon1 = this.dragPoligon1.clone();
    this.pat1.mask = this.patPoligon1;
    this.patPoligon2 = this.dragPoligon2.clone();
    this.pat2.mask = this.patPoligon2;


    this.dragMove = false;
    this.dragx = 0;
    this.dragDone = false;

    
    
    
    this.dragControl = function(e){
      if(that.drag.dragMove){
        let limit = (that.drag.el.clientWidth / 2) / 3;        
        let x = e.clientX - that.drag.dragx;
        if(x < 0 && x > -limit){
          TweenMax.to(that.drag.container1, 0, {x:x});
          TweenMax.to(that.drag.container2, 0, {x:0});
          TweenMax.to('[data-action="homepage-drag"]', 0, {x:x});
        }else if(x > 0 && x < limit){
          TweenMax.to(that.drag.container1, 0, {x:0});
          TweenMax.to(that.drag.container2, 0, {x:x});
          TweenMax.to('[data-action="homepage-drag"]', 0, {x:x});
        }else if(x < -limit || x > limit){
          that.drag.dragMove = false;
          that.drag.dragDone = true;          
          if(x < -limit){            
            TweenMax.to(that.drag.container1, 1.2, {x:- that.drag.el.clientWidth, ease: Power2.easeInOut});
            TweenMax.to(that.drag.container2, 0, {x:0});
          }else if(x > limit){
            TweenMax.to(that.drag.container1, 0, {x:0});
            TweenMax.to(that.drag.container2, 1.2, {x: that.drag.el.clientWidth, ease: Power2.easeInOut});
            
          }
        }
      }
    }
  }  
  
  
  
  // End Drag Slider

  this.resizeHomepage = function(e){
    that.hero.heroBgCover();
    that.hero.hero.renderer.resize(that.hero.el.clientWidth, that.hero.el.clientHeight);
    that.hero.bg.width = that.hero.heroBgWidth;
    that.hero.bg.height = that.hero.heroBgHeight;
    that.hero.bg.x  = that.hero.heroBgLeft;
    that.hero.bg.y  = that.hero.heroBgTop;
    that.hero.displacementSprite.width = that.hero.hero.renderer.width / 2;
    that.hero.displacementSprite.height = that.hero.hero.renderer.height / 2;

    
    that.drag.drag.renderer.resize(that.drag.el.clientWidth, that.drag.el.clientHeight);
    that.drag.img1.width = that.drag.el.clientWidth;
    that.drag.img1.height = that.drag.el.clientHeight;
    that.drag.img2.width = that.drag.el.clientWidth;
    that.drag.img2.height = that.drag.el.clientHeight;
    that.drag.pat1.width = that.drag.el.clientWidth;
    that.drag.pat1.height = that.drag.el.clientHeight;
    that.drag.pat2.width = that.drag.el.clientWidth;
    that.drag.pat2.height = that.drag.el.clientHeight;

    const dragPoligonPath1 = [0, that.drag.drag.renderer.height, 0, 0, ((that.drag.drag.renderer.width / 2) + (that.drag.drag.renderer.width / 2)/2.95), 0, ((that.drag.drag.renderer.width / 2) - (that.drag.drag.renderer.width / 2)/2.95), that.drag.drag.renderer.height];    
    that.drag.dragPoligon1.clear();
    that.drag.dragPoligon1 = new PIXI.Graphics()
    .lineStyle(0)
    .beginFill(0xFFFFFF, 1)
    .drawPolygon(dragPoligonPath1)
    .endFill();
    that.drag.container1.addChild(that.drag.dragPoligon1);
    that.drag.img1.mask = that.drag.dragPoligon1;

    const dragPoligonPath2 = [((that.drag.drag.renderer.width / 2) - (that.drag.drag.renderer.width / 2)/2.95), that.drag.drag.renderer.height, ((that.drag.drag.renderer.width / 2) + (that.drag.drag.renderer.width / 2)/2.95), 0, (that.drag.drag.renderer.width * 2), 0, (that.drag.drag.renderer.width * 2), that.drag.drag.renderer.height];
    that.drag.dragPoligon2.clear();
    that.drag.dragPoligon2 = new PIXI.Graphics()
    .lineStyle(0)
    .beginFill(0xFFFFFF, 1)
    .drawPolygon(dragPoligonPath2)
    .endFill();
    that.drag.container2.addChild(that.drag.dragPoligon2);
    that.drag.img2.mask = that.drag.dragPoligon2;

    that.drag.patPoligon1.clear();
    that.drag.patPoligon1 = that.drag.dragPoligon1.clone();
    that.drag.pat1.mask = that.drag.patPoligon1;
    that.drag.patPoligon2.clear();
    that.drag.patPoligon2 = that.drag.dragPoligon2.clone();
    that.drag.pat2.mask = that.drag.patPoligon2;
  }



  this.eventsInit = function(){
    window.addEventListener('scroll', function(e){
      let scrollTop = window.pageYOffset;
      header(e);
      if(scrollTop > (window.innerHeight)){
        app.homepage.hero.resours.source.pause();
      }else{
        app.homepage.hero.resours.source.play();
      }
    });
    // document.body.addEventListener('mousemove', function(e){
    //   TweenMax.set('.cursor', {x : (e.clientX - 35), y : (e.clientY - 35)});
    // });    
    document.querySelectorAll('[data-action="submenu"]').forEach(function(el, i){
      el.addEventListener('mouseenter', header);
      el.addEventListener('mouseleave', header);      
    });
    document.querySelectorAll('.take-button, .form--submit button').forEach(function(el, i){
      el.addEventListener('mouseenter', function(e){
        console.log(this);
        TweenMax.to(this, 0.5, {color: '#fff', ease: Power2.easeOut});
        TweenMax.to(this.querySelector('i'), 0.5, {y:5, height: '40px', ease: Power2.easeOut});
      });
    });
    document.querySelectorAll('.take-button, .form--submit button').forEach(function(el, i){
      el.addEventListener('mouseleave', function(e){
        TweenMax.to(this, 0.5, {color: function(){
          return document.querySelector('header').classList.contains('fixed') ? '#2f2f2f':'#ffffff';
        }, ease: Power2.easeOut});
        TweenMax.to(this.querySelector('i'), 0.5, {y:0, height: '1px', ease: Power2.easeOut});
      });
    });
    
    document.querySelector('[data-action="homepage-drag"]').addEventListener('mousedown', function (e) {
      that.drag.dragMove = true;
      that.drag.dragx = e.clientX;    
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
    });
    document.querySelector('[data-action="homepage-hero-play"]').addEventListener('mouseleave', function(e){
      TweenMax.to(this.querySelector('i'), 0.5, {scale: 0, ease: Power3.easeIn});
      TweenMax.to(this.querySelector('.icon'), 0.5, {fill: '#ee412a', ease: Power3.easeIn});
    });

    document.querySelector('[data-action="homepage-close-video"]').addEventListener('mouseenter', function(e){
      TweenMax.to(this.querySelector('i'), 0.5, {scale: 1, ease: Power3.easeOut});
      TweenMax.to(this.querySelector('.icon'), 0.5, {fill: '#fff', ease: Power3.easeOut});
    });
    document.querySelector('[data-action="homepage-close-video"]').addEventListener('mouseleave', function(e){      
      TweenMax.to(this.querySelector('i'), 0.5, {scale: 0, ease: Power3.easeIn});
      TweenMax.to(this.querySelector('.icon'), 0.5, {fill: '#ee412a', ease: Power3.easeIn});
    });

    document.querySelector('[data-action="homepage-drag"]').addEventListener('mouseenter', function(e){
      TweenMax.to(this.querySelector('i'), 0.5, {scale: 1, ease: Power3.easeOut});
      TweenMax.to(document.querySelector('.homepage__drag_dots'), 0.8, {scaleX: 1, ease: Power4.easeOut});
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
    });
    return;
    window.addEventListener('resize', this.resizeHomepage);
    
    document.querySelector('[data-action="learn-more"]').addEventListener('mouseenter', function(e){
      TweenMax.to(this.querySelector('i'), 0.5, {scale: 1, ease: Power3.easeOut});      
    });
    document.querySelector('[data-action="learn-more"]').addEventListener('mouseleave', function(e){
      TweenMax.to(this.querySelector('i'), 0.5, {scale: 0, ease: Power3.easeIn});      
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

  // Start Tabs render

  this.tabs = {
    active: false,
    diskTextAnim: null,
    init: function(){
      let that = this;
      this.render();
      document.querySelectorAll('.homepage__tabs_list span').forEach(function(el, i){        
        el.addEventListener('click', function(e){
          that.onActive(e);
        });
        el.addEventListener('mouseenter', function(e){
          that.onHover(e);
        });
        el.addEventListener('mouseleave', function(e){
          that.onHover(e);
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
    }    
  }  
  // End Tabs render

  // Start Form render
  function formRender(){
    document.querySelectorAll('.form-control').forEach(function(el, i){
      let b = document.createElement('i');    
      el.appendChild(b);
    })
  }
  // End Form render

  
}


//app.init();


window.onload = function(){
  setTimeout(function(){
    app.homepage = new _homepage();
  }, 100);
}











