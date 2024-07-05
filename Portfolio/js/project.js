document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/json/projects.json')
        .then(response => response.json())
        .then(data => {
            const projects = data.projects;
            const recentProjectsContainer = document.getElementById('recent-projects');
            const completedProjectsContainer = document.getElementById('completed-projects');

            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';

                const endDate = project.end ? project.end : 'Present';
                const isRecent = endDate === 'Present';

                card.innerHTML = `
                    <img src="${project.imagelink}" alt="${project.name}">
                    <div class="project-details">
                        <h2>${project.name}</h2>
                        <p>${project.description}</p>
                        <div class="dates">${project.start} - ${endDate}</div>
                        <div class="links">
                            <a href="${project.source_link}" target="_blank" title="Source Code">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                            <a href="${project.live_link}" target="_blank" title="Live Project">
                                <i class="fas fa-eye"></i>
                            </a>
                        </div>
                    </div>
                `;

                if (isRecent) {
                    recentProjectsContainer.appendChild(card);
                } else {
                    completedProjectsContainer.appendChild(card);
                }
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
});
