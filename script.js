/* ПОВІДОМЛЕННЯ */

function showMessage(text) {
    alert(text);
}


/* АКТИВНИЙ ПУНКТ МЕНЮ */

const currentPage = window.location.pathname.split("/").pop();

const menuLinks = document.querySelectorAll("nav a");

menuLinks.forEach(function(link) {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {

        link.classList.add("active");

        const dropdown = link.closest(".dropdown");

        if (dropdown) {
            dropdown.querySelector(".dropbtn").classList.add("active");
        }
    }
});




/* ДОДАВАННЯ НОВИНИ НА СТОРІНКУ */

function addNewsToPage(news) {

    const article = document.createElement("article");

    article.className = "news-item";


    const date = document.createElement("span");

    date.textContent = news.date;


    const title = document.createElement("h3");

    title.textContent = news.title;


    const text = document.createElement("p");

    text.textContent = news.text;


    article.appendChild(date);

    article.appendChild(title);

    article.appendChild(text);


    newsContainer.prepend(article);
}


/* ЗАВАНТАЖЕННЯ ЗБЕРЕЖЕНИХ НОВИН */



/* ФОРМА КОНТАКТІВ */

const contactForm = document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert("Дякую за повідомлення! Воно було заповнене.");

        contactForm.reset();

    });
}


function checkAnswer(button, correct) {
    const result = document.getElementById("quizResult");

    if (correct) {
        result.textContent = "Правильно! Клавіатура — пристрій введення.";
        result.style.color = "#16834a";
    } else {
        result.textContent = "Не зовсім! Спробуй ще раз.";
        result.style.color = "#c0392b";
    }
}


function highlightMenu(event, target) {
    event.preventDefault();

    let button;

    if (target === "materials") {
        button = document.querySelector(".dropbtn");
    } else {
        button = document.querySelector(
            'nav a[href="' + target + '"]'
        );
    }

    if (!button) {
        return;
    }

    button.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    button.classList.remove("highlight");

    // Перезапускаємо анімацію
    void button.offsetWidth;

    button.classList.add("highlight");

    setTimeout(function() {
        button.classList.remove("highlight");
    }, 2500);
}


function openCertificate(src) {
    const modal = document.getElementById("certificateModal");
    const img = document.getElementById("largeCertificate");

    img.src = src;
    modal.style.display = "flex";
}

function closeCertificate() {
    document.getElementById("certificateModal").style.display = "none";
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeCertificate();
    }
});

function checkStudentAnswer(correct) {
    const result = document.getElementById("studentQuizResult");

    if (correct) {
        result.textContent = "Правильно!";
        result.style.color = "#16834a";
    } else {
        result.textContent = "Спробуй ще раз!";
        result.style.color = "#c0392b";
    }
}
