Array.prototype.indexOf=function(x){
    for (let indx = 0 ; indx < this.length ; indx++){
        if ( this[indx] == x) {
            return i ;
        };
    }
    return undefined;
}


Array.prototype.push = function(element){
    this[this.length] = element;
    return this;
}


Array.prototype.slice = function( startIndex =0, endIndex =this.length){
    let output = [] ;
    for(let indx = startIndex ; indx < endIndex && indx <this.length ; indx++){
        output.push(this[indx]);
    }
    return output;
}


function arrayPull(array ,...values){
    for(let element of values){
        while(collectionIncludes(array,element)){
            array.splice(array.indexOf(element),1);
        }
    }
    return array;
}


// var array = ['a', 'b', 'c', 'a', 'b', 'c'];
// //console.log(arrayPull(array,'a','c'))
// //console.log(array)


function arrayChunk(array,size=1){
    let output=[];
    for(let index = 0; index <array.length;){
        let temp =[];
        for(let j = 0 ; j < size ; j++, index++){
            temp.push(array[index]);
            if(index==array.length-1){
                output.push(temp);
                return output;
            }
        }
        output.push(temp);
    }
    return output;
}


// //console.log(arrayChunk(['a', 'b', 'c', 'd']))


function arrayJoin(array,separator=','){
    let str ='';
    for(let i=0;i<array.length;i++){
        str+=array[i];
        if(i!=array.length-1){
            str+=separator;
        }
    }
    return str;
}


// //console.log(arrayJoin([1,2, 'b', 'c']))


function identity(a) {return a};


function property(){
    //this should have same process as in _.property to handle strings
}


function matchesProperty(){
   //this should have same process as in _.matchesProperty to handle arrays;
}


function matches(){
    //this should have same process as in _.matches(source) to handle objs
}


function predicateType(predicate){
    if (typeof predicate == "string"){
        return property;
    }else if (Array.isArray(predicate)){
        return matchesProperty;
    }else if (typeof predicate == 'object'){
        return matches;
    }else {
        return predicate;
    }
}


function collectionEvery(collection,predicate=identity){   
    predicate = predicateType(predicate);
    if(Array.isArray(collection)){
        if(collection.length ==0) return true;
        for(let i of collection){
            if(!predicate(i)) return false;
        } return true;
    }else{
        let keys =Object.keys(collection)
        if(keys.length==0) return true;
        for(let key of keys){
            if(!predicate(collection[key])) return false;
        } return true;
    }
     
}


// let o=[]
// //console.log(collectionEvery([true, 1, 7, 'yes'], Boolean))


var users = {
    1:{ 'user': 'barney', 'age': 36, 'active': false },
    2:{ 'user': 'fred',   'age': 50, 'active': false }
  };


// //console.log(collectionEvery(users, (u)=>u.age<40))


function collectionIncludes(collection,value,fromIndex=0){
    if(typeof collection =='string'){
        let str = collection;
        if( fromIndex>0){
            str = collection.slice(fromIndex)
        }else if (fromIndex<0) str = collection.slice(0,collection.length+fromIndex);
        for(let i = 0 ;i<str.length;i++){
            if(str.slice(i,i+value.length)===value){
                return true;
            }
        }return false;
    }else if(Array.isArray(collection)){
        let i =0;
        let end = collection.length
        if (fromIndex>=0)  i =fromIndex;
        else end = collection.length+fromIndex;
        for(i;i<end;i++){
            if (collection[i]===value) return true;
        }return false;
    }else{
        let vals =Object.values(collection);
        let i =0;
        let end =vals.length;
        if (fromIndex>=0) i=fromIndex;
        else end=vals.length+fromIndex;
        for(;i<end;i++){
            if(vals[i]===value){
                return true;
            }
        }return false;
    }
}


// for(;i<end;i++){
//     if(vals[i]===value){
//         return true;
//     }
// }return false;


// //console.log(collectionIncludes([1, 2, 3], 1))
// // // => true
 
// //console.log(collectionIncludes([1, 2, 3], 1));
// //console.log(collectionIncludes({ 'a': 1, 'b': 2  ,'c':1}, 3))
// //console.log(collectionIncludes('Momin thabet','ha'))


