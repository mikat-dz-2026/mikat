/* ============================================
   لوحة تحكم أزرار الخطبة - ميقات الخطيب
   ============================================ */

(function () {
  'use strict';

  function insertTag(type) {
    const editor = document.getElementById('khutbaEditor');
    if (!editor) {
      console.warn('[toolbar] لم يتم العثور على محرر الخطبة (#khutbaEditor)');
      return;
    }

    const templates = {
      ayah:     '\n﴿ … ﴾\n',
      dua:      '\n[دعاء] … [/دعاء]\n',
      hadith:   '\n« … »\n',
      khutba1:  '\n— الخطبة الأولى —\n',
      khutba2:  '\n— الخطبة الثانية —\n'
    };

    const text = templates[type];
    if (!text) return;

    const start = editor.selectionStart;
    const end   = editor.selectionEnd;

    editor.value =
      editor.value.substring(0, start) +
      text +
      editor.value.substring(end);

    const cursorOffset = text.indexOf('…');
    const newPos = cursorOffset >= 0
      ? start + cursorOffset + 1
      : start + text.length;

    editor.selectionStart = editor.selectionEnd = newPos;
    editor.focus();

    if (typeof window.autosave === 'function') {
      window.autosave();
    } else {
      editor.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  window.insertTag = insertTag;
})();