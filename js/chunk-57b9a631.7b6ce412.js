(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57b9a631"],{"2a0e":function(e,t,r){"use strict";var c=r("7a23"),n=r("8e33"),a=r.n(n),i={class:"w-full text-center"},o={class:"border-b-2"},l=Object(c["i"])("th",{class:"w-1/3"},"商品名稱",-1),s=Object(c["i"])("th",{class:"w-1/6"},"單價",-1),d=Object(c["i"])("th",{class:"w-1/6"},"數量",-1),u=Object(c["i"])("th",{class:"w-1/6"},"小計",-1),b={key:0,class:"w-1/6"},O={class:"flex flex-col items-center py-3 lg:flex-row"},j=["src","alt"],p=["onUpdate:modelValue","onChange"],m={key:1},f={key:0},h={key:0},g=["onClick"],x=Object(c["i"])("td",null,null,-1),v=Object(c["i"])("td",null,null,-1),y=Object(c["i"])("td",{class:"pt-2 lg:text-right"},[Object(c["i"])("p",null,"總計：")],-1),w={class:"pt-2"},I={key:0,class:"pt-2"};function k(e,t,r,n,k,P){return Object(c["I"])(),Object(c["h"])("table",i,[Object(c["i"])("thead",null,[Object(c["i"])("tr",o,[l,s,d,u,r.order?Object(c["g"])("",!0):(Object(c["I"])(),Object(c["h"])("th",b,"刪除"))])]),Object(c["i"])("tbody",null,[(Object(c["I"])(!0),Object(c["h"])(c["a"],null,Object(c["P"])(r.products,(function(e){return Object(c["I"])(),Object(c["h"])("tr",{key:e.id,class:"border-b-[1px]"},[Object(c["i"])("td",O,[Object(c["i"])("img",{src:e.product.imageUrl,alt:e.product.title,class:"w-[100px] mb-2 lg:mb-0 lg:mr-6 object-cover h-[70px]"},null,8,j),Object(c["i"])("p",null,Object(c["U"])(e.product.title),1)]),Object(c["i"])("td",null,Object(c["U"])(e.product.price),1),Object(c["i"])("td",null,[r.order?Object(c["g"])("",!0):Object(c["gb"])((Object(c["I"])(),Object(c["h"])("input",{key:0,type:"number","onUpdate:modelValue":function(t){return e.qty=t},class:"w-full px-3 border-2 rounded-lg",onChange:function(t){return P.changeProductQuantity(e)}},null,40,p)),[[c["ab"],e.qty]]),r.order?(Object(c["I"])(),Object(c["h"])("p",m,Object(c["U"])(e.qty),1)):Object(c["g"])("",!0)]),Object(c["i"])("td",null,[Object(c["i"])("p",null,Object(c["U"])(Math.round(e.final_total)),1),P.useCoupon(e.coupon)?(Object(c["I"])(),Object(c["h"])("p",f,"已套用優惠券："+Object(c["U"])(P.useCoupon(e.coupon)),1)):Object(c["g"])("",!0)]),r.order?Object(c["g"])("",!0):(Object(c["I"])(),Object(c["h"])("td",h,[Object(c["i"])("img",{src:a.a,alt:"刪除",class:"w-[20px] h-[20px] mx-auto hover:scale-150 cursor-pointer",onClick:function(t){return P.deleteProduct(e.id)}},null,8,g)]))])})),128)),Object(c["i"])("tr",null,[x,v,y,Object(c["i"])("td",w,[Object(c["i"])("p",null,Object(c["U"])(Math.round(P.sumsPriceTotal)),1)]),r.order?Object(c["g"])("",!0):(Object(c["I"])(),Object(c["h"])("td",I,[Object(c["i"])("img",{src:a.a,alt:"刪除",class:"w-[20px] h-[20px] mx-auto hover:scale-150 block cursor-pointer",onClick:t[0]||(t[0]=function(){return P.deleteProduct&&P.deleteProduct.apply(P,arguments)})})]))])])])}var P=r("1da1"),C=(r("96cf"),r("d3b7"),{props:{products:{type:Array,required:!0},order:{type:Boolean,required:!1}},computed:{sumsPriceTotal:function(){return this.products?this.products.reduce((function(e,t){var r=e+t.final_total;return r}),0):0}},methods:{changeProductQuantity:function(e){var t=this;return Object(P["a"])(regeneratorRuntime.mark((function r(){var c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!(e.qty<1)){r.next=4;break}t.deleteProduct(e.id),r.next=7;break;case 4:return c={id:e.id,data:{product_id:e.product_id,qty:e.qty}},r.next=7,t.$store.dispatch("forestageCart/changeProductQuantity",c);case 7:case"end":return r.stop()}}),r)})))()},deleteProduct:function(e){var t=this;return Object(P["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$store.dispatch("forestageCart/deleteProduct",e);case 2:return r.next=4,t.$store.dispatch("forestageCart/getCart");case 4:case"end":return r.stop()}}),r)})))()},useCoupon:function(e){return null!==e&&void 0!==e&&e.code?e.code:""}}}),U=r("d959"),R=r.n(U);const _=R()(C,[["render",k]]);t["a"]=_},"37db":function(e,t,r){"use strict";var c=r("7a23"),n={class:"grid grid-cols-1 mb-8 lg:text-lg sm:grid-cols-3"};function a(e,t,r,a,i,o){return Object(c["I"])(),Object(c["h"])("ul",n,[Object(c["i"])("li",{class:Object(c["x"])("cart"===r.mode?["breadcrumb-active","breadcrumb-active-right-arrow"]:["breadcrumb-item","breadcrumb-right-arrow"])}," 1.購物車 ",2),Object(c["i"])("li",{class:Object(c["x"])("information"===r.mode?["breadcrumb-active","breadcrumb-active-right-arrow"]:["breadcrumb-item","breadcrumb-right-arrow"])}," 2.送出訂單 ",2),Object(c["i"])("li",{class:Object(c["x"])("pay"===r.mode?"breadcrumb-active":"breadcrumb-item")},"3.訂單付款",2)])}var i={props:["mode"]},o=(r("ad5e"),r("d959")),l=r.n(o);const s=l()(i,[["render",a],["__scopeId","data-v-49e298f1"]]);t["a"]=s},"7ed9":function(e,t,r){"use strict";r.r(t);var c=r("7a23"),n={class:"container px-4 mx-auto pt-[130px] lg:pt-[112px]"},a=Object(c["i"])("h2",{class:"mb-3 text-2xl font-bold"},"您選購的商品",-1),i=Object(c["i"])("h3",{class:"mb-3 text-2xl font-bold"},"收件資訊",-1),o={class:"max-w-[500px] ml-auto"},l=Object(c["l"])("立即付款"),s={class:"min-w-min"},d=Object(c["l"])(" 您的訂單編號是："),u={class:"block font-bold lg:inline w-[200px]"},b=Object(c["i"])("p",null,[Object(c["l"])("請務必記下訂單編號。 "),Object(c["i"])("span",{class:"block lg:inline"}," ( 可用於查詢訂單狀態 ) ")],-1);function O(e,t,r,O,j,p){var m=Object(c["R"])("BaseBreadcrumb"),f=Object(c["R"])("Breadcrumb"),h=Object(c["R"])("CartProductList"),g=Object(c["R"])("ReceiptInformation"),x=Object(c["R"])("BaseBtn"),v=Object(c["R"])("BaseDialog");return Object(c["I"])(),Object(c["h"])("div",null,[Object(c["i"])("div",n,[Object(c["m"])(m,{name:"購物車",class:"mb-3"}),Object(c["m"])(f,{mode:"pay"}),a,Object(c["m"])(h,{products:j.cartData,order:""},null,8,["products"]),i,Object(c["m"])(g,{order:j.order},null,8,["order"]),Object(c["i"])("div",o,[Object(c["m"])(x,{class:"w-full",onClick:p.payOrder},{default:Object(c["fb"])((function(){return[l]})),_:1},8,["onClick"])])]),Object(c["m"])(v,{show:j.isPay,title:"您的訂單：",onClose:p.closeIsPay},{default:Object(c["fb"])((function(){return[Object(c["i"])("div",s,[Object(c["i"])("p",null,[d,Object(c["i"])("span",u,Object(c["U"])(j.orderId),1)]),b])]})),_:1},8,["show","onClose"])])}var j=r("1da1"),p=(r("96cf"),r("ac1f"),r("5319"),r("d81d"),r("4fad"),r("2a0e")),m=r("cc68"),f=r("37db"),h={components:{CartProductList:p["a"],Breadcrumb:f["a"],ReceiptInformation:m["a"]},data:function(){return{cartData:[],order:{},orderId:"",isPay:!1}},methods:{orderInformation:function(){var e=this;return Object(j["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.orderId=e.$store.getters["forestageOrder/orderId"],""===e.orderId&&e.$router.replace("/cart"),t.next=4,e.$store.dispatch("forestageOrder/getOrder",e.orderId);case 4:e.order=e.$store.getters["forestageOrder/order"],e.cartData=Object.entries(e.order.products).map((function(e){return e[1]}));case 6:case"end":return t.stop()}}),t)})))()},payOrder:function(){var e=this;return Object(j["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("forestageOrder/payOrder");case 2:e.isPay=!e.isPay;case 3:case"end":return t.stop()}}),t)})))()},closeIsPay:function(){this.$router.replace("/order"),this.isPay=!this.isPay}},mounted:function(){this.orderInformation()}},g=r("d959"),x=r.n(g);const v=x()(h,[["render",O]]);t["default"]=v},"8e33":function(e,t,r){e.exports=r.p+"img/trash-can-solid.4839a2f8.svg"},ad5e:function(e,t,r){"use strict";r("f962")},cc68:function(e,t,r){"use strict";r("b0c0");var c=r("7a23"),n={class:"p-4 mt-3 mb-5 bg-gray-100 rounded-lg"},a={key:0,class:"flex items-center gap-2 mb-2"},i=Object(c["i"])("h3",{class:"ml-5 text-lg"},"訂單編號：",-1),o={key:1,class:"flex items-center gap-2 mb-2"},l=Object(c["i"])("h3",{class:"ml-5 text-lg"},"付款狀態：",-1),s={class:"flex items-center mb-2"},d=Object(c["i"])("p",{class:"mr-2 text-lg ml-14"},"姓名：",-1),u={class:"flex items-center mb-2"},b=Object(c["i"])("p",{class:"mr-2 text-lg ml-14"},"電話：",-1),O=["href"],j={class:"flex items-center mb-2"},p=Object(c["i"])("p",{class:"ml-5 mr-2 text-lg"},"電子信箱：",-1),m=["href"],f={class:"flex items-center mb-2"},h=Object(c["i"])("p",{class:"mr-2 text-lg ml-14"},"地址：",-1),g={class:"flex items-center mb-2"},x=Object(c["i"])("p",{class:"mr-2 text-lg"},"給賣家的話：",-1);function v(e,t,r,v,y,w){var I,k,P,C,U,R,_,q,$,B,D;return Object(c["I"])(),Object(c["h"])("ul",n,[r.order.id?(Object(c["I"])(),Object(c["h"])("li",a,[i,Object(c["i"])("p",null,Object(c["U"])(r.order.id),1)])):Object(c["g"])("",!0),void 0!==(null===(I=r.order)||void 0===I?void 0:I.id)?(Object(c["I"])(),Object(c["h"])("li",o,[l,Object(c["i"])("p",{class:Object(c["x"])({"text-red-600":!r.order.is_paid})},Object(c["U"])(r.order.is_paid?"已付款":"未付款"),3)])):Object(c["g"])("",!0),Object(c["i"])("li",s,[d,Object(c["i"])("p",null,Object(c["U"])(null===(k=r.order)||void 0===k||null===(P=k.user)||void 0===P?void 0:P.name),1)]),Object(c["i"])("li",u,[b,Object(c["i"])("a",{href:null!==(C="tel:+"+r.order.phone)&&void 0!==C?C:r.order.user.tel},[Object(c["i"])("p",null,Object(c["U"])(null===(U=r.order)||void 0===U||null===(R=U.user)||void 0===R?void 0:R.tel),1)],8,O)]),Object(c["i"])("li",j,[p,Object(c["i"])("a",{href:null!==(_="mailto:"+r.order.email)&&void 0!==_?_:r.order.user.email},[Object(c["i"])("p",null,Object(c["U"])(null===(q=r.order)||void 0===q||null===($=q.user)||void 0===$?void 0:$.email),1)],8,m)]),Object(c["i"])("li",f,[h,Object(c["i"])("p",null,Object(c["U"])(null===(B=r.order)||void 0===B||null===(D=B.user)||void 0===D?void 0:D.address),1)]),Object(c["i"])("li",g,[x,Object(c["i"])("p",null,Object(c["U"])(r.order.message),1)])])}var y={props:{order:{type:Object,required:!0}}},w=r("d959"),I=r.n(w);const k=I()(y,[["render",v]]);t["a"]=k},f962:function(e,t,r){}}]);
//# sourceMappingURL=chunk-57b9a631.7b6ce412.js.map