function collectionSize(collection){
    if(typeof collection =='string'){
        return collection.length;
    }else if(Array.isArray(collection)){
        return collection.length;
    }else{
        return Object.keys(collection).length;
    }
}


// //console.log(collectionSize([1,2,3]));
// //console.log(collectionSize({ 'a': 1, 'b': 2 }))
// //console.log(collectionSize('pebbles'))


function arrayTake(array,n=1){
    let arr=[];
    for(let i=0;i<n && i<array.length;i++){
        arr[arr.length]=(array[i]);
    }
    return arr;
}


// //console.log(arrayTake([1, 2, 3]))

// //console.log(arrayTake([1, 2, 3],2))

// //console.log(arrayTake([1, 2, 3],5))

// //console.log(arrayTake([1, 2, 3],0))


function collectionSample(collection){
    if(Array.isArray(collection)){
        let rand =Math.floor(Math.random()*collection.length);
        return collection[rand]
    }else{
        let vals= Object.values(collection);
        let rand =Math.floor(Math.random()*vals.length);
        return vals[rand]
    }
}


// //console.log(collectionSample({a:1,b:2}))


function collectionSome(collection,predicate=identity){
    if(Array.isArray(collection)){
        if(collection.length ==0) return false;
        for(let i of collection){
            if(predicate(i)) return true;
        } return false;
    }else{
        let keys =Object.keys(collection)
        if(keys.length==0) return false;
        for(let key of keys){
            if(predicate(collection[key])) return true;
        } return false;
    }
}


// //console.log(collectionSome([false, 1, null, 'yes'], Boolean))

// //console.log()


function arrayIntersection(...arrays){
    let out=[];
    for (let i of arrays[0]){
        if(collectionEvery(arrays,(arr)=>collectionIncludes(arr,i))){
            out.push(i)
        }
    }
    return out;
}
// //console.log(arrayIntersection([1,2,3,4],[1,2,3],[1]))


function arrayUnion(...arrays){
    let out =[];
    for(let arr of arrays){
        for(let e of arr){
            if(collectionIncludes(out,e)){
                continue;
            }else{
                out.push(e)
            }
        }
    }
    return out;
}


// //console.log(arrayUnion([2], [1, 2]))


function arrayCompact(array){
    let out=[];
    for(let e of array){
        if(e){
            out.push(e)
        }
    }

    return out;
}


// //console.log(arrayCompact([0, 1, false, 2, '', 3]))


function arrayDifference(array,values){
    let diff=[];
    for(let e of array){
        if(!collectionIncludes(values,e)){
            diff.push(e)
        }
    }
    return diff;
}


// //console.log(arrayDifference([2,1],[2,3]))


function arrayDrop(array,n=1){
    let out = [];
    let i=0;
    for(i;i<n;i++){
        continue;
    }
    for(i;i<array.length;i++){
        out.push(array[i])
    }

    return out;
}


// //console.log(arrayDrop([1,2,3]));
// //console.log(arrayDrop([1,2,3],2));
// //console.log(arrayDrop([1,2,3],5));
// //console.log(arrayDrop([1,2,3],0));


function arrayFlatten(array){
    let out=[];
    for(let e of array){
        if(Array.isArray(e)){
            out.push(...e);
        }else{
            out.push(e)
        }
    }
    return out;
}


// //console.log(arrayFlatten([1, [2, [3, [4]], 5]]))


function arrayZip(...arrays){
    let out=[];
    let max=0;
    for(let arr of arrays){
        max = arr.length>max? arr.length :max;
    }
    for(let i = 0; i<max;i++){
        let temp=[];
        for(let arr of arrays){
            temp.push(arr[i])
        }
        out.push(temp);
    }
    return out;
}


// //console.log(arrayZip(['a'],[1,2,3],[true,false]))


function collectionFind(collection,predicate=identity,fromIndex=0){
    if(Array.isArray(collection)){
        if(collection.length ==0) return -1;
        let i = fromIndex;
        for(i;i<collection.length;i++){
            if(predicate(collection[i])) return collection[i];
        }
    }else{
        let keys =Object.keys(collection)
        if(keys.length==0) return -1;
        let i = fromIndex;
        for(i;i<keys.length;i++){
            if(predicate(collection[keys[i]])) return collection[keys[i]];
        } return -1;
    }    
}


