(function(){
    // Create a pile container at the bottom of the page
    const pile = document.createElement('div');
    pile.style.position = 'fixed';
    pile.style.bottom = '0';
    pile.style.left = '0';
    pile.style.width = '100%';
    pile.style.height = '150px';
    pile.style.pointerEvents = 'none';
    pile.style.display = 'flex';
    pile.style.flexWrap = 'wrap';
    pile.style.alignItems = 'flex-end';
    pile.style.justifyContent = 'center';
    pile.style.zIndex = '9999';
    pile.style.padding = '10px';
    document.body.appendChild(pile);

    // Halloween symbols to use
    const symbols = ['🎃', '🍬', '🍭'];

    // Click handler
    document.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        const el = e.target;

        // Get position of the clicked element
        const rect = el.getBoundingClientRect();

        // Remove original element
        el.remove();

        // Create a symbol element
        const candy = document.createElement('div');
        candy.textContent = symbols[Math.floor(Math.random()*symbols.length)];
        candy.style.position = 'fixed';
        candy.style.left = rect.left + 'px';
        candy.style.top = rect.top + 'px';
        candy.style.fontSize = '2em';
        candy.style.transition = 'all 1s ease-in';
        candy.style.zIndex = '9999';

        document.body.appendChild(candy);

        // Animate the candy falling into the pile
        setTimeout(() => {
            const pileRect = pile.getBoundingClientRect();
            // Random x position in pile
            const x = pileRect.left + Math.random() * (pileRect.width - 30);
            const y = pileRect.top + Math.random() * 30;
            candy.style.left = x + 'px';
            candy.style.top = y + 'px';
        }, 10);

        // After animation, attach to pile
        setTimeout(() => {
            candy.style.position = 'static';
            candy.style.margin = '2px';
            candy.style.transition = 'none';
            pile.appendChild(candy);
        }, 1100);

    }, true);
})();
