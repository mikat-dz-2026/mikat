طريقة النشر على GitHub Pages (بدون كتابة أي كود)

1) أنشئ حسابًا على github.com ثم اضغط New repository، واكتب اسمًا مثل mikat، واجعله Public، ثم Create.
2) في صفحة المستودع اضغط "uploading an existing file".
3) افتح مجلد site، ثم حدّد كل الملفات داخله واسحبها إلى الصفحة (ارفع الملفات نفسها لا المجلد). ثم Commit changes.
4) من Settings ثم Pages: اختر Deploy from a branch، والفرع main، والمجلد /(root)، ثم Save.
5) بعد دقيقة أو دقيقتين يظهر الرابط: https://اسم-حسابك.github.io/mikat/

ملاحظات:
- ملف "اكواد_التفعيل_سرية.txt" لا ترفعه أبدًا، فهو يبقى عندك لتبيع منه.
- لنشر موضوع الجمعة: أنشئ ملفًا اسمه weekly.json في المستودع بهذا الشكل: {"topic":"العنوان","date":"","note":"","points":["نقطة 1","نقطة 2"]}
- ملفات directives.json وcommunity.json وlinks.json فارغة ويمكن تعبئتها لاحقًا.
- عند تعديل index.html غيّر الرقم في sw.js من mikat-v1 إلى mikat-v2 ليصل التحديث للمستخدمين.