// var users = [
//     {'user':'barney','age':36,'active':true},
//     {'user':'fred','age':40,'active':false},
//     {'user':'pebbles','age':1,'active':true}
// ];

// //console.log(collectionFind(users,function(o){return o.age==1 &&o.active==true;}))


function objectAssign(object,...sources){
    for(let source of sources){
        for(let key of Object.keys(source)){
            object[key] = source[key]
        }
    }
    return object
}


// function Foo() {
//     this.a = 1;
// }

// function Bar() {
//     this.c = 3;
// }

// Foo.prototype.b = 2;
// Bar.prototype.d = 4;

// //console.log(objectAssign({'a':0},new Foo,new Bar))


function arrayUniq(array){
    let out=[];
    for(let e of array){
        if(!collectionIncludes(out,e)) out[out.length]=e;
    }
    return out;
}


// //console.log(arrayUniq([2,1,2]))


function arrayUnzip(array){
    let out=[];
    let max=0;
    for(let arr of array){
        max = arr.length>max? arr.length :max;
    }
    for(let i = 0; i<max;i++){
        let temp=[];
        for(let arr of array){
            temp.push(arr[i])
        }
        out.push(temp);
    }
    return out;
}


// let zipped = arrayZip(['a','b'],[1,2,3],[true,false]);
// //console.log(zipped)
// //console.log(arrayUnzip(zipped))


function arrayZipObject(props,values){
    let out ={};
    for(let i = 0; i<props.length;i++){
        out[props[i]]=values[i];
    }
    return out;
}


// //console.log(arrayZipObject(['a','b','c'],[1,3]));


function collectionCountBy(collection,iteratee=identity){
    let out ={};
    let arr;
    if(Array.isArray(collection)){
        arr=collection;
    }else{
        arr =Object.values(collection);       
    }
        for(let i of arr){
            if(out[iteratee(i)]){
                out[iteratee(i)]+= 1;
            }else{
                out[iteratee(i)]=1
            }
        }
    return out;
}


// //console.log(collectionCountBy([6.1, 4.2, 6.3], Math.floor))

// //console.log(collectionCountBy(['one', 'two', 'three'], (e)=>e.length))
// //console.log(collectionCountBy({a:1,b:2,c:3,d:2,f:3,l:3}))


function arrayPullAt(array,...indexes){
    let out =[];
    let len =array.length;
    if(Array.isArray(indexes[0])){
        indexes =indexes[0];
    }
    for (let i =0;i<len;i++){
        if(collectionIncludes(indexes,i)){
            out.push(array[i]);
        }else{
            array.push(array[i])
        }
    }
    for(let i =0;i<len;i++){
        array.shift()
    }
    return out;
}


// var array=['a','b','c','d'];
// // //console.log(arrayPullAt(array,[1,3]))
// // //console.log(array)
// var pulled=arrayPullAt(array,1,3,4);

// //console.log(array);
// // //=>['a','c']

// //console.log(pulled);


function collectionMap(collection,iteratee=identity){
    let out=[];
    if(Array.isArray(collection)){
        for(let i of collection){
            out.push(iteratee(i));
        }
    }else{
        for(let i of Object.keys(collection)){
            out.push(iteratee(collection[i]))
        }
    }
    return out;
}


// function square(n) {
//     return n * n;
// }
// //console.log(collectionMap([4,8],square))
// //console.log(collectionMap({a:4,b:8},square))
// var users = [
//     { 'user': 'barney' },
//     { 'user': 'fred' }
// ];
// //console.log(collectionMap(users,(u)=>u['user']));


function objectFindKey(object,predicate=identity){
    let keys =Object.keys(object)
        if(keys.length==0) return undefined;
        for(let i=0;i<keys.length;i++){
            if(predicate(object[keys[i]])) return keys[i];
        } return undefined;   
}


var users = {
    'barney':  { 'age': 36, 'active': true },
    'fred':    { 'age': 40, 'active': false },
    'pebbles': { 'age': 1,  'active': true }
};


