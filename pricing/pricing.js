const toggle = document.getElementById('billingToggle');
const handle = document.querySelector('.switch-handle');
const priceValues = document.querySelectorAll('.price-val');
const durations = document.querySelectorAll('.duration');

let isYearly = false;

toggle.addEventListener('click', () => {
    isYearly = !isYearly;
    
    // Animate handle
    handle.style.left = isYearly ? '30px' : '3px';
    
    priceValues.forEach(price => {
        const monthly = price.getAttribute('data-monthly');
        const yearly = price.getAttribute('data-yearly');
        
        // Update price with transition
        price.style.opacity = "0";
        setTimeout(() => {
            price.textContent = isYearly ? yearly : monthly;
            price.style.opacity = "1";
        }, 150);
    });

    durations.forEach(duration => {
        duration.textContent = isYearly ? '/ yr' : '/ mo';
    });
});