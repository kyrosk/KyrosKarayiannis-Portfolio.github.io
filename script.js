document.addEventListener('DOMContentLoaded', function () {
    const projectCarousel = document.querySelector('.project-carousel');
    const projects = document.querySelectorAll('.project');
    const totalProjects = projects.length;
    let currentIndex = 0;

    function showProject(index) {
        projects.forEach(function (project) {
            project.style.display = 'none';
        });

        if (index < 0) {
            currentIndex = totalProjects - 1;
        } else if (index >= totalProjects) {
            currentIndex = 0;
        }

        projects[currentIndex].style.display = 'block';
    }

    function nextProject() {
        currentIndex++;
        showProject(currentIndex);
    }

    function prevProject() {
        currentIndex--;
        showProject(currentIndex);
    }

    showProject(currentIndex);

    document.querySelector('.next-button').addEventListener('click', nextProject);
    document.querySelector('.prev-button').addEventListener('click', prevProject);

    const viewDetailsButtons = document.querySelectorAll('.cta-button');

    viewDetailsButtons.forEach(function (button, index) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const projectDetails = projects[index].querySelector('.project-details');
            projectDetails.classList.toggle('expanded');
            button.textContent = projectDetails.classList.contains('expanded') ? 'Hide Details' : 'View Details';
        });
    });

    
});