// //console.log(objectFindKey(users,(o)=>o.age<40));
// //console.log(objectFindKey(users,(o)=>o.age==1&&o.active==true));
// //console.log(objectFindKey(users,(o)=>o.active==false))
// //console.log(objectFindKey(users,(o)=>o.active))


function objectOmit(object,...paths){
    let out ={};
    let keys =Object.keys(object);
    let newPaths=arrayFlattenDeep(paths);
    for(let key of keys){
        if(!collectionIncludes(newPaths,key)){
            out[key]=object[key];
        }
    }
    return out;
}


// var object = { 'a': 1, 'b': '2', 'c': 3 };
// //console.log(objectOmit(object,['a'],'c'))


function arrayFindLastIndex(array,predicate=_.identity,fromIndex=array.length-1){
    if(array.length ==0) return -1;
    let i =fromIndex;
    for(i;i>-1;i--){
        if(predicate(array[i])) return i;
    }return -1
}


// var users = [
//       { 'user': 'barney',  'active': true },
//       { 'user': 'fred',    'active': false },
//       { 'user': 'pebbles', 'active': true }
// ];
// //console.log(arrayFindLastIndex(users,function(o) { return o.user == 'pebbles'; }))
// //console.log(arrayFindLastIndex(users,(o)=>o.active==false));


function objectHas(object,path){
    if(typeof path=='string'){
        return objectHas(object,splitter(path));
    }
    else if (Array.isArray(path)){
        let o=object;
        for(let i =0;i<path.length;i++){
            o = o[path[i]];
        }
        return o?true:false;
    }
    
}


// var object = { 'a': { 'b': 7 } };
// // var other = objectCreate({ 'a': _.create({ 'b': 2 }) });
// //console.log(objectHas(object,'a.b'))


function splitter(str,spliter='.'){
    let out =[];
    let st='';
    for(let c of str){
        if (c == spliter){
            out.push(st);
            st='';
        }else{
            st+=c;
        }
    }
    out.push(st);
    return out;
}


function collectionFilter(collection, predicate=identity){
    let out=[];
    if(Array.isArray(collection)){
        for(let i of collection){
            if(predicate(i)){
                out.push((i))
            };
        }
    }else{
        for(let i of Object.keys(collection)){
            if(predicate(i)){
                out.push((collection[i]));
            }
        }
    }
    return out;
}
  

// var users = [
//     { 'user': 'barney', 'age': 36, 'active': true },
//     { 'user': 'fred',   'age': 40, 'active': false },
//     { 'user': 'asas', 'age': 36, 'active': true },

// ];

// // //console.log(collectionFilter(users,function(o) { return !o.active; }))
// // //console.log(collectionFilter(users, (o)=>o.age== 36&& o.active==true ))


function collectionKeyBy(collection,iteratee=identity){
    let out ={};
    for(let i in collection){
        out[iteratee(collection[i])]=collection[i];
    }    
    return out;
}


// var array = [
//       { 'dir': 'left', 'code': 97 },
//       { 'dir': 'right', 'code': 100 }
// ];

// let obj ={
//     a:7,b:8,c:9,
// }
// //console.log(collectionKeyBy(array,function(o) {
//       return String.fromCharCode(o.code);
//     }));
// //console.log(collectionKeyBy(array,o=>o.dir))
// //console.log(collectionKeyBy(obj,o=>o))


function arrayDropRightWhile(array,predicate=identity){
    let out=[];
    predicate=predicateType(predicate);
    for(let e of array){
        if(!predicate(e)){
            out.push(e)
        }
    }
    return out;
}


// var users = [
//      { 'user': 'barney', 'active': true },
//      { 'user': 'fred',  'active': false },
//      { 'user': 'pebbles', 'active': false }
// ];

// //console.log(arrayDropRightWhile(users, function(o) { return !o.active; }));


function arrayRemove(array,predicate=identity){
    let out=[];
    for(let e of array){
        if(predicate(e)){
            out.push(e);
        }
    }
    arrayPull(array,...out);
    return out;
}


// var array = [1, 2, 3, 4];
// var evens = arrayRemove(array, function(n) {
//   return n % 2 == 0;
// });
 
