/* Russian translation layer.
   Pages are authored in Estonian; when RU is active every text node and a few attributes are
   translated in place (and kept translated through re-renders via a MutationObserver).
   Catalog terms (equipment, fuels, colours, countries, body types) use auto24's own RU wording. */

const LANG = (() => {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (fromUrl === 'ru' || fromUrl === 'et') { try { localStorage.setItem('a24.lang', JSON.stringify(fromUrl)); } catch { /* ignore */ } return fromUrl; }
  try { return JSON.parse(localStorage.getItem('a24.lang')) || 'et'; } catch { return 'et'; }
})();

const RU_UI = {
  // header / nav / footer
  'Logi sisse': 'Войти', 'Kasutatud': 'Подержанные', 'Uued autod': 'Новые автомобили', 'Varuosad': 'Запчасти', 'Rent': 'Аренда',
  'Teenused': 'Услуги', 'Ajakiri': 'Журнал', 'Margid': 'Марки', 'Müü auto': 'Продать авто', 'Müü oma auto': 'Продать своё авто', 'Reklaam': 'Реклама',
  'Keel': 'Язык', 'Peamenüü': 'Главное меню', 'Lemmikud': 'Избранное', 'Menüü': 'Меню', 'Mobiilimenüü': 'Мобильное меню',
  'Meie portaalid': 'Наши порталы', 'auto24.ee avaleht': 'Главная auto24.ee', 'Avaleht': 'Главная',
  'Eesti suurim sõidukite turg. Üle 48 000 kuulutuse, kontrollitud ajalugu ja turvaline tehing ühest kohast.': 'Крупнейший рынок транспорта в Эстонии. Более 48 000 объявлений, проверенная история и безопасная сделка в одном месте.',
  'Ostjale': 'Покупателю', 'Kasutatud autod': 'Подержанные автомобили', 'Oksjonid': 'Аукционы', 'Ajaloo kontroll': 'Проверка истории',
  'Liising ja laen': 'Лизинг и кредит', 'Müüjale': 'Продавцу', 'Lisa kuulutus': 'Подать объявление', 'Auto hindamine': 'Оценка автомобиля',
  'Hinnakiri': 'Прайс-лист', 'Ärikliendile': 'Для бизнеса', 'Uudised': 'Новости', 'Proovisõidud': 'Тест-драйвы', 'Ostuabi': 'Помощь при покупке',
  'Foorum': 'Форум', 'Meist': 'О нас', 'Kontakt': 'Контакты', 'Kasutustingimused': 'Условия использования', 'Privaatsus': 'Конфиденциальность',
  '© 2026 auto24.ee · Redesign concept': '© 2026 auto24.ee · Концепт редизайна',

  // home: search
  'Otsi sõidukit': 'Поиск транспорта', 'kuulutust ·': 'объявлений ·', 'uut täna': 'новых сегодня', 'Sõiduki tüüp': 'Тип транспорта',
  'Autod': 'Автомобили', 'Moto': 'Мото', 'Veokid ja kaubikud': 'Грузовики и фургоны', 'Veokid': 'Грузовики', 'Veesõidukid': 'Водный транспорт', 'Kõik margid A–Z': 'Все марки A–Я',
  'Mark': 'Марка', 'Kõik margid': 'Все марки', 'Mudel': 'Модель', 'Kõik mudelid': 'Все модели', 'Keretüüp': 'Тип кузова', 'Kõik': 'Все',
  'Hind, €': 'Цена, €', 'Aasta': 'Год', 'Alates': 'От', 'Kuni': 'До', 'Kütus': 'Топливо', 'Läbisõit, km': 'Пробег, км', 'Võimsus, kW': 'Мощность, кВт',
  'auto24 kuumakse, €': 'Ежемесячный платеж auto24, €', 'auto24 kuumakse, €/kuu': 'Ежемесячный платеж auto24, €/мес', 'Käigukast': 'КПП',
  'Vedav sild': 'Ведущий мост', 'Kuulutuse vanus': 'Объявление не старше', 'Ainult kontrollitud ajalooga': 'Только с проверенной историей',
  'Rohkem valikuid': 'Больше параметров', 'Vähem valikuid': 'Меньше параметров', 'Täpsem otsing: varustus, värvus, asukoht, müüja →': 'Расширенный поиск: оборудование, цвет, местонахождение, продавец →',
  'Hind alates': 'Цена от', 'Hind kuni': 'Цена до', 'Aasta alates': 'Год от', 'Aasta kuni': 'Год до', 'Läbisõit alates': 'Пробег от', 'Läbisõit kuni': 'Пробег до',
  'Võimsus alates': 'Мощность от', 'Võimsus kuni': 'Мощность до', 'Kuumakse alates': 'Платеж от', 'Kuumakse kuni': 'Платеж до',
  'Populaarsed otsingud': 'Популярные поиски', 'Elektriautod': 'Электромобили', 'Kuni 15 000 €': 'До 15 000 €', 'Nelikveolised maasturid': 'Полноприводные внедорожники',
  'Kontrollitud ajalugu': 'Проверенная история', '2021 ja uuemad': '2021 и новее', 'Populaarsed margid': 'Популярные марки', 'Populaarsed': 'Популярные', 'Otsi marki': 'Искать марку',
  'Läbisõit ja liiklusõnnetused registrist': 'Пробег и ДТП из регистра', 'Teavitused': 'Уведомления', 'Saad teada uutest pakkumistest esimesena': 'Узнавайте о новых предложениях первыми',
  'Hinnaanalüüs': 'Анализ цены', 'Näed, kas hind on turuhinnast all või üle': 'Видно, ниже или выше рынка цена', 'Kuulutus 3 minutiga': 'Объявление за 3 минуты',
  'Andmed täituvad registreerimisnumbri järgi': 'Данные заполняются по регистрационному номеру', 'Otsi kere järgi': 'Поиск по кузову',
  'Värsked kuulutused': 'Свежие объявления', 'Lisatud viimase 24 tunni jooksul': 'Добавлены за последние 24 часа', 'Vaata kõiki': 'Смотреть все',
  'Elektri- ja hübriidautod': 'Электро и гибриды', 'Kuni 25 000 €': 'До 25 000 €', 'Maasturid': 'Внедорожники', 'Premium': 'Премиум',
  'Pakkumised lõppevad peagi': 'Торги скоро завершатся', 'Kõik oksjonid': 'Все аукционы', 'Hetkehind': 'Текущая цена',
  'Müü oma auto kiiresti ja hea hinnaga': 'Продайте авто быстро и по хорошей цене', 'Sisesta registreerimisnumber — täidame tehnilised andmed ise. Sulle jääb vaid pildistada.': 'Введите регистрационный номер — технические данные мы заполним сами. Вам останется только сфотографировать.',
  'Sisesta reg. number': 'Введите рег. номер', 'Lisa fotod ja hind': 'Добавьте фото и цену', 'Avalda ja oota pakkumisi': 'Опубликуйте и ждите предложений',
  'Kui palju su auto väärt on?': 'Сколько стоит ваше авто?', 'Hinda': 'Оценить', 'Registreerimisnumber': 'Регистрационный номер',
  'Tasuta hinnang turuandmete põhjal. Ei mingit registreerimist.': 'Бесплатная оценка по рыночным данным. Без регистрации.',
  'Proovisõidud, ostuabi ja uudised': 'Тест-драйвы, помощь при покупке и новости', 'Kõik artiklid': 'Все статьи', 'Proovisõit': 'Тест-драйв', 'Uued mudelid': 'Новые модели',
  'Isuzu D-Max – auto24 proovisõit': 'Isuzu D-Max – тест-драйв auto24', 'Kasutatud Mercedes-Benz GLE – auto24 ostuabi': 'Подержанный Mercedes-Benz GLE – помощь при покупке auto24',
  'Peugeot 408 Hybrid GT Exclusive – auto24 proovisõit': 'Peugeot 408 Hybrid GT Exclusive – тест-драйв auto24', 'Cupra Raval VZ – auto24 proovisõit': 'Cupra Raval VZ – тест-драйв auto24',
  'Legendaarne pikap sai põhjaliku uuenduse: suurema töömahuga mootor ja rohkemate käikudega automaatkast.': 'Легендарный пикап серьёзно обновили: мотор большего объёма и автомат с большим числом передач.',
  'Sisesta number kujul': 'Введите номер в виде',

  // cards
  'Uus': 'Новое', 'alates': 'от', '/kuu': '/мес', 'Lisa lemmikutesse': 'Добавить в избранное', 'Lisatud lemmikutesse': 'Добавлено в избранное', 'Eemaldatud lemmikutest': 'Удалено из избранного',

  // search page
  'Filtrid': 'Фильтры', 'Tühjenda': 'Очистить', 'Tühjenda kõik': 'Очистить все', 'Tühjenda filtrid': 'Очистить фильтры',
  'Läbisõit ja õnnetused registrist': 'Пробег и ДТП из регистра', 'Vahetuse võimalus': 'Возможность обмена', 'Registreerimistasu tasutud': 'Регистрационный взнос оплачен',
  'Reg. tasu tasutud': 'Рег. взнос оплачен', 'Mark ja mudel': 'Марка и модель', 'Lisa veel üks mark': 'Добавить ещё марку', 'Muu mudel või täpsustus': 'Модель / уточнение модели',
  'Eemalda': 'Удалить', 'Sõiduauto': 'Легковой автомобиль', 'Läbisõidumõõdiku näit, km': 'Показ одометра, км', 'Värvus': 'Цвет', 'Asukoht': 'Местонахождение',
  'Otsi linna, maakonda või riiki': 'Искать город, уезд или страну', 'Riigid': 'Страны', 'Maakonnad': 'Уезды', 'Linnad': 'Города', 'Müüja': 'Продавец',
  'Eraisik': 'Частное лицо', 'Firma': 'Фирма', 'Autokauplused': 'Автосалоны', 'Oksjon': 'Аукцион', 'Jah': 'Да', 'Ei': 'Нет', 'Varustus': 'Оборудование',
  'Tulemused': 'Результаты', 'Sorteeri': 'Сортировка', 'Vaade': 'Вид', 'Loend': 'Список', 'Ruudustik': 'Плитка', 'Lehed': 'Страницы', 'Järgmine leht': 'Следующая страница',
  'Asjakohasuse järgi': 'По актуальности', 'Lisamisaja järgi': 'Новые сначала', 'Hind: odavamad enne': 'Цена: сначала дешевле', 'Hind: kallimad enne': 'Цена: сначала дороже',
  'Margi järgi': 'По марке', 'Aasta järgi': 'По году', 'Läbisõidu järgi': 'По пробегу',
  'Salvesta see otsing': 'Сохранить этот поиск', 'Teavitame, kui lisandub sobiv kuulutus või hind langeb.': 'Сообщим, когда появится подходящее объявление или снизится цена.',
  'Salvesta': 'Сохранить', 'Salvestatud ✓': 'Сохранено ✓', 'Tulemusi pole': 'Нет результатов', 'Tulemusi ei leitud': 'Ничего не найдено',
  'Sobivaid kuulutusi ei leitud': 'Подходящих объявлений не найдено', 'Proovi mõnda filtrit eemaldada või salvesta otsing — teavitame, kui sobiv auto lisandub.': 'Попробуйте убрать какой-нибудь фильтр или сохраните поиск — сообщим, когда появится подходящее авто.',
  'Otsing salvestatud — saadame teavituse': 'Поиск сохранён — пришлём уведомление', 'Demo: prototüübis on üks lehekülg': 'Демо: в прототипе одна страница',
  'Turva- ja ohutusvarustus': 'Оборудование безопасности', 'Mugavusvarustus': 'Оборудование комфорта', 'Sisustus': 'Интерьер', 'Audio, video, kommunikatsioon': 'Аудио, видео, коммуникация',
  'Rehvid ja veljed': 'Шины и диски', 'Tuled': 'Фары', 'Sportvarustus': 'Спортивное оборудование', 'Muu varustus': 'Другое оборудование',

  // listing page
  'Põhiandmed': 'Основные данные', 'Esmaregistreerimine': 'Первая регистрация', 'Läbisõit': 'Пробег', 'Võimsus': 'Мощность', 'Värv': 'Цвет',
  'Kuulutuse nr': 'Номер объявления', 'Ajaloo aruanne saadaval': 'Доступен отчёт об истории', 'Läbisõidu ajalugu registrist': 'История пробега из регистра',
  'Liiklusõnnetuste kontroll': 'Проверка ДТП', 'Varguse ja pandi kontroll': 'Проверка на угон и залог', 'Tehnoülevaatuste ajalugu': 'История техосмотров',
  'Vaata tasuta aruannet': 'Смотреть бесплатный отчёт', 'Kirjeldus': 'Описание', 'Müüja täielik kirjeldus, varustus ja kontaktid on': 'Полное описание, оборудование и контакты продавца —',
  'originaalkuulutuses auto24.ee-s': 'в оригинальном объявлении на auto24.ee', '. Prototüübis näidatakse siin müüja enda teksti.': '. В прототипе здесь показывается текст продавца.',
  'Müüja ei ole varustust märkinud.': 'Продавец не указал оборудование.', 'Liisingukalkulaator': 'Калькулятор лизинга', 'Sissemakse': 'Первый взнос', 'Periood': 'Срок',
  'Kuumakse alates': 'Ежемесячно от', 'Intress 6,9% · näidis': 'Ставка 6,9% · пример', 'Lõplik pakkumine finantseerijalt': 'Окончательное предложение — от финансиста',
  'Sissemakse protsent': 'Процент первого взноса', 'Periood kuudes': 'Срок в месяцах', 'Kontrollitud': 'Проверено', 'Hind langes': 'Цена снижена', 'Liising alates': 'Лизинг от',
  'Väga hea hind': 'Очень хорошая цена', 'Hea hind': 'Хорошая цена', 'Turuhinnas': 'По рыночной цене', 'Turuhind ~': 'Рыночная цена ~',
  'Näita telefoni': 'Показать телефон', 'Kirjuta': 'Написать', 'Jäta meelde': 'Запомнить', 'Vastab tavaliselt 1 h jooksul': 'Обычно отвечает в течение 1 ч',
  'Kõik müüja kuulutused': 'Все объявления продавца', 'Jaga': 'Поделиться', 'Teata': 'Сообщить', 'Sarnased kuulutused': 'Похожие объявления', 'Helista': 'Позвонить',
  'Eelmine foto': 'Предыдущее фото', 'Järgmine foto': 'Следующее фото', 'Link kopeeritud': 'Ссылка скопирована', 'Kopeeri link aadressiribalt': 'Скопируйте ссылку из адресной строки',
  'Demo: siin kuvatakse müüja telefoninumber': 'Демо: здесь будет показан номер продавца', 'Demo: siin avaneb vestlus müüjaga': 'Демо: здесь откроется переписка с продавцом',
  'Täname, vaatame kuulutuse üle': 'Спасибо, мы проверим объявление', 'Demo: siin avaneb 3-sammuline kuulutuse lisamine': 'Демо: здесь откроется подача объявления в 3 шага',
  'Demo: selles prototüübis on aktiivsed ainult autod': 'Демо: в этом прототипе активны только автомобили',
  'eile': 'вчера', 'Otsi…': 'Искать…', 'Otsi': 'Искать', 'Sulge': 'Закрыть', 'just praegu': 'только что',

  // leasing / tax / ostuabi
  'Summa': 'Сумма', 'Laenusumma': 'Сумма кредита', 'Jääkmaksumusega (25%)': 'С остаточной стоимостью (25%)', 'Koos registreerimistasuga': 'Вместе с регистрационным сбором',
  '€/kuu': '€/мес', 'Omafinantseering': 'Собственное финансирование', 'Kaskot pole vaja': 'Каско не требуется', 'Vaatan pakkumist': 'Смотреть предложение',
  'auto24 liising': 'Лизинг auto24', 'Sina valid. Jääkmaksumus 0% või 25%': 'Выбираете вы. Остаточная стоимость 0% или 25%', 'Kuumakse arvutus igas kuulutuses · Kaskot pole vaja': 'Расчёт платежа в каждом объявлении · Каско не требуется', 'Demo: siin avaneb auto24 liisingu leht': 'Демо: здесь откроется страница лизинга auto24', 'Demo: siin avaneb auto24 liisingu taotlus': 'Демо: здесь откроется заявка на лизинг auto24',
  'Mootorsõidukimaks': 'Налог на транспортное средство', 'Aastamaks': 'Ежегодный налог', 'Registreerimistasu': 'Регистрационный сбор',
  'Tasutud / registreeritud Eestis': 'Оплачен / зарегистрирован в Эстонии', 'Automaksu kalkulaator': 'Калькулятор автоналога', 'Vaatan lähemalt': 'Подробнее',
  'Väärtused on informatiivsed ja võivad erineda tasumisele kuuluvatest summadest.': 'Значения информативные и могут отличаться от сумм к оплате.',
  'Sõiduki ajaloo aruanne': 'Отчёт об истории транспорта', 'Läbisõidu ajalugu': 'История пробега', 'Ajaloolised fotod': 'Исторические фото',
  'Tehnilised andmed': 'Технические данные', 'Hooldused': 'Обслуживание', 'Avariide ajalugu': 'История аварий',
  'Kontrolli sõidukit kodust lahkumata!': 'Проверьте автомобиль, не выходя из дома!', 'Sõiduki põhjalik visuaalne ja tehniline ülevaatus': 'Тщательный визуальный и технический осмотр',
  'Pikk proovisõit erinevates sõiduoludes': 'Длительный тест-драйв в разных условиях', 'Diagnostikakontroll': 'Диагностика',
  'Ajaloo ja läbisõidu kontroll usaldusväärsetest allikatest': 'Проверка истории и пробега по надёжным источникам',
  'Varjatud avariide ja remonditööde tuvastamine': 'Выявление скрытых аварий и ремонтов', 'Tutvu teenusega': 'Узнать об услуге', 'auto24 ostuabi': 'auto24 помощь при покупке',

  // makes flow
  'Vali mark': 'Выберите марку', 'Vali mudel': 'Выберите модель', 'Vali aasta': 'Выберите год', 'Kuulutused': 'Объявления', 'Kõik aastad': 'Все годы',
  'Kõik mudelid ühe nimekirjana': 'Все модели одним списком', 'Põlvkonnad ja aastad': 'Поколения и годы', 'vaata kõiki': 'смотреть все',
  'Mudelid, millel on praegu kuulutusi': 'Модели, по которым сейчас есть объявления', 'Vali põlvkond, et näha selle aastate kuulutusi': 'Выберите поколение, чтобы увидеть объявления этих лет',
  'Otsi mudelit': 'Искать модель', 'Seeriad / klassid': 'Серии / классы', 'Mudelid': 'Модели', 'Eesti': 'Эстония', 'Sõiduauto ja maastur': 'Легковой автомобиль и внедорожник', 'Muuda marki': 'Сменить марку', 'Muuda mudelit': 'Сменить модель', 'Kõik margid A–Z': 'Все марки A–Я',
};

