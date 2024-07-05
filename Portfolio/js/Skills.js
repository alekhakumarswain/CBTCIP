fetch('assets/json/skills.json')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('skills-container');
                for (const category in data) {
                    const categoryDiv = document.createElement('div');
                    categoryDiv.className = 'category ' + category;
                    
                    const categoryTitle = document.createElement('h2');
                    categoryTitle.textContent = category.replace(/_/g, ' ').replace(/(?:^|\s|_)\S/g, function(a) { return a.toUpperCase(); });
                    categoryDiv.appendChild(categoryTitle);
                    
                    const skillsGrid = document.createElement('div');
                    skillsGrid.className = 'skills-grid';

                    data[category].forEach(skill => {
                        const card = document.createElement('div');
                        card.className = 'card';
                        card.innerHTML = `
                            <img src="${skill.icon}" alt="${skill.name} icon">
                            <span>${skill.name}</span>
                        `;
                        skillsGrid.appendChild(card);
                    });

                    categoryDiv.appendChild(skillsGrid);
                    container.appendChild(categoryDiv);
                }
            });