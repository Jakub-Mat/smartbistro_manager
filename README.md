# 🍔 SmartBistro Manager

> Komplexní systém pro správu provozu a logistiku malého gastra — školní projekt KIV/UUR

---

## 📋 O projektu

SmartBistro Manager je webová aplikace navržená pro manažery a personál malých provozoven rychlého občerstvení. Propojuje správu skladu, tvorbu receptur a přehled objednávek do jednoho rozhraní a digitalizuje každodenní chod pobočky.

Projekt vznikl v rámci předmětu **KIV/UUR** a vychází z reálných zkušeností z provozu — důraz je kladen na praktické řešení skutečných problémů (zmatek v objednávkách, docházející suroviny, ruční inventura).

---

## ✨ Funkce

### 🛒 Objednávkový pohled (Kiosek / Pokladna)
- Přehledné menu rozdělené do kategorií
- Rychlé přidávání položek do košíku
- Zpracování objednávky s okamžitým odpisem surovin ze skladu
- Vhodné jak pro samoobslužný kiosek, tak pro obsluhu na kase

### 🧑‍💼 Manager pohled
- **Dashboard skladu** — přehled stavu surovin, zvýraznění položek pod minimálním stavem
- **Správa menu** — definice produktů, přiřazení surovin, nastavení prodejní ceny
- **Analytika** — přehled prodejů v čase, přehled posledních objednávek a jejich hodnot
- **Receptury** — hierarchická správa kategorií a produktů (Tree View)

---

## 🗂️ Struktura aplikace

```
SmartBistro Manager
├── Objednávkový mód
│   ├── Výběr produktů (menu)
│   └── Košík & pokladna
└── Manager mód
    ├── Dashboard (sklad, upozornění)
    ├── Správa menu & receptur
    └── Analytika & přehledy
```

---

## 🧩 Klíčové komponenty UI

| Komponenta | Popis |
|---|---|
| **Data Grid (MUI X)** | Interaktivní tabulka skladu s filtrováním a inline editací množství |
| **Analytický dashboard** | Grafy prodejů, přehled objednávek a tržeb |

---

## ⚙️ Workflow

1. **Konfigurace menu** — Manažer vytvoří produkt, přiřadí mu suroviny ze skladu a nastaví cenu.
2. **Hlídání skladu** — Systém sleduje minimální stavy; položky pod limitem jsou zvýrazněny v dashboardu.
3. **Příjem objednávky** — Po dokončení objednávky se automaticky odepíší suroviny ze skladu.
4. **Analytika** — Manažer vidí přehled prodejů za zvolené období a hodnoty objednávek.

---

## ⚠️ Známá omezení (Known Limitations)

- Ze skladu lze objednávat bez omezení (není implementována žádná hlubší finanční logika)
- Aplikace nehlídá doby spotřeby, alergeny ani šarže — sleduje pouze počty kusů
- Aktuální nabídka je omezena na burgery (UI/UX demo, ne produkční katalog)
- Finanční logika je aktivní pouze při objednávání (bez napojení na skutečný „bankovní" účet)

---

## 📝 TODO / Plánovaný rozvoj

- Odpočet peněz z „banku" po nákupu zboží na sklad (zavedení cen produktů)
- Evidence zaměstnanců (role, plat, docházka)
- Detail objednávky (rozepsané položky, časy)
- Rozšíření údajů o surovinách (alergeny, trvanlivost, dodavatel)
- Podpora více kategorií produktů
- Vytvořit funkční databázi

---

## 🛠️ Použité technologie

- **React** — frontend framework
- **MUI (Material UI) + MUI X** — komponenty (Data Grid, Tree View)
- **Atomic design struktura** — komponenty se rozdělují na menší celky(atoms,molecules) a skládají do větších celků (organims,pages)
- **CamelCase** — konvence pojmenování proměnných a funkcí
---

## 🚀 Spuštění projektu

```bash
# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm run dev
```

---

## 📚 Kontext

Projekt je vypracován jako semestrální práce předmětu **KIV/UUR** na ZČU v Plzni. Cílem je demonstrovat schopnost navrhnout a implementovat komplexní uživatelské rozhraní s více funkčně odlišnými pohledy, pokročilými UI komponentami a reálnou doménovou logikou.
