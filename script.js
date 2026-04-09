function getRouteName(url) {
    const parsed = new URL(url, window.location.href);
    const path = parsed.pathname;
    const fileName = path.split("/").pop();
    return fileName || "index.html";
}

function isHomeRoute(url) {
    return getRouteName(url) === "index.html";
}

function updateActiveNav(url) {
    const routeName = getRouteName(url);
    const navLinks = document.querySelectorAll(".nav-link[data-link]");

    navLinks.forEach(link => {
        const linkRoute = getRouteName(link.getAttribute("href"));
        link.classList.toggle("active", linkRoute === routeName);
    });
}

// Function to load page content via Fetch
const navigateTo = async (url, options = {}) => {
    const { replaceState = false } = options;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.status}`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const incomingMain = doc.getElementById("main");
        const currentMain = document.getElementById("main");

        if (!incomingMain || !currentMain) {
            throw new Error("Missing #main section in source or current page.");
        }

        currentMain.className = incomingMain.className;
        currentMain.innerHTML = incomingMain.innerHTML;

        if (replaceState) {
            history.replaceState(null, null, url);
        } else {
            history.pushState(null, null, url);
        }

        updateActiveNav(url);

        if (isHomeRoute(url)) {
            loadPortfolios();
        }
    } catch (err) {
        console.error("Page failed to load:", err);
    }
};

// Function to build the portfolio list
function loadPortfolios() {
    const container = document.getElementById('portfolioListContainer');
    if (!container) return; // Stop if not on the Home page

    container.innerHTML = ""; // Clear to prevent duplicates

    for (let i = 1; i <= 11; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');
        const span = document.createElement('span');

        img.src = `Images/portfolio-${i}.png`;
        img.classList.add('portfolio-banner');
        
        span.textContent = `Portfolio ${i}`;

        a.href = `portfolio-${i}/index.html`;
        a.classList.add('portfolio');
        a.append(img, span);

        li.appendChild(a);
        container.appendChild(li);
    }
}

// Event Listeners
document.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigateTo(e.target.getAttribute("href"));
    }
});

window.addEventListener("popstate", () => {
    const currentRoute = getRouteName(window.location.href);
    navigateTo(currentRoute, { replaceState: true });
});

// Load portfolios on first visit
window.onload = () => {
    updateActiveNav(window.location.href);

    if (isHomeRoute(window.location.href)) {
        loadPortfolios();
    }
};
