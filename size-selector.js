(() => {
    const productCards = document.querySelectorAll('.collection .product-card');

    if (!productCards.length) {
        return;
    }

    const sizes = ['S', 'M', 'L', 'XL'];
    const allSizeButtons = [];
    let lastFocusedElement = null;
    let activePurchaseDetails = null;
    const modalIdSuffix = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const purchaseModalTitleId = `purchase-modal-title-${modalIdSuffix}`;
    const pageSections = Array.from(document.querySelectorAll('header, main, footer'));

    const purchaseModal = document.createElement('div');
    purchaseModal.className = 'purchase-modal-overlay';
    purchaseModal.hidden = true;
    purchaseModal.setAttribute('aria-hidden', 'true');
    purchaseModal.innerHTML = `
        <div class="purchase-modal" role="dialog" aria-modal="true" aria-labelledby="${purchaseModalTitleId}" tabindex="-1">
            <button type="button" class="purchase-modal-close" aria-label="Close purchase confirmation">&times;</button>
            <div class="purchase-modal-content">
                <img class="purchase-modal-image" alt="">
                <div class="purchase-modal-image-fallback" hidden></div>
                <div class="purchase-modal-copy">
                    <p class="purchase-modal-eyebrow">Graceful Fashion</p>
                    <h3 id="${purchaseModalTitleId}"></h3>
                    <p class="purchase-modal-size"><span>Selected Size:</span> <strong></strong></p>
                </div>
            </div>
            <button type="button" class="purchase-modal-confirm">Pay with Paystack</button>
        </div>
    `;
    document.body.appendChild(purchaseModal);

    const purchaseModalDialog = purchaseModal.querySelector('.purchase-modal');
    const purchaseModalImage = purchaseModal.querySelector('.purchase-modal-image');
    const purchaseModalImageFallback = purchaseModal.querySelector('.purchase-modal-image-fallback');
    const purchaseModalTitle = purchaseModal.querySelector('.purchase-modal-copy h3');
    const purchaseModalSize = purchaseModal.querySelector('.purchase-modal-size strong');
    const purchaseModalCloseButton = purchaseModal.querySelector('.purchase-modal-close');
    const purchaseModalConfirmButton = purchaseModal.querySelector('.purchase-modal-confirm');

    const showImageFallback = (message) => {
        purchaseModalImage.removeAttribute('src');
        purchaseModalImage.alt = '';
        purchaseModalImage.hidden = true;
        purchaseModalImageFallback.textContent = message;
        purchaseModalImageFallback.hidden = false;
    };

    const getFocusableElements = () =>
        Array.from(
            purchaseModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        ).filter((element) => !element.disabled && !element.hidden);

    const restorePageState = () => {
        pageSections.forEach((section) => {
            if (section.dataset.modalManagedAriaHidden) {
                if (section.dataset.modalPreviousAriaHidden) {
                    section.setAttribute('aria-hidden', section.dataset.modalPreviousAriaHidden);
                    delete section.dataset.modalPreviousAriaHidden;
                } else {
                    section.removeAttribute('aria-hidden');
                }
            }

            if (section.dataset.modalManagedInert) {
                section.inert = false;
            }

            delete section.dataset.modalManagedAriaHidden;
            delete section.dataset.modalManagedInert;
        });
    };

    const closePurchaseModal = () => {
        if (purchaseModal.hidden) {
            return;
        }

        document.removeEventListener('keydown', handleModalKeydown);
        purchaseModal.hidden = true;
        purchaseModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('purchase-modal-open');
        restorePageState();
        activePurchaseDetails = null;

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    };

    const handleModalKeydown = (event) => {
        if (purchaseModal.hidden) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            closePurchaseModal();
            return;
        }

        if (event.key !== 'Tab') {
            return;
        }

        const focusableElements = getFocusableElements();

        if (!focusableElements.length) {
            event.preventDefault();
            purchaseModalDialog.focus();
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    };

    const getSelectedSize = (productCard) =>
        productCard.querySelector('.size-button[aria-pressed="true"]')?.textContent?.trim();

    const openPurchaseModal = (productCard, purchaseButton) => {
        const productImage = productCard.querySelector('.product-image');
        const productTitle = productCard.querySelector('h3')?.textContent?.trim() || 'Selected Product';
        const selectedSize = getSelectedSize(productCard);

        if (!selectedSize) {
            return;
        }

        purchaseModalTitle.textContent = productTitle;
        purchaseModalSize.textContent = selectedSize;
        purchaseModalImage.alt = '';
        purchaseModalImage.onerror = () => {
            showImageFallback(`${productTitle} preview unavailable`);
        };
        purchaseModalImage.onload = () => {
            purchaseModalImage.alt = '';
            purchaseModalImage.hidden = false;
            purchaseModalImageFallback.hidden = true;
            purchaseModalImageFallback.textContent = '';
        };

        if (productImage?.getAttribute('src')) {
            purchaseModalImage.src = productImage.getAttribute('src');
            purchaseModalImage.hidden = false;
            purchaseModalImageFallback.hidden = true;
            purchaseModalImageFallback.textContent = '';
        } else {
            showImageFallback(`${productTitle} preview unavailable`);
        }

        pageSections.forEach((section) => {
            if (!section.dataset.modalManagedAriaHidden && section.hasAttribute('aria-hidden')) {
                section.dataset.modalPreviousAriaHidden = section.getAttribute('aria-hidden');
            }
            section.dataset.modalManagedAriaHidden = 'true';

            if (!section.inert) {
                section.inert = true;
                section.dataset.modalManagedInert = 'true';
            }

            section.setAttribute('aria-hidden', 'true');
        });

        lastFocusedElement = purchaseButton;
        activePurchaseDetails = {
            image: purchaseModalImage.hidden ? null : purchaseModalImage.getAttribute('src'),
            name: productTitle,
            size: selectedSize
        };
        purchaseModal.hidden = false;
        purchaseModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('purchase-modal-open');
        document.addEventListener('keydown', handleModalKeydown);
        purchaseModalCloseButton.focus();
    };

    purchaseModalCloseButton.addEventListener('click', closePurchaseModal);
    purchaseModalConfirmButton.addEventListener('click', () => {
        if (activePurchaseDetails) {
            document.dispatchEvent(
                new CustomEvent('gracefulfashion:purchase-confirmed', {
                    detail: activePurchaseDetails
                })
            );
        }

        closePurchaseModal();
    });
    purchaseModal.addEventListener('click', (event) => {
        if (event.target === purchaseModal) {
            closePurchaseModal();
        }
    });

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
        purchaseButton.addEventListener('click', () => {
            if (purchaseButton.disabled) {
                return;
            }

            openPurchaseModal(productCard, purchaseButton);
        });

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
