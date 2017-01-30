
(function () {
	TweenMax.from(".img1", 6, {opacity:0});
	TweenMax.from(".img2", 6, {opacity:1, scale:0, left:600});
	TweenMax.from(".img3", 5, {opacity:1, scale:0, left:-700, delay:2});
	TweenMax.from(".img4", 6, {opacity:0, scale:0, left:600, delay:4});
	TweenMax.from(".img5", 6, {opacity:0, scale:0, left:600, delay:6});
	TweenMax.from(".img6", 8, {opacity:0, delay:10});
})()