/* auto24's own RU wording for catalog values (matched case-insensitively) */
const RU_CATALOG = {"4-ratta pööramine":"4 поворотных колеса","12v pistikupesad":"12v электрические розетки","ABS pidurid":"тормоза с АБС","aknapesupihustite sulatus":"подогрев форсунок омывателя","allasõidutõke":"противооткатный упор","arvel kui N1 kaubik":"зарегистрирован как N1 фургон","astmelauad":"подножки","autokompuuter":"компьютер","automaatne paigalseismise funktsioon / mägistardi abi":"автодержатель тормоза","automaatpidurdussüsteem":"система автоматического торможения","automaatselt tumenevad peeglid":"автоматически затемняемые зеркала","automaatselt tumenevad peeglid (sees)":"автоматически затемняемые зеркала (в салоне)","automaatselt tumenevad peeglid (väljas)":"автоматически затемняемые зеркала (внешние)","automaatse parkimise funktsioon":"функция автоматической парковки","autotelefon":"автотелефон","Comfort istmed":"Comfort сиденья","Coming-/Leaving-Home funktsioon":"Coming-/Leaving-Home функция","digitaalne näidikutepaneel":"цифровая приборная панель","ekraan":"экран","ekraan (ees)":"экран (спереди)","ekraan (taga)":"экран (сзади)","elektriline antenn":"электрическая антенна","elektrilised akende tõstukid":"электрические стеклоподъемники","elektrilised liuguksed":"электрические сдвижные двери","elektrilised välispeeglid":"электрические зеркала заднего вида","elektrilised välispeeglid (kokkuklapitavad)":"электрические зеркала заднего вида (складывающиеся)","elektrilised välispeeglid (mäluga)":"электрические зеркала заднего вида (с памятью)","elektrilised välispeeglid (soojendusega)":"электрические зеркала заднего вида (с подогревом)","elektriliselt reguleeritavad istmed":"электрически регулируемые сиденья","elektriliselt reguleeritavad istmed (mäludega)":"электрически регулируемые сиденья (с памятью)","elektrilise soojendusega esiklaas":"подогрев переднего стекла","elektrooniline seisupidur":"электронный стояночный тормоз","eraldi kliimaseade tagaistmetele":"отдельный кондиционер для задних сидений","esi- ja tagarataste porikummid":"брызговики спереди и сзади","esispoiler":"передний спойлер","esitulede pesurid":"омыватели передних фар","GSM antenn":"GSM антенна","haagise stabiliseerimissüsteem":"система стабилизации прицепа","helivõimendi":"усилитель звука","ilukilbid":"колпаки","iluliistud salongis":"декоративные накладки в салоне","iluliistud salongis (puitdekoor)":"декоративные накладки в салоне (деревянный декор)","immobilisaator":"иммобилайзер","info kuvamine esiklaasile":"проекционный дисплей","integreeritud lapseiste":"встроенное детское сиденье","integreeritud väravapult":"встроенное устройство дистанционного открывания ворот","invavarustus":"оборудование для инвалидов","ISOFIX lasteistme kinnitus":"ISOFIX крепитель детских сидений","ISOFIX lasteistme kinnitus (ees)":"ISOFIX крепитель детских сидений (спереди)","ISOFIX lasteistme kinnitus (taga)":"ISOFIX крепитель детских сидений (сзади)","isotermiline furgoon":"изотермический фургон","istmed reguleeritava kõrgusega":"регулируемые по высоте сидения","istmed reguleeritava kõrgusega (juhiiste)":"регулируемые по высоте сидения (водительское сидение)","istmed reguleeritava kõrgusega (kõrvalistuja iste)":"регулируемые по высоте сидения (пассажирское сидение)","istmesoojendused":"обогрев сидений","jahutusega kindalaegas":"охлаждение перчаточного ящика","jalakäija ohutusfunktsiooniga kapott":"капот с системой защиты пешеходов","jalamatid":"коврики","jalamatid (kummist)":"коврики (резиновые)","jalamatid (tekstiilist)":"коврики (текстильные)","jalamatid (veluurist)":"коврики (велюровые)","juhi väsimuse tuvastamise süsteem":"система распознавания усталости водителя","kaassõitja istme seljatugi allaklapitav":"складная спинка пассажирского сиденья","karterikaitse":"защитный поддон","katuseluuk":"люк на крыше","katuseluuk (elektriline)":"люк на крыше (электрический)","katuseluuk (klaasist)":"люк на крыше (из стекла)","katuseraam":"рама на крыше","katusereelingud":"дуги на крыше","kaubakinnituse konksud":"крючки крепления багажа","kaubaruumi põranda materjal":"материал пола багажного отделения","kaugtulede ümberlülitamise assistent":"ассистент переключения дальнего света","kesklukustus":"центральный замок","kesklukustus (puldiga)":"центральный замок (с пультом)","kliimaseade":"установка климата","kliimaseade (kliimaautomaatik)":"установка климата (клима-автоматик)","kliimaseade (konditsioneer)":"установка климата (кондиционер)","kohtvalgustid":"местная подсветка","kokkupõrget ennetav pidurisüsteem":"система предотвращения столкновения","koormatent":"тент груза","kraana":"кран","kurvituled":"адаптивные фары поворота","käed vabad süsteem":"система \"hands free\"","käetugi ees":"подлокотник спереди","käetugi ees (laekaga)":"подлокотник спереди (с ящиком)","käetugi taga":"подлокотник сзади","käetugi taga (laekaga)":"подлокотник сзади (с ящиком)","käiguvahetus roolilt":"переключение скоростей с руля","kõlarid":"звуковые колонки","kõrvalistuja turvapadja väljalülitamise võimalus":"возможность выключить воздушную подушку переднего пассажира","külgtuule abisüsteem":"ассистент бокового ветра","küljeuks":"боковая дверь","külmutusseade":"холодильник","laser":"лазер","LED (kaugtuled)":"LED (дальнего света)","LED (lähituled)":"LED (ближнего света)","LED (päevatuled)":"LED (фары дневного света)","LED (tagatuled)":"LED (задние фары)","liiklusmärkide tuvastus ja kuvamine":"система распознавания дорожных знаков","lisapidurituli":"доп. стоп-сигнал","lisatuled":"дополнительные фары","massaažifunktsiooniga istmed":"массирующее сиденье","massaažifunktsiooniga istmed (juhil)":"массирующее сиденье (водителя)","massaažifunktsiooniga istmed (kõrvalistmel)":"массирующее сиденье (пассажира)","mootori eelsoojendus":"подогрев мотора","multifunktsionaalne rool":"многофункциональный руль","mägipidur":"горный тормоз","nahkkattega käigukanginupp":"рукоятка переключения передач обшитая кожей","nahkkattega käsipidurikang":"рукоять стояночного тормоза обшитая кожей","nahkkattega rool":"руль обшитый кожей","nahkpolster":"кожаная обивка","navigatsiooniseade":"система навигации","navigatsiooniseade (hääljuhtimisega)":"система навигации (управляемая голосом)","navigatsiooniseade (kaardiga)":"система навигации (с картой)","pagasikate":"крышка багажного отделения","pagasikate (automaatne)":"крышка багажного отделения (автоматическая)","pagasiruumi matt":"коврик багажника","pagasi võrk pakiruumis":"разделительная сетка в багажном отделении","paigaldatud tulekustuti":"установленный огнетушитель","pakiruumi avamine elektriliselt":"электронное открывание багажника","pakiruumi avamine elektriliselt (jalaviipega)":"электронное открывание багажника (движением ноги)","pakiruumi avamine elektriliselt (puldist)":"электронное открывание багажника (с пульта)","pakiruumi liugpõrand":"скользящий пол багажника","panoraamkatus (klaasist)":"панорамная крыша","parempoolne rool":"праворульный","parkimisandurid":"датчики парковки","parkimisandurid (ees)":"датчики парковки (спереди)","parkimisandurid (taga)":"датчики парковки (сзади)","parkimiskaamera":"парковочная камера","parkimiskaamera (360)":"парковочная камера (360)","peatoed":"подголовники","peatoed (esiistmetel)":"подголовники (на передних сиденьях)","peatoed (tagaistmetel)":"подголовники (на задних сиденьях)","peeglid päikesesirmides":"противосолнечные козырьки с зеркалами","peeglid päikesesirmides (valgustusega)":"противосолнечные козырьки с зеркалами (с подсветкой)","pidurdusjõukontroll":"система контроля тормозного усилия","pimenurga hoiatus":"система контроля слепых зон","poolnahkpolster":"комбинированная кожаная обивка","päevasõidutulede automaatne lülitus":"автоматическое включение фар","püsikiiruse hoidja":"круиз-контроль","püsikiiruse hoidja (eessõitjaga distantsi hoidev)":"круиз-контроль (с удержанием дистанции)","reguleeritava kumerusega seljatugi":"спинка с регулировкой выпуклости","reguleeritava kumerusega seljatugi (juhiiste)":"спинка с регулировкой выпуклости (водительское сидение)","reguleeritava kumerusega seljatugi (kõrvalistuja iste)":"спинка с регулировкой выпуклости (пассажирское сидение)","reguleeritav roolisammas":"регулируемый руль","reguleeritav roolisammas (elektriliselt)":"регулируемый руль (электрически)","reguleeritav roolisammas (kõrgus ja sügavus)":"регулируемый руль (по высоте и глубине)","reguleeritav roolisammas (mäluga)":"регулируемый руль (с памятью)","reguleeritav vedrustus":"регулируемая подвеска","reguleeritav vedrustus (elektriliselt)":"регулируемая подвеска (электрически)","reguleeritav vedrustus (jäikus)":"регулируемая подвеска (жесткость)","reguleeritav vedrustus (kõrgus)":"регулируемая подвеска (высота)","rehviparanduskomplekt":"комплект для ремонта шин","rehvirõhu kontrollsüsteem":"система контроля давления в шинах","reisiarvesti":"счетчик поездки","roolivõimendi":"усилитель руля","roolivõimendi (kiirustundlik)":"усилитель руля (чувствительный к скорости)","rulookardinad ustel":"шторки на дверях","rulookardinad ustel (elektrilised)":"шторки на дверях (электрические)","rulookardin tagaaknal":"шторка на заднем окне","rulookardin tagaaknal (elektriline)":"шторка на заднем окне (электрическая)","sahtlid esiistmete all":"ящики под сиденьем","salongi eelsoojendus":"подогрев салона","salongi ja pakiruumi eraldusvõrk":"разделительная сетка салона и багажного отделения","salongi lisasoojendus":"дополнительный подогрев салона","signalisatsioon":"сигнализация","signalisatsioon (kahepoolse sidega)":"сигнализация (с двухсторонней связью)","signalisatsioon (kaldeanduriga)":"сигнализация (с датчиком наклона)","signalisatsioon (mahuanduriga)":"сигнализация (с объемным датчиком)","sisetemperatuuri näidik":"термометр внутри","soojendusega rool":"руль с подогревом","spoileriring":"комплект спойлеров","sportistmed":"спортивные сиденья","sportrool":"спортивный руль","sportsummuti":"спортивный глушитель","sportvedrustus":"спортивная подвеска","stabiilsuskontroll":"система контроля устойчивости","start-stopp süsteem":"старт-стоп система","stereo":"стерео","stereo (CD)":"стерео (CD)","stereo (MP3)":"стерео (MP3)","stereo (mälukaardi pesaga)":"стерео (гнездо для карты памяти)","stereo (originaal)":"стерео (оригинальное)","stereo (puldiga)":"стерео (с пультом)","stereo (USB pesaga)":"стерео (гнездо для USB)","subwoofer":"сабвуфер","suusakott":"лыжный мешок","suverehvid":"летняя резина","sõiduraja hoidmise abisüsteem":"система удержания полосы движения","sõiduraja vahetamise abisüsteem":"ассистент смены полосы движения","tagaistme seljatugi allaklapitav":"складывающаяся спинка заднего сиденья","tagaklaasi puhasti":"очиститель заднего стекла","tagaklaasi soojendus":"подогрев заднего стекла","tagaluuktõstuk":"лифт","tagaspoiler":"задний спойлер","tagavararatas":"запасное колесо","talverehvid":"зимняя резина","talverehvid (lamellrehvid)":"зимняя резина (ламельная резина)","talverehvid (naastrehvid)":"зимняя резина (шипованные шины)","taskud esiistmete seljatugedes":"карманы в спинках передних сидений","tekstiilpolster":"текстильная обивка","telefoni juhtmevaba laadimine":"беспроводная зарядка телефона","toonitud klaasid":"тонированные стекла","topeltklaasid":"двойные стекла","topsihoidjad":"держатели стаканов","topsihoidjad (ees)":"держатели стаканов (спереди)","topsihoidjad (taga)":"держатели стаканов (сзади)","tulede korrektor":"регулятор положения фар по высоте","tume laepolster":"тёмная обшивка потолка","turvakardinad":"шторы безопасности","turvapadi":"воздушная подушка","turvavööde eelpingutid esiistmetel":"натяжители ремней безопасности спереди","udutuled":"противотуманные фонари","udutuled (eesmised)":"противотуманные фонари (передние)","udutuled (kurvitule funktsiooniga)":"противотуманные фонари (с подсветкой поворотов)","udutuled (tagumine)":"противотуманные фонари (задний)","uste servosulgurid":"доводчики дверей","uste sisevalgustus":"встроенное освещение в дверях","vahesein":"перегородка","vahesein (aknaga)":"перегородка (с окном)","valgustuspakett":"светопакет","valuveljed":"литые диски","veluurpolster":"велюровая обивка","ventileeritavad istmed":"вентилируемые сиденья","ventileeritavad istmed (ees)":"вентилируемые сиденья (спереди)","ventileeritavad istmed (taga)":"вентилируемые сиденья (сзади)","veojõukontroll":"противобуксовочная система","veokonks":"прицепное устройство","veokonks (elektriline)":"прицепное устройство (электрическое)","veokonks (teisaldatav)":"прицепное устройство (съемное)","vihmasensor":"датчик дождя","vints":"лебедка","virtuaalne sisepeegel":"виртуальное зеркало заднего вида","virtuaalsed välispeeglid":"виртуальные боковые зеркала","välistemperatuuri näidik":"термометр наружного воздуха","võtmeta avamine":"бесключевой доступ","võtmeta käivitus":"бесключевой запуск","Xenon":"ксеноновые фары","Xenon (kaugtuled)":"ксеноновые фары (дальнего света)","Xenon (lähituled)":"ксеноновые фары (ближнего света)","õhkvedrustus":"пневмоподвеска","õhuga reguleeritav iste":"пневматически регулируемое сиденье","öise nägemise assistent":"ассистент ночного видения",
  "bensiin":"бензин","diisel":"дизель","elekter":"электричество","bensiin + gaas (LPG/vedelgaas)":"бензин + газ (LPG/жидкий)","bensiin + gaas (CNG/surugaas)":"бензин + газ (CNG/сжатый)","bensiin + gaas (LNG/veeldatud maagaas)":"бензин + газ (LNG/сжиженный природный)","diisel + gaas (LNG/veeldatud maagaas)":"дизель + газ (LNG/сжиженный природный)","gaas (LPG/vedelgaas)":"газ (LPG/жидкий)","gaas (CNG/surugaas)":"газ (CNG/сжатый)","gaas (LNG/veeldatud maagaas)":"газ (LNG/сжиженный природный)","hübriid":"гибрид","hübriid (bensiin / elekter)":"гибрид (бензин / электричество)","hübriid (diisel / elekter)":"гибрид (дизель / электричество)","pistikhübriid (bensiin / elekter)":"подключаемый гибрид (бензин / электричество)","pistikhübriid (diisel / elekter)":"подключаемый гибрид (дизель / электричество)","vesinik":"водород","etanool":"этанол",
  "beež":"бежевый","hall":"серый","helebeež":"светло-бежевый","helehall":"светло-серый","helekollane":"светло-желтый","helelilla":"светло-фиолетовый","heleoranž":"светло-оранжевый","helepruun":"светло-коричневый","helepunane":"светло-красный","heleroheline":"светло-зеленый","helesinine":"светло-синий","hõbedane":"серебристый","kollane":"желтый","kuldne":"золотистый","lilla":"фиолетовый","must":"черный","oranž":"оранжевый","pruun":"коричневый","punane":"красный","roheline":"зеленый","roosa":"розовый","sinine":"синий","tumebeež":"темно-бежевый","tumehall":"темно-серый","tumekollane":"темно-желтый","tumelilla":"темно-фиолетовый","tumeoranž":"темно-оранжевый","tumepruun":"темно-коричневый","tumepunane":"темно-красный","tumeroheline":"темно-зеленый","tumesinine":"темно-синий","valge":"белый",
  "AMEERIKA ÜHENDRIIGID":"СОЕДИНЕННЫЕ ШТАТЫ АМЕРИКИ","BELGIA":"БЕЛЬГИЯ","EESTI":"ЭСТОНИЯ","HISPAANIA":"ИСПАНИЯ","HOLLAND":"ГОЛЛАНДИЯ","HORVAATIA":"ХОРВАТИЯ","ITAALIA":"ИТАЛИЯ","KREEKA":"ГРЕЦИЯ","LÄTI":"ЛАТВИЯ","LEEDU":"ЛИТВА","NORRA":"НОРВЕГИЯ","POOLA":"ПОЛЬША","PRANTSUSMAA":"ФРАНЦИЯ","ROOTSI":"ШВЕЦИЯ","SAKSAMAA":"ГЕРМАНИЯ","SOOME":"ФИНЛЯНДИЯ","TAANI":"ДАНИЯ","TŠEHHI":"ЧЕХИЯ",
  "manuaal":"механическая КП","automaat":"автомат","poolautomaat":"полуавтомат","esivedu":"передний привод","tagavedu":"задний привод","nelikvedu":"полный привод",
  "kuni 1 päev":"не старше 1 дня","kuni 2 päeva":"не старше 2 дней","kuni 3 päeva":"не старше 3 дней","kuni 7 päeva":"не старше 7 дней",
  "sedaan":"седан","luukpära":"хетчбэк","universaal":"универсал","mahtuniversaal":"минивэн","kupee":"купе","kabriolett":"кабриолет","pikap":"пикап","limusiin":"лимузин","maastur":"внедорожник","väikekaubik":"малый фургон","kaubik":"фургон"};

