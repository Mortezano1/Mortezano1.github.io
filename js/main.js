function openTab(evt, tabName) {
    // ۱. پنهان کردن تمام محتواهای تب‌ها
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    // ۲. برداشتن کلاس active از تمام دکمه‌های منو
    const tabLinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // ۳. فعال کردن تب و دکمه کلیک شده
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add("active");
    }
    evt.currentTarget.classList.add("active");

    // ۴. منطق تک‌ستونه شدن (مخفی کردن سایدبار در تب‌های غیر از Home)
    const container = document.querySelector('.container');
    if (container) {
        if (tabName === 'home') {
            container.classList.remove('single-column');
        } else {
            container.classList.add('single-column');
        }
    }
}