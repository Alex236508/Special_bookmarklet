(function(){
    const symbols = ['🎃','🍬','🍭'];
    const candies = []; // Track all falling/landed candies
    const gravity = 0.8;
    const bounceFactor = 0.5;
    const friction = 0.8;

    function createCandy(x, y, size=32){
        const candy = document.createElement('div');
        candy.textContent = symbols[Math.floor(Math.random()*symbols.length)];
        candy.style.position = 'fixed';
        candy.style.left = x + 'px';
        candy.style.top = y + 'px';
        candy.style.fontSize = `${size}px`;
        candy.style.zIndex = 9999;
        document.body.appendChild(candy);
        return {
            el: candy,
            x: x,
            y: y,
            vx: (Math.random()-0.5)*2, // small horizontal velocity
            vy: 0,
            size: size
        };
    }

    function animate(){
        candies.forEach(candy => {
            candy.vy += gravity;
            candy.y += candy.vy;
            candy.x += candy.vx;

            // Collision with floor
            const floor = window.innerHeight - candy.size;
            if(candy.y > floor){
                candy.y = floor;
                candy.vy *= -bounceFactor;
                candy.vx *= friction;

                // Small rotation to simulate rolling
                candy.el.style.transform = `rotate(${Math.random()*40-20}deg)`;
            }

            // Collision with other candies
            candies.forEach(other => {
                if(other !== candy){
                    const dx = (candy.x + candy.size/2) - (other.x + other.size/2);
                    const dy = (candy.y + candy.size/2) - (other.y + other.size/2);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if(dist < candy.size){
                        // Simple push aside
                        const overlap = candy.size - dist;
                        const pushX = (dx/dist)*overlap*0.5;
                        candy.x += pushX;
                        candy.vx *= 0.9;
                    }
                }
            });

            candy.el.style.left = candy.x + 'px';
            candy.el.style.top = candy.y + 'px';
        });
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    document.addEventListener('click', e=>{
        e.preventDefault();
        e.stopPropagation();
        const el = e.target;
        const rect = el.getBoundingClientRect();
        el.remove();
        const area = rect.width*rect.height;
        const numCandies = Math.max(1, Math.floor(area/2000));
        for(let i=0;i<numCandies;i++){
            const spawnX = rect.left + Math.random()*rect.width;
            const spawnY = rect.top + Math.random()*rect.height;
            candies.push(createCandy(spawnX, spawnY, 32));
        }
    }, true);
})();
