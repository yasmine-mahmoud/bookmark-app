var sitename = document.getElementById("SName");
var url = document.getElementById("SUrl");
var urlsearch = document.getElementById("PSearch");
var alertName = document.getElementById("alertName");
var alerturl = document.getElementById("alerturl");
var btnAdd = document.getElementById("submitBtn");
var btnUpdate = document.getElementById("btnUpdate");
var modal = document.getElementById("modaldisplay");
var visit = document.getElementById("visit");
var closeElement = document.getElementById("closeelement");

var lastindex;
var table = [];
if (localStorage.getItem("DataList") != null) {
	table = JSON.parse(localStorage.getItem("DataList"));
	display();
}

function submit() {
	console.log("helllo1");
	if (validName() == true && validUrl() == true) {
		console.log("helllo2");
		var content = {
			name: sitename.value,
			url: url.value,
		};
		table.push(content);
		localStorage.setItem("DataList", JSON.stringify(table));
		clear();
		display();
	} else if (validName() == false || validUrl() == false) {
	modal.classList.replace("d-none","d-flex")
	closeElement.addEventListener("click", closeModal);
	}
}
function clear(){
    sitename.value = null;
    url.value = null;
}

	function closeModal() {
		modal.classList.replace("d-flex", "d-none");
	}
function display() {
	var temp = " ";
	for (var i = 0; i < table.length; i++) {
		temp +=
			` 
    <tr>
      <th scope="row">` +
			[i+1] +
			`</th>
      <td>` +
			table[i].name +
			`</td>
      <td><a type="button" class="btnnn btn-outline-danger mb-4"  id="visit"  href="${table[i].url}" target="_blank"> <i class="fa-solid fa-eye" style="color: #ffffff;">
			</i>
	Visit</a></td>
 <td><a type="button" class="btnn btn-outline-danger mb-4" id="remove "onclick="remove(${i})" ><i class="fa-solid fa-trash-can" style="color: #ffffff;">

 </i>
	Delete</a></td>
		 <td><a type="button" class="btnnnn btn-outline-warning mb-4" onclick="setformtoupdate(${i})" id="update" >
	Update</a></td>
    </tr>

`;
	}
	document.getElementById("myrow").innerHTML = temp;
}
function remove(index) {
	table.splice(index, 1);
	localStorage.setItem("DataList", JSON.stringify(table));
	display();
}


function search() {
	var searchvalue = urlsearch.value.toLowerCase();
	var temp = " ";
	for (var i = 0; i < table.length; i++) {
		if (table[i].name.toLowerCase().includes(searchvalue) == true || table[i].url.toLowerCase().includes(searchvalue) == true) {
			temp +=
				` 
    <tr>
      <th scope="row">` +
				[i] +
				`</th>
      <td>` +
				table[i].name +
				`</td>
      <td><a type="button" class="btnnn btn-outline-danger mb-4 " id="visit" > <i class="fa-solid fa-eye" style="color: #ffffff;">
			</i>
	Visit</a></td>
 <td><a type="button" class="btnn btn-outline-danger mb-4" id="remove"onclick="remove(${i})" ><i class="fa-solid fa-trash-can" style="color: #ffffff;">

 </i>
	Delete</a></td>
				 <td><a type="button" class="btnnnn btn-outline-warning mb-4" onclick="setformtoupdate(${i})" id="update" >
	Update</a></td>
    </tr>
   
`;
		}
	}
	document.getElementById("myrow").innerHTML = temp;
}


function setformtoupdate(index) {
	lastindex = index;
	sitename.value = table[index].name;
	url.value = table[index].url;
	console.log(lastindex);
	btnAdd.classList.add("d-none");
	btnUpdate.classList.remove("d-none");
}
function updatee() {
	table[lastindex].name = sitename.value;
	table[lastindex].url = url.value;

	localStorage.setItem("DataList", JSON.stringify(table));
	display();
	btnUpdate.classList.add("d-none");
	btnAdd.classList.remove("d-none");
}

function validName() {
	var NameRegex = /^[A-Za-z]{3,}[0-9]{0,6}$/;

	if (NameRegex.test(sitename.value) == true) {
		// tmam
		alertName.classList.add("d-none");
		sitename.classList.add("is-valid");
		sitename.classList.remove("is-invalid");
		return true;
	} else {
		alertName.classList.remove("d-none");
		sitename.classList.add("is-invalid");
		sitename.classList.remove("is-valid");
		return false;
	}
}
function validUrl() {
	var regexUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
	if (regexUrl.test(url.value) == true) {
		// tmam
		alerturl.classList.add("d-none");
		url.classList.add("is-valid");
		url.classList.remove("is-invalid");
		return true;
	} else {
		alerturl.classList.remove("d-none");
		url.classList.add("is-invalid");
		url.classList.remove("is-valid");
		return false;
	}
}



sitename.addEventListener("change", validName);
url.addEventListener("change", validUrl);
