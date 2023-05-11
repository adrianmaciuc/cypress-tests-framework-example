
export const SELECTORS = {
	
	// base selectors are those that you can find on all pages (exceptions may apply)
	BASE: {
		footerLinks: '.footer li a',
		searchInput: '[id="search"]',
		searchIconBtn: 'button.action.search',
	},

	// common selectors are those most commonly reused across the entire website
	COMMON: {
		nextBtn : '[data-role="opc-continue"]',
		loadingSpinner: '[title="Loading..."]',
	},

	// selectors may be grouped per feature
	NAVBAR: {
		whatsNew : '[id="ui-id-3"]',
		women: '[id="ui-id-4"]',
		men: '[id="ui-id-5"]',
		gear: '[id="ui-id-6"]',
		training: '[id="ui-id-7"]',
		sale: '[id="ui-id-8"]',
		navbarLinks: '.navigation .level-top > a',
	},

	// selectors may be grouped per page
	HOME_PAGE: {
		blocksPromoLinks : '.blocks-promo a',
	},
	PRODUCT : {
		productItem : '.product-item',
		productItemPhoto: '.product-item-photo',
		productItemInfo: '.product-item-info',
		productItemName: '.product-item-name',
		sizeS: '#option-label-size-143-item-167',
		colorOrange: '#option-label-color-93-item-56',
		addToCartBtn: '#product-addtocart-button',
		addToCartSuccessMsg: '[data-ui-id="message-success"]',
		priceContainer : '.price-container',
		sorter: '[id="sorter"]',
	},
	PRODUCT_FILTERS: {
		filterItem: '.filter-options-item > div',
		filterItemActive: '.filter-options-item.active',
		item : '.item',
	},
	OTHER : {
		miniCart: '[data-block="minicart"]', 
		miniCartCounter: '[data-block="minicart"] .counter .counter-number',
		miniCartSubTotal: '.subtotal .price-container',
		miniCartDropDownProceedToCheckout: '[id="top-cart-btn-checkout"]',
	},
	SHIPPING: {
		email: '#shipping #customer-email',
		firstName: '[name="firstname"]',
		lastName: '[name="lastname"]',
		streetAddress: '[name="street[0]"]',
		city: '[name="city"]',
		stateSelect: '[name="shippingAddress.region_id"] > div > select',
		country: '[name="country_id"]',
		phone: '[name="telephone"]',
		postCode: '[name="postcode"]'
	},
	PAYMENT: {
		shippingDetails: '.shipping-information-content',
		placeOrderBtn: '[title="Place Order"]',
	},
	SUCCESS_PURCHASE : {
		createAccountAreaText: '[id="registration"] p',
		x : 'x'
	},
	HTML : {
		a: 'a',
		inputRadio: 'input.radio',
		typeCheckbox: '[type="checkbox"]'
	}
}