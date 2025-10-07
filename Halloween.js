(function(){
    const pile = document.createElement('div');
    pile.style.position = 'fixed';
    pile.style.bottom = '0';
    pile.style.left = '0';
    pile.style.width = '100%';
    pile.style.height = '0'; // Invisible container for stacking
    pile.style.pointerEvents = 'none';
    pile.style.zIndex = '9999';
    document.body.appendChild(pile);

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
                const candyHeight = candy.offsetHeight;
                const bottomY = window.innerHeight - candyHeight - 5; // 5px above bottom
                candy.style.top = bottomY + 'px';
            }, 10);

            // Bounce and roll
            setTimeout(() => {
                candy.style.transform = `translateY(-20px) rotate(${Math.random()*60-30}deg)`;
                setTimeout(() => {
                    candy.style.transform = 'translateY(0) rotate(0deg)';

                    // Fix position to absolute for stacking
                    candy.style.position = 'absolute';
                    candy.style.transition = 'none';

                    // Stack naturally on previous candies
                    let lastBottom = pile.lastElementChild ? pile.lastElementChild.getBoundingClientRect().top : window.innerHeight - candy.offsetHeight - 5;
                    candy.style.left = candy.offsetLeft + 'px';
                    candy.style.top = lastBottom - candy.offsetHeight + 'px';

                    pile.appendChild(candy);
                }, 300);
            }, 900 + i*50);
        }
    }, true);
})();
