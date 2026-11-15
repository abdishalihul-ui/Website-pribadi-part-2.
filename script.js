// INDIKATOR MEMBACA
const progress = document.createElement("div");

progress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: #ff6b21;
    z-index: 9999;
    transition: width 0.1s;
`;

document.body.appendChild(progress);


// TOMBOL KEMBALI KE ATAS
const topButton = document.createElement("button");

topButton.textContent = "↑";

topButton.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: #ff6b21;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 999;
`;

document.body.appendChild(topButton);

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// NAVIGASI AKTIF
const links = document.querySelectorAll(".navbar nav a");

function updatePage() {
    const scrollTop = window.scrollY;
    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage = pageHeight > 0
        ? (scrollTop / pageHeight) * 100
        : 0;

    progress.style.width = percentage + "%";

    topButton.style.display =
        scrollTop > 300 ? "block" : "none";

    links.forEach(link => {
        const section = document.querySelector(link.getAttribute("href"));

        if (section) {
            const position = section.offsetTop - 150;

            if (scrollTop >= position) {
                links.forEach(item => item.classList.remove("aktif"));
                link.classList.add("aktif");
            }
        }
    });
}

window.addEventListener("scroll", updatePage);


// TAHUN OTOMATIS
const footerText = document.querySelector("footer p:last-child");

if (footerText) {
    footerText.textContent =
        "© " + new Date().getFullYear() + " THE NEXT ERA";
}

updatePage();
