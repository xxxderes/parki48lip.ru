import { useState, useMemo } from "react";
import { ChevronDown, Search, FileText, ExternalLink } from "lucide-react";

interface Document {
  title: string;
  url: string;
  isExternal?: boolean;
}

interface Category {
  name: string;
  docs: Document[];
}

const CATEGORIES: Category[] = [
  {
    name: "Уставные документы",
    docs: [
      { title: "Постановление администрации г. Липецка от 14.11.2019 № 2221", url: "https://parki48lip.ru/documents/1.pdf" },
      { title: "Распоряжение ДКТ от 17.09.2020 № 69-р (переименование)", url: "https://parki48lip.ru/documents/3.pdf" },
      { title: "Устав", url: "https://parki48lip.ru/documents/4.pdf" },
      { title: "Распоряжение ДКТ от 14.10.2022 № 80-р (изменения в Устав)", url: "https://parki48lip.ru/documents/rasp%2080-r.pdf" },
      { title: "Изменения в Устав от 14.10.2022", url: "https://parki48lip.ru/documents/IzmUchDokum_a9958e23652b4d1b8b200e36c887c1d2.pdf" },
      { title: "Распоряжение ДКТ от 11.05.2023 № 43-р (изменения в Устав)", url: "https://parki48lip.ru/documents/Распоряжение%20от%2011.05.2023%20№%2043-р.pdf" },
      { title: "Изменения в Устав от 11.05.2023", url: "https://parki48lip.ru/documents/IzmUchDokum_d50c551737814538b5017f96fcff7f46.pdf" },
      { title: "Распоряжение ДКТ от 04.07.2025 № 36-р (изменения в Устав)", url: "https://parki48lip.ru/documents/распоряжение%2036-р.pdf" },
      { title: "Изменения в Устав от 04.07.2025", url: "https://parki48lip.ru/documents/IzmUchDokum_f4b2e6193e2044e6b800ba2517cb78e7.pdf" },
      { title: "Приказ ДКТ от 18.09.2025 № 155-к (ОГРН)", url: "https://parki48lip.ru/documents/Приказ%20(18).pdf" },
      { title: "Изменения в Устав от 03.03.2026", url: "https://parki48lip.ru/documents/files/ustavizm.pdf" },
    ],
  },
  {
    name: "Распоряжения и приказы",
    docs: [
      { title: "Приказ от 14.04.2026 № 12-АХ (цены на аттракционы)", url: "https://parki48lip.ru/documents/files/Приказ%20№%2012-АХ%20от%2014.04.2026.pdf" },
      { title: "Приказ от 30.01.2025 № 3-АХ (стоимость платных услуг туалета)", url: "https://parki48lip.ru/documents/1Приказ%20№3АХ%20от%2030.01.2025.pdf" },
      { title: "Приказ от 11.12.2025 № 46-ОД (льготный статус Цифровой ID)", url: "https://parki48lip.ru/documents/Приказ%20№%2046-ОД%20от%2011.12.2025.pdf" },
      { title: "Приказ от 24.12.2025 № 52-ОД (арендные платежи)", url: "https://parki48lip.ru/documents/files/52prikaz.pdf" },
      { title: "Приказ от 30.12.2025 № 54-ОД (Учётная политика)", url: "https://parki48lip.ru/documents/files/54prikaz.pdf" },
      { title: "Распоряжение ДКТ от 26.12.2025 № 61-р (изменения в Устав)", url: "https://parki48lip.ru/documents/files/raspor.pdf" },
    ],
  },
  {
    name: "Финансовые документы",    
    docs: [
      { title: "Баланс за 2025 год", url: "https://bus.gov.ru/agency/234607/annual-balances-F0503730", isExternal: true },
      { title: "План ФХД на 2026-2028 годы", url: "https://parki48lip.ru/documents/files/ПХД%202026.pdf" },
      { title: "Муниципальное задание 2026", url: "https://bus.gov.ru/agency/234607/tasks", isExternal: true },
      { title: "Операции с целевыми средствами 2026", url: "https://bus.gov.ru/agency/234607/operations", isExternal: true },
      { title: "Отчёт о финансовых результатах 2025", url: "https://bus.gov.ru/agency/234607/annual-balances-F0503721", isExternal: true },
      { title: "Отчёт об исполнении плана ФХД 2025", url: "https://bus.gov.ru/agency/234607/annual-balances-f0503737", isExternal: true },
    ],
  },
  {
    name: "СОУТ",
    docs: [
      { title: "Сводная ведомость СОУТ 2022", url: "https://parki48lip.ru/documents/Сводная%20ведомость%20СОУТ%202022.pdf" },
      { title: "Сводная ведомость СОУТ 2023", url: "https://parki48lip.ru/documents/Сводная%20ведомость%20СОУТ%202023.pdf" },
      { title: "Сводная ведомость СОУТ 2024", url: "https://parki48lip.ru/documents/Сводная%20ведомость%20СОУТ%202024.pdf" },
      { title: "Сводная ведомость СОУТ 2025", url: "https://parki48lip.ru/documents/сводная%20ведомость%20СОУТ%202025.pdf" },
    ],
  },
  {
    name: "Прочие",
    docs: [
      { title: "Перспективный план работы на 2026 год", url: "https://parki48lip.ru/documents/perspect.pdf" },
      { title: "Положение о порядке предоставления платных услуг", url: "https://parki48lip.ru/documents/платные%20услуги.pdf" },
      { title: "Изменения в положение о платных услугах", url: "https://parki48lip.ru/documents/Приказ%20№%209-ОД%20от%2013.04.2026.pdf" },
      { title: "Приложение к Учётной политике", url: "https://parki48lip.ru/documents/files/uchpol.pdf" },
      { title: "Информация о закупочной деятельности", url: "https://zakupki.gov.ru/epz/main/public/home.html", isExternal: true },
    ],
  },
];

