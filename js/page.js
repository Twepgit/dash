'use strict'

function htmlSide(url, icon, name) {
  let htmlStr = `
    <li class="p-2 rounded-1">
      <a href="${url}" class="text-decoration-none text-reset d-flex align-items-center neontext">
        <span class="fs-5"><i class="bi bi-${icon}"></i></span>
        <span class="ms-3">${name}</span>
      </a>
    </li>
  `;

  return htmlStr;
}
function htmlSocials(url, icon) {
  let htmlStr = `
    <a href="${url}" class="text-decoration-none text-reset fs-5 social-icon-hover m-2">
      <i class="bi bi-${icon}"></i>
    </a>
  `;

  return htmlStr;
}

function displaySidebar() {
  let htmlStr = `
    <div class="logo">
      <a href="https://twepv2.com"><img src="images/Logo.svg" alt="TWEP-Logo" /></a>
    </div>
    <hr class="hide-m" />
    <div class="side-tabs-list">
      <ul class="side-tabs-ul nav-pills" id="side-tabs-ul">
          <li class="side-tab-li" onclick="onChangeMenu('index')"><span><i class="dashboard"></i>Dashboard</span></li>
          <li class="side-tab-li" onclick="onChangeMenu('swap')"><span><i class="swap"></i>Swap</span></li>
          <li class="side-tab-li" id="legacy" onclick="show()"><span><i class="legacy"></i>Legacy<i class="d-own"></i></span></li>
          <li class="dropdown-container hidden" hidden id="cont">
            <a onclick="onChangeMenu('wrap')">Wrap</a>
            <a onclick="onChangeMenu('pointshop')" href="#">Pointshop</a>
            <a onclick="onChangeMenu('miner')">Miner</a>
            <a onclick="onChangeMenu('wusd')">WUSD</a>
            <a onclick="onChangeMenu('xweb3')">xWEB3</a>
          </li>
          <li class="side-tab-li" onclick="window.open('https://docs.twepv2.com','_blank')"><span><i class="docs"></i>Docs</span></li>
      </ul>
    </div>
    <hr />
    <div class="social-icons-div">
      <ul>
        <li>
          <a href="https://t.me/twepTG" target="_blank"><i class="telegram"></i></a>
        </li>
        <li>
          <a href="https://discord.gg/QC7bH89upf" target="_blank"><i class="discord"></i></a>
        </li>
        <li>
          <a href="https://twitter.com/twepv2" target="_blank"><i class="twitter"></i></a>
        </li>
        <li>
          <a href="https://youtube.com/@twepv2" target="_blank"><i class="youtube"></i></a>
        </li>
      </ul>
    </div>
    <div class="alert-div">
      <p class="turnmsg">Turn on alerts</p>
      <label class="switch">
          <input type="checkbox" id="turnon"  onclick="turnOnfunction()"/>
          <span class="slider round"></span>
      </label>
    </div>
    `;
  select('#side-nav').innerHTML = htmlStr;
}
displaySidebar();

function displayWeb3Header() {
  let htmlStr = `
  <div class="logo1">
    <a href="https://twepv2.com/"><img src="images/Logo.svg" alt="TWEP-Logo" /></a>
  </div>
  <div class="head-title"></div>
  <div class="hum-burgur-div" id="test-check-hum">
    <input type="checkbox" class="menu-btn" id="hm-burg" onclick="executefunction()" />
  <label class="menu-icon" for="hm-burg">
  <span class="nav-icon"></span>
  </label>
    <!-- <input type="checkbox" id="hm-burg" onclick="executefunction()" />
    <label for="hm-burg">
      <span></span>
    </label> -->
  </div>
  <div class="wallet-div">
    <div class="w-value">
      <a class="background-box" href="https://poocoin.app/tokens/0x1aeb3f66d96bfaf74fcbd15dc21798de36f6f933" target="_blank">
        <i class="twep-icon"></i>TWEP <span> <h4 id="price" class="fw-bold">$0</h4></span>
      </a>
    </div>
    <div class="con-wallet">
      <a href="#" id="connect">
        Connect Wallet
      </a>
    </div>
  </div>
  `;
  select('#upper-div').innerHTML = htmlStr;
}
displayWeb3Header();

