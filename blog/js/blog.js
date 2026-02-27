// Blog posts data
const posts = [
    {
        id: 1,
        title: "Welkom op mijn nieuwe blog",
        date: "2026-02-07",
        author: "Blog Auteur",
        tags: ["welkom", "persoonlijk"],
        excerpt: "Vandaag lanceer ik mijn nieuwe blog! Een plek waar ik mijn gedachten deel over technologie, programmeren en alles wat me bezighoudt.",
        content: `
            <p>Welkom op mijn gloednieuwe blog! Na lang nadenken heb ik besloten om een eigen plek op het internet te maken waar ik mijn gedachten en ervaringen kan delen.</p>

            <h3>Waarom een blog?</h3>
            <p>Schrijven helpt me om mijn gedachten te ordenen. Door dingen op te schrijven, begrijp ik ze beter. En als ik anderen daarmee kan helpen, is dat een mooie bonus.</p>

            <h3>Wat kun je verwachten?</h3>
            <p>Op deze blog zal ik schrijven over:</p>
            <ul>
                <li>Webontwikkeling en programmeren</li>
                <li>Nieuwe technologieën en tools</li>
                <li>Tips en tricks voor developers</li>
                <li>Persoonlijke projecten en ervaringen</li>
            </ul>

            <p>Ik hoop dat je het leuk vindt om mee te lezen. Tot de volgende post!</p>
        `
    },
    {
        id: 2,
        title: "Hoe ik deze blog heb gebouwd",
        date: "2026-02-07",
        author: "Blog Auteur",
        tags: ["technologie", "webdev", "tutorial"],
        excerpt: "Een kijkje achter de schermen: hoe deze blog is gebouwd met alleen HTML, CSS en JavaScript, zonder frameworks of build tools.",
        content: `
            <p>Een van de eerste dingen die ik wilde delen is hoe deze blog tot stand is gekomen. Geen React, geen Next.js, geen build tools - gewoon de basis.</p>

            <h3>De technische keuzes</h3>
            <p>Ik heb bewust gekozen voor een eenvoudige aanpak:</p>
            <ul>
                <li><strong>HTML5</strong> voor de structuur</li>
                <li><strong>CSS3</strong> met custom properties voor theming</li>
                <li><strong>Vanilla JavaScript</strong> voor de dynamische content</li>
                <li><strong>GitHub Pages</strong> voor gratis cloud hosting</li>
            </ul>

            <h3>Waarom geen framework?</h3>
            <p>Niet alles heeft een framework nodig. Voor een eenvoudige blog is vanilla HTML/CSS/JS meer dan voldoende. Het is snel, lichtgewicht en er zijn geen dependencies om te onderhouden.</p>

            <blockquote>De beste code is de code die je niet hoeft te schrijven.</blockquote>

            <h3>Hosting in de cloud</h3>
            <p>GitHub Pages biedt gratis hosting voor statische websites. Je pusht je code naar een repository, en GitHub doet de rest. Geen servers om te beheren, geen kosten, en automatische HTTPS.</p>

            <p>Het resultaat? Een snelle, toegankelijke blog die overal ter wereld bereikbaar is. En dat allemaal gratis!</p>
        `
    },
    {
        id: 3,
        title: "5 tips voor beginners in webontwikkeling",
        date: "2026-02-07",
        author: "Blog Auteur",
        tags: ["tips", "beginners", "webdev"],
        excerpt: "Ben je net begonnen met webontwikkeling? Hier zijn vijf praktische tips die ik graag had geweten toen ik begon.",
        content: `
            <p>Webontwikkeling kan overweldigend zijn als je net begint. Er zijn zoveel talen, frameworks en tools om te leren. Hier zijn mijn vijf belangrijkste tips:</p>

            <h3>1. Begin met de basis</h3>
            <p>Leer eerst HTML, CSS en JavaScript goed voordat je aan frameworks begint. Deze kennis is de fundering van alles wat je later bouwt.</p>

            <h3>2. Bouw echte projecten</h3>
            <p>De beste manier om te leren is door te doen. Bouw een persoonlijke website, een todo-app, of een blog zoals deze. Elk project leert je iets nieuws.</p>

            <h3>3. Lees andermans code</h3>
            <p>Open-source projecten op GitHub zijn een goudmijn. Kijk hoe ervaren developers problemen oplossen. Je leert patronen en best practices die je in geen tutorial vindt.</p>

            <h3>4. Maak fouten</h3>
            <p>Fouten maken is geen falen - het is leren. Elke bug die je oplost maakt je een betere developer. Wees niet bang om te experimenteren.</p>

            <h3>5. Blijf leren</h3>
            <p>Technologie verandert snel. Reserveer regelmatig tijd om nieuwe dingen te leren. Maar onthoud: je hoeft niet alles te weten. Focus op wat relevant is voor jouw doelen.</p>

            <blockquote>Elke expert was ooit een beginner.</blockquote>

            <p>Succes met je reis in webontwikkeling!</p>
        `
    }
];

// Format date to Dutch locale
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Render post cards on the home page
function renderPostList() {
    const container = document.getElementById('blog-posts');
    if (!container) return;

    const html = posts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(post => `
            <article class="post-card">
                <div class="post-meta">
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span>&middot;</span>
                    <span>${post.author}</span>
                </div>
                <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </article>
        `)
        .join('');

    container.innerHTML = html;
}

// Render a single post on the post page
function renderPost() {
    const container = document.getElementById('post-content');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const postId = parseInt(params.get('id'));
    const post = posts.find(p => p.id === postId);

    if (!post) {
        container.innerHTML = `
            <p>Post niet gevonden.</p>
            <a href="index.html" class="back-link">&larr; Terug naar home</a>
        `;
        return;
    }

    document.title = `${post.title} - Blog van Evert`;

    container.innerHTML = `
        <a href="index.html" class="back-link">&larr; Terug naar alle posts</a>
        <article class="post-full">
            <h2>${post.title}</h2>
            <div class="post-meta">
                <span class="post-date">${formatDate(post.date)}</span>
                <span>&middot;</span>
                <span>${post.author}</span>
            </div>
            <div class="post-tags" style="margin-bottom: 1.5rem;">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="post-content">
                ${post.content}
            </div>
        </article>
    `;
}

// Initialize the correct view
document.addEventListener('DOMContentLoaded', () => {
    renderPostList();
    renderPost();
});
