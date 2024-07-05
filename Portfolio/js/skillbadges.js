document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/json/skillbadge.json')
        .then(response => response.json())
        .then(badges => {
            const container = document.getElementById('badges-container');
            badges.forEach(badge => {
                const badgeElement = document.createElement('div');
                badgeElement.classList.add('badge');
                
                const badgeLink = document.createElement('a');
                badgeLink.href = badge.link;
                badgeLink.title = badge.name;
                
                const badgeImage = document.createElement('img');
                badgeImage.src = badge.imglink;
                badgeImage.alt = badge.name;
                
                badgeLink.appendChild(badgeImage);
                badgeElement.appendChild(badgeLink);
                container.appendChild(badgeElement);
            });
        })
        .catch(error => console.error('Error fetching badges:', error));
});
