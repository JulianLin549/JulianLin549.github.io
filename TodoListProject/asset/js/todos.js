//Check Off Specific Todos By Clicking 
/* $("li").click(function(){
    
    if ($(this).css("color")==="rgb(128, 128, 128)")
    {
        $(this).css({
            color: "black",
            //object裡面不能有"-"，所以用cammelCase
            textDecoration: "none"
        })
    }
    else{
        $(this).css({
            color: "gray",
            //object裡面不能有"-"，所以用cammelCase
            textDecoration: "line-through"
        })
       
    }
   
}); */
//click只會把listener加到已經存在的element，所以這邊如果新增新的TODO，就不會有listener。
//所以要用on("click")
//Check Off Specific Todos By Clicking 
/* $("li").click(function(){
    $(this).toggleClass("completed");
}); */


//當code第一次運行，listener只能加在已經存在的東西，因為li並沒有完全存在
//所以這邊加在ul，然後指定ul下面的li會有Listener。

$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});


//click on x to delete Todo
//click只會把listener加到已經存在的element，所以這邊如果新增新的TODO，就不會有listener。
//所以要用on("click")
/* $("span").click(function(event){
    $(this).parent().fadeOut(500,function(){    //想要再fadeout之後再刪除
        $(this).remove();//這個this 是span的parent，是Li
    });
    event.stopPropagation();
}); */
//這邊跟上面一樣
$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(500,function(){    //想要再fadeout之後再刪除
        $(this).remove();//這個this 是span的parent，是Li
    });
    event.stopPropagation();
}); 

$("input[type='text'").keypress(function(event){
    if(event.which === 13){
        //grabbing new todo text from input
        var todoText = $(this).val();//這個input的值
        if(todoText !== ""){
            //create a new li and add to ul
            $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
            //reset input
            $(this).val("");
        }
        
    }
})

$(".fa-plus").click(function(){
    $("input[type='text'").fadeToggle();
})