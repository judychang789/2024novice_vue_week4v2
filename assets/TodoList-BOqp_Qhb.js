import{_ as x,r,u as $,o as w,a as N,c as m,b as a,d as i,e,t as k,w as B,v as D,f as _,n as h,F as I,g as M,h as p}from"./index-CkKtCTjG.js";const O="/2024novice_vue_week4v2/assets/no-CwWZoW3o.png",S={id:"todoListPage",class:"bg-half"},V={class:"todo_sm"},q={href:"#"},z={class:"container todoListPage vhContainer"},E={class:"todoList_Content"},F={class:"card input inputBox"},P={class:"card card_list todoList_list"},U={class:"tab todoList_tab"},W={class:"cart_content todoList_items"},A={class:"list todoList_item"},R=["data-idNum"],Z={class:"checkbox todoList_label"},j=["checked","onChange"],G=["onClick"],H={key:0,class:"todoList_label"},J={class:"list_footer todoList_statistics"},K={key:0,id:"todoList_img",class:"todoList_img"},Q="https://todolist-api.hexschool.io",X={__name:"TodoList",setup(Y){const u=r(""),c=r(""),o=r("全部"),l=r([{content:"把冰箱發霉的檸檬拿去丟",checked:!1},{content:"打電話叫媽媽匯款給我",checked:!1},{content:"整理電腦資料夾",checked:!1},{content:"繳電費水費瓦斯費",checked:!1},{content:"約vicky禮拜三泡溫泉",checked:!1},{content:"約ada禮拜四吃晚餐",checked:!1}]),f=$();w(async()=>{if(f.query.nickname)u.value=f.query.nickname;else{const s=document.cookie.replace(/(?:(?:^|.*;\s*)customTodoToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");if(s)try{const t=await N.get(`${Q}/users/checkout`,{headers:{Authorization:s}});u.value=t.data.nickname}catch(t){console.error("取得用戶資料失敗：",t)}}});const d=m(()=>o.value==="全部"?l.value:o.value==="待完成"?l.value.filter(s=>!s.checked):l.value.filter(s=>s.checked)),g=m(()=>l.value.filter(s=>!s.checked).length),L=()=>{if(c.value.trim()===""){alert("不可為空");return}l.value.push({content:c.value,checked:!1}),c.value=""},b=s=>{l.value.splice(s,1)},C=s=>{s.checked=!s.checked},T=()=>{l.value=l.value.filter(s=>!s.checked)};return(s,t)=>(a(),i("div",S,[e("nav",null,[t[5]||(t[5]=e("h1",null,[e("a",{href:"#"},"ONLINE TODO LIST")],-1)),e("ul",null,[e("li",V,[e("a",q,[e("span",null,k(u.value)+"的代辦",1)])]),t[4]||(t[4]=e("li",null,[e("a",{href:"/"},"登出")],-1))])]),e("div",z,[e("div",E,[e("div",F,[B(e("input",{"onUpdate:modelValue":t[0]||(t[0]=n=>c.value=n),type:"text",placeholder:"請輸入待辦事項"},null,512),[[D,c.value]]),e("a",{href:"#",class:"btn_add",onClick:_(L,["prevent"])},t[6]||(t[6]=[e("i",{class:"bi bi-plus-lg"},null,-1)]))]),e("div",P,[e("ul",U,[e("li",{class:h({active:o.value==="全部"}),onClick:t[1]||(t[1]=n=>o.value="全部")},t[7]||(t[7]=[e("a",{href:"#"},"全部",-1)]),2),e("li",{class:h({active:o.value==="待完成"}),onClick:t[2]||(t[2]=n=>o.value="待完成")},t[8]||(t[8]=[e("a",{href:"#"},"待完成",-1)]),2),e("li",{class:h({active:o.value==="已完成"}),onClick:t[3]||(t[3]=n=>o.value="已完成")},t[9]||(t[9]=[e("a",{href:"#"},"已完成",-1)]),2)]),e("div",W,[e("ul",A,[(a(!0),i(I,null,M(d.value,(n,v)=>(a(),i("li",{key:v,"data-idNum":v},[e("label",Z,[e("input",{class:"todoList_input",type:"checkbox",checked:n.checked,onChange:y=>C(n)},null,40,j),e("span",null,k(n.content),1)]),e("a",{href:"#",class:"delete",onClick:_(y=>b(v),["prevent"])},t[10]||(t[10]=[e("i",{class:"bi bi-x-lg"},null,-1)]),8,G)],8,R))),128)),d.value.length===0?(a(),i("li",H,t[11]||(t[11]=[e("span",null,"目前尚無待辦事項",-1)]))):p("",!0)]),e("div",J,[e("p",null,k(g.value)+" 個待完成項目",1),d.value.length!==0?(a(),i("a",{key:0,href:"#",onClick:_(T,["prevent"])}," 清除已完成項目 ")):p("",!0)])])])]),d.value.length===0?(a(),i("div",K,t[12]||(t[12]=[e("img",{src:O,alt:""},null,-1)]))):p("",!0)])]))}},te=x(X,[["__scopeId","data-v-63079b97"]]);export{te as default};
