chrome.tabs.executeScript({
    code: 'window.getSelection().toString();'
}, function (selection) {

    $('.valor-selecionado').html(selection[0]);

    var valorSelecionado = selection[0];
    var numb = valorSelecionado.match(/(\d+)/g);

    if (numb != null) {

        numb = numb.toString().replace(',', '.');
    }

    if (numb != '' && numb != undefined) {
        conversor(numb);
    }

    function conversor(numb) {

        $('.valor-convertido').hide();

        $.ajax({
            url: 'http://economia.awesomeapi.com.br/all/',
            type: 'GET',
            dataType: 'json',
            data: [],
            async: true,
            timeout: 0,
            success: function (dados) {

                var valorDollarReal = dados.USD.ask;
                var valorConvertido = numb * valorDollarReal;
                var separadorNumberValorConvertido = valorConvertido.toString().split('.');

                var real = separadorNumberValorConvertido[0] + ',' + separadorNumberValorConvertido[1].slice(0, 2);

                $('.valor-convertido').html('R$ ' + real);
                $('.valor-convertido').fadeIn();


            },
            error: function () { }
        });
    }

});