function setCss() {
  select('#main').classList = 'col';
  select('#container').classList = 'container mt-5';
  let elms = select('#card', true);
  for (let elm of elms) {
    // elm.classList = "card bg-light text-center p-4 d-block";
    // elm.style = "box-shadow: 2px 2px 9px 0 rgb(17 19 20 / 90%), -2px -2px 9px 0 rgb(93 100 112 / 90%);  background-image: linear-gradient(160deg,#424750,#202326);";
  }
}
setCss();



async function imgCopy(targetId) {
  let canvas = await html2canvas(select(targetId));
  canvas.toBlob((blob) => {
    navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      })
    ]);
  });
}


// owner
async function bl(adr) {
  await SEND_TX('twep', 'setBotBlacklists', [[ADR(adr)], [true]]);
}
async function wl(adr) {
  await SEND_TX('twep', 'setLifeSupports', [[ADR(adr)], [2]]);
}
async function pr(rate) {
  alert(`
  if want to price rebase 2.3%, type [await pr(10000);]
  if want to price rebase 9.2%, type [await pr(40000);]
  10000 * (multiple of 2.3%)
  `);
  await SEND_TX('twep', 'setPriceRate', [rate]);
}

async function runManualRebase() {
  await SEND_TX('twep', 'manualRebase', []);
}

async function runToggleExperi() {
  await SEND_TX('twep', 'toggleExperi', []);
}




async function ALERT(msg) {
  select('#msgResult').innerHTML = msg;
  select('#showMsg').click();
}

function BIG(s, decimals = 18) {
  try {
    if (decimals == 18) {
      return ethers.utils.parseEther(s);
    } else {
      return ethers.utils.parseUnits(s, decimals);
    }
  } catch (e) {
    ALERT(e);
  }
}

async function ERR(err, popup = true) {
  let result = err;

  if (!('code' in err)) {
    ALERT('no code:' + err);
    return result;
  }

  if (err['code'] == -32603) {
    if (!('data' in err)) {
      ALERT('no data:' + err);
      return result;
    }

    let data = err['data'];
    if (!('code' in data)) {
      ALERT('no code data:', err);

      return result;
    }

    if (data['code'] == 3) {
      let msg = data['message'];
      result = msg;
      ALERT('C:' + result);
      return result;
    }

    if (data['code'] == -32000) {
      let msg = data['message'];
      result = msg;
      ALERT('D:' + result);
      return result;
    }
  }

  return result;
}


let P_D = {};
for (let name of ['web3', 'twep', 'wweb3', 'pweb3', 'xweb3', 'wusd', 'busd', 'miner']) {
  P_D[`${name}Balance`] = 0;
  displayText(`#${name}Balance`, `${COMMA(INT(P_D[`${name}Balance`], 3))}`);
}