// //console.log(array);
// // => [1, 3]
 
// //console.log(evens);


function objectAssignIn(object,...sources){
    for(let source of sources){
        for(let key in (source)){
            object[key] = source[key]
        }
    }
    return object    
}


// function Foo() {
//     this.a = 1;
// }
   
// function Bar() {
//     this.c = 3;
// }
   
// Foo.prototype.b = 2;
// Bar.prototype.d = 4;

// //console.log(objectAssignIn({ 'a': 0 }, new Foo, new Bar));


function objectSet(object,path,value){
    path = (typeof path ==='string')? collectionFilter(path.split(/[.\[\]]/),(x)=>x!=''):path;
    let len =path.length-1;
    let obj =object; 
    for(var i =0;i<len;i++){
        if((/\d/.test(path[i+1]))){
            obj[path[i]]= obj[path[i]] ||[];
        }else{
        
            obj[path[i]]= obj[path[i]] ||{};
        } 
        obj =obj[path[i]];
    }
    obj[path[i]]=value;
    return object;
}


var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
// console.log(objectSet(object, 'a[0].b.c', 4));
// console.log(object.a);
// // // // => 4
 
// objectSet(object, ['x', '0', 'y', 'z'], 5);
// console.log(object.x);


function collectionInvokeMap(collection,path,...args){
    let out =[];
    path = typeof path === "function"?path :collection[path];
    for(let prop in collection){
        out.push(path.call(collection[prop],args[0]));
    }
    return out;
}


// console.log(collectionInvokeMap([[4, 1, 7], [3, 2, 1]], 'filter',(x)=>x%2==0));
// console.log(collectionInvokeMap([123,456],String.prototype.split,''))


function collectionOrderBy(collection,iteratee=[identity],order){
    let out =[];
    // order[0]=order[0]?order[0]:'as';
    console.log(order)
    collection = Array.isArray(collection) ? collection : Object.values(collection);
    out.push( collection[0] );
    let repeated =[];
    for(let i=1;i<collection.length;i++){
        for(let j=0 ; j < out.length;j++){
            if(iteratee[0](collection[i])<iteratee[0](out[j])) { 
                out.splice(j,0,collection[i]);
                break;
            }else if(iteratee[0](collection[i])==iteratee[0](out[j])){
                if(!repeated.includes(out[j])){
                    repeated.push(out[j])
                }
                if(!repeated.includes(collection[i]))
                    repeated.push(collection[i]);
            }if(j==out.length-1) {
                out.push(collection[i]);
                break;
            }
        }
    }
    if(order[0]==='desc'){
        out.reverse();
    }
    if(iteratee.length==1){
        return out;
    }else{
    let reduced = Array.from(new Set(repeated.map(x => iteratee[0](x))))
    for(let r of reduced){
        let f = out.findIndex(  (x)=>iteratee[0](x) ==(r) );
        let l = arrayFindLastIndex(out,(x)=>iteratee[0](x)==(r));
        let temp = collectionOrderBy(out.slice(f,l+1),iteratee.slice(1),order.slice(1));
        out.splice(f,temp.length,...temp);
    }}
    
    return out;
}


var users = [
    { 'user': 'fred',   'age': 39 ,n:1},
    { 'user': 'barney', 'age': 60 ,n:3},
    { 'user': 'barney', 'age': 60 ,n:21},
    { 'user': 'fred',   'age': 25 ,n:4},
    { 'user': 'barney', 'age': 50 ,n:5}
];


// console.log(collectionOrderBy(users, [function(o) { return o.n; }],['desc']))


console.log(collectionOrderBy(users, [function(o) { return o.user; },function(o) { return o.age; },o=> o.n] ,['desc','desc','asec']))


function collectionPartition(collection,predicate=identity){
    predicate = predicateType(predicate);
    let out =[[],[]];
    for(let i in collection){
        if(predicate(collection[i])){
            out[0].push(collection[i]);
        }else {
            out[1].push(collection[i]);
        }
    }
    return out;
}


// console.log(collectionPartition(users, function(o) { return o.active; }))


function arrayFindIndex(array,predicate=identity,fromIndex=0){
    predicate =predicateType(predicate);
    if(array.length ==0) return -1;
        let i = fromIndex;
        for(i;i<array.length;i++){
            if(predicate(array[i])) return i;
        }return -1;

}


