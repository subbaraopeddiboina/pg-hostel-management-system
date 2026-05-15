// script.js

const memberForm =
document.getElementById("memberForm");

const floorsContainer =
document.getElementById("floorsContainer");

const alertsContainer =
document.getElementById("alertsContainer");

const occupiedBeds =
document.getElementById("occupiedBeds");

let members =
JSON.parse(localStorage.getItem("members"))
|| [];

memberForm.addEventListener(
  "submit",
  function(e){

    e.preventDefault();

    const name =
    document.getElementById("name").value;

    const phone =
    document.getElementById("phone").value;

    const floor =
    document.getElementById("floor").value;

    const room =
    document.getElementById("room").value;

    const bed =
    document.getElementById("bed").value;

    const rent =
    document.getElementById("rent").value;

    const dueDate =
    document.getElementById("dueDate").value;

    const member = {
      id: Date.now(),
      name,
      phone,
      floor,
      room,
      bed,
      rent,
      dueDate
    };

    members.push(member);

    saveToLocalStorage();

    displayFloors();

    displayAlerts();

    memberForm.reset();

});

function displayFloors(){

  floorsContainer.innerHTML = "";

  for(let floor = 1; floor <= 5; floor++){

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

    for(let room = 1; room <= 5; room++){

      const roomCard =
      document.createElement("div");

      roomCard.classList.add("room-card");

      roomCard.innerHTML = `
        <h3>
          Room ${room}
        </h3>
      `;

      const bedsDiv =
      document.createElement("div");

      bedsDiv.classList.add("beds");

      for(let bed = 1; bed <= 5; bed++){

        const bedDiv =
        document.createElement("div");

        const memberExists =
        members.find(
          (member)=>
          Number(member.floor) === floor &&
          Number(member.room) === room &&
          Number(member.bed) === bed
        );

        if(memberExists){

          bedDiv.classList.add(
            "bed",
            "occupied"
          );

          bedDiv.innerHTML = `
            Bed ${bed}
            <br>
            ${memberExists.name}
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

        }

        bedsDiv.appendChild(bedDiv);

      }

      roomCard.appendChild(bedsDiv);

      roomsGrid.appendChild(roomCard);

    }

    floorDiv.appendChild(roomsGrid);

    floorsContainer.appendChild(floorDiv);

  }

  occupiedBeds.textContent =
  members.length;

}

function displayAlerts(){

  alertsContainer.innerHTML = "";

  const today = new Date();

  members.forEach((member)=>{

    const due =
    new Date(member.dueDate);

    const diffTime =
    due - today;

    const diffDays =
    Math.ceil(
      diffTime /
      (1000 * 60 * 60 * 24)
    );

    if(diffDays <= 5 && diffDays >= 0){

      const alertDiv =
      document.createElement("div");

      alertDiv.classList.add("alert-box");

      alertDiv.innerHTML = `
        <strong>
          ${member.name}
        </strong>

        payment due in
        ${diffDays} days

        <br>

        Floor:
        ${member.floor}

        Room:
        ${member.room}

        Bed:
        ${member.bed}
      `;

      alertsContainer.appendChild(alertDiv);

    }

  });

}

function saveToLocalStorage(){

  localStorage.setItem(
    "members",
    JSON.stringify(members)
  );

}

displayFloors();

displayAlerts();