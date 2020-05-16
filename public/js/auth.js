// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email: adminEmail }).then(result => {
   console.log(result);
    });
});

// listen for auth changes
auth.onAuthStateChanged(user => {
    if(user){
        user.getIdTokenResult().then(idTokenResult => {
           user.admin = idTokenResult.claims.admin;
           setupUI(user);
        })
        db.collection('conversas').onSnapshot(snapshot => {
            setupConversas(snapshot.docs);
 
        }, err => console.log(err.message));
    } else {
        setupUI();
        setupConversas([])
    }
   
});

//create new conversa
const createForm = document.querySelector('#create-form');
createForm.addEventListener("submit", (e) => {
   e.preventDefault();
   
   db.collection('conversas'). add({
       title: createForm['title'].value,
       content: createForm['content'].value,
       city: createForm['city'].value 
   }).then(() => {
       //close the modal and reset form
       const modal = document.querySelector('#modal-create');
       M.Modal.getInstance(modal).close();
       createForm.reset();
   }).catch(err => {
       console.log(err.message)
   })
})


const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //signup the user

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
       return db.collection('users').doc(cred.user.uid).set({
           bio: signupForm['signup-bio'].value
       });
  
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = ''
    }).cath(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    
    });
});

//logout
const signOut = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        
    console.log('user log out');
    })
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email']. value;
    const password = loginForm['login-password'].value;

    //log the user in 
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
    
        //close login modal and reset the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
    }).cath(err => {
        loginForm.querySelector('.error').innerHTML = err.message;

    });

});