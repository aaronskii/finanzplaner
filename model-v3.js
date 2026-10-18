'use strict';
function retirementDefaults(){return {value:0,rate:0,account:'',startMonth:'2027-01',eligible:false,birthDate:'',bonusReceived:false,children:[],payoutStart:65,payoutEnd:85,migrationNote:''}}
function dateMonth(date=new Date()){return date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')}
function nextBookingMonth(day=2,date=new Date()){const m=dateMonth(date);return date.getDate()<day?m:nextCalendarMonth(m)}
function nextCalendarMonth(m){const [y,k]=m.split('-').map(Number),d=new Date(y,k,1);return dateMonth(d)}
function autoDefaults(){const plan=()=>({enabled:false,day:2,firstMonth:nextBookingMonth(),lastMonth:'',bookedMonths:[]});return {etf:plan(),retirement:plan(),reserve:plan()}}
function validDateString(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+'T12:00:00');return !Number.isNaN(+d)&&d.getFullYear()===Number(s.slice(0,4))&&d.getMonth()+1===Number(s.slice(5,7))&&d.getDate()===Number(s.slice(8,10))}
function validV3(s,accounts){
 const num=v=>typeof v==='number'&&Number.isFinite(v)&&v>=0&&v<=1e12,mo=/^\d{4}-(0[1-9]|1[0-2])$/;
 const r=s.retirement;if(!r||!num(r.value)||!num(r.rate)||typeof r.account!=='string'||(r.account!==''&&!accounts.has(r.account))||!mo.test(r.startMonth)||r.startMonth<'2027-01'||typeof r.eligible!=='boolean'||typeof r.bonusReceived!=='boolean'||typeof r.birthDate!=='string'||(r.birthDate!==''&&(!validDateString(r.birthDate)||r.birthDate>new Date().toISOString().slice(0,10)))||!Number.isInteger(r.payoutStart)||r.payoutStart<65||r.payoutStart>70||!Number.isInteger(r.payoutEnd)||r.payoutEnd<85||r.payoutEnd>100||typeof r.migrationNote!=='string'||r.migrationNote.length>500)return false;
 if(!Array.isArray(r.children)||r.children.length>20||r.children.some(c=>!c||!Number.isInteger(c.endYear)||c.endYear<2026||c.endYear>2200))return false;
 if(!s.auto)return false;
 for(const k of ['etf','retirement','reserve']){const a=s.auto[k];if(!a||typeof a.enabled!=='boolean'||![2,16].includes(a.day)||!mo.test(a.firstMonth)||a.firstMonth<'2026-01'||typeof a.lastMonth!=='string'||(a.lastMonth!==''&&(!mo.test(a.lastMonth)||a.lastMonth<a.firstMonth))||!Array.isArray(a.bookedMonths)||a.bookedMonths.length>2400||new Set(a.bookedMonths).size!==a.bookedMonths.length||a.bookedMonths.some(m=>!mo.test(m)))return false;}
 if(!Array.isArray(s.autoLog)||s.autoLog.length>600||s.autoLog.some(x=>!x||!['etf','retirement','reserve'].includes(x.track)||!validDateString(x.date)||!num(x.amount)))return false;
 return true;
}
function grantForYear(contribution,year,retirement,bonusAlreadyUsed=false){
 const none={base:0,children:0,bonus:0,total:0};
 if(!retirement.eligible||year<2027||contribution<120)return none;
 const base=Math.min(contribution,360)*.5+Math.max(0,Math.min(contribution,1800)-360)*.25;
 const count=retirement.children.filter(c=>c.endYear>=year).length;
 const children=Math.min(contribution,300)*count;
 let bonus=0;
 if(retirement.birthDate&&!retirement.bonusReceived&&!bonusAlreadyUsed){
  const twentyFifth=Number(retirement.birthDate.slice(0,4))+25;
  const birthday=retirement.birthDate.slice(5);
  // Maßgeblich ist das Alter zu Beginn des Beitragsjahres, nicht am Eröffnungstag.
  if(year<twentyFifth||(year===twentyFifth&&birthday!=='01-01'))bonus=200;
 }
 return {base,children,bonus,total:Math.round((base+children+bonus)*100)/100};
}
function retirementSeries(years,annualRate,referenceMonth=month()){
 const r=state.retirement,q=Math.pow(1+annualRate,1/12)-1,n=Math.round(years*12);
 const values=[r.value],paid=[0],grants=[0];let value=r.value,totalPaid=0,totalGrant=0,yearContribution=0,bonusUsed=r.bonusReceived;
 for(let i=1;i<=n;i++){
  const m=plusMonths(referenceMonth,i),year=Number(m.slice(0,4));
  value*=1+q;
  const contribution=m>=r.startMonth?r.rate:0;
  value+=contribution;totalPaid+=contribution;yearContribution+=contribution;
  if(m.endsWith('-12')){const g=grantForYear(yearContribution,year,r,bonusUsed);value+=g.total;totalGrant+=g.total;bonusUsed=bonusUsed||g.bonus>0;yearContribution=0;}
  values.push(value);paid.push(totalPaid);grants.push(totalGrant);
 }
 return {values,paid,grants,value,totalPaid,totalGrant};
}
function retirementPayout(capital){const months=(state.retirement.payoutEnd-state.retirement.payoutStart)*12;return {months,monthly:capital/months,minimumInitial:capital*.8/months}}

