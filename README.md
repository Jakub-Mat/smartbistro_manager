# 📊 SmartBistro Manager

> Komplexní systém pro správu provozu a logistiku malé provozovny — školní projekt KIV/UUR

---

## 📋 O projektu

SmartBistro Manager řeší tři hlavní oblasti provozu: objednávky v kiosku, správu menu a hlídání skladu. Aplikace je postavená jako demo nad `localStorage`, takže po prvním startu běží bez backendu a data se v rámci jedné prohlížečové instance ukládají lokálně.

Projekt je aktuálně nastavený na burgerový demo dataset. V repozitáři jsou připravené čtyři datové sady a aktivní se volí jediným exportem v [src/utils/dataConfig.js](src/utils/dataConfig.js).

## 🧭 Jak aplikace funguje

Při startu se v [src/App.jsx](src/App.jsx) zavolá `seedLocalStorage()`, která doplní výchozí ingredience, produkty a objednávky do `localStorage`, pokud tam ještě nejsou. V aplikaci se pak čte přes `readJson(...)` a zapisuje přes `writeJson(...)` ze souboru [src/utils/storage.js](src/utils/storage.js).

Změny jsou tedy perzistentní v rámci prohlížeče, ale aplikace nemá serverovou databázi ani účetní logiku mimo lokální data.

## 🖥️ Obrazovky

### 🧑‍💼 Manager část

- **Přehled** ([/dashboard](src/App.jsx)) - dashboard skladu s rychlým upravením množství ingrediencí, stavový přehled skladu, graf tržeb a aktuální objednávky.
- **Analýza** ([/analysis](src/App.jsx)) - line chart tržeb za roky 2025 a 2026 s filtry podle měsíců, částky a viditelnosti série, plus tabulka objednávek.
- **Jídelní lístek** ([/menu](src/App.jsx)) - správa produktů, vytvoření nového produktu, úprava existujícího produktu a nastavení ceny i ingrediencí.
- **Správa skladu** ([/stock](src/App.jsx)) - filtrování, řazení a ruční úprava množství ingrediencí včetně dialogu pro přidání nebo odebrání.

### 🛒 Kiosk část

- **Kiosek** ([/kiosk](src/App.jsx)) - výběr produktů, košík, změna množství položek a odeslání objednávky.
- Při odeslání objednávky se validuje dostupnost surovin, odečtou se ze skladu a vytvoří se nový záznam objednávky.

## 🧱 Datový model

- Ingredience, produkty i objednávky jsou seedované z aktivního datasetu z [src/utils/dataConfig.js](src/utils/dataConfig.js).
- Aktivní storage klíče a helpery jsou v [src/utils/storage.js](src/utils/storage.js).
- Nová objednávka vyvolá custom event `smartbistro:orderCreated`, aby na ni mohly reagovat další části aplikace.
- Ve skladu se sleduje jen množství a minimální množství, ne expirace, šarže ani alergeny.

## 🛠️ Použité technologie

- **React** (JavaScriptová knihovna pro tvorbu uživatelských rozhraní)
- Knihovny:
    - **React Router** pro směrování / routing
    - **MUI** pro UI komponenty
    - **Chart.js** a **react-chartjs-2** pro analytický graf
    - **react-icons** pro ikony
    - **jspdf** a **jspdf-autotable** pro exporty a tabulky v PDF
- **CamelCase** konvence pojmenování proměnných a funkcí
- **Atomic design struktura** - komponenty se rozdělují na menší celky (atoms, molecules) a skládají do větších celků (organisms, pages)

## ⚠️ Známá omezení

- Aplikace je bez backendu, takže s daty se pracuje pouze v `localStorage`.
- Není zde autentizace ani role uživatelů.
- Finanční logika není implementováná na externí systém a pracuje jen s lokálními cenami produktů a objednávek.
- Sklad sleduje pouze kusové množství, ne doby spotřeby, alergeny ani dodavatele.

## 📝 TODO / Plánovaný rozvoj
- Odpočet peněz z „banku" po nákupu zboží na sklad (zavedení cen produktů)
- Evidence zaměstnanců (role, plat, docházka)
- Detail objednávky (rozepsané položky, časy)
- Rozšíření údajů o surovinách (alergeny, trvanlivost, dodavatel)
- Podpora více kategorií produktů
- Vytvořit funkční databázi

## 🌐 GitHub a verzování

Celý projekt je dostupný ve veřejném GitHub repozitáři: [Jakub-Mat/smartbistro_manager](https://github.com/Jakub-Mat/smartbistro_manager).

- Změny jsou verzované a průběžně dohledatelné v historii projektu.
- README i zdrojový kód odpovídají aktuálnímu stavu aplikace v tomto repozitáři.

## 🚀 Spuštění

```bash
npm install
npm run dev
```

## 📚 Kontext projektu

Projekt vznikl jako semestrální práce na ZČU v Plzni. Cílem je ukázat vícepohledovou React aplikaci s lokální persistencí dat, správou skladu, správou nabídky a jednoduchou analytikou provozu.
