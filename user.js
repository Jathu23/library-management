let books = [];
let issuebooks = [];
let browbooks = [];
let browhistory =[];
let returnhistory =[];
let issuehistory=[];
let Notifcations=[];
const user = curentuser("id");

profile

readbookslocal();
readIssuebookslocal();
getbrowbooks();
updatedashboard();
shownotification();

document.getElementById("username").innerText = curentuser();
document.getElementById("view-book").addEventListener('click', showbooks);
document.getElementById("browed-book").addEventListener('click',showbrowbook);
document.getElementById("browhistory").addEventListener('click',showbrowhistory);
document.getElementById("returnhistory").addEventListener('click',showreturnhistory);
document.getElementById("History").addEventListener('click',showbrowhistory);

const modal1 = document.getElementById("bookModal");
const modal2 = document.getElementById("userinfo");
const requstForm = document.getElementById("bookForm");

document.getElementById("addrequst_btn").onclick = function() {
    modal1.style.display = "block";
}
document.getElementById("close_requst").onclick = function() {
    modal1.style.display = "none";
}

document.getElementById("profile").onclick = function () {
   updateuserinfo();
   modal2.style.display = "block";
}
document.getElementById("close_profile").onclick = function(){
   modal2.style.display = "none";
}
requstForm.onsubmit = function postrequst(event) {
   event.preventDefault();
   let title = requstForm.title.value;
   let author = requstForm.author.value;
   let message = requstForm.message.value;


   const requstbook = {
       title: title,
       author: author,
       message: message,
       reqid:setid(),
       userid :user,
       date :today()
   };
   requsts.push(requstbook);
   saverequstlocal();
   bookForm.reset();
   modal.style.display = "none";
} ;
document.getElementById("Requst").addEventListener('click',showrequsts)



function showbrowhistory() {
   // event.preventDefault();
   document.getElementById("historyoption-title").textContent="Brow-History";
   readbrowhistorylocal();
   let table = document.getElementById("history_table");
   table.innerHTML = ` <tr>
                        <th>Brow-Id</th>
                        <th>ISBN</th>
                          <th>Title</th>
                        <th>Brow-Datet</th>
                        <th>Due-Date</th>
                         <th>Copies</th>
                      
                    </tr>`;
   browhistory.forEach(element => {
   table.innerHTML += `<tr>
   <td>${element.issueid}</td>
   <td>${element.isbn}</td>
      <td>${element.title}</td>
   <td>${element.issueDate}</td>
   <td>${element.returnDate}</td>
    <td>${element.count}</td>

  </tr>`;
}) ;   
}
function showreturnhistory(event) {  
   document.getElementById("historyoption-title").textContent="Return-History";
   readreturnhistorylocal();
   readissuehistorylocal();
   let table = document.getElementById("history_table");
   table.innerHTML = ` <tr>
                        <th>Return-Id</th>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Copies</th>
                        <th>Brow-Datet</th>
                        <th>Due-Date</th>
                          <th>Return-Date</th>
                         
                      
                    </tr>`;
   returnhistory.forEach(element => {
      let ibook = issuehistory.find(b =>b.issueid == element.issueid);

   table.innerHTML += `<tr>
   <td>${element.receiveid}</td>
   <td>${element.isbn}</td>
    <td>${element.title}</td>
   <td>${element.count}</td>
   <td>${ibook.issueDate}</td>
   <td>${ibook.returnDate}</td>
   <td>${element.date}</td>

  
   
  </tr>`;
}) ;   
}
function showbooks() {
   // event.preventDefault();
   let table = document.getElementById("All_books");
   table.innerHTML = `<tr>
                         <th>ISBN</th>
                         <th>Title</th>
                         <th>Author</th>
                         <th>Garner</th>
                         <th>Publish-Year</th>
                         <th>available-copies </th>
                     </tr>`;
   books.forEach(element => {
      table.innerHTML += `<tr>
                          <td>${element.isbn}</td>
                          <td>${element.title}</td>
                          <td>${element.author}</td>
                          <td>${element.genre}</td>
                          <td>${element.publish_year}</td>
                          <td>${element.copies}</td>
                          
                         </tr>`;

   });
}
function showbrowbook() {
   getbrowbooks();
   let table = document.getElementById("browbook_table");
   table.innerHTML = `<tr>
   <th>ISBN</th>
   <th>Title</th>
   <th>Author</th>
   <th>Issue-Date</th>
   <th>Return-Date</th>
   <th>Count</th>
   <th>Staus</th>
</tr>`;
   browbooks.forEach(book => {
      table.innerHTML += ` <tr>
                        <td>${book.isbn}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.issuedate}</td>
                        <td>${book.returndate}</td>
                        <td>${book.count}</td>
                        <td>${datedifference(book.returndate,"message")}</td>
                    </tr>`;
   });
}
function showrequsts() {
   readrequstlocal();
   let table = document.getElementById("requst_table");
   table.innerHTML = ` <tr>
                          <th>Book-Title</th>
                          <th>Author</th>
                          <th>User-Id</th>
                          <th>Requst-Date</th>
                          <th>Massage</th>
                      </tr>`;
                      requsts.forEach(requst => {
    if (requst.userid == user) {
      table.innerHTML += `   <tr>
      <td>${requst.title}</td>
       <td>${requst.author}</td>
      <td>${requst.userid}</td>
      <td>${requst.date}</td>
      <td>${requst.message}</td>
  </tr>`;          
 }

   });

}
function shownotification() {
   // overduebookcount();
   let table = document.getElementById("notifcations_table");
   table.innerHTML =`     <tr>
                       <th>Issue-Id</th>
                       <th>Title</th>
                       <th>Issue-Date</th>
                       <th>Due-Date</th>
                       <th>Staus</th>
                      </tr>`;

   Notifcations.forEach(data => {
         table.innerHTML += ` <tr>
         <td>${data.issueid}</td>
         <td>${data.title}</td>
         <td>${data.issuedate}</td>
         <td>${data.returndate}</td>
         <td>${data.staus}</td>
       </tr>`;
      
   });
   }
