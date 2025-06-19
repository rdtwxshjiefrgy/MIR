document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('transport-calculator');
    if (!calculatorForm) return;

    const distanceInput = document.getElementById('distance');
    const weightInput = document.getElementById('weight');
    const volumeInput = document.getElementById('volume');
    const vehicleTypeSelect = document.getElementById('vehicle-type');
    const urgencySelect = document.getElementById('urgency');
    const resultElement = document.getElementById('calculation-result');
    const priceElement = document.getElementById('price');
    const timeElement = document.getElementById('time');

    // Vehicle types with base rates (price per km)
    const vehicleRates = {
        'small': 25,
        'medium': 40,
        'large': 60,
        'refrigerator': 70,
        'tanker': 80
    };

    // Urgency multipliers
    const urgencyMultipliers = {
        'standard': 1,
        'express': 1.5,
        'urgent': 2
    };

    // Delivery time estimates (hours per 100 km)
    const deliveryTimes = {
        'standard': 2,
        'express': 1.5,
        'urgent': 1
    };

    calculatorForm.addEventListener('input', calculatePrice);
    calculatorForm.addEventListener('change', calculatePrice);

    function calculatePrice() {
        // Get input values
        const distance = parseFloat(distanceInput.value) || 0;
        const weight = parseFloat(weightInput.value) || 0;
        const volume = parseFloat(volumeInput.value) || 0;
        const vehicleType = vehicleTypeSelect.value;
        const urgency = urgencySelect.value;

        // Validate inputs
        if (distance <= 0 || (weight <= 0 && volume <= 0)) {
            resultElement.classList.add('hidden');
            return;
        }

        // Calculate base price
        let basePrice = distance * vehicleRates[vehicleType];

        // Apply urgency multiplier
        let totalPrice = basePrice * urgencyMultipliers[urgency];

        // Calculate delivery time (minimum 4 hours)
        let deliveryTime = Math.max(4, Math.round(distance / 100 * deliveryTimes[urgency]));

        // Format price
        const formattedPrice = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 0
        }).format(totalPrice);

        // Display results
        priceElement.textContent = formattedPrice;
        timeElement.textContent = `${deliveryTime} часов`;
        resultElement.classList.remove('hidden');
    }

    // Initial calculation
    calculatePrice();
});