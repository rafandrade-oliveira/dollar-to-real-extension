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
  console.log('valorSelecionado ' + valorSelecionado);
  var numb = valorSelecionado.match(/(\d+)/g);

  console.log('numb ' + numb);

  if (numb != null) {
    numb = numb.join('');
  }

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
      console.log(dados);
      console.log('numero: ' + numb);

      var valorDollarReal = dados.USD.ask;
      console.log('valor dollar ' + valorDollarReal);
      var valorConvertido = numb * valorDollarReal;
      console.log('valor Convertido ' + valorConvertido);

      var real = (valorConvertido + '').slice(0, 5);


      $('.valor-convertido').html('R$ ' + real);
      $('.valor-convertido').fadeIn();


    },
    error: function () { }
  });
}




document.onmouseup = document.onkeyup = function () {
  getSelectValue();
};

// $(document).click(function () {
//   getSelectValue();
// });
