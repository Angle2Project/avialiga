
const app = {
  lastScrollTop: 0,
  init: function(){    
    window.addEventListener('scroll', function(e){
      //header(e);
    });    
    document.querySelectorAll('[data-action="submenu"]').forEach(function(el, i){
      el.addEventListener('mouseenter', header);
      el.addEventListener('mouseleave', header);      
    })
  }  
}


function header(e){
  console.log(e.type);
  if(e.type == 'mouseenter'){
    document.querySelector('header').classList.add('sub-active');
  }else if(e.type == 'mouseleave'){
    document.querySelector('header').classList.remove('sub-active');
  }else if(e.type == 'scroll'){
    let scrollTop = window.pageYOffset;
    if(scrollTop > window.innerHeight){
      document.querySelector('header').classList.add('fixed');
    }else{
      document.querySelector('header').classList.remove('fixed');
    }
    let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > app.lastScrollTop){
      // downscroll code
      console.log('downscroll');
    } else {
      
      console.log('upscroll');
      // upscroll code
    }
    app.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }
  
}





// Homepage init
const _homepage = function(page){
  let that = this;

  
   

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
  })

  // Start Hero background
   function heroRender(){
    let that = this;
    this.heroBgCover = function(){
      if(document.body.clientWidth / window.innerHeight > 1.5){
        this.heroBgWidth = document.body.clientWidth;
        this.heroBgHeight = document.body.clientWidth / 1.5;
        this.heroBgTop = -((document.body.clientWidth / 1.5) - window.innerHeight) / 2;
        this.heroBgLeft = 0;
      }else{
        this.heroBgWidth = window.innerHeight*1.5;
        this.heroBgHeight = window.innerHeight;
        this.heroBgTop = 0;
        this.heroBgLeft = -((window.innerHeight * 1.5) - document.body.clientWidth) / 2;
      }
    };
    this.heroBgCover();
    this.el = document.querySelector('.homepage__hero');
    this.hero = new PIXI.Application({
      width: this.el.clientWidth,
      height: this.el.clientHeight,
    });  
    this.el.appendChild(this.hero.view);
    

    this.hero.stage.interactive = true;
    this.video = PIXI.Texture.from('./img/home.mp4');  
    this.video.baseTexture.source.loop = true;
    this.video.baseTexture.source.autoplay = true;  
    this.video.baseTexture.source.muted = true;  
    
    this.bg = new PIXI.Sprite(this.video);
    this.bg.width = this.heroBgWidth;
    this.bg.height = this.heroBgHeight;
    this.bg.x  = this.heroBgLeft;
    this.bg.y  = this.heroBgTop;
    this.hero.stage.addChild(this.bg);

    this.displacementSprite = PIXI.Sprite.from('./img/displacement.png');
    this.displacementSprite.width = document.body.clientWidth / 2;
    this.displacementSprite.height = document.body.clientWidth / 2;
    this.displacementSprite.anchor.set(0.5);
    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
    this.displacementFilter.scale.x = 40;
    this.displacementFilter.scale.y = 40;
    this.hero.stage.addChild(this.displacementSprite);  
    this.bg.filters = [this.displacementFilter];
    function onPointerMove(eventData) {    
      TweenMax.to(that.displacementSprite, 1.5, {x:eventData.data.global.x - 25, y: eventData.data.global.y});
    }  
    this.hero.stage
      .on('mousemove', onPointerMove)
      .on('touchmove', onPointerMove);      
  }    
  // End Hero background

  // Start Drag Slider
  function dragRender(){    
    this.el = document.querySelector('.homepage__drag');
    this.drag = new PIXI.Application({
      width: this.el.clientWidth,
      height: this.el.clientHeight,
    });  
    this.el.appendChild(this.drag.view);
    this.container1 = new PIXI.Container();
    this.container2 = new PIXI.Container();
    

    this.pat1 = PIXI.Sprite.from('./img/'+this.el.getAttribute('data-pat-left'));
    this.pat1.width = this.el.clientWidth;
    this.pat1.height = this.el.clientHeight;
    this.pat1.x  = 0;
    this.pat1.y  = 0;    
    this.drag.stage.addChild(this.pat1);    

    this.pat2 = PIXI.Sprite.from('./img/'+this.el.getAttribute('data-pat-right'));
    this.pat2.width = this.el.clientWidth;
    this.pat2.height = this.el.clientHeight;
    this.pat2.x  = 0;
    this.pat2.y  = 0;    
    this.drag.stage.addChild(this.pat2);
      
    this.img1 = PIXI.Sprite.from('./img/'+this.el.getAttribute('data-img-left'));
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
    


    this.img2 = PIXI.Sprite.from('./img/'+this.el.getAttribute('data-img-right'));
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
          console.log()
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
  window.addEventListener('resize', this.resizeHomepage);
  document.querySelector('[data-action="homepage-drag"]').addEventListener('mousedown', function (e) {
    that.drag.dragMove = true;
    that.drag.dragx = e.clientX;    
  });
  document.querySelector('[data-action="homepage-drag"]').addEventListener('mouseup', function(e){
    if(!that.drag.dragDone){
      that.drag.dragMove = false;
      that.drag.dragx = 0;
      TweenMax.to('[data-action="homepage-drag"]', 0.5, {x:0, ease: Power2.easeOut});
      TweenMax.to([that.drag.container1, that.drag.container2], 0.5, {x:0, ease: Power2.easeOut});
    }    
  });  
  document.querySelector('.homepage__drag').addEventListener('mousemove', that.drag.dragControl);
  document.querySelector('.homepage__drag .button-circle').addEventListener('mouseenter', function(e){  
    document.querySelector('.homepage__drag .homepage__drag_dots').classList.add('active');
  });
  document.querySelector('.homepage__drag .button-circle').addEventListener('mouseleave', function(e){  
    document.querySelector('.homepage__drag .homepage__drag_dots').classList.remove('active');
  });
}


