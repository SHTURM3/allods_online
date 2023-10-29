// импортируем главный файл css, чтобы вебпак знал о его существовании (такой импорт работает только с вебпаком, без него js не поймет такую запись)
import './index.less';


// 1-й способ импорта, но на нативном js такой фокус не сработает. Это будет работать только с Вебпаком.
//import favicon from '../images/icons/free-icon-swords-1037908.png';

// 2-й способ импорта и он будет работать во всех случаях. Вебпак добавит в переменные правильные пути.
const favicon = new URL('../images/icons/free-icon-swords-1037908.png', import.meta.url);

const images = [
    {name: 'favicon', link: favicon}
];