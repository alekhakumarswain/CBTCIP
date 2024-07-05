document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/json/certificate.json')
        .then(response => response.json())
        .then(data => {
            const certificates = data.certificates;
            const container = document.getElementById('certificate-container');

            certificates.forEach(cert => {
                const card = document.createElement('div');
                card.className = 'productcard';

                card.innerHTML = `
                    <img src="${cert.icon}" alt="${cert.title}">
                    <div class="overlay">
                        <div class="title">${cert.title}</div>
                        <div class="issuer">${cert.issuer}</div>
                        <div class="issue-date">${cert.issue_date}</div>
                        <div class="credential-icon">
                            <a href="${cert.credential_url}" target="_blank">
                                <img src="https://img.icons8.com/material-rounded/48/ffffff/link.png" alt="Credential URL">
                            </a>
                        </div>
                    </div>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching certificates:', error));
});
