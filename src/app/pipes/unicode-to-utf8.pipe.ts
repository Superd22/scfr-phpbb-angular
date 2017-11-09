import { Pipe, PipeTransform } from '@angular/core';
declare function unescape(s: string): string;

@Pipe({ name: 'unicodeToUtf8' })
export class UnicodeToUtf8Pipe implements PipeTransform {
  private static _span = document.createElement("textarea");
  transform(val: string, args?: any): string {
    return UnicodeToUtf8Pipe.HTMLEncode(unescape(val));
  }

  static forEach<T>(obj: T): T {
    if (typeof obj == "string") { obj = UnicodeToUtf8Pipe.HTMLEncode(unescape(obj)); }
    if (obj === Object(obj)) {
      let keyArr = Object.keys(obj);
      keyArr.forEach((key) => {
        obj[key] = UnicodeToUtf8Pipe.forEach(obj[key]);
      });
    }
    if (Array.isArray(obj) && obj.length > 0) {
      obj.forEach((val, key) => {
        obj[key] = UnicodeToUtf8Pipe.forEach(obj[key]);
      });
    }

    return obj;
  }

  static HTMLEncode(str) {
    return UnicodeToUtf8Pipe.convertHTMLEntity(str);
  }

  static convertHTMLEntity(text) {

    const r = text
      .replace(/&[#A-Za-z0-9]+;/gi, (entity, position, text) => {
        UnicodeToUtf8Pipe._span.innerHTML = entity;
        return UnicodeToUtf8Pipe._span.value;
      });

    return r;
  }

}
