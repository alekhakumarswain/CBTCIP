
// Firebase configuration (replace with your own Firebase project credentials)
const firebaseConfig = {
    apiKey: "AIzaSyAYXCCxd864QsNsjtgV0J0EQlpxxZ6E98Q",
    authDomain: "alekha-kumar-swain.firebaseapp.com",
    databaseURL: "https://alekha-kumar-swain-default-rtdb.firebaseio.com",
    projectId: "alekha-kumar-swain",
    storageBucket: "alekha-kumar-swain.appspot.com",
    messagingSenderId: "955898241636",
    appId: "1:955898241636:web:68ac75195aae18d456b571",
    measurementId: "G-DFCCEFH617"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Form submit event listener
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    //date
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateStr = `${month}/${day}/${year}`;
    //time
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    // // Create a new contact object
    // const contact = {
    //     name: name,
    //     email: email,
    //     message: message,
    //     date: dateStr,
    //     time: time
    // };
    // // Add contact to database
    // db.ref('contacts').push(contact);


    // Create a unique key for each message
    const newMessageRef = db.ref('messages').push();

    // Save data to Realtime Database
    newMessageRef.set({
        name: name,
        email: email,
        message: message,
        date: dateStr,
        time: time,
        timestamp: Date.now()
    }).then(() => {
        // Reset form after submission
        form.reset();
        // alert('Message sent successfully!');
    }).catch((error) => {
        console.error('Error sending message: ', error);
        alert('An error occurred while sending your message.');
    });
});
