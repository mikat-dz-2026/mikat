# لوحة أزرار الخطبة — تعليمات الدمج

## 1. الهيكل
assets/
  toolbar.css
  toolbar.js
index.html

## 2. في <head> داخل index.html
<link rel="stylesheet" href="assets/toolbar.css">

## 3. داخل قسم "إعداد الخطبة" (فوق textarea)
الصق محتوى toolbar.html

## 4. قبل </body>
<script src="assets/toolbar.js"></script>

## 5. تحقق من معرّف المحرر
الكود يبحث عن id="khutbaEditor".
إن كان معرّف textarea عندك مختلفًا، عدّل السطر في toolbar.js:
const editor = document.getElementById('khutbaEditor');