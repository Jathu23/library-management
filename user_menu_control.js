document.getElementById("dashboard").addEventListener("click",function(){
document.getElementById("dass-items-div").style.display="flex";
document.getElementById("browed-books-div").style.display="none";
document.getElementById("view-books-div").style.display="none";
document.getElementById("requst-div").style.display="none";
document.getElementById("user-history-div").style.display="none";
document.getElementById("notifcations-div").style.display="none";
});
document.getElementById("browed-book").addEventListener("click",function(){
    document.getElementById("dass-items-div").style.display="none";
    document.getElementById("browed-books-div").style.display="block";
    document.getElementById("view-books-div").style.display="none";
    document.getElementById("requst-div").style.display="none";
    document.getElementById("user-history-div").style.display="none";
    document.getElementById("notifcations-div").style.display="none";
});
document.getElementById("view-book").addEventListener("click",function(){
    document.getElementById("dass-items-div").style.display="none";
    document.getElementById("browed-books-div").style.display="none";
    document.getElementById("view-books-div").style.display="block";
    document.getElementById("requst-div").style.display="none";
    document.getElementById("user-history-div").style.display="none";
    document.getElementById("notifcations-div").style.display="none";
});
document.getElementById("Requst").addEventListener("click",function(){
    document.getElementById("dass-items-div").style.display="none";
    document.getElementById("browed-books-div").style.display="none";
    document.getElementById("view-books-div").style.display="none";
    document.getElementById("requst-div").style.display="block";
    document.getElementById("user-history-div").style.display="none";
    document.getElementById("notifcations-div").style.display="none";
});
document.getElementById("History").addEventListener("click",function(){
    document.getElementById("dass-items-div").style.display="none";
    document.getElementById("browed-books-div").style.display="none";
    document.getElementById("view-books-div").style.display="none";
    document.getElementById("requst-div").style.display="none";
    document.getElementById("user-history-div").style.display="block";
    document.getElementById("notifcations-div").style.display="none";
});
document.getElementById("notifcations").addEventListener("click",function(){
    document.getElementById("dass-items-div").style.display="none";
    document.getElementById("browed-books-div").style.display="none";
    document.getElementById("view-books-div").style.display="none";
    document.getElementById("requst-div").style.display="none";
    document.getElementById("user-history-div").style.display="none";
    document.getElementById("notifcations-div").style.display="block";
});

document.getElementById("log-out").addEventListener('click', function(event) {
    event.preventDefault();
    window.location.replace('index.html');
  });