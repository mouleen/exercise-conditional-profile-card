import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img id="bg" src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // your code here

  // Inicie esta parte con una logica mas basica con condicionales
  let names = variables.name;
  let lastNames = variables.lastName;
  if (variables.name == null) names = "Lucy";
  if (variables.lastName == null) lastNames = "Boilett";

  // Arrays de imagenes
  const imgArray = ["avatar1.png", "avatar2.png", "avatar3.png", "avatar4.png"];
  const bgArray = [
    "https://picsum.photos/id/16/367/267.jpg",
    "https://picsum.photos/id/18/367/267.jpg",
    "https://picsum.photos/id/27/367/267.jpg",
    "https://picsum.photos/id/28/367/267.jpg"
  ];

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" id="avatar"/>
           <h1>${names} ${lastNames} </h1>
          <h2> ${variables.role === null ? "" : variables.role} </h2>
          
          <!-- Si Los 2 no nulos ? [valores concatenados] sino si los 2 nulos ? [vacio] sino Si country es nulo ? [city] sino [country] -->    
          <h3>${
            variables.country != null && variables.city != null
              ? variables.city + ", " + variables.country
              : variables.country == null && variables.city == null
              ? ""
              : variables.country == null
              ? variables.city
              : variables.country
          }</h3> 
          <ul class="${variables.socialMediaPosition}">
            <li><a href="https://twitter.com/${
              variables.twitter == null ? "4geeksacademy" : variables.twitter
            }"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://github.com/${
              variables.github == null ? "4geeksacademy" : variables.github
            }"><i class="fab fa-github"></i></a></li>
            <li><a href="https://linkedin.com/school/${
              variables.linkedin == null ? "4geeksacademy" : variables.linkedin
            }"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="https://instagram.com/${
              variables.instagram == null
                ? "4geeksacademy"
                : variables.instagram
            }"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
    `;

  // Seleccion de elementos de HTML recien renderizados
  const avatar = document.getElementById("avatar");
  const bg = document.getElementById("bg");
  const themeBg = document.getElementById("theme-bg");
  const themeAvatar = document.getElementById("theme-avatar");
  const themeCover = document.getElementById("cover");
  //avatar.src = "/public/assets/img/avatar1.png";

  // EventListeners
  themeBg.addEventListener("mouseover", () => {
    if (variables.includeCover != false) randomBg();
  });
  themeAvatar.addEventListener("mouseover", () => {
    randomImage();
  });

  // Funciones para Rotacion de imagenes
  function randomImage() {
    let randIdx = Math.floor(Math.random() * 4) + 1;
    avatar.src = "/public/assets/img/avatar" + randIdx + ".png";
  }
  function randomBg() {
    let randIdx = Math.floor(Math.random() * 3) + 1;
    bg.src = bgArray[randIdx];
  }
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  //avatarURL = "/" + imgArray[0];
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    //avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    avatarURL: "/public/assets/img/avatar1.png",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
