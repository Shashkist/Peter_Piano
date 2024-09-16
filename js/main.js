let index = 0;
let selectedLanguage = "ru";
const totalWorkItems = $(".work-item").length;

$(window).on("load", function () {
  $(".preloader").addClass("loaded");
  // Load English as the default language if no other language is selected
  loadLanguageFile(selectedLanguage);
});

$(document).ready(function () {
  // nav toggle
  $(".nav-toggle").click(function () {
    $(".header .nav").slideToggle();
  });
  $(".header .nav a").click(function () {
    if ($(window).width() < 768) {
      $(".header .nav").slideToggle();
    }
  });

  

  // fixed header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  });

  

  // Add smooth scrolling to all links
  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });

  // set lightbox img max height
  const wHeight = $(window).height();
  $(".lightbox-img").css("max-height", wHeight + "px");

  $(".work-item-inner").click(function () {
    let index = $(this).parent(".work-item").index();
  });
  // lightbox
  $(".work-item-inner").click(function () {
    index = $(this).parent(".work-item").index();
    $(".lightbox").addClass("open");
    lightboxSlideShow();
  });
  $(".lightbox .prev").click(function () {
    if (index == 0) {
      index = totalWorkItems - 1;
    } else {
      index--;
    }
    lightboxSlideShow();
  });
  $(".lightbox .next").click(function () {
    if (index == totalWorkItems - 1) {
      index = 0;
    } else {
      index++;
    }
    lightboxSlideShow();
  });

  // close lightbox
  $(".lightbox-close").click(function () {
    $(".lightbox").removeClass("open");
  });

  // close lightbox when clicked outside of img-box
  $(".lightbox").click(function (event) {
    if ($(event.target).hasClass("lightbox")) {
      $(this).removeClass("open");
    }
  });
    // Listen for changes in the language selector
    $("#language-select").change(function(event) {
    selectedLanguage = event.target.value;
    loadLanguageFile(selectedLanguage);
  });


  $(document).ready(function() {
    $("#sendButton").click(function() {
        sendEmail();
    });
  });
  
});


function loadLanguageFile(userLanguage) {
  // Load language file based on user's preferred language
  fetch(`lang/${userLanguage}.json`)
  // fetch(`lang/${userLanguage}.json`)
  .then(response => response.json())
  .then(data => {
    // Replace placeholders with translated text
    document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (data[key]) {
      element.textContent = data[key];
    }
    });
  })
  .catch(error => console.error('Error loading language file:', error));
}





function lightboxSlideShow() {
  const imgSrc = $(".work-item").eq(index).find("img").attr("data-large");
  const category = $(".work-item").eq(index).find("h4").html();
  $(".lightbox-img").attr("src", imgSrc);
  $(".lightbox-category").html(category);
  $(".lightbox-counter").html(totalWorkItems + "/" + (index + 1));
}

function sendEmail() {
  const name = $("#nameInput").val(); // Get the value of the name input field
  const emailOrPhone = $("#emailPhoneInput").val(); // Get the value of the email/phone input field
  const message = $("#messageTextarea").val();
  console.log(message)
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "shashkist@gmail.com",
    Password: "409396BBF558BEBC6B7E6D8F8A113F2A69B7",
    To: "shashkist@gmail.com", // Changed recipient email
    From: "shashkist@gmail.com", // Changed sender email
    Subject: `the message from  ${name}:  ${emailOrPhone}`, // Changed subject
    // Port: 465, // Added port number
    // Secure: true, // Added to enable SSL
    Body: `<html><h2>Sender name is : ${name}</h2><strong>The message:</strong><br></br><em>${message}</em></html>`,
  }).then((message) => console.log(message));
}
