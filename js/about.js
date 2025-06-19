document.addEventListener('DOMContentLoaded', function() {
    // Инициализация слайдера лицензий
    const licensesSlider = document.querySelector('.licenses-slider');
    if (licensesSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        licensesSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - licensesSlider.offsetLeft;
            scrollLeft = licensesSlider.scrollLeft;
            licensesSlider.style.cursor = 'grabbing';
        });

        licensesSlider.addEventListener('mouseleave', () => {
            isDown = false;
            licensesSlider.style.cursor = 'grab';
        });

        licensesSlider.addEventListener('mouseup', () => {
            isDown = false;
            licensesSlider.style.cursor = 'grab';
        });

        licensesSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - licensesSlider.offsetLeft;
            const walk = (x - startX) * 2;
            licensesSlider.scrollLeft = scrollLeft - walk;
        });

        // Добавляем кнопки навигации для мобильных устройств
        const licenseItems = document.querySelectorAll('.license-item');
        if (licenseItems.length > 0) {
            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.className = 'slider-nav slider-prev';
            
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.className = 'slider-nav slider-next';
            
            licensesSlider.parentNode.insertBefore(prevBtn, licensesSlider);
            licensesSlider.parentNode.insertBefore(nextBtn, licensesSlider.nextSibling);
            
            prevBtn.addEventListener('click', () => {
                licensesSlider.scrollBy({
                    left: -300,
                    behavior: 'smooth'
                });
            });
            
            nextBtn.addEventListener('click', () => {
                licensesSlider.scrollBy({
                    left: 300,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Анимация статистики
    const statNumbers = document.querySelectorAll('.stat-number, .park-stat__number');
    
    function animateNumbers() {
        statNumbers.forEach(number => {
            const target = parseInt(number.textContent);
            const suffix = number.textContent.match(/\D+$/)?.[0] || '';
            let start = 0;
            const duration = 2000;
            const startTime = Date.now();
            
            function updateNumber() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.floor(progress * target);
                
                number.textContent = value + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            }
            
            requestAnimationFrame(updateNumber);
        });
    }
    
    // Запускаем анимацию при появлении в области видимости
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.about-stats, .park-stats').forEach(section => {
        observer.observe(section);
    });
});