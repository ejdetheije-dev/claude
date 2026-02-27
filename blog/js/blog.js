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
        title: "Weetjes over Voorschoten",
        date: "2026-02-27",
        author: "Blog Auteur",
        tags: ["voorschoten", "weetjes", "tradities"],
        excerpt: "Wist je dat in de zomermaanden er een paardenmarkt is in Voorschoten? Het hele dorp is dan 2 dagen bezig met een ouderwetse paardenmarkt en zelfs met een heuse paardenrace (op duinzand).",
        content: `
            <p>Wist je dat in de zomermaanden er een paardenmarkt is in Voorschoten. Het hele dorp is dan 2 dagen bezig met een ouderwetse paardenmarkt en zelfs met een heuse paardenrace (op duinzand).</p>
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
