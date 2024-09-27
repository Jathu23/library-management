let books = [];
let users = [];
let browusers = [];
let issuebooks = [];
let returnbooks = [];
let returnhistory = [];
let issuehistory = [];
let addhistory = [];
const Notifcations = [];
let requsts = [];
const duration = 7;

readbookslocal();
readuserlocal();
readIssuebookslocal();
readreturnbookslocal();
updateDashBoard();
shownotification();
document.getElementById("issue_date").value = today();

document.getElementById("addnewbook-btn").addEventListener('click', addNewbook);
document.getElementById("issue-book-btn").addEventListener('click', issueBook);
document.getElementById("receive-book-btn").addEventListener('click', receiveBook);
document.getElementById("bookisbn").addEventListener("input", checkbeforeadd);
document.getElementById("inventory").addEventListener('click', showbooks);
document.getElementById("issue-book").onclick = showIssueBooks();
document.getElementById("history").addEventListener("click", showAddhistory);
document.getElementById("manage-user").addEventListener('click', showusers)
document.getElementById("requst").onclick = showrequsts();


document.getElementById("addhistory").addEventListener("click", showAddhistory);
document.getElementById("issuehistory").addEventListener("click", showIssuehistory);
document.getElementById("returnhistory").addEventListener("click", showreturnhistory);


document.getElementById("issue_bookid").addEventListener('input', function () {
   let inputisbn = document.getElementById("issue_bookid").value;
   if (inputisbn.length == 13) {
      const infoDiv = document.getElementById("issue-info");
      let book = books.find(x => x.isbn == inputisbn);
      if (book == null) {
         infoDiv.children[0].children[1].textContent ="--------------";
         infoDiv.children[1].children[1].textContent ="--------------";
         infoDiv.children[2].children[1].textContent ="--------------";
         infoDiv.children[3].children[1].textContent ="--------------";
         infoDiv.children[4].children[1].textContent = "--------------";
         infoDiv.children[5].children[1].textContent = "--------------";
         window.alert("This book not aviable");
      } else {
         
         let issuedate = document.getElementById("issue_date").value;
         infoDiv.children[0].children[1].textContent = book.title;
         infoDiv.children[1].children[1].textContent = book.author;
         infoDiv.children[2].children[1].textContent = book.genre;
         infoDiv.children[3].children[1].textContent = book.publish_year;
         infoDiv.children[4].children[1].textContent = book.copies;
         infoDiv.children[5].children[1].textContent = returnDate(issuedate, duration);
      }

   }
});
document.getElementById("issue_date").addEventListener('change', function () {
   let datefeild = document.getElementById("issue_date");
   let date = datefeild.value;
   document.getElementById("issue-info").children[5].children[1].textContent = returnDate(date, duration);

});
document.getElementById("receive_userid").addEventListener('input', function () {
   let userid = document.getElementById("receive_userid").value;
   let list = document.getElementById("user_issuebooks");
   list.innerHTML=``;
   readIssuebookslocal();
   let temparray = [];
   issuebooks.forEach(ibook => {
      if (ibook.userdId == userid) {
         let temp = {
            isbn: ibook.isbn,
            count: ibook.count,
            title: ibook.title
         }
         temparray.push(temp)
      }
   });
   if (temparray) {
      temparray.forEach(t => {
         list.innerHTML += `<li  onclick="set_receiveform_value('${t.isbn}','${t.count}')">${t.isbn} ${t.title}</li>`;
      });
     
   }
      
   
 
 
});

document.getElementsByClassName("close-btn")[0].onclick = function () {
   document.getElementById('edit-modal').style.display = 'none';
}
document.getElementById("edit-book-form").addEventListener('submit', function (event) {
   event.preventDefault();
   let editform = document.getElementById("edit-book-form");


   const bookIndex = books.findIndex(b => b.isbn === editform.edit_bookisbn.value);

   if (bookIndex !== -1) {
      books[bookIndex] = {
         isbn: editform.edit_bookisbn.value,
         title: editform.edit_title.value,
         author: editform.edit_author.value,
         genre: editform.edit_genre.value,
         publish_year: editform.edit_publish_year.value,
         copies: editform.edit_copies.value,
         add_date: editform.edit_add_date.value,
         rent_count: books[bookIndex].rent_count
      };

      document.getElementById('edit-modal').style.display = 'none';
      savebookslocal();
      showbooks();
      updateDashBoard();
   } else {
      window.alert("Can not change ISBN number")
   }
});