// var users = [
//     { 'user': 'barney',  'active': false },
//     { 'user': 'fred',    'active': false },
//     { 'user': 'pebbles', 'active': true }
// ];
// console.log(arrayFindIndex(users, function(o) { return o.user == 'barney'; }))


function objectInvert(object){
    let out={};
    for(let prop in object){
        out[object[prop]]=prop;
    }
    return out;
}


// console.log(objectInvert({a:1,b:2,c:[1,2]}))


function objectUpdate(object,path,updater){
    // return objectSet(object,path,)
    path = (typeof path ==='string')? collectionFilter(path.split(/[.\[\]]/),(x)=>x!=''):path;
    let len =path.length-1;
    let obj =object;
    for(var i =0;i<len;i++){
        if((/\d/.test(path[i+1]))){
            obj[path[i]]= obj[path[i]] ||[];
        }else{
        
            obj[path[i]]= obj[path[i]] ||{};
        } 
        obj =obj[path[i]];
    }
    obj[path[i]]=updater(obj[path[i]]);
    return object;
}


// var object = { 'a': [{ 'b': { 'c': 3 } }] };
// objectUpdate(object, 'a[0].b.c', function(n) { return n * n; })
// console.log(object.a[0].b.c)
// objectUpdate(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; })
// console.log(object.x)


function objectTransform(object,iteratee=identity,accumulator){

    if(Array.isArray(object)){
        accumulator = typeof accumulator ==='undefined'? []:accumulator ;
        for(let e of object)
            if(iteratee(accumulator,e) ===false){
                return accumulator
            };

    }else{
    for(let prop in object){
        accumulator = typeof accumulator ==='undefined'? {}:accumulator ;
        if(iteratee(accumulator,object[prop],prop)===false) return accumulator;
    }}
    return accumulator;
}


// console.log(objectTransform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
//       (result[value] || (result[value] = [])).push(key);
//     }))

// console.log(objectTransform([2, 3, 4], function(result, n) {
//     result.push(n *= n);
//     return n % 2 == 0;
//   },[]));


function arrayFromPairs(pairs){
    let out={};
    for(let pair of pairs){
        out[pair[0]]=pair[1];
    }
    return out;
}


// console.log(arrayFromPairs([['a', 1], ['b', 2]]))


function arrayFlattenDeep(array){
    let out =[];
    function insideFun(arr){
        for(let i of arr){
            if (Array.isArray(i)){
                insideFun(i);
            }else 
                out.push(i);
            }
    };
    insideFun(array)
    return out;
}


// //console.log(arrayFlattenDeep([1, [2, [3, [4]],5,[6],[[7]]]]))


function baseMerger(object,source){
    for(let prop in source){
        if(!prop in object){
            object[prop] =source[prop];
        }else{
            if(Array.isArray(object[prop]) && Array.isArray(source[prop])){
                for(let i=0;i<source[prop].length;i++){
                    if(typeof object[prop][i] =='object' && typeof source[prop][i] =='object'){
                        baseMerger(object[prop][i],source[prop][i])
                    }else{
                        object[prop][i]=source[prop][i];
                    }
                }
            }else if (typeof object[prop] =='object' && typeof source[prop] =='object'){
                baseMerger(object[prop],source[prop]);
            }else{
                object[prop]=source[prop];
            }
        }
    }
}


function objectMerge(object, ...sources){
    for(let source of sources){
        baseMerger(object,source);
    }
    return object;
}


// var object = {
//     'a': [{ 'b': 2 }, { 'd': 4 }]
// };
   
// var other = {
// 'a': [{ 'b': 3 }, { 'e': 5 }]
// };
   
// console.log(objectMerge(object,other))


const customSort = function(key){
    return (a,b)=> (a[key]>b[key])? 1 :((a[key])<b[key])?-1:0;
}
//    out.splice(j,0,collection[i]);


