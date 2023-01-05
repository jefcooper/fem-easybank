//
// Attach event handlers to elements
//
console.log("menu-script initialized");

addEventListenerForAll(".menu__toggle", "click", menuToggleListener());
addEventListenerForAll(".menu__overlay", "click", menuToggleListener());

//
// Event Listeners
//

// toggle aria-expanded on click of menu__toggle button
function menuToggleListener() {
  const elementSelector = ".menu__toggle";

  return (evt) => {
    const el = evt.target.closest(elementSelector);

    if (el) {
      if (el.hasAttribute("aria-expanded")) {
        el.removeAttribute("aria-expanded");
        document.body.classList.remove("modal");
      } else {
        el.setAttribute("aria-expanded", "true");
        document.body.classList.add("modal");
      }
      evt.preventDefault();
      evt.stopPropagation();
    } else {
      // if we didn't find a parent with the class, then look at siblings
      const siblings = Array.from(evt.target.parentNode.children);
      const toggle = siblings.find((el) => el.matches(elementSelector));

      if (toggle && toggle.hasAttribute("aria-expanded")) {
        toggle.removeAttribute("aria-expanded");
        document.body.classList.remove("modal");
        evt.preventDefault();
        evt.stopPropagation();
      }
    }
  };
}

// for all elements matching selector, attach the listener to the named event
function addEventListenerForAll(selector, eventName, listener) {
  Array.from(document.querySelectorAll(selector)).forEach((el) => {
    el.addEventListener(eventName, listener);
  });
}
