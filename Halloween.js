(function(){
    const pile = []; // Keep track of landed candies
    const symbols = ['🎃','🍬','🍭'];

    document.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        const el = e.target;
        const rect = el.getBoundingClientRect();
        el.remove();

        const area = rect.width * rect.height;
        const numSymbols = Math.max(1, Math.floor(area / 2000));

        for(let i=0;i<numSymbols;i++){
            const candy = document.createElement('div');
            candy.textContent = symbols[Math.floor(Math.random()*symbols.length)];
            candy.style.position = 'fixed';
            candy.style.left = rect.left + Math.random()*rect.width + 'px';
            candy.style.top = rect.top + Math.random()*rect.height + 'px';
            candy.style.fontSize = '2em';
            candy.style.transition = 'top 0.8s ease-in, transform 0.3s ease-out';
            candy.style.zIndex = '9999';
            document.body.appendChild(candy);

            // Fall animation
            setTimeout(() => {
                // Compute the landing Y position
                const candyHeight = candy.offsetHeight;
                let bottomY = window.innerHeight - candyHeight - 5; // 5px margin from bottom

                // Stack on top of previous candies
                if(pile.length > 0){
                    const last = pile[pile.length - 1];
                    const lastRect = last.getBoundingClientRect();
                    bottomY = Math.min(bottomY, lastRect.top - candyHeight);
                }

                candy.style.top = bottomY + 'px';
                pile.push(candy); // Add to pile
            }, 10);

            // Bounce and roll
            setTimeout(() => {
                candy.style.transform = `translateY(-20px) rotate(${Math.random()*60-30}deg)`;
                setTimeout(() => {
                    candy.style.transform = 'translateY(0) rotate(0deg)';
                    candy.style.transition = 'none'; // freeze animation so it stays
                }, 300);
            }, 900 + i*50);
        }
    }, true);
})();
