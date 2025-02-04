function getCookie(name: string) {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name: string, value: string | number | boolean, props?: { [x: string]: unknown; expires?: any } | undefined) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

function saveToken(nameToken: string, data:string ) {
  if (data) {
    const date = new Date()
    date.setDate(date.getDate() + 3)
    setCookie(nameToken, data, {expires: date, path: '/'});
  }
}

const deleteCookie = (name: string) => {
  setCookie(name, '', { expires: -1 });
}

export {getCookie, saveToken, setCookie, deleteCookie}