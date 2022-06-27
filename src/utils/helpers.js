export const formatNumber = (num) => {
  if (num) {
    num = num.toString().replaceAll(",", "");
    let pattern = /(\d+)(\d{3})/;
    while (pattern.test(num)) num = num.replace(pattern, "$1,$2");
  }
  return num;
};

export const convertNumbersToEnglish = (date) => {
  return date
    .replace(/[\u0660-\u0669]/g, function (c) {
      return c.charCodeAt(0) - 0x0660;
    })
    .replace(/[\u06f0-\u06f9]/g, function (c) {
      return c.charCodeAt(0) - 0x06f0;
    });
};

export const copyToClipboard = (text) => {
  const textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
};

export const ShebaConvert = (sheba) => {
  const arr = [];
  arr.push(sheba.slice(0, 2));
  arr.push(sheba.slice(2, 22).match(/.{1,4}/g).join(' '));
  arr.push(sheba.slice(22));
  let value = arr.join(' ');
  return value
}

export const CardConvert = (card) => {
  const currentValue = String(card);
  const sepratedValue = currentValue.match(/.{1,4}/g);
  let value = sepratedValue.join(' ');

  if (card)
    return value
  else return ''
}