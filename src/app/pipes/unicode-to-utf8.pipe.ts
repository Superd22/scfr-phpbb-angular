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
    const map = { "#39":"'", "nbsp": " ", "iexcl": "¡", "cent": "¢", "quot":"\"", "pound": "£", "curren": "¤", "yen": "¥", "brvbar": "¦", "sect": "§", "uml": "¨", "copy": "©", "ordf": "ª", "laquo": "«", "not": "¬", "reg": "®", "macr": "¯", "deg": "°", "plusmn": "±", "sup2": "²", "sup3": "³", "acute": "´", "micro": "µ", "para": "¶", "middot": "·", "cedil": "¸", "sup1": "¹", "ordm": "º", "raquo": "»", "frac14": "¼", "frac12": "½", "frac34": "¾", "iquest": "¿", "Agrave": "À", "Aacute": "Á", "Acirc": "Â", "Atilde": "Ã", "Auml": "Ä", "Aring": "Å", "AElig": "Æ", "Ccedil": "Ç", "Egrave": "È", "Eacute": "É", "Ecirc": "Ê", "Euml": "Ë", "Igrave": "Ì", "Iacute": "Í", "Icirc": "Î", "Iuml": "Ï", "ETH": "Ð", "Ntilde": "Ñ", "Ograve": "Ò", "Oacute": "Ó", "Ocirc": "Ô", "Otilde": "Õ", "Ouml": "Ö", "times": "×", "Oslash": "Ø", "Ugrave": "Ù", "Uacute": "Ú", "Ucirc": "Û", "Uuml": "Ü", "Yacute": "Ý", "THORN": "Þ", "szlig": "ß", "agrave": "à", "aacute": "á", "acirc": "â", "atilde": "ã", "auml": "ä", "aring": "å", "aelig": "æ", "ccedil": "ç", "egrave": "è", "eacute": "é", "ecirc": "ê", "euml": "ë", "igrave": "ì", "iacute": "í", "icirc": "î", "iuml": "ï", "eth": "ð", "ntilde": "ñ", "ograve": "ò", "oacute": "ó", "ocirc": "ô", "otilde": "õ", "ouml": "ö", "divide": "÷", "oslash": "ø", "ugrave": "ù", "uacute": "ú", "ucirc": "û", "uuml": "ü", "yacute": "ý", "thorn": "þ", "yuml": "ÿ", "fnof": "ƒ", "Alpha": "Α", "Beta": "Β", "Gamma": "Γ", "Delta": "Δ", "Epsilon": "Ε", "Zeta": "Ζ", "Eta": "Η", "Theta": "Θ", "Iota": "Ι", "Kappa": "Κ", "Lambda": "Λ", "Mu": "Μ", "Nu": "Ν", "Xi": "Ξ", "Omicron": "Ο", "Pi": "Π", "Rho": "Ρ", "Sigma": "Σ", "Tau": "Τ", "Upsilon": "Υ", "Phi": "Φ", "Chi": "Χ", "Psi": "Ψ", "Omega": "Ω", "alpha": "α", "beta": "β", "gamma": "γ", "delta": "δ", "epsilon": "ε", "zeta": "ζ", "eta": "η", "theta": "θ", "iota": "ι", "kappa": "κ", "lambda": "λ", "mu": "μ", "nu": "ν", "xi": "ξ", "omicron": "ο", "pi": "π", "rho": "ρ", "sigmaf": "ς", "sigma": "σ", "tau": "τ", "upsilon": "υ", "phi": "φ", "chi": "χ", "psi": "ψ", "omega": "ω", "thetasym": "ϑ", "upsih": "ϒ", "piv": "ϖ", "bull": "•", "hellip": "…", "prime": "′", "Prime": "″", "oline": "‾", "frasl": "⁄", "weierp": "℘", "image": "ℑ", "real": "ℜ", "trade": "™", "alefsym": "ℵ", "larr": "←", "uarr": "↑", "rarr": "→", "darr": "↓", "harr": "↔", "crarr": "↵", "lArr": "⇐", "uArr": "⇑", "rArr": "⇒", "dArr": "⇓", "hArr": "⇔", "forall": "∀", "part": "∂", "exist": "∃", "empty": "∅", "nabla": "∇", "isin": "∈", "notin": "∉", "ni": "∋", "prod": "∏", "sum": "∑", "minus": "−", "lowast": "∗", "radic": "√", "prop": "∝", "infin": "∞", "ang": "∠", "and": "∧", "or": "∨", "cap": "∩", "cup": "∪", "int": "∫", "there4": "∴", "sim": "∼", "cong": "≅", "asymp": "≈", "ne": "≠", "equiv": "≡", "le": "≤", "ge": "≥", "sub": "⊂", "sup": "⊃", "nsub": "⊄", "sube": "⊆", "supe": "⊇", "oplus": "⊕", "otimes": "⊗", "perp": "⊥", "sdot": "⋅", "lceil": "⌈", "rceil": "⌉", "lfloor": "⌊", "rfloor": "⌋", "lang": "〈", "rang": "〉", "loz": "◊", "spades": "♠", "clubs": "♣", "hearts": "♥", "diams": "♦", "\"": "quot", "amp": "&", "lt": "<", "gt": ">", "OElig": "Œ", "oelig": "œ", "Scaron": "Š", "scaron": "š", "Yuml": "Ÿ", "circ": "ˆ", "tilde": "˜", "ndash": "–", "mdash": "—", "lsquo": "‘", "rsquo": "’", "sbquo": "‚", "ldquo": "“", "rdquo": "”", "bdquo": "„", "dagger": "†", "Dagger": "‡", "permil": "‰", "lsaquo": "‹", "rsaquo": "›", "euro": "€" }

    return str.replace(/&([^;=]+?);/g, (m, c) => { if (map[c] == undefined) console.warn("Erreur in UTF8Ize", str, c); return map[c]; })
  }

}