const ruPlural = (n, one, few, many) => (n % 10 === 1 && n % 100 !== 11 ? one : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? few : many);
const RU_MONTHS = { jaan: 'янв.', veebr: 'февр.', märts: 'марта', apr: 'апр.', mai: 'мая', juuni: 'июня', juuli: 'июля', aug: 'авг.', sept: 'сент.', okt: 'окт.', nov: 'нояб.', dets: 'дек.' };

/* Patterns for strings built at runtime (numbers, durations, prefixes) */
const RU_PATTERNS = [
  [/^Näita ([\d\s ]+) kuulutust$/, 'Показать $1 объявл.'],
  [/^Näita ([\d\s ]+) tulemust$/, 'Показать $1 результатов'],
  [/^Näita kõiki \((\d+)\)$/, 'Показать все ($1)'],
  [/^Näita kogu varustust \((\d+)\)$/, 'Показать всё оборудование ($1)'],
  [/^Otsi varustust \((\d+)\)$/, 'Искать оборудование ($1)'],
  [/^(\d+) h tagasi$/, '$1 ч назад'], [/^(\d+) päeva tagasi$/, '$1 дн. назад'],
  [/^Lisatud (\d+) h tagasi$/, 'Добавлено $1 ч назад'], [/^Lisatud (\d+) päeva tagasi$/, 'Добавлено $1 дн. назад'], [/^Lisatud eile$/, 'Добавлено вчера'],
  [/^Lisatud (\d+) p jooksul$/, 'Добавлено за $1 дн.'], [/^(\d+) p$/, '$1 дн.'], [/^1 päev$/, '1 день'], [/^([234]) päeva$/, '$1 дня'], [/^(\d+) päeva$/, '$1 дней'],
  [/^(\d+) kuud$/, '$1 мес.'], [/^([\d\s\u00a0]+) km$/, '$1 км'], [/(\d+) pakkumist/, '$1 ставок'],
  [/^(\d+) h (\d+) min (\d+) s$/, '$1 ч $2 мин $3 с'],
  [/^(\d+) kW \((\d+) hj\)$/, '$1 кВт ($2 л.с.)'],
  [/^Autokauplus · auto24-s alates (\d+)$/, 'Автосалон · на auto24 с $1'], [/^Eraisik · auto24-s alates (\d+)$/, 'Частное лицо · на auto24 с $1'],
  [/^Oksjon: jah$/, 'Аукцион: да'], [/^Oksjon: ei$/, 'Аукцион: нет'],
  [/^(\d)\. seeria$/, '$1 серия'], [/^(.+)-klass$/, '$1-класс'],
  [/^alates (\d{4})$/, 'с $1 г.'], [/^kuni (\d{4})$/, 'до $1 г.'], [/^(\d+) mudelit$/, '$1 моделей'], [/^(\d+) põlvkonda$/, '$1 поколений'], [/^(\d+) põlvkond$/, '$1 поколение'],
  [/^Kõik (.+) kuulutused$/, 'Все объявления $1'],
  [/ — ([\d\s ]+) kuulutust — auto24$/, ' — $1 объявл. — auto24'],
  [/^Kasutatud autod — /, 'Подержанные автомобили — '],
  [/^(Hind|Võimsus|Läbisõidumõõdiku näit|auto24 kuumakse) /, (m, w) => ({ Hind: 'Цена ', Võimsus: 'Мощность ', 'Läbisõidumõõdiku näit': 'Пробег ', 'auto24 kuumakse': 'Платеж ' }[w])],
  [/^(\S+) met\.$/, (m, w) => `${trWord(w)} мет.`],
  [/ €\/kuu$/, ' €/мес'], [/^alates ([\d\s ]+ €)\/kuu$/, 'от $1/мес'],
  [/^Lisa (veel )?üks mark$/, 'Добавить ещё марку'],
  [/^Foto (\d+)$/, 'Фото $1'],
  [/^Aastamaks \((\d{4})\)$/, 'Ежегодный налог ($1)'],
  [/^1 aasta$/, '1 год'], [/^(\d+) aastat$/, (m, n) => `${n} ${ruPlural(+n, 'год', 'года', 'лет')}`],
  [/^Näidisarvutus, intress (.+)%\. Lõplik pakkumine auto24 liisingult\.$/, 'Пример расчёта, ставка $1%. Окончательное предложение — от лизинга auto24.'],
  [/^(\d+)\. (jaan|veebr|märts|apr|mai|juuni|juuli|aug|sept|okt|nov|dets) (\d{4})$/, (m, d, mo, y) => `${d} ${RU_MONTHS[mo]} ${y}`],
  [/^(jaan|veebr|märts|apr|mai|juuni|juuli|aug|sept|okt|nov|dets) (\d{4})$/, (m, mo, y) => `${RU_MONTHS[mo]} ${y}`],
  [/^Margid — auto24$/, 'Марки — auto24'],
  [/^Reklaam: auto24 liising — (.+)$/, 'Реклама: лизинг auto24 — $1'], [/^auto24 liising: (.+)$/, 'Лизинг auto24: $1'],
  [/^auto24 — Eesti suurim autoturg$/, 'auto24 — крупнейший авторынок Эстонии'],
];

