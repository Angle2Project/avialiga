Element.prototype.closest||(Element.prototype.closest=function(e){for(var t=this;t;){if(t.matches(e))return t;t=t.parentElement}return null});const app={lastScrollTop:0,init:function(){window.addEventListener("scroll",function(e){header(e)}),document.querySelectorAll('[data-action="submenu"]').forEach(function(e,t){e.addEventListener("mouseenter",header),e.addEventListener("mouseleave",header)}),document.querySelector(".take-button").addEventListener("mouseenter",function(e){TweenMax.to(this,.5,{color:"#fff",ease:Power2.easeOut}),TweenMax.to(this.querySelector("i"),.5,{y:5,height:"40px",ease:Power2.easeOut})}),document.querySelector(".take-button").addEventListener("mouseleave",function(e){TweenMax.to(this,.5,{color:function(){return document.querySelector("header").classList.contains("fixed")?"#2f2f2f":"#ffffff"},ease:Power2.easeOut}),TweenMax.to(this.querySelector("i"),.5,{y:0,height:"1px",ease:Power2.easeOut})})}};function header(e){if("mouseenter"==e.type){this.classList.add("active"),(new TimelineMax).to(this.querySelector("a"),.6,{color:"#ee412a"},"start").to(this.querySelector(".icon"),.6,{fill:"#ee412a",rotation:180},"start").to(document.querySelectorAll(".header__nav_link:not(.active) > a, .header__right a"),.6,{color:"#2f2f2f",ease:Power0.easeNone},"start").to(document.querySelectorAll(".header__nav_link:not(.active) > a .icon, .header__right .icon"),.6,{fill:"#2f2f2f",ease:Power0.easeNone},"start").to(".header__bg",.5,{opacity:1,ease:Power0.easeNone},"start").to(".header__logo .logo--white",.5,{opacity:0},"start").to(".header__logo .logo--black",.5,{opacity:1},"start").to(this.querySelector(".submenu"),.5,{autoAlpha:1,ease:Power0.easeNone},"start").fromTo(this.querySelectorAll(".submenu .row"),.8,{opacity:0,y:-20},{opacity:1,y:0,ease:Power2.easeOut},"start")}else if("mouseleave"==e.type){this.classList.remove("active"),(new TimelineMax).to(document.querySelectorAll(".header__nav_link > a, .header__right a"),.6,{color:function(){return document.querySelector("header").classList.contains("fixed")?"#2f2f2f":"#ffffff"},ease:Power0.easeNone},"start").to(document.querySelectorAll(".header__nav_link > a .icon, .header__right .icon"),.6,{fill:function(){return document.querySelector("header").classList.contains("fixed")?"#2f2f2f":"#ffffff"},rotation:0,ease:Power0.easeNone},"start").to(".header__bg",.5,{opacity:0,ease:Power0.easeNone},"start").to(".header__logo .logo--white",.5,{opacity:1},"start").to(".header__logo .logo--black",.5,{opacity:0},"start").to(this.querySelector(".submenu"),.5,{autoAlpha:0,ease:Power0.easeNone},"start").to(this.querySelectorAll(".submenu .row"),.5,{opacity:0,y:20,ease:Power2.easeOut},"-=0.5")}else if("scroll"==e.type){let e=window.pageYOffset;if(e>window.innerHeight/2)if(document.querySelector("header").classList.add("fixed"),TweenMax.set(document.querySelectorAll(".header__nav_link:not(.active) > a, .header__right a"),{clearProps:"all"}),TweenMax.set(document.querySelectorAll(".header__nav_link:not(.active) > a .icon, .header__right .icon"),{clearProps:"all"}),e>window.innerHeight){let e=window.pageYOffset||document.documentElement.scrollTop;e>app.lastScrollTop?TweenMax.to("header",.7,{y:0,ease:Power3.easeOut}):TweenMax.to("header",.7,{y:100,ease:Power3.easeOut}),app.lastScrollTop=e<=0?0:e}else TweenMax.to("header",.4,{y:0,ease:Power1.easeOut,onComplete:function(){TweenMax.set("header",{clearProps:"all"})}});else document.querySelector("header").classList.remove("fixed")}}const _homepage=function(e){let t=this;function o(){let e=this;this.heroBgCover=function(){let e=this.resours.width/this.resours.height;document.body.clientWidth/window.innerHeight>e?(this.heroBgWidth=document.body.clientWidth,this.heroBgHeight=document.body.clientWidth/e,this.heroBgTop=-(document.body.clientWidth/e-window.innerHeight)/2,this.heroBgLeft=0):(this.heroBgWidth=window.innerHeight*e,this.heroBgHeight=window.innerHeight,this.heroBgTop=0,this.heroBgLeft=-(window.innerHeight*e-document.body.clientWidth)/2)},this.el=document.querySelector(".homepage__hero"),this.hero=new PIXI.Application({width:this.el.clientWidth,height:this.el.clientHeight,forceFXAA:!0,clearBeforeRender:!1}),this.el.appendChild(this.hero.view),this.hero.stage.interactive=!0;const t=PIXI.Loader.shared;t.add("baseTexture",app.homepage.blobs.heroBg).add("displacementSprite","./img/displacement.png"),t.load(function(t,o){let a=document.createElement("video");a.src=o.baseTexture.url,e.resours=new PIXI.resources.VideoResource(a,{autoPlay:!1,autoUpdate:!1,updateFPS:30,width:100,height:100}),e.resours.source.setAttribute("playsinline",""),e.resours.source.loop=!0,e.resours.source.autoplay=!0,e.resours.source.muted=!0,e.baseTexture=new PIXI.BaseTexture(e.resours),e.ratio=e.baseTexture.realWidth/e.baseTexture.realWidth,e.texture=new PIXI.Texture(e.baseTexture),e.bg=new PIXI.Sprite(e.texture),e.hero.stage.addChild(e.bg),e.displacementSprite=new PIXI.Sprite(o.displacementSprite.texture),e.displacementSprite.width=document.body.clientWidth/2,e.displacementSprite.height=document.body.clientWidth/2,e.displacementSprite.anchor.set(.5),e.displacementFilter=new PIXI.filters.DisplacementFilter(e.displacementSprite),e.displacementFilter.scale.x=50,e.displacementFilter.scale.y=50,e.hero.stage.addChild(e.displacementSprite),e.bg.filters=[e.displacementFilter],e.el.addEventListener("mousemove",function(t){TweenMax.to(e.displacementSprite,1.5,{x:t.clientX-25,y:t.clientY})}),TweenMax.to(e.displacementSprite,12,{rotation:6.28319,ease:Power0.easeNone,repeat:-1,onUpdate:function(){}})})}function a(){let e,t=this;this.el=document.querySelector(".homepage__drag"),this.canv1=document.createElement("canvas"),this.canv1.className="pats",this.ctx1=this.canv1.getContext("2d"),this.canv2=document.createElement("canvas"),this.canv2.className="leisure",this.ctx2=this.canv2.getContext("2d"),this.canv3=document.createElement("canvas"),this.canv3.className="business",this.ctx3=this.canv3.getContext("2d"),this.el.appendChild(this.canv1),this.el.appendChild(this.canv2),this.el.appendChild(this.canv3),this.pat1=new Image,this.pat1.src=this.el.getAttribute("data-pat-left"),this.pat1.onload=function(){e=this.width/this.height,t.canv1.width=t.el.clientWidth,t.canv1.height=t.el.clientWidth/e,t.ctx1.save(),t.ctx1.beginPath(),t.ctx1.moveTo(0,0),t.ctx1.lineTo(t.el.clientWidth/2+t.el.clientWidth/2/2.92,0),t.ctx1.lineTo(t.el.clientWidth/2-t.el.clientWidth/2/2.92,t.el.clientHeight),t.ctx1.lineTo(0,t.el.clientHeight),t.ctx1.lineTo(0,0),t.ctx1.closePath(),t.ctx1.clip(),t.ctx1.drawImage(t.pat1,0,0,t.el.clientWidth,t.el.clientHeight),t.ctx1.restore()},this.pat2=new Image,this.pat2.src=this.el.getAttribute("data-pat-right"),this.pat2.onload=function(){t.ctx1.save(),t.ctx1.beginPath(),t.ctx1.moveTo(t.el.clientWidth/2+t.el.clientWidth/2/2.92,0),t.ctx1.lineTo(t.el.clientWidth,0),t.ctx1.lineTo(t.el.clientWidth,t.el.clientHeight),t.ctx1.lineTo(t.el.clientWidth/2-t.el.clientWidth/2/2.92,t.el.clientHeight),t.ctx1.lineTo(t.el.clientWidth/2+t.el.clientWidth/2/2.92,0),t.ctx1.closePath(),t.ctx1.clip(),t.ctx1.drawImage(t.pat2,0,0,t.el.clientWidth,t.el.clientHeight),t.ctx1.restore()},this.img1=new Image,this.img1.src=this.el.getAttribute("data-img-left"),this.img1.onload=function(){e=this.width/this.height,t.canv2.width=t.el.clientWidth,t.canv2.height=t.el.clientWidth/e,t.ctx2.save(),t.ctx2.beginPath(),t.ctx2.moveTo(0,0),t.ctx2.lineTo(t.el.clientWidth/2+t.el.clientWidth/2/2.92,0),t.ctx2.lineTo(t.el.clientWidth/2-t.el.clientWidth/2/2.92,t.el.clientHeight),t.ctx2.lineTo(0,t.el.clientHeight),t.ctx2.lineTo(0,0),t.ctx2.closePath(),t.ctx2.clip(),t.ctx2.drawImage(t.img1,0,0,t.el.clientWidth,t.el.clientHeight),t.ctx2.restore()},this.img2=new Image,this.img2.src=this.el.getAttribute("data-img-right"),this.img2.onload=function(){e=this.width/this.height,t.canv3.width=t.el.clientWidth,t.canv3.height=t.el.clientWidth/e,t.ctx3.save(),t.ctx3.beginPath(),t.ctx3.moveTo(t.el.clientWidth/2+t.el.clientWidth/2/2.92,0),t.ctx3.lineTo(t.el.clientWidth,0),t.ctx3.lineTo(t.el.clientWidth,t.el.clientHeight),t.ctx3.lineTo(t.el.clientWidth/2-t.el.clientWidth/2/2.92,t.el.clientHeight),t.ctx3.lineTo(t.el.clientWidth/2+t.el.clientWidth/2/2.92,0),t.ctx3.closePath(),t.ctx3.clip(),t.ctx3.drawImage(t.img2,0,0,t.el.clientWidth,t.el.clientHeight),t.ctx3.restore()},this.dragMove=!1,this.dragx=0,this.dragDone=!1,this.dragControl=function(e){if(t.dragMove){let o=t.el.clientWidth/2/3,a=e.clientX-t.dragx;a<0&&a>-o?(TweenMax.to(document.querySelector("canvas.leisure"),0,{x:a}),TweenMax.to(document.querySelector("canvas.business"),0,{x:0}),TweenMax.to('[data-action="homepage-drag"]',0,{x:a})):a>0&&a<o?(TweenMax.to(document.querySelector("canvas.leisure"),0,{x:0}),TweenMax.to(document.querySelector("canvas.business"),0,{x:a}),TweenMax.to('[data-action="homepage-drag"]',0,{x:a})):(a<-o||a>o)&&(t.dragMove=!1,t.dragDone=!0,a<-o?(TweenMax.to(document.querySelector("canvas.leisure"),1.2,{x:-t.el.clientWidth,ease:Power2.easeInOut}),TweenMax.to(document.querySelector("canvas.business"),0,{x:0})):a>o&&(TweenMax.to(document.querySelector("canvas.leisure"),0,{x:0}),TweenMax.to(document.querySelector("canvas.business"),1.2,{x:t.el.clientWidth,ease:Power2.easeInOut})))}}}this.play=!0,this.blobs={heroBg:null,heroVideo:null},this.heroVideo={video:document.querySelector(".homepage__hero .hero--player video"),controls:document.querySelector(".homepage__hero .hero--player .player--controls"),interval:null,active:!1,loaded:!1,play:function(){let e=this;e.video.play(),this.interval=setInterval(function(){e.controls.querySelector('[data-time="current"]').innerText=e.time().current,e.bar()},1e3)},pause:function(){this.video.pause()},time:function(){return{current:(Math.round(this.video.currentTime/60)<10?"0"+Math.round(this.video.currentTime/60):Math.round(this.video.currentTime/60))+":"+(Math.round(this.video.currentTime%60)<10?"0"+Math.round(this.video.currentTime%60):Math.round(this.video.currentTime%60)),duration:(Math.round(this.video.duration/60)<10?"0"+Math.round(this.video.duration/60):Math.round(this.video.duration/60))+":"+(Math.round(this.video.duration%60)<10?"0"+Math.round(this.video.duration%60):Math.round(this.video.duration%60))}},bar:function(){return 100/(this.video.duration/this.video.currentTime)},init:function(){let e=this,t=document.querySelector(".hero--player video").getAttribute("data-src");document.querySelector(".hero--player video").src=app.homepage.blobs.heroVideo||t,this.video.addEventListener("click",function(t){this.paused?(e.play(),TweenMax.to(".cursor i.pause",.3,{scale:1,ease:Power2.easeInOut}),TweenMax.to(".cursor i.play",.3,{scale:0,ease:Power2.easeInOut})):(e.pause(),TweenMax.to(".cursor i.pause",.3,{scale:0,ease:Power2.easeInOut}),TweenMax.to(".cursor i.play",.3,{scale:1,ease:Power2.easeInOut}))}),this.video.addEventListener("loadedmetadata",function(t){e.controls.querySelector('[data-time="all"]').innerText=e.time().duration}),this.video.addEventListener("timeupdate",function(t){TweenMax.set(".player--controls .controls--bar i",{width:e.bar()+"%"})}),document.querySelector('[data-action="homepage-hero-play"]').addEventListener("click",function(t){e.video.play(),app.homepage.heroVideo.active=!0;let o=new TimelineMax,a=[].slice.call(document.querySelectorAll(".homepage__hero h1 span"),0).reverse();o.to('[data-action="homepage-hero-play"]',.3,{scale:0,ease:Power2.easeIn},"cursor").to(".cursor span",.6,{scale:1.4},"cursor").to(".cursor i.circle",.6,{scale:0},"cursor").to(".cursor i.pause",.6,{scale:1},"cursor").staggerTo(a,.5,{rotationX:90,opacity:0,ease:Power2.easeIn},.05,"-=0.3").to("header",.5,{opacity:0},"-=0.3").to(".homepage__hero_footer",.5,{opacity:0},"-=0.3").add(function(){}).set("body",{overflow:"hidden"}).to(".hero--player",.5,{autoAlpha:1}).fromTo('[data-action="homepage-close-video"]',.5,{scale:1.4,opacity:0},{scale:1,opacity:1}).add(function(){app.homepage.hero.resours.source.pause()})}),document.querySelector('[data-action="homepage-close-video"]').addEventListener("click",function(t){app.homepage.heroVideo.active=!1;let o=new TimelineMax;[].slice.call(document.querySelectorAll(".homepage__hero h1 span"),0).reverse();e.video.pause(),app.homepage.hero.resours.source.play(),o.to(".cursor span",.6,{scale:1},"cursor").to(".cursor i.circle",.6,{scale:1},"cursor").to(".cursor i.pause",.6,{scale:0},"cursor").to(".cursor i.play",.6,{scale:0},"cursor").to('[data-action="homepage-close-video"]',.5,{scale:0,ease:Power2.easeIn},"cursor").to(".hero--player",.5,{autoAlpha:0}).set("body",{overflow:"auto"}).staggerFromTo(document.querySelectorAll(".homepage__hero h1 span"),.8,{rotationX:90,opacity:0},{rotationX:0,opacity:1,ease:Power2.easeOut},.1,"-=0.3").to("header",.5,{opacity:1},"-=0.3").to(".homepage__hero_footer",.5,{opacity:1},"-=0.3").to('[data-action="homepage-hero-play"]',.3,{scale:1},"-=0.3").add(function(){e.video.currentTime=0})})}},this.loader={progress:0,resources:1,resourcesDone:0,next:0,step:0,tl:new TimelineMax,path:["M150.2,68.6l-74.9,9.6l-25.2-11l23.5,7L150.2,68.6z","M137.1,117l-60-39.9L49.6,66.6l25.7,6.5L137.1,117z","M73.6,150l3.9-72.9L49.7,66.5l26.1,6.6L73.6,150z","M20.4,126.4l57.1-49.1L50.1,65.3l25.7,7.9L20.4,126.4z","M0,82.2l78-3.1l-29.4-6.5l27.6,2.5L0,82.2z","M52.5,36.1l47.7,64.2l-50.4,1.2l43.4-4.2L52.5,36.1z","M70,85.5l-11-36h12c0,0,7.7-1,15,8c7.3,9,35,43,35,43l-92-2l85-1l-33-40c0,0-4.4-5-10-5c-5.6,0-9,0-9,0L70,85.5z"],init:function(){let e=this;this.resources+=document.querySelectorAll("script[data-src]").length+document.querySelectorAll("img").length+document.querySelectorAll("[data-background]").length+document.querySelectorAll("[data-displacement]").length+document.querySelectorAll("[data-pat-left]").length+document.querySelectorAll("[data-pat-right]").length+document.querySelectorAll("[data-img-left]").length+document.querySelectorAll("[data-img-right]").length,document.querySelectorAll("script[data-src]").forEach(function(t,o){let a=t.getAttribute("data-src");var r=document.createElement("script");r.src=a,document.head.appendChild(r),r.onload=function(){e.resourcesDone++,e.loading()}}),document.querySelectorAll("img").forEach(function(t,o){let a=t.getAttribute("src");var r=new Image;r.src=a,r.onload=function(){e.resourcesDone++,e.loading()}}),document.querySelectorAll("[data-displacement]").forEach(function(t,o){let a=t.getAttribute("data-displacement");var r=new Image;r.src=a,r.onload=function(){e.resourcesDone++,e.loading()}}),document.querySelectorAll("[data-pat-left]").forEach(function(t,o){let a=t.getAttribute("data-pat-left");var r=new Image;r.src=a,r.onload=function(){e.resourcesDone++,e.loading()}}),document.querySelectorAll("[data-pat-right]").forEach(function(t,o){let a=t.getAttribute("data-pat-right");var r=new Image;r.src=a,r.onload=function(){e.resourcesDone++,e.loading()}}),document.querySelectorAll("[data-img-left]").forEach(function(t,o){let a=t.getAttribute("data-img-left");var r=new Image;r.src=a,r.onload=function(){e.resourcesDone++,e.loading()}}),document.querySelectorAll("[data-img-right]").forEach(function(t,o){let a=t.getAttribute("data-img-right");var r=new Image;r.src=a,r.onload=function(){e.resourcesDone++,e.loading()}}),document.querySelectorAll("[data-background]").forEach(function(t,o){let a=t.getAttribute("data-background");var r=new XMLHttpRequest;r.open("GET",a,!0),r.responseType="blob",r.onload=function(t){if(200==this.status){var o=this.response,a=(window.webkitURL||window.URL).createObjectURL(o);app.homepage.blobs.heroBg=a,e.resourcesDone++,e.loading()}},r.send()})},loading:function(){let e=this,t=(100/(this.resources/this.resourcesDone)).toFixed();this.path.length;Number(t),this.next,this.resources-this.resourcesDone==1?(document.querySelectorAll(".form-control").forEach(function(e,t){let o=document.createElement("i");e.appendChild(o)}),document.querySelectorAll(".button-circle").forEach(function(e,t){var o=e.getAttribute("data-text").replace(" ","&nbsp;"),a=document.createElement("div"),r=document.createElement("div"),i=document.createElement("div");a.className="text",r.className="top",i.className="bot",r.innerHTML=o,i.innerHTML=o;var n=new SplitText(r,{type:"chars"}),s=new SplitText(i,{type:"chars"});a.appendChild(r),a.appendChild(i),e.appendChild(a);var c=120/n.chars.length,l=0,d=75;for(var t in n.chars)n.chars[t].style.height=d+"px",n.chars[t].style.transform="rotate("+l+"deg)",l+=c;for(var t in l=180,s.chars)s.chars[t].style.height=d+"px",s.chars[t].style.transform="rotate("+l+"deg)",l+=c;if(e.getAttribute("data-hover")){var h=e.getAttribute("data-hover").replace(" ","&nbsp;"),a=document.createElement("div"),r=document.createElement("div"),i=document.createElement("div");a.className="hover",r.className="top",i.className="bot",r.innerHTML=h,i.innerHTML=h;var n=new SplitText(r,{type:"chars"}),s=new SplitText(i,{type:"chars"});a.appendChild(r),a.appendChild(i),e.appendChild(a);var c=100/n.chars.length,l=0,d=75;for(var t in n.chars)n.chars[t].style.height=d+"px",n.chars[t].style.transform="rotate("+l+"deg)",l+=c;for(var t in l=180,s.chars)s.chars[t].style.height=d+"px",s.chars[t].style.transform="rotate("+l+"deg)",l+=c}e.appendChild(document.createElement("i"))}),app.homepage.tabs.init(),app.homepage.cursor.init(),app.homepage.hero=new o,app.homepage.drag=new a,app.homepage.eventsInit(),TweenMax.to(this,1,{progress:100,onUpdate:function(){document.querySelector(".loader .progress").innerHTML=e.progress.toFixed()+"%"},ease:Power3.easeOut,onComplete:function(){this.mySwiper=new Swiper(".swiper-container",{speed:800,simulateTouch:!1,pagination:{el:".slider-pagination",type:"fraction"},navigation:{nextEl:".slider-button-next",prevEl:".slider-button-prev"}}),console.log(this.mySwiper),this.mySwiper.forEach(function(e,t){e.el.closest(".homepage__services")&&TweenMax.set(e.el.querySelector(".swiper-slide-active .slide--photo"),{scale:1.4}),e.on("slideChangeTransitionStart",function(){if(this.realIndex>this.previousIndex){(new TimelineMax).to(this.el.querySelector(".swiper-slide-prev .slide--photo img"),1.4,{scale:1.5},"start").to(this.el.querySelector(".swiper-slide-prev"),.4,{skewX:-30,scale:1.2,ease:Power1.easeIn,yoyo:!0,repeat:1},"start").fromTo(this.el.querySelector(".swiper-slide-active .slide--photo img"),1.4,{scale:1.5},{scale:1},"start").fromTo(this.el.querySelector(".swiper-slide-active"),.4,{skewX:0,scale:1},{skewX:-30,scale:1.2,ease:Power1.easeIn,yoyo:!0,repeat:1},"start")}else{(new TimelineMax).to(this.el.querySelector(".swiper-slide-next .slide--photo img"),1.4,{scale:1.5},"start").to(this.el.querySelector(".swiper-slide-next"),.4,{skewX:30,scale:1.2,ease:Power1.easeIn,yoyo:!0,repeat:1},"start").fromTo(this.el.querySelector(".swiper-slide-active .slide--photo img"),1.4,{scale:1.5},{scale:1},"start").fromTo(this.el.querySelector(".swiper-slide-active"),.4,{skewX:0,scale:1},{skewX:30,scale:1.2,ease:Power1.easeIn,yoyo:!0,repeat:1},"start")}console.log(this.el.classList)})});let t=setInterval(function(){if(app.homepage.hero.resours&&app.homepage.hero.resours.width>0){clearInterval(t),app.homepage.hero.heroBgCover(),app.homepage.hero.hero.renderer.resize(app.homepage.hero.el.clientWidth,app.homepage.hero.el.clientHeight),app.homepage.hero.bg.width=app.homepage.hero.heroBgWidth,app.homepage.hero.bg.height=app.homepage.hero.heroBgHeight,app.homepage.hero.bg.x=app.homepage.hero.heroBgLeft,app.homepage.hero.bg.y=app.homepage.hero.heroBgTop,app.homepage.hero.displacementSprite.width=app.homepage.hero.hero.renderer.width/2,app.homepage.hero.displacementSprite.height=app.homepage.hero.hero.renderer.width/2,app.homepage.hero.displacementSprite.x=app.homepage.hero.hero.renderer.width/2,app.homepage.hero.displacementSprite.y=app.homepage.hero.hero.renderer.height/2;var o=app.homepage.hero.resours.source.play();void 0!==o&&o.catch(e=>{console.log("error")}).then(()=>{app.homepage.hero.resours.source.play(),console.log("Ok")}),e.loaded(),AOS.init({offset:100,once:!0}),document.addEventListener("aos:in",function(e){e.detail.classList.contains("homepage__drag")&&(new TimelineMax).to([".homepage__drag .blind-left",".homepage__drag .blind-right"],.8,{scaleX:0,ease:Power2.easeIn}).staggerFrom(document.querySelectorAll(".homepage__drag canvas.leisure, .homepage__drag canvas.business"),1.6,{scale:1.4},.1,"-=0.8").staggerFrom(document.querySelectorAll(".homepage__drag h2 a"),1.5,{rotationX:90,opacity:0,ease:Power3.easeOut},.25,"-=0.8").from(".homepage__drag .button-circle",1,{scale:1.4,opacity:0,ease:Power2.easeOut},"-=1"),e.detail.classList.contains("homepage__feedback_slider")&&e.detail.classList.contains("leisure")&&(new TimelineMax).set(e.detail,{visibility:"visible"}).fromTo(e.detail.querySelector(".swiper-slide-active .slide--photo"),1.4,{x:"100%",scale:1.3,opacity:0},{x:"0%",scale:1,opacity:1,ease:Power4.easeOut},"start").fromTo(e.detail.querySelector(".swiper-slide-active .slide--photo"),1.4,{skewX:-30},{skewX:0,ease:Power4.easeOut},"start").fromTo(".homepage__feedback_slider.leisure h2 span",1,{opacity:0,rotationX:90},{opacity:1,rotationX:0,ease:Power2.easeOut},"-=0.7").fromTo(e.detail.querySelector(".swiper-slide-active .slide--text"),1,{opacity:0,y:"50%"},{opacity:1,y:"0%",ease:Power2.easeOut},"-=0.6").fromTo(".homepage__feedback_slider.leisure .slider-control",1,{opacity:0,scale:1.3},{opacity:1,scale:1,ease:Power2.easeOut},"-=0.6"),e.detail.classList.contains("homepage__feedback_slider")&&e.detail.classList.contains("business")&&(new TimelineMax).set(e.detail,{visibility:"visible"}).fromTo(e.detail.querySelector(".swiper-slide-active .slide--photo"),1.4,{x:"-100%",scale:1.3,opacity:0},{x:"0%",scale:1,opacity:1,ease:Power4.easeOut},"start").fromTo(e.detail.querySelector(".swiper-slide-active .slide--photo"),1.4,{skewX:30},{skewX:0,ease:Power4.easeOut},"start").fromTo(".homepage__feedback_slider.business h2 span",1,{opacity:0,rotationX:90},{opacity:1,rotationX:0,ease:Power2.easeOut},"-=0.7").fromTo(e.detail.querySelector(".swiper-slide-active .slide--text"),1,{opacity:0,y:"50%"},{opacity:1,y:"0%",ease:Power2.easeOut},"-=0.6").fromTo(".homepage__feedback_slider.business .slider-control",1,{opacity:0,scale:1.3},{opacity:1,scale:1,ease:Power2.easeOut},"-=0.6").fromTo(".homepage__feedback .button-circle",1,{opacity:0,scale:1.4},{opacity:1,scale:1,ease:Power2.easeOut},"-=1"),e.detail.classList.contains("homepage__services")&&(new TimelineMax).to(e.detail.querySelectorAll(".swiper-slide-active .slide--photo"),1.6,{scale:1}).staggerFrom(e.detail.querySelectorAll("h2"),1,{opacity:0,scale:1.3,ease:Power2.easeOut},.3,"-=1").staggerFrom(e.detail.querySelectorAll(".swiper-slide-active h3 a"),1.5,{rotationX:90,opacity:0,ease:Power3.easeOut},.3,"-=0.8").staggerFrom(e.detail.querySelectorAll(".slider-control"),1,{opacity:0,scale:1.4,ease:Power2.easeOut},.3,"-=1"),e.detail.classList.contains("homepage__tabs")&&(new TimelineMax).staggerTo(document.querySelectorAll(".homepage__tabs_list span"),2,{opacity:1},.1).add(function(){app.homepage.tabs.show=!0}),e.detail.classList.contains("leisure")&&e.detail.closest(".homepage__insta")&&TweenMax.fromTo(e.detail.querySelectorAll("h2 span"),1.5,{rotationX:90,opacity:0},{rotationX:0,opacity:1,ease:Power3.easeOut}),e.detail.classList.contains("business")&&e.detail.closest(".homepage__insta")&&TweenMax.fromTo(e.detail.querySelectorAll("h2 span"),1.5,{rotationX:90,opacity:0},{rotationX:0,opacity:1,ease:Power3.easeOut}),e.detail.classList.contains("homepage__form")&&TweenMax.fromTo(e.detail.querySelectorAll("h2 span"),1.5,{rotationX:90,opacity:0},{rotationX:0,opacity:1,ease:Power3.easeOut})})}},100)}})):TweenMax.to(this,1,{progress:t,onUpdate:function(){document.querySelector(".loader .progress").innerHTML=e.progress.toFixed()+"%"}})},loaded:function(){window.scroll(0,0),new TimelineMax({}).to(".loader .progress",.7,{opacity:0}).to(".loader .logo",.7,{opacity:0,onComplete:function(){}},"-=1").to([".loader .blind-left",".loader .blind-right"],.8,{scaleX:0,ease:Power4.easeIn,onComplete:function(){document.querySelector(".loader").remove(),TweenMax.set("body",{overflow:"auto"})}}).staggerFrom(document.querySelectorAll(".homepage__hero h1 span"),1,{rotationX:90,opacity:0,ease:Power2.easeOut},.1,"+=0.3").from("header",.8,{opacity:0},"-=0.5").from(".homepage__hero_footer",.8,{opacity:0},"-=0.4").from('[data-action="homepage-hero-play"]',.5,{scale:1.4,opacity:0},"-=0.4").add(function(){app.homepage.heroVideo.init(),TweenMax.set(document.querySelectorAll(".homepage__insta h2 span, .homepage__form_title h2 span"),{opacity:0})})}},this.loader.init(),this.resizeHomepage=function(e){t.hero.heroBgCover(),t.hero.hero.renderer.resize(t.hero.el.clientWidth,t.hero.el.clientHeight),t.hero.bg.width=t.hero.heroBgWidth,t.hero.bg.height=t.hero.heroBgHeight,t.hero.bg.x=t.hero.heroBgLeft,t.hero.bg.y=t.hero.heroBgTop,t.hero.displacementSprite.width=t.hero.hero.renderer.width/2,t.hero.displacementSprite.height=t.hero.hero.renderer.height/2,console.log(t.drag.pat1);let o=t.drag.pat1.width/t.drag.pat1.height;t.drag.canv1.width=t.drag.el.clientWidth,t.drag.canv1.height=t.drag.el.clientWidth/o,t.drag.canv2.width=t.drag.el.clientWidth,t.drag.canv2.height=t.drag.el.clientWidth/o,t.drag.canv3.width=t.drag.el.clientWidth,t.drag.canv3.height=t.drag.el.clientWidth/o,t.drag.ctx1.save(),t.drag.ctx1.beginPath(),t.drag.ctx1.moveTo(0,0),t.drag.ctx1.lineTo(t.drag.el.clientWidth/2+t.drag.el.clientWidth/2/2.92,0),t.drag.ctx1.lineTo(t.drag.el.clientWidth/2-t.drag.el.clientWidth/2/2.92,t.drag.el.clientHeight),t.drag.ctx1.lineTo(0,t.drag.el.clientHeight),t.drag.ctx1.lineTo(0,0),t.drag.ctx1.closePath(),t.drag.ctx1.clip(),t.drag.ctx1.drawImage(t.drag.pat1,0,0,t.drag.el.clientWidth,t.drag.el.clientHeight),t.drag.ctx1.restore(),t.drag.ctx1.save(),t.drag.ctx1.beginPath(),t.drag.ctx1.moveTo(t.drag.el.clientWidth/2+t.drag.el.clientWidth/2/2.92,0),t.drag.ctx1.lineTo(t.drag.el.clientWidth,0),t.drag.ctx1.lineTo(t.drag.el.clientWidth,t.drag.el.clientHeight),t.drag.ctx1.lineTo(t.drag.el.clientWidth/2-t.drag.el.clientWidth/2/2.92,t.drag.el.clientHeight),t.drag.ctx1.lineTo(t.drag.el.clientWidth/2+t.drag.el.clientWidth/2/2.92,0),t.drag.ctx1.closePath(),t.drag.ctx1.clip(),t.drag.ctx1.drawImage(t.drag.pat2,0,0,t.drag.el.clientWidth,t.drag.el.clientHeight),t.drag.ctx1.restore(),t.drag.ctx2.save(),t.drag.ctx2.beginPath(),t.drag.ctx2.moveTo(0,0),t.drag.ctx2.lineTo(t.drag.el.clientWidth/2+t.drag.el.clientWidth/2/2.92,0),t.drag.ctx2.lineTo(t.drag.el.clientWidth/2-t.drag.el.clientWidth/2/2.92,t.drag.el.clientHeight),t.drag.ctx2.lineTo(0,t.drag.el.clientHeight),t.drag.ctx2.lineTo(0,0),t.drag.ctx2.closePath(),t.drag.ctx2.clip(),t.drag.ctx2.drawImage(t.drag.img1,0,0,t.drag.el.clientWidth,t.drag.el.clientHeight),t.drag.ctx2.restore(),t.drag.ctx3.save(),t.drag.ctx3.beginPath(),t.drag.ctx3.moveTo(t.drag.el.clientWidth/2+t.drag.el.clientWidth/2/2.92,0),t.drag.ctx3.lineTo(t.drag.el.clientWidth,0),t.drag.ctx3.lineTo(t.drag.el.clientWidth,t.drag.el.clientHeight),t.drag.ctx3.lineTo(t.drag.el.clientWidth/2-t.drag.el.clientWidth/2/2.92,t.drag.el.clientHeight),t.drag.ctx3.lineTo(t.drag.el.clientWidth/2+t.drag.el.clientWidth/2/2.92,0),t.drag.ctx3.closePath(),t.drag.ctx3.clip(),t.drag.ctx3.drawImage(t.drag.img2,0,0,t.drag.el.clientWidth,t.drag.el.clientHeight),t.drag.ctx3.restore()},this.eventsInit=function(){window.addEventListener("scroll",function(e){let o=window.pageYOffset;header(e),o>window.innerHeight?t.play&&(app.homepage.hero.hero.ticker.stop(),t.play=!1,console.log("Pause")):t.play||(app.homepage.hero.hero.ticker.start(),t.play=!0,console.log("Play"))}),document.querySelectorAll('[data-action="submenu"]').forEach(function(e,t){e.addEventListener("mouseenter",header),e.addEventListener("mouseleave",header)}),document.querySelectorAll(".take-button, .form--submit button").forEach(function(e,t){e.addEventListener("mouseenter",function(e){TweenMax.to(this,.5,{color:"#fff",ease:Power2.easeOut}),TweenMax.to(this.querySelector("i"),.5,{y:5,height:"40px",ease:Power2.easeOut})})}),document.querySelectorAll(".take-button, .form--submit button").forEach(function(e,t){e.addEventListener("mouseleave",function(e){TweenMax.to(this,.5,{color:function(){return document.querySelector("header").classList.contains("fixed")?"#2f2f2f":"#ffffff"},ease:Power2.easeOut}),TweenMax.to(this.querySelector("i"),.5,{y:0,height:"1px",ease:Power2.easeOut})})}),document.querySelector('[data-action="homepage-drag"]').addEventListener("mousedown",function(e){t.drag.dragMove=!0,t.drag.dragx=e.clientX}),document.querySelector('[data-action="homepage-drag"]').addEventListener("mouseup",function(e){t.drag.dragDone||(t.drag.dragMove=!1,t.drag.dragx=0,TweenMax.to('[data-action="homepage-drag"]',.5,{x:0,ease:Power2.easeOut}),TweenMax.to([document.querySelector("canvas.leisure"),document.querySelector("canvas.business")],.5,{x:0,ease:Power2.easeOut}))}),document.querySelector(".homepage__drag").addEventListener("mousemove",t.drag.dragControl),document.querySelector('[data-action="homepage-hero-play"]').addEventListener("mouseenter",function(e){TweenMax.to(this.querySelector("i"),.5,{scale:1,ease:Power3.easeOut}),TweenMax.to(this.querySelector(".icon"),.5,{fill:"#fff",ease:Power3.easeOut}),TweenMax.to(".cursor span",.5,{scale:0,ease:Power3.easeOut})}),document.querySelector('[data-action="homepage-hero-play"]').addEventListener("mouseleave",function(e){TweenMax.to(this.querySelector("i"),.5,{scale:0,ease:Power3.easeIn}),TweenMax.to(this.querySelector(".icon"),.5,{fill:"#ee412a",ease:Power3.easeIn}),app.homepage.heroVideo.active||TweenMax.to(".cursor span",.5,{scale:1,ease:Power3.easeIn})}),document.querySelector('[data-action="homepage-close-video"]').addEventListener("mouseenter",function(e){TweenMax.to(this.querySelector("i"),.5,{scale:1,ease:Power3.easeOut}),TweenMax.to(this.querySelector(".icon"),.5,{fill:"#fff",ease:Power3.easeOut}),TweenMax.to(".cursor span",.5,{scale:0,ease:Power3.easeOut}),TweenMax.to(".cursor i.circle",.5,{scale:1}),TweenMax.to(".cursor i.pause",.5,{scale:0}),TweenMax.to(".cursor i.play",.5,{scale:0})}),document.querySelector('[data-action="homepage-close-video"]').addEventListener("mouseleave",function(e){TweenMax.to(this.querySelector("i"),.5,{scale:0,ease:Power3.easeIn}),TweenMax.to(this.querySelector(".icon"),.5,{fill:"#ee412a",ease:Power3.easeIn}),app.homepage.heroVideo.active&&(TweenMax.to(".cursor span",.5,{scale:1.4,ease:Power3.easeIn}),TweenMax.to(".cursor i.circle",.5,{scale:0,ease:Power3.easeIn}),app.homepage.heroVideo.video.paused?TweenMax.to(".cursor i.play",.5,{scale:1,ease:Power3.easeIn}):TweenMax.to(".cursor i.pause",.5,{scale:1,ease:Power3.easeIn}))}),document.querySelector('[data-action="homepage-drag"]').addEventListener("mouseenter",function(e){TweenMax.to(this.querySelector("i"),.5,{scale:1,ease:Power3.easeOut}),TweenMax.to(document.querySelector(".homepage__drag_dots"),.8,{scaleX:1,ease:Power4.easeOut}),TweenMax.to(".cursor i.circle",.6,{backgroundColor:"#ee412a"}),TweenMax.to(".cursor span",.5,{scale:0,ease:Power3.easeOut})}),document.querySelector('[data-action="homepage-drag"]').addEventListener("mouseleave",function(e){t.drag.dragDone||(t.drag.dragMove=!1,t.drag.dragx=0,TweenMax.to('[data-action="homepage-drag"]',.5,{x:0,ease:Power2.easeOut}),TweenMax.to([document.querySelector("canvas.leisure"),document.querySelector("canvas.business")],.5,{x:0,ease:Power2.easeOut})),TweenMax.to(this.querySelector("i"),.6,{scale:0,ease:Power4.easeIn}),TweenMax.to(document.querySelector(".homepage__drag_dots"),.4,{scaleX:0,ease:Power3.easeIn}),TweenMax.to(".cursor span",.6,{scale:1,ease:Power4.easeIn}),TweenMax.to(".cursor i.circle",.6,{backgroundColor:"#fff"})}),window.addEventListener("resize",this.resizeHomepage),document.querySelector('[data-action="learn-more"]').addEventListener("mouseenter",function(e){console.log('data-action="learn-more"'),TweenMax.to(this.querySelector("i"),.5,{scale:1,ease:Power3.easeOut}),TweenMax.to(".cursor span",.5,{scale:0,ease:Power3.easeOut}),TweenMax.to(".cursor i.circle",.6,{backgroundColor:"#fff"})}),document.querySelector('[data-action="learn-more"]').addEventListener("mouseleave",function(e){TweenMax.to(this.querySelector("i"),.5,{scale:0,ease:Power3.easeIn}),TweenMax.to(".cursor span",.5,{scale:1,ease:Power3.easeIn}),TweenMax.to(".cursor i.circle",.6,{backgroundColor:"#ee412a"})}),document.querySelectorAll(".slider-button-prev, .slider-button-next").forEach(function(e,t){e.addEventListener("mouseenter",function(e){this.classList.contains("swiper-button-disabled")||(TweenMax.to(this.querySelector("i"),.5,{scale:1,ease:Power3.easeOut}),TweenMax.to(".cursor span",.5,{scale:0,ease:Power3.easeOut}),this.closest(".homepage__services")||TweenMax.to(this.querySelector(".icon"),.5,{fill:"#fff",ease:Power3.easeOut}))}),e.addEventListener("mouseleave",function(e){TweenMax.to(this.querySelector("i"),.5,{scale:0,ease:Power3.easeIn}),TweenMax.to(".cursor span",.5,{scale:1,ease:Power3.easeIn}),this.closest(".homepage__services")||TweenMax.to(this.querySelector(".icon"),.5,{fill:"#ee412a",ease:Power3.easeIn})})})},this.cursor={init:function(){TweenMax.set(".cursor",{x:document.body.clientWidth/2-35,y:window.innerHeight/2-35}),document.body.addEventListener("mousemove",function(e){TweenMax.set(".cursor",{x:e.clientX-35,y:e.clientY-35})}),document.querySelector(".homepage__hero").addEventListener("mouseenter",function(e){console.log("hero"),TweenMax.to(".cursor",.5,{borderColor:"#ee412a"}),TweenMax.to(".cursor i.circle",.5,{backgroundColor:"#fff"})}),document.querySelector(".homepage__description").addEventListener("mouseenter",function(e){console.log("description"),TweenMax.to(".cursor",.5,{borderColor:"#ee412a"}),TweenMax.to(".cursor i.circle",.5,{backgroundColor:"#ee412a"})}),document.querySelector(".homepage__drag").addEventListener("mouseenter",function(e){console.log("drag"),TweenMax.to(".cursor",.5,{borderColor:"#ee412a"}),TweenMax.to(".cursor i.circle",.5,{backgroundColor:"#fff"})}),document.querySelector(".homepage__feedback").addEventListener("mouseenter",function(e){console.log("feedback"),TweenMax.to(".cursor",.5,{borderColor:"#ee412a"}),TweenMax.to(".cursor i.circle",.5,{backgroundColor:"#ee412a"})})}},this.tabs={active:!1,diskTextAnim:null,show:!1,init:function(){let e=this;this.render(),document.querySelectorAll(".homepage__tabs_list span").forEach(function(t,o){t.addEventListener("click",function(t){e.onActive(t)}),t.addEventListener("mouseenter",function(t){e.show&&e.onHover(t)}),t.addEventListener("mouseleave",function(t){e.show&&e.onHover(t)})}),document.querySelectorAll(".homepage__tabs_content h3 i").forEach(function(t,o){t.addEventListener("click",function(t){e.onClose(t)})})},onHover:function(e){this.active||("mouseenter"==e.type?(e.target.classList.add("active"),TweenMax.to(document.querySelectorAll(".homepage__tabs_list span:not(.active)"),1,{opacity:.1,color:"#2f2f2f",ease:Power2.easeOut})):(TweenMax.to(document.querySelectorAll(".homepage__tabs_list span"),.8,{opacity:1,color:"#ee412a",ease:Power2.easeOut}),e.target.classList.remove("active")))},onActive:function(e){this.active=!0;let t=this,o=e.target.getAttribute("data-target");TweenMax.to(".homepage__tabs_disk .disk--arrow-1",1.5,{rotation:360,ease:Power3.easeInOut}),TweenMax.to(".homepage__tabs_disk .disk--arrow-2",1.5,{rotation:360,ease:Power3.easeInOut}),TweenMax.to(".homepage__tabs_disk .disk--text",1.5,{color:"#d7ebe6",onComplete:function(){t.diskTextAnim.pause(),TweenMax.set(".homepage__tabs_disk .disk--arrow-1, .homepage__tabs_disk .disk--arrow-2",{clearProps:"all"})}}),(new TimelineMax).staggerTo(document.querySelectorAll(".homepage__tabs_list span:not(.active)"),.8,{opacity:0,ease:Power2.easeOut},.1).to(document.querySelector(".homepage__tabs_list span.active"),.7,{opacity:0,ease:Power2.easeOut},"-=0.8").set('.homepage__tabs_content [data-tab="'+o+'"]',{display:"block",zIndex:2,position:"relative"},"-=0.5").fromTo('.homepage__tabs_content [data-tab="'+o+'"] h3 div',.8,{rotationX:90,opacity:0},{rotationX:0,opacity:1,ease:Power2.easeOut}).fromTo('.homepage__tabs_content [data-tab="'+o+'"] p',1.5,{opacity:0},{opacity:1,ease:Power2.easeOut},"-=0.3").set(".homepage__tabs_list",{visibility:"hidden"})},onClose:function(e){let t=this;TweenMax.to(".homepage__tabs_disk .disk--text",1.5,{color:"#9BCAD6",onComplete:function(){TweenMax.to(".homepage__tabs_disk .disk--arrow-1",90,{rotation:360,repeat:-1,ease:Power0.easeNone}),TweenMax.to(".homepage__tabs_disk .disk--arrow-2",15,{rotation:360,repeat:-1,ease:Power0.easeNone}),t.diskTextAnim.play(),document.querySelector(".homepage__tabs_list .active").classList.remove("active"),t.active=!1}}),(new TimelineMax).to(e.target.closest(".title"),.8,{rotationX:90,opacity:0,ease:Power2.easeOut},"start").to(e.target.closest(".tab--body").querySelector("p"),1,{opacity:0,ease:Power2.easeOut},"start").set(e.target.closest(".tab--body"),{clearProps:"all"}).set(document.querySelectorAll(".homepage__tabs_list span"),{color:"#ee412a"}).set(".homepage__tabs_list",{visibility:"visible"}).staggerTo(document.querySelectorAll(".homepage__tabs_list span"),2,{opacity:1},.1)},render:function(){let e=document.querySelector(".homepage__tabs_disk .disk--text");var t="";for(var o in e.innerText)t+=e.innerText[o].replace(" ","&nbsp;"),o==e.innerText.length-1&&(t+="&nbsp;+&nbsp;");var a=document.createElement("div");a.className="text",a.innerHTML=t;var r=new SplitText(a,{type:"chars",reduceWhiteSpace:!1});e.innerHTML="",e.appendChild(a);var i=360/r.chars.length,n=0;for(var o in r.chars)r.chars[o].style.height="320px",r.chars[o].style.transform="rotate("+n+"deg)",n+=i;this.diskTextAnim=TweenMax.to(".homepage__tabs_disk .disk--text",60,{rotation:360,repeat:-1,ease:Power0.easeNone}),TweenMax.to(".homepage__tabs_disk .disk--arrow-1",90,{rotation:360,repeat:-1,ease:Power0.easeNone}),TweenMax.to(".homepage__tabs_disk .disk--arrow-2",15,{rotation:360,repeat:-1,ease:Power0.easeNone}),document.querySelectorAll(".homepage__tabs_content .tab--body h3 div").forEach(function(e,t){let o=new SplitText(e,{type:"words"}),a=document.createElement("i");a.innerText="+",o.words[o.words.length-1].appendChild(a)}),TweenMax.set(document.querySelectorAll(".homepage__tabs_list span"),{opacity:0})}}};window.onload=function(){setTimeout(function(){app.homepage=new _homepage},100)};