this.hero = new heroRender();
this.drag = new dragRender();
buttonsRender();
formRender()
this.eventsInit();
  



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
    var deg = 100 / splitTop.chars.length, origin = 0, radius = 75;
    for(var i in splitTop.chars){
      splitTop.chars[i].style.height = radius+'px';
      if(splitTop.chars[i].innerText.toLowerCase() == 'i'){
        splitTop.chars[i].style.transform = 'rotate('+(origin+2)+'deg)';
      }else if(splitTop.chars[i].innerText.toLowerCase() == 'r'){
        splitTop.chars[i].style.transform = 'rotate('+(origin+2)+'deg)';
      }else if(splitTop.chars[i].innerText.toLowerCase() == 'o'){
        splitTop.chars[i].style.transform = 'rotate('+(origin+2)+'deg)';      
      } else{
        splitTop.chars[i].style.transform = 'rotate('+(origin)+'deg)';
      }        
      origin += deg;
    }   
    origin = 180;    
    for(var i in splitBot.chars){
      splitBot.chars[i].style.height = radius+'px';
      if(splitBot.chars[i].innerText.toLowerCase() == 'i'){
        splitBot.chars[i].style.transform = 'rotate('+(origin+2)+'deg)';
      }else if(splitBot.chars[i].innerText.toLowerCase() == 'r'){
        splitBot.chars[i].style.transform = 'rotate('+(origin+2)+'deg)';
      }else if(splitBot.chars[i].innerText.toLowerCase() == 'o'){
        splitBot.chars[i].style.transform = 'rotate('+(origin+2)+'deg)';      
      } else{
        splitBot.chars[i].style.transform = 'rotate('+(origin)+'deg)';
      }
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
      var deg = 80 / splitTop.chars.length, origin = 0, radius = 75;
      for(var i in splitTop.chars){
        splitTop.chars[i].style.height = radius+'px';
        if(splitTop.chars[i].innerText.toLowerCase() == 'i'){
          splitTop.chars[i].style.transform = 'rotate('+(origin+2)+'deg)';
        }else if(splitTop.chars[i].innerText.toLowerCase() == 'r'){
          splitTop.chars[i].style.transform = 'rotate('+(origin+2)+'deg)';
        }else if(splitTop.chars[i].innerText.toLowerCase() == 'o'){
          splitTop.chars[i].style.transform = 'rotate('+(origin+2)+'deg)';      
        } else{
          splitTop.chars[i].style.transform = 'rotate('+(origin)+'deg)';
        }        
        origin += deg;
      }   
      origin = 180;    
      for(var i in splitBot.chars){
        splitBot.chars[i].style.height = radius+'px';
        if(splitBot.chars[i].innerText.toLowerCase() == 'i'){
          splitBot.chars[i].style.transform = 'rotate('+(origin+2)+'deg)';
        }else if(splitBot.chars[i].innerText.toLowerCase() == 'r'){
          splitBot.chars[i].style.transform = 'rotate('+(origin+2)+'deg)';
        }else if(splitBot.chars[i].innerText.toLowerCase() == 'o'){
          splitBot.chars[i].style.transform = 'rotate('+(origin+2)+'deg)';      
        } else{
          splitBot.chars[i].style.transform = 'rotate('+(origin)+'deg)';
        }
        origin += deg;
      }
    }
  });
} 
// End Buttons render

function formRender(){
  document.querySelectorAll('.form-control').forEach(function(el, i){
    let b = document.createElement('i');    
    el.appendChild(b);
  })
}






app.init();
app.homepage = new _homepage();