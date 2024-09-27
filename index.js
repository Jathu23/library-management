document.getElementById("admin-btn").addEventListener('click', function () {
  document.getElementById("admin-login-div").style.display = "flex";
  document.getElementById("user-login-div").style.display = "none";
  document.getElementById("user-creation-div").style.display = "none";
 
});
document.getElementById("user-btn").addEventListener('click', function () {
  document.getElementById("admin-login-div").style.display = "none";
  document.getElementById("user-login-div").style.display = "flex";
  document.getElementById("user-creation-div").style.display = "none";
 
});
document.getElementById("create-new-account-btn").addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById("admin-login-div").style.display = "none";
  document.getElementById("user-login-div").style.display = "none";
  document.getElementById("user-creation-div").style.display = "block";

});
document.getElementById("already-account").addEventListener('click', function () {
  document.getElementById("admin-login-div").style.display = "none";
  document.getElementById("user-login-div").style.display = "flex";
  document.getElementById("user-creation-div").style.display = "none";

});


let users = [];
readuserlocal();

try {
  let olddata = JSON.parse(localStorage.getItem('books'));
  let d = olddata[0];
} catch (error) {
  let books = [
    {
        "title": "The Great Gatsby",
        "isbn": "0-7432-7356-7",
        "author": "F. Scott Fitzgerald",
        "genre": "Classic",
        "copies": 494,
        "publish_year": "2012",
        "add_date": "2024-01-14",
        "rent_count": 3
    },
    {
        "title": "To Kill a Mockingbird",
        "isbn": "0-06-112008-1",
        "author": "Harper Lee",
        "genre": "Classic",
        "copies": 288,
        "publish_year": "1960",
        "add_date": "2023-06-15",
        "rent_count": 3
    },
    {
        "title": "1984",
        "isbn": "0-452-28423-6",
        "author": "George Orwell",
        "genre": "Dystopian",
        "copies": 450,
        "publish_year": "1949",
        "add_date": "2022-11-01",
        "rent_count": 5
    },
    {
        "title": "Pride and Prejudice",
        "isbn": "1-85326-000-2",
        "author": "Jane Austen",
        "genre": "Romance",
        "copies": 185,
        "publish_year": "1813",
        "add_date": "2021-07-20",
        "rent_count": 5
    },
    {
        "title": "Moby-Dick",
        "isbn": "0-14-243724-7",
        "author": "Herman Melville",
        "genre": "Adventure",
        "copies": 150,
        "publish_year": "1851",
        "add_date": "2022-09-10",
        "rent_count": 4
    },
    {
        "title": "The Catcher in the Rye",
        "isbn": "0-316-76948-7",
        "author": "J.D. Salinger",
        "genre": "Literary Fiction",
        "copies": 350,
        "publish_year": "1951",
        "add_date": "2023-03-05",
        "rent_count": 6
    },
    {
        "title": "Brave New World",
        "isbn": "0-06-085052-3",
        "author": "Aldous Huxley",
        "genre": "Dystopian",
        "copies": 395,
        "publish_year": "1932",
        "add_date": "2024-05-22",
        "rent_count": 3
    },
    {
        "title": "The Hobbit",
        "isbn": "0-618-00221-9",
        "author": "J.R.R. Tolkien",
        "genre": "Fantasy",
        "copies": 250,
        "publish_year": "1937",
        "add_date": "2022-12-15",
        "rent_count": 7
    },
    {
        "title": "Catch-22",
        "isbn": "0-684-83339-8",
        "author": "Joseph Heller",
        "genre": "Satire",
        "copies": 180,
        "publish_year": "1961",
        "add_date": "2023-11-25",
        "rent_count": 8
    },
    {
        "title": "Fahrenheit 451",
        "isbn": "0-345-34296-0",
        "author": "Ray Bradbury",
        "genre": "Science Fiction",
        "copies": 220,
        "publish_year": "1953",
        "add_date": "2022-08-30",
        "rent_count": 3
    },
    {
        "title": "The Alchemist",
        "isbn": "0-06-112241-6",
        "author": "Paulo Coelho",
        "genre": "Adventure",
        "copies": 320,
        "publish_year": "1988",
        "add_date": "2024-02-05",
        "rent_count": 4
    },
    {
        "title": "The Da Vinci Code",
        "isbn": "0-385-50420-9",
        "author": "Dan Brown",
        "genre": "Thriller",
        "copies": 300,
        "publish_year": "2003",
        "add_date": "2023-09-12",
        "rent_count": 6
    },
    {
        "title": "The Shining",
        "isbn": "0-385-12167-0",
        "author": "Stephen King",
        "genre": "Horror",
        "copies": 270,
        "publish_year": "1977",
        "add_date": "2024-03-19",
        "rent_count": 5
    },
    {
        "title": "The Catcher in the Rye",
        "isbn": "0-316-76948-7",
        "author": "J.D. Salinger",
        "genre": "Literary Fiction",
        "copies": 350,
        "publish_year": "1951",
        "add_date": "2023-03-05",
        "rent_count": 6
    },
    {
        "title": "Jane Eyre",
        "isbn": "0-14-144114-4",
        "author": "Charlotte Brontë",
        "genre": "Classic",
        "copies": 310,
        "publish_year": "1847",
        "add_date": "2023-01-20",
        "rent_count": 4
    },
    {
        "title": "Wuthering Heights",
        "isbn": "0-14-143955-6",
        "author": "Emily Brontë",
        "genre": "Classic",
        "copies": 280,
        "publish_year": "1847",
        "add_date": "2023-02-11",
        "rent_count": 4
    },
    {
        "title": "Animal Farm",
        "isbn": "0-452-28424-4",
        "author": "George Orwell",
        "genre": "Political Satire",
        "copies": 240,
        "publish_year": "1945",
        "add_date": "2022-06-30",
        "rent_count": 5
    },
    {
        "title": "The Road",
        "isbn": "0-307-26543-6",
        "author": "Cormac McCarthy",
        "genre": "Post-apocalyptic",
        "copies": 200,
        "publish_year": "2006",
        "add_date": "2023-10-14",
        "rent_count": 7
    },
    {
        "title": "Slaughterhouse-Five",
        "isbn": "0-385-31208-3",
        "author": "Kurt Vonnegut",
        "genre": "Science Fiction",
        "copies": 160,
        "publish_year": "1969",
        "add_date": "2023-04-22",
        "rent_count": 4
    },
    {
        "title": "Brave New World",
        "isbn": "0-06-085052-3",
        "author": "Aldous Huxley",
        "genre": "Dystopian",
        "copies": 395,
        "publish_year": "1932",
        "add_date": "2024-05-22",
        "rent_count": 3
    },
    {
        "title": "The Hunger Games",
        "isbn": "0-439-02352-1",
        "author": "Suzanne Collins",
        "genre": "Dystopian",
        "copies": 350,
        "publish_year": "2008",
        "add_date": "2023-07-15",
        "rent_count": 8
    },
    {
        "title": "Dune",
        "isbn": "0-441-17271-7",
        "author": "Frank Herbert",
        "genre": "Science Fiction",
        "copies": 290,
        "publish_year": "1965",
        "add_date": "2022-12-01",
        "rent_count": 6
    },
    {
        "title": "The Chronicles of Narnia",
        "isbn": "0-06-023481-0",
        "author": "C.S. Lewis",
        "genre": "Fantasy",
        "copies": 340,
        "publish_year": "1950",
        "add_date": "2023-02-25",
        "rent_count": 7
    },
    {
        "title": "Gone with the Wind",
        "isbn": "0-684-19039-7",
        "author": "Margaret Mitchell",
        "genre": "Historical Fiction",
        "copies": 260,
        "publish_year": "1936",
        "add_date": "2023-08-05",
        "rent_count": 4
    },
    {
        "title": "The Little Prince",
        "isbn": "0-15-601398-3",
        "author": "Antoine de Saint-Exupéry",
        "genre": "Children's Fiction",
        "copies": 330,
        "publish_year": "1943",
        "add_date": "2023-05-17",
        "rent_count": 5
    },
    {
        "title": "The Martian",
        "isbn": "0-55-341802-5",
        "author": "Andy Weir",
        "genre": "Science Fiction",
        "copies": 310,
        "publish_year": "2011",
        "add_date": "2024-04-10",
        "rent_count": 7
    },
    {
        "title": "The Handmaid's Tale",
        "isbn": "0-385-49369-8",
        "author": "Margaret Atwood",
        "genre": "Dystopian",
        "copies": 270,
        "publish_year": "1985",
        "add_date": "2023-09-01",
        "rent_count": 6
    },
    {
        "title": "Neuromancer",
        "isbn": "0-441-56959-5",
        "author": "William Gibson",
        "genre": "Cyberpunk",
        "copies": 240,
        "publish_year": "1984",
        "add_date": "2022-10-22",
        "rent_count": 4
    },
    {
        "title": "The Girl with the Dragon Tattoo",
        "isbn": "0-307-45454-1",
        "author": "Stieg Larsson",
        "genre": "Mystery",
        "copies": 310,
        "publish_year": "2005",
        "add_date": "2024-01-10",
        "rent_count": 6
    },
    {
        "title": "A Game of Thrones",
        "isbn": "0-553-10354-7",
        "author": "George R.R. Martin",
        "genre": "Fantasy",
        "copies": 280,
        "publish_year": "1996",
        "add_date": "2023-11-01",
        "rent_count": 7
    },
    {
        "title": "The Outsiders",
        "isbn": "0-14-240613-4",
        "author": "S.E. Hinton",
        "genre": "Young Adult",
        "copies": 250,
        "publish_year": "1967",
        "add_date": "2022-07-25",
        "rent_count": 5
    },
    {
        "title": "The Stand",
        "isbn": "0-385-31773-8",
        "author": "Stephen King",
        "genre": "Horror",
        "copies": 300,
        "publish_year": "1978",
        "add_date": "2023-08-30",
        "rent_count": 6
    },
    {
        "title": "The Kite Runner",
        "isbn": "1-59420-326-9",
        "author": "Khaled Hosseini",
        "genre": "Historical Fiction",
        "copies": 270,
        "publish_year": "2003",
        "add_date": "2023-06-20",
        "rent_count": 5
    }
];
localStorage.setItem('books', JSON.stringify(books));
}

