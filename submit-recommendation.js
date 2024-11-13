const recommendationForm = document.getElementById('recommendation-form');
const recommendationsList = document.getElementById('recommendations-list');
const db = firebase.firestore();

recommendationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const modName = document.getElementById('mod-name').value;
    const modDescription = document.getElementById('mod-description').value;

    // Add the recommendation to Firestore
    db.collection('mod_recommendations').add({
        name: modName,
        description: modDescription,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert('Recommendation submitted!');
        loadRecommendations();
        recommendationForm.reset();
    }).catch((error) => {
        console.error('Error submitting recommendation:', error);
    });
});

// Load recommendations from Firestore
function loadRecommendations() {
    db.collection('mod_recommendations').orderBy('createdAt', 'desc').get().then((snapshot) => {
        recommendationsList.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const listItem = document.createElement('li');
            listItem.textContent = `${data.name}: ${data.description}`;
            recommendationsList.appendChild(listItem);
        });
    });
}

// Initially load recommendations
loadRecommendations();