const DOC_CATEGORIES = [
  "Все",
  "Уставные документы",
  "Распоряжения и приказы",
  "Финансовые документы",
  "Прочие",
];

export function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [openCategory, setOpenCategory] = useState<string | null>("Уставные документы");

  const filteredCategories = useMemo(() => {
    let cats = [...CATEGORIES];
    
    // Фильтр по категории
    if (activeCategory !== "Все") {
      cats = cats.filter((cat) => cat.name === activeCategory);
    }
    
    // Фильтр по поиску
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      cats = cats.map((cat) => ({
        ...cat,
        docs: cat.docs.filter((doc) => doc.title.toLowerCase().includes(q)),
      }));
    }
    
    return cats.filter((cat) => cat.docs.length > 0);
  }, [activeCategory, searchQuery]);

  const isSearching = searchQuery.length > 0;

  return (
    <div
      className="min-h-screen w-full pt-[200px] pb-24 px-6 md:px-10 relative z-10"
      style={{ fontFamily: "'Inter', sans-serif", background: "rgba(5,15,8,0.35)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <p
            className="text-xs uppercase tracking-widest font-semibold mb-4"
            style={{ color: "#a3e635", fontFamily: "'Unbounded', sans-serif" }}
          >
            МАУК «Культурные пространства Липецка»
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase"
            style={{
              color: "#ffffff",
              fontFamily: "'Unbounded', sans-serif",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Документы
          </h1>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Официальные документы, уставы, распоряжения и финансовые отчёты
          </p>
        </div>

        {/* Category Filters + Search */}
        <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
          {/* Category Chips */}
          {DOC_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat ? "#a3e635" : "rgba(255,255,255,0.05)",
                color: activeCategory === cat ? "#071a0e" : "rgba(255,255,255,0.5)",
                border: activeCategory === cat ? "1px solid rgba(163,230,53,0.3)" : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {cat}
            </button>
          ))}

          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10 ml-2"
            style={{
              background: searchOpen ? "rgba(163,230,53,0.15)" : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Search size={16} style={{ color: searchOpen ? "#a3e635" : "rgba(255,255,255,0.5)" }} />
          </button>
        </div>
        
        {/* Search Input (expandable) */}
        <div
          className="transition-all duration-300 ease-in-out overflow-hidden"
          style={{
            maxHeight: searchOpen ? "60px" : "0px",
            opacity: searchOpen ? 1 : 0,
            marginBottom: searchOpen ? "24px" : "0px",
          }}
        >
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.4)" }} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по документам..."
              className="w-full rounded-2xl px-5 py-3 text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#ffffff",
                paddingLeft: "48px",
              }}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-3">
          {filteredCategories.map((category) => (
            <div
              key={category.name}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Category Header */}
              <button
                onClick={() =>
                  setOpenCategory(openCategory === category.name ? null : category.name)
                }
                className="w-full flex items-center justify-between px-5 py-4 md:px-6 md:py-5 transition-all duration-200 hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} style={{ color: "#a3e635" }} />
                  <span
                    className="text-sm md:text-base font-bold"
                    style={{ color: "#e8f5e9", fontFamily: "'Unbounded', sans-serif" }}
                  >
                    {category.name}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(163,230,53,0.1)",
                      color: "#a3e635",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {category.docs.length}
                  </span>
                </div>
                <ChevronDown
                  size={18}
                  className="transition-transform duration-300"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    transform: (isSearching || openCategory === category.name) ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {/* Documents List */}
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  maxHeight: (isSearching || openCategory === category.name) ? "800px" : "0",
                  opacity: (isSearching || openCategory === category.name) ? 1 : 0,
                }}
              >
                <div className="px-5 pb-4 md:px-6 md:pb-5 pt-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex flex-col gap-2 pt-3">
                    {category.docs.map((doc, idx) => (
                      <a
                        key={idx}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/5 group"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <FileText
                          size={16}
                          style={{ color: "rgba(163,230,53,0.6)", flexShrink: 0 }}
                        />
                        <span
                          className="text-sm transition-colors group-hover:text-white flex-1"
                          style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {doc.title}
                        </span>
                        {doc.isExternal && (
                          <ExternalLink
                            size={14}
                            style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}
                          />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* External link notice */}
        <div
          className="mt-8 p-5 rounded-2xl"
          style={{
            background: "rgba(163,230,53,0.05)",
            border: "1px solid rgba(163,230,53,0.1)",
          }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}
          >
            Документы открываются в новом окне. Некоторые файлы размещены на внешних ресурсах (bus.gov.ru, zakupki.gov.ru).
          </p>
        </div>

        {/* Информация о закупочной деятельности */}
        <div
          className="mt-8 p-5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif" }}
          >
            Информацию о закупочной деятельности Учреждения Вы можете найти{" "}
            <a
              href="https://zakupki.gov.ru/epz/main/public/home.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
              style={{ color: "#a3e635" }}
            >
              здесь
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
