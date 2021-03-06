const city = 'Toshkent',
  apiKey = '7a13b51f1f360b2a5e6559a9c06c1a51';

$(document).ready(function () {
  /* theme for visually impaired */
  $('.visual').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('body, img, video, iframe').css('filter', 'grayscale(0) invert(0)');
    } else {
      $(this).addClass('active');
      $('body').css('filter', 'grayscale(1) invert(1)');
      $('img, video, iframe').css('filter', 'grayscale(0) invert(1)');
    }
  });

  /* font-size increase */
  $('.font-increase').click(function (e) {
    e.preventDefault();
    $('.font-decrease').removeClass('disabled');
    if (parseInt($('body').css('font-size')) == 18) {
      $(this).addClass('disabled');
      return;
    }
    $('body, p, span, li, i, button, a, label, td, h1, h2, h3, h4, h5, h6').css('font-size', function () {
      return parseInt($(this).css('font-size')) + 1 + 'px';
    });
  });

  /* font-size decrease */
  $('.font-decrease').click(function (e) {
    e.preventDefault();
    $('.font-increase').removeClass('disabled');
    if (parseInt($('body').css('font-size')) <= 10) {
      $(this).addClass('disabled');
      return;
    }
    $('body, p, span, li, i, button, a, label, td, h1, h2, h3, h4, h5, h6').css('font-size', function () {
      return parseInt($(this).css('font-size')) - 1 + 'px';
    });
  });

  /* langs active class */
  $('.langs .icon-btn').click(function (e) {
    e.preventDefault();
    $(this).addClass('active').parent().siblings().find('.icon-btn').removeClass('active');
  });

  /* navbar */
  $('.dropdown__item > p').click(function (e) {
    e.preventDefault();
    if ($(this).parent().find('.dropdown__list').hasClass('d-block')) {
      $(this).parent().find('.dropdown__list').removeClass('d-block');
    } else {
      $(this).parent().find('.dropdown__list').addClass('d-block');
      $(this).parent().siblings().find('.dropdown__list').removeClass('d-block');
    }
  });

  $('.dropdown__list-item > p').click(function (e) {
    e.preventDefault();
    if ($(this).parent().find('.dropdown__sublist').hasClass('d-block')) {
      $(this).parent().find('.dropdown__sublist').removeClass('d-block');
    } else {
      $(this).parent().find('.dropdown__sublist').addClass('d-block');
      $(this).parent().siblings().find('.dropdown__sublist').removeClass('d-block');
    }
  });

  $('.dropdown a').click(function (e) {
    e.preventDefault();
    $('.dropdown').removeClass('show-menu');
  });

  $('.menu-bar').click(function (e) {
    e.preventDefault();
    $('.dropdown').toggleClass('show-menu');
  });

  /* line graph */
  const xValues = ['2021-yil yakuniga ko\'ra rejada (mlrd so\'m)', '2021-yil yakuniga ko\'ra amalda (mlrd so\'m)'];
  const yValues = [1400, 1470];
  new Chart("myLineGraph", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "#D3B1E0",
        borderColor: "#8D35B0",
        data: yValues
      }]
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{ ticks: { min: 6, max: 16 } }],
      },
      plugins: {
        legend: {
          display: false
        }
      },
    }
  });

  /* pie chart */
  const x = ["Yangi ish joylarini yaratish rejada", "Yangi ish joylarini yaratish amalda"];
  const y = [823, 824];
  const barColors = ["#80DC87", "#6F009B"];
  new Chart("myPieChart", {
    type: "doughnut",
    data: {
      labels: x,
      datasets: [{
        backgroundColor: barColors,
        data: y
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "World Wide Wine Production 2018"
      },
      plugins: {
        legend: {
          display: false
        }
      },
    }
  });

  /* fancybox */
  $('[data-fancybox="gallery1"]').fancybox({
    loop: true,
  });

  /* dycalendar */
  dycalendar.draw({
    target: '#dycalendar',
    type: 'month',
    dayformat: 'full',
    monthformat: 'full',
    highlighttargetdate: true,
    prevnextbutton: 'show'
  });

  /* region active */
  $('#map path').click(function (e) {
    e.preventDefault();
    let id = e.target.attributes.title.value;
    $('#regionalCarousel').find(`#${id}`).addClass('active').siblings().removeClass('active');
  });

  /* showResult btn */
  $('.info__btn').click(function (e) {
    e.preventDefault();
    if (!$('.info__form-input').toArray().some(inp => inp.checked)) {
      alert("O'z javobingizni tanlang");
      return;
    }
    $('.info__form .result-bar').removeClass('d-none');
    $('.info__form-input').prop('disabled', true);
    this.disabled = true;
  });

  /* back-to-top btn */
  $('.back-to-top').click(function (e) {
    e.preventDefault();
    $(document.body).scrollTop(0);
    $(document.documentElement).scrollTop(0);
  });

  $(window).scroll(function () {
    if ($(document.body).scrollTop() > 200 || $(document.documentElement).scrollTop() > 200) {
      $('.back-to-top').css('display', 'block');
    } else {
      $('.back-to-top').css('display', 'none');
    }
  });

  /* get weather data */
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
    success: function (res) {
      let temp = res.main.temp.toFixed(0);
      $('.weather-city').text(city);
      $('.weather-temp').text(temp > 0 ? '+ ' + temp : temp);
      $('.weather-icon').attr('src', `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`);
    },
    error: function () {
      alert("Ob-havoni aniqlashda xatolik yuz berdi");
    }
  });

  /* tooltip implementation */
  $("body").tooltip({ selector: '[data-bs-toggle=tooltip]' });
});
