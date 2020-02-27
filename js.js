$( document ).ready(function() {
    $('.product_code').text('Код: '+products[0]['code'].replace(/^0+/, ''))
    $('.productTitle').text(products[0]['title']);


    function assocProdArr (aa){
        var assocProdArray = aa.replace(/;/g, '');
        assocProdArray = assocProdArray.split('\n');
        var str = '';
        for (let i = 0; i < assocProdArray.length; i++) {
            str = str + "<a href='#'> "+assocProdArray[i]+"</a>";
            if (i !== assocProdArray.length-1) {
                str = str + ', '
            }else {
                str = str + '.'
            }
        }
        return str
    }
    $('.assocProducts').html("<b>Могут понадобиться:</b> " + assocProdArr(products[0]['assocProducts']))


    for (let i = 0; i < products.length-70; i++) {
        let img = "<img src='" + products[i]['primaryImageUrl']+ " 'alt = 'Photo'>" ;
        let code = ('Код: '+products[i]['code'].replace(/^0+/, ''));
        let title = (products[i]['title']);
        let assocProd = "<b>Могут понадобиться:</b> " + assocProdArr(products[i]['assocProducts'])


        var priceRetail = products[i]['priceRetail'] + ' ₽';
        var priceGold = products[i]['priceGold'] + ' ₽';
        var priceRetailAlt =  products[i]['priceRetailAlt'].toFixed(2) + ' ₽';
        var priceGoldAlt = products[i]['priceGoldAlt'].toFixed(2) + ' ₽';

        let product1 = $("<div class='product1'></div>");
        $(product1).html("<div class=\"describeProduct\">\n" +
            "                <a class='img_link' href=\"#\">"+ img + "</a>\n" +
            "                <div class=\"description\">\n" +
            "                    <span class=\"product_code\"> "+code +" </span>\n" +
            "                    <a href=\"#\" class=\"productTitle\"> "+ title +" </a>\n" +
            "                    <div class=\"assocProducts\"> "+ assocProd +" </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"buyProduct\">\n" +
            "                <span class=\"prod_status\">Есть в наличии</span>\n"+
            "                <div class=\"priceGold price gold hidden\"> "+ priceGold +" </div>\n"+
            "                <div class=\"priceRetail price retail hidden\"> "+ priceRetail +" </div>\n"+
            "                <div class=\"priceGoldAlt gold price\"> "+ priceGoldAlt +" </div>\n"+
            "                <div class=\"priceRetailAlt retail price\"> "+ priceRetailAlt +" </div>\n"+
            "                <p class=\"pricePoints price\">Можно купить за 231,56 балла</p>\n"+
            "                <div class=\"changeAlt\">\n"+
            "                   <p class='altUnit'>За м.кв.</p>\n"+
            "                   <p class='mainUnit'>За упаковку</p>\n"+
            "                </div> <div class=\"addInfo\">\n" +
            "                    <div class=\"addInfoIcon\"></div>\n" +
            "                    <span class=\"addInfoSpan\">\n" +
            "                        Продается упаковками: <br> 1 упак. = 2.47 м. кв.\n" +
            "                    </span>\n" +
            "                </div>\n" +
            "                <div class=\"calcBttn\">\n" +
            "                    <div class=\"quantity\">\n" +
            "                        <input type=\"text\" name='quantityProd' value=\"1\">\n" +
            "                        <input class='hidden' name='data-product-id' type=\"text\" value='" + products[i]['code']+"'>\n"+
            "                        <div class=\"stepper\">\n" +
            "                            <div class=\"stepperUp\"></div>\n" +
            "                            <div class=\"stepperDown\"></div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                    <div class=\"bttnBuy\"> В корзину</div>\n" +
            "                </div>\n"+
            "            </div>");
        $('.altUnit').addClass('activeUnit')
        $('#wrapper').append(product1)
    }


    // Изминение альтернативы стоимости
    $('.altUnit', '.buyProduct').click(function () {
        var elem = $(this).parent().parent();
        $('.priceGold', elem).addClass('hidden');
        $('.priceRetail', elem).addClass('hidden');
        $('.priceGoldAlt', elem).removeClass('hidden');
        $('.priceRetailAlt', elem).removeClass('hidden');
        console.log( )
    });
    $('.mainUnit', '.buyProduct').click(function () {
        var elem = $(this).parent().parent();
        $('.priceGold', elem).removeClass('hidden');
        $('.priceRetail', elem).removeClass('hidden');
        $('.priceGoldAlt', elem).addClass('hidden');
        $('.priceRetailAlt', elem).addClass('hidden');
        console.log( )
    });
    $('p','.changeAlt').bind('click', function () {
        let thisChangeAlt  = $(this).parent();
        $('p', thisChangeAlt).removeClass('activeUnit');
        $(this).addClass('activeUnit')
    });

    // Stepper
    $('.stepperUp').bind('click', function () {
        let quantityDiv = $(this).parent().parent();
        let quantStepperNumb = $("input[name='quantityProd']",quantityDiv).val();
        quantStepperNumb ++;
        $("input[name='quantityProd']",quantityDiv).val(quantStepperNumb)
    });
    $('.stepperDown').bind('click', function () {
        let quantityDiv = $(this).parent().parent();
        let quantStepperNumb = $("input[name='quantityProd']",quantityDiv).val();
        quantStepperNumb --;
        if (quantStepperNumb < 1){
            return false;
        }
        $("input[name='quantityProd']",quantityDiv).val(quantStepperNumb)
    });

    // Предотвращение отрицательного ввода
    $('input', '.quantity').change(function () {
        if ($(this).val()<0){
            $(this).val(1)
        }
    });

    // Добавление в корзину
    $('.bttnBuy').bind('click', function () {


        // получение значения текущего степера
        let data_product_id = $("input[name='data-product-id'", $(this).parent()).val();
        let quntity = $(this).parent();
        quntity = $('.quantity', quntity);
        quntity = $("input[name='quantityProd'", quntity).val();

        // получение значения выбранной е. изм.
        let price = $(this).parent().parent();
        let priceGold = $('.gold:not(.hidden)',price).text().replace('₽','');
        let priceRetail = $('.retail:not(.hidden)',price).text().replace('₽','');


        let sumGold = quntity * priceGold;
        let sumRetail = quntity * priceRetail;
        var result = new Map([
            ['code', data_product_id],
            ['quantity', Number(quntity)] ,
            ['sumGold', sumGold],
            ['sumRetail', sumRetail]
        ]);
        console.log(result);
    })
});
