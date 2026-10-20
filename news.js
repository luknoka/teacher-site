
import {
    auth,
    db,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp
} from "./firebase.js";

const ADMIN_UID = "XlcYEDWh8ARxcCbX3M1LsFXIkn83";

const loginPanel = document.getElementById("loginPanel");
const adminPanel = document.getElementById("adminPanel");
const loginForm = document.getElementById("loginForm");
const newsForm = document.getElementById("newsForm");
const newsContainer = document.getElementById("newsContainer");
const newsMessage = document.getElementById("newsMessage");
const loginMessage = document.getElementById("loginMessage");
const adminMessage = document.getElementById("adminMessage");

function showDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");

    return day + "." + month + "." + now.getFullYear();
}

/* Завантаження новин для всіх відвідувачів */
async function loadNews() {
    newsContainer.replaceChildren();
    newsMessage.textContent = "Завантаження новин...";

    try {
        const snapshot = await getDocs(collection(db, "news"));

        const newsList = [];

        snapshot.forEach(function(item) {
            newsList.push({
                id: item.id,
                ...item.data()
            });
        });

        newsList.sort(function(a, b) {
            const timeA = a.createdAt?.seconds || 0;
            const timeB = b.createdAt?.seconds || 0;
            return timeB - timeA;
        });

        newsMessage.textContent = "";

        if (newsList.length === 0) {
            newsMessage.textContent = "Поки що новин немає.";
            return;
        }

        newsList.forEach(function(news) {
            const article = document.createElement("article");
            article.className = "news-item";

            const date = document.createElement("span");
            date.textContent = news.date || "";

            const title = document.createElement("h3");
            title.textContent = news.title || "";

            const text = document.createElement("p");
            text.textContent = news.text || "";

            article.append(date, title, text);

            if (auth.currentUser?.uid === ADMIN_UID) {
                const deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.className = "delete-news-button";
                deleteButton.textContent = "Видалити";

                deleteButton.addEventListener("click", async function() {
                    if (!confirm("Точно видалити цю новину?")) {
                        return;
                    }

                    try {
                        await deleteDoc(doc(db, "news", news.id));
                        await loadNews();
                    } catch (error) {
                        alert("Не вдалося видалити новину. Перевір доступ до бази.");
                        console.error(error);
                    }
                });

                article.appendChild(deleteButton);
            }

            newsContainer.appendChild(article);
        });
    } catch (error) {
        newsMessage.textContent =
            "Не вдалося завантажити новини. Перевір налаштування Firebase.";
        console.error(error);
    }
}

/* Вхід адміністратора */
loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    loginMessage.textContent = "";

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;

    try {
        const result = await signInWithEmailAndPassword(auth, email, password);

        if (result.user.uid !== ADMIN_UID) {
            await signOut(auth);
            loginMessage.textContent = "Цей обліковий запис не має прав адміністратора.";
            return;
        }

        loginForm.reset();
    } catch (error) {
        loginMessage.textContent =
            "Не вдалося увійти. Перевір електронну пошту та пароль.";
        console.error(error);
    }
});

/* Додавання новини */
newsForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    if (auth.currentUser?.uid !== ADMIN_UID) {
        adminMessage.textContent = "У тебе немає прав для публікації.";
        return;
    }

    const title = document.getElementById("newsTitle").value.trim();
    const text = document.getElementById("newsText").value.trim();

    if (!title || !text) {
        adminMessage.textContent = "Заповни всі поля.";
        return;
    }

    try {
        await addDoc(collection(db, "news"), {
            title: title,
            text: text,
            date: showDate(),
            createdAt: serverTimestamp()
        });

        newsForm.reset();
        adminMessage.textContent = "Новину успішно опубліковано!";
        await loadNews();
    } catch (error) {
        adminMessage.textContent =
            "Не вдалося опублікувати новину. Перевір правила Firestore.";
        console.error(error);
    }
});

/* Вихід */
document.getElementById("logoutButton").addEventListener("click", async function() {
    await signOut(auth);
});

/* Перевірка користувача */
onAuthStateChanged(auth, function(user) {
    const isAdmin = user && user.uid === ADMIN_UID;

    loginPanel.hidden = Boolean(isAdmin);
    adminPanel.hidden = !isAdmin;

    if (user && !isAdmin) {
        loginMessage.textContent =
            "Цей обліковий запис не має прав адміністратора.";
    }

    loadNews();
});

