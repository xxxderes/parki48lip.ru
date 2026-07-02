import sitnikov from "@/imports/sitnikov.webp";
import chernikov from "@/imports/vladimirvladimirovich.jpg";
import zhidkov from "@/imports/ZhidkovVyacheslavIgorevich.jpg";

export interface TeamMember {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  img?: string;
  initials: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Ситников Олег Николаевич",
    role: "Директор",
    email: "park48lip@ya.ru",
    phone: "+7 (4742) 56-60-01",
    img: sitnikov,
    initials: "СО",
  },
  {
    name: "Черников Владимир Владимирович",
    role: "Первый заместитель директора",
    email: "park48lip@ya.ru",
    img: chernikov,
    initials: "ЧВ",
  },
  {
    name: "Меляков Алексей Васильевич",
    role: "Заместитель директора по содержанию территорий",
    email: "park48lip@ya.ru",
    initials: "МА",
  },
  {
    name: "Демин Дмитрий Александрович",
    role: "Заместитель директора по культурно-досуговой деятельности",
    email: "park48lip@ya.ru",
    initials: "ДД",
  },
  {
    name: "Сальникова Виктория Викторовна",
    role: "Главный бухгалтер",
    email: "park48lip@ya.ru",
    initials: "СВ",
  },
  {
    name: "Жидков Вячеслав Игоревич",
    role: "Главный инженер",
    email: "park48lip@ya.ru",
    img: zhidkov,
    initials: "ЖВ",
  },
  {
    name: "Грозных Анна Сергеевна",
    role: "Начальник отдела материально-технического обеспечения",
    email: "park48lip@ya.ru",
    initials: "ГА",
  },
  {
    name: "Соболева Анна Павловна",
    role: "Начальник отдела по содержанию территорий",
    email: "park48lip@ya.ru",
    initials: "СА",
  },
];
