webpackJsonp([10],{"89Hp":function(e,a,o){"use strict";Object.defineProperty(a,"__esModule",{value:!0});o("EuXz");var t=o("lYqf"),i=o("mrWI"),l=o("6fgr"),s=o("QXMH"),n={data:function(){return{color:"",colorValue:0,alphaValue:1,globalFrame:!0,showMenu:!1,sizeClass:"small",sizeList:[{name:"huge",size:12},{name:"large",size:9},{name:"middle",size:6},{name:"small",size:2}],strokeStyle:"#000"}},methods:{onShow:function(e){e&&this.resetState()},resetState:function(){this.color="",this.colorValue=0,this.alphaValue=1,this.globalFrame=!0,this.strokeStyle="#000",this.sizeClass="small"},restore:function(){t["a"].useTool("pencil").restore()},save:function(){t["a"].useTool("pencil").save({$type:this.globalFrame?"global":null})},modify:function(){var e=Object(l["c"])(this.color,this.alphaValue);this.strokeStyle=e,t["a"].useTool("pencil").modify({strokeStyle:e})},changeColor:function(e,a){this.colorValue=a,this.color=e,this.modify()},changeAlpha:function(e){this.alphaValue=e,this.modify()},changeSize:function(e){this.sizeClass=e.name,t["a"].useTool("pencil").modify({lineWidth:e.size})}},components:{EditorToolLayout:s["default"],ColorPicker:i["a"]}},r=function(){var e=this,a=e.$createElement,o=e._self._c||a;return o("editor-tool-layout",{attrs:{name:"pencil",enabledRecord:!0},on:{"on-show":e.onShow,"on-restore":e.restore,"on-save":e.save,"on-global-frame":function(a){e.globalFrame=!e.globalFrame}},nativeOn:{click:function(a){e.showMenu=!1}}},[o("color-picker",{attrs:{colorValue:e.colorValue,alphaValue:e.alphaValue},on:{"on-change-color":e.changeColor,"on-change-alpha":e.changeAlpha}}),o("div",{attrs:{slot:"action"},slot:"action"},[o("div",{staticClass:"size",on:{click:function(a){a.stopPropagation(),e.showMenu=!e.showMenu}}},[o("i",{class:"current "+e.sizeClass,style:{backgroundColor:e.strokeStyle}}),o("transition",{attrs:{name:"fade"}},[o("ul",{directives:[{name:"show",rawName:"v-show",value:e.showMenu,expression:"showMenu"}]},e._l(e.sizeList,function(a){return o("li",{key:a.size,on:{click:function(o){e.changeSize(a)}}},[o("i",{class:a.name,style:{backgroundColor:e.strokeStyle}})])}))])],1)])],1)},c=[],h=o("XyMi");function u(e){o("8baX")}var d=!1,m=u,f="data-v-392ed890",p=null,g=Object(h["a"])(n,r,c,d,m,f,p);a["default"]=g.exports},"8baX":function(e,a,o){var t=o("v3/k");"string"===typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);var i=o("rjj0").default;i("4ff0dd9a",t,!0,{shadowMode:!1,sourceMap:!1})},"v3/k":function(e,a,o){a=e.exports=o("FZ+f")(!1),a.push([e.i,".size[data-v-392ed890]{position:relative;width:2rem;height:2rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer}.size i[data-v-392ed890]{margin:0 auto;display:block;border-radius:50%;background-color:#282c34}.size .huge[data-v-392ed890]{width:1rem;height:1rem}.size .large[data-v-392ed890]{width:.75rem;height:.75rem}.size .middle[data-v-392ed890]{width:.5rem;height:.5rem}.size .small[data-v-392ed890]{width:.25rem;height:.25rem}.size ul[data-v-392ed890]{position:absolute;width:100%;top:-4.5rem;background:hsla(0,0%,100%,.9)}.size ul li[data-v-392ed890]{width:100%;height:1.5625rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}",""])}});
//# sourceMappingURL=10.273ac16c.js.map