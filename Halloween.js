(function(){
    const symbols = ['🎃','🍬','🍭'];
    const candies = [];
    const gravity = 0.8;
    const bounceFactor = 0.3; // small bounce
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
            vx: (Math.random()-0.5)*2,
            vy: 0,
            size: size,
            resting: false
        };
    }

    function animate(){
        candies.forEach(candy => {
            if(candy.resting) return; // Skip resting candies

            candy.vy += gravity;
            candy.y += candy.vy;
            candy.x += candy.vx;

            // Collision with floor
            const floor = window.innerHeight - candy.size;
            if(candy.y > floor){
                candy.y = floor;
                if(Math.abs(candy.vy) < 1){ // small enough velocity to rest
                    candy.vy = 0;
                    candy.resting = true;
                } else {
                    candy.vy *= -bounceFactor;
                    candy.vx *= friction;
                }
            }

            // Collision with other candies
            for(let other of candies){
                if(other === candy) continue;
                const dx = (candy.x + candy.size/2) - (other.x + other.size/2);
                const dy = (candy.y + candy.size/2) - (other.y + other.size/2);
                const distX = Math.abs(dx);
                const distY = Math.abs(dy);

                if(distX < candy.size && distY < candy.size){
                    if(candy.y < other.y){ 
                        // Candy is above another, stack it
                        candy.y = other.y - candy.size;
                        candy.vy = 0;
                        candy.resting = true;
                        // Slight roll if dx != 0
                        candy.vx += dx*0.05;
                    }
                }
            }

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
