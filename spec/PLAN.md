# Testovací plán - Sauce Demo

Tento dokument obsahuje navržené testovací scénáře pro aplikaci Sauce Demo, které ještě nejsou pokryty v existujících testech.

## Přehled existujících testů

### Pokryté scénáře:
- ✅ Login s `standard_user` (happy path)
- ✅ Login s `locked_out_user` (error handling)
- ✅ Validace chybějících přihlašovacích údajů
- ✅ Přidání produktu do košíku
- ✅ Odstranění produktu z košíku
- ✅ Špatné heslo (negative path)

---

## Navržené testovací scénáře

### 1. Checkout Flow (Kompletní nákupní proces)

#### 1.1 Kompletní checkout proces
**Priorita:** Vysoká  
**Soubor:** `tests/exercises/day1/complete-checkout.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přidat produkt do košíku
3. Přejít do košíku
4. Kliknout na "Checkout"
5. Vyplnit checkout informace (firstName, lastName, postalCode)
6. Pokračovat na checkout overview
7. Dokončit objednávku
8. Ověřit potvrzovací zprávu "Thank you for your order!"
9. Ověřit, že košík je prázdný po dokončení

**Použité Page Objects:** `LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage`

---

#### 1.2 Checkout s více produkty
**Priorita:** Vysoká  
**Soubor:** `tests/exercises/day1/checkout-multiple-items.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přidat 3 různé produkty do košíku
3. Přejít do košíku
4. Ověřit, že všechny 3 produkty jsou v košíku
5. Dokončit checkout proces
6. Ověřit, že všechny produkty jsou v checkout overview

---

#### 1.3 Zrušení checkout procesu
**Priorita:** Střední  
**Soubor:** `tests/exercises/day1/cancel-checkout.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přidat produkt do košíku
3. Přejít do košíku
4. Kliknout na "Checkout"
5. Vyplnit checkout informace
6. Kliknout na "Cancel" na checkout information stránce
7. Ověřit, že se vrátíme zpět do košíku
8. Ověřit, že produkt je stále v košíku

---

### 2. Product Detail Page (Detail produktu)

#### 2.1 Zobrazení detailu produktu
**Priorita:** Střední  
**Soubor:** `tests/exercises/day1/product-detail-view.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Kliknout na první produkt v seznamu
3. Ověřit, že se načte stránka s detailem produktu
4. Ověřit, že název produktu odpovídá
5. Ověřit, že cena je zobrazena
6. Ověřit, že popis produktu je zobrazen
7. Ověřit, že tlačítko "Add to cart" je dostupné

**Poznámka:** Možná bude potřeba vytvořit `ProductDetailPage` Page Object.

---

#### 2.2 Přidání produktu z detailu
**Priorita:** Střední  
**Soubor:** `tests/exercises/day1/add-from-detail.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Kliknout na produkt v seznamu
3. Na detailu produktu kliknout na "Add to cart"
4. Ověřit, že cart badge se aktualizuje
5. Přejít do košíku
6. Ověřit, že produkt je v košíku

---

### 3. Multiple Products (Více produktů)

#### 3.1 Přidání více produktů do košíku
**Priorita:** Vysoká  
**Soubor:** `tests/exercises/day1/add-multiple-products.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přidat první produkt do košíku
3. Ověřit cart badge = 1
4. Přidat druhý produkt do košíku
5. Ověřit cart badge = 2
6. Přidat třetí produkt do košíku
7. Ověřit cart badge = 3
8. Přejít do košíku
9. Ověřit, že všechny 3 produkty jsou v košíku

---

#### 3.2 Odstranění konkrétního produktu z košíku s více produkty
**Priorita:** Střední  
**Soubor:** `tests/exercises/day1/remove-specific-item.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přidat 3 produkty do košíku
3. Přejít do košíku
4. Zaznamenat názvy všech produktů
5. Odstranit prostřední produkt (index 1)
6. Ověřit, že cart badge = 2
7. Ověřit, že odstraněný produkt není v košíku
8. Ověřit, že ostatní 2 produkty jsou stále v košíku

---

### 4. Sorting & Filtering (Řazení a filtrování)

#### 4.1 Řazení produktů podle ceny (low to high)
**Priorita:** Střední  
**Soubor:** `tests/exercises/day1/sort-price-low-to-high.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Ověřit, že produkty jsou zobrazeny
3. Vybrat sort option "Price (low to high)"
4. Ověřit, že produkty jsou seřazeny podle ceny vzestupně
5. Ověřit, že první produkt má nejnižší cenu