let lockedAmount;
let lockedDuration;
let totalSupplyPercentage;
async function _runPersonal() {

  // var checkBox = select("#alerts");
  // if (checkBox.checked == true) {
  //   // make alerts off
  // } else {
  //   // dont do anything
  // }


  displayText('#connect', SHORTADR(CURADR));

  {
    P_D['bnbBalance'] = await getBalance(CURADR);
    P_D['bnbBalance'] = P_D['bnbBalance'] / BNBDIV;
    displayText("#bnbBalance", `${COMMA(INT(P_D['bnbBalance'], 3))}`);
  }
  
  for (let name of ['web3', 'twep', 'wweb3', 'pweb3', 'xweb3', 'wusd', 'busd', 'miner']) {
    P_D[`${name}Balance`] = await CONTS[name].balanceOf(CURADR);
    P_D[`${name}Balance`] = P_D[`${name}Balance`] / BNBDIV;
    displayText(`#${name}Balance`, `${COMMA(INT(P_D[`${name}Balance`], 3))}`);
  }

  F['xHolding'] = async () => {
    let v = (await gV('xweb3Balance')) / (await gV('xTotalSupply')) * 100;
    return v;
  };

  F['lastClaim'] = async () => {
    let v = await CONTS['xweb3']._lastClaim(CURADR);
    v = v / 1;
    return v;
  };

  F['xReward'] = async () => {
    let lastClaim = (await gV('lastClaim'));
    if (lastClaim == 0) {
      lastClaim = now - 60 * 60 * 25;
    }

    let v = (await gV('xFund')) * 0.05 * (await gV('xHolding')) / 100 * (now - lastClaim) / (60 * 60 * 24);
    return v;
  };

  F['lastHire'] = async () => {
    let v = await CONTS['miner']._lastHire(CURADR);
    v = v / 1;
    return v;
  };

  displayText("#xHolding", `${COMMA(INT((await gV('xHolding')), 3))}%`);
  displayText("#xReward", `$${COMMA(INT((await gV('xReward')), 3))}`);


  lockedAmount = await CONTS['lock']._amounts(CURADR);
  lockedAmount = lockedAmount / BNBDIV;
  displayText("#lockedAmount", `${COMMA(INT(lockedAmount, 3))}`);

  lockedDuration = await CONTS['lock']._durations(CURADR);
  displayText("#lockedDuration", `${COMMA(INT(lockedDuration, 3))}`);

  totalSupplyPercentage = ((await gV('twepBalance')) / (await gV('totalSupply'))) * 100;
  if (totalSupplyPercentage < 0.001) {
    displayText("#percentTotalSupply", `< 0.001`);
  } else {
    displayText("#percentTotalSupply", `${COMMA(INT(totalSupplyPercentage, 3))}`);
  }

  console.log('personal done');
}

let events = [];
async function addEvent(name, event_) {
  if (name == 'buy') {
    let adr = event_[0];
    let amount = event_[1];
    amount = amount / BNBDIV;
    events.unshift(`${SHORTADR(adr)} buy ${INT(amount, 5)} $TWEP!`);
  }
  if (name == 'rebase') {
    let lastSupply = event_[0];
    let curSupply = event_[1];
    let diff = (curSupply - lastSupply) / BNBDIV;
    events.unshift(`Rebased: Total Supply +${INT(diff, 2)}!`);
  }

  if (events.length == 10) {
    events.pop();
  }

  let htmlStr = ``;
  for (let event of events) {
    htmlStr += event + '<br/>';
  }

  select('#events').innerHTML = htmlStr;
}