function collectionSortBy(collection,iteratee=[identity]){
    let out =[];
    collection = Array.isArray(collection) ? collection : Object.values(collection);
    out.push(collection[0]);
    let repeated =[];
    for(let i=1;i<collection.length;i++){
        for(let j=0 ; j<out.length;j++){
            if(iteratee[0](collection[i])<iteratee[0](out[j])) { 
                out.splice(j,0,collection[i]);
                break;
            }else if(iteratee[0](collection[i])==iteratee[0](out[j])){
                if(!repeated.includes(out[j])){
                   
                    repeated.push(out[j])
                }
                if(!repeated.includes(collection[i]))
                    repeated.push(collection[i]);
            }if(j==out.length-1) {
                out.push(collection[i]);
                break;
            }
        }
    }
    if(iteratee.length == 1) {
        return out;

    } else {
        let reduced =Array.from(new Set(repeated.map(x=>iteratee[0](x))))
        for(let r of reduced){
            let f = out.findIndex((x)=>iteratee[0](x)==(r));
            let l = arrayFindLastIndex(out,(x)=>iteratee[0](x)==(r));
            let temp = collectionSortBy(out.slice(f,l+1),iteratee.slice(1));
            out.splice(f,temp.length,...temp);
        }   
    }


    return out;
}


// console.log(collectionSortBy([5,6,7,1,14,2,99]))

// var users = [
//     { 'user': 'fred',   'age': 39 ,n:1},
//     { 'user': 'barney', 'age': 60 ,n:3},
//     { 'user': 'barney', 'age': 60 ,n:2},
//     { 'user': 'fred',   'age': 25 ,n:1},
//     { 'user': 'barney', 'age': 50 ,n:1}
// ];
// console.log(collectionSortBy(users, [function(o) { return o.user; }]))
// console.log(collectionSortBy(users, [function(o) { return o.user; },function(o) { return o.age; },o=> o.n]))


function after(n,func){
    return ()=>{
        n-=1;
        if (n<0){
            return func();
        }
    }
}


// const done = after(3,()=>console.log('done mf'));
// done()
// done()
// done()
// done()
//console.log(done())


const delay = function(func,wait,...args){
    return setTimeout(
        ()=>{
            for(let e of args)
                func(e);
            },wait
    )
}


// //console.log(delay((t)=>//console.log(t),1000,'later'));


function reversed(array){
    for(let i =0,j=array.length-1;i<Math.floor(array.length/2) ;i++,j--){
        [array[i],array[j]]=[array[j],array[i]];
    }
    return array;
}


function flip(func){
    return (...x)=>{
        // //console.log(reversed(x));
        return func(reversed(x))}
}


// let flipped =flip((e)=>e.map(i=>i*i));
// //console.log(flipped(1,2,3,4))


function unary(func){
    return (...arg)=>{
        return func(arg[0])
    }
}


// console.log(collectionMap(['6','8'],unary(parseInt)))


function collectionReduce(collection,iteratee=identity,accumulator){
    if(Array.isArray(collection)){
        if(accumulator!==undefined) {
            for(let element of collection){
                accumulator = iteratee(accumulator,element)
            }
        }else{
            accumulator=collection[0];
            for(let i =1;i<collection.length;i++){
                accumulator =iteratee(accumulator,collection[i])
            }
        }
        return accumulator ;
    }else{
        if(accumulator!==undefined) {
            for(let k in collection){
                accumulator = iteratee(accumulator,collection[k],k);
            }
        }else{
            accumulator =Object.values(collection)[0];
            let keys = Object.keys(collection)
            for(let i =1;i<keys.length;i++){
                accumulator = iteratee(accumulator,collection[keys[i]],keys[i]);
            }
        }
        return accumulator;
    }
}


// console.log(collectionReduce(['a','b'],(sum,n)=>sum+n))

// console.log(collectionReduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value,key) {
//       (result[value] || (result[value] = [])).push(key);
//       return result;
//     }, {}));

// const toInt = (string)=>{
//     let num = 0;
//     for(let indx =0 , tens=string.length-1 ; indx<string.length ; indx++,tens--){
//         num+=(string[indx]*(10**tens))
//     }
//     return BigInt(num);
// }

// var multiply = function(num1, num2) {
//     console.log(toInt(num1)*toInt(num2))
//     return String(toInt(num1)*toInt(num2))
// };
