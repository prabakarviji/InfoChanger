

var InfoContentFury = {
  
  app_id : chrome.runtime.id,

	initial:function(){

		var self = this ;
		chrome.runtime.onMessage.addListener(
		  function(request) {
		  	InfoContentFury.selectedOption = request.message;
		  	InfoContentFury.hideTopPanel(); 
		    if( request.message === "take-screenshot" ) {
		    	InfoContentFury.takeScreenShot();
		    }
		    else{
		      document.body.addEventListener('mousemove',self.handleMouseMove);
		      document.body.addEventListener('click',self.handleMouseClick);
		    }
		  }
		);
	},

	handleMouseMove:function(e){
		var elemTarget = e.target;
		InfoContentFury.unFocusPrevElem();
		e.target.className += " info-fury-border-chrome";
		InfoContentFury.focusedElem = elemTarget;

	},

  handleMouseClick:function(e){

		e.preventDefault();
		var textValue = e.target.textContent;
		InfoContentFury.clickedElem = e.target;
		InfoContentFury.stopNavigation();
		var option = InfoContentFury.selectedOption;    
		switch(option){
			case "text-change":
			  InfoContentFury.formatInfoFuryHeader(textValue);
			break;

			case "text-hide":
				InfoContentFury.applyBlurEffect(e.target);
			break;

			case "text-highlight":
				InfoContentFury.applyHighLight(e.target);
			break;
		}
		
  },
  stopNavigation:function(){

  	var self = InfoContentFury;
  	document.body.removeEventListener('mousemove',self.handleMouseMove);
    document.body.removeEventListener('click',self.handleMouseClick);
  },

	formatInfoFuryHeader:function(textValue){

		var headerElem =document.getElementById("info-fury-chrome");
		if(headerElem){
			headerElem.innerHTML = "";
		}
		else{
			var headerElem = this.renderHTMLElem("div","info-fury-chrome");
			document.body.appendChild(headerElem);
		}
		InfoContentFury.renderTopPanel(headerElem,textValue)
	},

	renderTopPanel:function(parentElem,textValue){
		var self = this;
		var innerPanel = this.renderHTMLElem("div","info-fury-innerPanel","info-fury-innerPanel");
		parentElem.appendChild(innerPanel);
		var textArea = this.renderHTMLElem("input","info-fury-textInput");
		textArea.setAttribute("type","text");
		textArea.value = textValue;
		innerPanel.appendChild(textArea);

		var closeImage = "chrome-extension://"+this.app_id+"/image/close.png";
		var okImage = "chrome-extension://"+this.app_id+"/image/success.png";

		var okButtton =  this.renderHTMLElem("img","info-fury-okButton","info-fury-closeButton");
		okButtton.src = okImage;
		okButtton.style.marginLeft ="-1%";
		okButtton.addEventListener("click",self.correctTextData)
		innerPanel.appendChild(okButtton);

		var closeButtton =  this.renderHTMLElem("img","info-fury-closeButton","info-fury-closeButton");;
		closeButtton.src = closeImage;
		closeButtton.style.marginLeft ="1%";
		closeButtton.addEventListener("click",self.hideTopPanel)
		innerPanel.appendChild(closeButtton)
	},

  correctTextData:function(){

  	var changedValue = document.getElementById("info-fury-textInput").value
  	InfoContentFury.clickedElem.textContent = changedValue;
  	InfoContentFury.removeCurrentElem(InfoContentFury.clickedElem);
  	InfoContentFury.hideTopPanel()
  },
  hideTopPanel:function(){
  	InfoContentFury.unFocusPrevElem();
  	var headerElem = document.getElementById("info-fury-chrome");
  	console.log(headerElem);
  	if(headerElem) document.body.removeChild(headerElem);
  },
	unFocusPrevElem:function(){

		var elemTarget = InfoContentFury.focusedElem ;
		if(elemTarget){
			InfoContentFury.removeCurrentElem(elemTarget);
		}
    
	},
	applyBlurEffect:function(elem){

		this.removeCurrentElem(elem);
		elem.className += " info-fury-blur-text";
	},

	applyHighLight:function(elem){

		this.removeCurrentElem(elem);
		elem.className += " info-fury-hightlight";
	},
  removeCurrentElem:function(elem){

  	elem.className = elem.
				className.replace( /(?:^|\s)info-fury-border-chrome(?!\S)/g , '' )
  },
  takeScreenShot:function(){
  	setTimeout(function(){ ;
	  	var newURL = "chrome-extension://"+this.app_id+"/index.html";
	    chrome.runtime.sendMessage({"message": "open_new_tab", "url": document});
    }, 500)
  },

  renderHTMLElem:function(tagName,id,classname){

  	var elem = document.createElement(tagName);
  	if(id) elem.id = id;
  	if(classname) elem.className = classname;
  	return elem;
  }
}


InfoContentFury.initial();