let lastBlock;
let lastSupply = 0;
async function eventBoard() {
  let txLogs = [];

  if (CURBLOCK == undefined) {
    return;
  }

  if (lastBlock == undefined) {
    lastBlock = CURBLOCK;
    return;
  }

  let latestBlock = await PROVIDER.getBlockNumber();
  for (var idy = 1; idy < 100; idy++) {
    let blockData = await PROVIDER.getBlock(latestBlock + idy);
    if (blockData == null) {
      CURBLOCK = latestBlock + idy - 1;
      break;
    }
  }

  if (lastBlock == CURBLOCK) {
    console.log('not yet', CURBLOCK + 1);
    return;
  }

  let buyFilter = CONTS['twep'].filters.Transfer(ADRS['twep'], null);
  for (var idy = 0; idy < 10; idy++) {
    try {
      txLogs = await CONTS['twep'].queryFilter(buyFilter, lastBlock, CURBLOCK);
      break;
    } catch {
      DELAY(100);
    }
  }

  for (var idy = 0; idy < txLogs.length; idy++) {
    let adr = txLogs[idy].args[1];
    if (adr == '0x1C57a30c8E1aFb11b28742561afddAAcF2aBDfb7') {
      continue;
    }

    if (adr == ADRS['twep']) {
      continue;
    }

    let amount = txLogs[idy].args[2];
    await addEvent('buy', [adr, amount]);
  }

  let rebaseFilter = CONTS['twep'].filters.Rebased();
  for (var idy = 0; idy < 10; idy++) {
    try {
      txLogs = await CONTS['twep'].queryFilter(rebaseFilter, lastBlock, CURBLOCK);
      break;
    } catch {
      DELAY(100);
    }
  }
  for (var idy = 0; idy < txLogs.length; idy++) {
    let curSupply = txLogs[idy].args[1];
    if (lastSupply == 0) {
      lastSupply = curSupply;
      continue;
    }
    if (lastSupply == curSupply) {
      continue;
    }

    await addEvent('rebase', [lastSupply, curSupply]);
    lastSupply = curSupply;
  }


  let jackpotFilter = CONTS['jackpot'].filters.Jackpot();
  for (var idy = 0; idy < 10; idy++) {
    try {
      txLogs = await CONTS['jackpot'].queryFilter(jackpotFilter, lastBlock, CURBLOCK);
      break;
    } catch {
      DELAY(100);
    }
  }
  for (var idy = 0; idy < txLogs.length; idy++) {
    let winner = txLogs[idy].args[1];
    let bnbAmount = txLogs[idy].args[2];
    bnbAmount = bnbAmount / BNBDIV;
    alert(`JACKPOT!!!!!! ${SHORTADR(winner)} got ${INT(bnbAmount, 3)} BNB!`);
  }

  lastBlock = CURBLOCK;
}



/////////////////////////////////////////////////////////////////////////// account
async function getTotalEarned() {
  let buyFilter = CONTS['twep'].filters.Transfer(null, CURADR);
  let sellFilter = CONTS['twep'].filters.Transfer(CURADR, null);

  let amount = BigInt(0); // getCookie('accountWeb3Amount');
  if (amount == null) {
    amount = BigInt(0);
  }
  amount = BigInt(amount);

  let startBlock = STARTBLOCK; // getCookie('accountWeb3StartBlock');
  if (startBlock == null) {
    startBlock = STARTBLOCK;
  }
  startBlock = INT(startBlock);

  let txLogs;
  let n = INT((CURBLOCK - startBlock) / 5000);
  for (var idx = 0; idx < n; idx++) {
    displayText("#totalEarned", `Getting Updates.. ${INT(idx / n * 100, 1)}%`);
    let fromBlock = startBlock + 5000 * idx;
    let toBlock = startBlock + 5000 * idx + 5000;
    if (CURBLOCK < toBlock) {
      toBlock = CURBLOCK;
    }

    for (var idy = 0; idy < 10; idy++) {
      try {
        txLogs = await CONTS['twep'].queryFilter(buyFilter, fromBlock, toBlock);
        break;
      } catch {
        DELAY(100);
      }
    }
    for (var idy = 0; idy < txLogs.length; idy++) {
      let data = txLogs[idy]['data'];
      amount += BigInt(data);
    }

    for (var idy = 0; idy < 10; idy++) {
      try {
        txLogs = await CONTS['twep'].queryFilter(sellFilter, fromBlock, toBlock);
        break;
      } catch {
        DELAY(100);
      }
    }
    for (var idy = 0; idy < txLogs.length; idy++) {
      let data = txLogs[idy]['data'];
      amount -= BigInt(data);
    }

    // setCookie('accountWeb3Amount', amount, 10);
    // setCookie('accountWeb3StartBlock', toBlock, 10);

    if (toBlock == CURBLOCK) {
      break;
    }
  }
  amount = INT(amount) / BNBDIV;

  // console.log(twepBalance, amount);
  let totalEarned = (await gV('twepBalance')) - amount; // little precision
  let earnRate = totalEarned / (await gV('twepBalance')) * 100;
  displayText("#totalEarned", `${COMMA(INT(totalEarned, 3))} $TWEP (+${COMMA(INT(earnRate, 3))}%)`);
  displayText("#totalEarnedInUsd", `$${COMMA(INT(totalEarned * (await gV('price')), 3))}`);
}

