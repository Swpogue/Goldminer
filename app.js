let gold = 0;
let shovel = 0;
let pickaxe = 0;
let backhoe = 0;
let bigBertha = 0;
let clickMultiplier = 1;
let autoMultiplier = 0;

let clickUpgrades = [
  {
    name: 'Shovel',
    price: 100,
    quantity: 0,
    multiplier: 1,
  },

  {
    name: 'Pickaxe',
    price: 300,
    quantity: 0,
    multiplier: 5,
  },

  {
    name: 'Jack Hammer',
    price: 1200,
    quantity: 0,
    multiplier: 25,
},

];

let automaticUpgrades = [
  {
    name: 'Backhoe',
    price: 1000,
    quantity: 0,
    multiplier: 20,
  },

  {
    name: 'Big Bertha',
    price: 3500,
    quantity: 0,
    multiplier: 50,
   
  },
  {
    name: 'Plasma Drill',
    price: 10000,
    quantity: 0,
    multiplier: 100,
   
  }
];

function drawGold() {
  let goldElem = document.getElementById("gold-coin")
  goldElem.innerText = gold.toString()
  console.log('gold working');
}

function mine() {
  gold += 10000 * clickMultiplier
  console.log("gold", gold)
  drawGold()
}

function drawClickAmount() {
  let clickAmount = clickUpgrades.find(c => c.multiplier)
  if (clickAmount.quantity >= 1) {
    clickMultiplier == clickAmount.quantity * clickAmount.multiplier
  }
  let clickElem = document.getElementById('gpc')
  clickElem.innerText = clickMultiplier.toString()
}
drawClickAmount()

function drawAutoGps() {
  let autoGps = automaticUpgrades.find(a => a.multiplier)
  if (autoGps.quantity >= 1) {
    autoMultiplier == autoGps.quantity * autoGps.multiplier
  }
  let autoElem = document.getElementById('gps')
  autoElem.innerText = autoMultiplier.toString()
}
drawAutoGps()

function drawEquipment(reg) {
  // create a variable that is going to store the HTML from our loop (lat template...)
  // we need to add to our template - so loop over your array and add a single object to your template and the HTML
  let template = ''
  clickUpgrades.forEach(u => {
    template +=
      `<div class="p-4 my-1 border border-warning rounded">
      <h5 class="text-primary">${u.name}</h5>
      <p>Price: ${u.price}</p>
      <p>Quantity: ${u.quantity}</p>
      <p>Gold Per Click Each: ${u.multiplier}</p>
      <button onclick="buyUpgrade('${u.name}')" id="${u.name}">Buy x1</button>
    </div>`
    // put it on the HTML document 

    // let axeElem = document.getElementById("pickaxe")
    // axeElem.innerText = quantity.toString()
    // console.log("pick q up");
  })
  document.getElementById('EquipUpgrade').innerHTML = template

}
drawEquipment()

function drawAutoEquip(auto) {
  let template = ''
  automaticUpgrades.forEach(a => {
    template +=
    `<div class="p-4 my-1 border border-warning rounded">
    <h5 class="text-primary">${a.name}</h5>
    <p>Price: ${a.price}</p>
    <p>Quantity: ${a.quantity}</p>
    <p>Gold per Second: ${a.multiplier}</p>
    <button onclick="buyAuto('${a.name}')" id="${a.purchasable}Button">Buy x1</button>
    </div>`
    document.getElementById('AutoUpgrades').innerHTML = template
    
    // TODO Ask how this would work
    //  if (gold < a.price) {
    //   document.getElementById(`${a.name}Button`).disabled = true;
    //   }
    })
  }
drawAutoEquip()

// Find each 
function buyUpgrade(upgradeName) {
  // MY FIRST TRY.. 
  // clickUpgrades.forEach(upgrade => {
  // if (gold >= upgrade.price && upgrade.name == 'shovel') {
  //   upgrade.quantity++;
  //   gold -= upgrade.price;
  //   console.log("Success")

  // } else {
  //   alert("You don't have enough Gold!")
  //   console.log("failed");
  // }
  // }) HELPED BY MILES --v
  let foundUpgrade = clickUpgrades.find(u => u.name == upgradeName)
  if (gold >= foundUpgrade.price) {
    foundUpgrade.quantity++;
    gold -= foundUpgrade.price;
    foundUpgrade.price = Math.round(foundUpgrade.price * 1.1);
    clickMultiplier += foundUpgrade.multiplier;
    console.log("Upgrade Success")
    console.log('FOUND UPGRADE', foundUpgrade);
    console.log('Upgrade Name:', upgradeName);
    drawGold()
    drawEquipment()
    drawClickAmount()

  } else {
    window.alert("You don't have enough Gold!")
    console.log("failed");
    console.log(foundUpgrade);
    drawGold()
    drawEquipment()
  }
}

// Auto upgrades 
function buyAuto(autoUpgrade) {
  let foundUpgrade = automaticUpgrades.find(u => u.name == autoUpgrade);
  if (gold >= foundUpgrade.price) {
    foundUpgrade.quantity++;
    gold -= foundUpgrade.price;
    foundUpgrade.price = Math.round(foundUpgrade.price * 1.1);
    autoMultiplier += foundUpgrade.multiplier
    console.log(foundUpgrade);
    drawGold();
    drawAutoEquip()
    drawAutoGps()
  } else {
    alert("You don't have enough Gold!")
    console.log(foundUpgrade);
    drawGold()
  }
  
}

function startAutoMining() {
  setInterval(() => {
    automaticUpgrades.forEach(a => {
      gold += a.quantity * a.multiplier
    });
    drawAutoGps()
    drawGold()
  }, 1000);
  console.log("Interval");
}

startAutoMining();