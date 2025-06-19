document.addEventListener('DOMContentLoaded', function() {
    // Инициализация карты
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = L.map('map').setView([55.751244, 37.618423], 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        L.marker([55.751244, 37.618423]).addTo(map)
            .bindPopup('ООО "Мир"<br>ул. Промышленная, 15')
            .openPopup();
    }
    
    // Обработка формы обратной связи
    const contactForm = document.querySelector('.contacts-form .form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить отправку формы на сервер
            // Для демонстрации просто покажем сообщение
            alert('Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
            
            // Очищаем форму
            this.reset();
        });
    }
    
    // Инициализация табов для филиалов
    const departmentTabs = document.querySelectorAll('.department-tab');
    const departmentContents = document.querySelectorAll('.department-content');
    
    if (departmentTabs.length > 0) {
        departmentTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                
                // Удаляем активный класс у всех табов и контента
                departmentTabs.forEach(t => t.classList.remove('active'));
                departmentContents.forEach(c => c.classList.remove('active'));
                
                // Добавляем активный класс текущему табу и соответствующему контенту
                this.classList.add('active');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
});