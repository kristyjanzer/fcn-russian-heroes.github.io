// Content Ranks Slider
$('.content-ranks-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1600,
          settings: {
            dots: true,
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1100,
          settings: {
            dots: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        },
      }
    ]
});



// Rating Info Slider
const $slider = $('.rating-info-slider');
const $pagination = $('.slider-pagination');
const visibleNumbers = 2;

$('.rating-info-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinite: false,
    customPaging : function(slider, index) { 
        var num = index + 1;
        return '<span class="number">'+ num +'</span>';
    }
});


let totalSlides = $slider.slick("getSlick").slideCount;

 function createPagination(currentSlide) {
    $pagination.empty();
    
    const start = Math.max(1, currentSlide - visibleNumbers);
    const end = Math.min(totalSlides, currentSlide + visibleNumbers);
    
    if (start > 1) {
      $pagination.append('<span class="dots">...</span>');
    }
    
    for(let i = start; i <= end; i++) {
      createDot(i);
    }
    
    if (end < totalSlides) {
      $pagination.append('<span class="dots">...</span>');
    }
 }

 function createDot(number) {
    const $dot = $('<div class="dot">' + number + '</div>');

    $dot.click(function() {
      $slider.slick('slickGoTo', number - 1);
      updatePagination();
    });

    $pagination.append($dot);
 }

 function updatePagination() {
    const currentSlide = $slider.slick("slickCurrentSlide") + 1;
    createPagination(currentSlide);
    updateActiveDot();
 }

 function updateActiveDot() {
    const currentSlide = $slider.slick("slickCurrentSlide") + 1;
    $pagination.find('.dot').removeClass('active');

    const activeDot = $pagination.find('.dot').filter(function() {
      return parseInt($(this).text()) === currentSlide;
    });

    if (activeDot.length) {
      activeDot.addClass('active');
    }
 }

 updatePagination();

 $slider.on('afterChange', function(event, slick, currentSlide) {
    updatePagination();
 });

 $slider.on('init reInit', function() {
    totalSlides = $slider.slick("getSlick").slideCount;
    updatePagination();
 });

 $slider.on('error', function(message) {
    console.error('Slick error:', message);
 });


// Progress Bar
document.addEventListener('DOMContentLoaded', () => {
    const progressContainers = document.querySelectorAll('.progress-container');

    function initProgressBar(container) {
        const progressLine = container.querySelector('.progress-line');
        const progressFill = progressLine.querySelector('.progress-line__fill');
        const markers = container.querySelectorAll('.markers__mark');
        let lastValue = parseInt(progressLine.dataset.value);

        function updateProgress() {
            const currentValue = parseInt(progressLine.dataset.value);

            progressFill.style.width = `${currentValue}%`;

            markers.forEach(marker => {
                const markerValue = parseInt(marker.dataset.value);

                if (currentValue >= markerValue) {
                    marker.style.setProperty('--before-width', '20px');
                    marker.style.setProperty('--before-height', '20px');
                } else {
                    marker.style.setProperty('--before-width', '0');
                    marker.style.setProperty('--before-height', '0');
                }
            });
        }

        updateProgress();

        setInterval(() => {
            updateProgress();
        }, 100);
    }

    progressContainers.forEach(initProgressBar);
});



// Button Top
const scrollBtn = document.querySelector('.scroll-btn');
const rootElement = document.documentElement;

function checkScroll() {
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    
    if ((rootElement.scrollTop / scrollTotal) > 0.25) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
}

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


window.addEventListener('scroll', () => {
    checkScroll();
});