import {isDate, isObject} from ''

function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl(url: string, params: any): string{

  if(!params) return url

  const parseList: Array<string> = [];
  for(let key in params){
    let val = params[key];
    if(!val) return url;

    let values: Array <string> 
    if(Array.isArray(val)){
      values = val;
      key += '[]';
    }
    else{
      values = [val]
    }
    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parseList.push(`${encode(key)}=${encode(val)}`)
    }) 
  }

  const serializedParams = parseList.join('&');
  url += (url.includes('?') ? '?' : '&') + serializedParams;

  console.log("buildUrl:", url);
  return url;
}