function addTranslateButton() {
    const posts = document.querySelectorAll('[data-testid="postText"]') as NodeListOf<HTMLElement>;

    posts.forEach((post) => {
        const postContainer = post.parentElement;
        const existingButton = postContainer?.querySelector('.translate-button');

        if (!existingButton) {
            const translateButton = document.createElement('button');
            translateButton.textContent = 'Traduzir';
            translateButton.classList.add('translate-button');

            translateButton.addEventListener('click', async (event) => {
                event.preventDefault();
                event.stopPropagation();

                const postText = post.textContent || '';
                if (postText) {
                    await translateText(postText);
                }
            });

            postContainer?.appendChild(translateButton);
        }
    });
}

async function translateText(text: string) {
    try {
        const response = await fetch('https://pt.libretranslate.com/translate', {
            method: 'POST',
            body: JSON.stringify({
                q: text,
                source: 'auto',
                target: 'pt',
                format: 'text'
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const translation = data.translatedText;

        alert(`Tradução: ${translation}`);

        const translationDiv = document.createElement('div');
        translationDiv.textContent = `Tradução: ${translation}`;
        translationDiv.classList.add('translated-text');

        const postContainer = document.querySelector('[data-testid="postText"]')?.parentElement;
        if (postContainer) {
            if (!postContainer.querySelector('.translated-text')) {
                postContainer.appendChild(translationDiv);
            }
        }
    } catch (error) {
        console.error('Erro ao traduzir o texto:', error);
    }
}

const observer = new MutationObserver(() => {
    addTranslateButton();
});

observer.observe(document.body, { childList: true, subtree: true });
