!function(){"use strict";var e=document.querySelector(".carousel__container-track--prev"),c=document.querySelector(".carousel__container-track--next"),o=document.querySelectorAll(".carousel__container-slide"),t=document.querySelectorAll(".dot"),n=0;function r(e){console.log(e),o.forEach((function(e){return e.classList.remove("show")})),o[e].classList.add("show")}function s(e){t.forEach((function(e){return e.classList.remove("show")})),console.log(t),t[e].classList.add("show")}c.addEventListener("click",(function(){n===o.length-1?(r(n=0),s(n)):(r(n+=1),s(n))})),e.addEventListener("click",(function(){0===n?(r(n=o.length-1),s(n)):(r(n-=1),s(n))}))}();