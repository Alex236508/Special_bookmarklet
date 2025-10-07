(function(){
    // Create the pile container at the bottom
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
    pile.style.justifyContent = 'flex-start';
    pile.style.zIndex = '9999';
    pile.style.padding = '5px';
    document.body.appendChild(pile);

    const symbols = ['🎃','🍬','🍭'];

    document.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        const el = e.target;
        const rect = el.getBoundingClientRect();
        el.remove(); // Remove clicked element

        // Determine number of symbols based on element area
        const area = rect.width * rect.height;
        const numSymbols = Math.max(1, Math.floor(area / 2000)); // Adjust divisor to tweak density

        for(let i=0; i<numSymbols; i++){
            const candy = document.createElement('div');
            candy.textContent = symbols[Math.floor(Math.random()*symbols.length)];
            candy.style.position = 'fixed';
            candy.style.left = rect.left + rect.width/2 + (Math.random()*20-10) + 'px';
            candy.style.top = rect.top + 'px';
            candy.style.fontSize = '2em';
            candy.style.transition = 'top 0.8s ease-in, transform 0.3s ease-out';
            candy.style.zIndex = '9999';
            document.body.appendChild(candy);

            // Fall straight down
            setTimeout(() => {
                const pileRect = pile.getBoundingClientRect();
                candy.style.top = pileRect.top - 30 + 'px';
            }, 10);

            // Bounce and roll
            setTimeout(() => {
                candy.style.transform = `translateY(-15px) rotate(${Math.random()*60-30}deg)`;
                setTimeout(() => {
                    candy.style.transform = 'translateY(0) rotate(0deg)';

                    // Attach to pile
                    candy.style.position = 'static';
                    candy.style.margin = '2px';
                    candy.style.transition = 'none';
                    candy.style.transform = 'none';
                    pile.appendChild(candy);
                }, 300);
            }, 900 + i*50); // Slight stagger for realism
        }
    }, true);
})();