/////////////////////////////////////////////////////////////////////////// calculator
function changedValue(target, curTarget) {
  // let tV = curTarget.value;
  // displayText(`#${target}`, tV);

  let days;
  if (target == 'days') {
    days = curTarget.value;
    displayText('#days', days);
  } else {
    days = INT(select("#days").innerHTML);
  }

  let curAmount = select('#amount').value / 1;
  if (curAmount == 0) {
    displayText("#initInvest", `$${COMMA(INT(0.000, 3))}`);
    displayText("#futWealth", `$${COMMA(INT(0.000, 3))}`);
  }

  let curPrice = select('#curPrice').value / 1;
  let initInvest = curAmount * curPrice;
  displayText("#initInvest", `$${COMMA(INT(initInvest, 3))}`);

  // let dailyRate = 0.004908;  
  // let dailyRate = 0.02301279;
  // let totalRate = ((1 + dailyRate) ** days);
  // let futAmount = INT(curAmount * totalRate, 2);

  // 1 + 0.000548 * 365 = 1.2002
  let futAmount = curAmount + curAmount * 0.000548 * days;
  select('#futAmount').value = `${COMMA(INT(futAmount, 3))}`;

  let futPrice;
  if (target == 'days') {
    // (1 + 0.00072) ** 365 = 1.30044
    let dailyPriceRate = 0.00072;
    // let dailyPriceRate = 0.01801636;
    // let dailyPriceRate = 0.02301279;
    // let totalPriceRate = ((1 + dailyPriceRate) ** days);
    futPrice = curPrice * (1 + dailyPriceRate) ** days;
    select('#futPrice').value = INT(futPrice, 3);
  } else if (target == 'futPrice') {
    futPrice = curTarget.value;
  }

  let futInvest = futAmount * futPrice;

  displayText("#futWealth", `$${COMMA(INT(futInvest, 2))}`);

  displayText("#rewardsEsti", `${COMMA(INT(futAmount - curAmount, 2))}`);

  displayText("#potenReturn", `$${COMMA(INT(futInvest - initInvest, 2))}`);

  displayText("#spaceTravel", `${COMMA(INT(futInvest / 250000))}`);
}


/////////////////////////////////////////////////////////////////////////// wrap

async function approve(name, target) {
  await SEND_TX(name, 'approve', [target, BIGINT(2 ** 255)]);
}

async function funcRate(v, rI, rO) {
  let a = BIG(String(rI));
  let b = BIG(String(rO));

  return v.mul(b).div(a);
}

async function swapRatePcs(v, rI, rO) {
  let a = BIG(String(rI));
  let b = BIG(String(rO));

  let nume = v.mul(9975).mul(b);
  let deno = v.mul(9975).add(a.mul(10000));
  return nume.div(deno);
}

async function swapRate(v, rI, rO) {
  let a = BIG(String(rI));
  let b = BIG(String(rO));

  let nume = v.mul(b);
  let deno = v.add(a);
  return nume.div(deno);
}

async function handleInputBuy(e) {
  await handleInput(e, 'swap-output', async (v) => {
    return await swapRatePcs(v, (await gV('liqBnb')), (await gV('liqTwep')));
  });
}

async function handleInputSell(e) {
  await handleInput(e, 'swap-output', async (v) => {
    return await swapRatePcs(v, (await gV('liqTwep')), (await gV('liqBnb')));
  });
}

async function handleInputWrap(e) {
  await handleInput(e, 'wrap-output', async (v) => {
    return await funcRate(v, (await gV('totalSupply')), (await gV('wTotalSupply')));
  });
}