// V3.0-Prozentwerte einmalig in Euro übernehmen; spätere Depotänderungen skalieren sie nicht.
function migrateBalancerValues(s){
 if(!Array.isArray(s.funds))return;
 const allLegacy=s.funds.length>0&&s.funds.every(f=>f&&f.currentValue===undefined);
 const completePercent=allLegacy&&s.funds.every(f=>typeof f.currentPercent==='number'&&Number.isFinite(f.currentPercent)&&f.currentPercent>=0&&f.currentPercent<=100);
 const percentTotal=completePercent?s.funds.reduce((sum,f)=>sum+f.currentPercent,0):0;
 if(completePercent&&Math.abs(percentTotal-100)<=.011&&typeof s.portfolio==='number'&&Number.isFinite(s.portfolio)){
  const capital=Math.round(s.portfolio*100),raw=s.funds.map(f=>capital*f.currentPercent/percentTotal),cents=raw.map(v=>Math.floor(v));
  let rest=capital-cents.reduce((sum,v)=>sum+v,0);
  const order=raw.map((v,i)=>({i,remainder:v-Math.floor(v)})).sort((a,b)=>b.remainder-a.remainder||a.i-b.i);
  for(let i=0;rest>0;rest--,i++)cents[order[i%order.length].i]++;
  s.funds.forEach((f,i)=>f.currentValue=cents[i]/100);
 }else for(const f of s.funds)if(f&&f.currentValue===undefined){f.currentValue=typeof f.currentPercent==='number'&&Number.isFinite(f.currentPercent)&&f.currentPercent>=0&&f.currentPercent<=100?Math.round(s.portfolio*f.currentPercent)/100:null;}
 for(const f of s.funds)if(f)delete f.currentPercent;
}

