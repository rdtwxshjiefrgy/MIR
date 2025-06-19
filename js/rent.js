document.addEventListener('DOMContentLoaded', function() {
    // Переключение категорий техники
    const categoryLinks = document.querySelectorAll('.rent-category');
    const equipmentSections = document.querySelectorAll('.rent-equipment');
    
    // Показываем только первую категорию при загрузке
    equipmentSections.forEach((section, index) => {
        if (index === 0) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    
    // Обработка кликов по категориям
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс у всех ссылок
            categoryLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            // Добавляем активный класс текущей ссылке
            this.classList.add('active');
            
            // Получаем ID целевой секции
            const targetId = this.getAttribute('href').substring(1);
            
            // Скрываем все секции и показываем только целевую
            equipmentSections.forEach(section => {
                section.style.display = 'none';
            });
            
            document.getElementById(targetId).style.display = 'block';
            
            // Плавная прокрутка к секции
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Форма запроса аренды
    const rentForms = document.querySelectorAll('.rent-form');
    rentForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить отправку формы на сервер
            // Для демонстрации просто покажем сообщение
            alert('Ваш запрос на аренду отправлен. Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.');
            
            // Закрываем модальное окно, если оно открыто
            const modal = document.getElementById('callback-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
            
            // Очищаем форму
            this.reset();
        });
    });
});