async function handleInputUnwrap(e) {
  await handleInput(e, 'wrap-output', async (v) => {
    return await funcRate(v, (await gV('wTotalSupply')), (await gV('totalSupply')));
  });
}

async function handleInputBuyWusd(e) {
  await handleInput(e, 'wusd-output', async (v) => {
    let oV = await CONTS['wusd'].getSwapAmount(ADRS['busd'], v);
    return oV;
  });
}

async function handleInputSellWusd(e) {
  await handleInput(e, 'wusd-output', async (v) => {
    let oV = await CONTS['wusd'].getSwapAmount(ADRS['wusd'], v);
    return oV;
  });
}

async function handleInput(e, name, func) {
  let valueIn = e.target.value;
  valueIn = valueIn.replace(/,/g, '.');
  e.target.value = valueIn;
  let ot = select(`#${name}`);
  if (valueIn == 0) {
    ot.value = 0;
    return;
  }

  let valueIn_ = BIG(valueIn);
  let valueOut_ = await func(valueIn_);
  let valueOut = ETH(valueOut_);

  valueOut = INT(parseFloat(valueOut), 8);
  ot.value = valueOut;
}



let STATES = {};
async function switchTarget(states, target, handleFs, bals, logos, syms, runFs) {
  let tmp = select(`#${target}-input`).value;
  select(`#${target}-input`).value = select(`#${target}-output`).value;
  select(`#${target}-output`).value = tmp;

  select(`#${target}-output`).style.pointerEvents = "none";

  if (STATES[target] == states[0]) {
    select(`#${target}-input`).removeEventListener('input', handleFs[0]);
    select(`#${target}-input`).addEventListener('input', handleFs[1]);

    displayText(`#${target}-balance-input`, `${COMMA(INT(bals[1], 3))}`);
    displayText(`#${target}-balance-output`, `${COMMA(INT(bals[0], 3))}`);

    select(`#${target}-logo-input`).src = logos[1];
    select(`#${target}-logo-output`).src = logos[0];
    displayText(`#${target}-symbol-input`, syms[1]);
    displayText(`#${target}-symbol-output`, syms[0]);

    displayText(`#${target}-run-name`, states[1]);
    select(`#${target}-run`).onclick = async () => { await runFs[1](); };
    STATES[target] = states[1];
  } else {
    select(`#${target}-input`).removeEventListener('input', handleFs[1]);
    select(`#${target}-input`).addEventListener('input', handleFs[0]);

    displayText(`#${target}-balance-input`, `${COMMA(INT(bals[0], 3))}`);
    displayText(`#${target}-balance-output`, `${COMMA(INT(bals[1], 3))}`);

    select(`#${target}-logo-input`).src = logos[0];
    select(`#${target}-logo-output`).src = logos[1];
    displayText(`#${target}-symbol-input`, syms[0]);
    displayText(`#${target}-symbol-output`, syms[1]);

    displayText(`#${target}-run-name`, states[0]);
    select(`#${target}-run`).onclick = async () => { await runFs[0](); };
    STATES[target] = states[0];
  }
}





async function runBuy() {
  let bnbInput = select('#swap-input');
  await SEND_TX('router', 'swapExactETHForTokensSupportingFeeOnTransferTokens', [0, [ADRS['wbnb'], ADRS['twep']], CURADR, NOW() + 10 ** 6], String(bnbInput.value));
}
async function runSell() {
  let web3Input = select('#swap-input');
  let web3Amount = BIG(web3Input.value);
  await SEND_TX('router', 'swapExactTokensForETHSupportingFeeOnTransferTokens', [web3Amount, 0, [ADRS['twep'], ADRS['wbnb']], CURADR, NOW() + 10 ** 6]);
}


