function handleClick(activeItem) {
    // Hide all sections
   var sections = document.querySelectorAll('main section');
   sections.forEach(function(section) {
       section.style.display = 'none';
   });

   // Show only the selected section
   var selectedSection = document.getElementById(activeItem);
   if (selectedSection) {
       selectedSection.style.display = 'block';
   }

   // Remove 'active' class from all links
   var links = document.querySelectorAll('.nav a');
   links.forEach(function(link) {
       link.classList.remove('active');
   });

   // Add 'active' class to the clicked link
   var activeLink = document.querySelector('a[href="#' + activeItem + '"]');
   if (activeLink) {
       activeLink.classList.add('active');
   }

   // Scroll to the section
   var section = document.getElementById(activeItem);
   if (section) {
       section.scrollIntoView({ behavior: 'smooth' });
   }
}

function openChatbot() {
   // Placeholder function to open chatbot
   alert('Chatbot feature coming soon!');
}


 // Hide all sections except home on load
 var sections = document.querySelectorAll('main section');
 sections.forEach(function(section) {
     if (section.id !== 'home') {
         section.style.display = 'block';
     }
 });

 // Set the home link as active
 var homeLink = document.querySelector('a[href="#home"]');
 if (homeLink) {
     homeLink.classList.add('active');
 }