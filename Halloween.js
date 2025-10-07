(function(){
    // Create pile container at the bottom
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

    const symbols = ['🎃','🍬','🍭'];

    document.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        const el = e.target;
        const rect = el.getBoundingClientRect();

        // Remove clicked element
        el.remove();

        // Determine number of symbols based on element size
        const numSymbols = Math.max(3, Math.floor((rect.width * rect.height) / 5000));

        for(let i=0; i<numSymbols; i++){
            const candy = document.createElement('div');
            candy.textContent = symbols[Math.floor(Math.random()*symbols.length)];
            candy.style.position = 'fixed';
            candy.style.left = rect.left + rect.width/2 + (Math.random()*30-15) + 'px';
            candy.style.top = rect.top + 'px';
            candy.style.fontSize = '2em';
            candy.style.transition = 'top 0.8s ease-in';
            candy.style.zIndex = '9999';
            document.body.appendChild(candy);

            // Animate falling straight down
            setTimeout(() => {
                const pileRect = pile.getBoundingClientRect();
                candy.style.top = pileRect.top - 30 + Math.random()*30 + 'px'; // fall
            }, 10);

            // Bounce effect on landing
            setTimeout(() => {
                candy.style.transition = 'transform 0.3s ease-out';
                candy.style.transform = 'translateY(-15px)';
                setTimeout(() => {
                    candy.style.transform = 'translateY(0)';
                }, 300);

                candy.style.position = 'static';
                candy.style.margin = '2px';
                candy.style.transition = 'none';
                pile.appendChild(candy);
            }, 900);
        }
    }, true);
})();
