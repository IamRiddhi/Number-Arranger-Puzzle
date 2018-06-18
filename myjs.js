 /* CREATED BY RIDDHI DUTTA ON 15/07/2017.
COMPLETED ON 4:55PM 19/07/2017 AT NIHILENT ANALYTICS LTD.
MODIFIED AT 9:47PM HOME.*/

//FUNCTIONS.
function createFooter()
{
    if(document.body.contains(footer))
      document.body.removeChild(footer);
    footer=document.createElement("footer");
    para=document.createElement("p");
    para.innerHTML="&copy; 2017 &bull; Riddhi Dutta";
    footer.appendChild(para);
    document.body.appendChild(footer);
}
function getRand()
{
	return Math.floor((Math.random() * ( (rowno*colno)-1) ) + 1);
}
function getId(s)
{
	if(s.length==2)
		return Number(s.charAt(1));
	else
		{
			return Number(s.charAt(1) + s.charAt(2) );
		}
}
function disableButtons()
{
    for(var i=0;i<button.length;i++)
        {
            button[i].disabled=true;
        }
}
function checkWin()
{
	for(var i=0; i<button.length-1;i++)
	{
		if(button[i].value!=(i+1))
			return false;
	}
    disableButtons();
    span=document.createElement("span");
    span.id="choose_span";
    winNote=document.createTextNode("CONGRATULATIONS! You Solved It.");
    span.appendChild(winNote);
    document.body.appendChild(span);
    createFooter(); //after winning
    return true;
    
}
function swap(a,b)
{
	temp=a.value;
	t= document.createTextNode(b.value);
	a.removeChild(a.childNodes[0]);
	a.appendChild(t);
	a.value=b.value;
	b.value=temp;
	t= document.createTextNode(temp);
	b.removeChild(b.childNodes[0]);
	b.appendChild(t);
}
function swapMultiple(blank,wise,times,dir)  //1 for row wise, 0 for col wise......1 for right,up 0 for left,down.
{
	var iter,a;
	if(wise===1)
		iter=rowno;
	else
		iter=1;
	if(dir===1) //button is shifting towards down or left if swapping is done up or right.
		iter=iter*(-1);
	a=blank;
	for(var y=1; y<=times; y++)
	{
		swap(a,button[getId(a.id)+Number(iter)]);
		a=button[getId(a.id)+Number(iter)];
	}
}


function colorBlank()
{
	button[prevBlank].style.backgroundColor="cornflowerblue";
	for(var i=0; i< button.length; i++)
	{
		if(button[i].value==="")
		{
			button[i].style.backgroundColor="#C56770";
			prevBlank=i;
		}	
	}
}


var rowno;
var colno;
var table,prevBlank,rands,wid,ht,footer,para;
var swapped,tr,td,NoButton,t,no,pos,index,winNote,value,temp,span,row,col;
var button;
           
/*var shufbtn;
shufbtn= document.getElementById("shuffle");
shufbtn.onhover=function()
{
    alert("true");
    shufbtn.style.backgroundcolor="red";
}*/

var strA=["o3", "o4", "o5", "o6", "o7", "o8", "o9", "o0"];
for(var q=0;q<strA.length;q++)
{
	
	document.getElementById(strA[q]).onclick=function()
	{
		var id=this.id[1];
		if(id==0)
			id=10;
		rowno=id;
		colno=id;
        
       /* rowno=2;
        colno=2;*/
        
        if(document.body.contains(span))
            document.body.removeChild(span);
        var bht=Number(document.body.offsetHeight);
        bht=(85/100)*bht;
		prevBlank=(rowno*colno)-1;
		rands= new Array((rowno*colno)-1).fill(0);
		if(document.body.contains(table))
			document.body.removeChild(table);
		table = document.createElement("TABLE");
		table.id="table";
        table.border="1";
		document.body.appendChild(table);
        
        //createFooter();
        
		wid=table.offsetWidth/colno;
		ht=bht/rowno;
        pos=0;
		button= new Array((rowno*colno));
		for(var i=0;i<rowno;i++)
			{
			   tr=document.createElement("tr");
				for(var j=0; j<colno;j++)
					{
						td = document.createElement("TD");
						td.style.width=wid;
						td.style.height=ht;
						if(i==rowno-1 && j==colno-1)
							no="";
						else
							{
								no=getRand();
								while(rands[no]==1)
									no=getRand();
								rands[no]=1;
							}
						NoButton=document.createElement("button");
						t=document.createTextNode(no);
						NoButton.appendChild(t);
						NoButton.id="a"+pos; //button id to get the postion of the button.
						NoButton.value= no;
						button[pos]= NoButton;
						td.appendChild(button[pos]);
						button[pos].onclick=function()
						{
						   swapped=true;
						   index=getId(this.id);
						   value=this.value;
						   row=Math.floor(index/rowno);
						   col=index%colno;
						   if(value!=="")
							   {
								   if( col!=0)
								   {
										for(var y=1;y<=col;y++)
										{
											if(button[index-y].value==="")
											{
												swapMultiple(button[index-y],0,y,0); //1 for row wise, 0 for col wise......1 for right,up 0 for left,down.
												swapped=false;
												break;
											}
										}
								   }
									if(swapped && col!=colno-1)
									{
										for(var y=1;y<=(colno-1-col); y++)
										{
											if(button[index+y].value==="")
											{
												swapMultiple(button[index+y],0,y,1); //1 for row wise, 0 for col wise......1 for right,up 0 for left,down. 
												swapped=false;
												break;
											}
										}
									}
								   if(swapped && row!=rowno-1) /*problem*/
								   {
									   for(var y=1;y<=(rowno-1-row); y++)
										{
											if(button[index+(y*rowno)].value==="")
											{
												swapMultiple(button[index+(y*rowno)],1,y,1); //1 for row wise, 0 for col wise...1 for right,up 0 for left,down.
												swapped=false;
												break;
											}
										}
								   }   
								   if(swapped && row!=0)
								   {
									   for(var y=1;y<=row;y++)
										{
											if(button[index-(y*rowno)].value==="")
											{
												swapMultiple(button[index-(y*rowno)],1,y,0); //1 for row wise, 0 for col wise......1 for right,up 0 for left,down.
												break;
											}
										}
								   }
								   colorBlank();
							  }
							  checkWin();
						}
						
						pos++;
						tr.appendChild(td);
					}
				table.appendChild(tr);
			}
			colorBlank();
            createFooter(); //after table load
	}
}
 createFooter(); //initial load
footer.style.bottom="0";