function getbrowbooks() {
   browbooks =[];
   issuebooks.forEach(book => {
      if (book.userdId == user) {
    
         let bid = book.isbn;
         
         
         let Book = bookIsAviable(bid, "books");
     
         let bbook = {
            isbn: Book.isbn,
            title: Book.title,
            author: Book.author,
            issuedate: book.issueDate,
            count: book.count,
            returndate: book.returnDate
         };
         browbooks.push(bbook);
      }
   });
}

function readIssuebookslocal() {
   issuebooks =[];
   let olddata = JSON.parse(localStorage.getItem('issuebooks')) || [];
   olddata.forEach(data => {
      issuebooks.push(data);
   })
}
function readbookslocal() {
   books =[];
   let olddata = JSON.parse(localStorage.getItem('books')) || [];
   olddata.forEach(data => {
      books.push(data);
   })
}
function readbrowhistorylocal() {
   let data = JSON.parse(localStorage.getItem('issuehistory')) || [];
   browhistory =[];
   data.forEach(data => {
      if (data.userdId == user) {
         browhistory.push(data);
      }
      
   });
   
}
function readreturnhistorylocal() {
   let data = JSON.parse(localStorage.getItem('Recivebooks')) || [];
   returnhistory =[];
   data.forEach(data => {
      if (data.userid == user) {
         returnhistory.push(data);
      }
      
   });
}
function readissuehistorylocal() {
   issuehistory = [];
   let olddata = JSON.parse(localStorage.getItem('issuehistory')) || [];
   olddata.forEach(data => {
      if (data.userdId == user) {
         issuehistory.push(data);  
      }
   })
}
function curentuser(data) {
   let user = JSON.parse(localStorage.getItem('loginuser'));
   if (data == "id") {
      return user.nic;
   }
   return user.username;
  
}
function bookIsAviable(id, where) {
   if (where == "issue") {
      readIssuebookslocal();
      let ibook = issuebooks.find(x => x.isbn == id);
      return ibook;

   } if (where == "books") {
      readbookslocal();
      let book = books.find(x => x.isbn == id);
      return book;
   }
}
function  saverequstlocal() {
   localStorage.setItem("requst",JSON.stringify(requsts));
}
function readrequstlocal() {
   requsts =[];
   let olddata = JSON.parse(localStorage.getItem("requst")) || [];
   olddata.forEach(data => {
      requsts.push(data);
   })
}
function today(days) {
   let nowDate = new Date();
   if (days != null) {
      nowDate.setDate(nowDate.getDate() + days);
      return nowDate.toDateString();
   } else {
      return nowDate.toDateString();
   }
}
function datedifference(input,out) {
   let today = new Date();
   let inputDate = new Date(input);
   let diff = inputDate - today;
   let difference = Math.floor(diff / (1000 * 60 * 60));
   let days = Math.floor(difference / 24);
   let hours = difference % 24;
   
   if (out) {
      if (days < 0 && hours < 0) {
         return `${days*-1} Days ${hours*-1} hours over`;
      }else{
         return `${days} Days ${hours} hours more`;
      }
   }else{
      return difference;
   }
}
function setid() {
   return Date.now().toString().substring(6);
}

function totalbrowcount() {
   readissuehistorylocal();
   let count=0;
   issuehistory.forEach(data =>{
if (data.userdId == user) {
   count += 1;
}
   });
   return count;
}
function totalbrowbookcount() {
   readIssuebookslocal();
   let count = 0;
   issuebooks.forEach(data =>{
if (data.userdId == user) {
   count++;
}
   });
   return count;
}
function overduebookcount() {
   let count = 0;
   issuebooks.forEach(data =>{

if (data.userdId == user) {
   let value = datedifference(data.returnDate);
   if (value < 0) {
      count++;
    let note ={
       issueid:data.issueid,
       title:data.title,
       issuedate:data.issueDate,
       returndate:data.returnDate,
       staus:datedifference(data.returnDate,"message")
    }
    Notifcations.push(note);
    
   }
}
   });
   return count;
}

function updatedashboard() {
   let dassItem = document.getElementById('dass-items-div');
   dassItem.children[0].children[1].textContent = totalbrowcount();
   dassItem.children[1].children[1].textContent =totalbrowbookcount();
   dassItem.children[2].children[1].textContent =  overduebookcount();
   
}
function updateuserinfo() {
  let users = [];
  let olddata =  JSON.parse(localStorage.getItem('Users'));
  olddata.forEach(data => {
    users.push(data);
  });
let finduser = users.find(u => u.NICnumber == user);
let profileform = document.getElementById("profile_form");
profile_form.f_name.value =finduser.firstname;
profile_form.l_name.value =finduser.lastname;
profile_form.phone.value =finduser.phonenember;
profile_form.nic.value =finduser.NICnumber;
profile_form.email.value =finduser.email;

profileform.onsubmit = function(event) {
   event.preventDefault();
   finduser.firstname=profile_form.f_name.value ;
   finduser.lastname=profile_form.l_name.value;
   finduser.phonenember= profile_form.phone.value;
   finduser.username =profile_form.f_name.value +" " +profile_form.l_name.value;
   document.getElementById("username").innerText =profile_form.f_name.value +" " +profile_form.l_name.value;
   localStorage.setItem('Users', JSON.stringify(users));
   modal2.style.display = "none";
}

}



// setInterval(() => {
//    const timestamp = Date.now().toString().substring(6);



//   console.log(timestamp);
  
// }, 1000);