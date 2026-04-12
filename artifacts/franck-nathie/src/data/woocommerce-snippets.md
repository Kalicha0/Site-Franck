# Snippets CSS WooCommerce — Style Franck Nathie

Coller dans **Apparence → Personnaliser → CSS supplémentaire** (ou dans le Custom CSS Elementor).

## Import de la police Atma

```html
<!-- Dans le <head> de votre thème (functions.php ou via plugin) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Atma:wght@400;600;700&display=swap" rel="stylesheet">
```

---

## CSS complet

```css
/* =============================================
   WOOCOMMERCE — STYLE FRANCK NATHIE
   Couleurs : #E86B0A (orange), #f0ede8 (crème)
   Police : Atma (Google Fonts)
   ============================================= */

/* --- Titres produits --- */
.woocommerce h1.product_title,
.woocommerce-loop-product__title,
.woocommerce h2.woocommerce-loop-product__title,
.related.products h2,
.woocommerce-tabs h2 {
  font-family: 'Atma', sans-serif !important;
  color: #1f2937 !important;
}

/* --- Breadcrumb --- */
.woocommerce-breadcrumb,
.woocommerce-breadcrumb a {
  color: #E86B0A !important;
  font-size: 13px;
}
.woocommerce-breadcrumb a:hover {
  text-decoration: underline;
}

/* --- Prix --- */
.woocommerce .price,
.woocommerce .price .amount,
.woocommerce .price ins .amount,
.woocommerce ul.products li.product .price {
  color: #E86B0A !important;
  font-size: 1.4rem !important;
  font-weight: 700 !important;
}

/* --- Boutons (ajouter au panier, voir produit) --- */
.woocommerce a.button,
.woocommerce button.button,
.woocommerce input.button,
.woocommerce a.button.alt,
.woocommerce button.button.alt,
.woocommerce #respond input#submit,
.woocommerce .cart .button,
.woocommerce .single_add_to_cart_button,
.wc-block-components-button,
.wc-block-grid__product-add-to-cart .wp-block-button__link {
  background-color: #E86B0A !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
  padding: 12px 24px !important;
  transition: background-color 0.2s ease !important;
}
.woocommerce a.button:hover,
.woocommerce button.button:hover,
.woocommerce .single_add_to_cart_button:hover {
  background-color: #d05e08 !important;
  color: #ffffff !important;
}

/* --- Cartes produits (listing) --- */
.woocommerce ul.products li.product {
  background: #f0ede8 !important;
  border-radius: 16px !important;
  overflow: hidden !important;
  box-shadow: 0 1px 8px rgba(0,0,0,0.07) !important;
  transition: box-shadow 0.2s ease !important;
  padding-bottom: 16px !important;
}
.woocommerce ul.products li.product:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important;
}

/* --- Image produit (listing et fiche) — fond crème --- */
.woocommerce ul.products li.product .woocommerce-loop-product__link img,
.woocommerce ul.products li.product img {
  background: #f0ede8 !important;
  padding: 16px !important;
  object-fit: contain !important;
}
.woocommerce-product-gallery,
.woocommerce-product-gallery__image,
.woocommerce-product-gallery .flex-viewport {
  background: #f0ede8 !important;
  border-radius: 12px !important;
}
.woocommerce-product-gallery__image img {
  object-fit: contain !important;
  padding: 16px !important;
}

/* --- Badge promotion / catégorie --- */
.woocommerce span.onsale {
  background-color: #E86B0A !important;
  color: #ffffff !important;
  border-radius: 20px !important;
  font-weight: 600 !important;
  font-size: 11px !important;
  padding: 4px 10px !important;
  top: 12px !important;
  left: 12px !important;
}

/* --- Onglets (description, avis, etc.) --- */
.woocommerce-tabs ul.tabs {
  border-bottom: 2px solid #f3f4f6 !important;
  padding: 0 !important;
  margin-bottom: 0 !important;
}
.woocommerce-tabs ul.tabs li {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
.woocommerce-tabs ul.tabs li a {
  color: #6b7280 !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  padding: 12px 20px !important;
  background: transparent !important;
  border: none !important;
}
.woocommerce-tabs ul.tabs li.active a {
  color: #E86B0A !important;
  border-bottom: 2px solid #E86B0A !important;
  margin-bottom: -2px !important;
}
.woocommerce-tabs ul.tabs::before,
.woocommerce-tabs ul.tabs li::before,
.woocommerce-tabs ul.tabs li::after {
  display: none !important;
  box-shadow: none !important;
}
.woocommerce-tabs .panel {
  border: none !important;
  box-shadow: none !important;
  background: #ffffff !important;
  border-radius: 12px !important;
  padding: 24px !important;
  margin-top: 0 !important;
}

/* --- Étoiles avis --- */
.woocommerce .star-rating span::before,
.woocommerce .star-rating::before {
  color: #E86B0A !important;
}
.woocommerce .star-rating {
  color: #E86B0A !important;
}

/* --- Section produits similaires --- */
.related.products h2,
.upsells.products h2 {
  font-family: 'Atma', sans-serif !important;
  font-size: 1.6rem !important;
  color: #1f2937 !important;
  margin-bottom: 24px !important;
}

/* --- Quantité (fiche produit) --- */
.woocommerce .quantity .qty {
  border: 2px solid #e5e7eb !important;
  border-radius: 8px !important;
  padding: 8px 12px !important;
  font-size: 15px !important;
}

/* --- Méta (catégories, tags) --- */
.woocommerce .product_meta .posted_in a,
.woocommerce .product_meta .tagged_as a {
  color: #E86B0A !important;
}
.woocommerce .product_meta .posted_in a:hover,
.woocommerce .product_meta .tagged_as a:hover {
  text-decoration: underline !important;
}

/* --- Formulaire d'avis --- */
.woocommerce #review_form #respond .stars a,
.woocommerce #reviews .star-rating {
  color: #E86B0A !important;
}
```
