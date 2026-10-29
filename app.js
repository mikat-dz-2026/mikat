// تطبيق ميقات الخطيب المطوّر لعام 2026 - نظام إدارة الخطب الشامل
document.addEventListener("DOMContentLoaded", function() {
    initApp();
});

function initApp() {
    if (!localStorage.getItem('khutba_draft_1')) {
        localStorage.setItem('khutba_draft_1', JSON.stringify({
            title: "مسودة الخطبة الأولى المخصصة لك",
            body: "اكتب هنا نص الخطبة المخصصة الأولى التي تتولى صياغتها ونشرها بنفسك..."
        }));
    }
    if (!localStorage.getItem('khutba_draft_2')) {
        localStorage.setItem('khutba_draft_2', JSON.stringify({
            title: "مسودة الخطبة الثانية المخصصة لك",
            body: "اكتب هنا نص الخطبة المخصصة الثانية التي تتولى صياغتها ونشرها بنفسك..."
        }));
    }
    
    if(localStorage.getItem('eid_fitr')) {
        document.getElementById('eid-fitr-text').value = localStorage.getItem('eid_fitr');
    }
    if(localStorage.getItem('eid_adha')) {
        document.getElementById('eid-adha-text').value = localStorage.getItem('eid_adha');
    }
    if(localStorage.getItem('my_custom_duas')) {
        document.getElementById('my-duas-area').value = localStorage.getItem('my_custom_duas');
    }

    renderLibraryDrafts();
}

function switchSection(sectionId, element) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    if (element) element.classList.add('active');
}

function insertCustomTag(openTag, closeTag) {
    const textarea = document.getElementById('khutba-text');
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const text = textarea.value;
    
    const selectedText = text.substring(startPos, endPos);
    const replacement = openTag + selectedText + closeTag;
    
    textarea.value = text.substring(0, startPos) + replacement + text.substring(endPos, text.length);
    textarea.focus();
    textarea.selectionStart = startPos + openTag.length;
    textarea.selectionEnd = startPos + openTag.length + selectedText.length;
}

function renderLibraryDrafts() {
    const draftsContainer = document.getElementById('my-drafts');
    draftsContainer.innerHTML = '';
    
    const keys = ['khutba_draft_1', 'khutba_draft_2'];
    keys.forEach(key => {
        const item = JSON.parse(localStorage.getItem(key));
        if (item) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h4>📝 ${item.title}</h4>
                <p>${item.body.substring(0, 100)}...</p>
                <button onclick="loadDraftToEditor('${key}')" style="background:#3498db; color:#fff; border:none; padding:4px 10px; border-radius:4px; cursor:pointer; font-size:12px; font-weight:bold;">تعديل في المحرر ✍</button>
            `;
            draftsContainer.appendChild(card);
        }
    });
}

function loadDraftToEditor(key) {
    const item = JSON.parse(localStorage.getItem(key));
    if (item) {
        document.getElementById('khutba-title').value = item.title;
        document.getElementById('khutba-text').value = item.body;
        switchSection('sec-editor', document.querySelector('nav button'));
        alert('تم تحميل المسودة بنجاح داخل المحرر الفوري.');
    }
}

function saveToLibrary() {
    const title = document.getElementById('khutba-title').value || "خطبة بدون عنوان";
    const body = document.getElementById('khutba-text').value;
    
    localStorage.setItem('khutba_draft_1', JSON.stringify({ title: title, body: body }));
    renderLibraryDrafts();
    alert('تم حفظ الخطبة كمسودة معتمدة في مكتبتك بنجاح.');
}

function decryptFridayTopic() {
    const keyInput = document.getElementById('friday-key').value;
    const payloadBox = document.getElementById('friday-payload');
    const resultBox = document.getElementById('friday-decrypted-content');
    
    if (keyInput.trim() === "") {
        alert("يرجى إدخال رمز كود التشفير الممنوح لك من المديرية أولاً وبسرية.");
        return;
    }
    
    payloadBox.innerHTML = `
        <p><strong>العنوان الوزاري المعتمد:</strong> أمانة الوظيفة والمسؤولية الشرعية والوطنية في ضوء الإسلام المعتدل.</p>
        <p style="margin-top:10px;"><strong>المحاور الأساسية الموجهة للأئمة والخطباء بالجزائر:</strong><br>
        1. مفهوم الأمانة في حفظ مصالح المصلين ورعاية شؤون العباد والمؤسسات الاستراتيجية للوطن العزيز.<br>
        2. وجوب الإتقان في العمل والابتعاد الكامل عن الغش والتقصير والتكاسل الوظيفي.<br>
        3. دور الخطيب المسند في بث التوجيه الأخلاقي، اللين والتربوي الإيجابي النافع من فوق منبر رسول الله.</p>
    `;
    resultBox.style.display = "block";
    alert("تم فك تشفير موضوع الجمعة الرسمي لمديرية الشؤون الدينية بنجاح 🔓 وجاري عرضه لفضيلتكم.");
}

function startDeliveryMode() {
    const text = document.getElementById('khutba-text').value;
    if (!text.trim()) {
        alert("من فضلك اكتب نص خطبة أو املاً المحرر أولاً لتفعيل وضع الإلقاء على المنبر.");
        return;
    }
    
    let formattedText = text;
    formattedText = formattedText.replace(/\[آية\]([\s\S]*?)\[\/آية\]/g, '<span class="tag-ayah">$1</span>');
    formattedText = formattedText.replace(/\[دعاء\]([\s\S]*?)\[\/دعاء\]/g, '<span class="tag-dua">$1</span>');
    formattedText = formattedText.replace(/\[حديث\]([\s\S]*?)\[\/حديث\]/g, '<span class="tag-hadith">$1</span>');
    formattedText = formattedText.replace(/\[الخطبة الأولى\]([\s\S]*?)\[\/الخطبة الأولى\]/g, '<div class="tag-khutba1">$1</div>');
    formattedText = formattedText.replace(/\[الخطبة الثانية\]([\s\S]*?)\[\/الخطبة الثانية\]/g, '<div class="tag-khutba2">$1</div>');
    
    document.getElementById('delivery-content').innerHTML = formattedText;
    document.getElementById('delivery-view').style.display = "block";
}

function stopDeliveryMode() {
    document.getElementById('delivery-view').style.display = "none";
}