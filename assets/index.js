document.addEventListener('DOMContentLoaded', function () {

  // Burger Menu
  // -----------
  const menuBtn = document.querySelector('.js-menu-btn')
  const mobileMenu = document.querySelector('#mobile-menu')

  const openMenu = () => {
    // check if mobile menu is empty ul is empty
    if (mobileMenu.querySelectorAll('li').length === 1) {
      const ulElem = mobileMenu.querySelector('ul')
      const menu = document.querySelector('#menu')
      const menuItems = menu.querySelectorAll('li')
      // copy all <li> elements in the first <ul> element
      // copy the elements and insert them into the ul inside the mobile menu
      menuItems.forEach(item => {
        ulElem.appendChild(item.cloneNode(true))
      })
    }

    mobileMenu.classList.remove('hidden')
    menuBtn.classList.add('tham-active')

    // add event listener in next tick, otherwise it picks up the current click event
    setTimeout(() => {
      document.addEventListener('click', menuClickHandler)
      window.addEventListener('scroll', menuScrollHandler)
    }, 0)
  }

  const closeMenu = () => {
    document.removeEventListener('click', menuClickHandler)
    document.removeEventListener('scroll', menuScrollHandler)
    scrollCount = 0
    mobileMenu.classList.add('hidden')
    menuBtn.classList.remove('tham-active')
  }

  const menuClickHandler = (event) => {
    if (event.target.closest('#mobile-menu') === null) closeMenu()
  }

  let scrollCount = 0
  const menuScrollHandler = (event) => {
    scrollCount += 1
    if (scrollCount > 2) closeMenu()
  }

  menuBtn.addEventListener('click', () => {
    if (mobileMenu.classList.contains('hidden')) {
      openMenu()
    } else {
      closeMenu()
    }
  })

  // Contact form
  const contactSections = document.querySelectorAll('.js-contact')
  // register click handler for all
  contactSections.forEach(contactSection => {
    const contactBtn = contactSection.querySelector('.js-contact-btn')
    contactBtn.addEventListener('click', () => {
      const contactForm = contactSection.querySelector('.js-contact-form')
      contactForm.classList.toggle('hidden')
    })
  })

  // Shrinking Header
  // ----------------
  const header = document.querySelector('header')

  let lastScrollY = 0
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY
    if (currentScrollY > lastScrollY) {
      header.classList.add('header-shrink')
    } else {
      header.classList.remove('header-shrink')
    }
    lastScrollY = currentScrollY
  })

  // Contact
  // -------
  const elem = document.querySelector('.eml')
  const name = elem.getAttribute('data-x')
  const host = elem.getAttribute('data-y')
  const mail = `${name}@${host}`

  const link = document.createElement('a')
  link.setAttribute('href', `mailto:${mail}`)
  link.textContent = mail

  elem.parentElement.replaceChild(link, elem)
})

function sendEmail() {
  const subjects = {
    "organization": "Organization specific learning academy",
    "frontline-salesperson": "Success of frontline salespeople",
    "first-time-managers": "First time manager success",
    "middle-manager": "Middle manager success",
    "top-management": "Top management team",
    "head-of-organization": "Head of organization"
  };
  debugger
  let subject = "";
  
  for (const [selector, text] of Object.entries(subjects)) {
    const checkbox = document.getElementById(selector);
    if (checkbox && checkbox.checked) {
      subject = subject ? `${subject}; ${text}` : text;
    }
  }
  
  if (!subject) {
    subject = "General Request";
  }
  let param = {
    email: document.getElementById("email").value,
    name: document.getElementById("name").value,
    subject: subject,
    message: document.getElementById("message").value

  }
  emailjs.send("service_vgm2nxr", "template_kkae8uh", param).then(alert("Response recorded Successfully!")).then(
    document.getElementById("email").value = "",
    document.getElementById("name").value = "",
    document.getElementById("message").value = "",
    document.getElementById("organization").checked = false,
    document.getElementById("frontline-salesperson").checked = false,
    document.getElementById("first-time-managers").checked = false,
    document.getElementById("middle-manager").checked = false,
    document.getElementById("top-management").checked = false,
    document.getElementById("head-of-organization").checked = false,
  )
}


