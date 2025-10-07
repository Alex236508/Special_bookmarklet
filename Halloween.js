(function(){
    // Create a container for the pile at the bottom
    const pile = document.createElement('div');
    pile.style.position = 'fixed';
    pile.style.bottom = '0';
    pile.style.left = '0';
    pile.style.width = '100%';
    pile.style.height = '200px';
    pile.style.pointerEvents = 'none';
    pile.style.zIndex = '9999';
    document.body.appendChild(pile);

    const symbols = ['🎃','🍬','🍭'];

    document.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        const el = e.target;
        const rect = el.getBoundingClientRect();
        el.remove(); // Remove the clicked element

        // Number of symbols based on element size
        const area = rect.width * rect.height;
        const numSymbols = Math.max(1, Math.floor(area / 2000));

        for(let i=0;i<numSymbols;i++){
            const candy = document.createElement('div');
            candy.textContent = symbols[Math.floor(Math.random()*symbols.length)];
            candy.style.position = 'fixed';
            // Random spawn around element
            candy.style.left = rect.left + Math.random()*rect.width + 'px';
            candy.style.top = rect.top + Math.random()*rect.height + 'px';
            candy.style.fontSize = '2em';
            candy.style.transition = 'top 0.8s ease-in, transform 0.3s ease-out';
            candy.style.zIndex = '9999';
            document.body.appendChild(candy);

            // Calculate landing spot
            const pileRect = pile.getBoundingClientRect();
            // Determine a "drop x" by random offset within the width of the pile
            const dropX = pileRect.left + Math.random() * (pileRect.width - 30);
            const dropY = pileRect.top - 30; // fall to top of pile

            // Fall animation
            setTimeout(() => {
                candy.style.left = dropX + 'px';
                candy.style.top = dropY + 'px';
            }, 10);

            // Bounce and rotate
            setTimeout(() => {
                candy.style.transform = `translateY(-15px) rotate(${Math.random()*60-30}deg)`;
                setTimeout(() => {
                    candy.style.transform = 'translateY(0) rotate(0deg)';
                    candy.style.position = 'absolute';
                    candy.style.left = dropX + 'px';
                    candy.style.top = dropY + 'px';
                    candy.style.transition = 'none';

                    // Stack naturally: check last element's bottom
                    const last = pile.lastElementChild;
                    if(last){
                        const lastRect = last.getBoundingClientRect();
                        candy.style.top = (lastRect.top - candy.offsetHeight) + 'px';
                    }

                    pile.appendChild(candy);
                }, 300);
            }, 900 + i*50);
        }
    }, true);
})();
