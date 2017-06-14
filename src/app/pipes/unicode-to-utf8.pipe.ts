import { Pipe, PipeTransform } from '@angular/core';
declare function unescape(s: string): string;

@Pipe({ name: 'unicodeToUtf8' })
export class UnicodeToUtf8Pipe implements PipeTransform {

  transform(val: string, args?: any): string {
    return UnicodeToUtf8Pipe.HTMLEncode(unescape(val));
  }

  static forEach(obj: any): any {
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
    var map = { amp: '&', lt: '<', gt: '>', quot: '"', '#039': "'", reg:'®', copy:'©' }

    return str.replace(/&([^;=]+?);/g, (m, c) => { if(map[c] == undefined) console.debug("Erreur in UTF8Ize", str,c); return map[c]; })
  }

}
