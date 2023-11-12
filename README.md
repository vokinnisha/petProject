Для начала создаем каталог database в котором сделаем 3 сущности, отвечающие за аренду книг.
У нас будет Пользователь, Книга и Аренда(которая связывает книгу и пользователя)
т/к я решил использовать не typeorm, а напрямую pg, чтобы прокачать свои навыки в sql, а так же проверить знания.

Каждой сущности я сделал интерфейс, с которого я буду валидировать данные, а так же создавать таблицу. На момент написания этой строчки, в голову пришла мысль о том, что таблица будет постоянно создаваться(нет) бд будет падать в ошибку, а чтобы этого избежать я воспользовался конструкцией IF NOT EXISTS, она проверит есть ли у меня уже созданная таблица, если да то пропустит создание и ошибки не будет

После того как я смоделировал данные, которые у меня будут, то необходимо создать первый пул для коннекта с Бд database.service.ts тут будет обычный класс для коннекта. Но так как используется обычная библиотека для работы с БД(не тайпорм), то нужно сделать функцию, которая будет принимать код SQL и параметры, которые мы передаем

пример: SELECT * FROM user WHERE id = $1; $1 - уже защищает нашу бд от sql инъекций
а функция принимает в себя что то вроде такого:  fun('SELECT * FROM user WHERE id = $1', [1])



После создания пула и основной функции, которая будет работать с бд, нужно создать 3 таблицы. 
для этого в каждом катологе сущности делаем ее сервис и делаем класс который исполняется когда модуль инициализируется


в создании книги начал падать в разные ошибки, так как у меня не было валидации на полученый json. с помощью модулей валидации  я сначала преобразую объект js в экземпляр класса, а после валидирую.
Так же использую RETURNING *  для возврата записи, после добавления в таблицу


Сначала тяжко было реализовать связть между таблица(когда привык к тайпорм и используешь связи типа oneToMany или oneToOne)
но нашел решение, где я сначала получаю на вход bookId & customerId и проверяю существует ли пользователь, и существует ли книга(есть ли она в наличии) если все ок, то даю ее в аренду, при этом уменьшаю количество книг на кол-во которое взял пользователь
Чтобы не мешать все в сервисе аренды, создаю util


В таблице аренды использовал транзакции, чтобы все красиво собиралось  и не было косяков в ревизии