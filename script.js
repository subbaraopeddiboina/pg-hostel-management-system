// script.js

const memberForm =
document.getElementById("memberForm");

const floorsContainer =
document.getElementById("floorsContainer");

const occupiedBeds =
document.getElementById("occupiedBeds");

const alertsContainer =
document.getElementById("alertsContainer");

let members =
JSON.parse(localStorage.getItem("members"))
|| [];

let selectedRoom = "";
let selectedBed = "";

displayFloors();

displayAlerts();

memberForm.addEventListener(
  "submit",
  function(e){

    e.preventDefault();

    const name =
    document.getElementById("name").value;

    const aadhaar =
    document.getElementById("aadhaar").value;

    const phone =
    document.getElementById("phone").value;

    const address =
    document.getElementById("address").value;

    const rent =
    document.getElementById("rent").value;

    const dueDate =
    document.getElementById("dueDate").value;

    if(
      selectedRoom === "" ||
      selectedBed === ""
    ){

      alert("Select Bed First");

      return;
    }

    const member = {

      id:Date.now(),

      name,
      aadhaar,
      phone,
      address,

      room:selectedRoom,
      bed:selectedBed,

      rent,
      dueDate

    };

    members.push(member);

    localStorage.setItem(
      "members",
      JSON.stringify(members)
    );

    memberForm.reset();

    selectedRoom = "";
    selectedBed = "";

    displayFloors();

    displayAlerts();

  }
);

function displayFloors(){

  floorsContainer.innerHTML = "";

  occupiedBeds.textContent =
  members.length;

  for(let floor=1; floor<=5; floor++){

    const floorDiv =
    document.createElement("div");

    floorDiv.classList.add("floor");

    floorDiv.innerHTML = `
      <h2 class="floor-title">
        Floor ${floor}
      </h2>
    `;

    const roomsGrid =
    document.createElement("div");

    roomsGrid.classList.add("rooms-grid");

    for(let room=1; room<=4; room++){

      const roomNumber =
      `${floor}0${room}`;

      const roomCard =
      document.createElement("div");

      roomCard.classList.add("room-card");

      roomCard.innerHTML = `
        <h3>
          Room ${roomNumber}
        </h3>
      `;

      const bedsDiv =
      document.createElement("div");

      bedsDiv.classList.add("beds");

      for(let bed=1; bed<=5; bed++){

        const bedDiv =
        document.createElement("div");

        const existingMember =
        members.find(
          member =>

          member.room == roomNumber &&
          member.bed == bed
        );

        if(existingMember){

          bedDiv.classList.add(
            "bed",
            "occupied"
          );

          bedDiv.innerHTML = `

            <div>
              Bed ${bed}
            </div>

            <div>
              ${existingMember.name}
            </div>

            <button
              class="remove-btn"
              onclick="removeMember(${existingMember.id})"
            >
              Remove
            </button>

          `;

        }else{

          bedDiv.classList.add(
            "bed",
            "available"
          );

          bedDiv.innerHTML = `

            Bed ${bed}

            <br>

            Available

          `;

          bedDiv.addEventListener(
            "click",
            function(){

              selectedRoom =
              roomNumber;

              selectedBed =
              bed;

              document.getElementById(
                "roomNumber"
              ).value = roomNumber;

              document.getElementById(
                "bedNumber"
              ).value = bed;

            }
          );

        }

        bedsDiv.appendChild(bedDiv);

      }

      roomCard.appendChild(bedsDiv);

      roomsGrid.appendChild(roomCard);

    }

    floorDiv.appendChild(roomsGrid);

    floorsContainer.appendChild(floorDiv);

  }

}

function removeMember(id){

  members =
  members.filter(
    member => member.id !== id
  );

  localStorage.setItem(
    "members",
    JSON.stringify(members)
  );

  displayFloors();

  displayAlerts();

}

function displayAlerts(){

  alertsContainer.innerHTML = "";

  const today =
  new Date();

  members.forEach(member => {

    const dateParts =
    member.dueDate.split("/");

    const dueDate =
    new Date(
      dateParts[2],
      dateParts[1]-1,
      dateParts[0]
    );

    const diffTime =
    dueDate - today;

    const diffDays =
    Math.ceil(
      diffTime /
      (1000*60*60*24)
    );

    if(
      diffDays <= 5 &&
      diffDays >= 0
    ){

      const alertDiv =
      document.createElement("div");

      alertDiv.classList.add(
        "alert-box"
      );

      alertDiv.innerHTML = `

        ${member.name}

        payment due in

        ${diffDays} days

        <br><br>

        Room :
        ${member.room}

        <br>

        Bed :
        ${member.bed}

      `;

      alertsContainer.appendChild(
        alertDiv
      );

    }

  });

}

document
.getElementById("phone")
.addEventListener(
  "input",
  function(){

    this.value =
    this.value.replace(/\D/g,'');

  }
);

document
.getElementById("aadhaar")
.addEventListener(
  "input",
  function(){

    this.value =
    this.value.replace(/\D/g,'');

  }
);

document
.getElementById("name")
.addEventListener(
  "input",
  function(){

    this.value =
    this.value.replace(/[0-9]/g,'');

  }
);

document
.getElementById("dueDate")
.addEventListener(
  "input",
  function(e){

    let value =
    e.target.value.replace(/\D/g,'');

    if(value.length > 2){

      value =
      value.substring(0,2)
      + "/"
      + value.substring(2);

    }

    if(value.length > 5){

      value =
      value.substring(0,5)
      + "/"
      + value.substring(5,9);

    }

    e.target.value = value;

  }
);