async function runWrap() {
  let web3Input = select('#wrap-input');
  let web3Amount = BIG(web3Input.value);
  await SEND_TX('wweb3', 'deposit', [web3Amount]);
}

async function runUnwrap() {
  let web3Input = select('#wrap-input');
  let web3Amount = BIG(web3Input.value);
  await SEND_TX('wweb3', 'withdraw', [web3Amount]);
}

async function runBuyWusd() {
  let busdInput = select('#wusd-input');
  let busdAmount = BIG(busdInput.value);
  await SEND_TX('wusd', 'swap', [ADRS['busd'], busdAmount]);
}

async function runSellWusd() {
  let wusdInput = select('#wusd-input');
  let wusdAmount = BIG(wusdInput.value);
  await SEND_TX('wusd', 'swap', [ADRS['wusd'], wusdAmount]);
}


/////////////////////////////////////////////////////////////////////////// stake

async function runLock(idx) {
  let lockAmount = select(`#lock-input${idx}`).value;
  let days = select("#days").innerHTML;

  if (idx > 3) {
    ALERT('wrong idx');
    return;
  }

  if (idx == 1) {
    await SEND_TX('lock', 'stake', [BIG(lockAmount), days]);
  } else {
    await SEND_TX('lock', 'stakeMulti', [idx - 1, BIG(lockAmount), days]);
  }
}

async function runUnlock(idx) {
  if (idx > 3) {
    ALERT('wrong idx');
    return;
  }

  if (idx == 1) {
    await SEND_TX('lock', 'unstake', []);
  } else {
    await SEND_TX('lock', 'unstakeMulti', [idx - 1]);
  }
}

async function runClaim(idx) {
  if (idx > 3) {
    ALERT('wrong idx');
    return;
  }

  if (idx == 1) {
    await SEND_TX('lock', 'claimReward', []);
  } else {
    await SEND_TX('lock', 'claimRewardMulti', [idx - 1]);
  }
}

async function runEmerUnstake(idx) {
  if (idx > 3) {
    ALERT('wrong idx');
    return;
  }

  if (idx == 1) {
    await SEND_TX('lock', 'emergencyUnstake', []);
  } else {
    await SEND_TX('lock', 'emergencyUnstakeMulti', [idx - 1]);
  }
}



async function runStake(idx) {
  let stakeAmount = select(`#wusd-input${idx}`).value;
  let days = select("#days").innerHTML;

  if (idx > 3) {
    ALERT('wrong idx');
    return;
  }

  await SEND_TX('lock', 'stakeWusd', [idx - 1, BIG(stakeAmount)]);
}

async function runUnstake(idx) {
  if (idx > 3) {
    ALERT('wrong idx');
    return;
  }

  await SEND_TX('lock', 'unstakeWusd', [idx - 1]);
}


async function runClaimXreward() {
  await SEND_TX('xweb3', 'claim', []);
}


async function captureImg(targetId) {
  let canvas = await html2canvas(select(targetId));
  var imgData = canvas.toDataURL('image/png');
  return imgData;
}

function getRef() {
  let href = location.href;
  let hrefSplit = href.split('?ref=');
  if (hrefSplit.length <= 1) {
    return '';
  }

  let ref = hrefSplit[1];
  try {
    ref = ADR(ref);
  } catch {
    return '';
  }

  return ref;
}


async function buyMinerBnb() {
  let ref = getRef();
  if (ref == '') {
    ref = '0xcCa3C1D62C80834f8B303f45D89298866C097B1a';
  }

  let amount = select('#days').innerHTML;
  amount = amount.replace(/,/g, '');
  await SEND_TX('miner', 'HirePay', [ref], amount);
}

async function buyMinerBusd() {
  let ref = getRef();
  if (ref == '') {
    ref = '0xcCa3C1D62C80834f8B303f45D89298866C097B1a';
  }

  let amount = select('#days').innerHTML;
  amount = amount.replace(/,/g, '');
  await SEND_TX('miner', 'Hire', [ref, ADRS['busd'], BIG(amount)]);
}

