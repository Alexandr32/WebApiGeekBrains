﻿ProductItems = {
    _options: {
        getUrl: ''
    },

    init: function (options) {
        $.extend(ProductItems._options, options);
        $('.pagination li a').click(ProductItems.clickOnPage);
    },

    clickOnPage: function (event) {
        event.preventDefault();
        if ($(this).prop('href').length > 0) {

            var page = $(this).data('page');
            $('.features_items').LoadingOverlay('show');// Показываем overlay

            var data = $(this).data();// Получаем все атрибуты
            // Строим строку запроса
            var query = '';
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    query += key + '=' + data[key] + '&';
                }
            }

            // Делаем запрос на сервер
            $.get(ProductItems._options.getUrl + '?' + query)
                .done(function (result) {
                    // Заполняем результат и убираем overlay
                    $('.features_items').html(result);
                    $('.features_items').LoadingOverlay('hide');

                    // Обновляем пейджинг
                    $('.pagination li').removeClass('active');
                    $('.pagination li a').prop('href', '#');
                    $('.pagination li a[data-page=' + page + ']')
                        .removeAttr('href')
                        .parent()
                        .addClass('active');

                })
                .fail(function () {
                    console.log('clickOnPage getItems error');
                    $('.features_items').LoadingOverlay('hide');
                });
        }
    }
}