**Poznámka:** Možná bude potřeba přidat metody do `InventoryPage` pro sortování.

---

#### 4.2 Řazení produktů podle názvu (A to Z)
**Priorita:** Střední  
**Soubor:** `tests/exercises/day1/sort-name-a-to-z.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Vybrat sort option "Name (A to Z)"
3. Ověřit, že produkty jsou seřazeny abecedně
4. Ověřit, že první produkt začíná na "A" nebo má nejnižší abecední hodnotu

---

#### 4.3 Řazení produktů podle názvu (Z to A)
**Priorita:** Střední  
**Soubor:** `tests/exercises/day1/sort-name-z-to-a.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Vybrat sort option "Name (Z to A)"
3. Ověřit, že produkty jsou seřazeny obráceně abecedně
4. Ověřit, že první produkt má nejvyšší abecední hodnotu

---

### 5. User Types (Různé typy uživatelů)

#### 5.1 Login s `problem_user`
**Priorita:** Střední  
**Soubor:** `tests/exercises/day1/login-problem-user.spec.ts`

**Kroky:**
1. Přihlásit se jako `problem_user` s heslem `secret_sauce`
2. Ověřit, že se přihlášení podařilo
3. Ověřit, že inventory page se načetla
4. Ověřit, že produkty jsou zobrazeny

**Poznámka:** `problem_user` má známé UI problémy, ale login by měl fungovat.

---

#### 5.2 Login s `performance_glitch_user`
**Priorita:** Střední  
**Soubor:** `tests/exercises/day1/login-performance-glitch-user.spec.ts`

**Kroky:**
1. Přihlásit se jako `performance_glitch_user` s heslem `secret_sauce`
2. Ověřit, že se přihlášení podařilo (může trvat déle)
3. Ověřit, že inventory page se načetla
4. Ověřit timeout handling pro pomalé načítání

---

### 6. Navigation & UI (Navigace a UI)

#### 6.1 Navigace zpět z košíku do inventory
**Priorita:** Nízká  
**Soubor:** `tests/exercises/day1/navigate-back-from-cart.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přidat produkt do košíku
3. Přejít do košíku
4. Kliknout na "Continue Shopping"
5. Ověřit, že se vrátíme na inventory page
6. Ověřit, že cart badge stále ukazuje správný počet

---

#### 6.2 Navigace zpět z checkout do košíku
**Priorita:** Nízká  
**Soubor:** `tests/exercises/day1/navigate-back-from-checkout.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přidat produkt do košíku
3. Přejít do košíku
4. Kliknout na "Checkout"
5. Kliknout na "Cancel" na checkout information stránce
6. Ověřit, že se vrátíme do košíku

---

#### 6.3 Logout funkce
**Priorita:** Střední  
**Soubor:** `tests/exercises/day1/logout.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Ověřit, že jsme přihlášeni (inventory page)
3. Otevřít burger menu
4. Kliknout na "Logout"
5. Ověřit, že jsme odhlášeni (jsme na login stránce)
6. Ověřit, že při pokusu o přístup na `/inventory.html` jsme přesměrováni na login

**Poznámka:** Možná bude potřeba přidat metody do `InventoryPage` pro burger menu a logout.

---

### 7. Edge Cases & Negative Tests (Hraniční případy)

#### 7.1 Checkout s prázdným košíkem
**Priorita:** Nízká  
**Soubor:** `tests/exercises/day1/checkout-empty-cart.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přejít přímo na `/cart.html`
3. Ověřit, že checkout tlačítko není dostupné nebo je disabled
4. Ověřit, že košík je prázdný

---

#### 7.2 Checkout s neúplnými údaji
**Priorita:** Střední  
**Soubor:** `tests/exercises/day1/checkout-incomplete-info.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přidat produkt do košíku
3. Přejít do košíku a kliknout na "Checkout"
4. Pokusit se pokračovat bez vyplnění údajů
5. Ověřit, že se zobrazí chybová zpráva
6. Vyplnit pouze firstName a pokusit se pokračovat
7. Ověřit, že se zobrazí chybová zpráva
8. Vyplnit všechny údaje a ověřit, že můžeme pokračovat

**Poznámka:** Možná bude potřeba přidat metody do `CheckoutPage` pro validaci.

---

#### 7.3 Přidání a odstranění stejného produktu vícekrát
**Priorita:** Nízká  
**Soubor:** `tests/exercises/day1/add-remove-same-product.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přidat produkt do košíku
3. Odstranit produkt z košíku
4. Znovu přidat stejný produkt
5. Ověřit, že cart badge funguje správně
6. Ověřit, že produkt je v košíku