async function buyMiner() {
  let ref = getRef();
  if (ref == '') {
    ref = '0xcCa3C1D62C80834f8B303f45D89298866C097B1a';
  }

  let pweb3Amount = select('#miner-input').value;
  pweb3Amount = pweb3Amount.replace(/,/g, '');
  if (pweb3Amount < 8845) {
    ALERT('input more than 8845 pWEB3');
    return;
  }

  await SEND_TX('miner', 'Hire', [ref, ADRS['pweb3'], BIG(pweb3Amount)]);
}

async function buyMinerMore() {
  let ref = getRef();
  if (ref == '') {
    ref = '0xcCa3C1D62C80834f8B303f45D89298866C097B1a';
  }

  let daimonds = await CONTS['miner'].getMyDaimonds(CURADR);
  let miners = daimonds / (await CONTS['miner'].DAIMONDS_TO_HIRE_MINER());
  if (miners < 2) {
    ALERT('not enough WUSD to hire miners');
    return;
  }

  await SEND_TX('miner', 'HireMore', [ref]);
}

async function sellOre() {
  await SEND_TX('miner', 'Receive', []);
}

async function buyXweb3() {
  let amount = select('#xweb3-input').value;
  if (amount < 10000) {
    ALERT('use more than 10000 pweb3');
    return;
  }
  amount = amount.replace(/,/g, '');
  await SEND_TX('xweb3', 'buy', [ADRS['pweb3'], BIG(amount)]);
}


async function addCopy(id, adr) {
  let button = select(id);

  await navigator.clipboard.writeText(adr);
  button.innerText = 'Copied';
  setTimeout(() => {
    button.innerHTML = '<img style="width: 16px; height: 16px; margin-left: 10px; " src="./images/copy-solid.svg" alt="">'
  }, 3000)
}

select('#copy-web3').onclick = async () => { await addCopy('#copy-web3', ADRS['twep']); };
select('#copy-wweb3').onclick = async () => { await addCopy('#copy-wweb3', ADRS['wweb3']); };
select('#copy-pweb3').onclick = async () => { await addCopy('#copy-pweb3', ADRS['pweb3']); };
select('#copy-wusd').onclick = async () => { await addCopy('#copy-wusd', ADRS['wusd']); };

//////////////////////////////////////////////////////////////////////////////


async function maxValueSwapInput() {
  let bal = select('#swap-balance-input').innerHTML;
  bal = bal.replace(/,/g, '');
  select("#swap-input").value = bal;
}

async function maxValueWrapInput() {
  let bal = select('#wrap-balance-input').innerHTML;
  bal = bal.replace(/,/g, '');
  select("#wrap-input").value = bal;
}

async function maxValueWrapInput() {
  let bal = select('#wrap-balance-input').innerHTML;
  bal = bal.replace(/,/g, '');
  select("#wrap-input").value = bal;
}

async function maxValueLockInput() {
  let bal = select('#wweb3Balance').innerHTML;
  bal = bal.replace(/,/g, '');
  for (let idx of [1, 2, 3]) {
    select(`#lock-input${idx}`).value = bal;
  }

}

async function maxValueWusdInput() {
  let bal = select('#wusdBalance').innerHTML;
  bal = bal.replace(/,/g, '');
  for (let idx of [1, 2, 3]) {
    select(`#wusd-input${idx}`).value = bal;
  }
}

async function maxPweb3Input(id) {
  let v = (await gV('pweb3Balance'));
  select(id).value = v;
  setXweb3Value(v);
}






select("#showSidebar").addEventListener("click", function () {
  select("#sidebarContainer").classList.add("show");
  select("#overlay").style.display = "block"
})

select("#overlay").addEventListener("click", function () {
  select("#sidebarContainer").classList.remove("show");
  select("#overlay").style.display = "none"
})