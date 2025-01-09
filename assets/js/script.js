("use strict");

// Import skills and projects from Data.js
import {
  skills,
  projects,
  UserData,
  profile,
  education,
  experience,
  services,
} from "./Data.js";

// Ensure the DOM is loaded before executing script
window.addEventListener("DOMContentLoaded", function () {
  // variables for User Data
  const UserName = document.querySelector(".name");
  const UserImage = document.querySelector(".profile_img");
  const title = document.querySelector(".title_text");
  const designation = document.querySelector(".about-title");
  const phone = document.querySelector("time");
  const address = document.querySelector("address");
  const email = document.querySelector(".contact-link");
  const summary = document.querySelector(".profile-summary");
  const ContactEmail = document.querySelector(".contact-link.email");
  const ContactWebsite = document.querySelector(".contact-link.website");
  const ContactPhone = document.querySelector(".contact-link.phone");
  const ContactAddress = document.querySelector(".footer-address");

  // common variable for Rendering the items for array
  const fragment = document.createDocumentFragment();

  // Render User Details
  UserName.textContent = `${UserData[1].name}`;
  UserImage.src = UserData[0].image;
  title.innerHTML = `${profile[0].title}`;
  summary.innerHTML = `${profile[0].summary}`;
  phone.textContent = `${UserData[2].phone}`;
  address.textContent = `${UserData[4].location}`;
  email.textContent = `${UserData[3].email}`;
  designation.innerHTML = `${UserData[5].designation}`;
  ContactEmail.href = `mailto:${UserData[3].email}`;
  ContactEmail.title = `${UserData[3].email}`;
  ContactEmail.textContent = `${UserData[3].email}`;
  ContactWebsite.href = `${UserData[6].website}`;
  ContactWebsite.title = `${UserData[6].website}`;
  ContactWebsite.textContent = `${UserData[6].website}`;
  ContactAddress.textContent = `${UserData[4].location}`;
  ContactPhone.href = `tel:${UserData[2].phone}`;
  ContactPhone.innerHTML = `${UserData[2].phone}`;

  // Render Services
  services.map((service) => {
    const serviceLi = document.createElement("li");
    serviceLi.classList.add("service-item");

    serviceLi.innerHTML = `
              <div class="service-icon-box">
                <img src="${service.image}" alt=" design icon" width="40" />
              </div>

              <div class="service-content-box">
                <h4 class="h4 service-item-title">${service.title}</h4>

                <p class="service-item-text">
                  ${service.description}
                </p>
              </div>`;
    fragment.appendChild(serviceLi);
  });
  document.querySelector(".service-list").appendChild(fragment);

  // Render Education
  const educationList = this.document.querySelector(".education-list");

  education.forEach((degree) => {
    const eduLi = document.createElement("li");
    eduLi.classList.add("timeline-item");
    eduLi.innerHTML = `
    <h4 class="h4 timeline-item-title">${degree.degree}</h4>
    <span>${degree.institute}</span>
    <p class="timeline-text">${degree.year}</p>`;
    fragment.appendChild(eduLi);
  });
  educationList.appendChild(fragment);

  // Render Work Experience
  const experienceList = this.document.querySelector(".experience-list");

  experience.map((exp) => {
    const expLi = document.createElement("li");
    expLi.classList.add("timeline-item");

    expLi.innerHTML = `<h4 class="h4 timeline-item-title">
                ${exp.designation}
              </h4>
              <span> ${exp.company}</span>
              <p class="timeline-text">${exp.year}</p>`;
    fragment.appendChild(expLi);
  });
  experienceList.appendChild(fragment);

  // Render Skills
  skills.map((skill, index) => {
    const skillElement = document.createElement("li");
    skillElement.classList.add("skills-item");

    skillElement.innerHTML = `<div class="title-wrapper">
                  <h5 class="h5">${skill.name}</h5>
                  <data value="${skill.progress}">${skill.progress}%</data>
                </div>

                <div class="skill-progress-bg">
                  <div class="skill-progress-fill" style="width:${skill.progress}%"></div>
                </div>`;
    fragment.appendChild(skillElement);
  });
  document.querySelector(".skills-list").appendChild(fragment);

  // Render projects
  projects.forEach((project, index) => {
    const projectElement = document.createElement("li");
    projectElement.classList.add("project-item", "active"); // Ensure 'active' class is added
    projectElement.setAttribute("data-filter-item", "");
    projectElement.setAttribute("data-category", project.category);

    // Set the data-index attribute to use for modal referencing
    projectElement.innerHTML = `
      <a href="#">
        <figure class="project-img">
          <div class="project-item-icon-box" data-index="${index}">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src="${project.image}" alt="${project.alt}" loading="lazy" />
        </figure>
        <h3 class="project-title">${project.name}</h3>
        <p class="project-category">${project.category}</p>
      </a>`;
    fragment.appendChild(projectElement);
  });
  document.querySelector(".project-list").appendChild(fragment);

  // Filter items based on selected value
  const filterItems = document.querySelectorAll("[data-filter-item]");
  const filterFunc = function (selectedValue) {
    filterItems.forEach((item) => {
      const categories = item.dataset.category.toLowerCase().split(",");
      if (
        selectedValue === "all" ||
        categories.includes(selectedValue.toLowerCase())
      ) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  // // Handle filter buttons (for larger screens)
  // const filterBtn = document.querySelectorAll("[data-filter-btn]");
  // let lastClickedBtn = filterBtn[0]; // Start with the first button as active

  // filterBtn.forEach((btn) => {
  //   btn.addEventListener("click", function () {
  //     const selectedValue = this.innerText.toLowerCase();
  //     filterFunc(selectedValue);

  //     // Update active button styling
  //     lastClickedBtn.classList.remove("active");
  //     this.classList.add("active");
  //     lastClickedBtn = this;
  //   });
  // });

  // // Handle select dropdown (for mobile screens)
  // const select = document.querySelector("[data-select]");
  // const selectItems = document.querySelectorAll("[data-select-item]");
  // const selectValue = document.querySelector("[data-select-value]");

  // select.addEventListener("click", function () {
  //   this.classList.toggle("active");
  // });

  // selectItems.forEach((item) => {
  //   item.addEventListener("click", function () {
  //     const selectedValue = this.innerText.toLowerCase();
  //     selectValue.innerText = this.innerText;
  //     select.classList.remove("active");
  //     filterFunc(selectedValue);
  //   });
  // });

  // Modal functionality
  const modal = document.getElementById("modal");
  const modalOpen = document.querySelectorAll(".project-item-icon-box");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-img");
  const modalDetails = document.getElementById("modal-details");
  const techDetails = document.querySelector(".modal-tech");

  modalOpen.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior
      const index = this.getAttribute("data-index");
      const project = projects[index];

      modalImage.setAttribute("src", project.page);
      modalTitle.innerText = project.name;
      if (project.description) modalDetails.innerText = project.description;
      techDetails.textContent = project.technologies;

      modal.style.display = "flex";
    });
  });

  // Modal close button
  modalClose.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal on outside click
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const btnicon = document.querySelector(".toggleBtn");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");

  if (sidebar.classList.contains("active")) {
    btnicon.setAttribute("name", "close-outline");
  } else {
    btnicon.setAttribute("name", "layers-outline");
  }
});

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// // Typing Text Start----------
// const span = document.querySelector(".typing_txt span");
// const textArr = span.getAttribute("data-text").split(", ");
// const maxTextIndex = textArr.length;
// const sPerChar = 0.15;
// const sBetweenWord = 1.5;
// let textIndex = 0;

// typing(textIndex, textArr[textIndex]);

// function typing(textIndex, text) {
//   let charIndex = 0;
//   const typeInterval = setInterval(() => {
//     span.innerHTML += text[charIndex];
//     if (charIndex++ === text.length - 1) {
//       clearInterval(typeInterval);
//       setTimeout(() => deleting(textIndex, text), sBetweenWord * 700);
//     }
//   }, sPerChar * 300);
// }

// function deleting(textIndex, text) {
//   let charIndex = text.length - 1;
//   const typeInterval = setInterval(() => {
//     span.innerHTML = text.substring(0, charIndex--);
//     if (charIndex < 0) {
//       clearInterval(typeInterval);
//       textIndex = (textIndex + 1) % maxTextIndex;
//       setTimeout(
//         () => typing(textIndex, textArr[textIndex]),
//         sBetweenWord * 300
//       );
//     }
//   }, sPerChar * 300);
// }
