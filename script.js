"use strict";

const btn = document.querySelector(".btn");
const id = document.querySelector(".id");
const name = document.querySelector(".name");
const branch = document.querySelector(".branch");

const container2 = document.querySelector(".container2");
const input = document.querySelectorAll("input");
const set = document.querySelector(".set");

const modal=document.querySelector('.modal')
const Mbtn = document.querySelector(".modal_btn");
const Mid = document.querySelector(".modal_id");
const Mname = document.querySelector(".modal_name");
const Mbranch = document.querySelector(".modal_branch");

const container = document.querySelector(".container");

//EventListners
document.addEventListener("DOMContentLoaded", afterLoad);
btn.addEventListener('click',details);



function details() {
  const div = document.createElement("div");
  div.classList.add("taby");
  div.setAttribute('data-id',id.value);

  const div1 = document.createElement("div");
  div1.innerHTML = id.value;
  const div2 = document.createElement("div");
  div2.innerHTML = name.value;

  const div3 = document.createElement("div");
  div3.innerHTML = branch.value;

  const div4 = document.createElement("div");
  div4.classList.add('cross');
  div4.innerHTML=' <i class="fa-solid fa-square-xmark"></i>';
  
  const div5 = document.createElement("div");
  const edit=document.createElement("button");
  edit.classList.add('edit');
  div5.appendChild(edit);
  edit.innerHTML="Edit";

  div.append(div1);
  div.append(div2);
  div.append(div3);
  div.append(div4);
  div.append(div5);

  container2.append(div);
  saveLocal(id.value, name.value, branch.value);
  input.forEach((n) => {
    n.value = "";
  });
  del(div4)
  editing(div5)
};

function saveLocal(id, name, branch) {
  let dict = JSON.parse(localStorage.getItem("dict")) || [];

  const details = {
    id: id,
    name: name,
    branch: branch,
  };
  dict.push(details);
  localStorage.setItem("dict", JSON.stringify(dict));
}

function del(cross){
    cross.addEventListener('click',function(e){
        // console.log(e.target.closest('.taby'));
        let i=e.target.closest('.taby');
        i.remove();
        removeLocal(i.getAttribute('data-id'));
    })
}

function removeLocal(id){
  let dict = JSON.parse(localStorage.getItem("dict")) || [];
 dict.map(item=>{
     if(item.id===id){
         dict.splice(dict.indexOf(item),1)
        }
      localStorage.setItem("dict",JSON.stringify(dict));

 })
}
function afterLoad(){
  let dict = JSON.parse(localStorage.getItem("dict")) || [];
dict.forEach(item=>{
    const div = document.createElement("div");
  div.classList.add("taby");
  div.setAttribute('data-id',item.id);


  const div1 = document.createElement("div");
  div1.innerHTML = item.id;
  const div2 = document.createElement("div");
  div2.innerHTML = item.name;

  const div3 = document.createElement("div");
  div3.innerHTML = item.branch;

  const div4 = document.createElement("div");
  div4.innerHTML=' <i class="fa-solid fa-square-xmark"></i>';
  div4.classList.add('cross');
 
  const div5 = document.createElement("div");
  const edit=document.createElement("button");
  edit.classList.add('edit');
  div5.appendChild(edit);
  edit.innerHTML="Edit";

  div.append(div1);
  div.append(div2);
  div.append(div3);
  div.append(div4);
  div.append(div5);


  set.append(div);
del(div4)
editing(div5)
// console.log(set.childNodes)
// set.childNodes.forEach(n=>{
//   // console.log(n);
//   editing(n)
// })
})
}

function editing(edit){
  // console.log(edit.closest('.taby'));
  edit.addEventListener('click',function(e){
// console.log(e.target.closest('.taby'));
let row=e.target.closest('.taby');
// console.log(row.getAttribute('data-id'));
const over=document.createElement('div');
over.classList.add('overlay');
const scrollTop=`${window.pageYOffset}px`
over.style.top=scrollTop;
container.appendChild(over)
modal.style.display="block";

console.log(over);
// console.log("hi");
Mbtn.addEventListener('click',function(e){
  modal.style.display='none';
  over.classList.remove('overlay');

  // row.classList.append('overlay')
  const div = document.createElement("div");
  div.classList.add("taby");
  div.setAttribute('data-id',Mid.value);

  const div1 = document.createElement("div");
  div1.innerHTML = Mid.value;
  const div2 = document.createElement("div");
  div2.innerHTML = Mname.value;

  const div3 = document.createElement("div");
  div3.innerHTML = Mbranch.value;

  const div4 = document.createElement("div");
  div4.classList.add('cross');
  div4.innerHTML=' <i class="fa-solid fa-square-xmark"></i>';
  
  const div5 = document.createElement("div");
  const edit=document.createElement("button");
  edit.classList.add('edit');
  div5.appendChild(edit);
  edit.innerHTML="Edit";

  div.append(div1);
  div.append(div2);
  div.append(div3);
  div.append(div4);
  div.append(div5);
  console.log(row.parentNode);
  if(row.parentNode){
const html=div.outerHTML;
row.insertAdjacentHTML('afterend',html);
row.outerHTML='';
  
  console.log("kkh");
  saveEdit(Mid.value, Mname.value, Mbranch.value,row.getAttribute('data-id'));
  removeLocal(row.getAttribute('data-id'))
 
  input.forEach((n) => {
    n.value = "";
  });
  del(div4)
editing(div5)
  }
editing(div5)
console.log("mm");
})
  })
}

function saveEdit(id, name, branch,prevId) {
  let dict = JSON.parse(localStorage.getItem("dict")) || [];
//  console.log(dict);
 let i;
 dict.map(item=>{
   if(item.id===prevId){
     i=dict.indexOf(item);
   }
 })
  const details = {
    id: id,
    name: name,
    branch: branch,
  };
  dict.splice(i, 0, details)
  localStorage.setItem("dict", JSON.stringify(dict));
}