function balanceEtfs(portfolio,monthly,funds){
 const targetTotal=funds.reduce((s,f)=>s+f.percent,0),currentTotal=funds.reduce((s,f)=>s+Math.round((f.currentValue??0)*100),0);
 if(!funds.length||Math.abs(targetTotal-100)>1e-6)return {error:'Die Zielgewichte müssen zusammen 100 % ergeben.'};
 if(portfolio>0&&funds.some(f=>f.currentValue===null||f.currentValue===undefined))return {error:'Trage den aktuellen Wert jedes ETFs in Euro ein.'};
 if(currentTotal!==Math.round(portfolio*100))return {error:'Die Summe deiner ETF-Werte ('+euro(currentTotal/100)+') muss dem Depotwert ('+euro(portfolio)+') entsprechen.'};
 const centBudget=Math.round(monthly*100),budget=centBudget/100;
 const current=funds.map(f=>f.currentValue??0),deficits=funds.map((f,i)=>(portfolio+budget)*f.percent/100-current[i]);
 let low=0,high=Math.max(0,...deficits);
 for(let i=0;i<90;i++){const mid=(low+high)/2,sum=deficits.reduce((s,d)=>s+Math.max(0,d-mid),0);if(sum>budget)low=mid;else high=mid;}
 const raw=deficits.map(d=>Math.max(0,d-(low+high)/2)*100),cents=raw.map(v=>Math.floor(v+1e-8));
 let missing=centBudget-cents.reduce((s,v)=>s+v,0);
 const order=raw.map((v,i)=>({i,fraction:v-Math.floor(v)})).sort((a,b)=>b.fraction-a.fraction||a.i-b.i);
 for(let j=0;missing>0;j++,missing--)cents[order[j%order.length].i]++;
 // Gegen numerische Grenzfälle bei sehr großen Depotwerten absichern.
 for(let j=0;missing<0;j++){const i=order[order.length-1-j%order.length].i;if(cents[i]>0){cents[i]--;missing++;}}
 const rows=funds.map((f,i)=>({name:f.name,target:f.percent,current:portfolio>0?current[i]/portfolio*100:0,currentValue:current[i],payment:cents[i]/100,after:portfolio+budget>0?(current[i]+cents[i]/100)/(portfolio+budget)*100:f.percent}));
 return {rows,exact:rows.every(x=>Math.abs(x.after-x.target)<.02),total:centBudget/100};
}
function applyContributions(now=new Date()){
 if(!state||window.Vault?.locked||!state.auto||loadError)return false;
 const todayMonth=dateMonth(now),day=now.getDate(),events=[];
 for(const track of ['etf','retirement','reserve']){
  const a=state.auto[track];if(!a.enabled)continue;
  let m=a.lastMonth?plusMonths(a.lastMonth,1):a.firstMonth;
  let guard=0;
  while((m<todayMonth||(m===todayMonth&&a.day<=day))&&guard++<2400){events.push({track,month:m,day:a.day});m=plusMonths(m,1);}
 }
 events.sort((a,b)=>a.month.localeCompare(b.month)||a.day-b.day||a.track.localeCompare(b.track));
 for(const event of events){
  const plan=state.auto[event.track];if(plan.bookedMonths.includes(event.month)){plan.lastMonth=event.month;continue;}plan.bookedMonths.push(event.month);
  let amount=0;
  if(event.track==='etf'){amount=state.rate;state.portfolio=Math.round((state.portfolio+amount)*100)/100;}
  if(event.track==='retirement'&&event.month>=state.retirement.startMonth){amount=state.retirement.rate;state.retirement.value=Math.round((state.retirement.value+amount)*100)/100;}
  if(event.track==='reserve'){
   const before=calc(event.month);amount=before.b.s;state.reserve=Math.round((state.reserve+amount)*100)/100;
   if(!before.full&&state.reserve>=before.target&&before.income>0)state.hold=event.month;
  }
  state.auto[event.track].lastMonth=event.month;
  if(amount>0)state.autoLog.push({track:event.track,date:event.month+'-'+String(event.day).padStart(2,'0'),amount});
 }
 if(events.length){state.autoLog=state.autoLog.slice(-600);persistState()}
 return events.length>0;
}
function trackName(track){return {etf:'ETF-Sparplan',retirement:'Altersvorsorgedepot',reserve:'Notgroschen'}[track]}
function sortedIcons(){return Object.entries(iconNames).sort((a,b)=>a[1].localeCompare(b[1],'de',{sensitivity:'base'}))}