function set_receiveform_value(value1, value2) {
   let form = document.getElementById("recebook-form");
   form.receive_bookid.value = value1;
   form.receive_count.value = value2;

}
function issueBook(event) {
   event.preventDefault();
   const form = document.getElementById('issue-bookform');
   let Isbn = form.issue_bookid.value;
   let userid = parseInt(form.issue_userid.value);
   let aviuser = users.findIndex(u => u.NICnumber == userid);
   let book = bookIsAviable(Isbn, "books");  //get book object
   if (book) {
      if (aviuser != -1) {
   let issuecount = parseInt(form.issue_bookcount.value);
   let issueDate = form.issue_date.value;
      let issuebook = {
         isbn: Isbn,
         issueid: setid(),
         userdId: userid,
         count: issuecount,
         title: book.title,
         issueDate: returnDate(issueDate, 0),
         returnDate: returnDate(issueDate, duration),
         returned: 0
      }
      issuebooks.push(issuebook);
      saveIssuebookslocal();
      readissuehistorylocal();
      issuehistory.push(issuebook);
      saveissuehistorylocal();
      book.copies -= issuecount;
      book.rent_count += 1;
      readuserlocal();
      let user = users.find(u => u.NICnumber == userid);
      user.rentcount ++;
   form.reset();
   document.getElementById("issue_date").value = today();
      saveuserlocal();
      savebookslocal();
      showIssueBooks();
      updateDashBoard();

      }else{
         window.alert("Userid Invalid !");
         form.issue_userid.value="";
      }
      
   }else{
      window.alert("The Book ISBN Invalid !");
      form.issue_bookid.value="";
   }


}
function addNewbook(event) {
   event.preventDefault();
   const form = document.getElementById('add-new-book');
   let avibook = books.findIndex(b => b.isbn == form.bookisbn.value);
   if (avibook == -1) {
      let newBook = {
         title: form.title.value,
         isbn: form.bookisbn.value,
         author: form.author.value,
         genre: form.garner.value,
         copies: parseInt(form.coppys.value),
         publish_year: form.publish_year.value,
         add_date: today(),
         rent_count: 0
      };
      let HBook = {
         title: form.title.value,
         isbn: form.bookisbn.value,
         author: form.author.value,
         genre: form.garner.value,
         copies: parseInt(form.coppys.value),
         publish_year: form.publish_year.value,
         add_date: today(),
         addid: setid()
      };
      form.reset();
      books.push(newBook);
      savebookslocal();
      readaddhistorylocal();
      addhistory.push(HBook);
      saveaddhistorylocal();
      document.getElementById("addmassage").innerText="Add Book Succcess";
      showbooks();
      setTimeout(() => {
           document.getElementById("addmassage").innerText="";
      }, 3000);
   }else{
      window.alert("This book alredy add go to inventory update it");
      form.reset();
   }
}
function checkbeforeadd(event) {
   event.preventDefault();
   let form = document.getElementById('add-new-book');
   let inputisbn = document.getElementById("bookisbn").value;
   if (inputisbn.length == 13) {
      let exbook = bookIsAviable(inputisbn, "books")
      if (exbook) {
         window.confirm("This Book is alredy Exits Update it");
         // form.bookisbn.value =ISBN;
         form.title.value = exbook.title;
         form.author.value = exbook.author;
         form.garner.value = exbook.genre;
         form.coppys.value = exbook.copies;
         form.publish_year.value = exbook.publish_year;
      }else{
         form.title.value = "";
         form.author.value = "";
         form.garner.value = "";
         form.coppys.value =  "";
         form.publish_year.value =  "";
      }
   }
}
function deleteBook(ISBN) {
   console.log(ISBN);
   let Book = bookIsAviable(ISBN, "issue");

   if (Book) {
      window.alert("This book is in issue list");
   } else {
      const index = books.findIndex(book => book.isbn == ISBN);
      if (index !== -1) {
         books.splice(index, 1);
         savebookslocal();
         showbooks();
         updateDashBoard();
      } else {
         console.log("Book not found");
      }
   }

}
function editBook(ISBN) {
   const book = books.find(b => b.isbn == ISBN);

   if (book) {
      let editform = document.getElementById("edit-book-form");

      editform.edit_bookisbn.value = book.isbn;
      editform.edit_title.value = book.title;
      editform.edit_author.value = book.author;
      editform.edit_genre.value = book.genre;
      editform.edit_publish_year.value = book.publish_year;
      editform.edit_copies.value = book.copies;
      editform.edit_add_date.value = book.add_date;

      document.getElementById('edit-modal').style.display = 'block';
   } else {
      console.log("Book not found");
   }
}
function receiveBook(event) {
   event.preventDefault();
   let receivefrom = document.getElementById("recebook-form");
   let ISBN = receivefrom.receive_bookid.value;
   let userid = parseInt(receivefrom.receive_userid.value);
   let count = parseInt(receivefrom.receive_count.value);

   readIssuebookslocal();
   let aviuser = users.findIndex(u => u.NICnumber == userid);
   let ibook = bookIsAviable(ISBN, "issue");
if (aviuser != -1) {
   if (ibook) {
      let book = bookIsAviable(ISBN, "books");
      book.copies += count;
      let recbook = {
         receiveid: setid(),
         issueid: ibook.issueid,
         isbn: ISBN,
         userid: userid,
         count: count,
         date: today(),
         title: book.title
      };
      readreturnbookslocal();
      readreturnhistorylocal();
      returnbooks.push(recbook);
      savereturnbookslocal();
      returnhistory.push(recbook);
      savereturnhistorylocal();
      readissuehistorylocal();
      let ihbook = issuehistory.find(d => d.issueid == ibook.issueid);
      console.log(ihbook);

      ihbook.returned = 1;
      receivefrom.reset();
      document.getElementById("receivemassage").innerText="receive succcess";  
      saveissuehistorylocal();
      removeReturnbook(ibook.issueid)
      savebookslocal();
      updateDashBoard();
      receivefrom.reset();
      document.getElementById("user_issuebooks").innerHTML=``;
      setTimeout(() => {
         document.getElementById("receivemassage").innerText="";  
      }, 3000);
   } else {
      window.alert("This book not Issue");
      receivefrom.reset();
   } 
}else{
   window.alert("Userid is invalid !")
}

  
}
function removeReturnbook(issueid) {
   let index = issuebooks.findIndex(ibook => ibook.issueid == issueid)
   if (index !== -1) {
      issuebooks.splice(index, 1);
      saveIssuebookslocal();
   }
}
function showbooks() {
   // event.preventDefault();
   readbookslocal();
   let table = document.getElementById("inventory-table");
   table.innerHTML = `<tr>
                        <th>ISBN-10</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Garner</th>
                        <th>Publish-Year</th>
                        <th>Coppy's</th>
                        <th>Add-Date</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>`;
   books.forEach(element => {

      table.innerHTML += `<tr>
                         <td>${element.isbn}</td>
                         <td>${element.title}</td>
                         <td>${element.author}</td>
                         <td>${element.genre}</td>
                         <td>${element.publish_year}</td>
                         <td>${element.copies}</td>
                         <td>${element.add_date}</td>
                         <td><button onclick="editBook('${element.isbn}')">Edit</button></td>
                           <td><button onclick="deleteBook('${element.isbn}')">Delete</button></td>
                         
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
      table.innerHTML += `   <tr>
                          <td>${requst.title}</td>
                           <td>${requst.author}</td>
                          <td>${requst.userid}</td>
                          <td>${requst.date}</td>
                          <td>${requst.message}</td>
                      </tr>`;
   });

}
function shownotification() {
let table = document.getElementById("notifcations_table");
table.innerHTML =`     <tr>
                    <th>Issue-Id</th>
                    <th>Title</th>
                    <th>User-Id</th>
                    <th>Issue-Date</th>
                    <th>Due-Date</th>
                    <th>Staus</th>
                   </tr>`;
Notifcations.forEach(data => {
   table.innerHTML += ` <tr>
                <td>${data.issueid}</td>
                <td>${data.title}</td>
                <td>${data.userid}</td>
                <td>${data.issuedate}</td>
                <td>${data.returndate}</td>
                <td>${data.staus}</td>
              </tr>`;
   
});
}
function showusers(event) {
   event.preventDefault();
   readrequstlocal();
   let table = document.getElementById("user-table");
   table.innerHTML = `  <tr>
                        <th>User-Id</th>
                        <th>User-Name</th>
                        <th>Phone-Number</th>
                        <th>E-mail</th>
                        <th>Join-Date</th>
                        <th>Rent-count</th>
                        <th>Requst-count</th>
                    </tr>`;
   readuserlocal();

   users.forEach(userdata => {
      let reqcount =0;
      requsts.forEach(data => {
         if (data.userid == userdata.NICnumber) {
            reqcount++;
         }
      });
      table.innerHTML += ` <tr>
                    <td>${userdata.NICnumber}</td>
                    <td>${userdata.username}</td>
                      <td>${userdata.phonenember}</td>
                     <td>${userdata.email}</td>
                    <td>${userdata.joindate}</td>
                    <td>${userdata.rentcount}</td>
                    <td>${reqcount}</td>
                  </tr>`
   });

}
function showAddhistory() {
   document.getElementById("historyoption-title").innerHTML="Add History";
   readaddhistorylocal();
   let table = document.getElementById("history_table");

   table.innerHTML = ` <tr>
                        <th>Book_Id</th>
                        <th>Title</th>
                        <th>Coppy's</th>
                        <th>Add-Date</th>
                    </tr>`;
   addhistory.forEach(element => {
      table.innerHTML += ` <tr>
                        <td>${element.isbn}</td>
                        <td>${element.title}</td>
                        <td>${element.copies}</td>
                        <td>${element.add_date}</td>
                    </tr>`;

   });

}
function showIssueBooks() {
   // event.preventDefault();
   let table = document.getElementById("issue-table");

   table.innerHTML = ` <tr>
                       <th>issue-id</th>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>User-Id</th>
                        <th>Issue-Date</th>
                        <th>Coppy's</th>
                        <th>Return-Date</th>
                        <th>Staus</th>
                    </tr>`;
   for (let i = issuebooks.length - 1; i >= 0; i--) {
      table.innerHTML += `<tr>
         <td>${issuebooks[i].issueid}</td>
         <td>${issuebooks[i].isbn}</td>
         <td>${issuebooks[i].title}</td>
         <td>${issuebooks[i].userdId}</td>
         <td>${issuebooks[i].issueDate}</td>
         <td>${issuebooks[i].count}</td>
         <td>${issuebooks[i].returnDate}</td>
         <td>${datedifference(issuebooks[i].returnDate,"message")}</td>
        </tr>`;
   }
}
function showIssuehistory() {
   document.getElementById("historyoption-title").innerHTML="Issue History";
   readissuehistorylocal();
   let table = document.getElementById("history_table");
   table.innerHTML = ` <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>User-Id</th>
                        <th>Issue-Date</th>
                        <th>Coppy's</th>
                        <th>Return-Date</th>
                    </tr>`;
   issuehistory.forEach(element => {
      table.innerHTML += `<tr>
   <td>${element.isbn}</td>
   <td>${element.title}</td>
   <td>${element.userdId}</td>
   <td>${element.issueDate}</td>
   <td>${element.count}</td>
   <td>${element.returnDate}</td>
  </tr>`;
   });
}
function showreturnhistory() {
   readreturnhistorylocal();
   document.getElementById("historyoption-title").innerHTML="Return History";
   let table = document.getElementById("history_table");

   table.innerHTML = `<tr>
<th>Book-ID</th>
<th>Title</th>
<th>Coppy's</th>
<th>User-Id</th>
<th>Issue-Date</th>
<th>Due-Date</th>
<th>Returned-Date</th>
</tr>`;

   returnhistory.forEach(element => {
      
      let ibook = issuehistory.find(b => b.issueid == element.issueid);
      console.log(ibook);
      

      table.innerHTML += `
<tr>
<td>${element.isbn}</td>
<td>${element.title}</td>
<td>${element.count}</td>
<td>${element.userid}</td>
<td>${ibook.issueDate}</td>
<td>${ibook.returnDate}</td>
<td>${element.date}</td>
</tr>`;
   });

}



function bookIsAviable(value, where) {
   if (where == "issue") {
      readIssuebookslocal();
      let ibook = issuebooks.find(x => x.isbn == value);
      return ibook;
   } else if (where == "books") {
      readbookslocal();
      let book = books.find(x => x.isbn == value);
      return book;
   } else {
      console.log("func- bookIsAviable >> location not set");
   }

}




function today(days) {
   let nowDate = new Date();
   if (days != null) {
      nowDate.setDate(nowDate.getDate() + days);
      let year = nowDate.getFullYear();
      let month = String(nowDate.getMonth() + 1).padStart(2, '0'); 
      let day = String(nowDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;

   } else {
      let year = nowDate.getFullYear();
      let month = String(nowDate.getMonth() + 1).padStart(2, '0'); 
      let day = String(nowDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;

   }
}
function returnDate(date, days) {
   let nowDate = new Date(date);
   nowDate.setDate(nowDate.getDate() + days);
   let year = nowDate.getFullYear();
   let month = String(nowDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
   let day = String(nowDate.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`;
}
function displayDate(date) {
   let nowDate = new Date(date);
   let year = nowDate.getFullYear();
   let month = String(nowDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
   let day = String(nowDate.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`;
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



function saveIssuebookslocal() {
   localStorage.setItem('issuebooks', JSON.stringify(issuebooks));
}
function saveissuehistorylocal() {
   localStorage.setItem('issuehistory', JSON.stringify(issuehistory));
}
function savebookslocal() {
   localStorage.setItem('books', JSON.stringify(books));
}
function savereturnbookslocal() {
   localStorage.setItem('Recivebooks', JSON.stringify(returnbooks));
}
function savereturnhistorylocal() {
   localStorage.setItem('returnhistory', JSON.stringify(returnhistory));
}
function saveaddhistorylocal() {
   localStorage.setItem('addhistory', JSON.stringify(addhistory));
}
function saveuserlocal() {
   localStorage.setItem('Users', JSON.stringify(users));
}




function readIssuebookslocal() {
   issuebooks = [];
   let olddata = JSON.parse(localStorage.getItem('issuebooks')) || [];
   olddata.forEach(data => {
      issuebooks.push(data);
   })
}
function readissuehistorylocal() {
   issuehistory = [];
   let olddata = JSON.parse(localStorage.getItem('issuehistory')) || [];
   olddata.forEach(data => {
      issuehistory.push(data);
   })
}
function readbookslocal() {
   books = [];
   let olddata = JSON.parse(localStorage.getItem('books')) || [];
   olddata.forEach(data => {
      books.push(data);
   })
}
function readuserlocal() {
   users = [];
   let olddata = JSON.parse(localStorage.getItem('Users')) || [];
   olddata.forEach(data => {
      users.push(data);
   })
}
function readreturnbookslocal() {
   returnbooks = [];
   let olddata = JSON.parse(localStorage.getItem('Recivebooks')) || [];
   olddata.forEach(data => {
      returnbooks.push(data);
   })
}
function readreturnhistorylocal() {
   returnhistory = [];
   let olddata = JSON.parse(localStorage.getItem('Recivebooks')) || [];
   olddata.forEach(data => {
      returnhistory.push(data);
   });

}
function readrequstlocal() {
   requsts = [];
   let olddata = JSON.parse(localStorage.getItem("requst")) || [];
   olddata.forEach(data => {
      requsts.push(data);
   })
}
function readaddhistorylocal() {
   addhistory = [];
   let olddata = JSON.parse(localStorage.getItem("addhistory")) || [];
   olddata.forEach(data => {
      addhistory.push(data);
   })
}



function updateDashBoard() {
   let dassItem = document.getElementById("dass-items");
   dassItem.children[0].children[1].textContent = totalBooks();
   dassItem.children[1].children[1].textContent = issueBooks();
   dassItem.children[2].children[1].textContent =  overduebookcount();
   dassItem.children[3].children[1].textContent = issuetodaycount();
   dassItem.children[4].children[1].textContent = totaluser();
   dassItem.children[5].children[1].textContent = browuserscount();
   dassItem.children[6].children[1].textContent = requstscount();
   dassItem.children[7].children[1].textContent = notifcationcount();
   dassItem.children[8].children[1].textContent = rentCount();
}
function totalBooks() {
   return books.length;
}
function issueBooks() {
   return issuebooks.length;
}
function rentCount() {
   let sum = 0;
   books.forEach(element => {
      sum += element.rent_count;
   });
   return sum;
}
function totaluser() {
   readuserlocal();
   return users.length;

}
function browuserscount() {
   readIssuebookslocal();
   let buser = [];
   issuebooks.forEach(book => {
      buser.push(book.userdId)
   });
   browusers = [...new Set(buser)];
   console.log(browusers);
   return browusers.length;

}
function overduebookcount() {
   let count = 0;
   issuebooks.forEach(data =>{
   let value = datedifference(data.returnDate);
  if (value < 0) {
   let note ={
      issueid:data.issueid,
      title:data.title,
      userid:data.userdId,
      issuedate:data.issueDate,
      returndate:data.returnDate,
      staus:datedifference(data.returnDate,"message")
   }
   Notifcations.push(note);
   count++;
  }
   });
   return count;
}
function issuetodaycount() {
   let count = 0;
   issuebooks.forEach(data => {

      if (data.issueDate == today()) {
         count++;
      }
   });
   return count;

}
function requstscount() {
   readrequstlocal();
   return requsts.length;
}
function notifcationcount() {
   return Notifcations.length;
}


function generateInventoryReport() {
   readbookslocal();
   let report = `<h2>Inventory Report</h2>
   <table class="table-style">
    <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Genre</th>
        <th>Copies</th>
    </tr>`;

   books.forEach(book => {
      report += `<tr>
                  <td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.genre}</td>
                  <td>${book.copies}</td>
                  </tr>`;
   });

   report += '</table>';
   document.getElementById('report_div').innerHTML = report;
}
function generateMemberReport() {
   readuserlocal();
   readissuehistorylocal();
   let report = `<h2>User Report</h2>
   <table class="table-style" >
    <tr>
        <th>User-Id</th>
        <th>User-Name</th>
        <th>Borrowed-Books</th>
        <th>Total-Brow-Count</th>
    </tr>`;
   users.forEach(user => {
      let nic = user.NICnumber;
      let ibooks = [];

      issuehistory.forEach(data => {
         if (data.userdId == nic) {
            ibooks.push(data.title);
         }
      });

      report += `<tr>
      <td>${user.NICnumber}</td>
      <td>${user.username}</td>
      <td>${ibooks}</td>
      <td>${user.rentcount}</td>
      </tr>`;

   });
   report += '</table>';
   document.getElementById('report_div').innerHTML = report;
}
function generateBrowReport() {
   readissuehistorylocal();
   let report = `<h2> Borrow Report</h2>
   <table class="table-style">
    <tr>
        <th>Borrow-Id</th>
        <th>Borrow-Date</th>
        <th>User_Id</th>
         <th>Book-Title</th>
        <th>Copies</th>
    </tr>`;

   issuehistory.forEach(data => {
      report += `<tr>
                  <td>${data.issueid}</td>
                  <td>${data.issueDate}</td>
                  <td>${data.userdId}</td>
                  <td>${data.title}</td>
                   <td>${data.count}</td>
                  </tr>`;
   });

   report += '</table>';
   document.getElementById('report_div').innerHTML = report;
}
document.getElementById("report").onclick = generateInventoryReport;
document.getElementById("inventory_report_btn").onclick = generateInventoryReport;
document.getElementById("member_report_btn").onclick =generateMemberReport;
document.getElementById("brow_repport_btn").onclick =generateBrowReport;