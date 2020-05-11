
const conversaList = document.querySelector('.conversas');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');
const  button= document.querySelector('.login');
const setupUI = (user) => {
  if(user) {
    if(user.admin){
      adminItems.forEach(item => item.style.display = 'block');
    }
    //account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
      <div> Logged in as ${user.email} </div>
      <div> ${doc.data().bio}</div>
      <div class="pink-text"> ${user.admin ? 'Admin' : ''}</div
      
      
      `;
      accountDetails.innerHTML = html;
      
    })
    
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }else{
    adminItems.forEach(item => item.style.display = 'none');
    //hide account info
    accountDetails.innerHTML = '';
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
  }

///setup conversas
const setupConversas = (data) => {

  if(data.length){
  let html = '';
  data.forEach(doc => {
   const conversa = doc.data();
   const li = ` 
   <li> 
   
   <div class ="collapsible-header grey lighten-4">${conversa.title}</div>
   <div class= "collapsible-body white">${conversa.content}
   <h4>Location:</h4>
   <div class=" "collapsible-body white">${conversa.city}</div>
   <button class="btn orange darken-2 z-depth-0">Attend</button></div
   
   
   </li>
   `;
   html += li
  });

  conversaList.innerHTML = html;
}else{
  conversaList.innerHTML =` <li class="logged-out">
  <a href="#" class="btn orange darken-2 z-depth-0 modal-trigger" data-target="modal-login">Login to see content</a>
</li>`
}

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});