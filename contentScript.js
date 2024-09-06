"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function addTranslateButton() {
    const posts = document.querySelectorAll('[data-testid="postText"]');
    posts.forEach((post) => {
        const postContainer = post.parentElement;
        const existingButton = postContainer === null || postContainer === void 0 ? void 0 : postContainer.querySelector('.translate-button');
        if (!existingButton) {
            const translateButton = document.createElement('button');
            translateButton.textContent = 'Traduzir';
            translateButton.classList.add('translate-button');
            translateButton.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                event.stopPropagation();
                const postText = post.textContent || '';
                if (postText) {
                    yield translateText(postText);
                }
            }));
            postContainer === null || postContainer === void 0 ? void 0 : postContainer.appendChild(translateButton);
        }
    });
}
function translateText(text) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield fetch('https://pt.libretranslate.com/translate', {
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
            const data = yield response.json();
            const translation = data.translatedText;
            alert(`Tradução: ${translation}`);
            const translationDiv = document.createElement('div');
            translationDiv.textContent = `Tradução: ${translation}`;
            translationDiv.classList.add('translated-text');
            const postContainer = (_a = document.querySelector('[data-testid="postText"]')) === null || _a === void 0 ? void 0 : _a.parentElement;
            if (postContainer) {
                if (!postContainer.querySelector('.translated-text')) {
                    postContainer.appendChild(translationDiv);
                }
            }
        }
        catch (error) {
            console.error('Erro ao traduzir o texto:', error);
        }
    });
}
const observer = new MutationObserver(() => {
    addTranslateButton();
});
observer.observe(document.body, { childList: true, subtree: true });
