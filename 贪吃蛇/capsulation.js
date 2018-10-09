        
        //阶乘
        function text(n){
            if(n==1){
            return 1 ;
            }
            return  n * text(n-1);
        }


        //斐波那契数列
        function jc(n){
            if(n==1 || n==2){
                return 1;
            }
            return jc(n-1) + jc(n-2);
        }

        //判断是数组还是对象
        function type(a){
            var obj,
            toStr = Object.prototype.toString,
            toArr = "[object Array]";
            if(typeof(a) == "object"){
                return toStr.call(a) == toArr ? 'Array' : 'Object';
            }else{
                return typeof(a);
            }
        }
        
        //数组去重
        Array.prototype.unique = function(){
            for(var i = 0; i < this.length;i++){
                for(var j = i + 1; j < this.length;j++){
                    if(this[i] == this[j]){
                        this.splice(i,1);
                        i --;
                    }
                }
            }
            return arr;
        }
        
        
        //深度拷贝
        function deepClone(origin,targer){
			var targer = targer || {};
			toStr = Object.prototype.toString,
			toArr = ["object Array"];
			for(var prop in origin){
				if (origin.hasOwnProperty(prop)) {
					if(origin[prop] !== "null" && typeof(origin[prop]) =="object"){
						targer[prop] = toStr.call(origin[prop]) == toArr ? [] : {};
						deepClone(origin[prop], targer[prop]);

					}else{
						targer[prop] = origin[prop];
					}
				}
			}
			return targer;
        }
        
       //求滚轮距离方法
        function getScrollOffset(){
            if(window.pageYOffset){
                return {
                    x : window.pageXOffset,
                    y : window.pageYOffset
                }
            }else{
                return{
                    x : document.body.scrollLeft + document.documentElement.scrollLeft,
                    y : document.body.scrollTop + document.documentElement.scrollTop
                }
            }
        }


       //可视区窗口尺寸
        function getViewportOffset(){
            if(window.innerWidth){
                return {
                    W : window.innerWidth,
                    H : window.innerHeight
                }
            }else{
                if(document.compatMode === "BackCompat"){
                    return{
                        W : document.body.clientWidth,
                        H : document.body.clientHeight
                    }
                }else{
                    return{
                        W : document.documentElement.clientWidth,
                        H : document.documentElement.clientHeight
                    }
                }
            }
        }




        //查看元素尺寸
        function getElementPosition(elem){
            if(elme.offset){
                return{
                    w : elem.offsetWidth,
                    h : elem.offserHeight
                }
            }
        }
        
        //查询计算机样式
        function getStyle(elem,prop){
            if(window.getComputedStyle){
                return window.getComputedStyle(elem,null)[prop]
            }else{
                return elem.currentStyle[prop];
            }
        }
        //事件处理函数
        function addEvent(elem,type,handle){
            if(elem.addEventListener){
                elem.addEventListener(type,handle,false);
            }else if(elem.attachEvent){
                elem.attachEvent('on' + type,function(){
                    handle.call(elem);
                })
            }else{
                elem['on' + type] = handle;
            }

        }
        
    

        //遍历元素节点
        function retElementChild(node){
            var temp = {
                length : 0,
                push : Array.prototype.push,
                splice : Array.prototype.splice
            },
                child = node.childNodes,
                len = child.length;
    
            for(var i = 0;i < len; i++){
                if(child[i].nodeType === 1){
                    temp.push(child[i]);
                }
            }
            return temp;
        }


        //返回元素e的第层祖先元素节点
        function reParent(elem,n){
            while(elem && n ){
                elem = e.parentNode;
                n--;
            }
            return e;
        }

        //封装hasChildren();
        function hasChildren(demo){
            var child = demo.childNodes,
                len  = child.length;
            for(var i = 0; i < len;i++){
                if(child[i].nodeType == 1){
                    return true;
                }
            }
            return false;
        }

        //返回元素后面或者全面的第几个元素
        function retSibling(e,n){
            while(e && n){
                if(n > 0){
                    if(e = e.nextElementSibling){
                        e = e.nextElementSibling;
                    }else{
                        for(e = e.nextSibling;e && e.nodeType !=1; e = e.nextSibling);
                    }
                n--;
                }else{
                    if(e = e.previousElementSibling){
                        e = e.previousElementSibling;  
                    }else{
                        for(e = e.previousSibling;e && e.nodeType != 1;e = e.previousSibling);
                    }  
                n++;
                }
            }
            return e;
    }

    //查看元素相对文档坐标
    function getElementPosition(element){
        var elementNode = element
        var left = 0,top = 0;
        while(elementNode){
            if(elementNode.style.border == ""){
                left = left + elementNode.offsetLeft;
                top = top + elementNode.offsetTop ; 
            }else{
            left = left + elementNode.offsetLeft  + parseInt(elementNode.style.border);
            top = top + elementNode.offsetTop  + parseInt(elementNode.style.border);
            }
            elementNode = elementNode.offsetParent;
        }
        return{
            left
            ,top
        }
    }
    //查看计算机样式
    function getStyle(elem,prop){
        if(window.getComputedStyle){
            return window.getComputedStyle(elem,null)[prop];
        }else{
            return elem.currentStyle[prop];
        }
    } 

   //取消冒泡
   function stopBubble(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }   

    //阻止默认事件函数
    function cancelHandler(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    }