const RU_LOWER = new Map(Object.entries(RU_CATALOG).map(([k, v]) => [k.toLowerCase(), v]));
const RU_UI_LOWER = new Map(Object.entries(RU_UI).map(([k, v]) => [k.toLowerCase(), v]));
const isUpper = (s) => s === s.toUpperCase() && s !== s.toLowerCase();
const capFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function trWord(src) {
  if (RU_UI[src]) return RU_UI[src];
  const v = RU_LOWER.get(src.toLowerCase()) || RU_UI_LOWER.get(src.toLowerCase());
  if (!v) return null;
  if (isUpper(v) && !isUpper(src)) return capFirst(v.toLowerCase());
  if (src.charAt(0) !== src.charAt(0).toLowerCase()) return capFirst(v);
  return v;
}
function translate(text) {
  const hit = trWord(text);
  if (hit) return hit;
  let out = text;
  for (const [re, rep] of RU_PATTERNS) if (re.test(out)) out = out.replace(re, rep);
  return out !== text ? out : null;
}

/* ---------- DOM translation ---------- */
const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
const SKIP = 'script,style,.car-title,.car-sub,.brand-list,[data-no-i18n]';
function translateTextNode(n) {
  const raw = n.nodeValue;
  const t = raw.trim();
  if (!t || n.__ru === raw) return;
  if (n.parentElement && n.parentElement.closest(SKIP)) return;
  const tr = translate(t);
  if (tr && tr !== t) {
    const out = raw.replace(t, tr);
    n.__ru = out;
    n.nodeValue = out;
  }
}
function translateEl(el) {
  if (el.nodeType === 3) return translateTextNode(el);
  if (el.nodeType !== 1 || el.closest(SKIP)) return;
  ATTRS.forEach((a) => {
    const v = el.getAttribute(a);
    if (v && el['__ru_' + a] !== v) { const tr = translate(v.trim()); if (tr) { el['__ru_' + a] = tr; el.setAttribute(a, tr); } }
  });
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let n;
  while ((n = w.nextNode())) {
    if (n.nodeType === 3) translateTextNode(n);
    else ATTRS.forEach((a) => {
      const v = n.getAttribute(a);
      if (v && n['__ru_' + a] !== v && !n.closest(SKIP)) { const tr = translate(v.trim()); if (tr) { n['__ru_' + a] = tr; n.setAttribute(a, tr); } }
    });
  }
}
function translateTitle() {
  const tr = translate(document.title);
  if (tr && tr !== document.title) document.title = tr;
}

function startI18n() {
  document.documentElement.lang = LANG;
  if (LANG !== 'ru') { document.documentElement.classList.remove('i18n-wait'); return; }
  translateEl(document.body);
  translateTitle();
  new MutationObserver((muts) => {
    muts.forEach((m) => {
      if (m.type === 'characterData') translateTextNode(m.target);
      else if (m.type === 'attributes') translateEl(m.target);
      else m.addedNodes.forEach(translateEl);
    });
  }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  new MutationObserver(translateTitle).observe(document.querySelector('title'), { childList: true, characterData: true, subtree: true });
  document.documentElement.classList.remove('i18n-wait');
}

function setLang(l) {
  try { localStorage.setItem('a24.lang', JSON.stringify(l)); } catch { /* ignore */ }
  location.reload();
}
