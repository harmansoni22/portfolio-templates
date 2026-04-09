const portfolioListContainer = document.getElementById('portfolioListContainer');

for (let i = 1; i <= 11; i++) {
    const portfolioList = document.createElement('li');
    const portfolioLink = document.createElement('a');
    const portfolioSS = document.createElement('img');
    const portfolioTitle = document.createElement('span');

    portfolioSS.src = `Images/portfolio-${i}.png`;
    portfolioSS.alt = `Banner Image of portfolio ${i}`;
    portfolioSS.classList.add('portfolio-banner');

    portfolioTitle.textContent = `Portfolio ${i}`;

    portfolioLink.setAttribute('href', `portfolio-${i}/index.html`);
    portfolioLink.classList.add('portfolio');

    portfolioLink.appendChild(portfolioSS);
    portfolioLink.appendChild(portfolioTitle);

    portfolioList.appendChild(portfolioLink);
    
    portfolioListContainer.appendChild(portfolioList);
}