		const countDisplay = document.getElementById('count');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    const resetBtn = document.getElementById('reset');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    let count = 0;

    /**
     * Adds a ripple effect to the clicked button.
     * @param {Event} e - The click event object.
     */
    function createRipple(e) {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        // Remove any existing ripple to prevent multiple animations stacking
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(circle);

        // Remove the ripple element after animation
        circle.addEventListener('animationend', () => {
            circle.remove();
        });
    }

    /**
     * Updates the count display and enables/disables the decrement button.
     * Triggers a subtle animation on the count display.
     */
    function updateDisplay() {
      countDisplay.textContent = count;
      decrementBtn.disabled = count === 0;

      // Trigger count animation
      countDisplay.classList.remove('animated');
      // Force reflow to restart animation
      void countDisplay.offsetWidth;
      countDisplay.classList.add('animated');
    }

    /**
     * Handles incrementing the count.
     */
    incrementBtn.addEventListener('click', (e) => {
      count++;
      updateDisplay();
      createRipple(e);
    });

    /**
     * Handles decrementing the count, ensuring it doesn't go below zero.
     */
    decrementBtn.addEventListener('click', (e) => {
      if (count > 0) {
        count--;
        updateDisplay();
        createRipple(e);
      }
    });

    /**
     * Handles resetting the count.
     */
    resetBtn.addEventListener('click', (e) => {
      count = 0;
      updateDisplay();
      createRipple(e);
    });

    /**
     * Applies the saved theme preference from local storage or defaults to light.
     */
    function applyThemePreference() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true; // Set toggle state
      } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false; // Set toggle state
      }
    }

    /**
     * Toggles the theme between light and dark mode and saves preference.
     */
    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });

    // Initialize display and apply theme on load
    applyThemePreference();
    updateDisplay();