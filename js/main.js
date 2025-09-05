document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("form");

    form?.addEventListener("submit", function (event) {
        event.preventDefault();

        if (validateForm()) {
            var formData = new FormData(form);
            fetch("contact.php", {
                method: "POST",
                body: formData
            })
                .then(response => response.text())
                .then(result => {
                    if (result === "Success") {
                        showNotification("Message sent successfully", "success");
                        form?.reset();
                    } else {
                        showNotification("Message sent successfully", "success");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    showNotification("Message sent successfully", "success");
                });
        }
    });

    function validateForm() {
        var isValid = true;
        var inputs = form?.querySelectorAll('input, textarea');

        inputs.forEach(function (input) {
            var errorElement = input.nextElementSibling;
            if (!errorElement || !errorElement.classList.contains('error-message')) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                input.parentNode.insertBefore(errorElement, input.nextSibling);
            }

            var errorMessage = getErrorMessage(input);
            if (errorMessage) {
                isValid = false;
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            } else {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        });

        return isValid;
    }

    function getErrorMessage(input) {
        if (input.value.trim() === '') {
            switch (input.id) {
                case 'name':
                    return 'Please enter your name.';
                case 'subject':
                    return 'Please enter a subject.';
                case 'email':
                    return 'Please enter your email address.';
                case 'message':
                    return 'Please enter your message.';
                default:
                    return 'This field is required.';
            }
        } else if (input.id === 'email' && !isValidEmail(input.value)) {
            return 'Please enter a valid email address.';
        }
        return null;
    }

    function isValidEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showNotification(message, type) {
        toastr.options = {
            closeButton: false,
            progressBar: true,
            positionClass: "toast-bottom-right",
            showDuration: 300,
            hideDuration: 1000,
            timeOut: 5000,
            extendedTimeOut: 1000,
        };
        toastr.clear();
        if (type === "success") {
            toastr.success(message, "", { className: "toast-success" });
        } else {
            toastr.error(message, "", { className: "toast-error" });
        }
    }

    // Add input event listeners for real-time validation
    form?.querySelectorAll('input, textarea').forEach(function (input) {
        input.addEventListener('input', function () {
            validateForm();
        });
    });
});

// ---------------- preloader -------------------- //

gsap.config({ trialWarn: false });
gsap.set('svg', {
    visibility: 'visible'
})

let tl = gsap.timeline({
    repeat: -1, yoyo: true, defaults: {
        ease: 'sine.inOut',
        duration: 1.2
    }
});
tl.fromTo('#gradDot', {
    x: 90
}, {
    x: -90
})
    .fromTo('#fillDot', {
        x: -90
    }, {
        x: 90
    }, 0)
    .fromTo('#mainGrad', {
        attr: {
            cx: 230,
            fx: 230
        }
    }, {
        attr: {
            cx: 570,
            fx: 570
        }
    }, 0)

var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
    loader.style.display = "none";
})


//   ------------- numbers counter -----------------//

$(document).ready(function () {
    $(".counter").counterUp({
        delay: 10,
        time: 1200,
    });
});

// ---------------------- aos (animation on scroll) --------------------//

window.addEventListener('load', () => {
    AOS.init({
        duration: 500,
        easing: 'fade-up',
        once: true,
        mirror: false
    })
});

//---------------------- jquery fancybox plugin -------------------------// 

$(document).ready(function () {
    $("a.gallery-item").fancybox({
        // Options for the Fancybox plugin
        loop: true
    });
});

// ----------------------- clients carousel -------------------//

// Check if jQuery and Owl Carousel are available
if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
    $('.owl-carousel.client').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 1200,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 6
            }
        }
    });
} else {
    console.log("Owl Carousel is not loaded on this page.");
}

// ------------- sticky navbar on scroll ---------------- //

$(window).scroll(function () {
    if ($(window).scrollTop()) {
        $(".navbar").addClass("sticky")
    }
    else {
        $(".navbar").removeClass("sticky")
    }
})

// ------------- switch between dark and light mode ---------------- //

// Function to toggle between light and dark mode
function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('mode-icon');

    // Toggle the dark mode class
    body.classList.toggle('dark-mode');

    // Toggle the icon
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('bi-moon-fill');
        icon.classList.add('bi-sun-fill');
    } else {
        icon.classList.remove('bi-sun-fill');
        icon.classList.add('bi-moon-fill');
    }

    // Save the user's preference to localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
}

// Check if user's preference is stored in localStorage
const isDarkModeSaved = localStorage.getItem('dark-mode');

// Apply the saved preference (if available)
if (isDarkModeSaved === 'true') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}

// Update the icon based on the saved preference
const icon = document.getElementById('mode-icon');
if (icon) {
    if (isDarkModeSaved === 'true') {
        icon.classList.add('bi-sun-fill');
    } else {
        icon.classList.add('bi-moon-fill');
    }
}

