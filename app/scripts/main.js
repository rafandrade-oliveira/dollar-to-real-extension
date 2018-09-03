function getSelectionText() {

  var text = '';

  var activeEl = document.activeElement;

  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;

  if (
    (activeElTagName == 'textarea') || (activeElTagName == 'input' &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
    (typeof activeEl.selectionStart == 'number')
  ) {
    text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);

  } else if (window.getSelection) {
    text = window.getSelection().toString();

  }
  return text;
}

function getSelectValue() {

  var valorSelecionado = getSelectionText();
  var numb = valorSelecionado.match(/\d*\.?\,?\d*/);

  numb = numb[0].replace(',', '.');


  if (numb != '' && numb != undefined) {
    conversor(numb);
  }

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




document.onmouseup = document.onkeyup = function () {
  getSelectValue();
};

