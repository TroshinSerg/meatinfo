var gallery = '.company-page__photos-slider';
var slider = false;
var sliderCounter = $('.company-page__photos-counter');
var currentSlideNode = $('.company-page__photos-counter .js-slide-current');
var numberOfSlidesNode = $('.company-page__photos-counter .js-slide-all');
var expandBtn = $('.company-page__photos-expand');
var photos = $('.company-page__photos-item');
var currentSlideIndex = 1;

/*** Build slider ***/
var build = function() {
  if (!slider) {
    slider = $(gallery).addClass('owl-carousel'); // Add owl slider class (3*)
    slider.owlCarousel({ // Initialize slider
      items:1,
      //slideBy:1,
      nav:false,
      loop:false,
      dots:false,
      onInitialized: onInitialized,
      onChanged: onChanged
    });
  }
};

function onChanged(evt) {
  currentSlideNode.text(evt.item.index + 1);
  setSrcToFullImg(evt.item.index);
}

function onInitialized(evt) {
  numberOfSlidesNode.text(photos.length);
  setSrcToFullImg(evt.item.index);
}

function setSrcToFullImg(index) {
  var fullImgUrl = $(photos[index]).find('img').attr('data-full');
  expandBtn.attr('href', fullImgUrl);
}

/*** Destroy slider ***/
var destroy = function() {
  if (slider) {
    slider.trigger('destroy.owl.carousel'); // Trigger destroy event (4*)
    slider = false; // Reinit slider variable
    $(gallery).removeClass('owl-carousel'); // Remove owl slider class (3*)
  }
};

if($(window).width() < 768) {
  build();
}

$(window).resize(function() {
  if($(window).width() < 768) {
    build();
  } else {
    destroy();
  }
});

//Initializing popup
$(document).ready(function() {
  expandBtn.magnificPopup({type:'image'});
});