document.getElementById("create-user-btn").addEventListener("click",create_user);

document.getElementById("user-login-btn").addEventListener("click", login_user);

document.getElementById("admin-login-btn").addEventListener("click", login_admin);
document.getElementById("change_pass_btn").onclick=changeadminpassword;


function validateadmin(username, password) {
let admin = JSON.parse(localStorage.getItem('admin'));
try {
  let a =admin.username;
} catch (error) {
  let admin={
    username:"admin",
    password:"admin"
}
localStorage.setItem('admin', JSON.stringify(admin));
}
admin = JSON.parse(localStorage.getItem('admin'));
let adminusername = admin.username;
let adminpassword=admin.password;

  if (username == adminusername && password == adminpassword) {
    if (adminusername=="admin" && adminpassword=="admin") {
      return "default";
    }
    return "success";
  }
  if (username == adminusername) {

    if (password != adminpassword) {
      return "worngpass";
    }
  }
  else {
    return "No_Admin_Account_Found";
  }
}
function validateuser(user_id, user_password) {
  const users = JSON.parse(localStorage.getItem('Users'));
  let userIndex = users.findIndex(user => user.NICnumber == user_id);

  if (userIndex != -1) {
    if (users[userIndex].password == user_password) {
      console.log(users[userIndex].password);
      return "success"
    } else {
      return "! worngpassword"
    }
  }
  else {
    return "! No_user_found"
  }
}
function login_admin(event) {
  event.preventDefault();
  let username = document.getElementById("admin-username").value;
  let password = document.getElementById("admin-password").value;
let staus = validateadmin(username, password);
  if (staus == "default") {
    document.getElementById("admin-login-div").style.display = "none";
    document.getElementById("user-login-div").style.display = "none";
    document.getElementById("user-creation-div").style.display = "none";
    document.getElementById("admin_change_password").style.display = "block";
  }
  else if (staus == "success") {
    window.location.replace('admin.html');
  }
  else{
    window.alert("! username or password invalid");
    document.getElementById("admin-login-form").reset();
  }
}


