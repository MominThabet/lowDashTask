Array.prototype.indexOf=function(x){
    for(let i =0;i<this.length;i++){
        if(this[i]==x) return i;
    }
    return undefined;
}
Array.prototype.push=function(x){
    this[this.length] = x;
    return this;
}
Array.prototype.slice = function(s=0,e=this.length){
    let out=[];
    for(let i = s;i<e&&i<this.length;i++){
        out.push(this[i]);
    }
    return out;
}

// Array.prototype.splice = function(index,n=1){
//     let out=[];
//     for(let i =0;i<this.length;i++){
//         if(i==index){
//             out.push(this[i]);       
//         }
//         out.push(this[i]);
//     }
//     return this;
// }

function arrayPull(array ,...values){
    for(let x of values){
        while(collectionIncludes(array,x)){
            array.splice(array.indexOf(x),1);
        }
    }
    return array;
}
// var array = ['a', 'b', 'c', 'a', 'b', 'c'];
// console.log(arrayPull(array,'a','c'))
// console.log(array)
function arrayChunk(array,size=1){
    let arr=[];
    for(let i =0;i<array.length;){
        let temp =[];
        for(let j =0;j<size;j++,i++){
            temp.push(array[i]);
            if(i==array.length-1){
                arr.push(temp);
                return arr;
            }
        }
        arr.push(temp);
    }
    return arr;
}

// console.log(arrayChunk(['a', 'b', 'c', 'd']))

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
// console.log(arrayJoin([1,2, 'b', 'c']))
function identity(a) {return a};
function property(){
    
}
function matchesProperty(){

}
function matches(){

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
console.log(collectionEvery([true, 1, 7, 'yes'], Boolean))
var users = {
    1:{ 'user': 'barney', 'age': 36, 'active': false },
    2:{ 'user': 'fred',   'age': 50, 'active': false }
  };

console.log(collectionEvery(users, (u)=>u.age<40))

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


// console.log(collectionIncludes([1, 2, 3], 1))
// // // => true
 
// console.log(collectionIncludes([1, 2, 3], 1));
// console.log(collectionIncludes({ 'a': 1, 'b': 2  ,'c':1}, 3))
console.log(collectionIncludes('Momin thabet','ha'))

function collectionSize(collection){
    if(typeof collection =='string'){
        return collection.length;
    }else if(Array.isArray(collection)){
        return collection.length;
    }else{
        return Object.keys(collection).length;
    }
}
// console.log(collectionSize([1,2,3]));
// console.log(collectionSize({ 'a': 1, 'b': 2 }))
// console.log(collectionSize('pebbles'))
function arrayTake(array,n=1){
    let arr=[];
    for(let i=0;i<n && i<array.length;i++){
        arr[arr.length]=(array[i]);
    }
    return arr;
}
// console.log(arrayTake([1, 2, 3]))

// console.log(arrayTake([1, 2, 3],2))

// console.log(arrayTake([1, 2, 3],5))

// console.log(arrayTake([1, 2, 3],0))

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
// console.log(collectionSample({a:1,b:2}))
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
// console.log(collectionSome([false, 1, null, 'yes'], Boolean))

// console.log()

function arrayIntersection(...arrays){
    let out=[];
    for (let i of arrays[0]){
        if(collectionEvery(arrays,(arr)=>collectionIncludes(arr,i))){
            out.push(i)
        }
    }
    return out;
}
// console.log(arrayIntersection([1,2,3,4],[1,2,3],[1]))

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


// console.log(arrayUnion([2], [1, 2]))


function arrayCompact(array){
    let out=[];
    for(let e of array){
        if(e){
            out.push(e)
        }
    }

    return out;
}

// console.log(arrayCompact([0, 1, false, 2, '', 3]))

function arrayDifference(array,values){
    let diff=[];
    for(let e of array){
        if(!collectionIncludes(values,e)){
            diff.push(e)
        }
    }
    return diff;
}
// console.log(arrayDifference([2,1],[2,3]))
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

// console.log(arrayDrop([1,2,3]));
// console.log(arrayDrop([1,2,3],2));
// console.log(arrayDrop([1,2,3],5));
// console.log(arrayDrop([1,2,3],0));
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

// console.log(arrayFlatten([1, [2, [3, [4]], 5]]))
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

// console.log(arrayZip(['a'],[1,2,3],[true,false]))

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

// console.log(collectionFind(users,function(o){return o.age==1 &&o.active==true;}))


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

// console.log(objectAssign({'a':0},new Foo,new Bar))


function arrayUniq(array){
    let out=[];
    for(let e of array){
        if(!collectionIncludes(out,e)) out[out.length]=e;
    }
    return out;
}

// console.log(arrayUniq([2,1,2]))

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
// console.log(zipped)
// console.log(arrayUnzip(zipped))

function arrayZipObject(props,values){
    let out ={};
    for(let i = 0; i<props.length;i++){
        out[props[i]]=values[i];
    }
    return out;
}
// console.log(arrayZipObject(['a','b','c'],[1,3]));

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

// console.log(collectionCountBy([6.1, 4.2, 6.3], Math.floor))

// console.log(collectionCountBy(['one', 'two', 'three'], (e)=>e.length))
// console.log(collectionCountBy({a:1,b:2,c:3,d:2,f:3,l:3}))


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
// // console.log(arrayPullAt(array,[1,3]))
// // console.log(array)
// var pulled=arrayPullAt(array,1,3,4);

// console.log(array);
// // //=>['a','c']

// console.log(pulled);
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
// console.log(collectionMap([4,8],square))
// console.log(collectionMap({a:4,b:8},square))
// var users = [
//     { 'user': 'barney' },
//     { 'user': 'fred' }
// ];
// console.log(collectionMap(users,(u)=>u['user']));

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
// console.log(objectFindKey(users,(o)=>o.age<40));
// console.log(objectFindKey(users,(o)=>o.age==1&&o.active==true));
// console.log(objectFindKey(users,(o)=>o.active==false))
// console.log(objectFindKey(users,(o)=>o.active))
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
// console.log(objectOmit(object,['a'],'c'))

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
// console.log(arrayFindLastIndex(users,function(o) { return o.user == 'pebbles'; }))
// console.log(arrayFindLastIndex(users,(o)=>o.active==false));
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
// console.log(objectHas(object,'a.b'))


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

// // console.log(collectionFilter(users,function(o) { return !o.active; }))
// // console.log(collectionFilter(users, (o)=>o.age== 36&& o.active==true ))



function collectionKeyBy(collection,iteratee=identity){
    

}


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

// console.log(arrayFlattenDeep([1, [2, [3, [4]],5,[6],[[7]]]]))