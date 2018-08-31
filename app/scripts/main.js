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
  // var numb = valorSelecionado.match(/(\d+)/g);
  // var numb = valorSelecionado.match(/(^[0-9,.]*$)/g);
  var numb = valorSelecionado.match(/\d*\.?\,?\d*/);
  // var numb = valorSelecionado.match(/[-+]?[0-9].?[0-9]/);

  console.log(numb);

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

      var valorDollarReal = dados.USD.ask;

      var valorConvertido = numb * valorDollarReal;

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
