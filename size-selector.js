(() => {
    const productCards = document.querySelectorAll('.collection .product-card');

    if (!productCards.length) {
        return;
    }

    const sizes = ['S', 'M', 'L', 'XL'];
    const allSizeButtons = [];

    productCards.forEach((productCard) => {
        const priceElement = productCard.querySelector('.price');

        if (!priceElement || productCard.querySelector('.size-options')) {
            return;
        }

        const sizeOptions = document.createElement('div');
        sizeOptions.className = 'size-options';
        sizeOptions.setAttribute('role', 'group');
        sizeOptions.setAttribute('aria-label', 'Select size');

        const purchaseButton = document.createElement('button');
        purchaseButton.type = 'button';
        purchaseButton.className = 'purchase-button';
        purchaseButton.textContent = 'Purchase';
        purchaseButton.disabled = true;

        sizes.forEach((size) => {
            const sizeButton = document.createElement('button');
            sizeButton.type = 'button';
            sizeButton.className = 'size-button';
            sizeButton.textContent = size;
            sizeButton.setAttribute('aria-pressed', 'false');

            sizeButton.addEventListener('click', () => {
                allSizeButtons.forEach((button) => {
                    button.setAttribute('aria-pressed', button === sizeButton ? 'true' : 'false');
                });

                document.querySelectorAll('.purchase-button').forEach((button) => {
                    button.disabled = button !== purchaseButton;
                });
            });

            allSizeButtons.push(sizeButton);
            sizeOptions.appendChild(sizeButton);
        });

        priceElement.insertAdjacentElement('afterend', sizeOptions);
        sizeOptions.insertAdjacentElement('afterend', purchaseButton);
    });
})();