---

#### 7.4 Přidání produktu, který už je v košíku
**Priorita:** Nízká  
**Soubor:** `tests/exercises/day1/add-duplicate-product.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přidat první produkt do košíku
3. Znovu kliknout na "Add to cart" pro stejný produkt
4. Ověřit chování (buď se přidá další instance, nebo se zobrazí zpráva)
5. Přejít do košíku a ověřit počet instancí produktu

---

### 8. Data Validation (Validace dat)

#### 8.1 Checkout s prázdnými poli
**Priorita:** Střední  
**Soubor:** `tests/exercises/day1/checkout-empty-fields.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přidat produkt do košíku
3. Přejít do košíku a kliknout na "Checkout"
4. Pokusit se pokračovat s prázdnými poli
5. Ověřit, že se zobrazí chybová zpráva pro každé prázdné pole

---

#### 8.2 Checkout s neplatnými údaji
**Priorita:** Nízká  
**Soubor:** `tests/exercises/day1/checkout-invalid-data.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přidat produkt do košíku
3. Přejít do košíku a kliknout na "Checkout"
4. Vyplnit checkout informace s neplatnými údaji (např. velmi dlouhé texty, speciální znaky)
5. Ověřit chování aplikace

---

### 9. Cart Badge Updates (Aktualizace cart badge)

#### 9.1 Cart badge aktualizace při přidání produktu
**Priorita:** Střední  
**Soubor:** `tests/exercises/day1/cart-badge-updates.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Ověřit, že cart badge není viditelný (košík je prázdný)
3. Přidat první produkt - ověřit badge = 1
4. Přidat druhý produkt - ověřit badge = 2
5. Odstranit jeden produkt - ověřit badge = 1
6. Odstranit poslední produkt - ověřit, že badge není viditelný

---

### 10. Integration Tests (Integrační testy)

#### 10.1 Kompletní uživatelský flow - nákup
**Priorita:** Vysoká  
**Soubor:** `tests/exercises/day1/complete-purchase-flow.spec.ts`

**Kroky:**
1. Přihlásit se jako `standard_user`
2. Přidat 2 produkty do košíku
3. Přejít do košíku
4. Ověřit produkty v košíku
5. Dokončit checkout proces
6. Ověřit potvrzovací zprávu
7. Kliknout na "Back Home"
8. Ověřit, že jsme zpět na inventory page
9. Ověřit, že košík je prázdný

---

## Prioritizace implementace

### Vysoká priorita (implementovat jako první):
1. ✅ Kompletní checkout proces
2. ✅ Checkout s více produkty
3. ✅ Přidání více produktů do košíku
4. ✅ Kompletní uživatelský flow - nákup

### Střední priorita:
5. ✅ Zrušení checkout procesu
6. ✅ Zobrazení detailu produktu
7. ✅ Přidání produktu z detailu
8. ✅ Odstranění konkrétního produktu z košíku s více produkty
9. ✅ Řazení produktů
10. ✅ Login s různými typy uživatelů
11. ✅ Logout funkce
12. ✅ Checkout s neúplnými údaji
13. ✅ Cart badge aktualizace

### Nízká priorita:
14. ✅ Navigační testy
15. ✅ Edge cases
16. ✅ Validace dat

---

## Poznámky k implementaci

### Nové Page Objects, které mohou být potřeba:
- `ProductDetailPage` - pro detail produktu
- Možná rozšíření existujících Page Objects:
  - `InventoryPage`: metody pro sortování produktů
  - `InventoryPage`: metody pro burger menu a logout
  - `CheckoutPage`: metody pro validaci formulářů

### Testovací data:
- Uživatelé: `standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`
- Heslo: `secret_sauce` (pro všechny uživatele)
- Checkout data: připravit testovací data pro firstName, lastName, postalCode

### Best Practices:
- Všechny testy by měly používat Page Object Model pattern
- Používat existující Page Objects z `tests/pages/`
- Zahrnout proper waits a assertions
- Testy by měly být nezávislé a idempotentní

---

## Metriky pokrytí

Po implementaci všech navržených testů by mělo být pokryto:
- ✅ Login flow (různé uživatelské typy)
- ✅ Product browsing
- ✅ Cart management (add, remove, multiple items)
- ✅ Checkout flow (kompletní proces)
- ✅ Navigation
- ✅ Edge cases a negative tests
- ✅ Data validation

---

*Dokument vytvořen pomocí MCP browser tools a analýzy existujících testů a Page Object Model tříd.*

