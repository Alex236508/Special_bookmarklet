(function(){
    const symbols = ['🎃','🍬','🍭','🕸️','🕷️'];
    const candies = [];
    const gravity = 0.8;
    const bounceFactor = 0.3; // how high it bounces
    const friction = 0.98;    // horizontal slowing

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
            vx: (Math.random()-0.5)*4, // give slight random horizontal speed
            vy: 0,
            size: size,
            resting: false
        };
    }

    function animate(){
        candies.forEach(candy => {
            if(candy.resting) return;

            candy.vy += gravity;
            candy.y += candy.vy;
            candy.x += candy.vx;
            candy.vx *= friction;

            // Floor collision
            const floor = window.innerHeight - candy.size;
            if(candy.y > floor){
                candy.y = floor;
                if(Math.abs(candy.vy) < 1){
                    candy.vy = 0;
                    candy.resting = true;
                } else {
                    candy.vy *= -bounceFactor;
                }
            }

            // Horizontal bounds
            if(candy.x < 0){
                candy.x = 0;
                candy.vx *= -bounceFactor;
            } else if(candy.x + candy.size > window.innerWidth){
                candy.x = window.innerWidth - candy.size;
                candy.vx *= -bounceFactor;
            }

            // Candy collisions
            for(let other of candies){
                if(other === candy) continue;

                const dx = (candy.x + candy.size/2) - (other.x + other.size/2);
                const dy = (candy.y + candy.size/2) - (other.y + other.size/2);

                if(Math.abs(dx) < candy.size && dy > 0 && dy < candy.size){
                    // Candy is above another
                    candy.y = other.y - candy.size;

                    // Bounce if moving fast
                    if(Math.abs(candy.vy) > 1){
                        candy.vy *= -bounceFactor;
                        candy.vx += dx*0.05; // roll based on horizontal offset
                    } else {
                        candy.vy = 0;
                        candy.resting = true;
                        candy.vx += dx*0.05; // small roll to settle naturally
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
        const rect = e.target.getBoundingClientRect();

        // Replace element with candies
        const area = rect.width*rect.height;
        const numCandies = Math.max(1, Math.floor(area/1000));
        for(let i=0;i<numCandies;i++){
            const spawnX = rect.left + Math.random()*rect.width;
            const spawnY = rect.top + Math.random()*rect.height;
            candies.push(createCandy(spawnX, spawnY, 32));
        }

        e.target.style.visibility = 'hidden'; // hide original element
    }, true);
})();