function changeadminpassword() {
  let form = document.getElementById("admin_password_change");
  let admin = JSON.parse(localStorage.getItem('admin'));
  admin.username = form.username.value;
  admin.password =form.adminpassword.value;
  localStorage.setItem('admin', JSON.stringify(admin));
  document.getElementById("admin-login-div").style.display = "flex";
  document.getElementById("user-login-div").style.display = "none";
  document.getElementById("user-creation-div").style.display = "none";
  document.getElementById("admin_change_password").style.display = "none";

}
function login_user(event) {
  event.preventDefault();
  let uID = document.getElementById("userID").value;
  let uPass = document.getElementById("user-password").value;

let staus = validateuser(uID, uPass);
  if ( staus == "success" ) {
    let finduser = users.find(u => u.NICnumber == uID);
    let luser= {
      nic:uID,
      username:finduser.username
    }
    savecurentloginuserlocal(luser);
    window.location.replace('user.html');
    
  }
  else{
    window.alert("! username or password invalid");
    document.getElementById("user-login-form").reset();
}
}
function create_user(event) {
  event.preventDefault();
  let firstName = document.getElementById("firstname").value;
  let lastName = document.getElementById("lastname").value;
  let NIC = document.getElementById("userNIC").value;
  let pnumber = document.getElementById("phonenumber").value;
  let email =document.getElementById("emailadd").value;
  let newPassword = document.getElementById("newpassword").value;
  let password = document.getElementById("Conformpassword").value;
  let nowDate = new Date();
 
  const user = {
    firstname :firstName,
    lastname:lastName,
    username: firstName+" "+lastName,
    NICnumber: NIC,
    phonenember:pnumber,
    email:email,
    password: newPassword,
    joindate :  nowDate.toDateString(),
    rentcount : 0
  }
  if (newPassword == password) {
    users.push(user);
    saveuserlocal();
    document.getElementById("user-creation-form").reset();
  }
 else{
 window.alert("! password not match");
 document.getElementById("newpassword").value="";
 document.getElementById("Conformpassword").value="";
 }
}




function saveuserlocal() {
  localStorage.setItem('Users', JSON.stringify(users));
}
function savecurentloginuserlocal(udata) {
  localStorage.setItem('loginuser',JSON.stringify(udata));
}

function readuserlocal() {
   users = [];
  let olddata =  JSON.parse(localStorage.getItem('Users')) || [];
  olddata.forEach(data => {
    users.push(data);
  });
}