// Add event listener to the mode toggle button
const modeToggle = document.getElementById('mode-toggle');
if (modeToggle) {
    modeToggle.addEventListener('click', toggleDarkMode);
}


// ---------------- testimonial slider ---------------------//

$('.owl-carousel.testimonial').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 8000,
    responsive: {
        0: {
            items: 1
        },
        750: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
})


// ================== portfolio filter ====================== //

$(document).ready(function () {

    // initialize Isotope
    var $grid = $('.row.portfolio-row').isotope({
        itemSelector: '.col-lg-4',
        layoutMode: 'fitRows'
    });

    // filter items on button click
    $('.filters').on('click', 'a', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

});

function rotateIcon(iconId) {
    const icon = document.getElementById(iconId);
    icon.classList.toggle('rotated');
}

// ---------------- back to top button -------------------- //

let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    if (!scrollProgress) {
        // If the progress element doesn't exist, exit the function
        return;
    }

    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);

    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }

    scrollProgress.style.background = `conic-gradient(#1FA84F ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};

// Only add the click event listener if the element exists
let scrollProgress = document.getElementById("progress");
if (scrollProgress) {
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
}

// Only add scroll and load event listeners if the progress element exists
if (document.getElementById("progress")) {
    window.addEventListener("scroll", calcScrollValue);
    window.addEventListener("load", calcScrollValue);
}

// ---------------- particles  -------------------- //
document.addEventListener("DOMContentLoaded", function () {
    const particlesContainer = document.getElementById("particles-js");
    if (particlesContainer) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#999"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#999"
                    },
                    "polygon": {
                        "nb_sides": 3
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 100,
                    "color": "#999",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            }
        });
    }
});

// ---------------- tilt.js init -------------------- //

// Check if VanillaTilt is defined before using it
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 20,
        speed: 300,
        glare: true,
        "max-glare": 0.1
    });
}
/* 지도 ↔ 위성 토글 (임베드 src 교체 방식) */
(function(){
  const iframe = document.getElementById('gmap');
  if(!iframe) return;

  // 1) 기본(지도) – 지금 사용 중인 퍼오기 URL (pb=... 전체를 그대로)
  const roadSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d404.0873073060889!2d128.62677323292826!3d35.880905792657735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e195cf24f40d%3A0xf4ed22431d783ec8!2z7ZWc6rWtSVTqtZDsnKHsm5A!5e0!3m2!1sko!2skr!4v1756968988117!5m2!1sko!2skr";

  // 2) 위성 – 같은 위치를 q=위도,경도 + t=k(위성)로 로드
  const satSrc  = "https://www.google.com/maps?q=35.880905792657735,128.62677323292826&hl=ko&z=16&t=k&output=embed";

  let isSatellite = false;
  const btn = document.getElementById('mapTypeToggle');

  btn?.addEventListener('click', () => {
    isSatellite = !isSatellite;
    iframe.src = isSatellite ? satSrc : roadSrc;
    // 아이콘도 바꿔주기(선택)
    btn.innerHTML = isSatellite ? '<i class="bi bi-map"></i>' : '<i class="bi bi-layers"></i>';
  });
})();


/* 지도 ↔ 위성 토글 (안전 버전: 현재 iframe src를 그대로 읽음) */
(function () {
  const iframe = document.getElementById('gmap');
  const btn = document.getElementById('mapTypeToggle');
  if (!iframe || !btn) return;

  // 1) 현재 로드된 '지도' 퍼오기 URL을 그대로 확보 (복사 실수 방지)
  const roadSrc = iframe.getAttribute('src');

  // 2) 위성 URL (위도,경도는 지금 좌표로 세팅)
  const lat = 35.880905792657735;
  const lng = 128.62677323292826;
  const satSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=ko&z=16&t=k&output=embed`;

  let isSatellite = false;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isSatellite = !isSatellite;
    iframe.setAttribute('src', isSatellite ? satSrc : roadSrc);
    btn.innerHTML = isSatellite ? '<i class="bi bi-map"></i>' : '<i class="bi bi-layers"></i>';
  });
})();

// ---------------- box hover → 100% 표시 ---------------- //
document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".box.box-hover");

  boxes.forEach((box) => {
    // span.percent-text 미리 생성해서 박스 안에 추가
    const percentText = document.createElement("span");
    percentText.classList.add("percent-text");
    percentText.innerText = "100%";
    box.appendChild(percentText);

    // hover 끝나면 show-percent 클래스 붙여서 글씨 표시
    box.addEventListener("mouseenter", () => {
      // CSS transition (400ms) 끝난 뒤에 글씨 보이게
      setTimeout(() => {
        box.classList.add("show-percent");
      }, 400);
    });
  });
});
