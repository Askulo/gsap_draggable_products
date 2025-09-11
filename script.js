// Register the GSAP Flip plugin
gsap.registerPlugin(Flip, Draggable, SplitText);


// Correctly declare variables without 'this'
const dom = document.querySelector(".container");
const grid = document.querySelector(".grid");
const products = document.querySelectorAll(".product");
const details = document.querySelector(".details");
const details_thumb = document.querySelector(".details_thumb");
const titles = document.querySelectorAll(".details_title"); // Correct selector
const texts = document.querySelectorAll(".details_texts"); // Correct selector

let currentProduct = null; // Add this line before the observer
let originalParent = null;
let observer = null; // Declare observer in the global scope

// Add event listeners to each product to trigger the flip
products.forEach((product) => {
  product.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent grid click from firing
    if (currentProduct) return; // Prevent multiple products from being clicked
    const productToFlip = product.querySelector("div[data-id]");
    showDetails(productToFlip);
  });
});

// Add event listener to grid for closing details panel and reversing flip
grid.addEventListener("click", () => {
  if (currentProduct && originalParent) {
    // Reverse the flip (fix: capture state before moving)
    const state = Flip.getState(currentProduct);
    originalParent.appendChild(currentProduct);
    Flip.from(state, {
      absolute: true,
      duration: 1.2,
      ease: "power3.inOut",
      scale: true,
      onStart: () => {
        currentProduct.style.visibility = 'visible';
      }
    });
    // Hide details panel
    gsap.to(details, {
      x: window.innerWidth + 50,
      duration: 1.2,
      ease: "power3.inOut",
    });
    gsap.to(dom, {
      x: 0,
      duration: 1.2,
      ease: "power3.inOut",
    });
    currentProduct = null;
    originalParent = null;
  }
});

// Refactor functions to use the declared variables directly
function centerGrid() {
  const gridWidth = grid.offsetWidth;
  const gridHeight = grid.offsetHeight;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const centerX = (windowWidth - gridWidth) / 2;
  const centerY = (windowHeight - gridHeight) / 2;

  gsap.set(grid, {
    x: centerX,
    y: centerY,
  });
}

function intro() {
  centerGrid(); // Call the function directly

  const timeline = gsap.timeline();

  timeline.set(dom, { scale: 0.5 });
  timeline.set(products, {
    scale: 0.5,
    opacity: 0,
  });

  timeline.to(products, {
    scale: 1,
    opacity: 1,
    duration: 0.6,
    ease: "power3.out",
    stagger: { amount: 1.2, from: "random" },
  });

  timeline.to(dom, {
    scale: 1,
    duration: 1.2,
    ease: "power3.inOut",
    oncomplete: startObserver,
  });
}

// **This is the missing line** - call the function to start the animation
intro();

function setupDraggable() {
  draggable = Draggable.create(grid, {
    type: "x,y",
    bounds: {
      minX: -(grid.offsetWidth - window.innerWidth) - 200,
      maxX: 200,
      minY: -(grid.offsetHeight - window.innerHeight) - 100,
      maxY: 100,
    },
    inertia: true,
    allowEventDefault: true,
    edgeResistance: 0.9,
  })[0];
}

setupDraggable();

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();

    const deltaX = -e.deltaX * 7;
    const deltaY = -e.deltaY * 7;

    const currentX = gsap.getProperty(grid, "x");
    const currentY = gsap.getProperty(grid, "y");

    const newX = currentX + deltaX;
    const newY = currentY + deltaY;

    const bounds = draggable.vars.bounds;
    const clampedX = Math.max(bounds.minX, Math.min(bounds.maxX, newX));
    const clampedY = Math.max(bounds.minY, Math.min(bounds.maxY, newY));

    gsap.to(grid, {
      x: clampedX,
      y: clampedY,
      duration: 0.3,
      ease: "power3.out",
    });
  },
  { passive: false }
);

// **New function to start the observer**
function startObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === currentProduct) return;
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        } else {
          gsap.to(entry.target, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: "power2.in",
          });
        }
      });
    },
    { root: null, threshold: 0.1 }
  );

  products.forEach((product) => observer.observe(product));
}

gsap.set(details, {
  x: window.innerWidth + 50,
});

function showDetails(product) {
  gsap.to(dom, {
    x: "-50vw",
    duration: 1.2,
    ease: "power3.inOut",
  });

  gsap.to(details, {
    x: "50vw",
    duration: 1.2,
    ease: "power3.inOut",
  });

  flipProduct(product);
}

function flipProduct(product) {
  currentProduct = product;
  originalParent = product.parentNode;

  if (observer) {
    observer.unobserve(product);
  }

  const state = Flip.getState(product);
  details_thumb.appendChild(product);

  Flip.from(state, {
    absolute: true,
    duration: 1.2,
    ease: "power3.inOut",
    scale: true,
  });

  gsap.from(".details_texts", {
    y: 200,
    opacity: 0,
    duration: 1.1,
    delay: 0.4,
    ease: "power3.out",
    // onComplete: animateText
  });
}

const splitTitles = new SplitText(titles, {
  type: "lines, chars",
  mask: "lines",
  charClass: "char",
});

const splitTexts = new SplitText(texts, {
  type: "lines",
  mask: "lines",
  lineClass: "line",
});

gsap.to(splitTitles.chars, {
  y: 0,
  duration: 1.1,
  delay: 0.4,
  ease: "power3.out",
  stagger: 0.025,
});

gsap.to(splitTexts.lines, {
  y: 0,
  duration: 1.1,
  delay: 0.4,
  ease: "power3.out",
});
