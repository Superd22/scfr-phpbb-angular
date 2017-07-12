import { IBBcode } from './../interfaces/bbcode.interface';

export const baseBBcode: IBBcode[] = [
    { name: "bold", code: ['[b]', '[/b]'], icon: "format_bold" },
    { name: "italic", code: ['[i]', '[/i]'], icon: "format_italic" },
    { name: "underline", code: ['[u]', '[/u]'], icon: "format_underline" },
    { name: "quote", code: ['[quote]', '[/quote]'], icon: "format_quote" },
    { name: "code", code: ['[code]', '[/code]'], icon: "code" },
    { name: "list", code: ['[list]', '[/list]'], icon: "format_list_bulleted" },
    { name: "list numbered", code: ['[list]', '[/list]'], icon: "format_list_numbered" },
    { name: "list item", code: ['[*]'], icon: "add_box" },
    { name: "link", code: ['[url=]', '[/url]'], icon: "insert_link" },
    { name: "img", code: ['[img]','[/img]'], icon: "insert_photo" },

    { name: "align left", code: ['[align=left]', '[/align]'], icon: "format_align_left" },
    { name: "align center", code: ['[align=center]', '[/align]'], icon: "format_align_center" },
    { name: "align right", code: ['[align=right]', '[/align]'], icon: "format_align_right" },
    { name: "align justify", code: ['[align=justify]', '[/align]'], icon: "format_align_justify" },
]