var templ = (function(defaultDelim){
    function setDelim(d){
        d = d.map(function(x){return x.replace(/([\\\/\]\[}{)(^$|.*+?])/g,"\\$1")});
        return {
            "cmnt": new RegExp(d[0]+"![\\w\\W]*?"+d[1],"g"),
            "d0d1": new RegExp(d[0]+"|"+d[1]),
            "dlmt": new RegExp("^([\\w\\W]*?)"+d[0]+"=\\s*(\\S+)\\s+(\\S+)\\s*="+d[1]+"([\\w\\W]*?)$","g"),
            "nest": new RegExp("("+d[0]+")([#^\\/])(.+?)("+d[1]+")","g"),
            "prtl": new RegExp("(^\\s*)?"+d[0]+">(.+?)"+d[1],"mg"),
            "sctn": new RegExp(d[0]+"([#^])(.+?)"+d[1]+"([\\w\\W]*?)"+d[0]+"\\/\\2"+d[1],"g"),
            "vrbl": new RegExp(d[0]+"([{&]?)(.+?)}?"+d[1],"g"),
            "wspc": new RegExp("(^|\\n+)(\\s*?)("+d[0]+"([!#^\\/=>])([\\w\\W]+?)"+d[1]+")\\s*?(?=\\n|$)","g")}
    }
    function getCtx(d,k){
        for( var i = 0, c; i <= d.length && c === undefined; i++ ){
            try     {c = eval(((i<d.length?"d["+i+"].":"")+k).
                            replace(/this/g,"d[0]").
                            replace(/#(?!\d)/g,_Idx).
                            replace(/(\.\.\/)+/g,function(_){return "d["+(_.length/3)+"]."}).
                            replace(/(?:d\[\d+\]\.)+(d\[\d+\])/g,"$1").
                            replace(/\.\[/g,"[").
                            replace(/\.\.+/g,""))}
            catch(e){c = undefined}
        }
        return (Array.isArray(c) && c.length == 0) || (typeof c === "object" && Object.keys(c||{}).length == 0) || (!c && c != 0) ? undefined : c;
    }
    function render(t,d,p,re,progress){
        switch (progress||""){
            case "":
                pad = {};
                t = t === undefined ? "" : t.toString().
                    replace( re.nest, function(_,d0,type,key,d1){
                        _ = pad[key] = pad[key] || "";
                        if( type == "/" ) _ = pad[key] = pad[key].slice(0,-1);
                        else              pad[key] += " ";
                        return d0+type+key+_+d1}).
                    replace( re.wspc, function(_,nl,pad,tag,type,key){
                        return key.match(re.d0d1)? _ : nl+(type==">"?pad:"")+tag+"\0"}).
                    replace( /\0(?:\r?\n|$)/g, "").
                    replace( re.cmnt, "");
            case "dlmt":
                if( re.dlmt.test(t) ) return t.replace( re.dlmt, function(_,pre,d0,d1,post){
                    return render(pre,d,p,re,"sctn")+render(post,d,p,setDelim([d0,d1]))});
            case "sctn":
                t = t.replace( re.sctn, function(_,type,key,txt){
                    var c = getCtx(d,key);
                    if( typeof c === "function" ) txt = typeof (_ = c.call(d[0],txt)) !== "function" ? _ : _.call(d[0],txt,function(t){return render(t,d,p,re)});
                    return (!c && type == "#") || (c && type == "^") ? "" : Array.isArray(c) ? c.map(function(x,i){var j=_Idx;_Idx=i+1;var r=render(txt,[x].concat(d),p,re,"sctn");_Idx=j;return r}).join("") : render(txt,[c].concat(d),p,re,"sctn")});
            case "prtl":
                t = t.replace( re.prtl, function(_,pad,key){
                    return (pad||"")+render((getCtx([p].concat(d),key)||"").replace(/\n(?!$)/g,"\n"+(pad||"")),d,p,_RE)});
            case "vrbl":
                return t.replace( re.vrbl, function(_,noEsc,key){
                    if( typeof (_ = getCtx(d,key)) === "function" ) _ = render(_.call(d[0]),d,p,_RE);
                    return _ === undefined ? "" : (noEsc ? _ : document.createElement('div').appendChild(document.createTextNode(_)).parentNode.innerHTML.replace(/"/g,"&quot;"))});
        }
    }
    var _Idx, _RE = setDelim(defaultDelim);
    return {"ate": function(t,d,p){return render(t,[d],p,_RE)}};
})(["{{","}}"]);
