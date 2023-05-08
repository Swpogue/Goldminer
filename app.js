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
loadAutoMultiplier()
loadGold()
// clickUpgrades.push(clickUpgrades)
// saveUpgrades()
// drawEquipment()
// loadUpgrades()
function saveGold() {
  window.localStorage.setItem('gold', JSON.stringify(gold))
  drawGold()
}

function loadGold() {
  let goldData = JSON.parse(window.localStorage.getItem('gold'))
  if (goldData) {
    gold = goldData
  }
  drawGold()
}

function saveUpgrades() {
  window.localStorage.setItem('clickUpgrades', JSON.stringify(clickUpgrades))
  drawEquipment()
}
function loadUpgrades() {
  let upgradeData = JSON.parse(window.localStorage.getItem('clickUpgrades'))
  if (upgradeData) {
    clickUpgrades = upgradeData
  }
  drawEquipment()
}

function saveClickMultiplier() {
  window.localStorage.setItem('clickMultiplier', JSON.stringify(clickMultiplier))
  drawEquipment()
}

function loadClickMultiplier() {
  drawClickAmount()
  let clickData = JSON.parse(window.localStorage.getItem('clickMultiplier'))
  if (clickData) {
    clickMultiplier = clickData
  }
  drawClickAmount()
  drawEquipment()
}

function saveAutoUpgrades() {
  window.localStorage.setItem('automaticUpgrades', JSON.stringify(automaticUpgrades))
  drawAutoEquip()
}
function loadAutoUpgrades() {
  let upgradeAutoData = JSON.parse(window.localStorage.getItem('automaticUpgrades'))
  if (upgradeAutoData) {
    automaticUpgrades = upgradeAutoData
  }
  drawAutoEquip()
}
loadAutoUpgrades()

function saveAutoMultiplier() {
  window.localStorage.setItem('autoMultiplier', JSON.stringify(autoMultiplier))
  drawAutoEquip()
}

function loadAutoMultiplier() {
  drawAutoGps()
  let autoData = JSON.parse(window.localStorage.getItem('autoMultiplier'))
  if (autoData) {
    autoMultiplier = autoData
  }
  drawAutoGps()
  drawAutoEquip()
}

function drawGold() {
  let goldElem = document.getElementById("gold-coin")
  goldElem.innerText = gold.toString()

  // console.log('gold working');
}

function mine() {
  gold +=   clickMultiplier
  console.log("gold", gold)
  drawGold()
  saveGold()
  drawAutoEquip()
  drawEquipment()
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

function drawEquipment(Upgrades) {
  // sudo from Savannah --v
  // create a variable that is going to store the HTML from our loop (lat template...)
  // we need to add to our template - so loop over your array and add a single object to your template and the HTML
  let template = ''
  clickUpgrades.forEach(u => {
    let disabledAttr = gold < u.price ? 'disabled=disabled' : '';

    template +=
      `<div class="p-2 my-1 border border-warning rounded">
      <h5 class="text-primary">${u.name}</h5>
      <p>Price: ${u.price}</p>
      <p>Quantity: ${u.quantity}</p>
      <p>Gold Per Click Each: ${u.multiplier}</p>
      <button ${disabledAttr} onclick="buyUpgrade('${u.name}')" id="${u.name}">Buy x1</button>
    </div>`
    // put it on the HTML document 

    // Failed attempt --v  I was trying to draw 1 object instead of All with template.
    // let axeElem = document.getElementById("pickaxe")
    // axeElem.innerText = quantity.toString()
    // console.log("pickaxe quantity up");
  })

  document.getElementById('EquipUpgrade').innerHTML = template
}
drawEquipment()

function drawAutoEquip(auto) {
  
  let template = ''
  automaticUpgrades.forEach(a => {
    let disabledAttr = gold < a.price ? 'disabled=disabled' : '';
    template +=
      `<div class="p-2 my-1 border border-warning rounded">
    <h5 class="text-primary">${a.name}</h5>
    <p>Price: ${a.price}</p>
    <p>Quantity: ${a.quantity}</p>
    <p>Gold per Second: ${a.multiplier}</p>
    <button ${disabledAttr} onclick="buyAuto('${a.name}')" id="${a.name}Button">Buy x1</button>
    </div>`
    
    
    })
    document.getElementById('AutoUpgrades').innerHTML = template
}
drawAutoEquip()

// Find each and add quantity and multiplier subtract Gold per price
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
  // }) HELPED BY MILES --v with 1 line. Was able to do the rest with this.
  // let foundUpgrade = clickUpgrades.find(u => u.name == upgradeName)
  let foundUpgrade = clickUpgrades.find(u => u.name == upgradeName)
  if (gold >= foundUpgrade.price) {
    foundUpgrade.quantity++;
    gold -= foundUpgrade.price;
    foundUpgrade.price = Math.round(foundUpgrade.price * 1.1);
    clickMultiplier += foundUpgrade.multiplier;
    console.log('UPGRADE SUCCESS', foundUpgrade);
    drawGold()
    drawEquipment()
    drawClickAmount()
    saveClickMultiplier()
    saveUpgrades()
    saveGold()

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
    console.log("AUTO UPGRADE SUCCESS", foundUpgrade);
    drawGold();
    drawAutoEquip()
    drawAutoGps()
    saveAutoMultiplier()
    saveAutoUpgrades()
    saveGold()
  } else {
    alert("You don't have enough Gold!")
    console.log(foundUpgrade);
    drawAutoEquip()
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
    saveGold()
  }, 1000);
  
  console.log("Interval");
}

function resetGame() {
  // alert('Are You Sure you want to Reset Game?')
  gold = 0
  localStorage.clear();
  window.location.reload();
  console.log('EUREKA');

}

loadGold()
loadAutoUpgrades()
loadUpgrades()
loadClickMultiplier()
saveAutoMultiplier()
saveAutoUpgrades()
saveGold()
saveUpgrades()
saveClickMultiplier()
startAutoMining();