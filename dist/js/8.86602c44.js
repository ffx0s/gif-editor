webpackJsonp([8],{"2deL":function(o,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("lYqf"),l=e("mrWI"),n=e("6fgr"),r=e("QXMH"),i={data:function(){return{color:"",colorValue:0,alphaValue:1,globalFrame:!0}},methods:{onShow:function(o){o&&this.resetState()},resetState:function(){this.color="",this.colorValue=0,this.alphaValue=1,this.globalFrame=!0},restore:function(){a["a"].useTool("text").restore()},save:function(){a["a"].useTool("text").save({$type:this.globalFrame?"global":null})},modify:function(){var o=Object(n["c"])(this.color,this.alphaValue);a["a"].useTool("text").modify({fillStyle:o})},changeColor:function(o,t){this.colorValue=t,this.color=o,this.modify()},changeAlpha:function(o){this.alphaValue=o,this.modify()},changeText:function(){this.$textarea({value:a["a"].useTool("text").getCurrentElement().text,onConfirm:function(o){o.trim()&&a["a"].useTool("text").modify({text:o})}})}},components:{EditorToolLayout:r["default"],ColorPicker:l["a"]}},s=function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("editor-tool-layout",{attrs:{name:"text"},on:{"on-show":o.onShow,"on-restore":o.restore,"on-save":o.save,"on-global-frame":function(t){o.globalFrame=!o.globalFrame}}},[e("color-picker",{attrs:{colorValue:o.colorValue,alphaValue:o.alphaValue},on:{"on-change-color":o.changeColor,"on-change-alpha":o.changeAlpha}}),e("div",{attrs:{slot:"action"},slot:"action"},[e("button",{staticClass:"btn-outline-info btn-small",on:{click:o.changeText}},[o._v("修改文字")])])],1)},c=[],u=e("XyMi");function h(o){e("3H2b")}var f=!1,p=h,m="data-v-83f077e0",b=null,d=Object(u["a"])(i,s,c,f,p,m,b);t["default"]=d.exports},"3H2b":function(o,t,e){var a=e("JZbS");"string"===typeof a&&(a=[[o.i,a,""]]),a.locals&&(o.exports=a.locals);var l=e("rjj0").default;l("9baa5134",a,!0,{shadowMode:!1,sourceMap:!1})},JZbS:function(o,t,e){t=o.exports=e("FZ+f")(!1),t.push([o.i,"",""])}});
//# sourceMappingURL=8.86602c44.js.map